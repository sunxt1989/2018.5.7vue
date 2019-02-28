<template>
    <el-header v-loading.fullscreen.lock="loading" height="40px">
        <div class="w">
            <div class="companyName dropdown">
                <el-select v-model="bookId" class="companySel" @change="changeBookId">
                    <el-option
                        v-for="item in accounts"
                        :key="item.value"
                        :label="item.book_name"
                        :value="item.book_id">
                    </el-option>
                </el-select>
            </div>
            <div class="account" @keyup.enter="sub">
                当前账期：{{account}}
            </div>
            <div class="userName dropdown">
                <el-dropdown  @command="handleCommand">
                    <div>
                        <img class="headPortrait img-circle" :src=faceUri alt="" >
                        <i class="icon iconfont icon-fanhui4"></i>
                        <span class="dropdown-toggle" v-if="userName">{{userName}}</span>
                        <span class="dropdown-toggle" v-else>用户名称</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">个人信息</el-dropdown-item>
                        <el-dropdown-item command="2">账套管理</el-dropdown-item>
                        <el-dropdown-item command="3">修改密码</el-dropdown-item>
                        <el-dropdown-item command="4">安全退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../static/js/addUrl'
    import { mapState,mapMutations } from 'vuex';
    export default {
        data(){
            return{
                bookId:'',//当前账套
                accounts:[],//账套列表
                account:'2018年9月',//当前账期
                userName:'',//用户名称
                faceUri:'',//用户头像
                password:'',//修改密码路径
                loading:false
            }
        },
        watch:{
            current_book_ym:function(val){
                this.account = String(val).substring(0,4) + '年'+ String(val).substring(4,6) + '月';//当前账期
            },
            name:function(val){
                this.userName = val
            }
        },
        methods: {
            //安全退出
            handleCommand(command) {
                if(command == '1'){
                    this.$router.push('/AccountManagement/personal')
                }else if(command == '2'){
                    this.$router.push('/AccountManagement/AccountManagement')
                }else if(command == '3'){
                    this.$router.push('/AccountManagement/changePassword')
                } else if(command == '4'){
                    this.$confirm('确定是否安全退出？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let url = addUrl.addUrl('logout')
                        window.location.href = url
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            //切换账套
            changeBookId(){
                this.loading = true
                let params = new URLSearchParams();
                let url = addUrl.addUrl('change');
                params.append('bookId',this.bookId)
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        this.axios(1);
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            axios(n){
                let url = addUrl.addUrl('login')
//                let url = 'http://192.168.2.190:8881/web/vue/user/get/info/all.html'
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value;
                        if(data.current_initial_status == 0){ //当前账套初始状态 0未初始 则跳转到初始化页面
                            let url2 = addUrl.addUrl('initialize')
                            window.location.href = url2;
                            return
                        }else{
                            this.accounts = data.accounts
                            this.bookId = data.current_book_id;
                            this.faceUri = data.faceUri ? data.faceUri : 'static/images/gongjuxiang.png';
                            let obj = {}
//                            console.log(data);
                            let start_ym = data.current_start_date.substring(0,7)//账套开账时间
                            let current_book_ym = String(data.current_book_ym).substring(0,6)//当前账期
                            let auth_json = data.book_user.auth_json;//判断身份列表
                            let owner_flg = data.book_user.owner_flg;//代记账会计以外所有人
                            let accounter_flg = data.book_user.accounter_flg;//是否是会计
                            let stock_flg = data.book_user.stock_flg;//是否是股东
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
                            obj.owner_flg = owner_flg
                            obj.accounter_flg = accounter_flg
                            obj.stock_flg = stock_flg
//                            console.log(obj);
                            this.$store.commit('add',obj);
                            this.account = current_book_ym.substring(0,4) + '年'+ current_book_ym.substring(4,6) + '月';//当前账期
                            this.userName = name
                            if(n == 1){
                                window.location.reload()
                            }else{
                                this.loading = false
                                this.$router.push('/')
                            }
                        }
                    })
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false
                        alert('请您重新登录')
                        let url = addUrl.addUrl('logout')
//                        alert(url);
                        window.location.href = url
                    });
            },
        },
        computed:{
            ...mapState(["current_book_ym","name"]),
        },
        created(){
            this.password = addUrl.addUrl('password');
            this.axios();
        },

    }
</script>

<style>
    .el-header{
        height:40px;
        background-color: #1a96d4;
        line-height: 40px;
    }
    .companyName{
        width:300px;
        height:40px;
        line-height: 40px;
        display: inline-block;
        position: relative;
        font-size:18px;
        margin-right:50px ;
        float: left;
    }
    .account{
        width:200px;
        height:40px;
        line-height: 40px;
        display: inline-block;
        font-size:16px;
        color: #fff;
        float: left;
    }
    .dropdown-toggle{
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .companyName .dropdown-toggle{
        display: inline-block;
        max-width:270px;
        text-decoration: none;
        float: left;
    }
    .companySel{
        width:300px;
        background-color: #1a96d4;
        color: #fff;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
    }
    .companySel .el-input--suffix{
        height: 40px;
    }
    .companySel .el-input--suffix .el-input__inner{
        background-color: #1a96d4;
        color: #fff;
        border: none;
        height: 40px;
    }
    .iconfont{
        color: #fff;
        margin-left: 10px;
        cursor: pointer;
    }
    .userName{
        width:300px;
        height:40px;
        line-height: 40px;
        display: inline-block;
        float: right;
        font-size:18px;
        text-align: right;
        position: relative;
    }
    .userName .dropdown-toggle{
        display: inline-block;
        max-width:200px;
        text-decoration: none;
        float: right;
    }
    .userName .iconfont{
        float: right;
    }
    .userName .headPortrait{
        width:25px;
        vertical-align: sub;
        margin-right: 10px;
        cursor: pointer;
    }
    .black {
        color: #ccc;
    }
    .red {
        color: #fe614d;
    }
    .blue {
        color: #8ad9d9;
    }
    .link{
        color: #333;
        text-decoration: none;
    }
</style>
