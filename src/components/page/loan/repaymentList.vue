<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>还款单列表</h2>
                <router-link v-if="!isBossSee && isShowButton" :to="{name:'repayment',params:{debitId:debitId,activeName:this.activeName,currentPage:this.currentPage}}" class="addLink">新增还款单</router-link>
                <el-button @click="back" size="small" class="back">返回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="debitDateYMD" label="日期" align="center" sortable width="180"></el-table-column>
                    <el-table-column prop="payType" label="还款方式" align="center" sortable width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.paymentMethod == 1">
                                <span v-if="scope.row.payType == 1">现金支付</span>
                                <span v-else-if="scope.row.payType == 2">银行支付</span>
                            </span>
                            <span v-if="scope.row.paymentMethod == 2">报销冲抵</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="还款金额" align="center" sortable>
                        <template slot-scope="scope">
                            <span>{{scope.row.showMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auditFlg" label="还款状态" align="center" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0">未提交</span>
                            <span v-if="scope.row.auditFlg == 1">驳回</span>
                            <span v-if="scope.row.auditFlg == 2">待审核</span>
                            <span v-if="scope.row.auditFlg == 3">待出纳确认</span>
                            <span v-if="scope.row.auditFlg == 4">通过</span>
                            <span v-if="scope.row.auditFlg == 5">待审核</span>
                            <span v-if="scope.row.auditFlg == 6">待审核</span>
                            <span v-if="scope.row.auditFlg == 7">已红冲</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="查看详情" align="center" >
                        <template slot-scope="scope">
                            <router-link :to="{name:'seeRepayment',params:{debitId:scope.row.idString,activeName:this.activeName,currentPage:this.currentPage}}" class="see">
                                <i class="icon iconfont icon-kanguo blue"></i>
                            </router-link>
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
                debitId:this.$route.params.debitId,//单据ID
                isBossSee:this.$route.params.isBossSee,//是否为boss查看
                currentPage:this.$route.params.currentPage,
                activeName:this.$route.params.activeName,
                tableData:[],//还款单列表
                isShowButton:false,//是否显示新建按钮
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            back(){
                if(this.isBossSee){
                    this.$router.push({name:'viewingList',params:{activeName:this.activeName,currentPage:this.currentPage}})
                } else{
                    this.$router.push('/loan/loan')
                }
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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('repayment')
            params.append('debitId',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let tableData = response.data.value.userDebitItemList;
                    let unCreditMoney = response.data.value.userDebitItem.unCreditMoney
                    this.isShowButton = unCreditMoney ? true : false
                    for(let i in tableData){
                        tableData[i].showMoney = number.number(tableData[i].money)
                    }
                    this.tableData = tableData
                    this.loading = false;
                })
                .catch(error=> {
                    this.loading = false;
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
    .addLink{
        display: inline-block;
        width: 100px;
        height:32px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        right:120px;
        text-decoration: none;
    }
    .back {
        position: absolute;
        right: 30px;
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
    .el-table {
        margin: 30px 0;
    }

    .see{
        text-decoration: none;
    }

</style>
