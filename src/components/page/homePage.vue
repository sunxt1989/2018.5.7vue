<template>
    <div class="w">
        <el-row class="timer">倒计时器</el-row>
        <el-row>
            <!--左边桌面-->
            <el-col :span="18">
                <div class="desktop">
                    <el-row class="search">
                        <el-input name="search" size="small" v-model="val" placeholder="请输入内容" @blur="blur">
                            <el-button class="searchBtn" slot="append" @click="btn">搜索</el-button>
                        </el-input>
                    </el-row>
                    <el-row class="mesa">
                        <div class="items" >
                            <div class="item md loan" id="loan">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/loan/loan" v-popover:loan >
                                        借款单
                                    </router-link>
                                    <el-popover  ref="loan" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('loan')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('loan')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('loan')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>

                            <div class="item md" id="loanApprovalList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/loan/loanApprovalList" v-popover:loanApprovalList>
                                        借款单审批列表
                                    </router-link>
                                    <el-popover  ref="loanApprovalList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('loanApprovalList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('loanApprovalList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('loanApprovalList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="loanConfirmationList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/loan/loanConfirmationList" v-popover:loanConfirmationList>
                                        借款单确认列表
                                    </router-link>
                                    <el-popover  ref="loanConfirmationList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('loanConfirmationList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('loanConfirmationList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('loanConfirmationList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="repaymentConfirmationList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/loan/repaymentConfirmationList" v-popover:repaymentConfirmationList>
                                        还款单确认列表
                                    </router-link>
                                    <el-popover  ref="repaymentConfirmationList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('repaymentConfirmationList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('repaymentConfirmationList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('repaymentConfirmationList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="costSheet">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Reimbursement/costSheet" v-popover:costSheet>
                                        费用单
                                    </router-link>
                                    <el-popover  ref="costSheet" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('costSheet')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('costSheet')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('costSheet')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="ReimbursementList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Reimbursement/ReimbursementList" v-popover:ReimbursementList>
                                        报销单列表
                                    </router-link>
                                    <el-popover  ref="ReimbursementList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('ReimbursementList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('ReimbursementList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('ReimbursementList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="ReimbursementApprovalList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Reimbursement/ReimbursementApprovalList" v-popover:ReimbursementApprovalList>
                                        报销单审批列表
                                    </router-link>
                                    <el-popover  ref="ReimbursementApprovalList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('ReimbursementApprovalList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('ReimbursementApprovalList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('ReimbursementApprovalList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="ReimbursementConfirmationList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Reimbursement/ReimbursementConfirmationList" v-popover:ReimbursementConfirmationList>
                                        报销单确认列表
                                    </router-link>
                                    <el-popover  ref="ReimbursementConfirmationList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('ReimbursementConfirmationList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('ReimbursementConfirmationList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('ReimbursementConfirmationList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="payroll">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Payroll/payroll" v-popover:payroll>
                                        工资单
                                    </router-link>
                                    <el-popover  ref="payroll" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('payroll')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('payroll')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('payroll')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="SupplierList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Purchase/SupplierList" v-popover:SupplierList>
                                        交易方列表
                                    </router-link>
                                    <el-popover  ref="SupplierList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('SupplierList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('SupplierList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('SupplierList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="PurchaseList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Purchase/PurchaseList" v-popover:PurchaseList>
                                        采购单列表
                                    </router-link>
                                    <el-popover  ref="PurchaseList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('PurchaseList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('PurchaseList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('PurchaseList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalPurchaseList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Purchase/approvalPurchaseList" v-popover:approvalPurchaseList>
                                        采购单审批列表
                                    </router-link>
                                    <el-popover  ref="approvalPurchaseList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalPurchaseList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalPurchaseList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalPurchaseList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalPurchasePayList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Purchase/approvalPurchasePayList" v-popover:approvalPurchasePayList>
                                        采购单付款审批列表
                                    </router-link>
                                    <el-popover  ref="approvalPurchasePayList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalPurchasePayList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalPurchasePayList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalPurchasePayList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalPurchaseConfirmList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Purchase/approvalPurchaseConfirmList" v-popover:approvalPurchaseConfirmList>
                                        采购单付款确认列表
                                    </router-link>
                                    <el-popover  ref="approvalPurchaseConfirmList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalPurchaseConfirmList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalPurchaseConfirmList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalPurchaseConfirmList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="Sale">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Sale/saleList" v-popover:Sale>
                                        销售单列表
                                    </router-link>
                                    <el-popover  ref="Sale" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('Sale')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('Sale')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('Sale')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalSaleList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Sale/approvalSaleList" v-popover:approvalSaleList>
                                        销售单审批列表
                                    </router-link>
                                    <el-popover  ref="approvalSaleList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalSaleList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalSaleList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalSaleList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalSalePayList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Sale/approvalSalePayList" v-popover:approvalSalePayList>
                                        销售单收款审批列表
                                    </router-link>
                                    <el-popover  ref="approvalSalePayList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalSalePayList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalSalePayList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalSalePayList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalSaleConfirmList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Sale/approvalSaleConfirmList" v-popover:approvalSaleConfirmList>
                                        销售单收款确认列表
                                    </router-link>
                                    <el-popover  ref="approvalSaleConfirmList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalSaleConfirmList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalSaleConfirmList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalSaleConfirmList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="fixedAssetsList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Assets/fixedAssetsList" v-popover:fixedAssetsList>
                                        固定资产列表
                                    </router-link>
                                    <el-popover  ref="fixedAssetsList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('fixedAssetsList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('fixedAssetsList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('fixedAssetsList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="intangibleAssetsList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Assets/intangibleAssetsList" v-popover:intangibleAssetsList>
                                        无形资产列表
                                    </router-link>
                                    <el-popover  ref="intangibleAssetsList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('intangibleAssetsList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('intangibleAssetsList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('intangibleAssetsList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="projectList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/project/projectList" v-popover:projectList>
                                        项目列表
                                    </router-link>
                                    <el-popover  ref="projectList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('projectList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('projectList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('projectList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="bankList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/bank/bankList" v-popover:bankList>
                                        银行账户列表
                                    </router-link>
                                    <el-popover  ref="bankList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('bankList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('bankList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('bankList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="bankMoneyList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/bank/bankMoneyList" v-popover:bankMoneyList>
                                        银行现金业务列表
                                    </router-link>
                                    <el-popover  ref="bankMoneyList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('bankMoneyList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('bankMoneyList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('bankMoneyList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalBankList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/bank/approvalBankList" v-popover:approvalBankList>
                                        银行业务审批列表
                                    </router-link>
                                    <el-popover  ref="approvalBankList" placement="top"  trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalBankList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalBankList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalBankList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="ZCFZReport">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Report/ZCFZReport" v-popover:ZCFZReport>
                                        资产负债表
                                    </router-link>
                                    <el-popover ref="ZCFZReport" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('ZCFZReport')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('ZCFZReport')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('ZCFZReport')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="LRBeport">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Report/LRBeport" v-popover:LRBeport>
                                        利润表
                                    </router-link>
                                    <el-popover ref="LRBeport" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('LRBeport')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('LRBeport')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('LRBeport')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="XJLLeport">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Report/XJLLeport" v-popover:XJLLeport>
                                        现金流量表
                                    </router-link>
                                    <el-popover ref="XJLLeport" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('XJLLeport')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('XJLLeport')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('XJLLeport')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="TaxationList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Taxation/TaxationList" v-popover:TaxationList>
                                        税费缴纳列表
                                    </router-link>
                                    <el-popover ref="TaxationList" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('TaxationList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('TaxationList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('TaxationList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalTaxationList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Taxation/approvalTaxationList" v-popover:approvalTaxationList>
                                        缴税单审批列表
                                    </router-link>
                                    <el-popover ref="approvalTaxationList" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalTaxationList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalTaxationList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalTaxationList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="approvalTaxationConfirmList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/Taxation/approvalTaxationConfirmList" v-popover:approvalTaxationConfirmList>
                                        缴税单确认列表
                                    </router-link>
                                    <el-popover ref="approvalTaxationConfirmList" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('approvalTaxationConfirmList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('approvalTaxationConfirmList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('approvalTaxationConfirmList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="Initialization">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/Initialization" v-popover:Initialization>
                                        账务处理-初始化
                                    </router-link>
                                    <el-popover ref="Initialization" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('Initialization')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('Initialization')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('Initialization')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="voucherList">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/voucherList" v-popover:voucherList>
                                        查看凭证列表
                                    </router-link>
                                    <el-popover ref="voucherList" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('voucherList')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('voucherList')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('voucherList')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="monthlyKnot">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/monthlyKnot" v-popover:monthlyKnot>
                                        月结
                                    </router-link>
                                    <el-popover ref="monthlyKnot" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('monthlyKnot')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('monthlyKnot')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('monthlyKnot')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="generalLedger">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/generalLedger" v-popover:generalLedger>
                                        总账
                                    </router-link>
                                    <el-popover ref="generalLedger" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('generalLedger')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('generalLedger')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('generalLedger')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="detailAccount">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/detailAccount" v-popover:detailAccount>
                                        明细账
                                    </router-link>
                                    <el-popover ref="detailAccount" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('detailAccount')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('detailAccount')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('detailAccount')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="subjectBalance">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/subjectBalance" v-popover:subjectBalance>
                                        科目余额
                                    </router-link>
                                    <el-popover ref="subjectBalance" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('subjectBalance')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('subjectBalance')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('subjectBalance')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="cashDayAccount">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/cashDayAccount" v-popover:cashDayAccount>
                                        现金日记账
                                    </router-link>
                                    <el-popover ref="cashDayAccount" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('cashDayAccount')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('cashDayAccount')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('cashDayAccount')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="bankJournal">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/bankJournal" v-popover:bankJournal>
                                        银行存款日记账
                                    </router-link>
                                    <el-popover ref="bankJournal" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('bankJournal')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('bankJournal')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('bankJournal')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="auxiliarySubjectBalance">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/AccountingTreatment/auxiliarySubjectBalance" v-popover:auxiliarySubjectBalance>
                                        辅助科目余额
                                    </router-link>
                                    <el-popover ref="auxiliarySubjectBalance" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('auxiliarySubjectBalance')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('auxiliarySubjectBalance')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('auxiliarySubjectBalance')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>
                            <div class="item md" id="RedFlush">
                                <div class="item-content">
                                    <router-link class="itemLink" to="/RedFlush/RedFlush" v-popover:RedFlush>
                                        红冲
                                    </router-link>
                                    <el-popover ref="RedFlush" placement="top" trigger="hover" :visible-arrow="false">
                                        <div class="pop">
                                            <i class="icon iconfont icon-jia red" @click="addClick('RedFlush')"></i>
                                            <i class="icon iconfont icon-jian red" @click="reduceClick('RedFlush')"></i>
                                            <i class="icon iconfont icon-shanchu red" @click="deleteClick('RedFlush')"></i>
                                        </div>
                                    </el-popover>
                                </div>
                            </div>

                        </div>
                    </el-row>
                </div>
            </el-col>

            <!--右边日历、消息、工具箱-->
            <el-col :span="6">
                <div class="tool">
                    <div class="data">
                        日历
                        <span @click="addItem('loan')">借款单</span>
                        <span @click="addItem('loanApprovalList')">借款单审批列表</span>
                        <span @click="addItem('loanConfirmationList')">借款单确认列表</span>
                        <span @click="addItem('repaymentConfirmationList')">还款单确认列表</span>
                        <span @click="addItem('costSheet')">费用单</span>
                        <span @click="addItem('ReimbursementList')">报销单列表</span>
                        <span @click="addItem('ReimbursementApprovalList')">报销单审批列表</span>
                        <span @click="addItem('ReimbursementConfirmationList')">报销单确认列表</span>
                        <span @click="addItem('payroll')">工资单</span>
                        <span @click="addItem('SupplierList')">交易方列表</span>
                        <span @click="addItem('PurchaseList')">采购单列表</span>
                        <span @click="addItem('approvalPurchaseList')">采购单审批列表</span>
                        <span @click="addItem('approvalPurchasePayList')">采购单付款审批列表</span>
                        <span @click="addItem('approvalPurchaseConfirmList')">采购单付款审批列表</span>
                        <span @click="addItem('Sale')">销售单列表</span>
                        <span @click="addItem('approvalSaleList')">销售单审批列表</span>
                        <span @click="addItem('approvalSalePayList')">销售单收款审批列表</span>
                        <span @click="addItem('approvalSaleConfirmList')">销售单收款审批列表</span>
                        <span @click="addItem('fixedAssetsList')">固定资产列表</span>
                        <span @click="addItem('intangibleAssetsList')">无形资产列表</span>
                        <span @click="addItem('projectList')">项目列表</span>
                        <span @click="addItem('bankList')">银行账户列表</span>
                        <span @click="addItem('bankMoneyList')">银行现金业务列表</span>
                        <span @click="addItem('approvalBankList')">银行业务审批列表</span>
                        <span @click="addItem('ZCFZReport')">资产负债表</span>
                        <span @click="addItem('LRBeport')">利润表</span>
                        <span @click="addItem('XJLLeport')">现金流量表</span>
                        <span @click="addItem('TaxationList')">税费缴纳列表</span>
                        <span @click="addItem('approvalTaxationList')">缴税单审批列表</span>
                        <span @click="addItem('approvalTaxationConfirmList')">缴税单确认列表</span>
                        <span @click="addItem('Initialization')">账务处理-初始化</span>
                        <span @click="addItem('voucherList')">查看凭证列表</span>
                        <span @click="addItem('monthlyKnot')">月结</span>
                        <span @click="addItem('generalLedger')">总账</span>
                        <span @click="addItem('detailAccount')">明细账</span>
                        <span @click="addItem('subjectBalance')">科目余额</span>
                        <span @click="addItem('cashDayAccount')">现金日记账</span>
                        <span @click="addItem('bankJournal')">银行存款日记账</span>
                        <span @click="addItem('auxiliarySubjectBalance')">辅助科目余额</span>
                        <span @click="addItem('RedFlush')">红冲列表</span>
                    </div>
                    <div class="news">
                        消息
                    </div>
                    <div class="toolBox">
                        工具箱
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//    import number from '../../../static/js/number'
//    import unNumber from '../../../static/js/unNumber'

    import Muuri from 'muuri'
    import hammer from '../../../static/js/hammer.min.js'
    import animations from '../../../static/js/web-animations.min.js'

    import store from '@/vuex/store'
    export default {
        name: 'homePage',
        data () {
            return {
                msg: 'Hello Vuex',
                val:'',
                grid:'',
            }
        },
        computed:{
            changeNum:function(){
                return this.val = number.number(val)
            }
        },
        methods:{
            addItem(name){
                var items = this.grid.getItems('inactive');
                console.log(items);
                for(var i = 0; i < items.length; i++){
                    if(name == items[i]._element.id){
                        this.grid.show(items[i])
                    }
                }
            },
            deleteClick(name){
                var items = this.grid.getItems('active');
                console.log(items);
                for(var i = 0; i < items.length; i++){
                    if(name == items[i]._element.id){
                        this.grid.hide(items[i])
                    }
                }
            },
            reduceClick(name){
                var $item =$('#' + name)
                if($item.is('.lg')){
                    $item.removeClass('lg')
                    $item.addClass('md')
                    this.grid.refreshItems();
                    this.grid.layout();
                    return;//阻止下一次的判断
                }

                if($item.is('.md')){
                    $item.removeClass('md')
                    $item.addClass('sm')
                    this.grid.refreshItems();
                    this.grid.layout();
                    return;//阻止下一次的判断
                }

                if($item.is('.sm')) {
                    return;//你还想要多小
                }
            },
            addClick(name){
                var $item =$('#' + name)
                if($item.is('.sm')){
                    $item.removeClass('sm')
                    $item.addClass('md');
                    this.grid.refreshItems();
                    this.grid.layout();
                    return //阻止下一次的判断
                }

                if($item.is('.md')){
                    $item.removeClass('md')
                    $item.addClass('lg')
                    this.grid.refreshItems();
                    this.grid.layout();
                    return //阻止下一次的判断
                }

                if($item.is('.lg')){
                    return;//你还想要多大
                }
            },
            blur:function(){
                this.val = number.number(this.val)
            },
            btn:function(){
                var val = unNumber.unNumber(this.val)
                console.log(val);
            }
        },

        created(){

        },
        mounted(){
            this.grid = new Muuri('.items', {
                dragEnabled: true,
                layoutOnResize:true,
        });
            var allItems = this.grid.getItems();

            [].slice.call(document.querySelectorAll('.item')).forEach(function (elem) {
                elem.addEventListener('click', function (e) {
                });
            });

            this.grid.on('layoutStart', function (items) {
            });
        },
        store,
    }
</script>

<style scoped>
    .el-col{
        padding: 10px;
    }
    .timer{
        width:100%;
        height:60px;
        text-align: center;
    }
    .desktop{
        background-color: #ffffff;
        padding: 15px;
    }
    .tool{
        background-color: #ffffff;
        padding:5px;
    }
    .search{
        width:600px;
        margin: 0 auto;
    }
    .mesa{
        width:850px;
        height:550px;
        margin-top: 15px;
        background-color: #ccc;
    }
    .data{
        height:400px;
        background-color: #00ffff;
    }
    .news{
        margin-top: 10px;
        height:150px;
        background-color: #8cc5ff;
    }
    .toolBox{
        margin-top: 10px;
        height:150px;
        background-color: #ffff26;
    }
    .item {
        position: absolute;
        margin: 5px;
        z-index: 1;
    }
    .sm{
        width: 50px;
        height:50px;
        font-size:0;
    }
    .md{
        width: 110px;
        height:110px;
    }
    .lg{
        width: 230px;
        height:230px;
        font-size:20px;
        font-weight: bold;
    }
    .pop i{
        width: 40px;
        display: inline-block;
    }
    .item.muuri-item-hidden {
        z-index: 0;
    }
    .item.muuri-item-releasing {
        z-index: 2;
    }
    .item.muuri-item-dragging {
        z-index: 3;
    }
    .item-content {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
    .item-content img{
        width:100%;
        height:100%;

    }
    .itemLink{
        display: inline-block;
        width:100%;
        height:100%;
        color: #fff;
        text-decoration: none;
        outline: none;
        margin-top: 5px;
    }
    /*移动中样式*/
    .item.muuri-item-dragging .item-content {

    }
    /*移动结束样式*/
    .item.muuri-item-releasing .item-content {

    }
    #loan {
        display: none;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #loanApprovalList {
        display: none;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #loanConfirmationList {
        display: none;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #repaymentConfirmationList {
        display: none;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #costSheet {
        display: none;
        background: url("../../../static/images/feiyongdan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ReimbursementList {
        display: none;
        background: url("../../../static/images/baoxiaodan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ReimbursementApprovalList {
        display: none;
        background: url("../../../static/images/baoxiaodan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ReimbursementConfirmationList {
        display: none;
        background: url("../../../static/images/baoxiaodan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #payroll {
        display: none;
        background: url("../../../static/images/gongzidan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #SupplierList {
        display: none;
        background: url("../../../static/images/gongzidan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #PurchaseList {
        display: none;
        background: url("../../../static/images/caigoudan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalPurchaseList {
        display: block;
        background: url("../../../static/images/caigoudan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalPurchasePayList{
        display: block;
        background: url("../../../static/images/caigoudan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalPurchaseConfirmList{
        display: block;
        background: url("../../../static/images/caigoudan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #Sale {
         display: block;
         background: url("../../../static/images/xiaoshou.png") no-repeat 0 0;
         background-size: 100%;
     }
    #approvalSaleList {
        display: block;
        background: url("../../../static/images/xiaoshou.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalSalePayList {
        display: block;
        background: url("../../../static/images/xiaoshou.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalSaleConfirmList{
        display: block;
        background: url("../../../static/images/xiaoshou.png") no-repeat 0 0;
        background-size: 100%;
    }
    #fixedAssetsList{
        display: block;
        background: url("../../../static/images/gudingzichan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #intangibleAssetsList{
        display: block;
        background: url("../../../static/images/wuxingzichan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #projectList{
        display: block;
        background: url("../../../static/images/wuxingzichan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #bankList{
        display: block;
        background: url("../../../static/images/yinhangzhanghu.png") no-repeat 0 0;
        background-size: 100%;
    }
    #bankMoneyList{
        display: block;
        background: url("../../../static/images/yinhangxianjinyewu.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalBankList{
        display: block;
        background: url("../../../static/images/yinhangxianjinyewu.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ZCFZReport{
        display: block;
        background: url("../../../static/images/yinhangxianjinyewu.png") no-repeat 0 0;
        background-size: 100%;
    }
    #LRBeport{
        display: block;
        background: url("../../../static/images/yinhangxianjinyewu.png") no-repeat 0 0;
        background-size: 100%;
    }
    #XJLLeport{
        display: block;
        background: url("../../../static/images/yinhangxianjinyewu.png") no-repeat 0 0;
        background-size: 100%;
    }
    #TaxationList{
        display: block;
        background: url("../../../static/images/shuifeijiaona.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalTaxationList{
        display: block;
        background: url("../../../static/images/shuifeijiaona.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalTaxationConfirmList{
        display: block;
        background: url("../../../static/images/shuifeijiaona.png") no-repeat 0 0;
        background-size: 100%;
    }
    #Initialization{
        display: block;
        background: url("../../../static/images/shuifeijiaona.png") no-repeat 0 0;
        background-size: 100%;
    }
    #voucherList{
        display: block;
        background: url("../../../static/images/pingzheng.png") no-repeat 0 0;
        background-size: 100%;
    }
    #monthlyKnot{
        display: block;
        background: url("../../../static/images/pingzheng.png") no-repeat 0 0;
        background-size: 100%;
    }
    #generalLedger{
        display: block;
        background: url("../../../static/images/zongzhang.png") no-repeat 0 0;
        background-size: 100%;
    }
    #detailAccount{
        display: block;
        background: url("../../../static/images/mingxizhang.png") no-repeat 0 0;
        background-size: 100%;
    }
    #subjectBalance{
        display: block;
        background: url("../../../static/images/kemuyue.png") no-repeat 0 0;
        background-size: 100%;
    }
    #cashDayAccount{
        display: block;
        background: url("../../../static/images/xianjinrijizhang.png") no-repeat 0 0;
        background-size: 100%;
    }
    #bankJournal{
        display: block;
        background: url("../../../static/images/yinhangrijizhang.png") no-repeat 0 0;
        background-size: 100%;
    }
    #auxiliarySubjectBalance{
        display: block;
        background: url("../../../static/images/kemuyue.png") no-repeat 0 0;
        background-size: 100%;
    }
    #RedFlush{
        display: block;
        background: url("../../../static/images/kemuyue.png") no-repeat 0 0;
        background-size: 100%;
    }
</style>
