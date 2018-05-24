import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/page/homePage'
//借款单：
import loan from '@/components/page/loan/loan'//借款单
import newLoan from '@/components/page/loan/newLoan'//新建借款单
import seeLoan from '@/components/page/loan/seeLoan'//查看借款单
import repayment from '@/components/page/loan/repayment'//还款单
import loanApprovalList from '@/components/page/loan/loanApprovalList'//借款单审批列表
import loanSheetApproval from '@/components/page/loan/loanSheetApproval'//借款单审批
import loanConfirmationList from '@/components/page/loan/loanConfirmationList'//借款单确认列表
import loanConfirmation from '@/components/page/loan/loanConfirmation'//借款单确认
import repaymentConfirmationList from '@/components/page/loan/repaymentConfirmationList'//还款单确认列表
import repaymentConfirmation from '@/components/page/loan/repaymentConfirmation'//还款单确认
//工资单
import payroll from '@/components/page/Payroll/payroll'
//报销
import reimbursement from '@/components/page/Reimbursement/reimbursement'

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
            path:'/loan/seeLoan/',
            name:'seeLoan',
            component:seeLoan
        },
        {
            path:'/loan/repayment',
            name:'repayment',
            component:repayment
        },
        {
            path:'/loan/loanApprovalList',
            name:'loanApprovalList',
            component:loanApprovalList
        },
        {
            path:'/loan/loanSheetApproval',
            name:'loanSheetApproval',
            component:loanSheetApproval
        },
        {
            path:'/loan/loanConfirmationList',
            name:'loanConfirmationList',
            component:loanConfirmationList
        },
        {
            path:'/loan/loanConfirmation',
            name:'loanConfirmation',
            component:loanConfirmation
        },
        {
            path:'/loan/repaymentConfirmationList',
            name:'repaymentConfirmationList',
            component:repaymentConfirmationList
        },
        {
            path:'/loan/repaymentConfirmation',
            name:'repaymentConfirmation',
            component:repaymentConfirmation
        },
        {
            path:'/Reimbursement/reimbursement',
            name:'reimbursement',
            component:reimbursement
        },
        {
            path:'/Payroll/payroll',
            name:'payroll',
            component:payroll
        }
    ]
})
