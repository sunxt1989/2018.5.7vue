<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看功能列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="content cf">
                    <!--<span class="record">记录日期：</span>-->
                    <!--<el-date-picker-->
                        <!--v-model="timeInterval"-->
                        <!--type="daterange"-->
                        <!--align="right"-->
                        <!--unlink-panels-->
                        <!--range-separator="至"-->
                        <!--start-placeholder="开始日期"-->
                        <!--end-placeholder="结束日期"-->
                        <!--value-format="yyyy-MM-dd"-->
                        <!--:picker-options="pickerOptions2">-->
                    <!--</el-date-picker>-->
                    <!--<span class="record">部门</span>-->
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="借款列表" name="0">
                            <el-table class="single" :data="tableData">
                                <el-table-column align="center" prop="userName" label='借款人'></el-table-column>
                                <el-table-column align="center" prop="departmentName" label='借款部门'></el-table-column>
                                <el-table-column align="center" prop="Date" label='借款日期'></el-table-column>
                                <el-table-column align="center" prop="money" label='借款金额'>
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="creditMoney" label="已还金额" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showCreditMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="unCreditMoney" label="未还金额" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showUnCreditMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="auditFlg" label='状态'>
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.auditFlg == 0">未提交</span>
                                        <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                                        <span v-else-if="scope.row.auditFlg == 2">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                                        <span v-else-if="scope.row.auditFlg == 4 && scope.row.unCreditMoney != 0">待还款</span>
                                        <span v-else-if="scope.row.auditFlg == 4 && scope.row.unCreditMoney == 0">已还款</span>
                                        <span v-else-if="scope.row.auditFlg == 5">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 6">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="还款" width="80px" align="center">
                                    <template slot-scope="scope">
                                        <span class="black" v-if="scope.row.auditFlg < 4">还款</span>
                                        <router-link v-else class="repayment red"
                                                     :to="{name:'repaymentList',params:{debitId:scope.row.idString,isBossSee:true,currentPage:currentPage,activeName:activeName}}">还款
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeLoan',params:{debitId:scope.row.idString,isBossSee:true,currentPage:currentPage,activeName:activeName}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
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
                        </el-tab-pane>
                        <el-tab-pane label="报销列表" name="1">
                            <el-table class="single" :data="tableData">
                                <el-table-column prop="originalTypeName" label="类别" sortable align="left">
                                    <template slot-scope="scope">
                                        <img class="logoImg" :src=scope.row.url alt="">
                                        <span>费用报销</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="simpleReceiptDate" label="日期" sortable
                                                 align="center"></el-table-column>
                                <el-table-column prop="applicationUserName" label="名称" sortable
                                                 align="center"></el-table-column>
                                <el-table-column prop="money" label="金额" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="receiptCount" label="票据" sortable
                                                 align="center"></el-table-column>
                                <el-table-column prop="auditFlg" label="状态" sortable align="center" width="100px">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.auditFlg == 0">未提交</span>
                                        <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                                        <span v-else-if="scope.row.auditFlg == 2">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                                        <span v-else-if="scope.row.auditFlg == 4">通过</span>
                                        <span v-else-if="scope.row.auditFlg == 5">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 6">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="查看" width="80px" align="center">
                                    <template slot-scope="scope">
                                    <span class="operation">
                                        <router-link
                                            :to="{name:'seeReimbursement',params:{debitId:scope.row.idString,currentPage:currentPage,isBossSee:true,activeName:activeName}}"
                                            class="see">
                                            <i class="icon iconfont icon-kanguo blue"></i>
                                        </router-link>
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
                        </el-tab-pane>
                        <el-tab-pane label="采购列表" name="2">
                            <el-table class="single" :data="tableData">
                                <el-table-column prop="departmentName" label="部门" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.departmentName }}</span>
                                        <span v-if="scope.row.divideFlg == 1">（分摊）</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="supplierName" label="供应商" sortable align="center"></el-table-column>
                                <el-table-column prop="type" label="类别" sortable align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type == 1">设备</span>
                                        <span v-if="scope.row.type == 2">软件</span>
                                        <span v-if="scope.row.type == 3">劳务服务</span>
                                        <span v-if="scope.row.type == 4">技术服务</span>
                                        <span v-if="scope.row.type == 5">库存商品</span>
                                        <span v-if="scope.row.type == 6">固定资产</span>
                                        <span v-if="scope.row.type == 7">电信服务</span>
                                        <span v-if="scope.row.type == 8">设计服务</span>
                                        <span v-if="scope.row.type == 9">广告服务</span>
                                        <span v-if="scope.row.type == 10">鉴证咨询服务</span>
                                        <span v-if="scope.row.type == 11">购买专利</span>
                                        <span v-if="scope.row.type == 12">购买非专利技术</span>
                                        <span v-if="scope.row.type == 13">购买商标</span>
                                        <span v-if="scope.row.type == 14">购买著作权</span>
                                        <span v-if="scope.row.type == 15">申请专利</span>
                                        <span v-if="scope.row.type == 16">申请商标</span>
                                        <span v-if="scope.row.type == 17">申请著作权</span>
                                        <span v-if="scope.row.type == 18">初次购买增值税税控系统专用设备</span>
                                        <span v-if="scope.row.type == 19">增值税税控系统专用设备技术维护费</span>
                                        <span v-if="scope.row.type == 20">委托研发</span>
                                        <span v-if="scope.row.type == 99">其他</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="commodityName" label="明细" sortable align="center" width="200px"></el-table-column>
                                <el-table-column prop="totalMoney" label="含税总价" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showTotalMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sendMoney" label="已付款" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showSendMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="状态" sortable align="center" >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.auditFlg == 0">未提交</span>
                                        <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                                        <span v-else-if="scope.row.auditFlg == 2">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                                        <span v-else-if="scope.row.auditFlg == 4 && scope.row.unsendMoney != 0">待付款</span>
                                        <span v-else-if="scope.row.auditFlg == 4 && scope.row.unsendMoney == 0">已完成</span>
                                        <span v-else-if="scope.row.auditFlg == 5">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 6">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="" label="付款" sortable align="center">
                                    <template slot-scope="scope">
                                        <span class="black" v-if="scope.row.unsendMoney == 0 || scope.row.auditFlg != 4">付款</span>
                                        <router-link v-else class="repayment red" :to="{name:'purchasePaymentList',params:{purchaseId:scope.row.idString,currentPage:currentPage,isBossSee:true,activeName:activeName}}">付款
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="80px" align="center">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seePurchase',params:{purchaseId:scope.row.idString,currentPage:currentPage,isBossSee:true,activeName:activeName}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
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
                        </el-tab-pane>
                        <el-tab-pane label="销售列表" name="3">
                            <el-table :data="tableData" class="blueList">
                                <el-table-column prop="departmentName" label="部门" sortable align="center"></el-table-column>
                                <el-table-column prop="customName" label="客户" sortable align="center"></el-table-column>
                                <el-table-column prop="type" label="类别" sortable align="center">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type == 1">库存商品</span>
                                        <span v-if="scope.row.type == 2">技术服务</span>
                                        <span v-if="scope.row.type == 3">技术开发</span>
                                        <span v-if="scope.row.type == 4">技术咨询</span>
                                        <span v-if="scope.row.type == 5">劳务</span>
                                        <span v-if="scope.row.type == 6">软件</span>
                                        <span v-if="scope.row.type == 7">设计服务</span>
                                        <span v-if="scope.row.type == 8">现代商业服务</span>
                                        <span v-if="scope.row.type == 99">其他</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="discription" label="明细" sortable align="center" width="200px"></el-table-column>
                                <el-table-column prop="totalMoney" label="含税总价" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showTotalMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="receivedMoney" label="已收款" sortable align="center">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.showReceivedMoney }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="状态" sortable align="center" >
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.auditFlg == 0">未提交</span>
                                        <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                                        <span v-else-if="scope.row.auditFlg == 2">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                                        <span v-else-if="scope.row.auditFlg == 4 && scope.row.unreceiveMoney != 0">待收款</span>
                                        <span v-else-if="scope.row.auditFlg == 4 && scope.row.unreceiveMoney == 0">已完成</span>
                                        <span v-else-if="scope.row.auditFlg == 5">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 6">待审核</span>
                                        <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="收款" sortable align="center">
                                    <template slot-scope="scope">
                                        <span class="black" v-if="scope.row.auditFlg < 4">收款</span>
                                        <router-link v-else class="repayment red"
                                                     :to="{name:'salePaymentList',params:{saleId:scope.row.idString,currentPage:currentPage,isBossSee:true,activeName:activeName}}">收款
                                        </router-link>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="80px" align="center">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeSale',params:{saleId:scope.row.idString,currentPage:currentPage,isBossSee:true,activeName:activeName}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i></router-link>
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
                        </el-tab-pane>
                    </el-tabs>

                </div>
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

    export default{
        data(){
            return {
                timeInterval:'',//用户选中时间
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text:'最近半年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 182);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },//记录日期中快捷选择
                activeName:this.$route.params.activeName,
                currentPage:this.$route.params.currentPage,//分页器
                count:0,//总条目数

                tableData:[],//借款列表
                title:[
                    {
                        userName:'借款人名称',
                        departmentName:'借款部门',
                        Date:'借款日期',
                        money:'借款金额',
                        auditFlg:'借款单状态',
                        router:'seeLoan'
                    },
                    {
                        userName:'报销人名称',
                        departmentName:'报销部门',
                        Date:'报销日期',
                        money:'报销金额',
                        auditFlg:'报销单状态',
                        router:'seeReimbursement'
                    },
                    {
                        userName:'采购人名称',
                        departmentName:'采购部门',
                        Date:'采购日期',
                        money:'采购金额',
                        auditFlg:'采购单状态',
                        router:'seePurchase'
                    },
                    {
                        userName:'销售人名称',
                        departmentName:'销售部门',
                        Date:'销售日期',
                        money:'销售金额',
                        auditFlg:'销售单状态',
                        router:'seeSale'
                    }
                ],
                loading:true
            }
        },
        methods: {
            //分页器
            changePage(val){
                this.currentPage = Number(val);
                this.axios()
            },
            openModel(){

            },
            handleClick(){
                this.currentPage = 1;
                this.axios()
            },
            axios(){
                this.loading = true
                let url
                let params = new URLSearchParams();
                if(this.activeName == 0){//借款
                    url = addUrl.addUrl('viewingLoanList');
                    params.append('auditFlg','1,2,3,4,5,6,7')
                    params.append('pageNo',this.currentPage)
                }else if(this.activeName == 1){//报销
                    url = addUrl.addUrl('viewingReimbursementList');
                   params.append('auditFlg','1,2,3,4,5,6,7')
                    params.append('pageNo',this.currentPage)
                }else if(this.activeName == 2){//采购
                    url = addUrl.addUrl('viewingPurchaseList');
                   params.append('auditFlg','1,2,3,4,5,6,7')
                    params.append('pageNo',this.currentPage)
                }else if(this.activeName == 3){//销售
                    url = addUrl.addUrl('viewingSaleList');
                   params.append('auditFlg','1,2,3,4,5,6,7')
                    params.append('pageNo',this.currentPage)
                }
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        this.count = response.data.value.count
                        let list = response.data.value.list

                        if(status == 200) {
                            if (this.activeName == 0) {
                                for (let i in list) {
                                    list[i].showMoney = number.number(list[i].money)
                                    list[i].showCreditMoney = number.number(list[i].creditMoney)
                                    list[i].showUnCreditMoney = number.number(list[i].unCreditMoney)
                                    list[i].Date =list[i].debitDateYMD
                                }
                            } else if (this.activeName == 1) {
                                for (let i in list) {
                                    list[i].showMoney = number.number(list[i].money)
                                    list[i].url = 'static/images/expense/feiyongbaoxiao.png'
                                }
                            } else if (this.activeName == 2) {
                                for (let i in list) {
                                    list[i].showSendMoney = number.number(list[i].sendMoney)
                                    list[i].showTotalMoney = number.number(list[i].totalMoney)
                                }
                            } else if (this.activeName == 3) {
                                for (let i in list) {
                                    list[i].showReceivedMoney = number.number(list[i].receivedMoney)
                                    list[i].showTotalMoney = number.number(list[i].totalMoney)
                                }
                            }
//                            console.log(list);
                            this.tableData = list
                        }else if(status == 400){
                            this.$message.error(msg)
                        }

                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        created(){
//            console.log(this.activeName,'activeName');
//            console.log(this.currentPage,'currentPage');
            this.activeName = this.activeName ? this.activeName : '0'
            this.currentPage = this.currentPage ? this.currentPage : 1
            this.axios()
        }
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
    .content{
        width: 1120px;
        height: 100%;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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
        right: 20px;
    }
    .see{
        text-decoration: none;
    }
    .green{
        color: #1ffb2e;
    }
    .list{
        width:80%;
        margin: 0 auto;
        font-size:16px;
    }
    .list li{
        margin-top: 30px;
    }
    .list li .sp{
        display: inline-block;
        width:20%;
        text-align: right;
        float: left;
        margin-right: 3%;
    }
    .list li .sp2{
        display: inline-block;
        width:77%;
        text-align: center;
        float: left;
    }
    .list li .tex{
        display: inline-block;
        width:70%;
        height:36px;
        padding: 5px 10px;
        resize: none;
        float: left;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
    }
    .list .btnLi{
        text-align: center;
    }
    .btn{
        width:80px;
        display: inline-block;
    }
    .gray{
        color: #ccc;
        cursor: auto;
    }
    .content .logoImg {
        width:30px;
        height:30px;
    }
    .repayment {
        text-decoration: none;
    }
</style>
