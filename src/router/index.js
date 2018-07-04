import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/components/page/homePage'
//借款单：
import loan from '@/components/page/loan/loan'//借款单列表
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
import costSheet from '@/components/page/Reimbursement/costSheet'//费用单列表
import newCost from '@/components/page/Reimbursement/newCost'//新建费用单
import seeCost from '@/components/page/Reimbursement/seeCost'//查看费用单
import ReimbursementList from '@/components/page/Reimbursement/ReimbursementList'//报销单列表
import seeReimbursement from '@/components/page/Reimbursement/seeReimbursement'//查看报销单
import newReimbursement from '@/components/page/Reimbursement/newReimbursement'//新建报销单
import ReimbursementApprovalList from '@/components/page/Reimbursement/ReimbursementApprovalList'//报销单审批列报表
import ReimbursementApproval from '@/components/page/Reimbursement/ReimbursementApproval'//报销单审批
import ReimbursementConfirmationList from '@/components/page/Reimbursement/ReimbursementConfirmationList'//报销单确认列表
import ReimbursementConfirmation from '@/components/page/Reimbursement/ReimbursementConfirmation'//报销单确认
//采购
import PurchaseList from '@/components/page/Purchase/PurchaseList'//采购单列表
import newPurchase from '@/components/page/Purchase/newPurchase'//新建采购单
import seePurchase from '@/components/page/Purchase/seePurchase'//查看采购单
import newPurchasePayment from '@/components/page/Purchase/newPurchasePayment'//新建采购付款单

import approvalPurchaseList from '@/components/page/Purchase/approvalPurchaseList'//采购单审批列表
import approvalPurchase from '@/components/page/Purchase/approvalPurchase'//采购单审批


import SupplierList from '@/components/page/Purchase/SupplierList'//交易方列表
import newSupplier from '@/components/page/Purchase/newSupplier'//新建交易方
import seeSupplier from '@/components/page/Purchase/seeSupplier'//交易方详情

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
            path:'/Reimbursement/costSheet',
            name:'costSheet',
            component:costSheet
        },
        {
            path:'/Reimbursement/newCost',
            name:'newCost',
            component:newCost
        },
        {
            path:'/Reimbursement/ReimbursementList',
            name:'ReimbursementList',
            component:ReimbursementList
        },
        {
            path:'/Reimbursement/seeCost',
            name:'seeCost',
            component:seeCost
        },
        {
            path:'/Reimbursement/seeReimbursement',
            name:'seeReimbursement',
            component:seeReimbursement
        },
        {
            path:'/Reimbursement/newReimbursement',
            name:'newReimbursement',
            component:newReimbursement
        },
        {
            path:'/Reimbursement/ReimbursementApprovalList',
            name:'ReimbursementApprovalList',
            component:ReimbursementApprovalList
        },
        {
            path:'/Reimbursement/ReimbursementApproval',
            name:'ReimbursementApproval',
            component:ReimbursementApproval
        },
        {
            path:'/Reimbursement/ReimbursementConfirmation',
            name:'ReimbursementConfirmation',
            component:ReimbursementConfirmation
        },
        {
            path:'/Reimbursement/ReimbursementConfirmationList',
            name:'ReimbursementConfirmationList',
            component:ReimbursementConfirmationList
        },

        {
            path:'/Purchase/PurchaseList',
            name:'PurchaseList',
            component:PurchaseList
        },
        {
            path:'/Purchase/newPurchase',
            name:'newPurchase',
            component:newPurchase
        },
        {
            path:'/Purchase/seePurchase',
            name:'seePurchase',
            component:seePurchase
        },
        {
            path:'/Purchase/newPurchasePayment',
            name:'newPurchasePayment',
            component:newPurchasePayment
        },
        {
            path:'/Purchase/approvalPurchaseList',
            name:'approvalPurchaseList',
            component:approvalPurchaseList
        },
        {
            path:'/Purchase/approvalPurchase',
            name:'approvalPurchase',
            component:approvalPurchase
        },
        {
            path:'/Purchase/SupplierList',
            name:'SupplierList',
            component:SupplierList
        },
        {
            path:'/Purchase/newSupplier',
            name:'newSupplier',
            component:newSupplier
        },
        {
            path:'/Purchase/seeSupplier',
            name:'seeSupplier',
            component:seeSupplier
        },
        {
            path:'/Payroll/payroll',
            name:'payroll',
            component:payroll
        }
    ]
})
