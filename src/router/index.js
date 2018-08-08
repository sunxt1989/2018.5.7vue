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
import seePurchasePayment from '@/components/page/Purchase/seePurchasePayment'//采购付款单查看
import approvalPurchaseList from '@/components/page/Purchase/approvalPurchaseList'//采购单审批列表
import approvalPurchase from '@/components/page/Purchase/approvalPurchase'//采购单审批
import approvalPurchasePayList from '@/components/page/Purchase/approvalPurchasePayList'//采购单付款审批列表
import approvalPurchasePay from '@/components/page/Purchase/approvalPurchasePay'//采购单付款审批
import approvalPurchaseConfirmList from '@/components/page/Purchase/approvalPurchaseConfirmList'//采购单付款确认列表
import approvalPurchaseConfirm from '@/components/page/Purchase/approvalPurchaseConfirm'//采购单付款确认
//销售
import saleList from '@/components/page/Sale/saleList'//销售单列表
import newSale from '@/components/page/Sale/newSale'//新建销售单
import seeSale from '@/components/page/Sale/seeSale'//查看销售单
import approvalSaleList from '@/components/page/Sale/approvalSaleList'//销售单审批列表
import approvalSale from '@/components/page/Sale/approvalSale'//销售单审批
import newSalePayment from '@/components/page/Sale/newSalePayment'//新建销售付款单
import seeSalePayment from '@/components/page/Sale/seeSalePayment'//销售收款单查看
import approvalSalePayList from '@/components/page/Sale/approvalSalePayList'//销售单收款审批列表
import approvalSalePay from '@/components/page/Sale/approvalSalePay'//销售单收款审批
import approvalSaleConfirmList from '@/components/page/Sale/approvalSaleConfirmList'//销售单收款确认列表
import approvalSaleConfirm from '@/components/page/Sale/approvalSaleConfirm'//销售单收款确认
//交易方
import SupplierList from '@/components/page/Purchase/SupplierList'//交易方列表
import newSupplier from '@/components/page/Purchase/newSupplier'//新建交易方
import seeSupplier from '@/components/page/Purchase/seeSupplier'//交易方详情
//资产
import fixedAssetsList from '@/components/page/Assets/fixedAssetsList'//固定资产列表
import fixedAssets from '@/components/page/Assets/fixedAssets'//固定资产详情
import intangibleAssetsList from '@/components/page/Assets/intangibleAssetsList'//无形资产列表
import intangibleAssets from '@/components/page/Assets/intangibleAssets'//无形资产详情
//项目
import projectList from '@/components/page/project/projectList'//项目列表
import newProject from '@/components/page/project/newProject'//新建项目
import seeProject from '@/components/page/project/seeProject'//查看项目
//银行业务
import bankList from '@/components/page/bank/bankList'//银行账户列表
import newBank from '@/components/page/bank/newBank'//新建银行账户
import seeBank from '@/components/page/bank/seeBank'//查看银行账户
import bankMoneyList from '@/components/page/bank/bankMoneyList'//银行现金业务
import bankMoneyList2 from '@/components/page/bank/bankMoneyList2'//银行现金业务列表
import newBankMoney from '@/components/page/bank/newBankMoney'//新建银行现金业务
import seeBankMoney from '@/components/page/bank/seeBankMoney'//查看银行现金业务
import approvalBankList from '@/components/page/bank/approvalBankList'//银行业务审批列表
import approvalBank from '@/components/page/bank/approvalBank'//银行业务审批
//工资单
import payroll from '@/components/page/Payroll/payroll'//工资单列表
import addPayroll from '@/components/page/Payroll/addPayroll'//新增临时员工
import seePayroll from '@/components/page/Payroll/seePayroll'//修改临时员工
//账套管理
import personal from '@/components/page/AccountManagement/personal'//个人信息
import AccountManagement from '@/components/page/AccountManagement/AccountManagement'//账套管理
import newAccountManagement from '@/components/page/AccountManagement/newAccountManagement'//新建账套管理
import changeAccountManagement from '@/components/page/AccountManagement/changeAccountManagement'//修改账套管理
import seeAccountManagement from '@/components/page/AccountManagement/seeAccountManagement'//查看账套管理

//报表
import ZCFZReport from '@/components/page/Report/ZCFZReport'//资产负债表
import LRBeport from '@/components/page/Report/LRBeport'//利润表
import XJLLeport from '@/components/page/Report/XJLLeport'//现金流量表

//税费缴纳
import TaxationList from '@/components/page/Taxation/TaxationList'//税费缴纳列表
import newTaxation from '@/components/page/Taxation/newTaxation'//新建缴税单
import seeTaxation from '@/components/page/Taxation/seeTaxation'//修改缴税单
import approvalTaxationList from '@/components/page/Taxation/approvalTaxationList'//缴税单审批列表
import approvalTaxation from '@/components/page/Taxation/approvalTaxation'//缴税单审批
import approvalTaxationConfirmList from '@/components/page/Taxation/approvalTaxationConfirmList'//缴税单确认单列表
import approvalTaxationConfirm from '@/components/page/Taxation/approvalTaxationConfirm'//缴税单确认单

//账务处理
import Initialization from '@/components/page/AccountingTreatment/Initialization'//账务处理-初始化
import voucherList from '@/components/page/AccountingTreatment/voucherList'//查看凭证列表
import monthlyKnot from '@/components/page/AccountingTreatment/monthlyKnot'//月结
import generalLedger from '@/components/page/AccountingTreatment/generalLedger'//总账
import detailAccount from '@/components/page/AccountingTreatment/detailAccount'//明细账
import subjectBalance from '@/components/page/AccountingTreatment/subjectBalance'//科目余额
import cashDayAccount from '@/components/page/AccountingTreatment/cashDayAccount'//现金日记账
import bankJournal from '@/components/page/AccountingTreatment/bankJournal'//银行存款日记账
import auxiliarySubjectBalance from '@/components/page/AccountingTreatment/auxiliarySubjectBalance'//辅助科目余额

//红冲
import RedFlush from '@/components/page/RedFlush/RedFlush' //红冲列表
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
            path:'/Purchase/seePurchasePayment',
            name:'seePurchasePayment',
            component:seePurchasePayment
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
            path:'/Purchase/approvalPurchasePayList',
            name:'approvalPurchasePayList',
            component:approvalPurchasePayList
        },
        {
            path:'/Purchase/approvalPurchasePay',
            name:'approvalPurchasePay',
            component:approvalPurchasePay
        },

        {
            path:'/Purchase/approvalPurchaseConfirmList',
            name:'approvalPurchaseConfirmList',
            component:approvalPurchaseConfirmList
        },
        {
            path:'/Purchase/approvalPurchaseConfirm',
            name:'approvalPurchaseConfirm',
            component:approvalPurchaseConfirm
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
            path:'/Sale/saleList',
            name:'saleList',
            component:saleList
        },
        {
            path:'/Sale/newSale',
            name:'newSale',
            component:newSale
        },
        {
            path:'/Sale/seeSale',
            name:'seeSale',
            component:seeSale
        },
        {
            path:'/Sale/approvalSaleList',
            name:'approvalSaleList',
            component:approvalSaleList
        },
        {
            path:'/Sale/approvalSale',
            name:'approvalSale',
            component:approvalSale
        },
        {
            path:'/Sale/newSalePayment',
            name:'newSalePayment',
            component:newSalePayment
        },
        {
            path:'/Sale/seeSalePayment',
            name:'seeSalePayment',
            component:seeSalePayment
        },
        {
            path:'/Sale/approvalSalePayList',
            name:'approvalSalePayList',
            component:approvalSalePayList
        },
        {
            path:'/Sale/approvalSalePay',
            name:'approvalSalePay',
            component:approvalSalePay
        },
        {
            path:'/Sale/approvalSaleConfirmList',
            name:'approvalSaleConfirmList',
            component:approvalSaleConfirmList
        },
        {
            path:'/Sale/approvalSaleConfirm',
            name:'approvalSaleConfirm',
            component:approvalSaleConfirm
        },
        {
            path:'/Assets/fixedAssetsList',
            name:'fixedAssetsList',
            component:fixedAssetsList
        },
        {
            path:'/Assets/fixedAssets',
            name:'fixedAssets',
            component:fixedAssets
        },
        {
            path:'/Assets/intangibleAssetsList',
            name:'intangibleAssetsList',
            component:intangibleAssetsList
        },
        {
            path:'/Assets/intangibleAssets',
            name:'intangibleAssets',
            component:intangibleAssets
        },
        {
            path:'/project/projectList',
            name:'projectList',
            component:projectList
        },
        {
            path:'/project/newProject',
            name:'newProject',
            component:newProject
        },
        {
            path:'/project/seeProject',
            name:'seeProject',
            component:seeProject
        },
        {
            path:'/bank/bankList',
            name:'bankList',
            component:bankList
        },
        {
            path:'/bank/newBank',
            name:'newBank',
            component:newBank
        },
        {
            path:'/bank/seeBank',
            name:'seeBank',
            component:seeBank
        },
        {
            path:'/bank/bankMoneyList',
            name:'bankMoneyList',
            component:bankMoneyList
        },
        {
            path:'/bank/bankMoneyList2',
            name:'bankMoneyList2',
            component:bankMoneyList2
        },
        {
            path:'/bank/newBankMoney',
            name:'newBankMoney',
            component:newBankMoney
        },
        {
            path:'/bank/seeBankMoney',
            name:'seeBankMoney',
            component:seeBankMoney
        },
        {
            path:'/bank/approvalBankList',
            name:'approvalBankList',
            component:approvalBankList
        },
        {
            path:'/bank/approvalBank',
            name:'approvalBank',
            component:approvalBank
        },

        {
            path:'/Payroll/payroll',
            name:'payroll',
            component:payroll
        },
        {
            path:'/Payroll/addPayroll',
            name:'addPayroll',
            component:addPayroll
        },
        {
            path:'/Payroll/seePayroll',
            name:'seePayroll',
            component:seePayroll
        },
        {
            path:'/AccountManagement/personal',
            name:'personal',
            component:personal
        },
        {
            path:'/AccountManagement/AccountManagement',
            name:'AccountManagement',
            component:AccountManagement
        },

        {
            path:'/AccountManagement/newAccountManagement',
            name:'newAccountManagement',
            component:newAccountManagement
        },
        {
            path:'/AccountManagement/changeAccountManagement',
            name:'changeAccountManagement',
            component:changeAccountManagement
        },
        {
            path:'/AccountManagement/seeAccountManagement',
            name:'seeAccountManagement',
            component:seeAccountManagement
        },
        {
            path:'/Report/ZCFZReport',
            name:'ZCFZReport',
            component:ZCFZReport
        },
        {
            path:'/Report/LRBeport',
            name:'LRBeport',
            component:LRBeport
        },
        {
            path:'/Report/XJLLeport',
            name:'XJLLeport',
            component:XJLLeport
        },
        {
            path:'/Taxation/TaxationList',
            name:'TaxationList',
            component:TaxationList
        },
        {
            path:'/Taxation/newTaxation',
            name:'newTaxation',
            component:newTaxation
        },
        {
            path:'/Taxation/seeTaxation',
            name:'seeTaxation',
            component:seeTaxation
        },
        {
            path:'/Taxation/approvalTaxationList',
            name:'approvalTaxationList',
            component:approvalTaxationList
        },
        {
            path:'/Taxation/approvalTaxation',
            name:'approvalTaxation',
            component:approvalTaxation
        },
        {
            path:'/Taxation/approvalTaxationConfirmList',
            name:'approvalTaxationConfirmList',
            component:approvalTaxationConfirmList
        },
        {
            path:'/Taxation/approvalTaxationConfirm',
            name:'approvalTaxationConfirm',
            component:approvalTaxationConfirm
        },
        {
            path:'/AccountingTreatment/Initialization',
            name:'Initialization',
            component:Initialization
        },
        {
            path:'/AccountingTreatment/voucherList',
            name:'voucherList',
            component:voucherList
        },
        {
            path:'/AccountingTreatment/monthlyKnot',
            name:'monthlyKnot',
            component:monthlyKnot
        },
        {
            path:'/AccountingTreatment/generalLedger',
            name:'generalLedger',
            component:generalLedger
        },
        {
            path:'/AccountingTreatment/detailAccount',
            name:'detailAccount',
            component:detailAccount
        },
        {
            path:'/AccountingTreatment/subjectBalance',
            name:'subjectBalance',
            component:subjectBalance
        },
        {
            path:'/AccountingTreatment/cashDayAccount',
            name:'cashDayAccount',
            component:cashDayAccount
        },
        {
            path:'/AccountingTreatment/bankJournal',
            name:'bankJournal',
            component:bankJournal
        },
        {
            path:'/AccountingTreatment/auxiliarySubjectBalance',
            name:'auxiliarySubjectBalance',
            component:auxiliarySubjectBalance
        },
        {
            path:'/RedFlush/RedFlush',
            name:'RedFlush',
            component:RedFlush
        },


    ]
})
