<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>还款单确认</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button  size="small" type="danger" class="sub1">驳回</el-button>
                <el-button  size="small" type="primary" class="sub2">同意</el-button>
            </div>
        </div>
        <div class="ww">
            <div class="w cf">
                <div class="line">
                    <span>还款单</span>
                </div>
                <div class="left">
                    <ul>
                        <li>待还款</li>
                        <li>本次还款</li>
                        <li>还款日期</li>
                    </ul>
                </div>
                <div class="right cf">
                    <ul>
                        <li>
                            <input type="text" class="dhk" name="dhk" id="dhk" v-model="unCreditMoney">
                        </li>
                        <li>
                            <input type="text" class="hk" name="hk" id="hk" v-model="money">
                        </li>
                        <li>
                            <el-date-picker
                                class="data"
                                v-model="nowdata"
                                type="date"
                                @change="changeTime"
                                placeholder="选择日期">
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
                <div class="line">
                    <span>还款明细</span>
                </div>
                <el-table class="hkTable" :data="tableData" style="width: 60%">
                    <el-table-column prop="debitDateYMD" label="日期" sortable width="180"></el-table-column>
                    <el-table-column prop="payType"  label="还款方式" sortable width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 0" ></span>
                            <span v-if="scope.row.payType == 1" >现金支付</span>
                            <span v-if="scope.row.payType == 2" >银行支付</span>
                            <span v-if="scope.row.payType == 3" >暂不支付</span>
                            <span v-if="scope.row.payType == 4" >冲抵个人借款</span>
                            <span v-if="scope.row.payType == 99" >其他货币资金</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="还款金额" sortable></el-table-column>
                    <el-table-column prop="auditFlg" label="还款状态" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0" >未提交</span>
                            <span v-if="scope.row.auditFlg == 1" >驳回</span>
                            <span v-if="scope.row.auditFlg == 2" >审批中</span>
                            <span v-if="scope.row.auditFlg == 3" >待出纳确认</span>
                            <span v-if="scope.row.auditFlg == 4" >待还款</span>
                            <span v-if="scope.row.auditFlg == 5" >待财务负责人审批</span>
                            <span v-if="scope.row.auditFlg == 6" >待企业负责人审批</span>
                            <span v-if="scope.row.auditFlg == 7" >已红冲</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="line">
                    <span>审批意见</span>
                </div>
                <ul class="approval-opinion">
                    <li>
                        <span>结算方式</span>
                        <select name="opinion" id="method">
                            <option value="0">同意</option>
                            <option value="1">驳回</option>
                        </select>
                    </li>
                    <li>
                        <span>银行账户</span>
                        <select name="opinion" id="bank">
                            <option value="0">同意</option>
                            <option value="1">驳回</option>
                        </select>
                    </li>
                    <li>
                        <span>日期</span>
                        <select name="opinion" id="opinionData">
                            <option value="0">同意</option>
                            <option value="1">驳回</option>
                        </select>
                    </li>
                    <li>
                        <span>可选审批意见</span>
                        <select name="opinion" id="opinion">
                            <option value="0">同意</option>
                            <option value="1">驳回</option>
                        </select>
                    </li>
                    <li class="opinionItem">
                        <span>审批意见</span>
                            <textarea name="opinionItem" id="opinionItem" cols="30" rows="10">
                            </textarea>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        }
    }
</script>

<style scoped>
    .w{
        text-align: center;
    }
    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }
    h2{
        font-size:18px;
        display: inline-block;
    }
    .back{
        position: absolute;
        right:20px;
        font-size:12px;
    }
    .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .sub2{
        position: absolute;
        right:190px;
        font-size:12px;
    }
    .left{
        display: inline-block;
        width:30%;
        float: left;
        text-align: right;
        background-color: #fff;
        font-size:16px;
    }
    .right{
        display: inline-block;
        width:70%;
        float: left;
        text-align: left;
        background-color: #fff;
        font-size:16px;
    }
    ul{
        margin-left: 10px;
    }
    ul li{
        height:36px;
        line-height: 36px;
        margin: 20px 0;
    }
    input{
        width:478px;
        height:26px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .data{
        width:500px;
    }
    .el-table{
        margin-top: 30px;
        display: inline-block;
    }
    .approval-opinion{
        font-size:16px;
        margin-top: 30px;
    }
    .approval-opinion li{
        margin-top: 30px;
    }
    .approval-opinion li span{
        display: inline-block;
        width:100px;
        height:22px;
        vertical-align: top;
    }
    .approval-opinion li select{
        display: inline-block;
        width:80%;
        height:30px;
        text-align: center;
        padding: 2px 35%;
        border: none;
        border-bottom: 1px solid #ccc;
    }

    .opinionItem #opinionItem{
        display: inline-block;
        width:80%;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
    }
</style>
