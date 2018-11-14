<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>还款单确认</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-if="isCashier"  size="small" type="danger" class="sub1" :loading="isLoading">驳回</el-button>
                <el-button @click="model(2)" v-if="isCashier"  size="small" type="primary" class="sub2" :loading="isLoading">确认</el-button>
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
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in userDebitAuditRecordList">
                        <img v-if="!item.audit_user_uri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.audit_user_uri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.audit_user_name}}</span>
                            <span class="listDepartment" v-if="item.audit_department_name != ''">——{{item.audit_department_name}}</span>
                            <span class="listData">{{item.time}}</span>
                        </div>
                        <div class="listFooter">
                            <span class="listState">意见：</span>
                            <span class="listContent">{{item.discription}}</span>
                        </div>
                    </li>
                </ul>
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
                                :disabled="!isCashier">
                            </el-option>
                        </el-select>
                    </li>
                    <li>
                        <span>银行账户</span>
                        <el-select class="bankCode" v-model="bankCode" placeholder="请选择" :disabled="isTrue">
                            <el-option
                                v-for="item in bankAccountList"
                                :key="item.value"
                                :label="item.bank_name"
                                :value="item.bank_code">
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
                            :disabled="!isCashier">
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
                                :disabled="!isCashier">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="opinionItem">
                        <span>审批意见</span>
                            <textarea v-model="discription2" name="opinionItem" id="opinionItem" maxlength="50" :disabled="!isCashier">
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
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                money:'',//本次还款金额
                unCreditMoney:'',//待还款金额
                nowdata:'',//还款日期
                debitDate:'',//上传日期
                discription2:'同意',//审批意见
                opinion:'同意',//select框
                debitId:this.$route.params.debitId,
                userDebitAuditRecordList:[],//审批记录
                bankAccountList:[],//银行账户信息
                bankCode:'',//银行账户
                payType:'2',//付款类型
                payTypeList:[
                    {value:'1',payTypeItem:'现金收款'},{value:'2',payTypeItem:'银行收款'}
                ],//付款类型
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                isTrue:false,
                isCashier:true,//是否是出纳
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false;
                    });
                }else{
                    let msg = ''
                    if(n == 1){
                        msg = '确定是否驳回'
                    }else{
                        msg = '确定是否确认'
                        if(this.payType == '2' && this.bankCode == ''){
                            this.$message.error('请选择银行账户')
                            this.loading = false;
                            return
                        }
                        if(this.debitDate == ''){
                            this.$message.error('请选择确认日期')
                            this.loading = false;
                            return
                        }
                        //判断选择日期不能早于当前还款日期
                        if(Number(this.nowdata.split('-').join('')) > Number(this.debitDate.split('-').join(''))){
                            this.$message.error('确认日期不得早于当前还款日期')
                            this.loading = false;
                            return
                        }

                    }
                    this.isLoading = true;
                    this.$confirm(msg, '提示', {
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
                        this.axios(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                        this.isLoading = false;
                    });
                }
            },
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            axios(n){
                let params = new URLSearchParams();
                let url = '';
                let agreeUrl = addUrl.addUrl('repaymentConfirmationAgree')
                let refuseUrl = addUrl.addUrl('repaymentConfirmationRefuse')
                //判断n=1时为驳回，n=2时为同意
                if (n == 1) {
                    url = refuseUrl
                    this.discription2 = this.discription2 == '同意' ? '驳回':this.discription2
                } else if (n == 2) {
                    url = agreeUrl
                    this.discription2 = this.discription2 == '驳回' ? '同意':this.discription2
                }
                params.append('creditId', this.debitId);
                params.append('payType', this.payType);
                params.append('discription', this.discription2);
                params.append('bankCode', this.bankCode);
                params.append('confirmDate', this.debitDate);

                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
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
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false;
                        this.isLoading = false;
                        alert('网络错误，不能访问');
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
        computed:mapState(['isCashierFlg']),
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
            var url = addUrl.addUrl('seeRepayment')
            params.append('creditId',this.debitId);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;
//                    console.log(data);
                    let debit = data.debit
                    let credit = data.credit
                    this.unCreditMoney = number.number(debit.un_credit_money);
                    this.money = number.number(credit.money);
                    this.nowdata = credit.credit_date;
                    this.bankAccountList = data.bank_list;
                    this.userDebitAuditRecordList = credit.record_list

                    if(this.isCashierFlg){
                        this.isCashier = true;
                        this.isTrue = false
                    }else{
                        this.isCashier = false
                        this.isTrue = true
                    }
                    let date = new Date()
                    if(date.getMonth()+1 < 10){
                        this.debitDate = date.getFullYear() + '-0' + (date.getMonth()+1) ;
                    }else{
                        this.debitDate = date.getFullYear() + '-' + (date.getMonth()+1);
                    };

                    if(date.getDate() < 10){
                        this.debitDate += '-0' + date.getDate()
                    }else{
                        this.debitDate += '-' + date.getDate()
                    }
                })
                .catch(error=> {
                    this.loading = false;
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
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
    .top .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .top .sub2{
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
    .right .data{
        width:500px;
    }
    .right .el-table{
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
        margin-top: 20px;
    }
    .el-table thead th{
        color: #fff;
        background-color: #fff;
        height:42px;
        font-family: '思源黑体';
        padding: 0;
        font-weight:500;
    }
    .approval{
        width:100%;
        margin-top: 20px;
        font-size:14px;
    }
    .approval li{
        margin-top: 20px;
        text-align: left;
    }
    .approval li img{
        display: inline-block;
        width:50px;
        height:50px;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-left: 130px;
        margin-right: 20px;
    }
    .approval li .listHeader{
        display: inline-block;
        float: left;
        width:80%;
    }
    .approval li .listHeader .listName{

        margin-right: 10px;
    }
    .approval li .listHeader .listDepartment{
        margin-left: 10px;
    }
    .approval li .listHeader .listData{
        float: right;
    }
    .approval li .listFooter{
        display: inline-block;
        float: left;
        width:80%;
        margin-top: 10px;
    }
    .approval li .listFooter .listState{
        display: inline-block;
        float: left;
        margin-right: 10px;
    }
    .approval li .listFooter .listContent{
        width:90%;
        display: inline-block;
        float: left;
        height:50px;
        overflow: hidden;
    }
</style>
