import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const state ={
    start_ym:'',//账套开账时间
    current_book_ym:'',//当前账期
    isBossFlg:'',//是否是企业负责人
    isFinanceFlg:'',//是否是财务负责人
    isCashierFlg:'',//是否是出纳
    menuArr:[],//账套菜单
    auth_json:[],//功能权限
    current_account_standard:'',//会计准则判定 1：小企业 2：企业
    current_company_scale:'',//当前账套纳税人性质 1 小规模纳税人 2 一般纳税人
    user_type:'',//用户类型 0 普通用户 1：代记账会计 2：代记账管理人员
    current_book_level:'',//账套等级 0 演示帐套 1 一般帐套 3 代记账帐套
    isAccountBookkeeping:'',//是否为代记账，true 为是代记账账套 false 为普通账套
    account_type:'',//代记账会计身份，1为普通会计 >1会计
    owner_flg:'',//代记账会计以外所有人，1为是 0为否
    accounter_flg:'',//是否是会计，1为是 0为否
    stock_flg:'',//是否是股东，1为是 0为否
    name:'',//用户名称
    isMonthlyKnots:false,//是否12月月结
    isAnnualKnots:false,//是否去年年结
}
const mutations={
    add(state,obj){
        state.start_ym = obj.start_ym ? obj.start_ym : state.start_ym
        state.current_book_ym = obj.current_book_ym ? obj.current_book_ym : state.current_book_ym;
        state.isBossFlg = obj.isBossFlg ? obj.isBossFlg : state.isBossFlg;
        state.isFinanceFlg = obj.isFinanceFlg ? obj.isFinanceFlg : state.isFinanceFlg;
        state.isCashierFlg = obj.isCashierFlg ? obj.isCashierFlg : state.isCashierFlg;
        state.menuArr = obj.menuArr ? obj.menuArr : state.menuArr;
        state.auth_json = obj.auth_json ? obj.auth_json : state.auth_json;
        state.current_account_standard = obj.current_account_standard ? obj.current_account_standard : state.current_account_standard;
        state.current_company_scale = obj.current_company_scale ? obj.current_company_scale : state.current_company_scale;
        state.user_type = obj.user_type ? obj.user_type : state.user_type;
        state.current_book_level = obj.current_book_level ? obj.current_book_level : state.current_book_level;
        state.isAccountBookkeeping = obj.isAccountBookkeeping ? obj.isAccountBookkeeping : state.isAccountBookkeeping;
        state.account_type = obj.account_type ? obj.account_type : state.account_type;
        state.name = obj.name ? obj.name : state.name;
        state.isMonthlyKnots = obj.isMonthlyKnots ? obj.isMonthlyKnots : state.isMonthlyKnots;
        state.isAnnualKnots = obj.isAnnualKnots ? obj.isAnnualKnots : state.isAnnualKnots;
        state.owner_flg = obj.owner_flg ? obj.owner_flg : state.owner_flg;
        state.accounter_flg = obj.accounter_flg ? obj.accounter_flg : state.accounter_flg;
        state.stock_flg = obj.stock_flg ? obj.stock_flg : state.stock_flg;
    },
}

export default new Vuex.Store({
    state,mutations
})
