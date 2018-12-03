<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看银行账户</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" v-if="bookStatus != 2" :loading="isLoading">保存</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2" v-if="!isEnable" :loading="isLoading">启用</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>查看银行账户</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">银行名称</span>
                        <input class="ipt" type="text" v-model="bankName" maxlength="50" :readonly="isEnable">
                    </li>
                    <li class="sm">
                        <span class="tit">开户行</span>
                        <input class="ipt" type="text" v-model="bankChildName" maxlength="50" :readonly="isEnable">
                    </li>
                    <li class="sm">
                        <span class="tit">银行卡号</span>
                        <input class="ipt" type="text" v-model="bankCode" maxlength="50" @change="changeCode" :readonly="isEnable">
                    </li>
                    <li class="sm">
                        <span class="tit">账户余额</span>
                        <input class="ipt" type="text" v-model="endAmount" @change="changMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">缴税账户</span>
                        <el-checkbox class="check" v-model="taxFlg" size="medium" :disabled="isTrueTaxFlg">勾选会替换原有缴税账户</el-checkbox>
                    </li>
                    <li class="sm">
                        <span class="tit">社保账户</span>
                        <el-checkbox class="check" v-model="insuranceFlg" size="medium" :disabled="isTrueInsuranceFlg">勾选会替换原有社保账户</el-checkbox>
                    </li>
                    <li class="sm">
                        <span class="tit">公积金账户</span>
                        <el-checkbox class="check" v-model="housingFlg" size="medium" :disabled="isTrueHousingFlg">勾选会替换原有公积金账户</el-checkbox>
                    </li>
                    <li class="sm">
                        <span class="tit">工资账户</span>
                        <el-checkbox class="check" v-model="wagesFlg" size="medium" :disabled="isTrueWagesFlg">勾选会替换原有工资账户</el-checkbox>
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
    export default{
        data() {
            return{
                bankName:'',//银行名称
                bankChildName:'',//开户行
                bankCode:'',//银行卡号
                endAmount:'',//账户余额

                taxFlg:false,//缴税标记
                insuranceFlg:false,//社保标记
                housingFlg:false,//公积金标记
                wagesFlg:false,//工资标记

                isEnable:false,//是否为已启用 true为已启用
                isTrueTaxFlg:false,//是否为已选中
                isTrueInsuranceFlg:false,//是否为已选中
                isTrueHousingFlg:false,//是否为已选中
                isTrueWagesFlg:false,//是否为已选中

                bankAccountType:'',//账户类别 1：基本户，2：一般户
                bookStatus:'',//启用状态

                debitId:this.$route.params.debitId,
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            changeCode(){
                let bankCode = this.bankCode
                let str = /^\d+$/;//判断只允许输入正整数
                if(!str.test(bankCode)){
                    this.$message.error('请正确输入银行卡号');
                    this.bankCode = 0;
                    return
                }
            },
            changMoney(){
                let endAmount = this.endAmount;
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(endAmount)){
                    this.$message.error('请正确输入账户余额');
                    this.endAmount = '0.00';
                    return
                }
                this.endAmount = number.number(endAmount)
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    if(this.isEnable){
                        this.$router.go(-1)
                    }else{
                        this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.go(-1)
                        }).catch(() => {
                            this.loading = false;
                        });
                    }

                }else{
                    if (this.bankName == '') {
                        this.$message.error('请正确输入银行名称');
                        this.loading = false;
                        return
                    } else if (this.bankChildName == '') {
                        this.$message.error('请正确输入开户行');
                        this.loading = false;
                        return
                    }
                    if (this.bankCode.length < 6 ) {
                        this.$message.error('请正确输入银行卡号');
                        this.loading = false;
                        return
                    }
                    if(this.endAmount == ''){
                        this.$message.error('请正确输入账户余额');
                        this.loading = false;
                        return
                    }
                    this.isLoading = true;
                    let message = ''
                    if(n == 1){
                        message = '确定是否保存？'
                    }else if(n == 2){
                        message = '确定是否启用？'
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
                        this.axios(n);
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
            axios(n){
                let bookStatus = '';
                var params = new URLSearchParams();
                var url = addUrl.addUrl('bankSave');

                if(n == 2){
                    bookStatus = 1
                }else{
                    bookStatus = (this.bookStatus == 1) ? 1 : 0
                }
//                console.log(bookStatus,'bookStatus');

                params.append('bankId',this.debitId);
                params.append('bankAccountType',this.bankAccountType);
                params.append('bankName',this.bankName);
                params.append('bankChildName',this.bankChildName);
                params.append('bankCode',this.bankCode);
                params.append('initialAmount',unNumber.unNumber(this.endAmount));
                params.append('bookStatus',bookStatus);
                params.append('taxFlg',String(this.taxFlg));
                params.append('insuranceFlg',String(this.insuranceFlg));
                params.append('housingFlg',String(this.housingFlg));
                params.append('wagesFlg',String(this.wagesFlg));

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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('seeBank')
//            console.log(this.debitId);
            params.append('bankId',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let bankAccount = response.data.value.bankAccount
                    this.bankName = bankAccount.bankName
                    this.bankChildName = bankAccount.bankChildName
                    this.bankCode = bankAccount.bankCode
                    this.endAmount = number.number(bankAccount.endAmount)
                    this.bankAccountType = bankAccount.bankAccountType

                    //判断状态，如果是已启用，
                    let bookStatus = bankAccount.bookStatus;
                    this.bookStatus = bookStatus;
                    if(bookStatus == 1){
                        this.isEnable = true
                    }else if(bookStatus == 0){
                        this.isEnable = false
                        this.isTrueTaxFlg = true
                        this.isTrueInsuranceFlg = true
                        this.isTrueHousingFlg = true
                        this.isTrueWagesFlg = true
                    }else if(bookStatus == 2){
                        this.isEnable = true
                        this.isTrueTaxFlg = true
                        this.isTrueInsuranceFlg = true
                        this.isTrueHousingFlg = true
                        this.isTrueWagesFlg = true
                    }

                    let taxFlg = bankAccount.taxFlg
                    let insuranceFlg = bankAccount.insuranceFlg
                    let housingFlg = bankAccount.housingFlg
                    let wagesFlg = bankAccount.wagesFlg
                    //将数据类型改为布尔值,并且如果为1时禁用checkbox
                    if(taxFlg == 1){
                        this.taxFlg = true
                        this.isTrueTaxFlg = true
                    }else{
                        this.taxFlg = false
                    }
                    if(insuranceFlg == 1){
                        this.insuranceFlg = true
                        this.isTrueInsuranceFlg = true
                    }else{
                        this.insuranceFlg = false
                    }
                    if(housingFlg == 1){
                        this.housingFlg = true
                        this.isTrueHousingFlg = true
                    }else{
                        this.housingFlg = false
                    }
                    if(wagesFlg == 1){
                        this.wagesFlg = true
                        this.isTrueWagesFlg = true
                    }else{
                        this.wagesFlg = false
                    }
                    this.loading = false;
                })
                .catch(error=> {
//                    console.log(error);
                    alert('网络错误，不能访问');
                    this.loading = false;
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
    .list .pt{
        width:100%;

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
    .list li .check{
        height:28px;
        padding: 5px 10px;
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
        vertical-align: middle;
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

</style>
