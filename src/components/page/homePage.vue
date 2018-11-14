<template>
    <div v-loading.fullscreen.lock="loading" class="w cf">
        <!--左边功能栏-->
        <div class="left cf">
            <div class="news">
                <nav class="news-tit">消息</nav>
                <ul v-if="newsList.length != 0" class="news-list">
                    <li v-for="item in newsList" class="news-list-item"
                        @click="newsIngress(item.type,item.relation_id,item.id)">
                        <span :class=item.class >{{item.state}}</span>
                        <span class="news-span">{{item.business}}</span>
                        <span class="news-tiem">{{item.notice_time}}</span>
                        <span class="news-money"> ￥{{item.notice_money}}</span>
                    </li>
                </ul>
                <span v-else class="nothingNews">暂无消息</span>
            </div>
            <div class="date">
                <nav class="date-tit">日历</nav>
                <v-calendar :attributes='attrs' class="calendar">
                </v-calendar>
            </div>
            <div class="desktop cf">
                <nav class="desktop-tit">
                    <span>功能</span>
                    <span class="saveBtn" @click="saveClick" v-show="isSave">保存配置</span>
                    <span class="move1" @click="moveClick">＋更多</span>
                </nav>
                <el-row class="mesa">
                    <div class="items">
                        <div class="item" data-id="1" id="loan">
                            <div @mousedown="mousedown" @mouseup="mouseup('loan',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/loan.png" alt="">
                                    </div>
                                    <span class="itemName">借款单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click.stop="deleteClick('loan')"></i>
                        </div>
                        <div class="item" data-id="2" id="costSheet">
                            <div @mousedown="mousedown" @mouseup="mouseup('costSheet',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/costSheet.png" alt="">
                                    </div>
                                    <span class="itemName">费用单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('costSheet')"></i>
                        </div>
                        <div class="item" data-id="3" id="ReimbursementList">
                            <div @mousedown="mousedown" @mouseup="mouseup('ReimbursementList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/ReimbursementList.png" alt="">
                                    </div>
                                    <span class="itemName">报销单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('ReimbursementList')"></i>
                        </div>
                        <div class="item" data-id="4" id="payroll">
                            <div  @mousedown="mousedown" @mouseup="mouseup('payroll',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/payroll.png" alt="">
                                    </div>
                                    <span class="itemName">工资单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('payroll')"></i>
                        </div>
                        <div class="item" data-id="5" id="SupplierList">
                            <div @mousedown="mousedown" @mouseup="mouseup('SupplierList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/SupplierList.png" alt="">
                                    </div>
                                    <span class="itemName">交易方</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('SupplierList')"></i>

                        </div>
                        <div class="item" data-id="6" id="PurchaseList">
                            <div @mousedown="mousedown" @mouseup="mouseup('PurchaseList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/PurchaseList.png" alt="">
                                    </div>
                                    <span class="itemName">采购单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('PurchaseList')"></i>
                        </div>
                        <div class="item" data-id="7" id="saleList">
                            <div @mousedown="mousedown" @mouseup="mouseup('saleList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/saleList.png" alt="">
                                    </div>
                                    <span class="itemName">销售单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('saleList')"></i>
                        </div>
                        <div class="item" data-id="8" id="fixedAssetsList" >
                            <div @mousedown="mousedown" @mouseup="mouseup('fixedAssetsList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/fixedAssetsList.png" alt="">
                                    </div>
                                    <span class="itemName">固定资产</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('fixedAssetsList')"></i>
                        </div>
                        <div class="item" data-id="9" id="intangibleAssetsList" >
                            <div @mousedown="mousedown" @mouseup="mouseup('intangibleAssetsList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/intangibleAssetsList.png" alt="">
                                    </div>
                                    <span class="itemName">无形资产</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('intangibleAssetsList')"></i>
                        </div>
                        <div class="item" data-id="10" id="projectList">
                            <div @mousedown="mousedown" @mouseup="mouseup('projectList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/projectList.png" alt="">
                                    </div>
                                    <span class="itemName">项目</span>

                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('projectList')"></i>
                        </div>
                        <div class="item" data-id="11" id="bankList">
                            <div @mousedown="mousedown" @mouseup="mouseup('bankList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/bankList.png" alt="">
                                    </div>
                                    <span class="itemName">银行账户</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('bankList')"></i>
                        </div>
                        <div class="item" data-id="12" id="bankMoneyList">
                            <div @mousedown="mousedown" @mouseup="mouseup('bankMoneyList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/bankMoneyList.png" alt="">
                                    </div>
                                    <span class="itemName">银行现金业务</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('bankMoneyList')"></i>
                        </div>
                        <div class="item" data-id="13" id="ZCFZReport" >
                            <div @mousedown="mousedown" @mouseup="mouseup('ZCFZReport',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/ZCFZReport.png" alt="">
                                    </div>
                                    <span class="itemName">资产负债表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('ZCFZReport')"></i>
                        </div>
                        <div class="item" data-id="14" id="LRBeport" >
                            <div @mousedown="mousedown" @mouseup="mouseup('LRBeport',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/LRBeport.png" alt="">
                                    </div>
                                    <span class="itemName">利润表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('LRBeport')"></i>
                        </div>
                        <div class="item" data-id="15" id="XJLLeport">
                            <div @mousedown="mousedown" @mouseup="mouseup('XJLLeport',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/XJLLeport.png" alt="">
                                    </div>
                                    <span class="itemName">现金流量表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('XJLLeport')"></i>
                        </div>
                        <div class="item" data-id="16" id="TaxationList" >
                            <div @mousedown="mousedown" @mouseup="mouseup('TaxationList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/TaxationList.png" alt="">
                                    </div>
                                    <span class="itemName">税费缴纳</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('TaxationList')"></i>
                        </div>
                        <div class="item" data-id="17" id="Initialization" >
                            <div @mousedown="mousedown" @mouseup="mouseup('Initialization',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/Initialization.png" alt="">
                                    </div>
                                    <span class="itemName">账务处理-初始化</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('Initialization')"></i>
                        </div>
                        <div class="item" data-id="18" id="voucherList" >
                            <div @mousedown="mousedown" @mouseup="mouseup('voucherList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/voucherList.png" alt="">
                                    </div>
                                    <span class="itemName">凭证</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('voucherList')"></i>
                        </div>
                        <div class="item" data-id="19" id="monthlyKnot">
                            <div @mousedown="mousedown" @mouseup="mouseup('monthlyKnot',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/monthlyKnot.png" alt="">
                                    </div>
                                    <span class="itemName">月结</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('monthlyKnot')"></i>
                        </div>
                        <div class="item" data-id="20" id="generalLedger">
                            <div @mousedown="mousedown" @mouseup="mouseup('generalLedger',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/generalLedger.png" alt="">
                                    </div>
                                    <span class="itemName">总账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('generalLedger')"></i>
                        </div>
                        <div class="item" data-id="21" id="detailAccount">
                            <div @mousedown="mousedown" @mouseup="mouseup('detailAccount',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/detailAccount.png" alt="">
                                    </div>
                                    <span class="itemName">明细账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('detailAccount')"></i>
                        </div>
                        <div class="item" data-id="22" id="subjectBalance">
                            <div @mousedown="mousedown" @mouseup="mouseup('subjectBalance',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/subjectBalance.png" alt="">
                                    </div>
                                    <span class="itemName">科目余额</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('subjectBalance')"></i>
                        </div>
                        <div class="item" data-id="23" id="cashDayAccount">
                            <div @mousedown="mousedown" @mouseup="mouseup('cashDayAccount',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/cashDayAccount.png" alt="">
                                    </div>
                                    <span class="itemName">现金日记账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('cashDayAccount')"></i>
                        </div>
                        <div class="item" data-id="24" id="bankJournal">
                            <div @mousedown="mousedown" @mouseup="mouseup('bankJournal',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/bankJournal.png" alt="">
                                    </div>
                                    <span class="itemName">银行存款日记账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('bankJournal')"></i>
                        </div>
                        <div class="item" data-id="25" id="auxiliarySubjectBalance">
                            <div @mousedown="mousedown" @mouseup="mouseup('auxiliarySubjectBalance',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/auxiliarySubjectBalance.png" alt="">
                                    </div>
                                    <span class="itemName">辅助科目余额</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('auxiliarySubjectBalance')"></i>
                        </div>
                        <div class="item" data-id="26" id="RedFlush">
                            <div @mousedown="mousedown" @mouseup="mouseup('RedFlush',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/RedFlush.png" alt="">
                                    </div>
                                    <span class="itemName">红冲</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('RedFlush')"></i>
                        </div>
                        <div class="item" data-id="27" id="staffList">
                            <div @mousedown="mousedown" @mouseup="mouseup('staffList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/staffList.png" alt="">
                                    </div>
                                    <span class="itemName">员工列表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('staffList')"></i>
                        </div>
                        <div class="item" data-id="28" id="departmentList">
                            <div @mousedown="mousedown" @mouseup="mouseup('departmentList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/departmentList.png" alt="">
                                    </div>
                                    <span class="itemName">部门列表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('departmentList')"></i>
                        </div>
                        <div class="item" data-id="29" id="stockList">
                            <div @mousedown="mousedown" @mouseup="mouseup('stockList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/stockList.png" alt="">
                                    </div>
                                    <span class="itemName">库存商品列表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('stockList')"></i>
                        </div>
                        <div class="item" data-id="30" id="auxiliaryList">
                            <div @mousedown="mousedown" @mouseup="mouseup('auxiliaryList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/auxiliaryList.png" alt="">
                                    </div>
                                    <span class="itemName">辅助业务列表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('auxiliaryList')"></i>
                        </div>
                        <div class="item" data-id="31" id="develop">
                            <div @mousedown="mousedown" @mouseup="mouseup('develop',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/develop.png" alt="">
                                    </div>
                                    <span class="itemName">自主研发辅助账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('develop')"></i>
                        </div>
                        <div class="item" data-id="32" id="summary">
                            <div @mousedown="mousedown" @mouseup="mouseup('summary',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/summary.png" alt="">
                                    </div>
                                    <span class="itemName">辅助账汇总表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('summary')"></i>
                        </div>
                        <div class="item" data-id="33" id="costCollection">
                            <div @mousedown="mousedown" @mouseup="mouseup('costCollection',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/costCollection.png" alt="">
                                    </div>
                                    <span class="itemName">费用情况归集表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('costCollection')"></i>
                        </div>
                        <div class="item" data-id="34" id="Entrust">
                            <div @mousedown="mousedown" @mouseup="mouseup('Entrust',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/Entrust.png" alt="">
                                    </div>
                                    <span class="itemName">委托研发辅助账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('Entrust')"></i>
                        </div>
                        <div class="item" data-id="35" id="collectionList">
                            <div @mousedown="mousedown" @mouseup="mouseup('collectionList',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/collectionList.png" alt="">
                                    </div>
                                    <span class="itemName">收容业务列表</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('collectionList')"></i>
                        </div>
                        <div class="item" data-id="36" id="addBoss">
                            <div @mousedown="mousedown" @mouseup="mouseup('addBoss',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/addBoss.png" alt="">
                                    </div>
                                    <span class="itemName">添加老板</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('addBoss')"></i>
                        </div>
                        <div class="item" data-id="37" id="invoiceDeduction">
                            <div @mousedown="mousedown" @mouseup="mouseup('invoiceDeduction',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/invoiceDeduction.png" alt="">
                                    </div>
                                    <span class="itemName">发票抵扣</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('invoiceDeduction')"></i>
                        </div>
                        <div class="item" data-id="38" id="recordSheet">
                            <div @mousedown="mousedown" @mouseup="mouseup('recordSheet',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/recordSheet.png" alt="">
                                    </div>
                                    <span class="itemName">录单</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('recordSheet')"></i>
                        </div>
                        <div class="item" data-id="39" id="bookkeeping">
                            <div @mousedown="mousedown" @mouseup="mouseup('bookkeeping',$event)">
                                <div class="item-content">
                                    <div class="itemLink">
                                        <img src="static/images/homePage/bookkeeping.png" alt="">
                                    </div>
                                    <span class="itemName">记账</span>
                                </div>
                            </div>
                            <i class="icon iconfont icon-shanchu1 red" @click="deleteClick('bookkeeping')"></i>
                        </div>
                    </div>

                    <el-dialog class="dialog cf" title="常用功能选择" :visible.sync="dialogSseTableVisible" showConfirmButton="true"
                               width="1300px" top="50px" center>
                        <!--<span class="remind">菜单项目最多可选择 <b>17</b>项，您已选择：<b>{{Num}}</b></span>-->

                        <div class="items cf" v-if="items2.isShowCostSheet || items2.isShowReimbursementList">
                            <span class="items-tit">报销</span>
                            <!--费用-->
                            <div class="checkbox" v-if="items2.isShowCostSheet">
                                <el-checkbox v-model="items1.costSheet" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[0].src alt="" class="itemImg">
                                    <span class="name">{{items[0].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--报销-->
                            <div class="checkbox" v-if="items2.isShowReimbursementList">
                                <el-checkbox v-model="items1.ReimbursementList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[1].src alt="" class="itemImg">
                                    <span class="name">{{items[1].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowLoan">
                            <span class="items-tit">借款</span>
                            <!--费用-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.loan" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[2].src alt="" class="itemImg">
                                    <span class="name">{{items[2].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowPurchaseList || items2.isShowSupplierList">
                            <span class="items-tit">采购</span>
                            <!--采购单-->
                            <div class="checkbox" v-if="items2.isShowPurchaseList">
                                <el-checkbox v-model="items1.PurchaseList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[3].src alt="" class="itemImg">
                                    <span class="name">{{items[3].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--交易方-->
                            <div class="checkbox" v-if="items2.isShowSupplierList">
                                <el-checkbox v-model="items1.SupplierList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[5].src alt="" class="itemImg">
                                    <span class="name">{{items[5].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowSaleList || items2.isShowStockList" >
                            <span class="items-tit">销售</span>
                            <!--销售单-->
                            <div class="checkbox" v-if="items2.isShowSaleList">
                                <el-checkbox v-model="items1.saleList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[4].src alt="" class="itemImg">
                                    <span class="name">{{items[4].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--库存商品-->
                            <div class="checkbox" v-if="items2.isShowStockList">
                                <el-checkbox v-model="items1.stockList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[6].src alt="" class="itemImg">
                                    <span class="name">{{items[6].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowPayroll">
                            <span class="items-tit">工资</span>
                            <!--工资单-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.payroll" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[7].src alt="" class="itemImg">
                                    <span class="name">{{items[7].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowBankList || items2.isShowBankMoneyList">
                            <span class="items-tit">银行业务</span>
                            <!--银行账户-->
                            <div class="checkbox" v-if="items2.isShowBankList">
                                <el-checkbox v-model="items1.bankList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[8].src alt="" class="itemImg">
                                    <span class="name">{{items[8].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--银行现金业务-->
                            <div class="checkbox" v-if="items2.isShowBankMoneyList">
                                <el-checkbox v-model="items1.bankMoneyList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[9].src alt="" class="itemImg">
                                    <span class="name">{{items[9].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowTaxationList">
                            <span class="items-tit">税费缴纳</span>
                            <!--税费缴纳-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.TaxationList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[10].src alt="" class="itemImg">
                                    <span class="name">{{items[10].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowFixedAssetsList || items2.isShowIntangibleAssetsList">
                            <span class="items-tit">资产</span>
                            <!--固定资产-->
                            <div class="checkbox" v-if="items2.isShowFixedAssetsList">
                                <el-checkbox v-model="items1.fixedAssetsList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[11].src alt="" class="itemImg">
                                    <span class="name">{{items[11].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--无形资产-->
                            <div class="checkbox" v-if="items2.isShowIntangibleAssetsList">
                                <el-checkbox v-model="items1.intangibleAssetsList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[12].src alt="" class="itemImg">
                                    <span class="name">{{items[12].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowProjectList">
                            <span class="items-tit">项目管理</span>
                            <!--项目-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.projectList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[13].src alt="" class="itemImg">
                                    <span class="name">{{items[13].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowDevelop || items2.isShowSummary || items2.isShowCostCollection || items2.isShowEntrust">
                            <span class="items-tit">研发辅助账</span>
                            <!--自主研发辅助账-->
                            <div class="checkbox" v-if="items2.isShowDevelop">
                                <el-checkbox v-model="items1.develop" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[14].src alt="" class="itemImg">
                                    <span class="name">{{items[14].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--辅助账汇总表-->
                            <div class="checkbox" v-if="items2.isShowSummary">
                                <el-checkbox v-model="items1.summary" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[15].src alt="" class="itemImg">
                                    <span class="name">{{items[15].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--研发支出辅助账-->
                            <div class="checkbox" v-if="items2.isShowCostCollection">
                                <el-checkbox v-model="items1.costCollection" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[16].src alt="" class="itemImg">
                                    <span class="name">{{items[16].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--委托研发辅助账-->
                            <div class="checkbox" v-if="items2.isShowEntrust">
                                <el-checkbox v-model="items1.Entrust" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[38].src alt="" class="itemImg">
                                    <span class="name">{{items[38].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowInitialization || items2.isShowVoucherList || items2.isShowMonthlyKnot
                        || items2.isShowGeneralLedger || items2.isShowDetailAccount || items2.isShowSubjectBalance || items2.isShowAuxiliarySubjectBalance
                        || items2.isShowCashDayAccount || items2.isShowBankJournal">
                            <span class="items-tit">账务处理</span>
                            <!--账务处理-->
                            <div class="checkbox" v-if="items2.isShowInitialization">
                                <el-checkbox v-model="items1.Initialization" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[17].src alt="" class="itemImg">
                                    <span class="name">{{items[17].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--凭证-->
                            <div class="checkbox" v-if="items2.isShowVoucherList">
                                <el-checkbox v-model="items1.voucherList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[18].src alt="" class="itemImg">
                                    <span class="name">{{items[18].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--月结-->
                            <div class="checkbox" v-if="items2.isShowMonthlyKnot">
                                <el-checkbox v-model="items1.monthlyKnot" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[19].src alt="" class="itemImg">
                                    <span class="name">{{items[19].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--总账-->
                            <div class="checkbox" v-if="items2.isShowGeneralLedger">
                                <el-checkbox v-model="items1.generalLedger" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[20].src alt="" class="itemImg">
                                    <span class="name">{{items[20].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--明细账-->
                            <div class="checkbox" v-if="items2.isShowDetailAccount">
                                <el-checkbox v-model="items1.detailAccount" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[21].src alt="" class="itemImg">
                                    <span class="name">{{items[21].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--科目余额-->
                            <div class="checkbox" v-if="items2.isShowSubjectBalance">
                                <el-checkbox v-model="items1.subjectBalance" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[22].src alt="" class="itemImg">
                                    <span class="name">{{items[22].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--辅助科目余额-->
                            <div class="checkbox" v-if="items2.isShowAuxiliarySubjectBalance">
                                <el-checkbox v-model="items1.auxiliarySubjectBalance" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[23].src alt="" class="itemImg">
                                    <span class="name">{{items[23].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--现金日记账-->
                            <div class="checkbox" v-if="items2.isShowCashDayAccount">
                                <el-checkbox v-model="items1.cashDayAccount" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[24].src alt="" class="itemImg">
                                    <span class="name">{{items[24].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--银行存款日记账-->
                            <div class="checkbox" v-if="items2.isShowBankJournal">
                                <el-checkbox v-model="items1.bankJournal" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[25].src alt="" class="itemImg">
                                    <span class="name">{{items[25].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowAuxiliaryList">
                            <span class="items-tit">辅助业务</span>
                            <!--辅助业务-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.auxiliaryList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[26].src alt="" class="itemImg">
                                    <span class="name">{{items[26].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowLRBeport || items2.isShowZCFZReport || items2.isShowXJLLeport">
                            <span class="items-tit">报表</span>
                            <!--资产负债表-->
                            <div class="checkbox" v-if="items2.isShowZCFZReport">
                                <el-checkbox v-model="items1.ZCFZReport" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[27].src alt="" class="itemImg">
                                    <span class="name">{{items[27].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--现金流量表-->
                            <div class="checkbox" v-if="items2.isShowXJLLeport">
                                <el-checkbox v-model="items1.XJLLeport" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[28].src alt="" class="itemImg">
                                    <span class="name">{{items[28].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--利润表-->
                            <div class="checkbox" v-if="items2.isShowLRBeport">
                                <el-checkbox v-model="items1.LRBeport" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[29].src alt="" class="itemImg">
                                    <span class="name">{{items[29].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowRedFlush">
                            <span class="items-tit">红冲业务</span>
                            <!--红冲-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.RedFlush" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[30].src alt="" class="itemImg">
                                    <span class="name">{{items[30].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowStaffList || items2.isShowDepartmentList || items2.isShowAddBoss">
                            <span class="items-tit">账套管理</span>
                            <!--员工列表-->
                            <div class="checkbox" v-if="items2.isShowStaffList">
                                <el-checkbox v-model="items1.staffList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[31].src alt="" class="itemImg">
                                    <span class="name">{{items[31].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--部门列表-->
                            <div class="checkbox" v-if="items2.isShowDepartmentList">
                                <el-checkbox v-model="items1.departmentList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[32].src alt="" class="itemImg">
                                    <span class="name">{{items[32].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--添加老板-->
                            <div class="checkbox" v-if="items2.isShowAddBoss">
                                <el-checkbox v-model="items1.addBoss" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[34].src alt="" class="itemImg">
                                    <span class="name">{{items[34].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowCollection">
                            <span class="items-tit">收容业务</span>
                            <!--收容业务列表-->
                            <div class="checkbox" v-if="items2.isShowCollection">
                                <el-checkbox v-model="items1.collectionList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[33].src alt="" class="itemImg">
                                    <span class="name">{{items[33].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="items2.isShowInvoiceDeduction">
                            <span class="items-tit">发票</span>
                            <!--发票-->
                            <div class="checkbox" v-if="items2.isShowInvoiceDeduction">
                                <el-checkbox v-model="items1.invoiceDeduction" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[35].src alt="" class="itemImg">
                                    <span class="name">{{items[35].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="user_type > 0 && current_book_level == 3">
                            <span class="items-tit">记账</span>
                            <!--录单-->
                            <div class="checkbox" v-if="items2.isShowRecordSheet">
                                <el-checkbox v-model="items1.recordSheet" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[36].src alt="" class="itemImg">
                                    <span class="name">{{items[36].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--记账-->
                            <div class="checkbox" v-if="items2.isShowBookkeeping">
                                <el-checkbox v-model="items1.bookkeeping" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[37].src alt="" class="itemImg">
                                    <span class="name">{{items[37].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <div class="items cf" v-if="user_type > 0 && current_book_level == 3">
                            <span class="items-tit">进销存</span>
                            <!--交易方-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.SupplierList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[5].src alt="" class="itemImg">
                                    <span class="name">{{items[5].name}}</span>
                                </el-checkbox>
                            </div>
                            <!--库存商品-->
                            <div class="checkbox">
                                <el-checkbox v-model="items1.stockList" class="homePage-checkbox" @change="checkboxChange">
                                    <img :src=items[6].src alt="" class="itemImg">
                                    <span class="name">{{items[6].name}}</span>
                                </el-checkbox>
                            </div>
                        </div>

                        <el-button @click="seeBack" class="newBack" size="small">返回</el-button>
                        <el-button @click="seeSave" class="newSave" size="small" type="primary">保存</el-button>
                    </el-dialog>
                </el-row>
            </div>
        </div>
        <!--右边咨询-->
        <div class="right">
            <div class="tool">
                <nav class="tool-tit">资讯</nav>
                <ul v-if="toolList.length != 0" class="tool-list cf">
                    <li v-for="item in toolList" class="tool-list-item">
                        <a :href=item.news_url target="_blank" class="tool-uri cf">
                            <img :src=item.news_title_uri alt="" class="tool-img">
                            <span class="tool-title">{{item.news_title}}</span>
                        </a>
                    </li>
                </ul>
                <span v-else class="nothingNews">暂无资讯</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import Muuri from 'muuri'
    import hammer from '../../../static/js/hammer.min.js'
    import animations from '../../../static/js/web-animations.min.js'
    import addUrl from '../../../static/js/addUrl'
    import { mapState } from 'vuex'
    import store from '@/vuex/store'
    export default {
        name: 'homePage',
        data () {
            return {
                activeItems: [],//桌面模块位置参数
                ReimbursementItem:[],//报销模块
                authJson:{},//功能权限
                grid:'',
                Num:0,
                dialogSseTableVisible:false,//是否开启修改菜单模态框
                items:[
                    {
                        name:'费用单',
                        id:'#costSheet',
                        src:'static/images/homePage/costSheet.png',
                    },
                    {
                        name:'报销单',
                        id:'#ReimbursementList',
                        src:'static/images/homePage/ReimbursementList.png',
                    },
                    {
                        name:'借款单',
                        id:'#loan',
                        src:'static/images/homePage/loan.png',
                    },
                    {
                        name:'采购单',
                        id:'#PurchaseList',
                        src:'static/images/homePage/PurchaseList.png',
                    },
                    {
                        name:'销售单',
                        id:'#saleList',
                        src:'static/images/homePage/saleList.png',
                    },
                    {
                        name:'交易方',
                        id:'#SupplierList',
                        src:'static/images/homePage/SupplierList.png',
                    },
                    {
                        name:'库存商品',
                        id:'#stockList',
                        src:'static/images/homePage/stockList.png',
                    },
                    {
                        name:'工资单',
                        id:'#payroll',
                        src:'static/images/homePage/payroll.png',
                    },
                    {
                        name:'银行账户',
                        id:'#bankList',
                        src:'static/images/homePage/bankList.png',
                    },
                    {
                        name:'银行现金业务',
                        id:'#bankMoneyList',
                        src:'static/images/homePage/bankMoneyList.png',
                    },
                    {
                        name:'税费缴纳',
                        id:'#TaxationList',
                        src:'static/images/homePage/TaxationList.png',
                    },
                    {
                        name:'固定资产',
                        id:'#fixedAssetsList',
                        src:'static/images/homePage/fixedAssetsList.png',
                    },
                    {
                        name:'无形资产',
                        id:'#intangibleAssetsList',
                        src:'static/images/homePage/intangibleAssetsList.png',
                    },
                    {
                        name:'项目',
                        id:'#projectList',
                        src:'static/images/homePage/projectList.png',
                    },
                    {
                        name:'自主研发辅助账',
                        id:'#develop',
                        src:'static/images/homePage/develop.png',
                    },
                    {
                        name:'辅助账汇总表',
                        id:'#summary',
                        src:'static/images/homePage/summary.png',
                    },
                    {
                        name:'费用情况归集表',
                        id:'#costCollection',
                        src:'static/images/homePage/costCollection.png',
                    },
                    {
                        name:'账务处理',
                        id:'#Initialization',
                        src:'static/images/homePage/Initialization.png',
                    },
                    {
                        name:'凭证',
                        id:'#voucherList',
                        src:'static/images/homePage/voucherList.png',
                    },
                    {
                        name:'月结',
                        id:'#monthlyKnot',
                        src:'static/images/homePage/monthlyKnot.png',
                    },
                    {
                        name:'总账',
                        id:'#generalLedger',
                        src:'static/images/homePage/generalLedger.png',
                    },
                    {
                        name:'明细账',
                        id:'#detailAccount',
                        src:'static/images/homePage/detailAccount.png',
                    },
                    {
                        name:'科目余额',
                        id:'#subjectBalance',
                        src:'static/images/homePage/subjectBalance.png',
                    },
                    {
                        name:'辅助科目余额',
                        id:'#auxiliarySubjectBalance',
                        src:'static/images/homePage/auxiliarySubjectBalance.png',
                    },
                    {
                        name:'现金日记账',
                        id:'#cashDayAccount',
                        src:'static/images/homePage/cashDayAccount.png',
                    },
                    {
                        name:'银行存款日记账',
                        id:'#bankJournal',
                        src:'static/images/homePage/bankJournal.png',
                    },
                    {
                        name:'辅助业务',
                        id:'#auxiliaryList',
                        src:'static/images/homePage/auxiliaryList.png',
                    },
                    {
                        name:'资产负债表',
                        id:'#ZCFZReport',
                        src:'static/images/homePage/ZCFZReport.png',
                    },
                    {
                        name:'现金流量表',
                        id:'#XJLLeport',
                        src:'static/images/homePage/XJLLeport.png',
                    },
                    {
                        name:'利润表',
                        id:'#LRBeport',
                        src:'static/images/homePage/LRBeport.png',
                    },
                    {
                        name:'红冲',
                        id:'#RedFlush',
                        src:'static/images/homePage/RedFlush.png',
                    },
                    {
                        name:'员工列表',
                        id:'#staffList',
                        src:'static/images/homePage/staffList.png',
                    },
                    {
                        name:'部门列表',
                        id:'#departmentList',
                        src:'static/images/homePage/departmentList.png',
                    },
                    {
                        name:'收容业务列表',
                        id:'#collectionList',
                        src:'static/images/homePage/collectionList.png',
                    },
                    {
                        name:'添加老板',//34
                        id:'#addBoss',
                        src:'static/images/homePage/addBoss.png',
                    },
                    {
                        name:'发票抵扣',//35
                        id:'#invoiceDeduction',
                        src:'static/images/homePage/invoiceDeduction.png',
                    },
                    {
                        name:'录单',//36
                        id:'#recordSheet',
                        src:'static/images/homePage/recordSheet.png',
                    },
                    {
                        name:'记账',//37
                        id:'#bookkeeping',
                        src:'static/images/homePage/bookkeeping.png',
                    },
                    {
                        name:'委托研发辅助账',//38
                        id:'#Entrust',
                        src:'static/images/homePage/Entrust.png',
                    },
                ],//菜单列表数据
                items1:{
                    costSheet:false,
                    ReimbursementList:false,
                    loan:false,
                    PurchaseList:false,
                    SupplierList:false,
                    saleList:false,
                    stockList:false,
                    payroll:false,
                    bankList:false,
                    bankMoneyList:false,
                    TaxationList:false,
                    fixedAssetsList:false,
                    intangibleAssetsList:false,
                    projectList:false,
                    Initialization:false,
                    voucherList:false,
                    monthlyKnot:false,
                    generalLedger:false,
                    detailAccount:false,
                    subjectBalance:false,
                    auxiliarySubjectBalance:false,
                    cashDayAccount:false,
                    bankJournal:false,
                    auxiliaryList:false,
                    ZCFZReport:false,
                    XJLLeport:false,
                    LRBeport:false,
                    RedFlush:false,
                    staffList:false,
                    departmentList:false,
                    develop:false,
                    summary:false,
                    costCollection:false,
                    collectionList:false,
                    addBoss:false,
                    invoiceDeduction:false,
                    recordSheet:false,
                    bookkeeping:false,
                    Entrust:false,
                },//判断这个模块是否在桌面显示
                items2:{
                    isShowLoan:false,
                    isShowPurchaseList:false,
                    isShowSupplierList:false,
                    isShowSaleList:false,
                    isShowStockList:false,
                    isShowPayroll:false,
                    isShowBankList:false,
                    isShowBankMoneyList:false,
                    isShowTaxationList:false,
                    isShowFixedAssetsList:false,
                    isShowIntangibleAssetsList:false,
                    isShowProjectList:false,
                    isShowInitialization:false,
                    isShowVoucherList:false,
                    isShowMonthlyKnot:false,
                    isShowGeneralLedger:false,
                    isShowDetailAccount:false,
                    isShowSubjectBalance:false,
                    isShowAuxiliarySubjectBalance:false,
                    isShowCashDayAccount:false,
                    isShowBankJournal:false,
                    isShowAuxiliaryList:false,
                    isShowZCFZReport:false,
                    isShowXJLLeport:false,
                    isShowLRBeport:false,
                    isShowRedFlush:false,
                    isShowCostSheet:false,
                    isShowStaffList:false,
                    isShowReimbursementList:false,
                    isShowDepartmentList:false,
                    isShowDevelop:false,
                    isShowCostCollection:false,
                    isShowSummary:false,
                    isShowCollection:false,
                    isShowAddBoss:false,
                    isShowInvoiceDeduction:false,
                    isShowRecordSheet:false,
                    isShowBookkeeping:false,
                    isShowEntrust:false,
                },//判断这个模块是否在菜单中显示（身份不同显示的模块不同）
                isFirst:true,//计数器，判断menuArr这个公共参数是否有值
                newsList:[],//消息列表
                toolList:[],//咨询列表
                clientX:'',//mousedown鼠标x位置
                clientY:'',//mousedown鼠标y位置
                //日历状态
                attrs:[
                    {
                        key: 'today',
                        highlight: {
                            backgroundColor: '#ff8080',
                        },
                        contentStyle: {//被选中的日期文字颜色设置
                            color: '#fafafa',
                        },
                        dates: new Date()
                    }
                ],
                isSave:false,//是否显示保存按钮
                loading:true,
            }
        },
        watch:{
            menuArr:function(val){//判断一下首页获取接口是否调用成功，如果成功执行函数
                if(this.isFirst){//如果isFirst为true时，说明首页公共参数刚刚获取到，则调用startMuuri()方法
                    this.startMuuri();
                }
            }
        },
        computed:mapState(['menuArr','auth_json','user_type','current_book_level','account_type']),
        methods:{
            //选择菜单配置的时候的change事件
            checkboxChange(e){
                let items = this.items1;
                let Num = 0
                for(let i in items){
                    if(items[i]){
                        Num++
                    }
                }
                this.Num = Num
            },
            //通过判断用户是点击模块还是拖动模块，来解决在FF览器拖动后直接进入链接问题
            //桌面模块mouseup事件
            mouseup(id,e){
                let nowClientX = e.clientX;
                let nowClientY = e.clientY;
                if(Math.abs(nowClientX - this.clientX) < 5 && Math.abs(nowClientY - this.clientY) < 5){
                    if(id == 'loan'){
                        this.$router.push('/loan/loan')
                    }else if(id == 'costSheet'){
                        this.$router.push('/Reimbursement/costSheet')
                    }else if(id == 'ReimbursementList'){
                        this.$router.push('/Reimbursement/ReimbursementList')
                    }else if(id == 'payroll'){
                        this.$router.push('/Payroll/payroll')
                    }else if(id == 'SupplierList'){
                        this.$router.push('/Purchase/SupplierList')
                    }else if(id == 'PurchaseList'){
                        this.$router.push('/Purchase/PurchaseList')
                    }else if(id == 'saleList'){
                        this.$router.push('/Sale/saleList')
                    }else if(id == 'fixedAssetsList'){
                        this.$router.push('/Assets/fixedAssetsList')
                    }else if(id == 'intangibleAssetsList'){
                        this.$router.push('/Assets/intangibleAssetsList')
                    }else if(id == 'projectList'){
                        this.$router.push('/project/projectList')
                    }else if(id == 'bankList'){
                        this.$router.push('/bank/bankList')
                    }else if(id == 'bankMoneyList'){
                        this.$router.push('/bank/bankMoneyList')
                    }else if(id == 'ZCFZReport'){
                        this.$router.push('/Report/ZCFZReport')
                    }else if(id == 'LRBeport'){
                        this.$router.push('/Report/LRBeport')
                    }else if(id == 'XJLLeport'){
                        this.$router.push('/Report/XJLLeport')
                    }else if(id == 'TaxationList'){
                        this.$router.push('/Taxation/TaxationList')
                    }else if(id == 'Initialization'){
                        this.$router.push('/AccountingTreatment/Initialization')
                    }else if(id == 'voucherList'){
                        this.$router.push('/AccountingTreatment/voucherList')
                    }else if(id == 'monthlyKnot'){
                        this.$router.push('/AccountingTreatment/monthlyKnot')
                    }else if(id == 'generalLedger'){
                        this.$router.push('/AccountingTreatment/generalLedger')
                    }else if(id == 'detailAccount'){
                        this.$router.push('/AccountingTreatment/detailAccount')
                    }else if(id == 'subjectBalance'){
                        this.$router.push('/AccountingTreatment/subjectBalance')
                    }else if(id == 'cashDayAccount'){
                        this.$router.push('/AccountingTreatment/cashDayAccount')
                    }else if(id == 'bankJournal'){
                        this.$router.push('/AccountingTreatment/bankJournal')
                    }else if(id == 'auxiliarySubjectBalance'){
                        this.$router.push('/AccountingTreatment/auxiliarySubjectBalance')
                    }else if(id == 'RedFlush'){
                        this.$router.push('/RedFlush/RedFlush')
                    }else if(id == 'staffList'){
                        this.$router.push('/AccountManagement/staffList')
                    }else if(id == 'departmentList'){
                        this.$router.push('/AccountManagement/departmentList')
                    }else if(id == 'stockList'){
                        this.$router.push('/Sale/stockList')
                    }else if(id == 'auxiliaryList'){
                        this.$router.push('/auxiliary/auxiliaryList')
                    }else if(id == 'develop'){
                        let develop = addUrl.addUrl('develop')
                        window.open(develop);
                    }else if(id == 'summary'){
                        let summary = addUrl.addUrl('summary')
                        window.open(summary);
                    }else if(id == 'costCollection'){
                        let costCollection = addUrl.addUrl('costCollection');
                        window.open(costCollection);
                    }else if(id == 'Entrust'){
                        let Entrust = addUrl.addUrl('Entrust');
                        window.open(Entrust);
                    }else if(id == 'collectionList'){
                        this.$router.push('/Collection/collectionList')
                    }else if(id == 'addBoss'){
                        let addBoss = addUrl.addUrl('addBoss');
                        window.open(addBoss);
                    }else if(id == 'invoiceDeduction'){
                        let invoiceDeduction = addUrl.addUrl('invoiceDeduction');
                        window.open(invoiceDeduction);
                    }else if(id == 'recordSheet'){
                        let recordSheet = addUrl.addUrl('recordSheet');
                        window.open(recordSheet);
                    }else if(id == 'bookkeeping'){
                        let bookkeeping = addUrl.addUrl('bookkeeping');
                        window.open(bookkeeping);
                    }
                }else{
                    this.isSave = true;
                }
            },
            //桌面模块mousedown事件
            mousedown(e){
                this.clientX = e.clientX
                this.clientY = e.clientY
            },
            //消息点击事件
            newsIngress(type,relationId,newsId){
                if(type == '8'|| type == '9'|| type == '12' || type == '14' || type == '18'
                    || type == '20' || type == '24' || type == '26' || type == '28' || type == '31'
                    || type == '33' || type == '35' || type == '37' || type == '39' || type == '42' || type == '44'){
//                    判断是否需要调取读取消息接口
                    let params = new URLSearchParams();
                    let url = addUrl.addUrl('newsListRead')
                    params.append('noticeId',newsId);
                    axios.post(url,params)
                        .then(response=> {
//                            console.log(response);
                        })
                }
                if(type == '5'){
                    //借款单审批
                    this.$router.push({name:'loanSheetApproval',params:{debitId:relationId}})
                }else if(type == '6'){
                    //借款单确认
                    this.$router.push({name:'loanConfirmation',params:{debitId:relationId}})
                }else if(type == '7'){
                    //还款单确认
                    this.$router.push({name:'repaymentConfirmation',params:{debitId:relationId}})
                }else if(type == '8'){
                    //借款单通知提交人
                    this.$router.push({name:'seeLoan',params:{debitId:relationId}})
                }else if(type == '9'){
                    //还款单通知提交人
                    this.$router.push({name:'repayment',params:{debitId:relationId,isRedFlush:true}})
                }else if(type == '10'){
                    //员工报销单审核
                    this.$router.push({name:'ReimbursementApproval',params:{debitId:relationId}})
                }else if(type == '11'){
                    //员工报销单出纳确认
                    this.$router.push({name:'ReimbursementConfirmation',params:{debitId:relationId}})
                }else if(type == '12'){
                    //报销单通知提交人
                    this.$router.push({name:'seeReimbursement',params:{debitId:relationId}})
                }else if(type == '13'){
                    //采购单审核
                    this.$router.push({name:'approvalPurchase',params:{debitId:relationId}})
                }else if(type == '14'){
                    //采购单通知提交人
                    this.$router.push({name:'seePurchase',params:{debitId:relationId}})
                }else if(type == '15'){
                    //采购付款单财务负责人审核
                    this.$router.push({name:'approvalPurchasePay',params:{debitId:relationId}})
                }else if(type == '17'){
                    //采购付款单出纳审核
                    this.$router.push({name:'approvalPurchaseConfirm',params:{debitId:relationId}})
                }else if(type == '18'){
                    //采购付款单通知提交人
                    this.$router.push({name:'seePurchasePayment',params:{debitId:relationId,isRedFlush:true}})
                }else if(type == '19'){
                    //销售单审核
                    this.$router.push({name:'approvalSale',params:{debitId:relationId}})
                }else if(type == '20'){
                    //销售单通知提交人
                    this.$router.push({name:'seeSale',params:{debitId:relationId}})
                }else if(type == '21'){
                    //销售收款单财务负责人审核
                    this.$router.push({name:'approvalSalePay',params:{debitId:relationId}})
                }else if(type == '23'){
                    //销售收款单公司出纳审核
                    this.$router.push({name:'approvalSaleConfirm',params:{debitId:relationId}})
                }else if(type == '24'){
                    //销售收款单通知提交人
                    this.$router.push({name:'seeSalePayment',params:{debitId:relationId,isRedFlush:true}})
                }else if(type == '25'|| type == '30'||type == '32'||type == '34'||type == '36'||type == '38'){
                    //银行业务审核
                    this.$router.push({name:'approvalBank',params:{debitId:relationId}})
                }else if(type == '26'|| type == '31'||type == '33'||type == '35'||type == '37'||type == '39'){
                    //银行业务通知本人
                    this.$router.push({name:'seeBankMoney',params:{debitId:relationId}})
                }else if(type == '41'){
                    //辅助科目审核
                    this.$router.push({name:'approvalAuxiliary',params:{debitId:relationId}})
                }else if(type == '42'){
                    //辅助科目业务单通知提交人
                    this.$router.push({name:'seeAuxiliary',params:{debitId:relationId}})
                }else if(type == '43'){
                    //辅助科目业务收付款审核
                    this.$router.push({name:'approvalPayments',params:{debitId:relationId,isShow:1}})
                }else if(type == '44'){
                    //辅助科目业务收付款通知提交人
                    this.$router.push({name:'approvalPayments',params:{debitId:relationId,isShow:2}})
                }

            },
            //模态框保存按钮
            seeSave(){
//                if(this.Num > 17){
//                    this.$message.error('菜单项目最多可选择17项')
//                    return
//                }
                this.grid.hide(this.changeElement(this.activeItems));//先将所有模块隐藏掉
                let items = this.items1;
                let activeItems = []
                //遍历items1 把所有已选择的放入新数组，在桌面展示
                for(let i in items){
                    if(items[i]){
                        activeItems.push('#' + i)
                    }
                }
                this.activeItems = activeItems
                this.grid.show(this.changeElement(this.activeItems));
                this.dialogSseTableVisible = false
                this.isSave = false;
                this.saveClick()
            },
            //模态框返回按钮
            seeBack(){
                this.dialogSseTableVisible = false
            },
//          将id数组转换成元素数组
            changeElement(arr){
                let newArr = [];
                for(let i in arr){
                    newArr.push(document.querySelector(arr[i]))
                }
                return newArr
            },
            //保存接口
            saveClick(){
                this.loading = true;
                let activeItems = this.grid.getItems().filter(function (item) {
                    return item.isActive();
                });
                let obj = {}//vuex公共参数
                let arrId =[];//已显示id 数组类型
                let strId = '';//已显示id 字符串类型
//                console.log(activeItems);
                for(let i in activeItems){
                    arrId.push('#'+ $(activeItems[i]._element).attr('id'))
                }
//                console.log(arrId);
                this.activeItems = arrId

                obj.menuArr = arrId;

                this.$store.commit('add',obj)//将更新的菜单格式存入vuex

                strId = arrId.join(',');//将数组转换成字符串格式存入后台
                var params = new URLSearchParams();
                let url = addUrl.addUrl('changeMenu');
                params.append('menuJson',strId);
                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        if (response.data.status == 200) {
                            this.$message.success('菜单配置保存成功');
                            this.isSave = false;
                        } else if (response.data.status == 400) {
                            let msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
            },
            //更多点击事件
            moveClick(){
                this.dialogSseTableVisible = true;
            },
            //删除桌面模块，参数为模块id
            deleteClick(name){
//                console.log(name);
                let items = this.grid.getItems('active');
                let activeItems = this.activeItems
                if(activeItems.length == 1){
                    this.$message.error('功能模块不能为空')
                }else{
                    for(let i = 0; i < items.length; i++){
                        if(name == items[i]._element.id){
                            this.grid.hide(items[i])
                        }
                    }
                    for(let i in activeItems){
                        if(activeItems[i] == '#'+ name ){
                            activeItems.splice(i,1);
                        }
                    }
                    for(let i in this.items1){
                        if(i == name){
                            this.items1[i] = false
                        }
                    }
                    this.isSave = true;
                }
            },

            //Muuri插件初始化
            startMuuri(){
                let element = document.querySelector('.items');
                let menuArr = this.menuArr
                let auth_json = this.auth_json
                let items = this.items;
                let newMenuArr = [];
                //根据功能权限判断列表中存在的项目而功能权限中却没有时，将不显示在功能中
                for (let i in menuArr) {
                    if (menuArr[i] == '#costSheet' && auth_json.application_chakan == 1 && this.current_book_level != 3) {//费用单
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#ReimbursementList' && auth_json.application_chakan == 1 && this.current_book_level != 3) {//报销单
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#loan' && auth_json.debit_chakan == 1 && this.current_book_level != 3) {//借款单
                        newMenuArr.push(menuArr[i]);
                    }
                    if (menuArr[i] == '#PurchaseList' && auth_json.purchase_chakan == 1 && this.current_book_level != 3) {//采购单
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#saleList' && auth_json.sale_chakan == 1 && this.current_book_level != 3) {//销售单
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#SupplierList' && ((auth_json.purchase_chakan == 1 || auth_json.sale_chakan == 1) || this.current_book_level == 3)) {//交易方
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#stockList' && ((auth_json.purchase_chakan == 1 || auth_json.sale_chakan == 1) || this.current_book_level == 3)) {//库存商品
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#payroll' && auth_json.salary_chakan == 1) {//工资单
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#bankList' && auth_json.bank_chakan == 1) {//银行账户
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#bankMoneyList' && auth_json.bank_chakan == 1) {//银行现金业务
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#TaxationList' && auth_json.payment_chakan == 1) {//税费缴纳
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#fixedAssetsList' && auth_json.assets_chakan == 1) {//固定资产
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#intangibleAssetsList' && auth_json.assets_chakan == 1) {//无形资产
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#projectList' && auth_json.manage_chakan == 1) {//项目
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#develop' && auth_json.accounting_chakan == 1) {//自主研发辅助账
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#summary' && auth_json.accounting_chakan == 1) {//辅助账汇总表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#costCollection' && auth_json.accounting_chakan == 1) {//费用情况归集表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#Entrust' && auth_json.accounting_chakan == 1) {//委托研发辅助账
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#Initialization' && auth_json.accounting_chakan == 1) {//账务处理
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#voucherList' && auth_json.accounting_chakan == 1) {//凭证
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#monthlyKnot' && auth_json.accounting_chakan == 1) {//月结
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#generalLedger' && auth_json.accounting_chakan == 1) {//总账
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#detailAccount' && auth_json.accounting_chakan == 1) {//明细账
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#subjectBalance' && auth_json.accounting_chakan == 1) {//科目余额
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#auxiliarySubjectBalance' && auth_json.accounting_chakan == 1) {//辅助科目余额
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#cashDayAccount' && auth_json.accounting_chakan == 1) {//现金日记账
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#bankJournal' && auth_json.accounting_chakan == 1) {//银行存款日记账
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#auxiliaryList' && auth_json.bank_chakan == 1  && this.current_book_level != 3) {//辅助业务
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#ZCFZReport' && auth_json.report_chakan == 1) {//资产负债表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#LRBeport' && auth_json.report_chakan == 1) {//利润表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#XJLLeport' && auth_json.report_chakan == 1) {//现金流量表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#RedFlush' && auth_json.bank_chakan == 1  && this.current_book_level != 3) {//红冲
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#staffList' && auth_json.manage_chakan == 1 && this.current_book_level != 3) {//员工列表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#departmentList' && auth_json.manage_chakan == 1 &&  this.current_book_level != 3) {//部门列表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#collectionList' && auth_json.payment_chakan == 1) {//收容业务列表
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#addBoss' && this.user_type > 0 && this.current_book_level == 3) {//添加老板
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#invoiceDeduction' && this.user_type > 0 && this.current_book_level == 3) {//发票抵扣
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#recordSheet' && this.user_type > 0 && this.current_book_level == 3) {//录单
                        newMenuArr.push(menuArr[i])
                    }
                    if (menuArr[i] == '#bookkeeping' && this.user_type > 0 && this.current_book_level == 3 && this.account_type > 1) {//记账
                        newMenuArr.push(menuArr[i])
                    }
                }
                //判断功能权限,将无权限的项目隐藏不显示
                if (auth_json.application_chakan == 1 && this.current_book_level != 3) {//费用单
                    this.items2.isShowCostSheet = true;
                } else {
                    this.items2.isShowCostSheet = false;
                }
                if (auth_json.application_chakan == 1 && this.current_book_level != 3) {//报销单
                    this.items2.isShowReimbursementList = true;
                } else {
                    this.items2.isShowReimbursementList = false;
                }
                if (auth_json.debit_chakan == 1 && this.current_book_level != 3) {//借款单
                    this.items2.isShowLoan = true;
                } else {
                    this.items2.isShowLoan = false;
                }
                if ((auth_json.purchase_chakan == 1 || auth_json.sale_chakan == 1 || auth_json.payment_chakan == 1) && this.current_book_level != 3) {//交易方
                    this.items2.isShowSupplierList = true;
                } else {
                    this.items2.isShowSupplierList = false;
                }
                if ((auth_json.purchase_chakan == 1 || auth_json.sale_chakan == 1) && this.current_book_level != 3) {//库存商品
                    this.items2.isShowStockList = true;
                } else {
                    this.items2.isShowStockList = false;
                }


                if (auth_json.purchase_chakan == 1 && this.current_book_level != 3) {//采购单
                    this.items2.isShowPurchaseList = true;
                } else {
                    this.items2.isShowPurchaseList = false;
                }
                if (auth_json.sale_chakan == 1 && this.current_book_level != 3) {//销售单
                    this.items2.isShowSaleList = true;
                } else {
                    this.items2.isShowSaleList = false;
                }
                if (auth_json.salary_chakan == 1) {//工资单
                    this.items2.isShowPayroll = true;
                } else {
                    this.items2.isShowPayroll = false;
                }
                if (auth_json.bank_chakan == 1) {//银行账户、银行现金业务、红冲、辅助业务
                    this.items2.isShowBankList = true;
                    this.items2.isShowBankMoneyList = true;
                } else {
                    this.items2.isShowBankList = false;
                    this.items2.isShowBankMoneyList = false;
                }
                if (auth_json.bank_chakan == 1 && this.current_book_level != 3) {//红冲、辅助业务
                    this.items2.isShowRedFlush = true;
                    this.items2.isShowAuxiliaryList = true;
                } else {
                    this.items2.isShowRedFlush = false;
                    this.items2.isShowAuxiliaryList = false;
                }
                if (auth_json.assets_chakan == 1) {//固定资产、无形资产
                    this.items2.isShowFixedAssetsList = true;
                    this.items2.isShowIntangibleAssetsList = true;
                } else {
                    this.items2.isShowFixedAssetsList = false;
                    this.items2.isShowIntangibleAssetsList = false;
                }
                if (auth_json.manage_chakan == 1) {//项目
                    this.items2.isShowProjectList = true;
                } else {
                    this.items2.isShowProjectList = false;
                }

                if (auth_json.report_chakan == 1) {//资产负债表、现金流量表、利润表
                    this.items2.isShowZCFZReport = true;
                    this.items2.isShowXJLLeport = true;
                    this.items2.isShowLRBeport = true;
                } else {
                    this.items2.isShowZCFZReport = false;
                    this.items2.isShowXJLLeport = false;
                    this.items2.isShowLRBeport = false;
                }
                if (auth_json.payment_chakan == 1) {
                    this.items2.isShowTaxationList = true;
                    this.items2.isShowCollection = true;
                } else {
                    this.items2.isShowTaxationList = false;
                    this.items2.isShowCollection = false;
                }
                if (auth_json.accounting_chakan == 1) {
                    this.items2.isShowInitialization = true;
                    this.items2.isShowVoucherList = true;
                    this.items2.isShowMonthlyKnot = true;
                    this.items2.isShowGeneralLedger = true;
                    this.items2.isShowDetailAccount = true;
                    this.items2.isShowSubjectBalance = true;
                    this.items2.isShowAuxiliarySubjectBalance = true;
                    this.items2.isShowCashDayAccount = true;
                    this.items2.isShowBankJournal = true;
                    this.items2.isShowDevelop = true;
                    this.items2.isShowCostCollection = true;
                    this.items2.isShowSummary = true;
                    this.items2.isShowEntrust = true;
                } else {
                    this.items2.isShowInitialization = false;
                    this.items2.isShowVoucherList = false;
                    this.items2.isShowMonthlyKnot = false;
                    this.items2.isShowGeneralLedger = false;
                    this.items2.isShowDetailAccount = false;
                    this.items2.isShowSubjectBalance = false;
                    this.items2.isShowAuxiliarySubjectBalance = false;
                    this.items2.isShowCashDayAccount = false;
                    this.items2.isShowBankJournal = false;
                    this.items2.isShowDevelop = false;
                    this.items2.isShowCostCollection = false;
                    this.items2.isShowSummary = false;
                    this.items2.isShowEntrust = false;
                }
                if (auth_json.manage_chakan == 1 && this.current_book_level != 3) {
                    this.items2.isShowStaffList = true;
                    this.items2.isShowDepartmentList = true;
                } else {
                    this.items2.isShowStaffList = false;
                    this.items2.isShowDepartmentList = false;
                }

                if (this.user_type > 0 && this.current_book_level == 3) {//是否是代记账判定
                    this.items2.isShowAddBoss = true;
                    this.items2.isShowInvoiceDeduction = true;
                    this.items2.isShowRecordSheet = true;

                    if(this.account_type > 1){//是否显示记账功能
                        this.items2.isShowBookkeeping = true;
                    }else{
                        this.items2.isShowBookkeeping = false;
                    }

                } else {
                    this.items2.isShowAddBoss = false;
                    this.items2.isShowInvoiceDeduction = false;
                    this.items2.isShowRecordSheet = false;
                    this.items2.isShowBookkeeping = false;
                }

//                console.log(newMenuArr,'newMenuArr');
                let newArr = this.changeElement(newMenuArr);
                this.grid = new Muuri(element,{
                    dragEnabled: true,//模块是否可以拖动
                    layoutOnResize: true,//当窗口变化时是否自动触发调整布局
                    sortData: {
                        id: function (item,element) {
//                            console.log(item);
//                            console.log(element);
                            return parseFloat(element.getAttribute('data-id'));
                        }
                    }
                });
                [].slice.call(document.querySelectorAll('.item')).forEach(function (elem) {
                    elem.addEventListener('click', function (e) {

                    });
                });
                this.grid.show(newArr);

                let currentItems = this.grid.getItems();
                let currentItemIds = currentItems.map(function (item) {
                    return $(item.getElement()).attr('data-id')
                });
                let layout = newArr.map(function (item) {
                    return $(item).attr('data-id')
                });;
                let newItems = [];
                let itemId;
                let itemIndex;
//                console.log(currentItems, 'currentItems');//正常顺序的元素
//                console.log(currentItemIds, 'currentItemIds');//我保存的顺序
//                console.log(layout, 'layout');//正常顺序的元素id
                for (var i = 0; i < layout.length; i++) {
                    itemId = layout[i];
                    itemIndex = currentItemIds.indexOf(itemId);

                    if (itemIndex > -1) {
                        newItems.push(currentItems[itemIndex])
                    }
                }
//                console.log(newItems, 'newItems');//最后做出我保存的顺序的元素数组
//                console.log(newMenuArr);
                let items1 = this.items1;
                for(let i in items1){
                    if(newMenuArr.includes('#' + i)){
                        items1[i] = true
                    }
                }

                this.grid.sort(newItems, {layout: 'instant'});
                this.items = items
                this.activeItems = newMenuArr
                this.Num = newMenuArr.length
                this.isFirst = false;
                this.loading = false
            }
        },
        created(){
            let url = addUrl.addUrl('newsList');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    let list = data.list
                    for(let i in list){
                        if(list[i].type == '5'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '借款单审批'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '6'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '借款单确认'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '7'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '还款单确认'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '8'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '借款单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '9'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '还款单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '10'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '报销单审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '11'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '报销单确认'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '12'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '报销单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '13'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '采购单审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '14'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '采购单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '15'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '采购付款单审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '17'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '采购付款单确认'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '18'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '采购付款单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '19'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '销售单审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '20'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '销售单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '21'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '销售收款单审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '23'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '销售收款单确认'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '24'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '销售收款单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '27'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '缴税单审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '28'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '缴税单'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '29'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '缴税单确认'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '25' || list[i].type == '30' ||list[i].type == '32' ||list[i].type == '34' ||list[i].type == '36' ||list[i].type == '38'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '银行业务审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '26'|| list[i].type == '31' ||list[i].type == '33' ||list[i].type == '35' ||list[i].type == '37' ||list[i].type == '39'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '银行业务通知'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '41'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '辅助科目审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '42'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '辅助科目'
                            list[i].personnel = '审批人'
                        }else if(list[i].type == '43'){
                            list[i].state = '待办'
                            list[i].class = 'yellow'
                            list[i].business = '辅助科目收付款审核'
                            list[i].personnel = '提交人'
                        }else if(list[i].type == '44'){
                            if(list[i].notice_status != '2'){
                                list[i].state = '通过'
                                list[i].class = 'green'
                            }else{
                                list[i].state = '驳回'
                                list[i].class = 'red'
                            }
                            list[i].business = '辅助科目收付款'
                            list[i].personnel = '审批人'
                        }
                    }
                    this.newsList = list
                })
            let url2 = addUrl.addUrl('toolList');
            axios.post(url2)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    let list = data.list
                    for(let i in list){
                        if(list[i].news_title.length >= 20){
                            list[i].news_title = list[i].news_title.substring(0,20) + '...'
                        }
                    }
                    this.toolList = list.splice(0,7)
                })
        },
        mounted(){
//            console.log('homePage');
            if(this.menuArr != ''){
                this.isFirst = false;
                this.startMuuri()
            }else{
                this.isFirst = true;
                this.loading = false
            }
        },
        store
    }
</script>

<style scoped>
    .left{
        width:930px;
        padding: 10px;
        float: left;
    }
    .desktop{
        width:930px;
        min-height:240px;
        background-color: #ffffff;
        float: left;
        margin-top: 10px;
        padding-bottom: 20px;
    }
    .desktop .desktop-tit{
        display: inline-block;
        width:910px;
        height: 34px;
        background-color: #eef9fd;
        font-size:20px;
        color: #1a96d4;
        position: relative;
        padding: 5px 10px;
    }
    .desktop .desktop-tit .saveBtn{
        display: inline-block;
        width: 80px;
        height:30px;
        text-align: center;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        top:8px;
        right:90px;
        color: #fff;
        font-size:12px;
        cursor: pointer;
    }
    .desktop .desktop-tit .move1{
        display: inline-block;
        width: 60px;
        height:30px;
        text-align: center;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        top:8px;
        right:20px;
        color: #fff;
        font-size:12px;
        cursor: pointer;
    }
    .nothingNews{
        display: inline-block;
        padding: 10px 30px;
        font-size:18px;
        color: #ccc;
    }
    .news{
        width:445px;
        height:385px;
        background-color: #fff;
        border: 1px solid #ccc;
        margin-right: 10px;
        float: left;
    }
    .news .news-tit{
        display: inline-block;
        height: 22px;
        width:425px;
        background-color: #eef9fd;
        font-size:20px;
        color: #1a96d4;
        position: relative;
        padding: 5px 10px;
    }
    .news .news-list{
        width:435px;
        height:344px;
        display: inline-block;
        overflow-y: auto;
        padding: 5px;
    }

    .news .news-list .yellow{
        display: inline-block;
        width:30px;
        height:20px;
        text-align: center;
        line-height: 20px;
        background-color:#00a0e9;
        color:#fff;
        border-radius: 3px;
        margin-right: 5px;
    }
    .news .news-list .red{
        display: inline-block;
        width:30px;
        height:20px;
        text-align: center;
        line-height: 20px;
        background-color:#eb6100;
        color:#fff;
        border-radius: 3px;
        margin-right: 5px;
    }
    .news .news-list .green{
        display: inline-block;
        width:30px;
        height:20px;
        text-align: center;
        line-height: 20px;
        background-color: #50dab6;
        color:#fff;
        border-radius: 3px;
        margin-right: 5px;
    }
    .news .news-list .news-list-item{
        width:405px;
        cursor: pointer;
        border-bottom:1px dashed #ccc;
        padding: 3px 10px;
    }
    .news .news-list .news-list-item .news-span{
        vertical-align: top;
        width: 160px;
        display: inline-block;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
    }
    .news .news-list .news-money{
        display: inline-block;
        width:112px;
        color: #f50527;
        font-size:14px;
        float: right;
        margin-right: 15px;
        text-align: right;
    }
    .news .news-list .news-tiem{
        display: inline-block;
        width:74px;
        float: right;
    }
    .date{
        width:470px;
        height:385px;
        float: left;
        background-color: #fff;
    }
    .date .date-tit{
        display: inline-block;
        width:449px;
        height: 22px;
        background-color: #eef9fd;
        font-size:20px;
        color: #1a96d4;
        position: relative;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-bottom: none;
    }
    .date .calendar{
        width:471px;
        height:354px;
    }
    .mesa{
        width:900px;
        margin: 0px 10px;
        float: left;
    }
    .right{
        width:240px;
        padding: 10px 0px;
        float: left;
    }
    .right .tool{
        background-color: #fff;
    }
    .right .tool .tool-tit{
        display: inline-block;
        width:220px;
        height: 22px;
        background-color: #eef9fd;
        font-size:20px;
        color: #1a96d4;
        position: relative;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-bottom: none;
    }
    .right .tool .tool-list{
        width:220px;
        padding: 10px 10px;
        border: 1px solid #ccc;
    }
    .right .tool .tool-list .tool-list-item{
        display: inline-block;
        width:220px;
        height:55px;
        padding: 5px 0;
        border-bottom: 1px solid #ccc;
    }
    .right .tool .tool-list .tool-list-item .tool-uri{
        text-decoration: none;
        color: #333;
    }
    .right .tool .tool-list .tool-list-item .tool-img{
        display: inline-block;
        width:50px;
        height:50px;
        float: left;
    }
    .right .tool .tool-list .tool-list-item .tool-title{
        display: inline-block;
        width:155px;
        height:20px;
        padding: 0 5px;
        font-size:14px;
    }
    .right .tool .tool-list .tool-list-item .tool-center{
        display: inline-block;
        width:128px;
        height: 30px;
        padding: 0px 10px;
        overflow: hidden;
        font-size:12px;
        line-height: 15px;
        float: left;
    }
    .addBtn{
        display: inline-block;
        width:30px;
    }
    .addBtn .icon-jia{
        color: #333;
    }
    .item {
        display: none;
        width: 64px;
        height:64px;
        position: absolute;
        margin: 15px;
        z-index: 1;
        background-color: #fff;
        border: 1px solid #ebeaea;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius:5px;
        box-shadow: 3px 3px 7px 0px #ccc;
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
    .item-content .itemLink{
        display: inline-block;
        width:100%;
        height:100%;
        color: #fff;
        text-decoration: none;
        margin: 0 auto;
        outline:none;
    }
    .item-content .itemLink img{
        display: inline-block;
        margin-top: 16px;
    }
    .item-content .itemName{
        display: inline-block;
        width:100px;
        color: #333;
        position: absolute;
        left:-18px;
        bottom: -28px;
    }
    .item .icon-shanchu1{
        display: none;
        position: absolute;
        top:-12px;
        left:45px;
    }
    .item:hover i{
        display: inline-block;
    }
    .mesa .newBack{
        margin-top: 30px;
        margin-left: 1080px;
    }
    .mesa .newSave{
        margin-top: 30px;
    }
    .dialog .checkbox{
        display: inline-block;
        float: left;
    }
    .dialog .homePage-checkbox{
        display: inline-block;
        float: left;
        width: 64px;
        height:64px;
        margin: 20px ;
        background-color: #fff;
        border: 1px solid #ebeaea;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius:5px;
        box-shadow: 3px 3px 7px 0px #ccc;
        text-align: center;
        position: relative;
    }
    .dialog .homePage-checkbox .itemImg{
        margin-top: 10px;
        margin-left: -10px;
    }
    .dialog .homePage-checkbox .name{
        width:90px;
        text-align: center;
        position: absolute;
        bottom:-25px;
        left:-12px;
    }
    .dialog .items{
        display: inline-block;
        float: left;
        border: 1px solid #ebeaea;
        padding: 15px 5px 5px 5px;
        -webkit-border-radius:5px;
        -moz-border-radius:5px;
        border-radius:5px;
        box-shadow: 3px 3px 7px 0px #ccc;
        margin-top: 20px;
        margin-right: 18px;
        position: relative;
    }
    .dialog .items .items-tit{
        position: absolute;
        top:3px;
        left:18px;
        color: #1a96d4;
    }
    .remind{
        display: inline-block;
        width:100%;
        text-align: center;
        font-size:14px;
        color: #333;
    }
</style>
