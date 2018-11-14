<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>交易方列表</h2>
                <router-link to="/Purchase/newSupplier" class="addLink">新增</router-link>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">

                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="tradeName" label="名称" sortable align="center"></el-table-column>
                    <el-table-column prop="tradeIdNumber" label="社会信用代码" sortable align="center"></el-table-column>
                    <el-table-column prop="tradeAddress" label="地址" sortable align="center"></el-table-column>
                    <el-table-column prop="tradePersonPhone1" label="联系电话" sortable align="center"></el-table-column>
                    <el-table-column prop="tradePerson1" label="客户" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.customFlg == 0">否</span>
                            <span v-else>是</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="supplierFlg" label="供应商" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.supplierFlg == 0">否</span>
                            <span v-else>是</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="transactionNumber" label="类别" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.tradeType == 1">公司</span>
                            <span v-else-if="scope.row.tradeType == 2">个人</span>
                            <span v-else-if="scope.row.tradeType == 3">金融机构</span>
                            <span v-else-if="scope.row.tradeType == 4">政府单位</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'seeSupplier',params:{debitId:scope.row.idString}}" class="see">
                                        <i class="icon iconfont icon-kanguo blue"></i></router-link>
                                </span>
                                <span class="operation">
                                    <i v-if='scope.row.transactionNumber == 0' @click='deleteModel(scope.row.idString)'
                                       class="icon iconfont icon-shanchu red"></i>
                                    <i v-else class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
                                </span>
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    @current-change="changePage"
                    background
                    layout="prev, pager, next"
                    :total='count'>
                </el-pagination>

            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data() {
            return {
                tableData: [],//借款单列表数据
                count:0,//总条目数
                currentPage:1,//当前页数
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            //执行ajax重新获取借款单列表数据
            axios(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('SupplierList')
                params.append('pageNo',this.currentPage);
                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        var data = response.data.value.list;//借款单列表数据

                        this.count = response.data.value.count;//总条目数
                        var tableDataarr =[];
                        for(var i =0; i < data.length; i++){
                            tableDataarr.push(data[i])
                        }
//                    console.log(tableDataarr);
                        this.tableData = tableDataarr;

                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            //删除提示模态框
            deleteModel(id){
                this.loading = true
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
                    this.loading = false
                });
            },
            //删除列表信息
            deleteList(isId){
                let debitId = isId;
                let params = new URLSearchParams();
                let url = addUrl.addUrl('SupplierDelete')
                params.append('id',debitId);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        this.axios();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            //分页器
            changePage(val){
                this.loading = false
                this.currentPage = val;
                this.axios()
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
            this.axios()
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
