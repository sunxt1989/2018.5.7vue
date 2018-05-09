import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/homePage'
import Count from '@/components/count'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'homePage',
            component: homePage,
        },{
            path:'/count',
            component:Count,
        }
    ]
})
