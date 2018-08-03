import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state ={
    start_ym:'',//账套开账时间
    current_book_ym:'',//当前账期
}
const mutations={
    add(state,obj){
        state.start_ym = obj.start_ym;
        state.current_book_ym = obj.current_book_ym;
    },
    accountChange(state,ym){
        state.current_book_ym = ym
    }
}

export default new Vuex.Store({
    state,mutations
})
