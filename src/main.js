// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import 'url-search-params-polyfill';//解决兼容URLSearchParams 问题
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VCalendar, {

});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,//挂载vuex
    components: {App},
    template: '<App/>',
})

