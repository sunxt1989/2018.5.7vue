<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>银行账户</h2>
                <router-link to="/bank/newBank" class="addLink">新增</router-link>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="bankAccountType" label="账户类别" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.bankAccountType == 1">基本户</span>
                            <span v-if="scope.row.bankAccountType == 2">一般户</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bankName" label="银行名称" sortable align="center"></el-table-column>
                    <el-table-column prop="bankChildName" label="开户行" sortable align="center"></el-table-column>
                    <el-table-column prop="bankCode" label="银行账号" sortable align="center"></el-table-column>
                    <el-table-column prop="endAmount" label="余额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.showMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="bookStatus" label="账户状态" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.bookStatus == 0">未启用</span>
                            <span v-if="scope.row.bookStatus == 1">已启用</span>
                            <span v-if="scope.row.bookStatus == 2">已停用</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="taxFlg" label="缴税" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.taxFlg == 0">非缴税账号</span>
                            <span v-if="scope.row.taxFlg == 1" class="red">缴税账号</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="insuranceFlg" label="社保" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.insuranceFlg == 0">非社保账号</span>
                            <span v-if="scope.row.insuranceFlg == 1" class="red">社保账号</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="housingFlg" label="公积金" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.housingFlg == 0">非公积金账号</span>
                            <span v-if="scope.row.housingFlg == 1" class="red">公积金账号</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="wagesFlg" label="工资" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.wagesFlg == 0">非工资账号</span>
                            <span v-if="scope.row.wagesFlg == 1" class="red">工资账号</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'seeBank',params:{debitId:scope.row.idString}}" class="see">
                                        <i class="icon iconfont icon-shuru blue"></i></router-link>
                                </span>
                                <span class="operation">
                                    <i v-if="scope.row.bankAccountType != 1 && scope.row.bookStatus == 0"
                                       @click='deleteModel(scope.row.idString)'
                                       class="icon iconfont icon-shanchu red"></i>
                                    <i v-else class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
                                </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data() {
            return {
                tableData: [],//银行账户列表
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            axios(){
                var url = addUrl.addUrl('bankList')
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        let tableData = response.data.value.list
                        for(let i in tableData){
                            tableData[i].showMoney = number.number(tableData[i].endAmount)
                        }
                        this.tableData = tableData;//银行账户列表数据
                        this.loading = false;
                    })
                    .catch(error=> {
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            //删除提示模态框
            deleteModel(id){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    showClose: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.cancelButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                    instance.cancelButtonLoading = false;
                                }, 300);
                            }, 300);
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                    this.deleteList(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除列表信息
            deleteList(isId){
                this.loading = true;
                var debitId = isId;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('bankDelete')
//                console.log(debitId);
                params.append('bankId',debitId);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        let status = response.data.status
                        if(status == 200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.axios();
                        }else if(status == 400){
                            let msg = response.data.msg
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            }
        },
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            var topHeight = $('.top').innerHeight()
            var headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                var topHeight = $('.top').innerHeight()
                var headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            };
        },
        created(){
            var url = addUrl.addUrl('bankList')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let tableData = response.data.value.list
                    for(let i in tableData){
                        tableData[i].showMoney = number.number(tableData[i].endAmount)
                    }
                    this.tableData = tableData;//银行账户列表数据
                    this.loading = false;
                })
                .catch(error=> {
//                    console.log(error);
                    alert('网络错误，不能访问');
                    this.loading = false;
                })
        },
    }
</script>

<style scoped>
    .w{
        height:100%;
    }

    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }

    h2 {
        display: inline-block;
    }
    .addLink{
        display: inline-block;
        width: 56px;
        height:30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        right:120px;
        text-decoration: none;
    }
    .back{
        display: inline-block;
        width:56px;
        height:30px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        text-decoration: none;
        color: #333;
        position: absolute;
        right: 30px;
    }
    .choice {
        width:120px;
        display: inline-block;
        position: absolute;
        left:20px;
        text-decoration: none;
    }
    .query{
        margin-left: 30px;
    }
    .left {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .record {
        font-size: 18px;
        color: #333;
        margin-right: 20px;
    }
    .repayment {
        text-decoration: none;
    }
    .operation {
        cursor: pointer;
    }
    .el-table {
        margin: 30px 0;
    }
    .el-select {
        margin: 0 20px;
    }
    .see{
        text-decoration: none;
    }

</style>
