<template>
    <div class="w">
        <el-row class="timer">倒计时器</el-row>
        <el-row>
            <!--左边桌面-->
            <el-col :span="18">
                <div class="desktop">
                    <el-row class="search">
                        <el-input name="search" size="small" placeholder="请输入内容">
                            <el-button class="searchBtn" slot="append">搜索</el-button>
                        </el-input>
                    </el-row>
                    <el-row class="mesa">
                        <div class="item">
                            <div class="item-content">
                                <router-link class="itemLink" to="/loan/loan">
                                    借款单
                                </router-link>
                            </div>
                            <div class="item-content">
                                <router-link class="itemLink" to="/loan/loanApprovalList">
                                    借款单审批列表
                                </router-link>
                            </div>
                            <div class="item-content">
                                <router-link class="itemLink" to="/loan/loanConfirmationList">
                                    借款单确认列表
                                </router-link>
                            </div>
                            <div class="item-content">
                                <router-link class="itemLink" to="/loan/repaymentConfirmationList">
                                    还款单确认列表
                                </router-link>
                            </div>
                            <div class="item-content">
                                <router-link class="itemLink" to="/Reimbursement/costSheet">
                                    费用单
                                </router-link>
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
    import store from '@/vuex/store'
    export default {
        name: 'homePage',
        data () {
            return {
                msg: 'Hello Vuex'
            }
        },
        store
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
        width: 50px;
        height: 50px;
        line-height: 50px;
        margin: 5px;
        z-index: 1;
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
        background: red;
        font-size: 12px;
        color: white;
        cursor: pointer;
    }
    .itemLink{
        width:100%;
        height:100%;
    }
    .item.muuri-item-dragging .item-content {
        background: blue;
    }
    .item.muuri-item-releasing .item-content {
        background: blueViolet;
    }
</style>
