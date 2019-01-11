<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>发票列表</h2>
                <router-link to="/invoice/newInvoice" class="addLink">录入抵扣专票</router-link>
                <el-button @click="invoiceReduce" size="small" type="primary" class="sub1" :loading="isLoading">认证抵扣</el-button>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList" ref="multipleTable">
                    <el-table-column align="center" type="selection" prop="receipt_id"></el-table-column>
                    <el-table-column label="编号" align="center" width="60px">
                        <template slot-scope="scope">
                            <span>{{scope.row.index}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receipt_name" label="公司" sortable align="center"></el-table-column>
                    <el-table-column prop="receipt_discription" label="明细" sortable align="center" width="280px"></el-table-column>
                    <el-table-column prop="receipt_money" label="价税合计" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receipt_tax_money" label="税额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showTaxMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receipt_date" label="时间" sortable align="center"></el-table-column>
                    <el-table-column prop="" label="类型" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span>进项专票</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="状态" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.receipt_reduce_flg == 1">已抵扣</span>
                            <span v-else>未抵扣</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="operation">
                                <router-link
                                    :to="{name:'seeInvoice',params:{receiptId:scope.row.receipt_id,currentPage:currentPage}}"
                                    class="see">
                                    <i class="icon iconfont icon-kanguo blue"></i>
                                </router-link>
                            </span>
                            <span class="operation">
                                <i v-if='scope.row.receipt_source_flg == 0 || scope.row.receipt_reduce_flg == 1'
                                   class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
                                <i v-else @click='deleteModel(scope.row.receipt_id)'
                                   class="icon iconfont icon-shanchu red"></i>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="changePage"
                    background
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :total='count'>
                </el-pagination>
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
                currentPage:this.$route.params.currentPage,
                tableData: [],//发票列表数据
                count:0,//总条目数
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            changeChoice(){
                this.axios()
            },
            axios(){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('invoiceList')
//                var url = 'http://192.168.2.190:8080/web/vue/bill/list.html'
                params.append('page_no',this.currentPage);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        var data = response.data.value.list;
                        this.count = response.data.value.page_count;//
                        this.currentPage = response.data.value.page_no;//

                        for(let i = 0; i < data.length; i ++){
                            data[i].index = (i + 1) + ((this.currentPage - 1) * 10)
                            data[i].showMoney = number.number(data[i].receipt_money)
                            data[i].showTaxMoney = number.number(data[i].receipt_tax_money)
                        }
                        this.tableData = data
                        this.loading = false;
                    })
                    .catch(error=> {
//                    console.log(error);
                        alert('网络错误，不能访问');
                        this.loading = false;
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
            deleteList(id){
                this.loading = true;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('invoiceDelete')
//                var url = 'http://192.168.2.190:8080/web/vue/bill/delete.html'
                params.append('receipt_id',id);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        let status = response.data.value.status;
                        let msg = response.data.value.msg;
                        if(status == 200){
                            this.$message.success(msg);
                        }else if(status == 400){
                            this.$message.error(msg);
                        }
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
                this.currentPage = val;
                this.axios()
            },
            //认证抵扣事件
            invoiceReduce(){
                let ids = '';//发票id参数
                let params = new URLSearchParams();
                let url = addUrl.addUrl('invoiceReduce')
                let selection = this.$refs.multipleTable.selection
                selection = selection.filter(x => x.receipt_reduce_flg == 0)
                let length = selection.length
                if(length == 0){
                    this.$message.error('请选择至少一条未抵扣的发票');
                    return
                }else{
                    this.$confirm('确定是否抵扣所选发票, 是否继续?', '提示', {
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
                        for(let i in selection){
                            if(i == 0){
                                ids += selection[i].receipt_id
                            }else{
                                ids += ','+ selection[i].receipt_id
                            }
                        }
                        params.append('receipt_ids',ids);
                        axios.post(url,params)
                            .then(response=> {
//                                console.log(response);
                                let status = response.data.value.status;
                                let msg = response.data.value.msg;
                                if(status == 200){
                                    this.$message.success(msg);
                                }else if(status == 400){
                                    this.$message.error(msg);
                                }
                                this.axios();
                                this.$message({
                                    type: 'success',
                                    message: '发票抵扣成功!'
                                });
                                this.loading = false;
                            })
                            .catch(error=> {
                                alert('网络错误，不能访问');
                                this.loading = false;
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }

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
            if(!this.currentPage)this.currentPage = 1;
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
    .top .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .top .addLink{
        display: inline-block;
        width: 100px;
        height:32px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        right:215px;
        text-decoration: none;
    }
    .top .back{
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
    .blueList .checkbox {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        cursor: pointer;
    }
    .blueList .checkbox i {
        position: absolute;
        left: -10px;
        top: -2px;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: none;
        font-size:20px;
        color: #1a96d4;
        font-weight: bold;
    }
    .blueList .checkbox input {
        position: absolute;
        z-index: 2;
        left: -10px;
        top: -10px;
        width: 200px;
        height: 200px;
        opacity: 0;
        cursor: pointer;
    }

    .blueList .checkbox input[type="checkbox"]:checked + i {
        display: block;
    }
    .checkbox.disabled {
        background-color: #ccc;
    }
</style>
