<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>修改员工信息</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content cf" :style="{height:screenHeight}">
                <div class="line">
                    <span>修改员工信息</span>
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
                    <span>个人信息</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits"><span class="red">*</span>姓名</span>
                        <input class="ipts blue-bor" type="text" v-model="userName" maxlength="50">
                    </li>
                    <li class="ssm">
                        <span class="tits"><span class="red">*</span>证件类型</span>
                        <el-select class="sels blue-bor" v-model="credentialsType" placeholder="请选择" >
                            <el-option
                                v-for="item in certificatesList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="ssm">
                        <span class="tits"><span class="red">*</span>证件号码</span>
                        <input class="ipts blue-bor" type="text" v-model="credentialsCode" maxlength="32">
                    </li>
                    <li class="ssm">
                        <span class="tits blue">纳税人识别号</span>
                        <input class="ipts blue-bor" type="text" v-model="idNumber" maxlength="20">
                    </li>
                    <li class="ssm">
                        <span class="tits"><span class="red">*</span>是否为非居民个人</span>
                        <el-select class="sels blue-bor" v-model="nonResidentsStatus" placeholder="请选择">
                            <el-option
                                v-for="item in nonResidentsStatusList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
                <div class="line">
                    <span>收入额计算</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits"><span class="red">*</span>基本工资</span>
                        <input class="ipts blue-bor" type="text" v-model="basicWages" maxlength="15" @change="changeMoney(0)">
                    </li>
                    <li class="ssm">
                        <span class="tits blue">社保缴费工资</span>
                        <input class="ipts blue-bor" type="text" v-model="wage_base" maxlength="15" @change="wagesChange">
                    </li>
                    <li class="ssm">
                        <span class="tits">加班工资</span>
                        <input class="ipts blue-bor" type="text" v-model="overtimeWages" maxlength="15" @change="changeMoney(1)">
                    </li>
                    <li class="ssm">
                        <span class="tits">日常奖金</span>
                        <input class="ipts blue-bor" type="text" v-model="dailyBonus" maxlength="15" @change="changeMoney(2)">
                    </li>
                    <li class="ssm">
                        <span class="tits">津贴和补贴</span>
                        <input class="ipts blue-bor" type="text" v-model="subsidy" maxlength="15" @change="changeMoney(3)">
                    </li>
                    <li class="ssm">
                        <span class="tits">年终奖</span>
                        <input class="ipts blue-bor" type="text" v-model="annualBonus" maxlength="15" @change="changeMoney(4)">
                    </li>
                    <li class="ssm">
                        <span class="tits">免税收入</span>
                        <input class="ipts blue-bor" type="text" v-model="exemptIncome" maxlength="15" @change="changeMoney(5)">
                    </li>
                    <li class="ssm">
                        <span class="tits">事假扣款</span>
                        <input class="ipts blue-bor" type="text" v-model="leaveDeductMoney" maxlength="15" @change="changeMoney(6)">
                    </li>
                    <li class="ssm">
                        <span class="tits">病假扣款</span>
                        <input class="ipts blue-bor" type="text" v-model="sickDeduct" maxlength="15" @change="changeMoney(7)">
                    </li>
                    <li class="ssm">
                        <span class="tits">迟到早退扣款</span>
                        <input class="ipts blue-bor" type="text" v-model="lateDeductMoney" maxlength="15" @change="changeMoney(8)">
                    </li>
                    <li class="ssm">
                        <span class="tits">其他扣款</span>
                        <input class="ipts blue-bor" type="text" v-model="otherDeduct" maxlength="15" @change="changeMoney(9)">
                    </li>
                    <li class="ssm">
                        <span class="tits">应发合计</span>
                        <input class="ipts" type="text" v-model="totalSalary"  placeholder="合计无需填写" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>应扣个人款项</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">基本养老保险</span>
                        <input class="ipts green-bor" type="text" v-model="endowmentInsurancePerson" maxlength="15" @change="changeMoney(10)">
                    </li>
                    <li class="ssm">
                        <span class="tits">补充养老保险</span>
                        <input class="ipts blue-bor" type="text" v-model="supplementaryInsurancePerson" maxlength="15" @change="changeMoney(11)">
                    </li>
                    <li class="ssm">
                        <span class="tits">基本医疗保险</span>
                        <input class="ipts green-bor" type="text" v-model="medicalInsurancePerson" maxlength="15" @change="changeMoney(12)">
                    </li>
                    <li class="ssm">
                        <span class="tits">补充医疗保险</span>
                        <input class="ipts blue-bor" type="text" v-model="supplementaryMedicalInsurancePerson" maxlength="15" @change="changeMoney(13)">
                    </li>
                    <li class="ssm">
                        <span class="tits">失业保险费</span>
                        <input class="ipts green-bor" type="text" v-model="unemploymentInsurancePerson" maxlength="15" @change="changeMoney(14)">
                    </li>
                    <li class="ssm">
                        <span class="tits">住房公积金</span>
                        <input class="ipts green-bor" type="text" v-model="housingProvidentFundPerson" maxlength="15" @change="changeMoney(15)">
                    </li>
                    <li class="ssm">
                        <span class="tits">应扣个人合计款项</span>
                        <input class="ipts" type="text" v-model="insuranceSumPerson" maxlength="15" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>公司缴纳社保额公积金</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">基本养老保险</span>
                        <input class="ipts green-bor" type="text" v-model="endowmentInsuranceCompany" maxlength="15" @change="changeMoney(16)">
                    </li>
                    <li class="ssm">
                        <span class="tits">补充养老保险</span>
                        <input class="ipts blue-bor" type="text" v-model="supplementaryInsuranceCompany" maxlength="15" @change="changeMoney(17)">
                    </li>
                    <li class="ssm">
                        <span class="tits">基本医疗保险</span>
                        <input class="ipts green-bor" type="text" v-model="medicalInsuranceCompany" maxlength="15" @change="changeMoney(18)">
                    </li>
                    <li class="ssm">
                        <span class="tits">补充医疗保险</span>
                        <input class="ipts blue-bor" type="text" v-model="supplementaryMedicalInsuranceCompany" maxlength="15" @change="changeMoney(19)">
                    </li>
                    <li class="ssm">
                        <span class="tits">失业保险费</span>
                        <input class="ipts green-bor" type="text" v-model="unemploymentInsuranceCompany" maxlength="15" @change="changeMoney(20)">
                    </li>
                    <li class="ssm">
                        <span class="tits">工伤保险</span>
                        <input class="ipts green-bor" type="text" v-model="employmentInjuryInsuranceCompany" maxlength="15" @change="changeMoney(21)">
                    </li>
                    <li class="ssm">
                        <span class="tits">生育保险</span>
                        <input class="ipts green-bor" type="text" v-model="maternityInsuranceCompany" maxlength="15" @change="changeMoney(22)">
                    </li>
                    <li class="ssm">
                        <span class="tits">住房公积金</span>
                        <input class="ipts green-bor" type="text" v-model="housingProvidentFundCompany" maxlength="15" @change="changeMoney(23)">
                    </li>
                    <li class="ssm">
                        <span class="tits">五险一金合计</span>
                        <input class="ipts" type="text" v-model="insuranceSumCompany" maxlength="15" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>其他扣除</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">商业健康保险</span>
                        <input class="ipts blue-bor" type="text" v-model="commercialHealthInsurance" maxlength="15" @change="commercialHealthInsuranceChange">
                    </li>
                    <li class="ssm">
                        <span class="tits">税延养老保险</span>
                        <input class="ipts blue-bor" type="text" v-model="taxDeferredEndowmentInsurance" maxlength="15" @change="changeMoney(24)">
                    </li>
                    <li class="ssm">
                        <span class="tits">其他</span>
                        <input class="ipts blue-bor" type="text" v-model="otherDeduction" maxlength="15" @change="changeMoney(25)">
                    </li>
                    <li class="ssm">
                        <span class="tits">其他扣除合计</span>
                        <input class="ipts" type="text" v-model="totalOtherDeduction" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>专项附加扣除基数</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">子女教育</span>
                        <input class="ipts blue-bor" type="text" v-model="faChildrenEducation" maxlength="15" @change="changeMoney(39)">
                    </li>
                    <li class="ssm">
                        <span class="tits">赡养老人</span>
                        <input class="ipts blue-bor" type="text" v-model="faElderSupport" maxlength="15" @change="changeMoney(40)">
                    </li>
                    <li class="ssm">
                        <span class="tits">住房贷款利息</span>
                        <input class="ipts blue-bor" type="text" v-model="faHomeloanInterest" maxlength="15" @change="changeMoney(41)">
                    </li>
                    <li class="ssm">
                        <span class="tits">住房租金</span>
                        <input class="ipts blue-bor" type="text" v-model="faRent" maxlength="15" @change="changeMoney(42)">
                    </li>
                    <li class="ssm">
                        <span class="tits">继续教育</span>
                        <input class="ipts blue-bor" type="text" v-model="faContinuingEducation" maxlength="15" @change="changeMoney(43)">
                    </li>
                </ul>
                <div class="line">
                    <span>本年累计</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">累计收入额</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedSalary" maxlength="15" @change="changeMoney(26)">
                        <input type="hidden" v-model="accumulatedSalaryVal">
                    </li>
                    <li class="ssm">
                        <span class="tits">累计减除费用</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedFeesDeduction" maxlength="15" @change="changeMoney(27)">
                    </li>
                    <li class="ssm">
                        <span class="tits">累计专项扣除</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedSpecialDeduction" maxlength="15" @change="changeMoney(28)">
                    </li>
                    <li class="ssm">
                        <span class="tits">子女教育</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedChildrenEducation" maxlength="15" @change="changeMoney(30)">
                    </li>
                    <li class="ssm">
                        <span class="tits">赡养老人</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedElderSupport" maxlength="15" @change="changeMoney(31)">
                    </li>
                    <li class="ssm">
                        <span class="tits">住房贷款利息</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedHomeloanInterest" maxlength="15" @change="changeMoney(32)">
                    </li>
                    <li class="ssm">
                        <span class="tits">住房租金</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedRent" maxlength="15" @change="changeMoney(33)">
                    </li>
                    <li class="ssm">
                        <span class="tits">继续教育</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedContinuingEducation" maxlength="15" @change="changeMoney(34)">
                    </li>
                    <li class="ssm">
                        <span class="tits">累计其他扣除</span>
                        <input class="ipts green-bor" type="text" v-model="accumulatedOtherDeduction" maxlength="15" @change="changeMoney(29)">
                        <input type="hidden" v-model="accumulatedOtherDeductionVal">
                    </li>
                </ul>
                <div class="line">
                    <span>应纳税所得额</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">工资薪金</span>
                        <input class="ipts " type="text" v-model="taxPayableSalary" maxlength="15" readonly>
                    </li>
                    <li class="ssm">
                        <span class="tits">年终奖</span>
                        <input class="ipts " type="text" v-model="annualBonus" maxlength="15" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>税率/预扣率</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">工资薪金(%)</span>
                        <input class="ipts " type="text" v-model="taxRateSalary" maxlength="15" readonly>
                    </li>
                    <li class="ssm">
                        <span class="tits">年终奖(%)</span>
                        <input class="ipts " type="text" v-model="taxRateAnnualBonus" maxlength="15" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>速算扣除数</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">工资薪金</span>
                        <input class="ipts " type="text" v-model="quickCalculationDeductionSalary" maxlength="15" readonly>
                    </li>
                    <li class="ssm">
                        <span class="tits">年终奖</span>
                        <input class="ipts " type="text" v-model="quickCalculationDeductionAnnualBonus" maxlength="15" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>应纳税额</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">工资薪金</span>
                        <input class="ipts " type="text" v-model="taxOwedSalary" maxlength="15" readonly>
                    </li>
                    <li class="ssm">
                        <span class="tits">年终奖</span>
                        <input class="ipts " type="text" v-model="taxOwedAnnualBonus" maxlength="15" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>税款计算</span>
                </div>
                <ul class="list cf">
                    <li class="ssm">
                        <span class="tits">减按计税比例(%)</span>
                        <input class="ipts blue-bor" type="text" v-model="deductionRatio" maxlength="15" @change="changeMoney(35)">
                    </li>
                    <li class="ssm">
                        <span class="tits">准予扣除的捐赠额</span>
                        <input class="ipts blue-bor" type="text" v-model="allowedDeductionOfDonations" maxlength="15" @change="changeMoney(36)">
                    </li>
                    <li class="ssm">
                        <span class="tits">减免税额</span>
                        <input class="ipts blue-bor" type="text" v-model="taxCredit" maxlength="15" @change="changeMoney(37)">
                    </li>
                    <li class="ssm">
                        <span class="tits">已扣缴税额</span>
                        <input class="ipts blue-bor" type="text" v-model="taxPrePaidAndWithheld" maxlength="15" @change="changeMoney(38)">
                    </li>
                    <li class="ssm">
                        <span class="tits">个人所得税</span>
                        <input class="ipts" type="text" v-model="incomeTax" maxlength="15" readonly>
                    </li>
                    <li class="ssm">
                        <span class="tits">实发工资</span>
                        <input class="ipts" type="text" v-model="actualWages" maxlength="15" readonly>
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

                certificatesList:[],//证件类型列表

                userName:'',//姓名
                credentialsType:'',//证件类型
                credentialsCode:'',//证件号码
                idNumber:'',//纳税人识别号
                nonResidentsStatus:'',//是否为非居民个人
                nonResidentsStatusList:[
                    {label:'是',value:'1'},
                    {label:'否',value:'0'},
                ],//是否为非居民个人
                basicWages:'',//基本工资
                wage_base:'',//社保缴费工资
                overtimeWages:'',//加班工资
                dailyBonus:'',//日常奖金
                subsidy:'',//津贴和补贴
                annualBonus:'',//年终奖
                exemptIncome:'',//免税收入
                leaveDeductMoney:'',//事假扣款
                sickDeduct:'',//病假扣款
                lateDeductMoney:'',//迟到早退扣款
                otherDeduct:'',//其他扣款
                // totalSalary:'',//应发合计

                endowmentInsurancePerson:'',//基本养老保险
                supplementaryInsurancePerson:'',//补充养老保险
                medicalInsurancePerson:'',//基本医疗保险
                supplementaryMedicalInsurancePerson:'',//补充医疗保险
                unemploymentInsurancePerson:'',//失业保险费
                housingProvidentFundPerson:'',//住房公积金
                // insuranceSumPerson:'',//应扣个人合计款项

                endowmentInsuranceCompany:'',//基本养老保险
                supplementaryInsuranceCompany:'',//补充养老保险
                medicalInsuranceCompany:'',//基本医疗保险
                supplementaryMedicalInsuranceCompany:'',//补充医疗保险
                unemploymentInsuranceCompany:'',//失业保险费
                employmentInjuryInsuranceCompany:'',//工伤保险
                maternityInsuranceCompany:'',//生育保险
                housingProvidentFundCompany:'',//住房公积金
                // insuranceSumCompany:'',//五险一金合计

                commercialHealthInsurance:'',//商业健康保险
                taxDeferredEndowmentInsurance:'',//税延养老保险
                otherDeduction:'',//其他
                // totalOtherDeduction:'',//其他扣除合计

                accumulatedSalary:'',//累计收入额
                accumulatedFeesDeduction:'5000',//累计减除费用
                accumulatedSpecialDeduction:'',//累计专项扣除
                accumulatedChildrenEducation:'',//子女教育
                accumulatedElderSupport:'',//赡养老人
                accumulatedHomeloanInterest:'',//住房贷款利息
                accumulatedRent:'',//住房租金
                accumulatedContinuingEducation:'',//继续教育
                accumulatedOtherDeduction:'',//累计其他扣除

                faChildrenEducation:'',//专项附加税基数-子女教育
                faElderSupport:'',//专项附加税基数-赡养老人
                faHomeloanInterest:'',//专项附加税基数-住房贷款利息
                faRent:'',//专项附加税基数-住房租金
                faContinuingEducation:'',//专项附加税基数-继续教育

                // taxPayableSalary:'',//应纳税所得额-工资薪金
                // taxRateSalary:'',//税率/预扣率-工资薪金
                // taxRateAnnualBonus:'',//年终奖
                // quickCalculationDeductionSalary:'',//工资薪金
                // quickCalculationDeductionAnnualBonus:'',//年终奖
                // taxOwedSalary:'',//工资薪金
                // taxOwedAnnualBonus:'',//年终奖
                deductionRatio:'100',//减按计税比例
                allowedDeductionOfDonations:'',//准予扣除的捐赠额
                taxCredit:'',//减免税额
                taxPrePaidAndWithheld:'',//已扣缴税额
                // incomeTax:'',//个人所得税
                // actualWages:'',//实发工资

                id:this.$route.params.id,//工资单ID
                // userName:this.$route.params.userName,//姓名
                userId:this.$route.params.userId,//用户ID
                updateTime:0,//时间戳
                ym:this.$route.params.ym,//当前账期
                isCalculation:this.$route.params.isCalculation,//是否需已计提
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
        computed:{
            //应发合计
            totalSalary:function () {
                let basicWages = unNumber.unNumber(this.basicWages);//基本工资
                let overtimeWages = unNumber.unNumber(this.overtimeWages);//加班工资
                let dailyBonus = unNumber.unNumber(this.dailyBonus);//日常奖金
                let subsidy = unNumber.unNumber(this.subsidy);//津贴和补贴
                let annualBonus = unNumber.unNumber(this.annualBonus);//年终奖
                let exemptIncome = unNumber.unNumber(this.exemptIncome);//免税收入
                let leaveDeductMoney = unNumber.unNumber(this.leaveDeductMoney);//事假扣款
                let sickDeduct = unNumber.unNumber(this.sickDeduct);//病假扣款
                let lateDeductMoney = unNumber.unNumber(this.lateDeductMoney);//迟到早退扣款
                let otherDeduct = unNumber.unNumber(this.otherDeduct);//其他扣款
                return parseFloat(basicWages + overtimeWages + dailyBonus + subsidy + annualBonus + exemptIncome
                    - leaveDeductMoney - sickDeduct - lateDeductMoney -otherDeduct).toFixed(2)
            },
            //应扣个人合计款项
            insuranceSumPerson:function () {
                let endowmentInsurancePerson = unNumber.unNumber(this.endowmentInsurancePerson);//基本养老保险
                let supplementaryInsurancePerson = unNumber.unNumber(this.supplementaryInsurancePerson);//补充养老保险
                let medicalInsurancePerson = unNumber.unNumber(this.medicalInsurancePerson);//基本医疗保险
                let supplementaryMedicalInsurancePerson = unNumber.unNumber(this.supplementaryMedicalInsurancePerson);//补充医疗保险
                let unemploymentInsurancePerson = unNumber.unNumber(this.unemploymentInsurancePerson);//失业保险费
                let housingProvidentFundPerson = unNumber.unNumber(this.housingProvidentFundPerson);//住房公积金
                return parseFloat(endowmentInsurancePerson + supplementaryInsurancePerson + medicalInsurancePerson
                    + supplementaryMedicalInsurancePerson + unemploymentInsurancePerson + housingProvidentFundPerson).toFixed(2)
            },
            //五险一金合计
            insuranceSumCompany:function () {
                let endowmentInsuranceCompany = unNumber.unNumber(this.endowmentInsuranceCompany);
                let supplementaryInsuranceCompany = unNumber.unNumber(this.supplementaryInsuranceCompany);
                let medicalInsuranceCompany = unNumber.unNumber(this.medicalInsuranceCompany);
                let supplementaryMedicalInsuranceCompany = unNumber.unNumber(this.supplementaryMedicalInsuranceCompany);
                let unemploymentInsuranceCompany = unNumber.unNumber(this.unemploymentInsuranceCompany);
                let employmentInjuryInsuranceCompany = unNumber.unNumber(this.employmentInjuryInsuranceCompany);
                let maternityInsuranceCompany = unNumber.unNumber(this.maternityInsuranceCompany);
                let housingProvidentFundCompany = unNumber.unNumber(this.housingProvidentFundCompany);
                return parseFloat(endowmentInsuranceCompany + supplementaryInsuranceCompany + medicalInsuranceCompany +
                    supplementaryMedicalInsuranceCompany + unemploymentInsuranceCompany + employmentInjuryInsuranceCompany +
                    maternityInsuranceCompany + housingProvidentFundCompany).toFixed(2)
            },
            //其他扣除合计
            totalOtherDeduction:function () {
                let commercialHealthInsurance = unNumber.unNumber(this.commercialHealthInsurance);
                let taxDeferredEndowmentInsurance = unNumber.unNumber(this.taxDeferredEndowmentInsurance);
                let otherDeduction = unNumber.unNumber(this.otherDeduction);
                return parseFloat(commercialHealthInsurance + taxDeferredEndowmentInsurance + otherDeduction).toFixed(2)
            },
            //累计收入额
            accumulatedSalaryVal:function(){
                let basicWages = unNumber.unNumber(this.basicWages);//基本工资
                let overtimeWages = unNumber.unNumber(this.overtimeWages);//加班工资
                let dailyBonus = unNumber.unNumber(this.dailyBonus);//日常奖金
                let subsidy = unNumber.unNumber(this.subsidy);//津贴和补贴
                let leaveDeductMoney = unNumber.unNumber(this.leaveDeductMoney);//事假扣款
                let sickDeduct = unNumber.unNumber(this.sickDeduct);//病假扣款
                let lateDeductMoney = unNumber.unNumber(this.lateDeductMoney);//迟到早退扣款
                let otherDeduct = unNumber.unNumber(this.otherDeduct);//其他扣款
                let supplementaryMedicalInsurancePerson = unNumber.unNumber(this.supplementaryMedicalInsurancePerson);//补充医疗保险（个人）
                let supplementaryMedicalInsuranceCompany = unNumber.unNumber(this.supplementaryMedicalInsuranceCompany);//补充医疗保险（公司）
                let accumulatedSalary = parseFloat(basicWages + overtimeWages + dailyBonus + subsidy - leaveDeductMoney
                    - sickDeduct - lateDeductMoney - otherDeduct + supplementaryMedicalInsurancePerson
                    + supplementaryMedicalInsuranceCompany).toFixed(2)

                return this.accumulatedSalary = accumulatedSalary
            },
            //累计专项扣除
            accumulatedSpecialDeductionVal:function () {
                let endowmentInsurancePerson = unNumber.unNumber(this.endowmentInsurancePerson);//基本养老保险
                let supplementaryInsurancePerson = unNumber.unNumber(this.supplementaryInsurancePerson);//基本医疗保险
                let unemploymentInsurancePerson = unNumber.unNumber(this.unemploymentInsurancePerson);//失业保险费
                let housingProvidentFundPerson = unNumber.unNumber(this.housingProvidentFundPerson);//住房公积金
                let accumulatedSpecialDeduction = parseFloat(endowmentInsurancePerson + supplementaryInsurancePerson + unemploymentInsurancePerson
                    + housingProvidentFundPerson).toFixed(2)
                return this.accumulatedSpecialDeduction = accumulatedSpecialDeduction
            },
            //累计其他扣除
            accumulatedOtherDeductionVal:function () {
                let totalOtherDeduction = unNumber.unNumber(this.totalOtherDeduction);//其他扣除合计
                let supplementaryInsurancePerson = unNumber.unNumber(this.supplementaryInsurancePerson);//补充养老保险
                let accumulatedOtherDeduction = parseFloat(totalOtherDeduction + supplementaryInsurancePerson).toFixed(2)
                return this.accumulatedOtherDeduction = accumulatedOtherDeduction
            },
            //应纳税所得额-工资薪金
            taxPayableSalary:function () {
                let accumulatedSalary = unNumber.unNumber(this.accumulatedSalary);//累计收入额
                let accumulatedFeesDeduction = unNumber.unNumber(this.accumulatedFeesDeduction);//累计减除费用
                let accumulatedSpecialDeduction = unNumber.unNumber(this.accumulatedSpecialDeduction);//累计专项扣除
                let accumulatedChildrenEducation = unNumber.unNumber(this.accumulatedChildrenEducation);//子女教育
                let accumulatedElderSupport = unNumber.unNumber(this.accumulatedElderSupport);//赡养老人
                let accumulatedHomeloanInterest = unNumber.unNumber(this.accumulatedHomeloanInterest);//住房贷款利息
                let accumulatedRent = unNumber.unNumber(this.accumulatedRent);//住房租金
                let accumulatedContinuingEducation = unNumber.unNumber(this.accumulatedContinuingEducation);//继续教育
                let accumulatedOtherDeduction = unNumber.unNumber(this.accumulatedOtherDeduction);//累计其他扣除
                let deductionRatio = unNumber.unNumber(this.deductionRatio)/100;//减按计税比例
                let allowedDeductionOfDonations = unNumber.unNumber(this.allowedDeductionOfDonations);//准予扣除的捐赠额

                let x = accumulatedSalary - accumulatedFeesDeduction - accumulatedSpecialDeduction - accumulatedChildrenEducation
                    - accumulatedElderSupport - accumulatedHomeloanInterest - accumulatedRent - accumulatedContinuingEducation - accumulatedOtherDeduction;
                let y = (x * deductionRatio * 0.3) > allowedDeductionOfDonations ? allowedDeductionOfDonations : (x * deductionRatio * 0.3)
                let z = x * deductionRatio - y
                // console.log(x,'x; x=累计收入额-累计减除费用-累计专项扣除-子女教育-赡养老人-住房贷款利息-住房租金-继续教育-累计其他扣除');
                // console.log(y,'y; y=min（(累计收入额-累计减除费用-累计专项扣除-子女教育-赡养老人-住房贷款利息-住房租金-继续教育-累计其他扣除）*减按计税比例*30%，准予扣除的捐赠额)');
                // console.log(z,'z; z=x*减按计税比例-y');
                // console.log(deductionRatio,'减按计税比例');
                return x * deductionRatio - y > 0 ? parseFloat(x * deductionRatio - y).toFixed(2) : 0
            },
            //税率/预扣率-工资薪金
            taxRateSalary:function () {
                let n = unNumber.unNumber(this.taxPayableSalary);//应纳税所得额-工资薪金
                return n <= 36000 ? 3 :
                    n <= 144000 ? 10 :
                        n <= 300000 ? 20:
                            n <= 420000 ? 25 :
                                n <= 660000 ? 30 :
                                    n <= 960000 ? 35 : 45
            },
            //税率/预扣率-年终奖
            taxRateAnnualBonus:function () {
                let n = unNumber.unNumber(this.annualBonus)/12;//应纳税所得额-年终奖
                return n <= 3000 ? 3 :
                    n <= 12000 ? 10 :
                        n <= 25000 ? 20 :
                            n <= 35000 ? 25 :
                                n <= 55000 ? 30 :
                                    n <= 80000 ? 35 : 45
            },
            //速算扣除数-工资薪金
            quickCalculationDeductionSalary:function () {
                let n = unNumber.unNumber(this.taxPayableSalary);//应纳税所得额-工资薪金
                return n <= 36000 ? 0 :
                    n <= 144000 ? 2520 :
                        n <= 300000 ? 16920 :
                            n <= 420000 ? 31920 :
                                n <= 660000 ? 52920 :
                                    n <= 960000 ? 85920 : 181920
            },
            //速算扣除数-年终奖
            quickCalculationDeductionAnnualBonus:function () {
                let n = unNumber.unNumber(this.annualBonus)/12;//应纳税所得额-年终奖
                console.log(n);
                return n <= 3000 ? 0 :
                    n <= 12000 ? 210 :
                        n <= 25000 ? 1410 :
                            n <= 35000 ? 2660 :
                                n <= 55000 ? 4410 :
                                    n <= 80000 ? 7160 : 15160
            },
            //应纳税额-工资薪金
            taxOwedSalary:function () {
                let taxPayableSalary = unNumber.unNumber(this.taxPayableSalary);//应纳税所得额-工资薪金
                let taxRateSalary = unNumber.unNumber(this.taxRateSalary)/100;//税率/预扣率-工资薪金
                let quickCalculationDeductionSalary = unNumber.unNumber(this.quickCalculationDeductionSalary);//速算扣除数-工资薪金
                return parseFloat(taxPayableSalary * taxRateSalary - quickCalculationDeductionSalary).toFixed(2)
            },
            //应纳税额-年终奖
            taxOwedAnnualBonus:function () {
                let annualBonus = unNumber.unNumber(this.annualBonus);//应纳税所得额-工资薪金
                let taxRateAnnualBonus = unNumber.unNumber(this.taxRateAnnualBonus)/100;//税率/预扣率-年终奖
                let quickCalculationDeductionAnnualBonus = unNumber.unNumber(this.quickCalculationDeductionAnnualBonus);//速算扣除数-年终奖
                return parseFloat(annualBonus * taxRateAnnualBonus - quickCalculationDeductionAnnualBonus).toFixed(2)
            },
            //个人所得税
            incomeTax:function () {
                let taxOwedSalary = unNumber.unNumber(this.taxOwedSalary);//应纳税所得额-工资薪金
                let taxOwedAnnualBonus = unNumber.unNumber(this.taxOwedAnnualBonus);//应纳税额-年终奖
                let taxPrePaidAndWithheld = unNumber.unNumber(this.taxPrePaidAndWithheld);//已扣缴税额
                let taxCredit = unNumber.unNumber(this.taxCredit);//减免税额
                return parseFloat(taxOwedSalary + taxOwedAnnualBonus - taxPrePaidAndWithheld - taxCredit).toFixed(2)
            },
            //实发工资
            actualWages:function () {
                let totalSalary = unNumber.unNumber(this.totalSalary);//应发合计
                let insuranceSumPerson = unNumber.unNumber(this.insuranceSumPerson);//应扣个人合计款项
                let incomeTax = unNumber.unNumber(this.incomeTax);//个人所得税
                return parseFloat(totalSalary - insuranceSumPerson - incomeTax).toFixed(2)
            }
        },
        methods: {
            //商业健康险change事件,不能超过200
            commercialHealthInsuranceChange(){
                this.commercialHealthInsurance = Number(this.commercialHealthInsurance) > 200 ? '200' : this.commercialHealthInsurance
            },
            //金额change事件
            changeMoney(n){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                let basicWages = unNumber.unNumber(this.basicWages)
                let overtimeWages = unNumber.unNumber(this.overtimeWages)
                let dailyBonus = unNumber.unNumber(this.dailyBonus)
                let subsidy = unNumber.unNumber(this.subsidy)
                let annualBonus = unNumber.unNumber(this.annualBonus)
                let exemptIncome = unNumber.unNumber(this.exemptIncome)
                let leaveDeductMoney = unNumber.unNumber(this.leaveDeductMoney)
                let sickDeduct = unNumber.unNumber(this.sickDeduct)
                let lateDeductMoney = unNumber.unNumber(this.lateDeductMoney)
                let otherDeduct = unNumber.unNumber(this.otherDeduct)
                let endowmentInsurancePerson = unNumber.unNumber(this.endowmentInsurancePerson)
                let supplementaryInsurancePerson = unNumber.unNumber(this.supplementaryInsurancePerson)
                let medicalInsurancePerson = unNumber.unNumber(this.medicalInsurancePerson)
                let supplementaryMedicalInsurancePerson = unNumber.unNumber(this.supplementaryMedicalInsurancePerson)
                let unemploymentInsurancePerson = unNumber.unNumber(this.unemploymentInsurancePerson)
                let housingProvidentFundPerson = unNumber.unNumber(this.housingProvidentFundPerson)
                let endowmentInsuranceCompany = unNumber.unNumber(this.endowmentInsuranceCompany)
                let supplementaryInsuranceCompany = unNumber.unNumber(this.supplementaryInsuranceCompany)
                let medicalInsuranceCompany = unNumber.unNumber(this.medicalInsuranceCompany)
                let supplementaryMedicalInsuranceCompany = unNumber.unNumber(this.supplementaryMedicalInsuranceCompany)
                let unemploymentInsuranceCompany = unNumber.unNumber(this.unemploymentInsuranceCompany)
                let employmentInjuryInsuranceCompany = unNumber.unNumber(this.employmentInjuryInsuranceCompany)
                let maternityInsuranceCompany = unNumber.unNumber(this.maternityInsuranceCompany)
                let housingProvidentFundCompany = unNumber.unNumber(this.housingProvidentFundCompany)
                let taxDeferredEndowmentInsurance = unNumber.unNumber(this.taxDeferredEndowmentInsurance)
                let otherDeduction = unNumber.unNumber(this.otherDeduction)
                let accumulatedSalary = unNumber.unNumber(this.accumulatedSalary)
                let accumulatedFeesDeduction = unNumber.unNumber(this.accumulatedFeesDeduction)
                let accumulatedSpecialDeduction = unNumber.unNumber(this.accumulatedSpecialDeduction)
                let accumulatedOtherDeduction = unNumber.unNumber(this.accumulatedOtherDeduction)
                let accumulatedChildrenEducation = unNumber.unNumber(this.accumulatedChildrenEducation)
                let accumulatedElderSupport = unNumber.unNumber(this.accumulatedElderSupport)
                let accumulatedHomeloanInterest = unNumber.unNumber(this.accumulatedHomeloanInterest)
                let accumulatedRent = unNumber.unNumber(this.accumulatedRent)
                let accumulatedContinuingEducation = unNumber.unNumber(this.accumulatedContinuingEducation)
                let deductionRatio = unNumber.unNumber(this.deductionRatio)
                let allowedDeductionOfDonations = unNumber.unNumber(this.allowedDeductionOfDonations)
                let taxCredit = unNumber.unNumber(this.taxCredit)
                let taxPrePaidAndWithheld = unNumber.unNumber(this.taxPrePaidAndWithheld)

                let faChildrenEducation = unNumber.unNumber(this.faChildrenEducation)
                let faElderSupport = unNumber.unNumber(this.faElderSupport)
                let faHomeloanInterest = unNumber.unNumber(this.faHomeloanInterest)
                let faRent = unNumber.unNumber(this.faRent)
                let faContinuingEducation = unNumber.unNumber(this.faContinuingEducation)

                if(n == 0){
                    if(!str.test(basicWages)){
                        this.$message.error('请正确输入基本工资');
                        this.basicWages ='0.00';
                        return
                    }else{
                        this.basicWages = number.number(basicWages)
                    }
                }else if(n == 1){
                    if(!str.test(overtimeWages)){
                        this.$message.error('请正确输入加班工资');
                        this.overtimeWages ='0.00';
                        return
                    }else{
                        this.overtimeWages = number.number(overtimeWages)
                    }
                }else if(n == 2){
                    if(!str.test(dailyBonus)){
                        this.$message.error('请正确输入日常奖金');
                        this.dailyBonus ='0.00';
                        return
                    }else{
                        this.dailyBonus = number.number(dailyBonus)
                    }
                }else if(n == 3){
                    if(!str.test(subsidy)){
                        this.$message.error('请正确输入津贴和补贴');
                        this.subsidy ='0.00';
                        return
                    }else{
                        this.subsidy = number.number(subsidy)
                    }
                }else if(n == 4){
                    if(!str.test(annualBonus)){
                        this.$message.error('请正确输入年终奖');
                        this.annualBonus ='0.00';
                        return
                    }else{
                        this.annualBonus = number.number(annualBonus)
                    }
                }else if(n == 5){
                    if(!str.test(exemptIncome)){
                        this.$message.error('请正确输入免税收入');
                        this.exemptIncome ='0.00';
                        return
                    }else{
                        this.exemptIncome = number.number(exemptIncome)
                    }
                }else if(n == 6){
                    if(!str.test(leaveDeductMoney)){
                        this.$message.error('请正确输入事假扣款');
                        this.leaveDeductMoney ='0.00';
                        return
                    }else{
                        this.leaveDeductMoney = number.number(leaveDeductMoney)
                    }
                }else if(n == 7){
                    if(!str.test(sickDeduct)){
                        this.$message.error('请正确输入病假扣款');
                        this.sickDeduct ='0.00';
                        return
                    }else{
                        this.sickDeduct = number.number(sickDeduct)
                    }
                }else if(n == 8){
                    if(!str.test(lateDeductMoney)){
                        this.$message.error('请正确输入迟到早退扣款');
                        this.lateDeductMoney ='0.00';
                        return
                    }else{
                        this.lateDeductMoney = number.number(lateDeductMoney)
                    }
                }else if(n == 9){
                    if(!str.test(otherDeduct)){
                        this.$message.error('请正确输入其他扣款');
                        this.otherDeduct ='0.00';
                        return
                    }else{
                        this.otherDeduct = number.number(otherDeduct)
                    }
                }else if(n == 10){
                    if(!str.test(endowmentInsurancePerson)){
                        this.$message.error('请正确输入基本养老保险');
                        this.endowmentInsurancePerson ='0.00';
                        return
                    }else{
                        this.endowmentInsurancePerson = number.number(endowmentInsurancePerson)
                    }
                }else if(n == 11){
                    if(!str.test(supplementaryInsurancePerson)){
                        this.$message.error('请正确输入补充养老保险');
                        this.supplementaryInsurancePerson ='0.00';
                        return
                    }else{
                        this.supplementaryInsurancePerson = number.number(supplementaryInsurancePerson)
                    }
                }else if(n == 12){
                    if(!str.test(medicalInsurancePerson)){
                        this.$message.error('请正确输入基本医疗保险');
                        this.medicalInsurancePerson ='0.00';
                        return
                    }else{
                        this.medicalInsurancePerson = number.number(medicalInsurancePerson)
                    }
                }else if(n == 13){
                    if(!str.test(supplementaryMedicalInsurancePerson)){
                        this.$message.error('请正确输入补充医疗保险');
                        this.supplementaryMedicalInsurancePerson ='0.00';
                        return
                    }else{
                        this.supplementaryMedicalInsurancePerson = number.number(supplementaryMedicalInsurancePerson)
                    }
                }else if(n == 14){
                    if(!str.test(unemploymentInsurancePerson)){
                        this.$message.error('请正确输入失业保险费');
                        this.unemploymentInsurancePerson ='0.00';
                        return
                    }else{
                        this.unemploymentInsurancePerson = number.number(unemploymentInsurancePerson)
                    }
                }else if(n == 15){
                    if(!str.test(housingProvidentFundPerson)){
                        this.$message.error('请正确输入住房公积金');
                        this.housingProvidentFundPerson ='0.00';
                        return
                    }else{
                        this.housingProvidentFundPerson = number.number(housingProvidentFundPerson)
                    }
                }else if(n == 16){
                    if(!str.test(endowmentInsuranceCompany)){
                        this.$message.error('请正确输入基本养老保险');
                        this.endowmentInsuranceCompany ='0.00';
                        return
                    }else{
                        this.endowmentInsuranceCompany = number.number(endowmentInsuranceCompany)
                    }
                }else if(n == 17){
                    if(!str.test(supplementaryInsuranceCompany)){
                        this.$message.error('请正确输入补充养老保险');
                        this.supplementaryInsuranceCompany ='0.00';
                        return
                    }else{
                        this.supplementaryInsuranceCompany = number.number(supplementaryInsuranceCompany)
                    }
                }else if(n == 18){
                    if(!str.test(medicalInsuranceCompany)){
                        this.$message.error('请正确输入基本医疗保险');
                        this.medicalInsuranceCompany ='0.00';
                        return
                    }else{
                        this.medicalInsuranceCompany = number.number(medicalInsuranceCompany)
                    }
                }else if(n == 19){
                    if(!str.test(supplementaryMedicalInsuranceCompany)){
                        this.$message.error('请正确输入补充医疗保险');
                        this.supplementaryMedicalInsuranceCompany ='0.00';
                        return
                    }else{
                        this.supplementaryMedicalInsuranceCompany = number.number(supplementaryMedicalInsuranceCompany)
                    }
                }else if(n == 20){
                    if(!str.test(unemploymentInsuranceCompany)){
                        this.$message.error('请正确输入失业保险费');
                        this.unemploymentInsuranceCompany ='0.00';
                        return
                    }else{
                        this.unemploymentInsuranceCompany = number.number(unemploymentInsuranceCompany)
                    }
                }else if(n == 21){
                    if(!str.test(employmentInjuryInsuranceCompany)){
                        this.$message.error('请正确输入工伤保险');
                        this.employmentInjuryInsuranceCompany ='0.00';
                        return
                    }else{
                        this.employmentInjuryInsuranceCompany = number.number(employmentInjuryInsuranceCompany)
                    }
                }else if(n == 22){
                    if(!str.test(maternityInsuranceCompany)){
                        this.$message.error('请正确输入生育保险');
                        this.maternityInsuranceCompany ='0.00';
                        return
                    }else{
                        this.maternityInsuranceCompany = number.number(maternityInsuranceCompany)
                    }
                }else if(n == 23){
                    if(!str.test(housingProvidentFundCompany)){
                        this.$message.error('请正确输入住房公积金');
                        this.housingProvidentFundCompany ='0.00';
                        return
                    }else{
                        this.housingProvidentFundCompany = number.number(housingProvidentFundCompany)
                    }
                }else if(n == 24){
                    if(!str.test(taxDeferredEndowmentInsurance)){
                        this.$message.error('请正确输入税延养老保险');
                        this.taxDeferredEndowmentInsurance ='0.00';
                        return
                    }else{
                        this.taxDeferredEndowmentInsurance = number.number(taxDeferredEndowmentInsurance)
                    }
                }else if(n == 25){
                    if(!str.test(otherDeduction)){
                        this.$message.error('请正确输入其他');
                        this.otherDeduction ='0.00';
                        return
                    }else{
                        this.otherDeduction = number.number(otherDeduction)
                    }
                }else if(n == 26){
                    if(!str.test(accumulatedSalary)){
                        this.$message.error('请正确输入累计收入额');
                        this.accumulatedSalary ='0.00';
                        return
                    }else{
                        this.accumulatedSalary = number.number(accumulatedSalary)
                    }
                }else if(n == 27){
                    if(!str.test(accumulatedFeesDeduction)){
                        this.$message.error('请正确输入累计减除费用');
                        this.accumulatedFeesDeduction ='0.00';
                        return
                    }else{
                        this.accumulatedFeesDeduction = number.number(accumulatedFeesDeduction)
                    }
                }else if(n == 28){
                    if(!str.test(accumulatedSpecialDeduction)){
                        this.$message.error('请正确输入累计专项扣除');
                        this.accumulatedSpecialDeduction ='0.00';
                        return
                    }else{
                        this.accumulatedSpecialDeduction = number.number(accumulatedSpecialDeduction)
                    }
                }else if(n == 29){
                    if(!str.test(accumulatedOtherDeduction)){
                        this.$message.error('请正确输入累计其他扣除');
                        this.accumulatedOtherDeduction ='0.00';
                        return
                    }else{
                        this.accumulatedOtherDeduction = number.number(accumulatedOtherDeduction)
                    }
                }else if(n == 30){
                    if(!str.test(accumulatedChildrenEducation)){
                        this.$message.error('请正确输入子女教育');
                        this.accumulatedChildrenEducation ='0.00';
                        return
                    }else{
                        this.accumulatedChildrenEducation = number.number(accumulatedChildrenEducation)
                    }
                }else if(n == 31){
                    if(!str.test(accumulatedElderSupport)){
                        this.$message.error('请正确输入赡养老人');
                        this.accumulatedElderSupport ='0.00';
                        return
                    }else{
                        this.accumulatedElderSupport = number.number(accumulatedElderSupport)
                    }
                }else if(n == 32){
                    if(!str.test(accumulatedHomeloanInterest)){
                        this.$message.error('请正确输入住房贷款利息');
                        this.accumulatedHomeloanInterest ='0.00';
                        return
                    }else{
                        this.accumulatedHomeloanInterest = number.number(accumulatedHomeloanInterest)
                    }
                }else if(n == 33){
                    if(!str.test(accumulatedRent)){
                        this.$message.error('请正确输入住房租金');
                        this.accumulatedRent ='0.00';
                        return
                    }else{
                        this.accumulatedRent = number.number(accumulatedRent)
                    }
                }else if(n == 34){
                    if(!str.test(accumulatedContinuingEducation)){
                        this.$message.error('请正确输入继续教育');
                        this.accumulatedContinuingEducation ='0.00';
                        return
                    }else{
                        this.accumulatedContinuingEducation = number.number(accumulatedContinuingEducation)
                    }
                }else if(n == 35){
                    if(!str.test(deductionRatio) || deductionRatio > 100){
                        this.$message.error('请正确输入减按计税比例');
                        this.deductionRatio ='0.00';
                        return
                    }else{
                        this.deductionRatio = deductionRatio
                    }
                }else if(n == 36){
                    if(!str.test(allowedDeductionOfDonations)){
                        this.$message.error('请正确输入准予扣除的捐赠额');
                        this.allowedDeductionOfDonations ='0.00';
                        return
                    }else{
                        this.allowedDeductionOfDonations = number.number(allowedDeductionOfDonations)
                    }
                }else if(n == 37){
                    if(!str.test(taxCredit)){
                        this.$message.error('请正确输入减免税额');
                        this.taxCredit ='0.00';
                        return
                    }else{
                        this.taxCredit = number.number(taxCredit)
                    }
                }else if(n == 38){
                    if(!str.test(taxPrePaidAndWithheld)){
                        this.$message.error('请正确输入已扣缴税额');
                        this.taxPrePaidAndWithheld ='0.00';
                        return
                    }else{
                        this.taxPrePaidAndWithheld = number.number(taxPrePaidAndWithheld)
                    }
                }else if(n == 39){
                    if(!str.test(faChildrenEducation)){
                        this.$message.error('请正确输入子女教育');
                        this.faChildrenEducation ='0.00';
                        return
                    }else{
                        this.faChildrenEducation = number.number(faChildrenEducation)
                    }
                }else if(n == 40){
                    if(!str.test(faElderSupport)){
                        this.$message.error('请正确输入赡养老人');
                        this.faElderSupport ='0.00';
                        return
                    }else{
                        this.faElderSupport = number.number(faElderSupport)
                    }
                }else if(n == 41){
                    if(!str.test(faHomeloanInterest)){
                        this.$message.error('请正确输入住房贷款利息');
                        this.faHomeloanInterest ='0.00';
                        return
                    }else{
                        this.faHomeloanInterest = number.number(faHomeloanInterest)
                    }
                }else if(n == 42){
                    if(!str.test(faRent)){
                        this.$message.error('请正确输入住房租金');
                        this.faRent ='0.00';
                        return
                    }else{
                        this.faRent = number.number(faRent)
                    }
                }else if(n == 43){
                    if(!str.test(faContinuingEducation)){
                        this.$message.error('请正确输入继续教育');
                        this.faContinuingEducation ='0.00';
                        return
                    }else{
                        this.faContinuingEducation = number.number(faContinuingEducation)
                    }
                }
            },
            //社保基数生成事件
            wageBase(wage_base){
                console.log(wage_base);
                let params = new URLSearchParams();
                let url = addUrl.addUrl('wageBase')
                params.append('wage_base', wage_base);
                params.append('currentYM', this.currentYM);
                axios.post(url,params)
                    .then(response=> {
                        console.log(response);
                        let data = response.data.value
                        this.endowmentInsurancePerson = number.number(data.endowmentInsurancePerson)
                        this.medicalInsurancePerson = number.number(data.medicalInsurancePerson)
                        this.unemploymentInsurancePerson = number.number(data.unemploymentInsurancePerson)
                        this.employmentInjuryInsurancePerson = number.number(data.employmentInjuryInsurancePerson)
                        this.maternityInsurancePerson = number.number(data.maternityInsurancePerson)
                        this.housingProvidentFundPerson = number.number(data.housingProvidentFundPerson)
                        this.endowmentInsuranceCompany = number.number(data.endowmentInsuranceCompany)
                        this.medicalInsuranceCompany = number.number(data.medicalInsuranceCompany)
                        this.unemploymentInsuranceCompany = number.number(data.unemploymentInsuranceCompany)
                        this.employmentInjuryInsuranceCompany = number.number(data.employmentInjuryInsuranceCompany)
                        this.maternityInsuranceCompany = number.number(data.maternityInsuranceCompany)
                        this.housingProvidentFundCompany = number.number(data.housingProvidentFundCompany)
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
                    }else if(this.credentialsType == ''){
                        this.$message.error('请正确输入证件类型');
                        this.loading = false;
                        return
                    }else if(this.credentialsCode == ''){
                        this.$message.error('请正确输入证件号码');
                        this.loading = false;
                        return
                    }else if(this.credentialsType == ''){
                        this.$message.error('请正确输入证件类型');
                        this.loading = false;
                        return
                    }else if(this.nonResidentsStatus == ''){
                        this.$message.error('请正确输入是否为非居民个人');
                        this.loading = false;
                        return
                    }else if(this.basicWages == '' && this.basicWages == '0.00'){
                        this.$message.error('请正确输入基本工资');
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

                params.append('id',this.id);
                params.append('userId',this.userId);
                params.append('updateTime',this.updateTime);
                params.append('userName',this.userName);
                params.append('divideFlg',divideFlg);
                params.append('jsonList',departmentJson);
                params.append('credentialsType',this.credentialsType);
                params.append('credentialsCode',this.credentialsCode);
                params.append('idNumber',this.idNumber);
                params.append('nonResidentsStatus',this.nonResidentsStatus);

                params.append('basicWages',unNumber.unNumber(this.basicWages));
                params.append('wage_base',unNumber.unNumber(this.wage_base));
                params.append('overtimeWages',unNumber.unNumber(this.overtimeWages));
                params.append('dailyBonus',unNumber.unNumber(this.dailyBonus));
                params.append('subsidy',unNumber.unNumber(this.subsidy));
                params.append('annualBonus',unNumber.unNumber(this.annualBonus));
                params.append('exemptIncome',unNumber.unNumber(this.exemptIncome));
                params.append('leaveDeductMoney',unNumber.unNumber(this.leaveDeductMoney));
                params.append('sickDeduct',unNumber.unNumber(this.sickDeduct));
                params.append('lateDeductMoney',unNumber.unNumber(this.lateDeductMoney));
                params.append('otherDeduct',unNumber.unNumber(this.otherDeduct));
                params.append('totalSalary',unNumber.unNumber(this.totalSalary));

                params.append('endowmentInsurancePerson',unNumber.unNumber(this.endowmentInsurancePerson));
                params.append('supplementaryInsurancePerson',unNumber.unNumber(this.supplementaryInsurancePerson));
                params.append('medicalInsurancePerson',unNumber.unNumber(this.medicalInsurancePerson));
                params.append('supplementaryMedicalInsurancePerson',unNumber.unNumber(this.supplementaryMedicalInsurancePerson));
                params.append('unemploymentInsurancePerson',unNumber.unNumber(this.unemploymentInsurancePerson));
                params.append('housingProvidentFundPerson',unNumber.unNumber(this.housingProvidentFundPerson));
                params.append('insuranceSumPerson',unNumber.unNumber(this.insuranceSumPerson));
                params.append('endowmentInsuranceCompany',unNumber.unNumber(this.endowmentInsuranceCompany));
                params.append('supplementaryInsuranceCompany',unNumber.unNumber(this.supplementaryInsuranceCompany));
                params.append('medicalInsuranceCompany',unNumber.unNumber(this.medicalInsuranceCompany));
                params.append('supplementaryMedicalInsuranceCompany',unNumber.unNumber(this.supplementaryMedicalInsuranceCompany));
                params.append('unemploymentInsuranceCompany',unNumber.unNumber(this.unemploymentInsuranceCompany));
                params.append('employmentInjuryInsuranceCompany',unNumber.unNumber(this.employmentInjuryInsuranceCompany));
                params.append('maternityInsuranceCompany',unNumber.unNumber(this.maternityInsuranceCompany));
                params.append('housingProvidentFundCompany',unNumber.unNumber(this.housingProvidentFundCompany));
                params.append('insuranceSumCompany',unNumber.unNumber(this.insuranceSumCompany));

                params.append('commercialHealthInsurance',unNumber.unNumber(this.commercialHealthInsurance));
                params.append('taxDeferredEndowmentInsurance',unNumber.unNumber(this.taxDeferredEndowmentInsurance));
                params.append('otherDeduction',this.otherDeduction);
                params.append('totalOtherDeduction',this.totalOtherDeduction);
                params.append('accumulatedSalary',this.accumulatedSalary);
                params.append('accumulatedFeesDeduction',this.accumulatedFeesDeduction);
                params.append('accumulatedSpecialDeduction',this.accumulatedSpecialDeduction);
                params.append('accumulatedOtherDeduction',this.accumulatedOtherDeduction);
                params.append('accumulatedChildrenEducation',this.accumulatedChildrenEducation);
                params.append('accumulatedElderSupport',this.accumulatedElderSupport);
                params.append('accumulatedHomeloanInterest',this.accumulatedHomeloanInterest);
                params.append('accumulatedRent',this.accumulatedRent);
                params.append('accumulatedContinuingEducation',this.accumulatedContinuingEducation);
                params.append('taxPayableSalary',this.taxPayableSalary);
                params.append('taxPayableAnnualBonus',this.annualBonus);
                params.append('taxRateSalary',this.taxRateSalary);
                params.append('taxRateAnnualBonus',this.taxRateAnnualBonus);
                params.append('quickCalculationDeductionSalary',this.quickCalculationDeductionSalary);
                params.append('quickCalculationDeductionAnnualBonus',this.quickCalculationDeductionAnnualBonus);
                params.append('taxOwedSalary',this.taxOwedSalary);
                params.append('taxOwedAnnualBonus',this.taxOwedAnnualBonus);
                params.append('deductionRatio',this.deductionRatio);
                params.append('allowedDeductionOfDonations',this.allowedDeductionOfDonations);
                params.append('taxCredit',this.taxCredit);
                params.append('taxPrePaidAndWithheld',this.taxPrePaidAndWithheld);
                params.append('incomeTax',this.incomeTax);
                params.append('actualWages',this.actualWages);
                params.append('faChildrenEducation',this.faChildrenEducation);
                params.append('faElderSupport',this.faElderSupport);
                params.append('faHomeloanInterest',this.faHomeloanInterest);
                params.append('faRent',this.faRent);
                params.append('faContinuingEducation',this.faContinuingEducation);
                params.append('ym',this.ym);

                let url = addUrl.addUrl('update')
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
                        console.log(response);
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
            let params = new URLSearchParams()
            let url = addUrl.addUrl('seePayroll')
            params.append('id',this.id)
            params.append('userName',this.userName)
            params.append('userId',this.userId)
            axios.post(url,params)
                .then(response=> {
                   console.log(response);
                    let data = response.data.value;
                    let salaryItem = data.salaryItem
                    //设置部门
                    this.options4 = data.jsonList;
                    this.certificatesList = data.credentialsTypeList;

                    if(salaryItem.id != '0'){
                        this.userName = salaryItem.userName
                        this.credentialsType = Number(salaryItem.credentialsType)
                        this.credentialsCode = salaryItem.credentialsCode
                        this.idNumber = salaryItem.idNumber
                        this.nonResidentsStatus = String(salaryItem.nonResidentsStatus)
                        this.basicWages = salaryItem.basicWages
                        this.wage_base = salaryItem.basicSocialSecurity
                        this.overtimeWages = salaryItem.overtimeWages
                        this.dailyBonus = salaryItem.dailyBonus
                        this.subsidy = salaryItem.subsidy
                        this.annualBonus = salaryItem.annualBonus
                        this.exemptIncome = salaryItem.exemptIncome
                        this.leaveDeductMoney = salaryItem.leaveDeductMoney
                        this.sickDeduct = salaryItem.sickDeduct
                        this.lateDeductMoney = salaryItem.lateDeductMoney
                        this.otherDeduct = salaryItem.otherDeduct
                        this.endowmentInsurancePerson = salaryItem.endowmentInsurancePerson
                        this.supplementaryInsurancePerson = salaryItem.supplementaryInsurancePerson
                        this.medicalInsurancePerson = salaryItem.medicalInsurancePerson
                        this.supplementaryMedicalInsurancePerson = salaryItem.supplementaryMedicalInsurancePerson
                        this.unemploymentInsurancePerson = salaryItem.unemploymentInsurancePerson
                        this.housingProvidentFundPerson = salaryItem.housingProvidentFundPerson
                        this.endowmentInsuranceCompany = salaryItem.endowmentInsuranceCompany
                        this.supplementaryInsuranceCompany = salaryItem.supplementaryInsuranceCompany
                        this.medicalInsuranceCompany = salaryItem.medicalInsuranceCompany
                        this.supplementaryMedicalInsuranceCompany = salaryItem.supplementaryMedicalInsuranceCompany
                        this.unemploymentInsuranceCompany = salaryItem.unemploymentInsuranceCompany
                        this.employmentInjuryInsuranceCompany = salaryItem.employmentInjuryInsuranceCompany
                        this.maternityInsuranceCompany = salaryItem.maternityInsuranceCompany
                        this.housingProvidentFundCompany = salaryItem.housingProvidentFundCompany
                        this.commercialHealthInsurance = salaryItem.commercialHealthInsurance
                        this.taxDeferredEndowmentInsurance = salaryItem.taxDeferredEndowmentInsurance
                        this.otherDeduction = salaryItem.otherDeduction
                        this.accumulatedSalary = salaryItem.accumulatedSalary
                        this.accumulatedFeesDeduction = salaryItem.accumulatedFeesDeduction
                        this.accumulatedSpecialDeduction = salaryItem.accumulatedSpecialDeduction
                        this.accumulatedOtherDeduction = salaryItem.accumulatedOtherDeduction

                        this.faChildrenEducation = salaryItem.faChildrenEducation
                        this.faElderSupport = salaryItem.faElderSupport
                        this.faHomeloanInterest = salaryItem.faHomeloanInterest
                        this.faRent = salaryItem.faRent
                        this.faContinuingEducation = salaryItem.faContinuingEducation

                        this.taxPayableAnnualBonus = salaryItem.annualBonus
                        this.deductionRatio = salaryItem.deductionRatio
                        this.allowedDeductionOfDonations = salaryItem.allowedDeductionOfDonations
                        this.taxCredit = salaryItem.taxCredit
                        this.taxPrePaidAndWithheld = salaryItem.taxPrePaidAndWithheld
                        this.updateTime = salaryItem.updateTime

                        //判断如果有上月累计数据时，专项=基数+累计
                        if(data.lastMonthItem){
                            this.accumulatedChildrenEducation = data.lastMonthItem.accumulatedChildrenEducation  + this.faChildrenEducation
                            this.accumulatedElderSupport = data.lastMonthItem.accumulatedElderSupport + this.faElderSupport
                            this.accumulatedHomeloanInterest = data.lastMonthItem.accumulatedHomeloanInterest + this.faHomeloanInterest
                            this.accumulatedRent = data.lastMonthItem.accumulatedRent + this.faRent
                            this.accumulatedContinuingEducation = data.lastMonthItem.accumulatedContinuingEducation + this.faContinuingEducation
                        }else{
                            this.accumulatedChildrenEducation = salaryItem.accumulatedChildrenEducation
                            this.accumulatedElderSupport = salaryItem.accumulatedElderSupport
                            this.accumulatedHomeloanInterest = salaryItem.accumulatedHomeloanInterest
                            this.accumulatedRent = salaryItem.accumulatedRent
                            this.accumulatedContinuingEducation = salaryItem.accumulatedContinuingEducation
                        }

                        let divideFlg = salaryItem.divideFlg;//判断是否为分摊 0 为未分摊 1为分摊
                        if(divideFlg ==0){
                            this.isShare = false

                            if(salaryItem.departmentId == '0'){
                                this.department = salaryItem.projectId
                            }else{
                                this.department = salaryItem.departmentId
                            }
                        }else{
                            this.isShare = true;
                            if(salaryItem.departmentId == '0'){
                                this.select1 = salaryItem.projectId
                            }else{
                                this.select1 = salaryItem.departmentId
                            }
                            if(salaryItem.departmentId2 == '0'){
                                this.select2 = salaryItem.projectId2
                            }else{
                                this.select2 = salaryItem.departmentId2
                            }
                            if(salaryItem.departmentId3 == '0'){
                                this.select3 = salaryItem.projectId3
                            }else{
                                this.select3 = salaryItem.departmentId3
                            }
                            if(salaryItem.departmentId4 == '0'){
                                this.select4 = salaryItem.projectId4
                            }else{
                                this.select4 = salaryItem.departmentId4
                            }
                            if(salaryItem.departmentId5 == '0'){
                                this.select5 = salaryItem.projectId5
                            }else{
                                this.select5 = salaryItem.departmentId5
                            }

                            this.input1 = salaryItem.projectDivRate =='null'? 0 :salaryItem.projectDivRate
                            this.input2 = salaryItem.projectDivRate2 =='null'? 0 :salaryItem.projectDivRate2
                            this.input3 = salaryItem.projectDivRate3 =='null'? 0 :salaryItem.projectDivRate3
                            this.input4 = salaryItem.projectDivRate4 =='null'? 0 :salaryItem.projectDivRate4
                            this.input5 = salaryItem.projectDivRate5 =='null'? 0 :salaryItem.projectDivRate5
                        }
                    }else{
                        this.id = salaryItem.id
                    }
                    this.loading = false
                })
                .catch(error=> {
                    this.loading = false
                   console.log(error);
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
        /*line-height: 36px;*/
        margin-top: 20px;
        float: left;
    }
    .list .sm{
        width:50%;
    }
    .list .ssm{
        width:33%;
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
    .list li .tits{
        font-size:14px;
        display: inline-block;
        width:100px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list li .ipts{
        display: inline-block;
        width:200px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .sels{
        width:222px;
        height:28px;
        border-color: #b9e9f2
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
    .list .ssm .blue-bor{
        border-color: #b9e9f2;
    }
    .list .ssm .green-bor{
        border-color: #42ca34;
    }
    .line{
        margin-top: 10px;
    }
</style>
