<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf" v-loading="loading2"
             element-loading-text="月结中，请不要离开页面"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="top">
                <h2>结转</h2>
                <router-link to="/" class="back">返回</router-link>
                <el-button @click="model(0)" size="small" type="primary" class="sub" :loading="isLoading">月结</el-button>
                <el-button v-if="isMonthlyKnots && !isAnnualKnots" @click="model(1)" size="small" type="primary" class="sub2" :loading="isLoading">年结</el-button>
                <h3 class="currentYM">当前账期：{{currentYM}}</h3>
            </div>
            <div class="w">
                <div class="content cf">
                    <ul class="list">
                        <li>
                            <span class="name">{{month}}月固定资产折旧</span>
                            <span v-if='process_1_1 == 0' class="result">未处理</span>
                            <transition name="text-fade1">
                                <span v-if='process_1_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月无形资产折旧</span>
                            <span v-if='process_1_2 == 0' class="result">未处理</span>
                            <transition name="text-fade2">
                                <span v-if='process_1_2 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_2 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月工资计提</span>
                            <span v-if='process_1_3 == 0' class="result">未处理</span>
                            <transition name="text-fade3">
                                <span v-if='process_1_3 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_3 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月附加税计提</span>
                            <span v-if='process_1_4_0 == 0' class="result">未处理</span>
                            <transition name="text-fade4">
                                <span v-if='process_1_4_0 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_4_0 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月企业所得税计提</span>
                            <span v-if='process_1_4_1 == 0' class="result">未处理</span>
                            <transition name="text-fade5">
                                <span v-if='process_1_4_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_4_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月税结转</span>
                            <span v-if='process_1_5 == 0' class="result">未处理</span>
                            <transition name="text-fade6">
                                <span v-if='process_1_5 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_5 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month - 1}}月工资发放</span>
                            <span v-if='process_1_6 == 0' class="result">未处理</span>
                            <transition name="text-fade7">
                                <span v-if='process_1_6 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_6 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月税费缴纳</span>
                            <span v-if='process_1_7 == 0' class="result">未处理</span>
                            <transition name="text-fade8">
                                <span v-if='process_1_7 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_7 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月期末结转</span>
                            <span v-if='process_2_1 == 0' class="result">未处理</span>
                            <transition name="text-fade9">
                                <span v-if='process_2_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_2_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">账期变更（{{month}}月-->{{nextMonth}}月）</span>
                            <span v-if='process_2_2 == 0' class="result">未处理</span>
                            <transition name="text-fade10">
                                <span v-if='process_2_2 == 1' class="result2">成功</span>
                                <span v-else-if='process_2_2 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{nextMonth}}月固定资产折旧</span>
                            <span v-if='process_3_1 == 0' class="result">未处理</span>
                            <transition name="text-fade11">
                                <span v-if='process_3_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_3_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{nextMonth}}月无形资产折旧</span>
                            <span v-if='process_3_2 == 0' class="result">未处理</span>
                            <transition name="text-fade12">
                                <span v-if='process_3_2 == 1' class="result2">成功</span>
                                <span v-else-if='process_3_2 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{nextMonth}}月工资单生成</span>
                            <span v-if='process_3_3 == 0' class="result">未处理</span>
                            <transition name="text-fade13">
                                <span v-if='process_3_3 == 1' class="result2">成功</span>
                                <span v-else-if='process_3_3 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                    </ul>
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
                currentYM:0,//当前账期
                month:0,//当前月份
                nextMonth:0,//下个月份
                process_1_1:0,//固定资产折旧
                process_1_2:0,//无形资产折旧
                process_1_3:0,//工资计提
                process_1_4_0:0,//附加税计提
                process_1_4_1:0,//企业所得税计提
                process_1_5:0,//税结转
                process_1_6:0,//工资发放
                process_1_7:0,//税费缴纳
                process_2_1:0,//期末结转
                process_2_2:0,//账期变更
                process_3_1:0,//固定资产折旧
                process_3_2:0,//无形资产折旧
                process_3_3:0,//工资单生成
                loading:false,
                loading2:false,
                isLoading:false,
            }
        },
        methods: {
            model(n){
                this.isLoading = true
                let msg = n == 0 ? '您确定要对当前账期进行月结?' :
                    '年结后，上一年度账将封存，不能再进行操作，您是否确认年结？'
                this.$confirm(msg, '提示', {
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
                    if(n){
                        this.annualKnots()
                    }else{
                        this.axios()
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                    this.isLoading = false
                });
            },
            annualKnots(){
                this.loading = true
                let url = addUrl.addUrl('annualKnots');
                axios.post(url)
                    .then(response=> {
                        let msg = response.data.value.msg
                        let result = response.data.value.result
                        if(result == 1){
                            this.$message.success(msg)
                            this.login()
                            this.isLoading = false
                        }else{
                            this.$message.error(msg)
                            this.loading = false
                            this.isLoading = false
                        }
                    })
                    .catch((error)=>{
                        this.$message.error('系统繁忙，请重试')
                        this.loading = false
                        this.isLoading = false
                    })
            },
            axios(){
                this.loading = true
                let url = addUrl.addUrl('monthlyKnot');
                axios.post(url)
                    .then(response=> {
//                    console.log(response);
                        let data = response.data
                        let status = data.status
                        let msg = data.msg
                        let obj = {};
                        let _this = this;
                        this.loading2 = true;
                        if(status == 200){
                            let nextYearMonth = String(data.value.nextYearMonth)
                            this.loading = false
                            this.process_1_1 = data.value.process_1_1
                            this.process_1_2 = data.value.process_1_2
                            this.process_1_3 = data.value.process_1_3
                            this.process_1_4_0 = data.value.process_1_4_0
                            this.process_1_4_1 = data.value.process_1_4_1
                            this.process_1_5 = data.value.process_1_5
                            this.process_1_6 = data.value.process_1_6
                            this.process_1_7 = data.value.process_1_7
                            this.process_2_1 = data.value.process_2_1
                            this.process_2_2 = data.value.process_2_2
                            this.process_3_1 = data.value.process_3_1
                            this.process_3_2 = data.value.process_3_2
                            this.process_3_3 = data.value.process_3_3
                            setTimeout(function(){
                                if(data.value.process_2_2 == 1){
                                    _this.$message.success('月结成功，当前账期已转入下月')
                                    _this.login()
                                    _this.currentYM = nextYearMonth.substring(0,4) + '年' + nextYearMonth.substring(4,6) + '月'
                                    if(nextYearMonth.substring(4,5) == 0){
                                        _this.month = Number(nextYearMonth.substring(5,6))
                                        _this.nextMonth = _this.month + 1
                                    }else{
                                        _this.month = Number(nextYearMonth.substring(4,6))
                                        if(_this.month == 12){
                                            _this.nextMonth = '次年1'
                                        }else{
                                            _this.nextMonth = _this.month + 1
                                        }
                                    }
                                    _this.process_1_1 = 0
                                    _this.process_1_2 = 0
                                    _this.process_1_3 = 0
                                    _this.process_1_4_0 = 0
                                    _this.process_1_4_1 = 0
                                    _this.process_1_5 = 0
                                    _this.process_1_6 = 0
                                    _this.process_1_7 = 0
                                    _this.process_2_1 = 0
                                    _this.process_2_2 = 0
                                    _this.process_3_1 = 0
                                    _this.process_3_2 = 0
                                    _this.process_3_3 = 0
                                    obj.current_book_ym = nextYearMonth
                                    _this.$store.commit('add',obj)
                                    _this.loading2 = false;
                                    _this.isLoading = false;
                                }else{
                                    _this.$message.error('月结失败，请重试')
                                    _this.loading2 = false;
                                    _this.isLoading = false;
                                }
                            },5000)
                        }else if(status == 400){
                            this.loading = false;
                            this.loading2 = false;
                            this.isLoading = false
                            this.$message.error(msg)
                        }

                    })
                    .catch(()=>{
                        this.$message.error('系统繁忙，请重试')
                        this.loading = false
                        this.loading2 = false;
                        this.isLoading = false;
                    })
            },
            login(){
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
                            let accounter_flg = data.book_user.accounter_flg;//是否是会计
                            let stock_flg = data.book_user.stock_flg;//是否是股东
                            let menu_json = (data.book_user.menu_json == '') ? ['#loan','#bookkeeping'] : (data.book_user.menu_json).split(',');//默认配置桌面功能显示借款单，记账

                            let current_account_standard = data.current_account_standard //会计准则判定 1：小企业 2：企业
                            let current_company_scale = data.current_company_scale //当前账套纳税人性质 1 小规模纳税人 2 一般纳税人
                            let current_book_level = data.current_book_level//用户类型 0 普通用户 1：代记账会计 2：代记账管理人员
                            let user_type = data.user_type//账套等级 0 演示帐套 1 一般帐套 3 代记账帐套
                            let isAccountBookkeeping = (user_type > 0 && current_book_level == 3)? true : false//是否为代记账，true 为是代记账账套 false 为普通账套
                            let account_type = data.account_type//代记账会计身份，1为普通会计 >1会计
                            let name = data.name;
                            let isMonthlyKnots = data.carry_prev_month12_flg ? true : false;
                            let isAnnualKnots = data.carry_prev_year_flg ? true : false;

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
                            obj.isMonthlyKnots = isMonthlyKnots
                            obj.isAnnualKnots = isAnnualKnots
                            obj.accounter_flg = accounter_flg
                            obj.stock_flg = stock_flg
                            this.$store.commit('add',obj);
                            this.$router.push('/');
                        }
                    })
                    .catch(error=> {
                        this.loading = false
                        let url = addUrl.addUrl('logout')
                        window.location.href = url
                    });
            },
        },
        computed:mapState(['current_book_ym','isMonthlyKnots','isAnnualKnots']),
        created(){
            this.currentYM = this.current_book_ym.substring(0,4) + '年' + this.current_book_ym.substring(4,6) + '月'
            if(this.current_book_ym.substring(4,5) == 0){
                this.month = Number(this.current_book_ym.substring(5,6))
                this.nextMonth = this.month + 1
            }else{
                this.month = Number(this.current_book_ym.substring(4,6))
                if(this.month == 12){
                    this.nextMonth = '次年1'
                }else{
                    this.nextMonth = this.month + 1
                }
            }
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
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .back{
        display: inline-block;
        width:56px;
        height:30px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        text-decoration: none;
        color: #333;
        position: absolute;
        right: 20px;
    }
    .top .sub{
        position: absolute;
        right: 100px;
    }
    .top .sub2{
        position: absolute;
        right: 180px;
    }
    .currentYM{
        position: absolute;
        top:10px;
        left: 50px;
        font-size:16px;
    }

    .list{
        width:80%;
        margin: 20px auto;
    }
    .list li{
        border: 1px solid #333;
        border-bottom: none;
        padding: 5px 100px;
        font-size:14px;
        color: #333;
        height:30px;
        overflow: hidden;
    }
    .list li:last-child{
        border: 1px solid #333;
    }
    .list li .name{
        display: inline-block;
        width:80%;
    }
    .list li .result{
        display: inline-block;
        width:18%;
        text-align: right;
        color: #666;
    }
    .list li .result2{
        display: inline-block;
        width:18%;
        text-align: right;
        color: #67c23a;
    }
    .list li .result3{
        display: inline-block;
        width:18%;
        text-align: right;
        color: #f56c6c;
    }
    .text-fade1-enter-active{
        transition:all .5s ease;
    }
    .text-fade1-leave-active{
        opacity: 0;
    }
    .text-fade1-enter,.text-fade1-leave-to{
        opacity: 0;
    }

    .text-fade2-enter-active{
        transition:all 1s ease;
    }
    .text-fade2-leave-active{
        opacity: 0;
    }
    .text-fade2-enter,.text-fade2-leave-to{
        opacity: 0;
    }

    .text-fade3-enter-active{
        transition:all 1.5s ease;
    }
    .text-fade3-leave-active{
        opacity: 0;
    }
    .text-fade3-enter,.text-fade3-leave-to{
        opacity: 0;
    }

    .text-fade4-enter-active{
        transition:all 2s ease;
    }
    .text-fade4-leave-active{
        opacity: 0;
    }
    .text-fade4-enter,.text-fade4-leave-to{
        opacity: 0;
    }
    .text-fade5-enter-active{
        transition:all 2.5s ease;
    }
    .text-fade5-leave-active{
        opacity: 0;
    }
    .text-fade5-enter,.text-fade5-leave-to{
        opacity: 0;
    }
    .text-fade6-enter-active{
        transition:all 3s ease;
    }
    .text-fade6-leave-active{
        opacity: 0;
    }
    .text-fade6-enter,.text-fade6-leave-to{
        opacity: 0;
    }
    .text-fade7-enter-active{
        transition:all 3.5s ease;
    }
    .text-fade7-leave-active{
        opacity: 0;
    }
    .text-fade7-enter,.text-fade7-leave-to{
        opacity: 0;
    }
    .text-fade8-enter-active{
        transition:all 4s ease;
    }
    .text-fade8-leave-active{
        opacity: 0;
    }
    .text-fade8-enter,.text-fade8-leave-to{
        opacity: 0;
    }
    .text-fade9-enter-active{
        transition:all 4.5s ease;
    }
    .text-fade9-leave-active{
        opacity: 0;
    }
    .text-fade9-enter,.text-fade9-leave-to{
        opacity: 0;
    }
    .text-fade10-enter-active{
        transition:all 5s ease;
    }
    .text-fade10-leave-active{
        opacity: 0;
    }
    .text-fade10-enter,.text-fade10-leave-to{
        opacity: 0;
    }
    .text-fade11-enter-active{
        transition:all 5.5s ease;
    }
    .text-fade11-leave-active{
        opacity: 0;
    }
    .text-fade11-enter,.text-fade11-leave-to{
        opacity: 0;
    }
    .text-fade12-enter-active{
        transition:all 6s ease;
    }
    .text-fade12-leave-active{
        opacity: 0;
    }
    .text-fade12-enter,.text-fade12-leave-to{
        opacity: 0;
    }
    .text-fade13-enter-active{
        transition:all 6.5s ease;
    }
    .text-fade13-leave-active{
        opacity: 0;
    }
    .text-fade13-enter,.text-fade13-leave-to{
        opacity: 0;
    }


</style>
