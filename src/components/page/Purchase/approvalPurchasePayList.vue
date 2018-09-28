<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>采购单付款审批列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="departmentName" label="部门" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.departmentName }}</span>
                            <span v-if="scope.row.divideFlg == 1">（分摊）</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operateUserName" label="申请人" sortable align="center"></el-table-column>
                    <el-table-column prop="supplierName" label="供应商" sortable align="center"></el-table-column>
                    <el-table-column prop="sendMoney" label="付款金额费用" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showsSendMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="operation">
                                <router-link :to="{name:'approvalPurchasePay',params:{debitId:scope.row.idString}}" class="see">
                                    <i class="icon iconfont icon-shuru blue"></i>
                                </router-link>
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
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'

    export default {
        data() {
            return {
                tableData: [],//采购单审批列表数据
                count:0,//总条目数
                currentPage:1,//当前页数
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            //分页器
            changePage(val){
                this.currentPage = val;
                this.axios()
            },
            axios(){
                var params = new URLSearchParams();
                params.append('pageNo',this.currentPage);
                axios.post('http://192.168.2.190:8080/web/vue/tradeCompany/list.html',params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        var data = response.data.value.list;//列表数据

                        this.count = response.data.value.count;//总条目数
                        var tableDataarr =[];
                        for(var i =0; i < data.length; i++){
                            tableDataarr.push(data[i])
                        }
//                        console.log(tableDataarr);
                        this.tableData = tableDataarr;

                    })
                    .catch(error=> {
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
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
            var url = addUrl.addUrl('approvalPurchasePayList')
            var params = new URLSearchParams();
            params.append('pageNo',this.currentPage);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value.list;//列表数据

                    var tableDataarr =[];
                    if(data){
                        for(var i =0; i < data.length; i++){
                            data[i].showsSendMoney = number.number(data[i].sendMoney)
                            tableDataarr.push(data[i])
                        }
//                        console.log(tableDataarr);
                        this.tableData = tableDataarr;
                    }
                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
                    alert('网络错误，不能访问');
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
