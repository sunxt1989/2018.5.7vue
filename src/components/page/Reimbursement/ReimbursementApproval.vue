<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>报销单审批</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="danger" class="sub1" :loading="isLoading">驳回</el-button>
                <el-button @click="model(2)" size="small" type="primary" class="sub2" :loading="isLoading">同意</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>报销单审批</span>
                </div>
                <ul class="list cf">
                    <li class="hd" v-show="!isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-select class="sel" v-model="department" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>

                    <li class="sm" v-if="isShowShareItem1" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input1" class="input-with-select" readonly>
                            <el-select v-model="select1" slot="prepend" placeholder="请选择" class="input-select" disabled>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem2" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input2" class="input-with-select" readonly>
                            <el-select v-model="select2" slot="prepend" placeholder="请选择" class="input-select" disabled>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem3" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input3" class="input-with-select" readonly>
                            <el-select v-model="select3" slot="prepend" placeholder="请选择" class="input-select" disabled>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem4" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input4" class="input-with-select" readonly>
                            <el-select v-model="select4" slot="prepend" placeholder="请选择" class="input-select" disabled>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem5" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input5" class="input-with-select" readonly>
                            <el-select v-model="select5" slot="prepend" placeholder="请选择" class="input-select" disabled>
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                </ul>
                <ul class="list">
                    <li class="sm">
                        <span class="tit">报销名称</span>
                        <input class="ipt" type="text" v-model="originalTypeName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">报销日期</span>
                        <el-date-picker
                            class="sel"
                            v-model="simpleReceiptDate"
                            type="date"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期"
                            disabled>
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit">总金额</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">票据张数</span>
                        <input class="ipt" type="text" v-model="receiptCount" readonly>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" readonly>
                            </textarea>
                    </li>
                </ul>
                <div class="line">
                    <span>消费明细</span>
                </div>

                <el-table class="hkTable grayList" :data="receiptList">
                    <el-table-column prop="childTypeName" label="类型" sortable align="left">
                        <template slot-scope="scope">
                            <img class="logoImg"  :src=scope.row.url alt="">
                            <span>{{scope.row.childTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="simpleReceiptDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="discription" label="描述" sortable align="center"></el-table-column>
                    <el-table-column prop="operateUserName" label="姓名" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.showMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receiptCount" label="附件张数" sortable align="center"></el-table-column>
                </el-table>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in auditRecordList">
                        <img v-if="!item.faceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.faceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            ——
                            <span class="listDepartment">{{item.auditDepartmentName}}</span>
                            <span class="listData">{{item.simpleAuditTime}}</span>
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
                        <span>可选审批意见</span>
                        <el-select class="opinion" v-model="opinion" placeholder="请选择" @change="opinionChange">
                            <el-option
                                v-for="item in opinionList"
                                :key="item.value"
                                :label="item.opinionItem"
                                :value="item.value"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="opinionItem">
                        <span>审批意见</span>
                            <textarea v-model="discription2" name="opinionItem" id="opinionItem" maxlength="50">
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
                debitId:this.$route.params.debitId,//传参 ID
                originalTypeName:'',//报销名称
                money:'',//总金额
                simpleConfirmDate:'',//付款日期
                simpleReceiptDate:'',//报销日期
                receiptCount:'',//票据张数
                payType:'',//结算方式
                discription:'',//事由
                settlementMethod:'',//结算方式
                bankCode:'',//银行账号
                bankName:'',//银行名称
                type:'',
                originalType:'',

                isShare:false,//是否分摊
                department:'',//报销部门
                input1:0,
                input2:0,
                input3:0,
                input4:0,
                input5:0,
                select1:'',
                select2:'',
                select3:'',
                select4:'',
                select5:'',
                options:[],//报销部门列表
                isShowShareItem1:true,
                isShowShareItem2:true,
                isShowShareItem3:true,
                isShowShareItem4:true,
                isShowShareItem5:true,

                payTypeList:[//结算方式列表
                    {value:1,payTypeItem:'现金支付'},
                    {value:2,payTypeItem:'银行支付'}
                ],
                receiptList:[],//消费明细列表
                auditRecordList:[],//审批记录列表
                auditFlg:'',//报销单状态： 0 未提交 1 驳回；2/5/6 待审核； 3 待出纳确认；4 通过；7 已红冲；

                originalReceiptIds:'',//费用单id字符串（用逗号拼接）
                discription2:'同意',//审批意见
                opinion:'同意',//select框
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(n){
                this.loading = true
                if (n == 0) {
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                } else {
                    this.isLoading = true;
                    this.$confirm('确定是否提交？', '提示', {
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
                this.loading = true
                var params = new URLSearchParams();
                var url = '';
                var agreeUrl = addUrl.addUrl('ReimbursementApprovalAgree')
                var refuseUrl = addUrl.addUrl('ReimbursementApprovalRefuse')
                //判断n=1时为驳回，n=2时为同意
                if(n == 1){
                    url = refuseUrl
                    this.discription2 = this.discription2 == '同意' ? '驳回':this.discription2
                }else if(n == 2){
                    url = agreeUrl
                    this.discription2 = this.discription2 == '驳回' ? '同意':this.discription2
                }
                params.append('id',this.debitId);
                params.append('discription',this.discription2);
                axios.post(url,params)
                    .then(response=>{
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false
                        this.isLoading = false;
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },

            addUrl(list){
//                console.log(list);
                for(var i = 0; i < list.length; i++){
                    if(list[i].type <=3){
                        list[i].url = 'static/images/expense/originalReceipt'+ list[i].type + '-'+ list[i].childType1 +'.png'
                    }else{
                        list[i].url = 'static/images/expense/originalReceipt'+ list[i].type + '.png'
                    }
                }
                return list
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
            var url = addUrl.addUrl('ReimbursementApproval')
            params.append('id',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false;
                    var data = response.data.value;
                    this.originalTypeName = data.application.originalTypeName
                    this.type = data.application.type
                    this.money = number.number(data.application.money)
                    this.simpleConfirmDate = data.application.simpleConfirmDate
                    this.simpleReceiptDate = data.application.simpleReceiptDate
                    this.payType = data.application.payType
                    this.receiptCount = data.application.receiptCount
                    this.discription = data.application.discription
                    this.originalType = data.application.originalType
                    this.reimbursementDepartment = data.application.departmentIdString
                    this.settlementMethod = data.application.settlementMethod
                    this.auditPerson = data.application.auditPerson
                    this.bankCode = data.application.bankCode
                    this.bankName = data.application.bankName
                    this.auditFlg = data.application.auditFlg

                    let auditRecordList = data.auditRecordList;

                    this.auditRecordList = auditRecordList;

                    var receiptList = data.receiptList
//                    console.log(receiptList);
                    this.options = data.departmentList
//                    console.log(this.reimbursementDepartment);
                    var arr = [];
                    for(var i = 0; i < receiptList.length; i++){
                        receiptList[i].showMoney = number.number(receiptList[i].money)
                        arr.push(receiptList[i].idString)
                    }
                    this.originalReceiptIdArr = arr;
                    this.receiptList = this.addUrl(receiptList);

                    var divideFlg = data.application.divideFlg;//判断是否为分摊 0 为未分摊 1为分摊
                    if(divideFlg ==0){
                        this.isShare = false
                        this.department = data.application.departmentIdString1
                    }else{
                        this.isShare = true;
                        this.select1 = data.application.departmentIdString1
                        this.select2 = data.application.departmentIdString2
                        this.select3 = data.application.departmentIdString3
                        this.select4 = data.application.departmentIdString4
                        this.select5 = data.application.departmentIdString5

                        this.input1 = data.application.projectDivRate  || 0
                        this.input2 = data.application.projectDivRate2 || 0
                        this.input3 = data.application.projectDivRate3 || 0
                        this.input4 = data.application.projectDivRate4 || 0
                        this.input5 = data.application.projectDivRate5 || 0
                        if(data.application.departmentIdString1 == '0' || data.application.departmentIdString1 == 'null'){
                            this.isShowShareItem1 = false
                        }
                        if(data.application.departmentIdString2 == '0' || data.application.departmentIdString2 == 'null'){
                            this.isShowShareItem2 = false
                        }
                        if(data.application.departmentIdString3 == '0' || data.application.departmentIdString3 == 'null'){
                            this.isShowShareItem3 = false
                        }
                        if(data.application.departmentIdString4 == '0' || data.application.departmentIdString4 == 'null'){
                            this.isShowShareItem4 = false
                        }
                        if(data.application.departmentIdString5 == '0' || data.application.departmentIdString5 == 'null'){
                            this.isShowShareItem5 = false
                        }
                    }
                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
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
        text-align: left;
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
        height:80px;
    }
    .list .ptx{
        width:100%;
        height:170px;
    }
    .list li .ipt{
        display: inline-block;
        width:300px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .sel{
        width:322px;
        height:36px;
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
        width:76.8%;
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
        margin-left: 80px;
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
    .checkbox {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        margin: 10px 0px;
        padding: 0;
        cursor: pointer;
        float: left;
    }

    .checkbox i {
        position: absolute;
        left: -10px;
        top: -2px;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: none;
        font-size:20px;
        color: #1a96d4;
        font-weight: bold;
    }
    .checkbox input {
        position: absolute;
        z-index: 2;
        left: -10px;
        top: -10px;
        width: 200px;
        height: 200px;
        opacity: 0;
        cursor: pointer;
    }

    .checkbox input[type="checkbox"]:checked + i {
        display: block;
    }
    .checkbox.disabled {
        background-color: #ccc;
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
    .gridDataAdd{
        display: block;
        margin: 10px;
        float: right;
    }
    .all{
        display: inline-block;
        font-size:16px;
        margin-top: 10px;
        margin-left: -80%;
    }
    .checkboxAll{
        margin: 10px 10px;
    }
    .saveList{
        position: absolute;
        bottom:10px;
        right: 50px;
    }
    .grayList{
        margin: 30px 0;
    }
    .logoImg{
        width:22px;
        height:22px;
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
    .list li .input-with-select{
        font-size:14px;
        width:322px;
        text-align: right;
    }

    .list .hd{
        width:100%;
    }
    .share{
        display: block;
        margin-top: 10px;
        margin-left: 80px;
    }
    .input-select{
        width:200px;
    }
</style>
