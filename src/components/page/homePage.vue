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
        display: block;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #loanApprovalList {
        display: block;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #loanConfirmationList {
        display: block;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #repaymentConfirmationList {
        display: block;
        background: url("../../../static/images/jiekuandan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #costSheet {
        display: block;
        background: url("../../../static/images/feiyongdan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ReimbursementList {
        display: block;
        background: url("../../../static/images/baoxiaodan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ReimbursementApprovalList {
        display: block;
        background: url("../../../static/images/baoxiaodan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #ReimbursementConfirmationList {
        display: block;
        background: url("../../../static/images/baoxiaodan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #payroll {
        display: block;
        background: url("../../../static/images/gongzidan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #SupplierList {
        display: block;
        background: url("../../../static/images/gongzidan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #PurchaseList {
        display: block;
        background: url("../../../static/images/caigoudan.png") no-repeat 0 0;
        background-size: 100%;
    }
    #approvalPurchaseList {
        display: block;
        background: url("../../../static/images/caigoudan.png") no-repeat 0 0;
        background-size: 100%;
    }

</style>
