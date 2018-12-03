<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>调整用户</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button  @click="model(1)" size="small" type="danger" class="sub" :loading="isLoading">保存</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content cf" :style="{height:screenHeight}">
                <div class="left">
                    <table class="list">
                        <col width="20%">
                        <col width="80%">
                        <tr>
                            <td class="hd">姓名</td>
                            <td>{{userName}}</td>
                        </tr>
                        <tr>
                            <td class="hd">管理员</td>
                            <td>
                                <el-checkbox class="check" v-model="managerFlg" size="medium" :disabled="isManagerFlg">
                                    管理员 勾选会替换原来的管理员</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td rowspan="6" class="hd">用户角色</td>
                            <td>
                                <el-checkbox class="check" v-model="bossFlg" size="medium" :disabled="isBossFlg">
                                    企业负责人 勾选会替换原来的管理员</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox class="check" v-model="financeFlg" size="medium" :disabled="isFinanceFlg">
                                    财务负责人 勾选会替换原来的管理员</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox class="check" v-model="cashierFlg" size="medium" :disabled="isCashierFlg">
                                    出纳 勾选会替换原来的管理员</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox class="check" v-model="hrFlg" size="medium">
                                    综合负责人</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox class="check" v-model="saleFlg" size="medium">
                                    销售专员</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <el-checkbox class="check" v-model="purchaseFlg" size="medium">
                                    采购专员</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td class="hd">加入时间</td>
                            <td>{{createTimeYMD}}</td>
                        </tr>
                    </table>
                </div>
                <div class="right">
                    <div class="department">
                        <p>用户部门</p>
                        <p>部门负责人唯一，勾选会替换原来的部门负责人</p>
                        <div class="departmentChange">
                            <el-checkbox-group v-model="departments">
                                <el-checkbox v-for="department in departmentOption"
                                             :label="department.idString"
                                             :key="department.idString">
                                    <p>{{department.departmentName}}</p>
                                </el-checkbox>
                            </el-checkbox-group>
                            <el-checkbox-group v-model="departments2" class="charge">
                                <el-checkbox v-for="department in departmentOption"
                                             :label="department.idString"
                                             :key="department.idString">
                                    <p>部门负责人</p>
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>

                    </div>
                    <div class="fun">
                        <p>功能权限</p>
                        <div class="funChange">
                            <ul>
                                <li>
                                    <span class="tit">报销：</span>
                                    <el-checkbox v-model="chakanApplication"disabled>查看</el-checkbox>
                                    <el-checkbox v-model="caozuoApplication"disabled>操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">借款：</span>
                                    <el-checkbox v-model="chakanDebit"disabled>查看</el-checkbox>
                                    <el-checkbox v-model="caozuoDebit"disabled>操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">采购：</span>
                                    <el-checkbox v-model="chakanPurchase">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoPurchase">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">销售：</span>
                                    <el-checkbox v-model="chakanSale">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoSale">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">工资：</span>
                                    <el-checkbox v-model="chakanSalary">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoSalary">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">资产：</span>
                                    <el-checkbox v-model="chakanAssets">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoAssets">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">账务处理：</span>
                                    <el-checkbox v-model="chakanAccounting">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoAccounting">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">银行业务：</span>
                                    <el-checkbox v-model="chakanBank">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoBank">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">报表：</span>
                                    <el-checkbox v-model="chakanReport">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoReport">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">收付款：</span>
                                    <el-checkbox v-model="chakanPayment">查看</el-checkbox>
                                    <el-checkbox v-model="caozuoPayment">操作</el-checkbox>
                                </li>
                                <li>
                                    <span class="tit">账套管理：</span>
                                    <el-checkbox v-model="chakanManage" disabled>查看</el-checkbox>
                                    <el-checkbox v-model="caozuoManage" disabled>操作</el-checkbox>
                                </li>

                            </ul>
                        </div>
                    </div>
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
    export default{
        data(){
            return{
                userName:'',//姓名
                bookUserId:'',//账套员工id
                createTimeYMD:'',//创建时间
                managerFlg:false,//管理员标记
                isManagerFlg:false,//管理员标记

                bossFlg:false,//企业负责人标记
                isBossFlg:false,//企业负责人标记

                financeFlg:false,//财务负责人标记
                isFinanceFlg:false,//财务负责人标记

                cashierFlg:false,//出纳标记
                isCashierFlg:false,//出纳标记

                hrFlg:false,//综合管理员标记

                purchaseFlg:false,//采购专员标记

                saleFlg:false,//销售专员标记

                departments:[],//部门权限
                departments2:[],//部门权限
                departmentOption:[],//部门列表
                hqId:[],//管理本部id

                chakanApplication:true,//报销查看
                caozuoApplication:true,//报销操作

                chakanDebit:true,//借款查看
                caozuoDebit:true,//借款操作

                chakanPurchase:false,//采购查看
                caozuoPurchase:false,//采购操作

                chakanSale:false,//销售查看
                caozuoSale:false,//销售操作

                chakanSalary:false,//工资查看
                caozuoSalary:false,//工资操作

                chakanAssets:false,//资产查看
                caozuoAssets:false,//资产操作

                chakanAccounting:false,//账务处理查看
                caozuoAccounting:false,//账务处理操作

                chakanBank:false,//银行业务查看
                caozuoBank:false,//银行业务操作

                chakanReport:false,//报表查看
                caozuoReport:false,//报表操作

                chakanPayment:false,//收付款查看
                caozuoPayment:false,//收付款操作

                chakanManage:false,//账套管理查看
                caozuoManage:false,//账套管理操作

                debitId:this.$route.params.debitId,
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        watch:{
            //管理员change事件(控制账套管理、报销、借款)
            managerFlg:function(val){
                this.chakanManage = val;
                this.caozuoManage = val;
            },
            //企业负责人change事件（控制报销、借款、采购、销售、工资、资产、账务处理、银行业务、报表、收付款、）
            bossFlg:function(val){
                //采购状态判断
                if(val || this.financeFlg || this.purchaseFlg){
                    this.chakanPurchase = true;
                    this.caozuoPurchase = true;
                }else{
                    this.chakanPurchase = false;
                    this.caozuoPurchase = false;
                }
                //销售状态判断
                if(val || this.financeFlg || this.saleFlg){
                    this.chakanSale = true;
                    this.caozuoSale = true;
                }else{
                    this.chakanSale = false;
                    this.caozuoSale = false;
                }
                //工资、资产状态判断
                if(val || this.financeFlg || this.hrFlg){
                    this.chakanSalary = true;
                    this.caozuoSalary = true;
                    this.chakanAssets = true;
                    this.caozuoAssets = true;
                }else{
                    this.chakanSalary = false;
                    this.caozuoSalary = false;
                    this.chakanAssets = false;
                    this.caozuoAssets = false;
                }
                //账务处理状态判断
                if(val || this.financeFlg){
                    this.chakanAccounting = true;
                    this.caozuoAccounting = true;
                    this.chakanReport = true;
                    this.caozuoReport = true;
                }else{
                    this.chakanAccounting = false;
                    this.caozuoAccounting = false;
                    this.chakanReport = false;
                    this.caozuoReport = false;
                }
                //银行业务、收付款状态判断
                if(val || this.financeFlg || this.cashierFlg){
                    this.chakanBank = true;
                    this.caozuoBank = true;
                    this.chakanPayment = true;
                    this.caozuoPayment = true;
                }else{
                    this.chakanBank = false;
                    this.caozuoBank = false;
                    this.chakanPayment = false;
                    this.caozuoPayment = false;
                }
            },
            //财务负责人change事件（控制报销、借款、采购、销售、工资、资产、账务处理、银行业务、报表、收付款、）
            financeFlg:function(val){
                //采购状态判断
                if(val || this.bossFlg || this.purchaseFlg){
                    this.chakanPurchase = true;
                    this.caozuoPurchase = true;
                }else{
                    this.chakanPurchase = false;
                    this.caozuoPurchase = false;
                }
                //销售状态判断
                if(val || this.bossFlg || this.saleFlg){
                    this.chakanSale = true;
                    this.caozuoSale = true;
                }else{
                    this.chakanSale = false;
                    this.caozuoSale = false;
                }
                //工资、资产状态判断
                if(val || this.bossFlg || this.hrFlg){
                    this.chakanSalary = true;
                    this.caozuoSalary = true;
                    this.chakanAssets = true;
                    this.caozuoAssets = true;
                }else{
                    this.chakanSalary = false;
                    this.caozuoSalary = false;
                    this.chakanAssets = false;
                    this.caozuoAssets = false;
                }
                //账务处理状态判断
                if(val || this.bossFlg){
                    this.chakanAccounting = true;
                    this.caozuoAccounting = true;
                    this.chakanReport = true;
                    this.caozuoReport = true;
                }else{
                    this.chakanAccounting = false;
                    this.caozuoAccounting = false;
                    this.chakanReport = false;
                    this.caozuoReport = false;
                }
                //银行业务、收付款状态判断
                if(val || this.bossFlg || this.cashierFlg){
                    this.chakanBank = true;
                    this.caozuoBank = true;
                    this.chakanPayment = true;
                    this.caozuoPayment = true;
                }else{
                    this.chakanBank = false;
                    this.caozuoBank = false;
                    this.chakanPayment = false;
                    this.caozuoPayment = false;
                }
            },
            //出纳change事件（控制报销、借款、银行业务、收付款）
            cashierFlg:function(val){
                //银行业务、收付款状态判断
                if(val || this.bossFlg || this.financeFlg ){
                    this.chakanBank = true;
                    this.caozuoBank = true;
                    this.chakanPayment = true;
                    this.caozuoPayment = true;
                }else{
                    this.chakanBank = false;
                    this.caozuoBank = false;
                    this.chakanPayment = false;
                    this.caozuoPayment = false;
                }
            },
            //综合负责人change事件（控制报销、借款、工资、资产）
            hrFlg:function(val){
                //工资、资产状态判断
                if(val || this.bossFlg || this.financeFlg){
                    this.chakanSalary = true;
                    this.caozuoSalary = true;
                    this.chakanAssets = true;
                    this.caozuoAssets = true;
                }else{
                    this.chakanSalary = false;
                    this.caozuoSalary = false;
                    this.chakanAssets = false;
                    this.caozuoAssets = false;
                }
            },
            //采购专员change事件（控制报销、借款、采购）
            purchaseFlg:function(val){
//                console.log(val);
                //采购状态判断
                if(val || this.financeFlg || this.bossFlg){
                    this.chakanPurchase = true;
                    this.caozuoPurchase = true;
                }else{
                    this.chakanPurchase = false;
                    this.caozuoPurchase = false;
                }
            },
            //销售专员change事件（控制报销、借款、销售）
            saleFlg:function(val){
                //销售状态判断
                if(val || this.financeFlg || this.bossFlg){
                    this.chakanSale = true;
                    this.caozuoSale = true;
                }else{
                    this.chakanSale = false;
                    this.caozuoSale = false;
                }
            }
        },
        methods: {
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false;
                    });
                }else{
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
                let url = addUrl.addUrl('changeStaff')

                //制作部门权限参数
                let departmentsArr = [];
                let departmentOption = this.departmentOption
                let departments = this.departments
                let departments2 = this.departments2

                //判断管理本部为必选项
                if(departments.length == 0){
                    this.$message.error('用户部门必须勾选管理本部')
                    this.loading = false;
                    return
                }else{
                    if(!departments.includes(this.hqId)){
                        this.$message.error('用户部门必须勾选管理本部')
                        this.loading = false;
                        return
                    }
                }

                for(let i in departmentOption){
                    for(let j in departments){
                        if (departmentOption[i].idStr == departments[j]) {
                            departmentsArr.push(departments[j])
                        }
                    }
                }
                if (departments2.length == 0) {
                    for (let i in departmentsArr) {
                        if (i < departmentsArr.length) {
                            departmentsArr[i] = departmentsArr[i] + ',2'
                        } else {
                            departmentsArr[i] = departmentsArr[i] + ',2'
                        }
                    }
                } else {
                    for (let i in departmentsArr) {
                        for(let j in departments2){
                            if (departmentsArr[i] == departments2[j]) {
                                departmentsArr[i] = departmentsArr[i] + ',1'
                            }
                        }
                    }
                }
                for(let i in departmentsArr){
                    if(!departmentsArr[i].includes(',')){
                        departmentsArr[i] +=',2'
                    }
                }
                //制作菜单权限参数
                let menus = '';
                menus += this.chakanApplication == true ? 'application_chakan,1;':'application_chakan,0;'
                menus += this.caozuoApplication == true ? 'application_caozuo,1;':'application_caozuo,0;'
                menus += this.chakanDebit == true ? 'debit_chakan,1;':'debit_chakan,0;'
                menus += this.caozuoDebit == true ? 'debit_caozuo,1;':'debit_caozuo,0;'
                menus += this.chakanPurchase == true ? 'purchase_chakan,1;':'purchase_chakan,0;'
                menus += this.caozuoPurchase == true ? 'purchase_caozuo,1;':'purchase_caozuo,0;'
                menus += this.chakanSale == true ? 'sale_chakan,1;':'sale_chakan,0;'
                menus += this.caozuoSale == true ? 'sale_caozuo,1;':'sale_caozuo,0;'
                menus += this.chakanSalary == true ? 'salary_chakan,1;':'salary_chakan,0;'
                menus += this.caozuoSalary == true ? 'salary_caozuo,1;':'salary_caozuo,0;'
                menus += this.chakanAssets == true ? 'assets_chakan,1;':'assets_chakan,0;'
                menus += this.caozuoAssets == true ? 'assets_caozuo,1;':'assets_caozuo,0;'
                menus += this.chakanAccounting == true ? 'accounting_chakan,1;':'accounting_chakan,0;'
                menus += this.caozuoAccounting == true ? 'accounting_caozuo,1;':'accounting_caozuo,0;'
                menus += this.chakanBank == true ? 'bank_chakan,1;':'bank_chakan,0;'
                menus += this.caozuoBank == true ? 'bank_caozuo,1;':'bank_caozuo,0;'
                menus += this.chakanReport == true ? 'report_chakan,1;':'report_chakan,0;'
                menus += this.caozuoReport == true ? 'report_caozuo,1;':'report_caozuo,0;'
                menus += this.chakanPayment == true ? 'payment_chakan,1;':'payment_chakan,0;'
                menus += this.caozuoPayment == true ? 'payment_caozuo,1;':'payment_caozuo,0;'
                menus += this.chakanManage == true ? 'manage_chakan,1;':'manage_chakan,0;'
                menus += this.caozuoManage == true ? 'manage_caozuo,1':'manage_caozuo,0'

                params.append('bookUserId',this.bookUserId);
                params.append('managerFlg',this.managerFlg);
                params.append('bossFlg',this.bossFlg);
                params.append('financeFlg',this.financeFlg);
                params.append('cashierFlg',this.cashierFlg);
                params.append('hrFlg',this.hrFlg);
                params.append('purchaseFlg',this.purchaseFlg);
                params.append('saleFlg',this.saleFlg);
                params.append('departments',departmentsArr.join(';'));
                params.append('menus',menus);

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
//                            this.axios()
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
            axios(){
                let url = addUrl.addUrl('login')
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value
                        if(data.current_initial_status == 0){ //当前账套初始状态 0未初始 则跳转到初始化页面
                            let url2 = addUrl.addUrl('initialize')
                            window.location.href = url2;
                            return
                        }else{
                            this.accounts = data.accounts
                            this.bookId = data.current_book_id;
                            this.faceUri = data.faceUri ? data.faceUri : 'static/images/gongjuxiang.png';
                            let obj = {}
                            let start_ym = data.current_start_date.substring(0,7)//账套开账时间
                            let current_book_ym = String(data.current_book_ym).substring(0,6)//当前账期
                            let auth_json = data.book_user.auth_json;//判断身份列表
                            let isBossFlg = (data.book_user.boss_flg == 1)? true : false //是否是企业负责人
                            let isFinanceFlg = (data.book_user.finance_flg == 1)? true : false //是否是财务负责人
                            let isCashierFlg = (data.book_user.cashier_flg == 1)? true : false //是否是出纳
                            let menu_json = (data.book_user.menu_json == '') ? ['#loan','#bookkeeping'] : (data.book_user.menu_json).split(',');//默认配置桌面功能显示借款单，记账

                            let current_account_standard = data.current_account_standard //会计准则判定 1：小企业 2：企业
                            let current_company_scale = data.current_company_scale //当前账套纳税人性质 1 小规模纳税人 2 一般纳税人
                            let current_book_level = data.current_book_level//用户类型 0 普通用户 1：代记账会计 2：代记账管理人员
                            let user_type = data.user_type//账套等级 0 演示帐套 1 一般帐套 3 代记账帐套
                            let isAccountBookkeeping = (user_type > 0 && current_book_level == 3)? true : false//是否为代记账，true 为是代记账账套 false 为普通账套
                            let account_type = data.account_type//代记账会计身份，1为普通会计 >1会计
                            let name = data.name;

                            obj.start_ym = start_ym.split('-').join('');
                            obj.current_book_ym = current_book_ym;
                            obj.isBossFlg = isBossFlg;
                            obj.isFinanceFlg = isFinanceFlg;
                            obj.isCashierFlg = isCashierFlg;
                            obj.menuArr = menu_json;
                            obj.auth_json = auth_json;
                            obj.current_account_standard = current_account_standard;
                            obj.current_company_scale = current_company_scale;
                            obj.user_type = user_type;
                            obj.current_book_level = current_book_level;
                            obj.isAccountBookkeeping = isAccountBookkeeping
                            obj.account_type = account_type
                            obj.name = name
//                            console.log(obj);
                            this.$store.commit('add',obj);
                            this.account = current_book_ym.substring(0,4) + '年'+ current_book_ym.substring(4,6) + '月';//当前账期
                            this.userName = name
                            this.loading = false
                        }
                    })
                    .catch(error=> {
                        this.loading = false
                        console.log('没有登录信息');
                        alert('请您重新登录')
                        let url = addUrl.addUrl('logout')
                        alert(url);
                        window.location.href = url
                    });
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
            var params = new URLSearchParams();
            params.append('userId',this.debitId);
            var url = addUrl.addUrl('seeStaff');
//            console.log(this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false
                    let data = response.data.value;
                    //bookUser 部分
                    let bookUser = data.bookUser
                    this.userName = bookUser.userName
                    this.createTimeYMD = bookUser.createTimeYMD
                    this.bookUserId = bookUser.idStr
                    let managerFlg = bookUser.managerFlg //管理员标记
                    let bossFlg = bookUser.bossFlg //企业负责人标记
                    let financeFlg = bookUser.financeFlg //财务负责人标记
                    let cashierFlg = bookUser.cashierFlg //出纳标记
                    let hrFlg = bookUser.hrFlg //综合管理员标记
                    let purchaseFlg = bookUser.purchaseFlg //采购专员标记
                    let saleFlg = bookUser.saleFlg //销售专员标记

                    if(managerFlg == 1){
                        this.managerFlg = true;
                        this.isManagerFlg = true;
                    }
                    if(bossFlg == 1){
                        this.bossFlg = true;
                        this.isBossFlg = true;
                    }
                    if(financeFlg == 1){
                        this.financeFlg = true;
                        this.isFinanceFlg = true;
                    }
                    if(cashierFlg == 1){
                        this.cashierFlg = true;
                        this.isCashierFlg = true;
                    }
                    if(hrFlg == 1){
                        this.hrFlg = true;
                    }
                    if(purchaseFlg == 1){
                        this.purchaseFlg = true;
                    }
                    if(saleFlg == 1){
                        this.saleFlg = true;
                    }
                    //departmentList 部分
                    this.departmentOption = data.departmentList
                    let departmentList = data.departmentList
                    let departmentUsers = data.departmentUsers
                    for(let i in departmentList){
                        for(let j in departmentUsers){
                            if(departmentList[i].idStr == departmentUsers[j].departmentIdStr){
                                this.departments.push(departmentList[i].idString)
                                if(departmentUsers[j].userType == 1){
                                    this.departments2.push(departmentList[i].idString)
                                }
                            }
                        }
                        if(departmentList[i].departmentName == '管理本部'){
                            this.hqId = departmentList[i].idString
                        }
                    }

                    //menuList 功能列表部分
                    let authMap = bookUser.authMap
                    for(let i in authMap){
                        if(authMap[i] == '1'){
                            authMap[i] = true
                        }else {
                            authMap[i] = false
                        }
                    }

                    this.chakanApplication = authMap.application_chakan
                    this.caozuoApplication = authMap.application_caozuo
                    this.chakanDebit = authMap.debit_chakan
                    this.caozuoDebit = authMap.debit_caozuo
                    this.chakanPurchase = authMap.purchase_chakan
                    this.caozuoPurchase = authMap.purchase_caozuo
                    this.chakanSale = authMap.sale_chakan
                    this.caozuoSale = authMap.sale_caozuo
                    this.chakanSalary = authMap.salary_chakan
                    this.caozuoSalary = authMap.salary_caozuo
                    this.chakanAssets = authMap.assets_chakan
                    this.caozuoAssets = authMap.assets_caozuo
                    this.chakanAccounting = authMap.accounting_chakan
                    this.caozuoAccounting = authMap.accounting_caozuo
                    this.chakanBank = authMap.bank_chakan
                    this.caozuoBank = authMap.bank_caozuo
                    this.chakanReport = authMap.report_chakan
                    this.caozuoReport = authMap.report_caozuo
                    this.chakanPayment = authMap.payment_chakan
                    this.caozuoPayment = authMap.payment_caozuo
                    this.chakanManage = authMap.manage_chakan
                    this.caozuoManage = authMap.manage_caozuo
                })
                .catch(error=> {
                    this.loading = false;
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
    .top .sub{
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
    .left{
        display: inline-block;
        width:55%;
        float: left;
        font-size:16px;
        margin-top: 10px;
    }
    .left .list{
        width:100%;
        height: 542px;
    }
    .left .list tr td{
        border: 1px solid #ccc;
        padding: 5px 15px;
        text-align: left;
    }
    .left .list tr .hd{
        color: #2daeed;
    }
    .left .list tr td .check{
        height:28px;
        padding: 5px 10px;
    }
    .right{
        display: inline-block;
        width:45%;
        float: left;
        font-size:16px;
        margin-top: 10px;
        text-align: left;

    }
    .right .department{
        width:100%;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .right .department .departmentChange{
        width:100%;
        height:150px;
        padding: 20px 30px;
        overflow-y: auto;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .right .department .departmentChange .el-checkbox-group{
        display: block;
        width:140px;
        float: left;
    }
    .right .department .departmentChange .el-checkbox{
        margin-left: 30px;
    }
    .right .department .departmentChange .charge .el-checkbox:first-child{
        opacity: 0;
    }
    .right .fun{
        width:100%;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .right .fun .funChange{
        width:100%;
        height:300px;
        padding: 10px 30px;
        overflow-y: auto;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .right .fun .funChange ul li{
        display: block;
    }
    .right .fun .funChange ul li .tit{
        display: inline-block;
        width:80px;
    }
</style>
