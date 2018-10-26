<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>银行业务审批列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="operateUserName" label="申请人" sortable align="center"></el-table-column>
                    <el-table-column prop="bankName" label="银行名称" sortable align="center"></el-table-column>
                    <el-table-column prop="type" label="业务名称" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">提取现金</span>
                            <span v-if="scope.row.type == 2">存入现金</span>
                            <span v-if="scope.row.type == 3">银行互转</span>
                            <span v-if="scope.row.type == 4">银行手续费</span>
                            <span v-if="scope.row.type == 5">利息收入</span>
                            <span v-if="scope.row.type == 5">收到投资</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="余额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.showMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="70px" align="center">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'approvalBank',params:{debitId:scope.row.idString}}" class="see">
                                        <i class="icon iconfont icon-shenpi blue"></i></router-link>
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
                var url = addUrl.addUrl('projectList')
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        this.tableData = response.data.value.list;//借款单列表数据
//                        console.log(this.tableData);
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
                var url = addUrl.addUrl('projectDelete')
//                console.log(debitId);
                params.append('id',debitId);

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
            var url = addUrl.addUrl('approvalBankList')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let tableData = response.data.value.list
                    for(let i in tableData){
                        tableData[i].showMoney = number.number(tableData[i].money)
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
        width: 100px;
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
    .left {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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
    .img{
        display: inline-block;
        width:20px;
    }

</style>
