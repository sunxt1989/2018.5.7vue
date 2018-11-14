<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>历史辅助业务列表</h2>
                <router-link to="/auxiliary/auxiliaryList" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="subjectName" label="业务类别" sortable align="center"></el-table-column>
                    <el-table-column prop="relationName" label="交易方" sortable align="center"></el-table-column>
                    <el-table-column prop="amount" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showAmountMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="hasDealAmount" label="已收付" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showHasDealAmountMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sourceType" label="数据来源" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.sourceType == 1">初始化</span>
                            <span v-else>手工录入</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="businessDateYMD" label="日期" sortable align="center"></el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="operation">
                                <router-link :to="{name:'seeAuxiliary',params:{debitId:scope.row.idString}}" class="see">
                                    <i class="icon iconfont icon-kanguo blue"></i>
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
                tableData: [],//销售单审批列表数据
                count:0,//总条目数
                currentPage:1,//当前页数
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
//            分页器
            changePage(val){
                this.currentPage = val;
                this.axios()
            },
            axios(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('auxiliaryList');
                params.append('pageNo',this.currentPage);
                params.append('flg',1);
                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        let data = response.data.value
                        let list = data.list
                        for(let i in list){
                            list[i].showAmountMoney = number.number(list[i].amount)
                            list[i].showHasDealAmountMoney = number.number(list[i].hasDealAmount)
                        }
                        this.tableData = list//辅助业务列表
                        this.count = data.count
                        this.currentPage = data.pageNo
                    })
                    .catch(error=> {
//                    console.log(error);
                        alert('网络错误，不能访问');
                        this.loading = false;
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
    .sub1{
        display: inline-block;
        width: 100px;
        height: 30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right: 100px;
        font-size: 12px;
    }
    .sub2{
        display: inline-block;
        width: 100px;
        height: 30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right: 100px;
        font-size: 12px;
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
        color: red;
        text-decoration: none;
    }

</style>
