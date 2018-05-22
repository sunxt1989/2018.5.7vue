<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>借款单审批</h2>
                <router-link to="/loan" class="back">返回</router-link>
                <el-button  size="small" type="danger" class="sub1">驳回</el-button>
                <el-button  size="small" type="primary" class="sub2">同意</el-button>
            </div>
        </div>
        <div class="ww">
            <div class="w">
                <div class="content">
                    <div class="line">
                        <span>借款单</span>
                    </div>
                    <ul class="list">
                        <li class="sm">
                            <span class="tit">金额</span>
                            <input class="ipt" type="text" v-model="money" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">已还金额</span>
                            <input class="ipt" type="text" v-model="creditMoney" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">未还金额</span>
                            <input class="ipt" type="text" v-model="unCreditMoney" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">时间</span>
                            <input class="ipt" type="text" v-model="debitDateYMD" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">借款人</span>
                            <input class="ipt" type="text" v-model="userName" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">状态</span>
                            <input class="ipt" type="text" value="未提交" v-if="auditFlg == 0" readonly>
                            <input class="ipt" type="text" value="驳回" v-if="auditFlg == 1" readonly>
                            <input class="ipt" type="text" value="审批中" v-if="auditFlg == 2" readonly>
                            <input class="ipt" type="text" value="待出纳确认" v-if="auditFlg == 3" readonly>
                            <input class="ipt" type="text" value="待还款" v-if="auditFlg == 4" readonly>
                            <input class="ipt" type="text" value="待财务负责人审批" v-if="auditFlg == 5" readonly>
                            <input class="ipt" type="text" value="待企业负责人审批" v-if="auditFlg == 6" readonly>
                            <input class="ipt" type="text" value="已红冲" v-if="auditFlg == 7" readonly>
                        </li>
                        <li class="pt cf">
                            <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" name="" id=""  readonly>
                            </textarea>
                        </li>
                        <li class="pt cf">
                            <span class="tit2">附件</span>
                            <div class="uploadBox">
                                <el-upload
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :file-list="attachUrlJson"
                                    :on-preview="handlePictureCardPreview"
                                    disabled>
                                    <i class="el-icon-plus"></i>
                                </el-upload>

                                <el-upload
                                    v-if="auditFlg == 1"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    list-type="picture-card"
                                    :file-list="attachUrlJson"
                                    :on-preview="handlePictureCardPreview"
                                    disabled>
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                        </li>
                    </ul>
                    <div class="line">
                        <span>审批记录</span>
                    </div>
                    <ul class="approval">
                        <li class="cf" v-for="item in userDebitAuditRecordList">
                            <img :src="item.auditUserFaceUri" alt="">
                            <div class="listHeader">
                                <span class="listName">{{item.auditUserName}}</span>
                                ——
                                <span class="listDepartment">{{item.auditDepartmentName}}</span>
                                <span class="listData">{{item.auditTimeYMDHM}}</span>
                            </div>
                            <div class="listFooter">
                                <span class="listState">意见：</span>
                                <span class="listContent">{{item.discription}}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="line">
                        <span>审批意见</span>
                    </div>
                    <ul class="approval-opinion">
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
        font-size:0px;
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
        display: inline-block;
        width:56px;
        height:32px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        text-decoration: none;
        color: #333;
        position: absolute;
        right: 30px;
    }
    .content{
        width:100%;
        background-color: #fff;
    }
    .list{
        width:100%;
    }
    .list li{
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
    }
    .list .sm{
        width:50%;
    }
    .list .pt{
        width:100%;
    }
    .list li .ipt{
        display: inline-block;
        width:320px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:200px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list li .tit2{
        font-size:14px;
        display: inline-block;
        width:200px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .list li .tex{
        width:76.7%;
        height:60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .list li .uploadBox{
        display: inline-block;
        width:76.7%;
        padding: 3px 10px;
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
    .approval{
        width:100%;
        margin-top: 20px;
        font-size:14px;
    }
    .approval li{
        margin-top: 20px;
        text-align: left;
    }
    .approval li img{
        display: inline-block;
        width:50px;
        height:50px;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-left: 130px;
        margin-right: 20px;
    }
    .approval li .listHeader{
        display: inline-block;
        float: left;
        width:80%;
    }
    .approval li .listHeader .listName{

        margin-right: 10px;
    }
    .approval li .listHeader .listDepartment{
        margin-left: 10px;
    }
    .approval li .listHeader .listData{
        float: right;
    }
    .approval li .listFooter{
        display: inline-block;
        float: left;
        width:80%;
        margin-top: 10px;
    }
    .approval li .listFooter .listState{
        display: inline-block;
        float: left;
        margin-right: 10px;
    }
    .approval li .listFooter .listContent{
        width:90%;
        display: inline-block;
        float: left;
        height:50px;
        overflow: hidden;
    }
    .dialogImageName{
        font-size:16px;
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
