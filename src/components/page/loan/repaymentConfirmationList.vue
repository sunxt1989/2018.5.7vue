<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>还款单确认列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left">
                <el-table class="blueList" :data="tableData">
                    <el-table-column prop="userName" label="还款人" sortable align="center"></el-table-column>
                    <el-table-column prop="debitDateYMD" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="还款金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'repaymentConfirmation',params:{debitId:scope.row.idString}}" class="see">
                                        <i class="icon iconfont icon-kanguo blue"></i></router-link>
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
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data() {
            return {
                tableData:[],
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
                this.loading = true;
                this.axios()
            },

            axios(){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('repaymentConfirmationRefuse')
                params.append('pageNo', this.currentPage);
                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
                        var data = response.data.value;//借款单审批列表数据
//                        console.log(data);
                        this.count = data.count;//总条目数
                        this.tableData = data.debitList;
                    })
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false;
                        alert('网络错误，不能访问');
                    })
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
        },
        created(){
            var params = new URLSearchParams();
            var url = addUrl.addUrl('repaymentConfirmationList');
            params.append('pageNo', this.currentPage);
            axios.post(url, params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;//借款单审批列表数据
                    this.count = data.count;//总条目数
                    let tableDataarr =[];
                    if(data.debitList){
                        for(var i =0; i < data.debitList.length; i++){
                            data.debitList[i].showMoney = number.number(data.debitList[i].money);
                            tableDataarr.push(data.debitList[i])
                        }
                        this.tableData = tableDataarr;
                    }else{
                        this.tableData = data.debitList
                    }
                })
                .catch(error=> {
//                        console.log(error);
                    this.loading = false;
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
    .left {
        width: 1120px;
        float: left;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
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
