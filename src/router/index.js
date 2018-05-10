import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/page/homePage'
import loan from '@/components/page/loan'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            name:'homePage',
            component:homePage
        },
        {
            path:'/loan',
            name:'loan',
            component:loan
        }

    ]
})
