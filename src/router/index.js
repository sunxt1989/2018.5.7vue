import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/page/homePage'
import loan from '@/components/page/loan'
import newLoan from '@/components/page/newLoan'
import seeLoan from '@/components/page/seeLoan'
import repayment from '@/components/page/repayment'

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
        },
        {
            path:'/loan/newLoan',
            name:'newLoan',
            component:newLoan
        },
        {
            path:'/loan/seeLoan/',
            name:'seeLoan',
            component:seeLoan
        },
        {
            path:'/loan/repayment',
            name:'repayment',
            component:repayment
        }
    ]
})
