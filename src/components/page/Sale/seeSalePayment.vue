<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>销售收款单详情</h2>
                <router-link v-if="!isRedFlush" class="back"
                             :to="{name:'salePaymentList',
                             params:{saleId:sale_id,isBossSee:isBossSee,choice:choice,activeName:activeName,currentPage:currentPage,auditFlg:auditFlg}}" >
                    返回
                </router-link>
                <el-button v-if="isRedFlush" @click="model" size="small" class="back2">返回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>收款单</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">待收款</span>
                        <input class="ipt" type="text" v-model="unreceiveMoney" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">本次收款</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="pt" v-if="isShow">
                        <span class="tit">收款方式</span>
                        <input class="ipt" type="text" v-model="payType" readonly>
                    </li>
                    <li class="pt" v-if="isShow">
                        <span class="tit">银行账户</span>
                        <input class="ipt" type="text" v-model="bankName" readonly>
                    </li>
                    <li class="pt" v-if="isShow">
                        <span class="tit">确认时间</span>
                        <input class="ipt" type="text" v-model="createDate" readonly>
                    </li>
                    <li class="ptx">
                        <div class="upload cf">
                            <span class="tit2">附件</span>
                            <div class="uploadBox">
                                <el-upload
                                    action="/"
                                    ref="upload"
                                    :on-preview="handlePictureCardPreview"
                                    list-type="picture-card"
                                    :file-list="attachUrlJson"
                                    disabled>
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </div>
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
                            <span class="listDepartment" v-if="item.audit_user_type != ''">——{{item.audit_user_type}}</span>
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
                unreceiveMoney:'',//待收款
                money:'',//本次收款
                sale_id:'',//销售单ID
                saleId:this.$route.params.saleId,
                choice:this.$route.params.choice,
                isRedFlush:this.$route.params.isRedFlush,
                currentPage:this.$route.params.currentPage,
                activeName:this.$route.params.activeName,
                isBossSee:this.$route.params.isBossSee,
                auditFlg:this.$route.params.auditFlg,

                userDebitAuditRecordList:[],
                attachUrlJson:[],//上传图片展示
                dialogVisible: false,//dialog是否打开状态
                dialogImageName:'',//展示图片名称
                dialogImageUrl:'',//展示图片URL

                payType:'',//付款方式
                bankName:'',//银行账户
                createDate:'',//确认时间
                isShow:false,//是否展示付款方式等信息

                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(){
                this.$router.go(-1)
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
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
//            console.log(this.saleId);
            var params = new URLSearchParams();
            var url = addUrl.addUrl('seeSalePayment')
            params.append('sale_receive_id',this.saleId);

            axios.post(url,params)
                .then(response=> {
                    this.loading = false
                    if(response.data.status == 200){
//                        console.log(response);
                        let data = response.data.value;
                        let receive = data.receive
                        this.unreceiveMoney = number.number(data.sale.unreceiveMoney)
                        this.money = number.number(receive.receive_money)
                        this.attachUrlJson = receive.attach_urls
                        let userDebitAuditRecordList = receive.record_list

                        let audit_flg = receive.audit_flg//销售收款单详情状态
                        let pay_type = receive.pay_type

                        if(audit_flg == 4){// 4：通过
                            this.isShow = true
                            if(pay_type == 2){
                                this.payType = '银行收款'
                            }else if(pay_type == 1){
                                this.payType = '现金收款'
                            }else{
                                this.payType = ''
                            }
                        }else{
                            this.isShow = false
                        }
                        this.bankName = receive.bank_name
                        this.createDate = receive.create_date

                        this.userDebitAuditRecordList = userDebitAuditRecordList
                        this.sale_id = data.sale.idString
                        for(let i = 0; i < this.userDebitAuditRecordList.length; i++){
                            this.userDebitAuditRecordList[i].time = this.userDebitAuditRecordList[i].time.substring(0,10)
                        }
                    }else{
//                        console.log(response);
                        var msg = response.data.msg;
                        this.$message.error(msg);
                    }

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
