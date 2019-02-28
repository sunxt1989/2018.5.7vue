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
                <el-button @click="dialogImportPayroll = true" size="small" type="primary" class="sub7">导入</el-button>
                <el-button v-show="!isCalculation" @click="batchDelete" size="small" type="primary" class="sub8">批量删除</el-button>
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

                    <el-table class="single" :data="tableData3" style="width: 100%" :height="tableHeight" ref="multipleTable">
                        <el-table-column align="center" type="selection" prop="id"></el-table-column>
                        <el-table-column fixed type="index" label="序号" align="center"></el-table-column>
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
                        <el-table-column fixed prop="credentialsType" label="证件类型"></el-table-column>
                        <el-table-column fixed prop="credentialsCode" label="证件号码"></el-table-column>
                        <el-table-column fixed prop="idNumber" label="纳税人识别号"></el-table-column>
                        <el-table-column fixed prop="nonResidentsStatus" label="是否为非居民个人" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.nonResidentsStatus == 1">是</span>
                                <span v-else-if="scope.row.nonResidentsStatus == 0">否</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="本月">
                            <el-table-column label="收入额计算">
                                <el-table-column prop="basicWages" label="基本工资"></el-table-column>
                                <el-table-column prop="overtimeWages" label="加班工资"></el-table-column>
                                <el-table-column prop="dailyBonus" label="日常奖金"></el-table-column>
                                <el-table-column prop="subsidy" label="津贴和补贴"></el-table-column>
                                <el-table-column prop="annualBonus" label="年终奖"></el-table-column>
                                <el-table-column prop="exemptIncome" label="免税收入"></el-table-column>
                                <el-table-column prop="leaveDeductMoney" label="事假扣款"></el-table-column>
                                <el-table-column prop="sickDeduct" label="病假扣款"></el-table-column>
                                <el-table-column prop="lateDeductMoney" label="迟到早退扣款"></el-table-column>
                                <el-table-column prop="otherDeduct" label="其他扣款"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="totalSalary" label="应发合计" width="100px"></el-table-column>
                            <el-table-column label="应扣个人款项">
                                <el-table-column prop="endowmentInsurancePerson" label="基本养老保险"></el-table-column>
                                <el-table-column prop="supplementaryInsurancePerson" label="补充养老保险"></el-table-column>
                                <el-table-column prop="medicalInsurancePerson" label="基本医疗保险"></el-table-column>
                                <el-table-column prop="supplementaryMedicalInsurancePerson" label="补充医疗保险"></el-table-column>
                                <el-table-column prop="unemploymentInsurancePerson" label="失业保险费"></el-table-column>
                                <el-table-column prop="housingProvidentFundPerson" label="住房公积金"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="insuranceSumPerson" label="应扣个人款项合计" width="100px"></el-table-column>
                            <el-table-column label="公司缴纳社保和公积金">
                                <el-table-column prop="endowmentInsuranceCompany" label="基本养老保险"></el-table-column>
                                <el-table-column prop="supplementaryInsuranceCompany" label="补充养老保险"></el-table-column>
                                <el-table-column prop="medicalInsuranceCompany" label="基本医疗保险"></el-table-column>
                                <el-table-column prop="supplementaryMedicalInsuranceCompany" label="补充医疗保险"></el-table-column>
                                <el-table-column prop="unemploymentInsuranceCompany" label="失业保险费"></el-table-column>
                                <el-table-column prop="employmentInjuryInsuranceCompany" label="工伤保险"></el-table-column>
                                <el-table-column prop="maternityInsuranceCompany" label="生育保险"></el-table-column>
                                <el-table-column prop="housingProvidentFundCompany" label="住房公积金"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="insuranceSumCompany" label="五险一金合计" width="100px"></el-table-column>
                            <el-table-column label="其他扣款">
                                <el-table-column prop="commercialHealthInsurance" label="商业健康保险"></el-table-column>
                                <el-table-column prop="taxDeferredEndowmentInsurance" label="税延养老保险"></el-table-column>
                                <el-table-column prop="otherDeduction" label="其他"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="totalOtherDeduction" label="其他扣除合计" width="100px"></el-table-column>
                        </el-table-column>
                        <el-table-column label="本年累计">
                            <el-table-column prop="accumulatedSalary" label="累计收入额"></el-table-column>
                            <el-table-column prop="accumulatedFeesDeduction" label="累计减除费用"></el-table-column>
                            <el-table-column prop="accumulatedSpecialDeduction" label="累计专项扣除"></el-table-column>
                            <el-table-column label="累计专项附加扣除">
                                <el-table-column prop="accumulatedChildrenEducation" label="子女教育"></el-table-column>
                                <el-table-column prop="accumulatedElderSupport" label="赡养老人"></el-table-column>
                                <el-table-column prop="accumulatedHomeloanInterest" label="住房贷款利息"></el-table-column>
                                <el-table-column prop="accumulatedRent" label="住房租金"></el-table-column>
                                <el-table-column prop="accumulatedContinuingEducation" label="继续教育"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="accumulatedOtherDeduction" label="累计其他扣除"></el-table-column>
                        </el-table-column>
                        <el-table-column prop="deductionRatio" label="减按计税比例"></el-table-column>
                        <el-table-column prop="allowedDeductionOfDonations" label="准予扣除的捐赠额"></el-table-column>

                        <el-table-column label="税款计算">
                            <el-table-column label="应纳税所得额">
                                <el-table-column prop="taxPayableSalary" label="工资薪金"></el-table-column>
                                <el-table-column prop="taxPayableAnnualBonus" label="年终奖"></el-table-column>
                            </el-table-column>
                            <el-table-column label="税率/预扣率">
                                <el-table-column prop="taxRateSalary" label="工资薪金"></el-table-column>
                                <el-table-column prop="taxRateAnnualBonus" label="年终奖"></el-table-column>
                            </el-table-column>
                            <el-table-column label="速算扣除数">
                                <el-table-column prop="quickCalculationDeductionSalary" label="工资薪金"></el-table-column>
                                <el-table-column prop="quickCalculationDeductionAnnualBonus" label="年终奖"></el-table-column>
                            </el-table-column>
                            <el-table-column label="应纳税额">
                                <el-table-column prop="taxOwedSalary" label="工资薪金"></el-table-column>
                                <el-table-column prop="taxOwedAnnualBonus" label="年终奖"></el-table-column>
                            </el-table-column>

                            <el-table-column prop="taxCredit" label="减免税额"></el-table-column>
                            <el-table-column prop="taxPrePaidAndWithheld" label="已扣缴税额"></el-table-column>
                            <el-table-column prop="incomeTax" label="个人所得税"></el-table-column>
                        </el-table-column>
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
                    <el-dialog title="导入" :visible.sync="dialogImportPayroll" width="400px">
                        <el-upload
                            ref="upload"
                            action="#"
                            :limit="1"
                            :http-request="myUpload"
                            :before-upload='beforeAvatarUpload'
                            :auto-upload="false">
                            <el-button size="small" type="primary">点击导入文件</el-button>
                            <div slot="tip" class="el-upload__tip">上传文件只能是 xls/xlsx 格式!</div>
                        </el-upload>
                        <el-button @click="importPayroll" size="small" type="primary" class="importPayrollBtn" :loading="importPayrollLoading">导入</el-button>
                        <a :href=url2 target="_blank" class="downloadPayroll" @keydown.enter.native.prevent>下载工资单xls模板</a>
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
                url2:'',//下载工资单xls模板
                file:'',//导入文件地址
                fileName:'',//导入文件地址
                dialogFormVisible:false,
                dialogGrant:false,//工资发放模态框
                dialogImportPayroll:false,//导入模态框
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
                importPayrollLoading:false,//导入按钮loading
                calculationLoading:false,//工资计提按钮loading
                screenHeight: '' ,//页面初始化高度
                tableHeight: 460 //表格高度
            }
        },
        computed:mapState(['start_ym','current_book_ym']),
        methods: {
            //批量删除
            batchDelete(){
                let ids = '';//员工id参数
                let params = new URLSearchParams();
                let url = addUrl.addUrl('batchDelete')
                let selection = this.$refs.multipleTable.selection

                selection = selection.filter(x => x.userId == '0')
                let length = selection.length
                if(length == 0){
                    this.$message.error('请选择可删除的员工再进行批量删除操作');
                    return
                }else{
                    this.$confirm('确定是否批量删除所选员工, 是否继续?', '提示', {
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
                        for(let i in selection){
                            if(i == 0){
                                ids += selection[i].id
                            }else{
                                ids += ','+ selection[i].id
                            }
                        }
                        params.append('ids',ids);
                        axios.post(url,params)
                            .then(response=> {
                                let dataMsg = response.data.value.dataMsg
                                let dataNew = response.data.value.dataNew
                                if(dataNew == 1){
                                    this.$message.success(dataMsg);
                                    this.axios();
                                    this.loading = false
                                }else{
                                    this.$message.error(dataMsg);
                                    this.loading = false
                                }
                            })
                            .catch(error=> {
                                alert('网络错误，不能访问');
                                this.loading = false;
                            })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            //限制用户上传图片格式和大小
            beforeAvatarUpload(file){
                const isXLS = file.name.split('.')[1] === 'xls';
                const isXLSX = file.name.split('.')[1] === 'xlsx';
                if (!isXLS && !isXLSX) {
                    this.importPayrollLoading = false;
                    this.$message.error('上传文件只能是 xls/xlsx 格式');
                }
                return isXLS || isXLSX;//如果不符合要求的话是不走myUpload函数的
            },
            myUpload(content){
                var file = content.file;
                var _this = this;
                this.readBlobAsDataURL(file,function (dataurl){
                    _this.file = dataurl
                    _this.fileName = file.name
                    _this.upload()
                });
            },
            //url转换base方法
            readBlobAsDataURL(blob, callback) {
//                console.log(blob);
                var fileReader = new FileReader();
                fileReader.onload = function(e){
                    callback(e.target.result);
                };
                fileReader.readAsDataURL(blob);
            },
            //点击导入
            importPayroll(){
                if(this.$refs.upload.uploadFiles.length){
                    this.importPayrollLoading = true
                    this.$refs.upload.submit();
                }else{
                    this.$message.error('请选择上传的文件')
                }
            },
            upload(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('upload');
                params.append('fileName',this.fileName)
                params.append('fileUrlData',this.file)
                axios.post(url,params)
                .then(response =>{
//                    console.log(response);
                    let status = response.data.status
                    let msg = response.data.msg
                    if(status == 200){
                        this.$message.success(msg)
                        this.axios()
                    }else if(status == 400){
                        this.$message.error(msg)
                    }
                    this.loading = false
                    this.dialogImportPayroll = false
                    this.importPayrollLoading = false;
                }).catch(() => {
                    this.loading = false
                    this.dialogImportPayroll = false
                    this.importPayrollLoading = false;
                });
            },
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
                                this.$message.success(dataMsg);
                            }else{
                                this.$message.error(dataMsg);
                                this.loading = false
                            }
                        })
                        .catch(error=> {
                            alert('网络错误，不能访问');
                            this.loading = false;
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
                       console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;
                            let sumList = data.sumList
                            //判断table列表中，金额如果为空时补填0.00
                            console.log(sumList);
                            for(let i in sumList){
                                console.log(sumList[i].taxPayableAnnualBonus);
                                sumList[i].basicWages = sumList[i].basicWages ? sumList[i].basicWages :'0.00'
                                sumList[i].overtimeWages = sumList[i].overtimeWages ? sumList[i].overtimeWages :'0.00'
                                sumList[i].dailyBonus = sumList[i].dailyBonus ? sumList[i].dailyBonus :'0.00'
                                sumList[i].subsidy = sumList[i].subsidy ? sumList[i].subsidy :'0.00'
                                sumList[i].annualBonus = sumList[i].annualBonus ? sumList[i].annualBonus :'0.00'
                                sumList[i].exemptIncome = sumList[i].exemptIncome ? sumList[i].exemptIncome :'0.00'
                                sumList[i].leaveDeductMoney = sumList[i].leaveDeductMoney ? sumList[i].leaveDeductMoney :'0.00'
                                sumList[i].sickDeduct = sumList[i].sickDeduct ? sumList[i].sickDeduct :'0.00'
                                sumList[i].lateDeductMoney = sumList[i].lateDeductMoney ? sumList[i].lateDeductMoney :'0.00'
                                sumList[i].otherDeduct = sumList[i].otherDeduct ? sumList[i].otherDeduct :'0.00'
                                sumList[i].totalSalary = sumList[i].totalSalary ? sumList[i].totalSalary :'0.00'
                                sumList[i].endowmentInsurancePerson = sumList[i].endowmentInsurancePerson ? sumList[i].endowmentInsurancePerson :'0.00'
                                sumList[i].supplementaryInsurancePerson = sumList[i].supplementaryInsurancePerson ? sumList[i].supplementaryInsurancePerson :'0.00'
                                sumList[i].medicalInsurancePerson = sumList[i].medicalInsurancePerson ? sumList[i].medicalInsurancePerson :'0.00'
                                sumList[i].supplementaryMedicalInsurancePerson = sumList[i].supplementaryMedicalInsurancePerson ? sumList[i].supplementaryMedicalInsurancePerson :'0.00'
                                sumList[i].unemploymentInsurancePerson = sumList[i].unemploymentInsurancePerson ? sumList[i].unemploymentInsurancePerson :'0.00'
                                sumList[i].housingProvidentFundPerson = sumList[i].housingProvidentFundPerson ? sumList[i].housingProvidentFundPerson :'0.00'
                                sumList[i].insuranceSumPerson = sumList[i].insuranceSumPerson ? sumList[i].insuranceSumPerson :'0.00'

                                sumList[i].endowmentInsuranceCompany = sumList[i].endowmentInsuranceCompany ? sumList[i].endowmentInsuranceCompany :'0.00'
                                sumList[i].supplementaryInsuranceCompany = sumList[i].supplementaryInsuranceCompany ? sumList[i].supplementaryInsuranceCompany :'0.00'
                                sumList[i].medicalInsuranceCompany = sumList[i].medicalInsuranceCompany ? sumList[i].medicalInsuranceCompany :'0.00'
                                sumList[i].supplementaryMedicalInsuranceCompany = sumList[i].supplementaryMedicalInsuranceCompany ? sumList[i].supplementaryMedicalInsuranceCompany :'0.00'
                                sumList[i].unemploymentInsuranceCompany = sumList[i].unemploymentInsuranceCompany ? sumList[i].unemploymentInsuranceCompany :'0.00'
                                sumList[i].employmentInjuryInsuranceCompany = sumList[i].employmentInjuryInsuranceCompany ? sumList[i].employmentInjuryInsuranceCompany :'0.00'
                                sumList[i].maternityInsuranceCompany = sumList[i].maternityInsuranceCompany ? sumList[i].maternityInsuranceCompany :'0.00'
                                sumList[i].housingProvidentFundCompany = sumList[i].housingProvidentFundCompany ? sumList[i].housingProvidentFundCompany :'0.00'

                                sumList[i].insuranceSumCompany = sumList[i].insuranceSumCompany ? sumList[i].insuranceSumCompany :'0.00'
                                sumList[i].commercialHealthInsurance = sumList[i].commercialHealthInsurance ? sumList[i].commercialHealthInsurance :'0.00'
                                sumList[i].taxDeferredEndowmentInsurance = sumList[i].taxDeferredEndowmentInsurance ? sumList[i].taxDeferredEndowmentInsurance :'0.00'
                                sumList[i].otherDeduction = sumList[i].otherDeduction ? sumList[i].otherDeduction :'0.00'
                                sumList[i].totalOtherDeduction = sumList[i].totalOtherDeduction ? sumList[i].totalOtherDeduction :'0.00'

                                sumList[i].accumulatedSalary = sumList[i].accumulatedSalary ? sumList[i].accumulatedSalary :'0.00'
                                sumList[i].accumulatedFeesDeduction = sumList[i].accumulatedFeesDeduction ? sumList[i].accumulatedFeesDeduction :'0.00'
                                sumList[i].accumulatedSpecialDeduction = sumList[i].accumulatedSpecialDeduction ? sumList[i].accumulatedSpecialDeduction :'0.00'
                                sumList[i].accumulatedChildrenEducation = sumList[i].accumulatedChildrenEducation ? sumList[i].accumulatedChildrenEducation :'0.00'
                                sumList[i].accumulatedElderSupport = sumList[i].accumulatedElderSupport ? sumList[i].accumulatedElderSupport :'0.00'
                                sumList[i].accumulatedHomeloanInterest = sumList[i].accumulatedHomeloanInterest ? sumList[i].accumulatedHomeloanInterest :'0.00'
                                sumList[i].accumulatedRent = sumList[i].accumulatedRent ? sumList[i].accumulatedRent :'0.00'
                                sumList[i].accumulatedContinuingEducation = sumList[i].accumulatedContinuingEducation ? sumList[i].accumulatedContinuingEducation :'0.00'
                                sumList[i].accumulatedOtherDeduction = sumList[i].accumulatedOtherDeduction ? sumList[i].accumulatedOtherDeduction :'0.00'
                                sumList[i].deductionRatio = sumList[i].deductionRatio ? sumList[i].deductionRatio :'0.00'
                                sumList[i].allowedDeductionOfDonations = sumList[i].allowedDeductionOfDonations ? sumList[i].allowedDeductionOfDonations :'0.00'

                                sumList[i].taxPayableSalary = sumList[i].taxPayableSalary ? sumList[i].taxPayableSalary :'0.00'
                                sumList[i].taxPayableAnnualBonus = sumList[i].taxPayableAnnualBonus ? sumList[i].taxPayableAnnualBonus :'0.00'
                                sumList[i].taxRateSalary = sumList[i].taxRateSalary ? sumList[i].taxRateSalary :'0.00'
                                sumList[i].taxRateAnnualBonus = sumList[i].taxRateAnnualBonus ? sumList[i].taxRateAnnualBonus :'0.00'
                                sumList[i].quickCalculationDeductionSalary = sumList[i].quickCalculationDeductionSalary ? sumList[i].quickCalculationDeductionSalary :'0.00'
                                sumList[i].quickCalculationDeductionAnnualBonus = sumList[i].quickCalculationDeductionAnnualBonus ? sumList[i].quickCalculationDeductionAnnualBonus :'0.00'
                                sumList[i].taxOwedSalary = sumList[i].taxOwedSalary ? sumList[i].taxOwedSalary :'0.00'
                                sumList[i].taxOwedAnnualBonus = sumList[i].taxOwedAnnualBonus ? sumList[i].taxOwedAnnualBonus :'0.00'
                                sumList[i].taxCredit = sumList[i].taxCredit ? sumList[i].taxCredit :'0.00'
                                sumList[i].taxPrePaidAndWithheld = sumList[i].taxPrePaidAndWithheld ? sumList[i].taxPrePaidAndWithheld :'0.00'
                                sumList[i].incomeTax = sumList[i].incomeTax ? sumList[i].incomeTax :'0.00'
                                sumList[i].actualWages = sumList[i].actualWages ? sumList[i].actualWages :'0.00'
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
            this.url2 = addUrl.addUrl('download')
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
        width:1400px;
        height:100%;
    }
    .top {
        height:60px;
        margin: 20px 0;
        text-align: center;
        position: relative;
    }

    h2 {
        display: inline-block;
    }
    .content{
        width: 1380px;
        height: 100%;
        background-color: #fff;
        padding: 20px 10px;
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
        right:70px;
        font-size:12px;
    }
    .top .sub7{
        position: absolute;
        right:140px;
        font-size:12px;
    }
    .top .sub2{
        position: absolute;
        top:38px;
        right:0px;
        font-size:12px;
    }
    .top .sub3{
        position: absolute;
        top:38px;
        right:95px;
        font-size:12px;
    }
    .top .sub4{
        position: absolute;
        top:38px;
        right:190px;
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
        right:210px;
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
        left:0px;
    }
    .top .sub8{
        position: absolute;
        top:38px;
        left:0px;
        font-size:12px;
        margin:0;
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
    .content .importPayroll{
        display: block;
    }
    .content .downloadPayroll{
        display: inline-block;
        width:120px;
        height:32px;
        color: #fff;
        text-align: center;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        font-size:12px;
        margin-top: 20px;
    }
    .content .importPayrollBtn{
        font-size:12px;
        margin-top: 20px;
        margin-right: 30px;
    }
</style>
