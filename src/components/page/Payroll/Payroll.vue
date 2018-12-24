<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>工资单</h2>
                <router-link to="/" class="back">返回</router-link>
                <a :href=url target="_blank" class="sub1" @keydown.enter.native.prevent>导出</a>
                <el-button @click="grant" size="small" type="primary" class="sub2" :loading="grantLoading">工资发放</el-button>
                <el-button @click="Calculation" size="small" type="primary" class="sub3" :loading="calculationLoading">工资计提</el-button>
                <el-button @click="dialogFormVisible = true" size="small" type="primary" class="sub4">工资发放时间：{{showProvideDay}}</el-button>
                <router-link v-if="!isCalculation" :to="{name:'addPayroll',params:{ym:currentYM} }" class="sub5">新增临时员工</router-link>
                <router-link v-if=" start_ym == current_book_ym " :to="{name:'record',params:{ym:currentYM} }" class="sub6">初始化工资补录</router-link>
            </div>
            <div class="w">
                <div class="content cf" :style="{height:screenHeight}">
                        <el-date-picker
                            class="yearData"
                            v-model="year"
                            type="year"
                            placeholder="选择年"
                            size="small"
                            value-format="yyyy"
                            @change="changeYear">
                        </el-date-picker>
                    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane name="01">
                            <span slot="label" class="mon">1月</span>
                        </el-tab-pane>
                        <el-tab-pane name="02">
                            <span slot="label" class="mon">2月</span>
                        </el-tab-pane>
                        <el-tab-pane name="03">
                            <span slot="label" class="mon">3月</span>
                        </el-tab-pane>
                        <el-tab-pane name="04">
                            <span slot="label" class="mon">4月</span>
                        </el-tab-pane>
                        <el-tab-pane name="05">
                            <span slot="label" class="mon">5月</span>
                        </el-tab-pane>
                        <el-tab-pane name="06">
                            <span slot="label" class="mon">6月</span>
                        </el-tab-pane>
                        <el-tab-pane name="07">
                            <span slot="label" class="mon">7月</span>
                        </el-tab-pane>
                        <el-tab-pane name="08">
                            <span slot="label" class="mon">8月</span>
                        </el-tab-pane>
                        <el-tab-pane name="09">
                            <span slot="label" class="mon">9月</span>
                        </el-tab-pane>
                        <el-tab-pane name="10">
                            <span slot="label" class="mon">10月</span>
                        </el-tab-pane>
                        <el-tab-pane name="11">
                            <span slot="label" class="mon">11月</span>
                        </el-tab-pane>
                        <el-tab-pane name="12">
                            <span slot="label" class="mon">12月</span>
                        </el-tab-pane>
                    </el-tabs>

                    <el-table class="single" :data="tableData3" style="width: 100%" :height="tableHeight">
                            <el-table-column fixed prop="userName" label="姓名">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.userId == 0"><span class="red">*</span>{{scope.row.userName}}</span>
                                    <span v-else-if="scope.row.userName == ''">合计</span>
                                    <span v-else>{{scope.row.userName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed label="部门">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.departmentName">{{scope.row.departmentName}}</span>
                                    <span v-else-if="scope.row.projectName">{{scope.row.projectName}}</span>
                                    <span v-if="scope.row.divideFlg == 1">(分摊)</span>
                                </template>
                            </el-table-column>
                            <el-table-column fixed prop="" label="操作">
                                <template slot-scope="scope">
                                    <span class="operation" v-if="scope.row.userName != ''">
                                        <router-link :to="{name:'seePayroll',params:{id:scope.row.id,
                                        userName:scope.row.userName,
                                        userId:scope.row.userId,
                                        ym:currentYM,
                                        isCalculation:isCalculation}}" class="see">
                                            <i class="icon iconfont icon-bianji blue"></i>
                                        </router-link>
                                    </span>
                                    <span class="operation" v-if="scope.row.userName != ''">
                                        <!--当userId为 0 时才能点击删除按钮-->
                                        <i v-if='scope.row.userId == 0 && !isCalculation' @click='deleteModel(scope.row.id)'
                                            class="icon iconfont icon-shanchu red"></i>
                                        <i v-else class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="shouldWages" label="应发工资" width="100px"></el-table-column>
                            <el-table-column label="个人代缴保险">
                                <el-table-column prop="endowmentInsurancePerson" label="养老保险"></el-table-column>
                                <el-table-column prop="medicalInsurancePerson" label="医疗保险"></el-table-column>
                                <el-table-column prop="unemploymentInsurancePerson" label="失业保险"></el-table-column>
                                <el-table-column prop="maternityInsurancePerson" label="生育保险"></el-table-column>
                                <el-table-column prop="employmentInjuryInsurancePerson" label="工伤保险"></el-table-column>
                                <el-table-column prop="housingProvidentFundPerson" label="住房公积金"></el-table-column>
                                <el-table-column prop="insuranceSumPerson" label="五险一金合计"></el-table-column>
                            </el-table-column>
                            <el-table-column label="公司代缴保险">
                                <el-table-column prop="endowmentInsuranceCompany" label="养老保险"></el-table-column>
                                <el-table-column prop="medicalInsuranceCompany" label="医疗保险"></el-table-column>
                                <el-table-column prop="unemploymentInsuranceCompany" label="失业保险"></el-table-column>
                                <el-table-column prop="maternityInsuranceCompany" label="生育保险"></el-table-column>
                                <el-table-column prop="employmentInjuryInsuranceCompany" label="工伤保险"></el-table-column>
                                <el-table-column prop="housingProvidentFundCompany" label="住房公积金"></el-table-column>
                                <el-table-column prop="insuranceSumCompany" label="五险一金合计"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="taxableIncome" label="应纳所得税额"></el-table-column>
                            <el-table-column prop="incomeTax" label="个人所得税"></el-table-column>
                            <el-table-column prop="actualWages" label="实发工资"></el-table-column>
                        </el-table>

                    <el-dialog title="修改工资发放日" :visible.sync="dialogFormVisible" width="400px" >
                        <el-select class="provideDay" v-model="provideDay"
                                   filterable=""
                                   allow-create=""
                                   default-first-option placeholder="请选择">
                            <el-option v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                            <el-button type="primary" @click="provideTime" size="small">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog title="选择付款方式" :visible.sync="dialogGrant" :before-close="handleClose" width="700px">
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
                            <li>
                                <span class="wagesName">发放期间</span>
                                <el-radio v-model="ffqj" label="2">上月</el-radio>
                                <el-radio v-model="ffqj" label="1">本月</el-radio>
                            </li>
                        </ul>
                        <el-button @click="closeGrant" size="small">取 消</el-button>
                        <el-button type="primary" @click="grantAxios" size="small" :disabled="isComplete">确 定</el-button>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    import { mapState } from 'vuex'

    export default{
        data(){
            return {
                currentYM:'',//当前账期
                indexYM:'',//显示账期
                accruedYM:'',//末次计提年月
                isCalculation:false,//是否已计提
                url:'',
                dialogFormVisible:false,
                dialogGrant:false,//工资发放模态框
                wages:'2',//工资发放分类
                socialSecurity:'2',//社保发放分类
                AccumulationFund:'2',//公积金发放分类
                IndividualIncomeTax:'2',//个人所得税发放分类
                ffqj:'2',//发放期间
                activeName: '',
                year:'',
                tableData3:[],
                provideDay:'',//工资发放时间
                showProvideDay:'未设置',//工资发放时间显示
                options:[//工资发放日列表
                    {value:'5',label:'每月5日'},
                    {value:'6',label:'每月6日'},
                    {value:'7',label:'每月7日'},
                    {value:'8',label:'每月8日'},
                    {value:'9',label:'每月9日'},
                    {value:'10',label:'每月10日'},
                    {value:'11',label:'每月11日'},
                    {value:'12',label:'每月12日'},
                    {value:'13',label:'每月13日'},
                    {value:'14',label:'每月14日'},
                    {value:'15',label:'每月15日'},
                    {value:'16',label:'每月16日'},
                    {value:'17',label:'每月17日'},
                    {value:'18',label:'每月18日'},
                    {value:'19',label:'每月19日'},
                    {value:'20',label:'每月20日'},
                    {value:'21',label:'每月21日'},
                    {value:'22',label:'每月22日'},
                    {value:'23',label:'每月23日'},
                    {value:'24',label:'每月24日'},
                    {value:'25',label:'每月25日'},
                    {value:'26',label:'每月26日'},
                    {value:'27',label:'每月27日'},
                    {value:'28',label:'每月28日'},
                    {value:'-2',label:'月末前2天'},
                    {value:'-1',label:'月末前一天'},
                    {value:'0',label:'月末'}
                ],
                loading:true,
                isComplete:false,//工资发放模态框确认按钮loading状态
                grantLoading:false,//工资发放按钮loading
                calculationLoading:false,//工资计提按钮loading
                screenHeight: '' ,//页面初始化高度
                tableHeight: 460 //表格高度
            }
        },
        computed:mapState(['start_ym','current_book_ym']),
        methods: {
            handleClose(done){
                this.grantLoading = false;
                done();
            },
            //工资发放
            grant(){
                this.grantLoading = true;
                this.loading = true;
                if(this.showProvideDay == '未设置'){
                    this.$message.error('您还未设置工资发放时间');
                    this.loading = false;
                    this.grantLoading = false;
                    return
                }else{
                    this.dialogGrant = true;
                    this.wages = '2'
                    this.socialSecurity = '2'
                    this.AccumulationFund = '2'
                    this.IndividualIncomeTax = '2'
                    this.ffqj = '1'
                    this.loading = false;
                }
            },
            //关闭工资发放模态框取消按钮
            closeGrant(){
                this.dialogGrant = false;
                this.grantLoading = false;
                this.loading = false
            },
            grantAxios(){
                this.isComplete = true;
                this.$confirm('确定是否工资发放？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
//                    console.log(this.wages);
                    this.dialogGrant = false;
                    let params = new URLSearchParams();
                    let url = addUrl.addUrl('grant');
                    params.append('ym',this.currentYM);
                    params.append('gzPayWay',this.wages);
                    params.append('sbPayWay',this.socialSecurity);
                    params.append('gjjPayWay',this.AccumulationFund);
                    params.append('gsPayWay',this.IndividualIncomeTax);
                    params.append('ffqj',this.ffqj);
                    axios.post(url,params)
                        .then(response=> {
//                                console.log(response);
                            let provideType = response.data.value.provideType
                            let provideMsg = response.data.value.provideMsg
                            if(provideType == 1){
                                this.$message.success(provideMsg);
                            }else{
                                this.$message.error(provideMsg);
                            }
                            this.loading = false;
                            this.isComplete = false;
                            this.grantLoading = false;
                            this.dialogFormVisible = false
                        })
                        .catch(()=>{
                            this.loading = false
                            this.grantLoading = false;
                            this.isComplete = false;
                        })
                }).catch(()=>{
                    this.loading = false
                    this.isComplete = false;
                    this.grantLoading = false;
                })
            },
            //工资计提
            Calculation(){
                this.calculationLoading = true
                this.loading = true
                if(!this.isCalculation){
                    this.$confirm('计提工资之后，不可修改当前账期的工资单，同时也不能进行员工的添加，建议等到月结时系统自动计提当前账期下的工资！确定是否进行计提？', '提示', {
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
                        let params = new URLSearchParams();
                        let url = addUrl.addUrl('Calculation');
                        params.append('ym',this.currentYM)
                        axios.post(url,params)
                            .then(response=> {
//                                console.log(response);
                                let accruedType = response.data.value.accruedType
                                let accruedMsg = response.data.value.accruedMsg

                                if (accruedType == 1) {
                                    this.$message.success(accruedMsg);
                                    this.accruedYM = String(Number(this.accruedYM) + 1);//将末次计提年月+1
                                    this.isCalculation = true;
//                                    console.log(this.accruedYM);
                                } else {
                                    this.$message.error(accruedMsg);
                                }
                                this.loading = false
                                this.calculationLoading = false;
                                this.dialogFormVisible = false
                            })
                    }).catch(()=>{
                        this.loading = false
                        this.calculationLoading = false
                    })
                }else{
                    this.$message.error('当前账期工资已计提！');
                    this.loading = false
                    this.calculationLoading = false
                }

            },
            //修改工资发放时间
            provideTime(){
//                console.log(this.provideDay);
                let params = new URLSearchParams();
                let url = addUrl.addUrl('provideTime');
                params.append('provide_day',this.provideDay)
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let dataNew = response.data.value.dataNew
                        if(dataNew == 1){
                            this.showProvideDay = response.data.value.providDay
                        }else{
                            this.$message.error(dataMsg);

                        }
                        this.loading = false
                        this.dialogFormVisible = false
                    })
            },
            //删除条目事件
            deleteModel(id){
                this.loading = true
//                console.log(id);
                this.$confirm('确定是否删除？', '提示', {
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
                    let params = new URLSearchParams();
                    let url = addUrl.addUrl('payrollDelete');
                    params.append('id',id)
                    axios.post(url,params)
                        .then(response=> {
//                            console.log(response);
                            let dataMsg = response.data.value.dataMsg
                            let dataNew = response.data.value.dataNew
                            if(dataNew == 1){
                                this.axios();
                                this.loading = false
                            }else{
                                this.$message.error(dataMsg);
                                this.loading = false
                            }
                        })
                }).catch(() => {
                    this.loading = false
                });
            },
            //年change事件
            changeYear(){
                this.indexYM = String(this.year) + String(this.activeName)
                if(Number(this.currentYM) < Number(this.indexYM)){
                    this.$message.error('对不起，当前日期没有员工数据')
                    this.tableData3 = []
                }else if(Number(this.start_ym) > Number(this.indexYM)){
                    this.$message.error('对不起，当前日期没有员工数据')
                    this.tableData3 = []
                }else{
                    if(Number(this.indexYM) > Number(this.accruedYM)){
                        this.isCalculation = false
                    }else{
                        this.isCalculation = true
                    }
                    this.axios()
                }
            },
            //月change事件
            handleClick() {
                this.indexYM = String(this.year) + String(this.activeName)
                if(Number(this.currentYM) < Number(this.indexYM)){
                    this.$message.error('对不起，当前日期没有员工数据')
                    this.tableData3 = []
                }else if(Number(this.start_ym) > Number(this.indexYM)){
                    this.$message.error('对不起，当前日期没有员工数据')
                    this.tableData3 = []
                }else{
                    if(Number(this.indexYM) > Number(this.accruedYM)){
                        this.isCalculation = false
                    }else{
                        this.isCalculation = true
                    }
                    this.axios()
                }
            },
            //工资表列表接口
            axios(){
                this.loading = true
                var params = new URLSearchParams();
                var url = addUrl.addUrl('payrollList');
//                console.log(this.indexYM);
                params.append('ym', this.indexYM);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;
                            let sumList = data.sumList
                            //判断table列表中，金额如果为空时补填0.00
                            for(let i in sumList){
                                sumList[i].shouldWages = sumList[i].shouldWages ? sumList[i].shouldWages :'0.00'
                                sumList[i].endowmentInsurancePerson = sumList[i].endowmentInsurancePerson ? sumList[i].endowmentInsurancePerson :'0.00'
                                sumList[i].medicalInsurancePerson = sumList[i].medicalInsurancePerson ? sumList[i].medicalInsurancePerson :'0.00'
                                sumList[i].unemploymentInsurancePerson = sumList[i].unemploymentInsurancePerson ? sumList[i].unemploymentInsurancePerson :'0.00'
                                sumList[i].maternityInsurancePerson = sumList[i].maternityInsurancePerson ? sumList[i].maternityInsurancePerson :'0.00'
                                sumList[i].employmentInjuryInsurancePerson = sumList[i].employmentInjuryInsurancePerson ? sumList[i].employmentInjuryInsurancePerson :'0.00'
                                sumList[i].housingProvidentFundPerson = sumList[i].housingProvidentFundPerson ? sumList[i].housingProvidentFundPerson :'0.00'
                                sumList[i].insuranceSumPerson = sumList[i].insuranceSumPerson ? sumList[i].insuranceSumPerson :'0.00'
                                sumList[i].endowmentInsuranceCompany = sumList[i].endowmentInsuranceCompany ? sumList[i].endowmentInsuranceCompany :'0.00'
                                sumList[i].medicalInsuranceCompany = sumList[i].medicalInsuranceCompany ? sumList[i].medicalInsuranceCompany :'0.00'
                                sumList[i].unemploymentInsuranceCompany = sumList[i].unemploymentInsuranceCompany ? sumList[i].unemploymentInsuranceCompany :'0.00'
                                sumList[i].maternityInsuranceCompany = sumList[i].maternityInsuranceCompany ? sumList[i].maternityInsuranceCompany :'0.00'
                                sumList[i].employmentInjuryInsuranceCompany = sumList[i].employmentInjuryInsuranceCompany ? sumList[i].employmentInjuryInsuranceCompany :'0.00'
                                sumList[i].housingProvidentFundCompany = sumList[i].housingProvidentFundCompany ? sumList[i].housingProvidentFundCompany :'0.00'
                                sumList[i].insuranceSumCompany = sumList[i].insuranceSumCompany ? sumList[i].insuranceSumCompany :'0.00'
                                sumList[i].taxableIncome = sumList[i].taxableIncome ? sumList[i].taxableIncome :'0.00'
                                sumList[i].incomeTax = sumList[i].incomeTax ? sumList[i].incomeTax :'0.00'
                                sumList[i].actualWages = sumList[i].actualWages ? sumList[i].actualWages :'0.00'
                                sumList[i].maternityInsuranceCompany = sumList[i].maternityInsuranceCompany ? sumList[i].maternityInsuranceCompany :'0.00'
                                sumList[i].maternityInsuranceCompany = sumList[i].maternityInsuranceCompany ? sumList[i].maternityInsuranceCompany :'0.00'
                            }

                            this.tableData3 = sumList;
                        }else if(status == 400){
                            this.$message.error(msg)
                            this.tableData3 = [];
                        }

                        this.loading = false
                    })
                    .catch(()=> {
                        this.loading = false
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
            this.tableHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 150}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                var topHeight = $('.top').innerHeight()
                var headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
                that.tableHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 150}px`;
            };
        },
        created(){
            var url = addUrl.addUrl('payroll');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    let currentYM = this.current_book_ym;
                    var url = addUrl.addUrl('derive');
                    this.year = currentYM.substring(0,4)
                    this.activeName = currentYM.substring(4,6)


                    let showProvideDay = data.provideTime;
//                    console.log(showProvideDay);

                    if(showProvideDay == '未设置工资发放日'){
                        this.showProvideDay = '未设置'
                    }else{
                        this.showProvideDay = showProvideDay
                        this.provideDay = showProvideDay
                    }

                    this.accruedYM = data.accruedYM;
                    this.currentYM = currentYM
                    this.indexYM = data.indexYM

//                    console.log(Number(this.currentYM) > Number(this.accruedYM));
                    if(Number(this.currentYM) > Number(this.accruedYM)){
                        this.isCalculation = false
                    }else{
                        this.isCalculation = true
                    }

                    this.url = url + '?ym=' + this.indexYM;

                    this.axios();
                    this.loading = false
                })
            .catch(()=>{
                this.loading = false
            })
        }
    }
</script>
<style scoped>
    .w{
        height:100%;
    }
    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }

    h2 {
        display: inline-block;
    }
    .content{
        width: 1120px;
        height: 100%;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .tabs{
        display: inline-block;
        width:86%;
        float: left;
        margin-left: 2%;
    }
    .mon{
        font-size:16px;
        font-weight: bold;
    }
    .top .back{
        display: inline-block;
        width:56px;
        height:30px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:12px;
        text-decoration: none;
        color: #333;
        position: absolute;
        right: -2px;
    }
    .top .sub1{
        display: inline-block;
        width: 56px;
        height:32px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right:60px;
        font-size:12px;
    }
    .top .sub2{
        position: absolute;
        right:120px;
        font-size:12px;
    }
    .top .sub3{
        position: absolute;
        right:205px;
        font-size:12px;
    }
    .top .sub4{
        position: absolute;
        right:290px;
        font-size:12px;
    }
    .top .sub5{
        display: inline-block;
        width: 104px;
        height:30px;
        color: #fff;
        background-color: #fea728;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        left:0px;
        font-size:12px;
    }
    .top .sub6{
        display: inline-block;
        width:120px;
        height:30px;
        color: #333;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:12px;
        text-decoration: none;
        position: absolute;
        left:120px;
    }
    .operation {
        cursor: pointer;
    }
    .see{
        text-decoration: none;
    }
    .provideDay{
        width:100%;
    }
    .littleTable .el-table__header-wrapper table thead tr th{
        background-color: #fff;
        color: #333;
    }
    .tabs .el-tabs__item{
        padding:0 28px
    }
    .wagesUl{
        margin-bottom: 30px;
    }
    .wagesUl .wagesName{
        display: inline-block;
        width:100px;
    }

</style>
