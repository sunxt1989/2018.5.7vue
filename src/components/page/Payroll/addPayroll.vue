<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>新增临时员工</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content cf" :style="{height:screenHeight}">
                <div class="line">
                    <span>新增临时员工</span>
                </div>
                <el-button type="danger" plain size="small" class="share" @click="shareClick">
                    <span v-show="!isShare">费用分摊</span>
                    <span v-show="isShare">取消费用分摊</span>
                </el-button>
                <ul class="list cf">
                    <li class="hd" v-show="!isShare">
                        <span class="tit">部门/项目</span>
                        <el-select class="sel" v-model="department" placeholder="请选择">
                            <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>

                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input1" class="input-with-select" @change="inputWithSelectChange(1,$event)">
                            <el-select v-model="select1" slot="prepend" placeholder="请选择" class="input-select">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input2" class="input-with-select" @change="inputWithSelectChange(2,$event)">
                            <el-select v-model="select2" slot="prepend" placeholder="请选择" class="input-select">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input3" class="input-with-select" @change="inputWithSelectChange(3,$event)">
                            <el-select v-model="select3" slot="prepend" placeholder="请选择" class="input-select">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input4" class="input-with-select" @change="inputWithSelectChange(4,$event)">
                            <el-select v-model="select4" slot="prepend" placeholder="请选择" class="input-select">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input5" class="input-with-select" @change="inputWithSelectChange(5,$event)">
                            <el-select v-model="select5" slot="prepend" placeholder="请选择" class="input-select">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                </ul>
                <div class="line">
                    <span>个人缴费信息</span>
                </div>
                <ul class="list cf">
                    <li class="sm" >
                        <span class="tit">姓名</span>
                        <input class="ipt" type="text" v-model="userName" maxlength="50">
                    </li>
                    <li class="sm">
                        <span class="tit">应发工资</span>
                        <input class="ipt" type="text" v-model="shouldWages" maxlength="15" @change="changeMoney(0)">
                    </li>
                    <li class="sm">
                        <span class="tit blue">社保缴费工资</span>
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
                    <li class="sm">
                        <span class="tit">五险一金</span>
                        <input class="ipt" type="text" v-model="insuranceSumPerson"  placeholder="合计无需填写" readonly>
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
                    <li class="sm">
                        <span class="tit">五险一金</span>
                        <input class="ipt" type="text" v-model="insuranceSumCompany"  placeholder="合计无需填写" readonly>
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

                userName:'',//姓名
                shouldWages:'',//应发工资
                wage_base:'',//社保缴费工资
                endowmentInsurancePerson:'0.00',//养老保险（个人）
                medicalInsurancePerson:'0.00',//医疗保险（个人）
                unemploymentInsurancePerson:'0.00',//失业保险（个人）
                employmentInjuryInsurancePerson:'0.00',//工伤保险（个人）
                maternityInsurancePerson:'0.00',//生育保险（个人）
                housingProvidentFundPerson:'0.00',//住房公积金（个人）
                insuranceSumPerson:'',//五险一金（个人）

                endowmentInsuranceCompany:'0.00',//养老保险（公司）
                medicalInsuranceCompany:'0.00',//医疗保险（公司）
                unemploymentInsuranceCompany:'0.00',//失业保险（公司）
                employmentInjuryInsuranceCompany:'0.00',//工伤保险（公司）
                maternityInsuranceCompany:'0.00',//生育保险（公司）
                housingProvidentFundCompany:'0.00',//住房公积金（公司）
                insuranceSumCompany:'',//五险一金（公司）

                currentYM:this.$route.params.ym,//当前日期
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
        watch:{
        },
        methods: {
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
                let insuranceSumPerson = unNumber.unNumber(this.insuranceSumPerson)
                let endowmentInsuranceCompany = unNumber.unNumber(this.endowmentInsuranceCompany)
                let medicalInsuranceCompany = unNumber.unNumber(this.medicalInsuranceCompany)
                let unemploymentInsuranceCompany = unNumber.unNumber(this.unemploymentInsuranceCompany)
                let employmentInjuryInsuranceCompany = unNumber.unNumber(this.employmentInjuryInsuranceCompany)
                let maternityInsuranceCompany = unNumber.unNumber(this.maternityInsuranceCompany)
                let housingProvidentFundCompany = unNumber.unNumber(this.housingProvidentFundCompany)
                let insuranceSumCompany = unNumber.unNumber(this.insuranceSumCompany)
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
                    insuranceSumPerson = parseFloat(endowmentInsurancePerson + medicalInsurancePerson + unemploymentInsurancePerson + employmentInjuryInsurancePerson + maternityInsurancePerson + housingProvidentFundPerson).toFixed(2)
                    this.insuranceSumPerson = number.number(insuranceSumPerson)
                }else if(n == 2){
                    if(!str.test(medicalInsurancePerson)){
                        this.$message.error('请正确输入医疗保险');
                        this.medicalInsurancePerson ='0.00';
                        return
                    }else{
                        this.medicalInsurancePerson = number.number(medicalInsurancePerson)
                    }
                    insuranceSumPerson = parseFloat(endowmentInsurancePerson + medicalInsurancePerson + unemploymentInsurancePerson + employmentInjuryInsurancePerson + maternityInsurancePerson + housingProvidentFundPerson).toFixed(2)
                    this.insuranceSumPerson = number.number(insuranceSumPerson)
                }else if(n == 3){
                    if(!str.test(unemploymentInsurancePerson)){
                        this.$message.error('请正确输入失业保险');
                        this.unemploymentInsurancePerson ='0.00';
                        return
                    }else{
                        this.unemploymentInsurancePerson = number.number(unemploymentInsurancePerson)
                    }
                    insuranceSumPerson = parseFloat(endowmentInsurancePerson + medicalInsurancePerson + unemploymentInsurancePerson + employmentInjuryInsurancePerson + maternityInsurancePerson + housingProvidentFundPerson).toFixed(2)
                    this.insuranceSumPerson = number.number(insuranceSumPerson)
                }else if(n == 4){
                    if(!str.test(employmentInjuryInsurancePerson)){
                        this.$message.error('请正确输入工伤保险');
                        this.employmentInjuryInsurancePerson ='0.00';
                        return
                    }else{
                        this.employmentInjuryInsurancePerson = number.number(employmentInjuryInsurancePerson)
                    }
                    insuranceSumPerson = parseFloat(endowmentInsurancePerson + medicalInsurancePerson + unemploymentInsurancePerson + employmentInjuryInsurancePerson + maternityInsurancePerson + housingProvidentFundPerson).toFixed(2)
                    this.insuranceSumPerson = number.number(insuranceSumPerson)
                }else if(n == 5){
                    if(!str.test(maternityInsurancePerson)){
                        this.$message.error('请正确输入生育保险');
                        this.maternityInsurancePerson ='0.00';
                        return
                    }else{
                        this.maternityInsurancePerson = number.number(maternityInsurancePerson)
                    }
                    insuranceSumPerson = parseFloat(endowmentInsurancePerson + medicalInsurancePerson + unemploymentInsurancePerson + employmentInjuryInsurancePerson + maternityInsurancePerson + housingProvidentFundPerson).toFixed(2)
                    this.insuranceSumPerson = number.number(insuranceSumPerson)
                }else if(n == 6){
                    if(!str.test(housingProvidentFundPerson)){
                        this.$message.error('请正确输入住房公积金');
                        this.housingProvidentFundPerson ='0.00';
                        return
                    }else{
                        this.housingProvidentFundPerson = number.number(housingProvidentFundPerson)
                    }
                    insuranceSumPerson = parseFloat(endowmentInsurancePerson + medicalInsurancePerson + unemploymentInsurancePerson + employmentInjuryInsurancePerson + maternityInsurancePerson + housingProvidentFundPerson).toFixed(2)
                    this.insuranceSumPerson = number.number(insuranceSumPerson)
                }else if(n == 8){
                    if(!str.test(endowmentInsuranceCompany)){
                        this.$message.error('请正确输入养老保险');
                        this.endowmentInsuranceCompany ='0.00';
                        return
                    }else{
                        this.endowmentInsuranceCompany = number.number(endowmentInsuranceCompany)
                    }
                    insuranceSumCompany = parseFloat(endowmentInsuranceCompany + medicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany + maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
                    this.insuranceSumCompany = number.number(insuranceSumCompany)
                }else if(n == 9){
                    if(!str.test(medicalInsuranceCompany)){
                        this.$message.error('请正确输入医疗保险');
                        this.medicalInsuranceCompany ='0.00';
                        return
                    }else{
                        this.medicalInsuranceCompany = number.number(medicalInsuranceCompany)
                    }
                    insuranceSumCompany =parseFloat(endowmentInsuranceCompany + medicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany + maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
                    this.insuranceSumCompany = number.number(insuranceSumCompany)
                }else if(n == 10){
                    if(!str.test(unemploymentInsuranceCompany)){
                        this.$message.error('请正确输入失业保险');
                        this.unemploymentInsuranceCompany ='0.00';
                        return
                    }else{
                        this.unemploymentInsuranceCompany = number.number(unemploymentInsuranceCompany)
                    }
                    insuranceSumCompany =parseFloat(endowmentInsuranceCompany + medicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany + maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
                    this.insuranceSumCompany = number.number(insuranceSumCompany)
                }else if(n == 11){
                    if(!str.test(employmentInjuryInsuranceCompany)){
                        this.$message.error('请正确输入工伤保险');
                        this.employmentInjuryInsuranceCompany ='0.00';
                        return
                    }else{
                        this.employmentInjuryInsuranceCompany = number.number(employmentInjuryInsuranceCompany)
                    }
                    insuranceSumCompany =parseFloat(endowmentInsuranceCompany + medicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany + maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
                    this.insuranceSumCompany = number.number(insuranceSumCompany)
                }else if(n == 12){
                    if(!str.test(maternityInsuranceCompany)){
                        this.$message.error('请正确输入生育保险');
                        this.maternityInsuranceCompany ='0.00';
                        return
                    }else{
                        this.maternityInsuranceCompany = number.number(maternityInsuranceCompany)
                    }
                    insuranceSumCompany =parseFloat(endowmentInsuranceCompany + medicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany + maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
                    this.insuranceSumCompany = number.number(insuranceSumCompany)
                }else if(n == 13){
                    if(!str.test(housingProvidentFundCompany)){
                        this.$message.error('请正确输入住房公积金');
                        this.housingProvidentFundCompany ='0.00';
                        return
                    }else{
                        this.housingProvidentFundCompany = number.number(housingProvidentFundCompany)
                    }
                    insuranceSumCompany =parseFloat(endowmentInsuranceCompany + medicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany + maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
                    this.insuranceSumCompany = number.number(insuranceSumCompany)
                }
            },
            //社保基数生成事件
            wageBase(wage_base){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('wageBase')
                params.append('wage_base', wage_base);
                params.append('currentYM', this.currentYM);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value
                        this.endowmentInsurancePerson = number.number(data.endowmentInsurancePerson)
                        this.medicalInsurancePerson = number.number(data.medicalInsurancePerson)
                        this.unemploymentInsurancePerson = number.number(data.unemploymentInsurancePerson)
                        this.employmentInjuryInsurancePerson = number.number(data.employmentInjuryInsurancePerson)
                        this.maternityInsurancePerson = number.number(data.maternityInsurancePerson)
                        this.housingProvidentFundPerson = number.number(data.housingProvidentFundPerson)
                        this.insuranceSumPerson = number.number(data.insuranceSumPerson)
                        this.endowmentInsuranceCompany = number.number(data.endowmentInsuranceCompany)
                        this.medicalInsuranceCompany = number.number(data.medicalInsuranceCompany)
                        this.unemploymentInsuranceCompany = number.number(data.unemploymentInsuranceCompany)
                        this.employmentInjuryInsuranceCompany = number.number(data.employmentInjuryInsuranceCompany)
                        this.maternityInsuranceCompany = number.number(data.maternityInsuranceCompany)
                        this.housingProvidentFundCompany = number.number(data.housingProvidentFundCompany)
                        this.insuranceSumCompany = number.number(data.insuranceSumCompany)
                    })
                    .catch(error=> {
                        this.loading = false
//                        console.log(error);
                        alert('网络错误，不能访问');
                    });
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
                this.$confirm('您是否需要按所填基数自动生成以下选项？','提示',{
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
                }).then(()=>{
                    this.wageBase(wage_base);
                }).catch(()=>{

                });
                this.wage_base =number.number(wage_base)
            },
            //百分比change事件
            inputWithSelectChange(n,$event){
                var str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!(str.test($event) && $event >= 0 && $event <= 100)){
                    this.$message.error('请正确输入百分比');
                    if(n == 1){
                        this.input1 = 0
                    }else if(n == 2){
                        this.input2 = 0
                    }else if(n == 3){
                        this.input3 = 0
                    }else if(n == 4){
                        this.input4 = 0
                    }else if(n == 5){
                        this.input5 = 0
                    }
                }
            },
            //分摊按钮
            shareClick(){
                this.isShare = !this.isShare
            },

            model(n){
                this.loading = true
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    //是否为分摊状态
                    if(this.isShare){
                        let input1 = Number(this.input1)
                        let input2 = Number(this.input2)
                        let input3 = Number(this.input3)
                        let input4 = Number(this.input4)
                        let input5 = Number(this.input5)
                        let allInput = parseFloat(input1 + input2 + input3 + input4 + input5).toFixed(2)
//                        console.log(allInput);
                        //判断所有填写的百分比是不是等于100
                        if(allInput != 100 ){
                            this.$message.error('请正确输入分摊比例');
                            this.loading = false;
                            return
                        }
                    }else{
                        //没有分摊时是否填写了部门/项目
                        if(this.department == ''){
                            this.$message.error('请选择部门/项目');
                            this.loading = false;
                            return
                        }
                    }
                    if(this.userName == ''){
                        this.$message.error('请正确输入姓名');
                        this.loading = false;
                        return
                    }else if(this.shouldWages == '' && this.shouldWages == '0.00'){
                        this.$message.error('请正确输入应发工资');
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
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },

            submit(){
                let params = new URLSearchParams();
                let divideFlg = 0;
                let departmentJson = [];
                let options = this.options4;
                //判断是否分摊
                if(this.isShare){
                    if (this.input1 != 0 && this.select1 != '') {
                        let item1 = options.filter(x =>{
                            return x.id == this.select1
                        })

                        item1[0].projectDivRate = this.input1;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select1){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item1[0])
                    }else if(this.input1 != 0 && this.select1 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input2 != 0 && this.select2 != '') {
                        let item2 = options.filter(x =>{
                            return x.id == this.select2
                        })
                        item2[0].projectDivRate = this.input2;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select2){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item2[0])

                    }else if(this.input2 != 0 && this.select2 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input3 != 0 && this.select3 != '') {
                        let item3 = options.filter(x =>{
                            return x.id == this.select3
                        })
                        item3[0].projectDivRate = this.input3;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select3){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item3[0])
                    }else if(this.input3 != 0 && this.select3 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input4 != 0 && this.select4 != '') {
                        let item4 = options.filter(x =>{
                            return x.id == this.select4
                        })
                        item4[0].projectDivRate = this.input4;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select4){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item4[0])
                    }else if(this.input4 != 0 && this.select4 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input5 != 0 && this.select5 != '') {
                        let item5 = options.filter(x =>{
                            return x.id == this.select5
                        })
                        item5[0].projectDivRate = this.input5;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select5){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item5[0])
                    }else if(this.input5 != 0 && this.select5 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }
                    divideFlg = 1
                } else {
                    let item6 = options.filter(x =>{
                        return x.id == this.department
                    })
                    departmentJson.push(item6[0])
                }
//                console.log(departmentJson);
                departmentJson = JSON.stringify(departmentJson);//将json格式转成字符串传参

                params.append('userName',this.userName);
                params.append('divideFlg',divideFlg);
                params.append('jsonList',departmentJson);
                params.append('shouldWages',unNumber.unNumber(this.shouldWages));
                params.append('wage_base',unNumber.unNumber(this.wage_base));
                params.append('endowmentInsurancePerson',unNumber.unNumber(this.endowmentInsurancePerson));
                params.append('medicalInsurancePerson',unNumber.unNumber(this.medicalInsurancePerson));
                params.append('unemploymentInsurancePerson',unNumber.unNumber(this.unemploymentInsurancePerson));
                params.append('employmentInjuryInsurancePerson',unNumber.unNumber(this.employmentInjuryInsurancePerson));
                params.append('maternityInsurancePerson',unNumber.unNumber(this.maternityInsurancePerson));
                params.append('housingProvidentFundPerson',unNumber.unNumber(this.housingProvidentFundPerson));
                params.append('insuranceSumPerson',unNumber.unNumber(this.insuranceSumPerson));
                params.append('endowmentInsuranceCompany',unNumber.unNumber(this.endowmentInsuranceCompany));
                params.append('medicalInsuranceCompany',unNumber.unNumber(this.medicalInsuranceCompany));
                params.append('unemploymentInsuranceCompany',unNumber.unNumber(this.unemploymentInsuranceCompany));
                params.append('employmentInjuryInsuranceCompany',unNumber.unNumber(this.employmentInjuryInsuranceCompany));
                params.append('maternityInsuranceCompany',unNumber.unNumber(this.maternityInsuranceCompany));
                params.append('housingProvidentFundCompany',unNumber.unNumber(this.housingProvidentFundCompany));
                params.append('insuranceSumCompany',unNumber.unNumber(this.insuranceSumCompany));
                params.append('currentYM',this.currentYM);

                let url = addUrl.addUrl('addPayroll')
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
            var url = addUrl.addUrl('seePayroll')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    var data = response.data.value;
                    //设置部门
                    this.options4 = data.jsonList;
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
        right:20px;
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
</style>
