import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/page/homePage'
import loan from '@/components/page/loan/loan'
import newLoan from '@/components/page/loan/newLoan'
import seeLoan from '@/components/page/loan/seeLoan'
import repayment from '@/components/page/loan/repayment'
import loanSheetApproval from '@/components/page/loan/loanSheetApproval'
import loanConfirmation from '@/components/page/loan/loanConfirmation'
import repaymentConfirmation from '@/components/page/loan/repaymentConfirmation'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            name:'homePage',
            component:homePage
        },
        {
            path:'/loan/loan',
            name:'loan',
            component:loan
        },
        {
            path:'/loan/newLoan',
            name:'newLoan',
            component:newLoan
        },
        {
            path:'/loan/seeLoan',
            name:'seeLoan',
            component:seeLoan
        },
        {
            path:'/loan/repayment',
            name:'repayment',
            component:repayment
        },
        {
            path:'/loan/loanSheetApproval',
            name:'loanSheetApproval',
            component:loanSheetApproval
        },
        {
            path:'/loan/repaymentConfirmation',
            name:'repaymentConfirmation',
            component:repaymentConfirmation
        },
        {
            path:'/loan/loanConfirmation',
            name:'loanConfirmation',
            component:loanConfirmation
        }
    ]
})
