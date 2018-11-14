<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>辅助业务审批</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">同意</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2" :loading="isLoading">驳回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>辅助业务</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">类型：</span>
                        <el-select class="sel" v-model="subjectCode" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">交易方</span>
                        <el-select class="sel" v-model="tradeId" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in tradeList"
                                :key="item.value"
                                :label="item.tradeName"
                                :value="item.idString">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">金额</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">日期</span>
                        <el-date-picker
                            class="data"
                            v-model="businessDate"
                            type="date"
                            :picker-options="pickerOption1"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            disabled>
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit">收款方式</span>
                        <el-select class="sel" v-model="payType" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">银行账户</span>
                        <el-select class="sel" v-model="bankCode" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in bankList"
                                :key="item.value"
                                :label="item.bankNameShow"
                                :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="ptx">
                        <span class="tit">备注</span>
                            <textarea class="tex" v-model="discription" maxlength="50" readonly>
                            </textarea>
                    </li>
                </ul>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in recordList">
                        <img v-if="!item.faceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.faceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            ——
                            <span class="listDepartment">{{item.auditUserType}}</span>
                            <span class="listData">{{item.auditTimeYMD}}</span>
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
    import addUrl from '../../../../static/js/addUrl'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import { mapState } from 'vuex'
    export default{
        data(){
            return{
                subjectCode:'',//类型编号
                options:[//类型
                    {value:'1123',label:'预付'},
                    {value:'2203',label:'预收'}
                ],
                money:'0.00',//金额
                businessDate:'',//日期
                payType:'1',//收款方式
                bankCode:'',//银行账户
                bankList:[],//银行列表
                tradeId:'',//交易方ID
                tradeList:[],//交易方列表

                options2:[//收款方式列表
                    {value:'1',label:'现金'},
                    {value:'2',label:'银行'},
                    {value:'5',label:'企业微信'},
                    {value:'6',label:'企业支付宝'},
                    {value:'7',label:'企业借贷宝'},
                ],
                discription:'',//备注
                recordList:'',//审批记录
                payList:[],//收付记录
                discription2:'同意',//审批意见
                opinion:'同意',//select框
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                isReject:false,//是否驳回
                debitId:this.$route.params.debitId,
                pickerOption1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['start_ym']),
        methods: {
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$router.go(-1)
                }else {
                    this.isLoading = true;
                    let message = ''
                    if(n == 1){
                        message = '确定是否提交？'
                    }else if(n == 2){
                        message = '确定是否驳回？'
                    }
                    this.$confirm(message, '提示', {
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
                        this.submit(n)
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
            submit(n){
                let params = new URLSearchParams();
                let url = ''
                if(n == 1){
                    url = addUrl.addUrl('approvalAuxiliaryAgree')
                    this.discription2 = this.discription2 == '驳回' ? '同意':this.discription2
                }else if(n == 2){
                    url = addUrl.addUrl('approvalAuxiliaryRefuse')
                    this.discription2 = this.discription2 == '同意' ? '驳回':this.discription2
                }
                params.append('businessId',this.debitId);
                params.append('discription',this.discription2);

                axios({
                    method:'post',
                    url:url,
                    data:params,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    }
                },params)
                    .then(response=> {
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
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
                        this.$message.error('提交失败，请重试！');
                    })
            }
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
            let params = new URLSearchParams();
            let url = addUrl.addUrl('seeAuxiliary')
            params.append('businessId',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    let recordList = data.recordList
                    this.recordList = recordList
                    this.bankList = data.bankList
                    this.tradeList = data.tradeList
                    let item = data.item;
                    this.money = number.number(item.amount);
                    this.subjectCode = item.subjectCode
                    this.bankCode = item.bankCode
                    this.tradeId = item.relationIdString
                    this.businessDate = item.businessDateYMD
                    this.payType = String(item.payType)
                    this.discription = item.discription

                    this.loading = false
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
    .list li .ipt{
        display: inline-block;
        width:400px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .data{
        width:422px;
        height:34px;
    }

    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list .pt .sel{
        display: inline-block;
        width:422px;
        height:34px;
    }
    .list .ptx{
        width:100%;
        display: inline-block;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .ptx .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
        float: left;
    }

    .list .ptx .tex{
        display: inline-block;
        width:400px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
        border: 1px solid #ccc;
    }
    .approval{
        width:80%;
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
        width:70%;
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
        width:70%;
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
        width:440px;
    }
    .opinionItem #opinionItem{
        display: inline-block;
        width:420px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
    }
</style>
