<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>还款单详情</h2>
                <el-button @click="model" size="small" class="back2">返回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>还款单</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">待还款</span>
                        <input class="ipt" type="text" v-model="unCreditMoney" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">本次还款</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="pt" v-if="isShow">
                        <span class="tit">结算方式</span>
                        <input class="ipt" type="text" v-model="payType" readonly>
                    </li>
                    <li class="pt" v-if="isShow">
                        <span class="tit">银行账户</span>
                        <input class="ipt" type="text" v-model="bankName" readonly>
                    </li>
                    <li class="pt" v-if="isShow">
                        <span class="tit">确认时间</span>
                        <input class="ipt" type="text" v-model="creditDate" readonly>
                    </li>
                </ul>
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
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data () {
            return {
                unCreditMoney:'',//待还款
                money:'',//本次还款
                debit_id:'',//借款单ID
                debitId:this.$route.params.debitId,
                isRedFlush:this.$route.params.isRedFlush,
                isBossSee:this.$route.params.isBossSee,//是否为boss查看
                currentPage:this.$route.params.currentPage,
                activeName:this.$route.params.activeName,

                isShow:false,//是否显示结算方式等
                payType:'',//结算方式
                bankName:'',//银行账户
                creditDate:'',//确认时间
                userDebitAuditRecordList:[],
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(){
                if(this.isRedFlush){
                    this.$router.go(-1);
                }else{
                    this.$router.push({name:'repaymentList',params:{debitId:this.debit_id,activeName:this.activeName,currentPage:this.currentPage,isBossSee:this.isBossSee}})
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
            var url = addUrl.addUrl('seeRepayment')
            params.append('creditId',this.debitId);

            axios.post(url,params)
                .then(response=> {
                    this.loading = false
                    if(response.data.status == 200){
//                        console.log(response);
                        let data = response.data.value;
                        let debit = data.debit
                        let credit = data.credit;

                        this.debit_id = debit.debit_id
                        this.unCreditMoney = number.number(debit.un_credit_money)
                        this.money = number.number(credit.money);
                        let audit_flg = credit.audit_flg; //3,为待确认
                        let pay_type = credit.pay_type;

                        if(audit_flg == 4){
                            this.isShow = true
                            if(pay_type == 2){
                                this.payType = '银行支付'
                            }else if(pay_type == 1){
                                this.payType = '现金支付    '
                            }else{
                                this.payType = ''
                            }
                        }
                        this.bankName = credit.bank_name
                        this.creditDate = credit.credit_date

                        let userDebitAuditRecordList = credit.record_list
                        for(let i = 0; i < userDebitAuditRecordList.length; i++){
                            userDebitAuditRecordList[i].time = userDebitAuditRecordList[i].time.substring(0,10)
                        }
                        this.userDebitAuditRecordList = userDebitAuditRecordList
                    }else{
//                        console.log(response);
                        let msg = response.data.msg;
                        this.$message.error(msg);
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
        text-align: center;
        font-size:0px;
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
    .back2{
        position: absolute;
        right:20px;
        font-size:12px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .list{
        width:80%;
        text-align: center;
        margin: 0 auto;
    }
    .list .pt{
        width:100%;
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .ptx{
        width:100%;
        display: inline-block;
        height:320px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list li .ipt{
        display: inline-block;
        width:600px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list li .tit2{
        font-size:14px;
        display: inline-block;
        width:145px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .upload{
        width:100%;
    }
    .upload .tit2{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .upload .uploadBox{
        display: inline-block;
        width:76.7%;
        padding: 3px 10px;
        text-align: left;
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
    .dialogImageName{
        font-size:16px;
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
        width:700px;
        height:30px;
        text-align: center;
        padding: 2px 315px;
        border-bottom: 1px solid #ccc;
        border-radius: 3px;
    }
    .opinion{
        width:880px;
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
</style>
