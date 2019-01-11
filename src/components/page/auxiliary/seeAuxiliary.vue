<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看辅助业务</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button v-if="isReject" @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">提交</el-button>
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
                        <el-select class="sel" v-model="subjectCode" placeholder="请选择" :disabled="!isReject">
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
                        <el-select class="sel" v-model="tradeName" placeholder="请选择" :disabled="!isReject">
                            <el-option
                                v-for="item in tradeList"
                                :key="item.value"
                                :label="item.tradeName"
                                :value="item.tradeName">
                            </el-option>
                        </el-select>
                        <input v-if="isReject" class="opt" type="text" v-model="tradeName" maxlength="18" placeholder="请选择或输入">
                    </li>
                    <li class="pt">
                        <span class="tit">金额</span>
                        <input class="ipt" type="text" v-model="money" @change="changeMoney" :readonly="!isReject">
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
                            :disabled="!isReject">
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit">结算方式</span>
                        <el-select class="sel" v-model="payType" placeholder="请选择" @change="payTypeChange" :disabled="!isReject">
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
                        <el-select class="sel" v-model="bankCode" placeholder="请选择" :disabled="isTrue || !isReject">
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
                            <textarea class="tex" v-model="discription" maxlength="50" :readonly="!isReject">
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
                    <span>收付记录</span>
                </div>
                <el-table class="hkTable grayList" :data="payList" style="width:100%">
                    <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                    <el-table-column prop="payType" label="收付款方式" sortable width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 1">现金支付</span>
                            <span v-else-if="scope.row.payType == 2">银行支付</span>
                            <span v-else-if="scope.row.payType == 5">企业微信</span>
                            <span v-else-if="scope.row.payType == 6">企业支付宝</span>
                            <span v-else-if="scope.row.payType == 7">企业借贷宝</span>
                            <span v-else>请选择</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="金额" sortable>
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="urlCount" label="附件" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.urlCount == 0">{{ scope.row.urlCount }}</span>
                            <span v-else @click="clickAppendix(scope.row.id)" class="blue">{{ scope.row.urlCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auditFlg" label="状态" sortable></el-table-column>
                </el-table>
                <el-dialog :visible.sync="dialogVisible" width="800px">
                    <el-carousel indicator-position="outside" :autoplay="false" height="400px">
                        <el-carousel-item v-for="item in attachUrlJson" :key="item.name">
                            <h3>{{ item.name }}</h3>
                            <img :src="item.url" alt="" style="width:auto;height:600px">
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
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
                    {value:'1122',label:'应收账款'},
                    {value:'1123',label:'预付账款'},
                    {value:'122101',label:'其他应收款-备用金'},
                    {value:'122102',label:'其他应收款-单位'},
                    {value:'122103',label:'其他应收款-个人'},
                    {value:'2202',label:'应付账款'},
                    {value:'2203',label:'预收账款'},
                    {value:'224101',label:'其他应付款-单位'},
                    {value:'224102',label:'其他应付款-个人'},
                    {value:'224199',label:'其他应付款-其他'},
                ],
                money:'0.00',//金额
                businessDate:'',//日期
                payType:'1',//收款方式
                bankCode:'',//银行账户
                bankList:[],//银行列表
                tradeName:'',//交易方名称
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

                attachUrlJson:[],//上传图片展示
                dialogVisible: false,//dialog是否打开状态
                isTrue:true,//是否禁用银行列表
                isReject:false,//是否驳回
                debitId:this.$route.params.debitId,
                currentPage:this.$route.params.currentPage,
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
            //点击附件事件
            clickAppendix(id){
                let payList = this.payList
                for(let i in payList){
                    if(payList[i].id == id){
//                        console.log(payList[i].urlJson);
                        this.attachUrlJson = payList[i].urlJson
                    }
                }
                this.dialogVisible = true;
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            //金额的change事件
            changeMoney(){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(this.money)){
                    this.$message.error('请正确输入金额')
                    this.money = '0.00'
                    return
                }
                this.money = number.number(this.money)
            },
            //判断支付方式，如果选择银行支付，银行账户才能使用
            payTypeChange(){
                if(this.payType == 2){
                    this.isTrue = false
                }else {
                    this.isTrue = true
                }
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    if(this.isReject){
                        this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.push({name:'auxiliaryList',params:{currentPage:this.currentPage}})
                        }).catch(() => {
                            this.loading = false;
                        });
                    }else{
                        this.$router.push({name:'auxiliaryList',params:{currentPage:this.currentPage}})
                    }
                }else {
                    if(this.subjectCode == ''){
                        this.$message.error('请选择类型')
                        this.loading = false;
                        return
                    }
                    if(this.tradeName == ''){
                        this.$message.error('请选择交易方')
                        this.loading = false;
                        return
                    }
                    if(this.money == '0.00'){
                        this.$message.error('请输入金额')
                        this.loading = false;
                        return
                    }
                    if(this.businessDate == ''){
                        this.$message.error('请选择日期')
                        this.loading = false;
                        return
                    }
                    if(this.businessDate == ''){
                        this.$message.error('请选择日期')
                        this.loading = false;
                        return
                    }
                    if(Number(this.businessDate.split('-').join('').substring(0,6)) < Number(this.start_ym) ){
                        this.$message.error('选择日期不得早于账套开账日期');
                        this.loading = false;
                        return
                    }
                    if(this.payType == '2' && this.bankCode == ''){
                        this.$message.error('请选择银行账户')
                        this.loading = false;
                        return
                    }
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
                        this.submit()
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
            submit(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('auxiliarySubmit');

                params.append('businessId',this.debitId);
                params.append('subjectCode',this.subjectCode);
                params.append('tradeName',this.tradeName);
                params.append('money',unNumber.unNumber(this.money));
                params.append('businessDate',this.businessDate);
                params.append('payType',this.payType);
                params.append('bankCode',this.bankCode);
                params.append('discription',this.discription);

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
                    this.payList = data.payList
                    this.bankList = data.bankList
                    this.tradeList = data.tradeList
                    for(let i in this.payList){
                        this.payList[i].showMoney = this.payList[i].money
                        this.payList[i].id = i
                    }
                    let item = data.item;
                    //判断是否为驳回状态
                    if(item.auditFlg == 1){
                        this.isReject = true
                    }else{
                        this.isReject = false
                    }
                    this.money = number.number(item.amount);
                    this.subjectCode = item.subjectCode
                    this.bankCode = item.bankCode
                    this.tradeName = item.relationName
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
    .dialogImageName{
        font-size:16px;
    }
    .blue{
        cursor: pointer;
    }
    .grayList{
        margin-top: 20px;
    }
    .opt{
        width:260px;
        height:28px;
        border: none;
        font-size:14px;
        position: absolute;
        top:5px;
        left:275px;
        outline:none;
        color: #333;
    }
</style>
