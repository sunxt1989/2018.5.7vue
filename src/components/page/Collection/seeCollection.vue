<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看收容项</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button v-if="isChange" @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">保存</el-button>
                <el-button v-if="isChange" @click="model(2)" size="small" type="danger" class="sub2" :loading="isLoading">记账</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>收容项</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>场景选择</span>
                        <el-select class="sel" v-model="scene" placeholder="请选择" @change="changeScene" :disabled="!isChange">
                            <el-option
                                v-for="item in sceneList"
                                :key="item.value"
                                :label="item.sceneName"
                                :value="item.idString">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="businessDateFlg == 1">
                        <span class="tit"><span class="red">*</span>{{businessDateName}}</span>
                        <el-date-picker
                            class="iptData"
                            v-model="businessDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期"
                            :disabled="!isChange">
                        </el-date-picker>
                    </li>
                    <li class="sm" v-show="projectDepartmentFlg != 0">
                        <span class="tit"><span class="red">*</span>{{projectDepartmentName}}</span>
                        <el-select class="sel" v-model="department" placeholder="请选择" :disabled="!isChange">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="moneyFlg == 1">
                        <span class="tit"><span class="red">*</span>{{moneyName}}</span>
                        <input class="ipt" type="text" v-model="money" maxlength="20" @change="changeMoney" :readonly="!isChange">
                    </li>
                    <li class="sm" v-show="tradeFlg == 1" style="position: relative;">
                        <span class="tit"><span class="red">*</span>{{tradeName}}</span>
                        <el-select class="sel" v-model="supplier" placeholder="请选择" :disabled="!isChange" filterable allow-create default-first-option>
                            <el-option
                                v-for="item in supplierList"
                                :key="item.value"
                                :label="item.tradeName"
                                :value="item.tradeName">
                            </el-option>
                        </el-select>
                        <input v-show="isChange" class="opt" type="text" v-model="supplier" maxlength="18" placeholder="请选择或输入">
                    </li>
                    <li class="sm" v-show="payTypeFlg == 1">
                        <span class="tit"><span class="red">*</span>{{payTypeName}}</span>
                        <el-select class="sel" v-model="mode" placeholder="请选择" @change="payTypeChange" :disabled="!isChange">
                            <el-option
                                v-for="item in modeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="bankCodeFlg == 1">
                        <span class="tit"><span class="red">*</span>{{bankCodeName}}</span>
                        <el-select class="sel" v-model="bankCode" placeholder="请选择" :disabled="ChangeBankCode || !isChange">
                            <el-option
                                v-for="item in bankCodeList"
                                :key="item.value"
                                :label="item.bankNameShow"
                                :value="item.idString">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="tradeBankCodeFlg == 1">
                        <span class="tit">{{tradeBankCodeName}}</span>
                        <input class="ipt" type="text" v-model="supplierBankCode" maxlength="20" :readonly="!isChange">
                    </li>
                    <li class="sm" v-show="employeeFlg == 1" style="position: relative;">
                        <span class="tit"><span class="red">*</span>{{employeeTitle}}</span>
                        <el-select class="sel" v-model="employeeName" :disabled="!isChange" placeholder="请选择">
                            <el-option
                                v-for="item in employeeList"
                                :key="item.idString"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                        <input v-show="isChange" class="opt" type="text" v-model="employeeName" maxlength="18" placeholder="请选择或输入">
                    </li>

                    <li class="sm" v-show="taxRateFlg==1">
                        <span class="tit"><span class="red">*</span>{{taxRateName}}</span>
                        <el-select class="sel" v-model="taxRate" placeholder="请选择" :disabled="!isChange">
                            <el-option
                                v-for="item in taxRateList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="taxMoneyFlg==1">
                        <span class="tit"><span class="red">*</span>{{taxMoneyName}}</span>
                        <input class="ipt" type="text" v-model="taxAmount" maxlength="20" @change="changeTaxAmount" :readonly="!isChange">
                    </li>
                    <li class="pt cf" v-show="discriptionFlg == 1">
                        <span class="tit2">{{discriptionName}}</span>
                        <textarea class="tex" v-model="discription" maxlength="50" :readonly="!isChange"></textarea>
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
    import { mapState } from  'vuex'
    export default{
        data() {
            return{
                scene:'',//场景选择
                sceneList:[],//场景选择列表

                businessDate:'',//业务日期
                businessDateName:'',//业务日期名称
                businessDateFlg:0,//业务日期是否显示

                department:'',//部门/项目
                projectDepartmentName:'',//部门/项目名称
                departmentAndProjectList:[],//部门/项目列表
                departmentList:[],//当前部门/项目列表
                projectDepartmentFlg:0,//部门/项目是否显示

                money:'0.00',//金额
                moneyName:'',//金额名称
                moneyFlg:0,//是否显示金额

                supplier:'',//交易方
                tradeName:'',//交易方名称
                tradeFlg:0,//是否显示交易方
                supplierList:[],//交易方列表

                employeeTitle:'',//员工名称标题
                employeeName:'',//员工名称
                employeeFlg:0,//是否显示员工名称
                employeeList:[],//员工列表

                mode:'2',//收付款方式
                payTypeFlg:0,//是否显示收付款方式
                payTypeName:'',//收付款方式名称
                modeList:[
                    {value:'1',name:'现金'},
                    {value:'2',name:'银行'},
                    {value:'3',name:'未收付'},
                    {value:'5',name:'企业微信'},
                    {value:'6',name:'企业支付宝'},
                    {value:'7',name:'企业借贷宝'}
                ],//收付款方式列表

                bankCode:'',//银行账户
                bankCodeName:'',//银行账户名称
                bankCodeList:[],//银行账户列表
                bankCodeFlg:0,//银行账户是否显示
                ChangeBankCode:false,//true不能选择 false可以选择

                supplierBankCode:'',//交易方银行账户
                tradeBankCodeFlg:0,//是否显示交易方银行账户
                tradeBankCodeName:'',//交易方银行账户名称

                taxRate:0,//税率
                taxRateName:'',//税率名称
                taxRateFlg:'',//是否显示税率
                taxRateList:[
                    {value:0,label:'免税'},
                    {value:3,label:'3%'},
                    {value:5,label:'5%'},
                    {value:6,label:'6%'},
                    {value:10,label:'10%'},
                    {value:11,label:'11%'},
                    {value:16,label:'16%'},
                    {value:17,label:'17%'}
                ],//税率列表
                taxAmount:'0.00',//税额
                taxMoneyName:'',//税额名称
                taxMoneyFlg:'',//是否显示税额
                discription:'',//备注
                discriptionName:'',//备注名称
                discriptionFlg:'',//是否显示备注
                payFlg:'',//0：没有结算方式，1：有结算方式

                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                debitId:this.$route.params.debitId,
                isRedFlush:this.$route.params.isRedFlush,
                isChange:true,//是否能修改页面
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['current_book_ym','isMonthlyKnots','isAnnualKnots']),
        watch:{
            //对部门项目显示做判断1：只显示部门2：只显示项目3：显示部门和项目
            projectDepartmentFlg:function(val){
                let departmentAndProjectList = this.departmentAndProjectList
                let department = [];
                let project = [];
                if(val == 1){
                    for(let i in departmentAndProjectList){
                        if(departmentAndProjectList[i].projectFlg == 0){
                            department.push(departmentAndProjectList[i])
                        }
                    }
                    this.departmentList = department
                }else if(val == 2){
                    for(let i in departmentAndProjectList){
                        if(departmentAndProjectList[i].projectFlg == 1){
                            project.push(departmentAndProjectList[i])
                        }
                    }
                    this.departmentList = project
                }else if(val == 3){
                    this.departmentList = departmentAndProjectList
                }
            },
        },
        methods: {
            //判断支付方式，如果选择银行支付，银行账户才能使用
            payTypeChange(){
                if(this.mode == 2){
                    this.ChangeBankCode = false
                }else {
                    this.ChangeBankCode = true
                }
            },
            //输入税额的change事件，
            changeTaxAmount(){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(this.taxAmount)){
                    this.$message.error('请正确输入金额');
                    this.taxAmount = '0.00';
                    return
                }
                this.taxAmount = number.number(this.taxAmount)
            },
            //输入金额的change事件，
            changeMoney(){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(this.money)){
                    this.$message.error('请正确输入金额');
                    this.money = '0.00';
                    return
                }
                this.money = number.number(this.money)
            },
            //选择场景时的change事件
            changeScene(){
                this.loading = true
                let params = new URLSearchParams();
                let url = addUrl.addUrl('collectionSetting')
                params.append('id',this.scene);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value.setting;
                        this.bankCodeName = data.bankCodeName
                        this.bankCodeFlg = data.bankCodeFlg
                        this.businessDateName = data.businessDateName
                        this.businessDateFlg = data.businessDateFlg
                        this.projectDepartmentName = data.projectDepartmentName
                        this.projectDepartmentFlg = data.projectDepartmentFlg
                        this.moneyFlg = data.moneyFlg
                        this.moneyName = data.moneyName
                        this.tradeFlg = data.tradeFlg
                        this.tradeName = data.tradeName
                        this.payTypeFlg = data.payTypeFlg
                        this.payTypeName = data.payTypeName
                        this.tradeBankCodeFlg = data.tradeBankCodeFlg
                        this.tradeBankCodeName = data.tradeBankCodeName
                        this.discriptionFlg = data.discriptionFlg
                        this.discriptionName = data.discriptionName
                        this.taxRateFlg = data.taxRateFlg
                        this.taxRateName = data.taxRateName
                        this.taxMoneyFlg = data.taxMoneyFlg
                        this.taxMoneyName = data.taxMoneyName
                        this.employeeFlg = data.employeeFlg
                        this.employeeTitle = data.employeeName
                        this.payFlg = response.data.value.payFlg

                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    if(this.isChange){
                        this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.go(-1)
                        }).catch(() => {
                            this.loading = false;
                        });
                    }else{
                        this.$router.go(-1)
                    }
                }else{
                    if (this.scene == '') {
                        this.$message.error('请选择场景');
                        this.loading = false;
                        return
                    }
                    let businessDate =  Number(this.businessDate.split('-').join('').substring(0,6))
                    let businessDateYear = Number(this.businessDate.substring(0,4));//当前选择日期的年份
                    let current_book_ym = Number(this.current_book_ym);
                    let annualKnots = Number((this.current_book_ym.substring(0,4)-1) + '12');//去年12月
                    let lastYear = Number(this.current_book_ym.substring(0,4)-1);//去年年份
                    if(this.businessDateFlg == 1){//先判断是否显示了日期选择
                        if (this.businessDate == '') {
                            this.$message.error('请选择业务日期');
                            this.loading = false;
                            return
                        }
                        if(this.isMonthlyKnots && !this.isAnnualKnots && this.payFlg == 0){//判断已经12月月结但是还没年结时
                            if(businessDate < current_book_ym){//先判断业务日期不得早于当前账期
                                if(businessDateYear == lastYear && businessDate != annualKnots ){// 再判断选择的是否是去年12月份
                                    this.$message.error('补录去年业务数据，日期必须选择在去年12月份');
                                    this.loading = false;
                                    return
                                }else if(businessDateYear != lastYear){
                                    this.$message.error('业务日期不得早于当前账期1');
                                    this.loading = false
                                    return
                                }
                            }
                        }else{
                            if(businessDate < current_book_ym ) {
                                this.$message.error('业务日期不得早于当前账期2');
                                this.loading = false;
                                return
                            }
                        }
                    }
                    if (this.department == '' && this.projectDepartmentFlg == 1) {
                        this.$message.error('请选择部门/项目');
                        this.loading = false;
                        return
                    }
                    if(this.money == '0.00' && this.moneyFlg == 1){
                        this.$message.error('请正确输入金额');
                        this.loading = false;
                        return
                    }
                    if(unNumber.unNumber(this.money) < unNumber.unNumber(this.taxAmount)){
                        this.$message.error('输入的税额不得大于金额');
                        this.loading = false;
                        return
                    }
                    if(this.supplier == '' && this.tradeFlg == 1 ){
                        this.$message.error('请选择交易方');
                        this.loading = false;
                        return
                    }
                    if(this.mode == '2' && this.bankCode == '' && this.payTypeFlg == 1 ){
                        this.$message.error('请选择银行账户');
                        this.loading = false;
                        return
                    }
                    if(this.mode == '2' && this.employeeName == '' && this.employeeFlg == 1 ){
                        this.$message.error('请选择或输入员工名称');
                        this.loading = false;
                        return
                    }
                    this.isLoading = true;
                    let message = ''
                    if(n == 1){
                        message = '确定是否保存？'
                    }else if(n == 2){
                        message = '确定是否记账？'
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
                        this.loading = false;
                        this.isLoading = false;
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            axios(n){
                let params = new URLSearchParams();
                let url = ''
                if(n == 1){
                    url = addUrl.addUrl('collectionSave')
                }else if(n == 2){
                    url = addUrl.addUrl('collectionSubmit')
                }
                let departmentJson = ''
                for(let i in this.departmentAndProjectList){
                    if(this.departmentAndProjectList[i].id == this.department){
                        departmentJson = JSON.stringify(this.departmentAndProjectList[i])
                    }
                }
//                console.log(departmentJson);
                params.append('id',this.debitId);
                params.append('sceneId',this.scene);
                params.append('businessDate',this.businessDate);
                params.append('departmentJson',departmentJson);
                params.append('money',unNumber.unNumber(this.money));
                params.append('tradeName',this.supplier);
                params.append('payType',this.mode);
                params.append('bankId',this.bankCode);
                params.append('tradeBankName',this.supplierBankCode);
                params.append('discription',this.discription);
                params.append('taxRate',this.taxRate);
                params.append('employeeName',this.employeeName);
                params.append('taxMoney',unNumber.unNumber(this.taxAmount));

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '记账成功'
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
            let params = new URLSearchParams();
            let url = addUrl.addUrl('collection');
            params.append('id',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    let item = data.item
                    this.bankCodeList = data.bankList
                    this.departmentAndProjectList = data.departmentList
                    this.sceneList = data.settingList
                    this.supplierList = data.tradeList
                    this.employeeList = data.employeeList
                    this.scene = item.sceneIdString
                    this.businessDate = item.businessDateYMD
                    this.department = item.projectDepartmentIdString
                    this.money = number.number(item.money)
                    this.supplier = item.tradeName
                    this.employeeName = item.employeeName
                    this.mode = String(item.payType)
                    if(this.mode == '2'){
                        this.bankCode = item.bankIdString;
                        this.ChangeBankCode = false
                    }else{
                        this.bankCode = ''
                        this.ChangeBankCode = true
                    }
                    this.supplierBankCode = item.tradeBankNameShow
                    this.taxRate = item.taxRate
                    this.discription = item.discription
                    this.taxAmount = number.number(item.taxMoney);
                    //对状态做判断，0时为仅保存，可以修改并保存提交 ，4时为仅查看
                    let auditFlg = item.auditFlg;
                    if(auditFlg == 0){
                        this.isChange = true;
                    }else{
                        this.isChange = false
                    }
                    if(this.isRedFlush) this.isChange = false
                    this.changeScene()
                    this.loading = false
                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
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
    .list .sm .opt{
        width:260px;
        height:28px;
        border: none;
        font-size:14px;
        position: absolute;
        top:5px;
        left:185px;
        outline:none;
        color: #333;
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
    .list li .tex{
        width:76.7%;
        height:60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px 10px;
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
