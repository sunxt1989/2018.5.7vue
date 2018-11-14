<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>初始化工资补录</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">工资计提</el-button>
                <el-button @click="model(2)" size="small" class="sub2" :loading="isLoading">工资发放</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content cf" :style="{height:screenHeight}">
                <span class="tips">提示：</span>
                <span class="tips-span">本页面仅录入初始化当期上一个月已计提，本月发放的工资或上月未计提，本月发放的工资。以后期间的工资在“工资单”界面正常录入。 如果上个月已经计提，请直接在本页面填写上月计提数的明细，然后点击“工资发放”。如果上月未计提，请先到“工资单”界面录入工资明细，然后点击本页面的“工资计提”和“工资发放”。</span>
                <span class="careful">注意：</span>
                <span class="careful-span">发放工资之前，请在“银行业务”→“银行账户”列表中设置发放工资、缴纳社保、公积金的银行账户，如果不设置，系统将默认银行基本户进行账务处理。</span>
                <div class="line">
                    <span>个人缴费信息</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">应发工资</span>
                        <input class="ipt" type="text" v-model="shouldWages" maxlength="15" @change="changeMoney(0)">
                    </li>
                    <li class="sm">
                        <span class="tit blue">缴纳个税</span>
                        <input class="ipt" type="text" v-model="wage_base" maxlength="15" @change="wagesChange">
                    </li>
                    <li class="sm">
                        <span class="tit">养老保险</span>
                        <input class="ipt" type="text" v-model="endowmentInsurancePerson" maxlength="15" @change="changeMoney(1)">
                    </li>
                    <li class="sm">
                        <span class="tit">医疗保险</span>
                        <input class="ipt" type="text" v-model="medicalInsurancePerson" maxlength="15" @change="changeMoney(2)">
                    </li>
                    <li class="sm">
                        <span class="tit">失业保险</span>
                        <input class="ipt" type="text" v-model="unemploymentInsurancePerson" maxlength="15" @change="changeMoney(3)">
                    </li>
                    <li class="sm">
                        <span class="tit">工伤保险</span>
                        <input class="ipt" type="text" v-model="employmentInjuryInsurancePerson" maxlength="15" @change="changeMoney(4)">
                    </li>
                    <li class="sm">
                        <span class="tit">生育保险</span>
                        <input class="ipt" type="text" v-model="maternityInsurancePerson" maxlength="15" @change="changeMoney(5)">
                    </li>
                    <li class="sm">
                        <span class="tit">住房公积金</span>
                        <input class="ipt" type="text" v-model="housingProvidentFundPerson" maxlength="15" @change="changeMoney(6)">
                    </li>
                </ul>
                <div class="line">
                    <span>公司为员工缴纳社保和公积金</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">养老保险</span>
                        <input class="ipt" type="text" v-model="endowmentInsuranceCompany" maxlength="15" @change="changeMoney(8)">
                    </li>
                    <li class="sm">
                        <span class="tit">医疗保险</span>
                        <input class="ipt" type="text" v-model="medicalInsuranceCompany" maxlength="15" @change="changeMoney(9)">
                    </li>
                    <li class="sm">
                        <span class="tit">失业保险</span>
                        <input class="ipt" type="text" v-model="unemploymentInsuranceCompany" maxlength="15" @change="changeMoney(10)">
                    </li>
                    <li class="sm">
                        <span class="tit">工伤保险</span>
                        <input class="ipt" type="text" v-model="employmentInjuryInsuranceCompany" maxlength="15" @change="changeMoney(11)">
                    </li>
                    <li class="sm">
                        <span class="tit">生育保险</span>
                        <input class="ipt" type="text" v-model="maternityInsuranceCompany" maxlength="15" @change="changeMoney(12)">
                    </li>
                    <li class="sm">
                        <span class="tit">住房公积金</span>
                        <input class="ipt" type="text" v-model="housingProvidentFundCompany" maxlength="15" @change="changeMoney(13)">
                    </li>
                </ul>

            </div>
            <el-dialog title="选择付款方式" :visible.sync="dialogGrant" :before-close="handleClose" width="700px"
                       :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                <ul class="wagesUl">
                    <li>
                        <span class="wagesName">工资</span>
                        <el-radio v-model="wages" label="1">现金</el-radio>
                        <el-radio v-model="wages" label="2">银行</el-radio>
                        <el-radio v-model="wages" label="5">企业微信</el-radio>
                        <el-radio v-model="wages" label="6">企业支付宝</el-radio>
                        <el-radio v-model="wages" label="7">企业借贷宝</el-radio>
                    </li>
                    <li>
                        <span class="wagesName">社保</span>
                        <el-radio v-model="socialSecurity" label="1">现金</el-radio>
                        <el-radio v-model="socialSecurity" label="2">银行</el-radio>
                        <el-radio v-model="socialSecurity" label="5">企业微信</el-radio>
                        <el-radio v-model="socialSecurity" label="6">企业支付宝</el-radio>
                        <el-radio v-model="socialSecurity" label="7">企业借贷宝</el-radio>
                    </li>
                    <li>
                        <span class="wagesName">公积金</span>
                        <el-radio v-model="AccumulationFund" label="1">现金</el-radio>
                        <el-radio v-model="AccumulationFund" label="2">银行</el-radio>
                        <el-radio v-model="AccumulationFund" label="5">企业微信</el-radio>
                        <el-radio v-model="AccumulationFund" label="6">企业支付宝</el-radio>
                        <el-radio v-model="AccumulationFund" label="7">企业借贷宝</el-radio>
                    </li>
                    <li>
                        <span class="wagesName">个人所得税</span>
                        <el-radio v-model="IndividualIncomeTax" label="1">现金</el-radio>
                        <el-radio v-model="IndividualIncomeTax" label="2">银行</el-radio>
                        <el-radio v-model="IndividualIncomeTax" label="5">企业微信</el-radio>
                        <el-radio v-model="IndividualIncomeTax" label="6">企业支付宝</el-radio>
                        <el-radio v-model="IndividualIncomeTax" label="7">企业借贷宝</el-radio>
                    </li>
                </ul>
                <el-button @click="closeGrant" size="small">取 消</el-button>
                <el-button type="primary" @click="grant" size="small" :disabled="isComplete">确 定</el-button>
            </el-dialog>
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
                n:'',//保存提交按钮参数
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
                isShare:false,//是否分摊
                options4:[],//部门列表

                isNull:true,//是否计提过
                shouldWages:'0.00',//应发工资
                wage_base:'0.00',//缴纳个税
                endowmentInsurancePerson:'0.00',//养老保险（个人）
                medicalInsurancePerson:'0.00',//医疗保险（个人）
                unemploymentInsurancePerson:'0.00',//失业保险（个人）
                employmentInjuryInsurancePerson:'0.00',//工伤保险（个人）
                maternityInsurancePerson:'0.00',//生育保险（个人）
                housingProvidentFundPerson:'0.00',//住房公积金（个人）

                endowmentInsuranceCompany:'0.00',//养老保险（公司）
                medicalInsuranceCompany:'0.00',//医疗保险（公司）
                unemploymentInsuranceCompany:'0.00',//失业保险（公司）
                employmentInjuryInsuranceCompany:'0.00',//工伤保险（公司）
                maternityInsuranceCompany:'0.00',//生育保险（公司）
                housingProvidentFundCompany:'0.00',//住房公积金（公司）

                wages:'2',//工资发放分类
                socialSecurity:'2',//社保发放分类
                AccumulationFund:'2',//公积金发放分类
                IndividualIncomeTax:'2',//个人所得税发放分类

                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                dialogGrant:false,//工资发放模态框
                grantLoading:false,//工资发放按钮loading
                isComplete:false,//工资发放模态框确认按钮loading状态
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        watch:{
        },
        methods: {
            //关闭工资发放模态框取消按钮
            closeGrant(){
                this.dialogGrant = false;
                this.grantLoading = false;
                this.isLoading = false;
                this.loading = false
            },
            //工资发放模态框关闭调用方法
            handleClose(done){
                this.grantLoading = false;
                done();
            },
            //金额change事件
            changeMoney(n){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                let shouldWages = unNumber.unNumber(this.shouldWages)
                let endowmentInsurancePerson = unNumber.unNumber(this.endowmentInsurancePerson)
                let medicalInsurancePerson = unNumber.unNumber(this.medicalInsurancePerson)
                let unemploymentInsurancePerson = unNumber.unNumber(this.unemploymentInsurancePerson)
                let employmentInjuryInsurancePerson = unNumber.unNumber(this.employmentInjuryInsurancePerson)
                let maternityInsurancePerson = unNumber.unNumber(this.maternityInsurancePerson)
                let housingProvidentFundPerson = unNumber.unNumber(this.housingProvidentFundPerson)
                let endowmentInsuranceCompany = unNumber.unNumber(this.endowmentInsuranceCompany)
                let medicalInsuranceCompany = unNumber.unNumber(this.medicalInsuranceCompany)
                let unemploymentInsuranceCompany = unNumber.unNumber(this.unemploymentInsuranceCompany)
                let employmentInjuryInsuranceCompany = unNumber.unNumber(this.employmentInjuryInsuranceCompany)
                let maternityInsuranceCompany = unNumber.unNumber(this.maternityInsuranceCompany)
                let housingProvidentFundCompany = unNumber.unNumber(this.housingProvidentFundCompany)
                if(n == 0){
                    if(!str.test(shouldWages)){
                        this.$message.error('请正确输入应发工资');
                        this.shouldWages ='0.00';
                        return
                    }else{
                        this.shouldWages = number.number(shouldWages)

                    }
                }else if(n == 1){
                    if(!str.test(endowmentInsurancePerson)){
                        this.$message.error('请正确输入养老保险');
                        this.endowmentInsurancePerson ='0.00';
                        return
                    }else{
                        this.endowmentInsurancePerson = number.number(endowmentInsurancePerson)
                    }
                }else if(n == 2){
                    if(!str.test(medicalInsurancePerson)){
                        this.$message.error('请正确输入医疗保险');
                        this.medicalInsurancePerson ='0.00';
                        return
                    }else{
                        this.medicalInsurancePerson = number.number(medicalInsurancePerson)
                    }
                }else if(n == 3){
                    if(!str.test(unemploymentInsurancePerson)){
                        this.$message.error('请正确输入失业保险');
                        this.unemploymentInsurancePerson ='0.00';
                        return
                    }else{
                        this.unemploymentInsurancePerson = number.number(unemploymentInsurancePerson)
                    }
                }else if(n == 4){
                    if(!str.test(employmentInjuryInsurancePerson)){
                        this.$message.error('请正确输入工伤保险');
                        this.employmentInjuryInsurancePerson ='0.00';
                        return
                    }else{
                        this.employmentInjuryInsurancePerson = number.number(employmentInjuryInsurancePerson)
                    }
                }else if(n == 5){
                    if(!str.test(maternityInsurancePerson)){
                        this.$message.error('请正确输入生育保险');
                        this.maternityInsurancePerson ='0.00';
                        return
                    }else{
                        this.maternityInsurancePerson = number.number(maternityInsurancePerson)
                    }
                }else if(n == 6){
                    if(!str.test(housingProvidentFundPerson)){
                        this.$message.error('请正确输入住房公积金');
                        this.housingProvidentFundPerson ='0.00';
                        return
                    }else{
                        this.housingProvidentFundPerson = number.number(housingProvidentFundPerson)
                    }
                }else if(n == 8){
                    if(!str.test(endowmentInsuranceCompany)){
                        this.$message.error('请正确输入养老保险');
                        this.endowmentInsuranceCompany ='0.00';
                        return
                    }else{
                        this.endowmentInsuranceCompany = number.number(endowmentInsuranceCompany)
                    }
                }else if(n == 9){
                    if(!str.test(medicalInsuranceCompany)){
                        this.$message.error('请正确输入医疗保险');
                        this.medicalInsuranceCompany ='0.00';
                        return
                    }else{
                        this.medicalInsuranceCompany = number.number(medicalInsuranceCompany)
                    }
                }else if(n == 10){
                    if(!str.test(unemploymentInsuranceCompany)){
                        this.$message.error('请正确输入失业保险');
                        this.unemploymentInsuranceCompany ='0.00';
                        return
                    }else{
                        this.unemploymentInsuranceCompany = number.number(unemploymentInsuranceCompany)
                    }
                }else if(n == 11){
                    if(!str.test(employmentInjuryInsuranceCompany)){
                        this.$message.error('请正确输入工伤保险');
                        this.employmentInjuryInsuranceCompany ='0.00';
                        return
                    }else{
                        this.employmentInjuryInsuranceCompany = number.number(employmentInjuryInsuranceCompany)
                    }
                }else if(n == 12){
                    if(!str.test(maternityInsuranceCompany)){
                        this.$message.error('请正确输入生育保险');
                        this.maternityInsuranceCompany ='0.00';
                        return
                    }else{
                        this.maternityInsuranceCompany = number.number(maternityInsuranceCompany)
                    }
                }else if(n == 13){
                    if(!str.test(housingProvidentFundCompany)){
                        this.$message.error('请正确输入住房公积金');
                        this.housingProvidentFundCompany ='0.00';
                        return
                    }else{
                        this.housingProvidentFundCompany = number.number(housingProvidentFundCompany)
                    }
                }
            },
            //社保change事件
            wagesChange(){
                let wage_base = this.wage_base
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(wage_base)){
                    this.$message.error('请正确输入社保缴费工资');
                    this.wage_base ='0.00';
                    return
                }
                this.wage_base =number.number(wage_base)
            },
            model(n){
                this.loading = true
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1);
                    }).catch(() => {
                        this.loading = false
                    });
                }else if(n == 1){
                    this.isLoading = true;
                    this.$confirm('确定是否计提？', '提示', {
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
                        this.calculation()
                    }).catch(() => {

                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                }else if(n == 2){
                    this.isLoading = true;
                    if(this.isNull){
                        this.$confirm('确认上月工资已经计提，本月只需要发放工资？如上月未计提，请先计提工资', '提示', {
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
                            this.dialogGrant = true;
                            this.wages = '2'
                            this.socialSecurity = '2'
                            this.AccumulationFund = '2'
                            this.IndividualIncomeTax = '2'
                            this.loading = false;
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                            this.loading = false
                            this.isLoading = false;
                        });
                    }else{
                        this.dialogGrant = true;
                        this.wages = '2'
                        this.socialSecurity = '2'
                        this.AccumulationFund = '2'
                        this.IndividualIncomeTax = '2'
                        this.loading = false;
                        this.isLoading = false;
                    }
                }
            },
            calculation(){
                let url = addUrl.addUrl('calculation');
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value;
                        let msg = data.msg;
                        let result = data.result
                        if(result == 1){
                            this.$message.success(msg);
                            this.shouldWages = data.yingfagongzi || '0.00'
                            this.wage_base = data.jiaonageshui || '0.00'
                            this.endowmentInsurancePerson = data.yanglaobaoxian_p || '0.00'
                            this.medicalInsurancePerson = data.yiliaobaoxian_p || '0.00'
                            this.unemploymentInsurancePerson = data.shiyebaoxian_p || '0.00'
                            this.employmentInjuryInsurancePerson = data.gongshangbaoxian_p || '0.00'
                            this.maternityInsurancePerson = data.shengyubaoxian_p || '0.00'
                            this.housingProvidentFundPerson = data.gongjijin_p || '0.00'
                            this.endowmentInsuranceCompany = data.yanglaobaoxian_c || '0.00'
                            this.medicalInsuranceCompany = data.yiliaobaoxian_c || '0.00'
                            this.unemploymentInsuranceCompany = data.shiyebaoxian_c || '0.00'
                            this.employmentInjuryInsuranceCompany = data.gongshangbaoxian_c || '0.00'
                            this.maternityInsuranceCompany = data.shengyubaoxian_c || '0.00'
                            this.housingProvidentFundCompany = data.gongjijin_c || '0.00'
                        }else{
                            this.$message.error(msg);
                        }
                        this.loading = false
                        this.isLoading = false;
                    })
                    .catch(error=> {
                        this.loading = false
                        this.isLoading = false;
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            grant(){
                this.isComplete = true;
                this.$confirm('确定是否工资发放？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
//                    console.log(this.wages);
                    let params = new URLSearchParams();
                    let url = addUrl.addUrl('provide');
                    params.append('gzPayWay', this.wages)
                    params.append('sbPayWay', this.socialSecurity)
                    params.append('gjjPayWay', this.AccumulationFund)
                    params.append('gsPayWay', this.IndividualIncomeTax)

                    params.append('yingfagongzi', this.shouldWages)
                    params.append('jiaonageshui', this.wage_base)
                    params.append('yanglaobaoxian_p', this.endowmentInsurancePerson)
                    params.append('yiliaobaoxian_p', this.medicalInsurancePerson)
                    params.append('shiyebaoxian_p', this.unemploymentInsurancePerson)
                    params.append('gongshangbaoxian_p', this.employmentInjuryInsurancePerson)
                    params.append('shengyubaoxian_p', this.maternityInsurancePerson)
                    params.append('gongjijin_p', this.housingProvidentFundPerson)
                    params.append('yanglaobaoxian_c', this.endowmentInsuranceCompany)
                    params.append('yiliaobaoxian_c', this.medicalInsuranceCompany)
                    params.append('shiyebaoxian_c', this.unemploymentInsuranceCompany)
                    params.append('gongshangbaoxian_c', this.employmentInjuryInsuranceCompany)
                    params.append('shengyubaoxian_c', this.maternityInsuranceCompany)
                    params.append('gongjijin_c', this.housingProvidentFundCompany)

                    axios.post(url, params)
                        .then(response=> {
//                            console.log(response);
                            let data = response.data.value;
                            let msg = data.msg;
                            let result = data.result
                            if (result == 1) {
                                this.$message.success(msg);
                            } else {
                                this.$message.error(msg);
                            }
                            this.loading = false;
                            this.isLoading = false;
                            this.isComplete = false;
                            this.grantLoading = false;
                            this.dialogGrant = false;
                        })
                        .catch(error=> {
                            this.loading = false
                            this.isLoading = false;
                            this.grantLoading = false;
                            this.isComplete = false;
                            this.dialogGrant = false;
                        });
                }).catch(()=> {
                    this.loading = false
                    this.isLoading = false;
                    this.isComplete = false;
                    this.grantLoading = false;
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
            let url = addUrl.addUrl('record');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    if(data === null){
                        this.isNull = true
                    }else{
                        this.isNull = false
                        this.shouldWages = data.yingfagongzi || '0.00';
                        this.wage_base = data.jiaonageshui || '0.00';
                        this.endowmentInsurancePerson = data.yanglaobaoxian_p || '0.00';
                        this.medicalInsurancePerson = data.yiliaobaoxian_p || '0.00';
                        this.unemploymentInsurancePerson = data.shiyebaoxian_p || '0.00';
                        this.employmentInjuryInsurancePerson = data.gongshangbaoxian_p || '0.00';
                        this.maternityInsurancePerson = data.shengyubaoxian_p || '0.00';
                        this.housingProvidentFundPerson = data.gongjijin_p || '0.00';
                        this.endowmentInsuranceCompany = data.yanglaobaoxian_c || '0.00';
                        this.medicalInsuranceCompany = data.yiliaobaoxian_c || '0.00';
                        this.unemploymentInsuranceCompany = data.shiyebaoxian_c || '0.00';
                        this.employmentInjuryInsuranceCompany = data.gongshangbaoxian_c || '0.00';
                        this.maternityInsuranceCompany = data.shengyubaoxian_c || '0.00';
                        this.housingProvidentFundCompany = data.gongjijin_c || '0.00';
                    }
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
        text-align: left;
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
    .top .sub1{
        position: absolute;
        right:92px;
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
    .content .tips{
        display: block;
        font-size:16px;
        font-weight: bold;
        color: #333;
    }
    .content .tips-span{
        display: inline-block;
        margin-left: 30px;
        font-size:14px;
        color: #333;
    }
    .content .careful{
        display: block;
        font-size:16px;
        font-weight: bold;
        color: #333;
    }
    .content .careful-span{
        display: inline-block;
        margin-left: 30px;
        font-size:14px;
        color: red;
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
    .list li .iptData{
        width:322px;
        height:36px;
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
    .list .hd{
        width:100%;
        height:auto;
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
    .blue{
        color: #1a96d4;
    }
    .wagesUl{
        margin-bottom: 30px;
    }
    .wagesUl .wagesName{
        display: inline-block;
        width:100px;
    }
</style>
