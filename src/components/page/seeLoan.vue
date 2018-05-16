<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>查看借款单</h2>
                <router-link to="/loan" class="back">返回</router-link>
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
                            <input class="ipt" type="text" v-model="Amoney" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">未还金额</span>
                            <input class="ipt" type="text" v-model="Umoney" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">时间</span>
                            <input class="ipt" type="text" v-model="data" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">借款人</span>
                            <input class="ipt" type="text" v-model="name" readonly>
                        </li>
                        <li class="sm">
                            <span class="tit">状态</span>
                            <input class="ipt" type="text" v-model="auditFlg" readonly>
                        </li>
                        <li class="pt cf">
                            <span class="tit2">状态</span>
                            <textarea class="tex" v-model="discription" name="" id=""  readonly>
                            </textarea>
                        </li>
                        <li class="pt cf">
                            <span class="tit2">附件</span>
                            <div class="uploadBox">
                                <!--<el-upload-->
                                    <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                    <!--list-type="picture-card"-->
                                    <!--:on-preview="handlePictureCardPreview"-->
                                    <!--:on-remove="handleRemove">-->
                                    <!--<i class="el-icon-plus"></i>-->
                                <!--</el-upload>-->
                                <!--<el-dialog :visible.sync="dialogVisible">-->
                                    <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                                <!--</el-dialog>-->
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
                                ———
                                <span class="listDepartment">{{item.auditDepartmentName}}</span>
                                <span class="listData">{{item.auditTimeYMDHM}}</span>
                            </div>
                            <div class="listFooter">
                                <span class="listState" v-if="item.auditStatus = 0">未提交：</span>
                                <span class="listState" v-else-if="item.auditStatus = 1">驳回：</span>
                                <span class="listState" v-else-if="item.auditStatus = 2">审批中：</span>
                                <span class="listState" v-else-if="item.auditStatus = 3">待出纳确认：</span>
                                <span class="listState" v-else-if="item.auditStatus = 4">通过：</span>
                                <span class="listState" v-else-if="item.auditStatus = 5">待财务负责人审批：</span>
                                <span class="listState" v-else-if="item.auditStatus = 5">待企业负责人审批：</span>
                                <span class="listContent">{{item.discription}}</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    export default{
        name:'seeLoan',
        data(){
            return{
                money:'100',
                Amoney:'50',
                Umoney:'50',
                data:'2018-01-01',
                name:'借款人',
                auditFlg:'待审核',
                discription:'事由',
                debitId:this.$route.params.debitId,
                userDebitAuditRecordList:[],
                loading:true,
            }
        },
        created(){
            var params = new URLSearchParams();
            params.append('debitId',this.debitId);
            axios.post('http://192.168.2.192:8080/web/vue/debit/item/debit/show.html',params)
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;
                    console.log(data);
                    this.userDebitAuditRecordList = data.userDebitAuditRecordList;
                    this.money = data.
                    this.loading = false;
                })
                .catch(error=> {
                    this.loading = false;
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
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

</style>
