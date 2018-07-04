/**
 * Created by who on 2018/7/4.
 */
function addUrl(name){
    //借款单列表
    if(name == 'loan'){
        return 'http://192.168.2.190:8080/web/vue/debit/my/list.html'
    }
    //借款单列表
    if(name == 'loanDelete'){
        return 'http://192.168.2.190:8080/web/vue/debit/item/debit/delete.html'
    }
    //新建借款单
    if(name == 'newLoan'){
        return 'http://192.168.2.190:8080/web/vue/debit/department.html'
    }
    //新建借款单提交
    if(name == 'newLoanSubmit'){
        return 'http://192.168.2.190:8080/web/vue/debit/edit/debit/submit.html'
    }
    //查看借款单
    if(name == 'seeLoan'){
        return 'http://192.168.2.190:8080/web/vue/debit/item/debit/show.html'
    }
    //查看借款单提交
    if(name == 'seeLoanSubmit'){
        return 'http://192.168.2.190:8080/web/vue/debit/edit/debit/submit.html'
    }
    //借款单审批列表
    if(name == 'loanApprovalList'){
        return 'http://192.168.2.190:8080/web/vue/debit/audit/debit/list.html'
    }
    //借款单审批
    if(name == 'loanSheetApproval'){
        return 'http://192.168.2.190:8080/web/vue/debit/item/debit/show.html'
    }
    //借款单审批同意
    if(name == 'loanSheetApprovalAgree'){
        return 'http://192.168.2.190:8080/web/vue/debit/item/debit/agree.html'
    }
    //借款单审批驳回
    if(name == 'loanSheetApprovalRefuse'){
        return 'http://192.168.2.190:8080/web/vue/debit/item/debit/refuse.html'
    }
    //借款单确认列表
    if(name == 'loanConfirmationList'){
        return 'http://192.168.2.190:8080/web/vue/payment/audit/debit/cashier/list.html'
    }
    //借款单确认
    if(name == 'loanConfirmationList'){
        return 'http://192.168.2.190:8080/web/vue/debit/item/debit/show.html'
    }

    //借款单确认确认
    if(name == 'loanConfirmationAgree'){
        return 'http://192.168.2.190:8080/web/vue/payment/item/cashier/agree.html'
    }
    //借款单确认驳回
    if(name == 'loanConfirmationRefuse'){
        return 'http://192.168.2.190:8080/web/vue/payment/item/cashier/refuse.html'
    }
    //还款单
    if(name == 'repayment'){
        return 'http://192.168.2.190:8080/web/vue/debit/credit/create.html'
    }
    //还款单提交
    if(name == 'repaymentSubmit'){
        return 'http://192.168.2.190:8080/web/vue/debit/edit/credit/submit.html'
    }
    //还款单确认
    if(name == 'repaymentConfirmation'){
        return 'http://192.168.2.190:8080/web/vue/debit/credit/show.html'
    }
    //还款单确认同意
    if(name == 'repaymentConfirmationAgree'){
        return 'http://192.168.2.190:8080/web/vue/payment/item/credit/agree.html'
    }
    //还款单确认驳回
    if(name == 'repaymentConfirmationRefuse'){
        return 'http://192.168.2.190:8080/web/vuepayment/item/credit/refuse.html'
    }
    //还款单确认列表
    if(name == 'repaymentConfirmationRefuse'){
        return 'http://192.168.2.190:8080/web/vue/payment/audit/credit/list.html'
    }

    //费用单列表
    if(name == 'costSheet'){
        return 'http://192.168.2.190:8080/web/vue/expense/list.html'
    }
    //费用单列表删除
    if(name == 'costSheetDelete'){
        return 'http://192.168.2.190:8080/web/vue/expense/delete.html'
    }
    //新建费用单
    if(name == 'newCost'){
        return 'http://192.168.2.190:8080/web/vue/accountSubject/list.html'
    }
    //新建费用单获得费用小类
    if(name == 'newCostOptionList'){
        return 'http://192.168.2.190:8080/web/vue/accountSubject/optionList.html'
    }
    //新建费用单保存
    if(name == 'newCostSave'){
        return 'http://192.168.2.190:8080/web/vue/expense/save.html'
    }
    //查看费用单
    if(name == 'seeCost'){
        return 'http://192.168.2.190:8080/web/vue/expense/edit.html'
    }
    //查看费用单获得费用小类
    if(name == 'seeCostOptionList'){
        return 'http://192.168.2.190:8080/web/vue/accountSubject/optionList.html'
    }
    //查看费用单保存
    if(name == 'seeCostSave'){
        return 'http://192.168.2.190:8080/web/vue/expense/save.html'
    }
    //报销单列表
    if(name == 'ReimbursementList'){
        return 'http://192.168.2.190:8080/web/vue/application/list.html'
    }
    //报销单列表删除
    if(name == 'ReimbursementListDelete'){
        return 'http://192.168.2.190:8080/web/vue/application/delete.html'
    }
    //查看报销单
    if(name == 'seeReimbursement'){
        return 'http://192.168.2.190:8080/web/vue/application/check.html'
    }
    //查看报销单费用列表
    if(name == 'seeReimbursementList'){
        return 'http://192.168.2.190:8080/web/vue/expense/enableReceiptList.html'
    }
    //查看报销单保存
    if(name == 'seeReimbursementSave'){
        return 'http://192.168.2.190:8080/web/vue/application/save.html'
    }
    //查看报销单提交
    if(name == 'seeReimbursementSubmit'){
        return 'http://192.168.2.190:8080/web/vue/application/submit.html'
    }
    //查看报销单驳回
    if(name == 'seeReimbursementBack'){
        return 'http://192.168.2.190:8080/web/vue/application/back.html'
    }
    //新建报销单
    if(name == 'newReimbursement'){
        return 'http://192.168.2.190:8080/web/vue/application/toAddApplication.html'
    }
    //新建报销单保存
    if(name == 'newReimbursementSave'){
        return 'http://192.168.2.190:8080/web/vue/application/save.html'
    }
    //新建报销单提交
    if(name == 'newReimbursementSubmit'){
        return 'http://192.168.2.190:8080/web/vue/application/submit.html'
    }
    //新建报销单费用列表
    if(name == 'newReimbursementList'){
        return 'http://192.168.2.190:8080/web/vue/expense/enableReceiptList.html'
    }
    //报销单审批列报表
    if(name == 'ReimbursementApprovalList'){
        return 'http://192.168.2.190:8080/web/vue/application/auditList.html'
    }
    //报销单审批
    if(name == 'ReimbursementApproval'){
        return 'http://192.168.2.190:8080/web/vue/application/check.html'
    }
    //报销单审批同意
    if(name == 'ReimbursementApprovalAgree'){
        return 'http://192.168.2.190:8080/web/vue/application/audit/agree.html'
    }
    //报销单审批驳回
    if(name == 'ReimbursementApprovalRefuse'){
        return 'http://192.168.2.190:8080/web/vue/application/audit/refuse.html'
    }
    //报销单确认列表
    if(name == 'ReimbursementConfirmationList'){
        return 'http://192.168.2.190:8080/web/vue/payment/application/cashierAudit/list.html'
    }
    //报销单确认
    if(name == 'ReimbursementConfirmation'){
        return 'http://192.168.2.190:8080/web/vue/application/cashier/check.html'
    }

    //报销单确认同意
    if(name == 'ReimbursementConfirmationConfirmAppliction'){
        return 'http://192.168.2.190:8080/web/vue/payment/application/audit/confirmAppliction.html'
    }
    //报销单确认驳回
    if(name == 'ReimbursementConfirmationRefuse'){
        return 'http://192.168.2.190:8080/web/vue/payment/application/audit/refuse.html'
    }
    //采购单列表
    if(name == 'PurchaseList'){
        return 'http://192.168.2.190:8080/web/vue/purchase/list.html'
    }
    //采购单列表删除
    if(name == 'PurchaseListDelete'){
        return 'http://192.168.2.190:8080/web/vue/purchase/delete.html'
    }
    //新建采购单
    if(name == 'newPurchase'){
        return 'http://192.168.2.190:8080/web/vue/purchase/add.html'
    }
    //新建采购单保存
    if(name == 'newPurchaseSave'){
        return 'http://192.168.2.190:8080/web/vue/purchase/save.html'
    }
    //新建采购单提交
    if(name == 'newPurchaseSubmit'){
        return 'http://192.168.2.190:8080/web/vue/purchase/submit.html'
    }
    //查看采购单
    if(name == 'seePurchase'){
        return 'http://192.168.2.190:8080/web/vue/purchase/detail.html'
    }
    //查看采购单保存
    if(name == 'seePurchaseSave'){
        return 'http://192.168.2.190:8080/web/vue/purchase/save.html'
    }
    //查看采购单提交
    if(name == 'seePurchaseSubmit'){
        return 'http://192.168.2.190:8080/web/vue/purchase/submit.html'
    }

    //新建采购付款单
    if(name == 'newPurchasePayment'){
        return 'http://192.168.2.190:8080/web/vue/purchase/send/show.html'
    }

}
export default{
    addUrl
}
