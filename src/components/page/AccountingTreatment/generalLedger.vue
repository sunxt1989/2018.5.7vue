<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>总账</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="single">
                    <el-table-column prop="subjectCode" label="科目代码" sortable align="center"></el-table-column>
                    <el-table-column prop="subjectName" label="科目名称" sortable align="center"></el-table-column>
                    <el-table-column label="年">
                        <el-table-column prop="month" label="月"></el-table-column>
                        <el-table-column prop="day" label="日"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="remark" label="摘要" sortable align="center"></el-table-column>
                    <el-table-column prop="debit" label="借方" sortable align="center"></el-table-column>
                    <el-table-column prop="credit" label="贷方" sortable align="center"></el-table-column>
                    <el-table-column prop="direction" label="方向" sortable align="center"></el-table-column>
                    <el-table-column prop="sum" label="余额" sortable align="center"></el-table-column>
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
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                tableData: [],//采购付款单审批列表数据
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
                var url = addUrl.addUrl('approvalPurchaseConfirmList')
                var params = new URLSearchParams();
                params.append('pageNo',this.currentPage);
                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        var data = response.data.value;//列表数据
//                        console.log(data);
                        var tableDataarr =[];
                        if(data){
                            for(var i =0; i < data.length; i++){
                                data[i].showsSendMoney = number.number(data[i].sendMoney)
                                tableDataarr.push(data[i])
                            }
//                            console.log(tableDataarr);
                            this.tableData = tableDataarr;
                        }

                    })
                    .catch(error=> {
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
        },
        computed:mapState(['current_book_ym','start_ym']),
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
            var url = addUrl.addUrl('generalLedger')
            var params = new URLSearchParams();
            params.append('startDate','2018-01');
            params.append('endDate','2018-05');
            params.append('startSub','');
            params.append('endSub','');
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
                    console.log(response);
                    let data = response.data.value;//列表数据
                    this.tableData = data.dataList
                })
                .catch(error=> {
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
        height:32px;
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
