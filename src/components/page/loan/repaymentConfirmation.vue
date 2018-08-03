<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>还款单确认</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-if="!isBoss"  size="small" type="danger" class="sub1">驳回</el-button>
                <el-button @click="model(2)" v-if="!isBoss"  size="small" type="primary" class="sub2">确认</el-button>
            </div>
        </div>
        <div class="w cf">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>还款单</span>
                </div>
                <div class="left">
                    <ul>
                        <li>待还款</li>
                        <li>本次还款</li>
                        <li>还款日期</li>
                    </ul>
                </div>
                <div class="right cf">
                    <ul>
                        <li>
                            <input type="text" class="dhk" name="dhk" id="dhk" v-model="unCreditMoney" readonly>
                        </li>
                        <li>
                            <input type="text" class="hk" name="hk" id="hk" v-model="money" readonly>
                        </li>
                        <li>
                            <el-date-picker
                                class="data"
                                v-model="nowdata"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                disabled>
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
                <div class="line">
                    <span>还款明细</span>
                </div>
                <el-table class="hkTable grayList" :data="userCreditItemList" style="width:100%">
                    <el-table-column prop="debitDateYMD" label="日期" sortable width="180"></el-table-column>
                    <el-table-column prop="payType" label="还款方式" sortable width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 0"></span>
                            <span v-if="scope.row.payType == 1">现金支付</span>
                            <span v-if="scope.row.payType == 2">银行支付</span>
                            <span v-if="scope.row.payType == 3">暂不支付</span>
                            <span v-if="scope.row.payType == 4">冲抵个人借款</span>
                            <span v-if="scope.row.payType == 99">其他货币资金</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="还款金额" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auditFlg" label="还款状态" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0">未提交</span>
                            <span v-if="scope.row.auditFlg == 1">驳回</span>
                            <span v-if="scope.row.auditFlg == 2">待审核</span>
                            <span v-if="scope.row.auditFlg == 3">待出纳确认</span>
                            <span v-if="scope.row.auditFlg == 4">待还款</span>
                            <span v-if="scope.row.auditFlg == 5">待审核</span>
                            <span v-if="scope.row.auditFlg == 6">待审核</span>
                            <span v-if="scope.row.auditFlg == 7">已红冲</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="line">
                    <span>审批意见</span>
                </div>
                <ul class="approval-opinion">
                    <li>
                        <span>结算方式</span>
                        <el-select class="bankCode" v-model="payType" placeholder="请选择" @change="payTypeChange">
                            <el-option
                                v-for="item in payTypeList"
                                :key="item.value"
                                :label="item.payTypeItem"
                                :value="item.value"
                                :disabled="isBoss">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span>银行账户</span>
                        <el-select class="bankCode" v-model="bankCode" placeholder="请选择" :disabled="isTrue">
                            <el-option
                                v-for="item in bankAccountList"
                                :key="item.value"
                                :label="item.bankNameShow"
                                :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span>日期</span>
                        <el-date-picker
                            class="bankCode"
                            v-model="debitDate"
                            type="date"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期"
                            value-format="yyyy-MM-dd"
                            :disabled="isBoss">
                        </el-date-picker>
                    </li>
                    <li>
                        <span>可选审批意见</span>
                        <el-select class="bankCode" v-model="opinion" placeholder="请选择" @change="opinionChange">
                            <el-option
                                v-for="item in opinionList"
                                :key="item.value"
                                :label="item.opinionItem"
                                :value="item.value"
                                :disabled="isBoss">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="opinionItem">
                        <span>审批意见</span>
                            <textarea v-model="discription2" name="opinionItem" id="opinionItem" maxlength="50" :disabled="isBoss">
                            </textarea>
                    </li>
                </ul>
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
        data () {
            return {
                money:'',//本次还款金额
                unCreditMoney:'',//待还款金额
                nowdata:'',//还款日期
                debitDate:'',//上传日期（格式修改后的）
                discription2:'同意',//审批意见
                opinion:'同意',//select框
                debitId:this.$route.params.debitId,
                userCreditItemList:[],//还款明细
                bankAccountList:[],//银行账户信息
                bankCode:'',//银行账户
                payType:'1',//付款类型
                payTypeList:[
                    {value:'1',payTypeItem:'现金收款'},{value:'2',payTypeItem:'银行收款'}
                ],//付款类型
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                isTrue:true,
                isBoss:true,
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(n){
                if(n == 0){
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {});
                }else{
                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            axios(n){
                this.loading = true;
                var params = new URLSearchParams();
                var url = '';
                var agreeUrl = addUrl.addUrl('repaymentConfirmationAgree')
                var refuseUrl = addUrl.addUrl('repaymentConfirmationRefuse')
                params.append('creditId', this.debitId);
                params.append('payType', this.payType);
                params.append('discription', this.discription2);
                params.append('bankCode', this.bankCode);
                params.append('confirmDate', this.debitDate);
                //判断n=1时为驳回，n=2时为同意
                if (n == 1) {
                    url = refuseUrl
                } else if (n == 2) {
                    url = agreeUrl
                }
                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        if (response.data.status == 200) {
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                        } else if (response.data.status == 400) {
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
            },
            //判断支付方式，如果选择银行支付，银行账户才能使用
            payTypeChange(){
                if(this.payType == 1){
                    this.isTrue = true
                }else if(this.payType == 2){
                    this.isTrue = false
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
            var url = addUrl.addUrl('repaymentConfirmation')
            params.append('creditId',this.debitId);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;
//                    console.log(data);
                    this.unCreditMoney = number.number(data.userDebitItem.unCreditMoney);
                    this.money = number.number(data.userCreditItem.money);
                    this.nowdata = data.userCreditItem.debitDateYMD;
                    this.bankAccountList = data.bankAccountList;

                    var tableDataarr =[];
                    if(data.userCreditItemList){
                        for(var i =0; i < data.userCreditItemList.length; i++){
//                            console.log(data.userCreditItemList[i]);
                            data.userCreditItemList[i].showMoney = number.number(data.userCreditItemList[i].money);
                            tableDataarr.push(data.userCreditItemList[i])
                        }
                        this.userCreditItemList = tableDataarr;
                    }else{
                        this.userCreditItemList = data.userCreditItemList
                    }

                    var cashFlg = data.cashFlg;
                    if(cashFlg == 1){
                        this.isBoss = false;
                    }else{
                        this.isBoss = true
                    }
                })
        },
    }
</script>

<style scoped>
    .w{
        text-align: center;
    }
    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }
    h2{
        font-size:18px;
        display: inline-block;
    }
    .back{
        position: absolute;
        right:30px;
        font-size:12px;
    }
    .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .sub2{
        position: absolute;
        right:190px;
        font-size:12px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .left{
        display: inline-block;
        width:30%;
        float: left;
        text-align: right;
        background-color: #fff;
        font-size:16px;
    }
    .right{
        display: inline-block;
        width:70%;
        float: left;
        text-align: left;
        background-color: #fff;
        font-size:16px;
    }
    ul{
        margin-left: 10px;
    }
    ul li{
        line-height: 36px;
        margin: 20px 0;
    }
    input{
        width:478px;
        height:26px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .data{
        width:500px;
    }
    .el-table{
        margin-top: 30px;
        display: inline-block;
    }
    .approval-opinion{
        font-size:16px;
        margin-top: 30px;
    }
    .approval-opinion li{
        margin-top: 30px;
        text-align: center;
    }
    .approval-opinion li span{
        display: inline-block;
        width:100px;
        height:22px;
        vertical-align: top;
    }
    .approval-opinion li select{
        display: inline-block;
        width:80%;
        height:30px;
        text-align: center;
        padding: 2px 35%;
        border: none;
        border-bottom: 1px solid #ccc;
    }
    .approval-opinion li .bankCode{
        width:880px;
        height:30px;
        text-align: center;
        border: none;
    }

    .opinionItem #opinionItem{
        display: inline-block;
        width:860px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
    }
    .hkTable{
        width:100%;
    }
    .el-table thead th{
        color: #fff;
        background-color: #fff;
        height:42px;
        font-family: '思源黑体';
        padding: 0;
        font-weight:500;
    }
</style>
