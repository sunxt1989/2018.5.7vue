<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>借款单确认</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-if="isCashier" size="small" type="danger" class="sub1" :loading="isLoading">驳回</el-button>
                <el-button @click="model(2)" v-if="isCashier" size="small" type="primary" class="sub2" :loading="isLoading">确认</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>借款单</span>
                </div>
                <ul class="list">
                    <li class="sm">
                        <span class="tit">金额</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">已还金额</span>
                        <input class="ipt" type="text" v-model="creditMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">未还金额</span>
                        <input class="ipt" type="text" v-model="unCreditMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">时间</span>
                        <input class="ipt" type="text" v-model="debitDateYMD" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">借款人</span>
                        <input class="ipt" type="text" v-model="userName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">状态</span>
                        <input class="ipt" type="text" value="未提交" v-if="auditFlg == 0" readonly>
                        <input class="ipt" type="text" value="驳回" v-if="auditFlg == 1" readonly>
                        <input class="ipt" type="text" value="待审核" v-if="auditFlg == 2" readonly>
                        <input class="ipt" type="text" value="待出纳确认" v-if="auditFlg == 3" readonly>
                        <input class="ipt" type="text" value="待还款" v-if="auditFlg == 4" readonly>
                        <input class="ipt" type="text" value="待审核" v-if="auditFlg == 5" readonly>
                        <input class="ipt" type="text" value="待审核" v-if="auditFlg == 6" readonly>
                        <input class="ipt" type="text" value="已红冲" v-if="auditFlg == 7" readonly>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" name="" id="" readonly>
                            </textarea>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">附件</span>
                        <div class="uploadBox">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                list-type="picture-card"
                                :file-list="attachUrlJson"
                                :on-preview="handlePictureCardPreview"
                                disabled>
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </li>
                </ul>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in userDebitAuditRecordList">
                        <img v-if="!item.auditUserFaceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.auditUserFaceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            ——
                            <span class="listDepartment">{{item.auditDepartmentName}}</span>
                            <span class="listData">{{item.auditTimeYMDHM}}</span>
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
    import addUrl from '../../../../static/js/addUrl'
    import { mapState } from 'vuex';
    export default {
        data () {
            return {
                money:'',//借款金额
                creditMoney:'',//已还金额
                unCreditMoney:'',//待还款金额
                debitDateYMD:'',//借款单审批日期
                debitDate:'',//上传日期（格式修改后的）
                userName:'',//借款人
                auditFlg:'',//0 仅保存；1 驳回；2等待审核；3 等待出纳确认；4 通过；5 等待财务负责人审核；6 等待企业负责人审核；7 已对冲
                departmentId:'',//部门
                options:[],//部门详情
                discription:'',//事由
                discription2:'同意',//审批意见
                opinion:'同意',//select框
                debitId:this.$route.params.debitId,
                userDebitAuditRecordList:[],
                attachUrlJson:[],//上传图片展示
                dialogVisible: false,//dialog是否打开状态
                dialogImageName:'',//展示图片名称
                dialogImageUrl:'',//展示图片URL
                bankAccountList:[],//银行账户信息
                bankCode:'',//银行账户
                payType:'2',//付款类型
                payTypeList:[
                    {value:'1',payTypeItem:'现金支付'},{value:'2',payTypeItem:'银行支付'}
                ],//付款类型
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                isTrue:false,
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                isCashier:false,//是否是出纳
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
                }else {
                    let msg = ''
                    if(n == 1){
                        msg = '确定是否驳回'
                    }else{
                        msg = '确定是否确认'
                        if(this.debitDate == ''){
                            this.$message.error('请选择确认日期')
                            this.loading = false;
                            return
                        }
                        //判断选择日期不能早于借款审批日期
                        if(Number(this.debitDateYMD.split('-').join('')) > Number(this.debitDate.split('-').join(''))){
                            this.$message.error('确认日期不得早于借款审批日期')
                            this.loading = false;
                            return
                        }
                        if(this.payType == '2' && this.bankCode == ''){
                            this.$message.error('请选择银行账户')
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
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            axios(n){
                var params = new URLSearchParams();

                var url = '';
                var agreeUrl = addUrl.addUrl('loanConfirmationAgree')
                var refuseUrl = addUrl.addUrl('loanConfirmationRefuse')
                //判断n=1时为驳回，n=2时为同意
                if (n == 1) {
                    url = refuseUrl
                    this.discription2 = this.discription2 == '同意' ? '驳回':this.discription2
                } else if (n == 2) {
                    url = agreeUrl
                    this.discription2 = this.discription2 == '驳回' ? '同意':this.discription2
                }
                params.append('debitId', this.debitId);
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
            var url = addUrl.addUrl('loanConfirmation')
            params.append('debitId',this.debitId);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;
                    this.options = data.departmentList;
                    let userDebitAuditRecordList = data.userDebitAuditRecordList

                    this.userDebitAuditRecordList = userDebitAuditRecordList;
                    this.discription = data.userDebitItem.discription;
                    this.money = number.number(data.userDebitItem.money);
                    this.creditMoney = number.number(data.userDebitItem.creditMoney);
                    this.unCreditMoney = number.number(data.userDebitItem.unCreditMoney);
                    this.userName = data.userDebitItem.userName;
                    this.auditFlg = data.userDebitItem.auditFlg;
                    this.attachUrlJson = data.userDebitItem.attachUrlJson;
                    this.departmentId = data.userDebitItem.departmentIdStr;
                    this.debitDateYMD = data.userDebitItem.debitDateYMD;
                    this.bankAccountList = data.bankAccountList;
                    //判断是否是出纳，如果是允许操作
                    if(this.isCashierFlg){
                        this.isCashier = true;
                        this.isTrue = false
                    }else{
                        this.isCashier = false;
                        this.isTrue = true
                    }

                    for(var i = 0; i < this.userDebitAuditRecordList.length; i++){
                        this.userDebitAuditRecordList[i].auditTimeYMDHM = this.userDebitAuditRecordList[i].auditTimeYMDHM.substring(0,10)
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
        position: absolute;
        right:30px;
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
        width:100%;
    }
    .list li{
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
    }
    .list .sm{
        width:50%;
    }
    .list .pt{
        width:100%;
    }
    .list li .ipt{
        display: inline-block;
        width:320px;
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
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .list li .tex{
        width:78.7%;
        height:60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .list li .uploadBox{
        display: inline-block;
        width:78.7%;
        padding: 3px 10px;
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
        width:80%;
        height:30px;
        text-align: center;
        padding: 2px 35%;
        border: none;
        border-bottom: 1px solid #ccc;
    }
    .approval-opinion li .bankCode{
        width:700px;
        height:30px;
        text-align: center;
        border: none;
    }

    .opinionItem #opinionItem{
        display: inline-block;
        width:680px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
    }
</style>
