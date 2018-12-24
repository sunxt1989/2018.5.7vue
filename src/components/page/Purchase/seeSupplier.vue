<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>交易方详情</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub" :loading="isLoading">保存</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>交易方详情</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <el-radio-group class="newSupplier" v-model="tradeType" :disabled="!isState">
                            <el-radio :label=true >公司</el-radio>
                            <el-radio :label=false >个人</el-radio>
                        </el-radio-group>
                    </li>
                    <li class="sm" v-show="tradeType">
                        <span class="tit"><span class="red">*</span>公司名称</span>
                        <input class="ipt" type="text" v-model="tradeName" :disabled="!isState">
                    </li>
                    <li class="sm" v-show="tradeType">
                        <span class="tit">统一社会信用代码</span>
                        <input class="ipt" type="text" v-model="tradeIdNumber" maxlength="18" :disabled="!isState">
                    </li>

                    <li class="sm" v-show="!tradeType">
                        <span class="tit"><span class="red">*</span>姓名</span>
                        <input class="ipt" type="text" v-model="userName" :disabled="!isState">
                    </li>
                    <li class="sm" v-show="!tradeType">
                        <span class="tit">身份证号</span>
                        <input class="ipt" type="text" v-model="IDnumber" maxlength="18" >
                    </li>

                    <li class="sm">
                        <span class="tit">地址</span>
                        <input class="ipt" type="text" v-model="tradeAddress">
                    </li>
                    <li class="sm">
                        <span class="tit">固定电话</span>
                        <input class="ipt" type="text" v-model="tradeTelephone"  maxlength="15">
                    </li>
                    <li class="sm">
                        <span class="tit">联系人</span>
                        <input class="ipt" type="text" v-model="tradePerson1">
                    </li>
                    <li class="sm">
                        <span class="tit">联系电话</span>
                        <input class="ipt" type="text" v-model="tradePersonPhone1" maxlength="15">
                    </li>
                    <li class="sm">
                        <span class="tit">紧急联系人</span>
                        <input class="ipt" type="text" v-model="tradePerson2">
                    </li>
                    <li class="sm">
                        <span class="tit">紧急联系电话</span>
                        <input class="ipt" type="text" v-model="tradePersonPhone2" maxlength="15">
                    </li>
                    <li class="sm">
                        <span class="tit">银行卡号</span>
                        <input class="ipt" type="text" v-model="bankCode" maxlength="50">
                    </li>
                    <li class="sm">
                        <span class="tit">身份选择</span>
                        <el-select class="sel" v-model="identity" multiple placeholder="请选择" :disabled="!isState">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
                <div class="line">
                    <span>交易记录</span>
                </div>
                <div id="purchase" @click="showList(0)" :class="{ blue: isShowList }">
                    采购交易记录
                    <i class="icon iconfont icon-sanjiao2" v-show="isShowList"></i>
                </div>
                <div id="sale" @click="showList(1)" :class="{ blue: !isShowList }">
                    销售交易记录
                    <i class="icon iconfont icon-sanjiao2" v-show="!isShowList"></i>
                </div>
                <el-table v-show="isShowList" :data="option1" class="grayList">
                    <el-table-column prop="simplePurchaseDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="type" label="类别" sortable align="center">
                        <template slot-scope="scope">
                                <span v-if="scope.row.type == 1">设备</span>
                                <span v-if="scope.row.type == 2">材料</span>
                                <span v-if="scope.row.type == 3">软件</span>
                                <span v-if="scope.row.type == 4">劳务服务</span>
                                <span v-if="scope.row.type == 5">技术服务</span>
                                <span v-if="scope.row.type == 6">库存商品</span>
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
                                <span v-if="scope.row.type == 99">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="commodityName" label="明细" sortable align="center"></el-table-column>
                    <el-table-column prop="totalMoney" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sendMoney" label="已付款" sortable align="center"></el-table-column>
                </el-table>

                <el-table v-show="!isShowList" :data="option2" class="grayList">
                    <el-table-column prop="simpleSaleDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="type" label="类别" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">产品</span>
                            <span v-if="scope.row.type == 2">技术服务</span>
                            <span v-if="scope.row.type == 3">技术开发</span>
                            <span v-if="scope.row.type == 4">技术咨询</span>
                            <span v-if="scope.row.type == 5">劳务</span>
                            <span v-if="scope.row.type == 6">软件</span>
                            <span v-if="scope.row.type == 7">设计服务</span>
                            <span v-if="scope.row.type == 99">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="discription" label="明细" sortable align="center"></el-table-column>
                    <el-table-column prop="totalMoney" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receivedMoney" label="已收款" sortable align="center"></el-table-column>
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

    export default{
        data(){
            return{
                tradeName:'',//公司名称
                userName:'',//姓名
                tradeIdNumber:'',//统一社会信用代码
                IDnumber:'',//身份证号
                tradeAddress:'',//地址
                tradeTelephone:'',//固定电话
                tradePerson1:'',//联系人
                tradePersonPhone1:'',//联系电话
                tradePerson2:'',//紧急联系人
                tradePersonPhone2:'',//紧急联系电话
                bankCode:'',//银行卡号
                identity:[],//身份选择
                options:[
                    {value:'0',label:'客户'},
                    {value:'1',label:'供应商'}
                ],
                tradeType: true,//true为公司 false为个人
                option1:[],//采购交易记录
                option2:[],//销售交易记录
                debitId:this.$route.params.debitId,
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                isShowList:true,// 是否显示采购列表 false显示销售列表
                isState:false,// 是否为未交易状态，如果是则允许修改所以内容
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            showList(n){
                if(n == 0){//采购交易记录
                    this.isShowList = true
                }else{//销售交易记录
                    this.isShowList = false
                }
            },
            model(n){
                this.loading = true
                var str3 = /^\d+$/;//判断是否为纯数字
                var bankCode = this.bankCode;
                if(n == 0){
                    this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    if(this.tradeType){
                        if(this.tradeName == ''){
                            this.$message.error('请正确输入公司名称');
                            this.loading = false
                            return
                        }
                    }else{
                        if(this.userName == ''){
                            this.$message.error('请正确输入姓名');
                             this.loading = false
                            return
                        }
                    }
                    if(bankCode != ''){
                        if(bankCode.length < 6 && !(str3.test(bankCode))){
                            this.$message.error('请正确输入银行卡号');
                             this.loading = false
                            return
                        }
                    }
                    this.isLoading = true;
                    this.$confirm('确定是否保存？', '提示', {
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
                        this.axios();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },
            axios(){
                var tradeName = ''
                var tradeIdNumber = ''
                var tradeType = ''
                var supplierFlg = 0 //供应商
                var customFlg = 0 //客户

                var identity = this.identity
                if(this.tradeType){
                    tradeName = this.tradeName
                    tradeIdNumber = this.tradeIdNumber || '';
                    tradeType = 1;
                }else{
                    tradeName = this.userName
                    tradeIdNumber = this.IDnumber || '';
                    tradeType = 2;
                }

                for(var i = 0; i < identity.length; i++){
                    if(identity[i] == 0){
                        customFlg = 1
                    }else if(identity[i] == 1){
                        supplierFlg = 1
                    }
                }
//                console.log(this.debitId);
                let params = new URLSearchParams();
                let url = addUrl.addUrl('saveSupplier')

                params.append('id',this.debitId);
                params.append('tradeName',tradeName);
                params.append('tradeIdNumber',tradeIdNumber);
                params.append('tradeAddress',this.tradeAddress);
                params.append('tradeTelephone',this.tradeTelephone);
                params.append('tradePerson1',this.tradePerson1);
                params.append('tradePersonPhone1',this.tradePersonPhone1);
                params.append('tradePerson2',this.tradePerson2);
                params.append('tradePersonPhone2',this.tradePersonPhone2);
                params.append('bankCode',this.bankCode);
                params.append('supplierFlg',supplierFlg);
                params.append('customFlg',customFlg);
                params.append('tradeType',tradeType);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '保存成功'
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
                        alert('网络错误，不能访问');
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
//            console.log(this.debitId);
            let params = new URLSearchParams();
            let url = addUrl.addUrl('seeSupplier')
            params.append('id',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false;
                    var data = response.data.value
                    var bankInfo = data.tradeCompany.bankInfoJson;//银行账户信息
                    var tradeName = data.tradeCompany.tradeName;//交易方名称
                    var tradeType = data.tradeCompany.tradeType;//往来单位类别，1：公司，2：个人
                    var tradeIdNumber = data.tradeCompany.tradeIdNumber;//社会信用代码
                    var customFlg = data.tradeCompany.customFlg;//是否是客户： 0 不是； 1 是
                    var supplierFlg = data.tradeCompany.supplierFlg;//是否是供应商： 0 不是； 1 是

                    this.tradeAddress = data.tradeCompany.tradeAddress || '';//地址

                    this.tradePerson1 = data.tradeCompany.tradePerson1 || '';//联系人
                    this.tradePersonPhone1 = data.tradeCompany.tradePersonPhone1 || '';//联系电话
                    this.tradePerson2 = data.tradeCompany.tradePerson2 || '';//紧急联系人
                    this.tradePersonPhone2 = data.tradeCompany.tradePersonPhone2 || '';//紧急联系电话
                    this.tradeTelephone = data.tradeCompany.tradeTelephone || '';//固定电话

                    var option1 = [];
                    var option2 = [];

                    if(data.purchaseList){
                        for(var i =0; i < data.purchaseList.length; i++){
                            data.purchaseList[i].showMoney = number.number(data.purchaseList[i].totalMoney);
                            option1.push(data.purchaseList[i])
                        }
                        this.option1 = option1;
                    }else{
                        this.option1 = data.purchaseList
                    }

                    if(data.saleList){
                        for(var ii =0; ii < data.saleList.length; ii++){
                            data.saleList[ii].showMoney = number.number(data.saleList[ii].totalMoney);
                            option2.push(data.saleList[ii])
                        }
                        this.option2 = option2;
                    }else{
                        this.option2 = data.saleList
                    }

                    //tradeType 为2时是个人
                    if(tradeType != 2){
                        this.tradeType = true
                        this.tradeName = tradeName
                        this.tradeIdNumber = tradeIdNumber
                    }else{
                        this.tradeType = false
                        this.userName = tradeName
                        this.IDnumber = tradeIdNumber
                    }
                    //银行账户信息arr格式；如果有多个的话，取第一条数据：[{"bankCode":"1511156156122222222"}]
                    this.bankCode = bankInfo[0].bankCode ? bankInfo[0].bankCode : '';
                    //判断身份选择
                    if(customFlg == 1){
                        this.identity.push('0')
                    }
                    if(supplierFlg == 1){
                        this.identity.push('1')
                    }

                    if(data.purchaseList.length == 0 && data.saleList.length == 0){
                        this.isState = true
                    }
                })
                .catch(error=> {
//                    console.log(error);
                    alert('网络错误，不能访问');
                    this.loading = false;
                })
        }
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
        right:20px;
        font-size:12px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
        text-align: left;
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
        float: left;
    }
    .list .sm{
        width:50%;
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

    .top .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .grayList{
        margin-top: 0px;
    }
    #purchase{
        width:100px;
        height:33px;
        display: inline-block;
        font-size:16px;
        text-align: center;
        position: relative;
        margin-top: 10px;
        margin-right: 30px;
        cursor: pointer;
    }
    #sale{
        width:100px;
        height:33px;
        display: inline-block;
        font-size:16px;
        text-align: center;
        position: relative;
        cursor: pointer;
    }
    .iconfont{
        color: #ededed;
        position: absolute;
        top: 17px;
        left: 33px;
    }
    .blue{
        color: #1a96d4;
    }

</style>
