<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>查看报销单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-show="showBtn1" size="small" type="danger" class="sub1">保存</el-button>
                <el-button @click="model(2)" v-show="showBtn2" size="small" type="primary" class="sub2">提交</el-button>
                <el-button @click="model(3)" v-show="showBtn3" size="small" type="primary" class="sub2">撤回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content">
                <div class="line">
                    <span>查看报销单</span>
                </div>
                <ul class="list">
                    <li class="sm">
                        <span class="tit">报销名称</span>
                        <input class="ipt" type="text" v-model="originalTypeName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">报销日期</span>
                        <el-date-picker
                            class="sel"
                            v-model="simpleReceiptDate"
                            type="date"
                            @change="changeTime"
                            placeholder="选择日期"
                            :disabled="isReadonly">
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit">总金额</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">票据张数</span>
                        <input class="ipt" type="text" v-model="receiptCount" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">报销部门</span>
                        <el-select class="sel" v-model="reimbursementDepartment" placeholder="请选择"  :disabled="isReadonly">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.departmentName"
                                :value="item.idString">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="isShow">
                        <span class="tit">结算方式</span>
                        <el-select class="sel" v-model="payType" placeholder="请选择" >
                            <el-option
                                v-for="item in payTypeList"
                                :key="item.value"
                                :label="item.payTypeItem"
                                :value="item.value"
                                disabled>
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="isShow">
                        <span class="tit"  v-show="isShow">银行账号</span>
                        <input class="ipt" type="text" v-model="bankName" readonly>
                    </li>
                    <li class="sm" v-show="isShow">
                        <span class="tit"  v-show="isShow">付款日期</span>
                        <input class="ipt" type="text" v-model="simpleConfirmDate" readonly>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" :readonly="isReadonly">
                            </textarea>
                    </li>
                </ul>
                <div class="line">
                    <span>消费明细</span>
                </div>
                <el-button type="primary" v-if="showGridDataAdd" @click="addClick" class="gridDataAdd">添加费用单</el-button>

                <el-dialog title="费用列表" :visible.sync="dialogTableVisible" showConfirmButton="true">
                    <el-table :data="gridData" class="blueList">
                        <el-table-column property="idString" label="" align="center" width="30px">
                            <template slot-scope="scope">
                                <span class="checkbox">
                                <input name=checked type="checkbox" :value=scope.row.idString class="inputcheckbox" >
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                            </template>
                        </el-table-column>

                        <el-table-column property="childTypeName" label="类型" align="center"></el-table-column>
                        <el-table-column property="simpleReceiptDate" label="时间"  align="center"></el-table-column>
                        <el-table-column property="discription" label="描述" align="center"></el-table-column>
                        <el-table-column property="operateUserName" label="姓名" align="center"></el-table-column>
                        <el-table-column property="money" label="金额" align="center"></el-table-column>
                    </el-table>
                    <span class="checkbox checkboxAll">
                        <input name=checkAll @change="checkAllChange($event)" type="checkbox" class="inputcheckbox" >
                        <i class="iconfont icon-31xuanze"></i>
                    </span>
                    <span class="all">全选</span>
                    <el-button type="primary" class="saveList" @click="saveList">保存</el-button>
                </el-dialog>

                <el-table class="hkTable grayList" :data="receiptList">
                    <el-table-column prop="childTypeName" label="类型" sortable align="center"></el-table-column>
                    <el-table-column prop="simpleReceiptDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="discription" label="描述" sortable align="center"></el-table-column>
                    <el-table-column prop="operateUserName" label="姓名" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="金额" sortable align="center"></el-table-column>
                    <el-table-column prop="receiptCount" label="附件张数" sortable align="center"></el-table-column>
                    <el-table-column v-if="showGridDataAdd" prop="money" label="操作"  align="center">
                        <template slot-scope="scope">
                            <i class="icon iconfont icon-shanchu red" @click='deleteList(scope.row.idString)'></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in auditRecordList">
                        <img :src="item.auditUserFaceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            ——
                            <span class="listDepartment">{{item.auditDepartmentName}}</span>
                            <span class="listData">{{item.simpleAuditTime}}</span>
                        </div>
                        <div class="listFooter">
                            <span class="listState">意见：</span>
                            <span class="listContent">{{item.discription}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        data () {
            return {
                debitId:this.$route.params.debitId,//传参 ID
                originalTypeName:'',//报销名称
                money:'',//总金额
                simpleConfirmDate:'',//付款日期
                simpleReceiptDate:'',//报销日期
                receiptCount:'',//票据张数
                payType:'',//结算方式
                discription:'',//事由
                reimbursementDepartment:'',//报销部门
                settlementMethod:'',//结算方式
                bankCode:'',//银行账号
                bankName:'',//银行名称
                type:'',

                options:[],//报销部门列表
                payTypeList:[//结算方式列表
                    {value:1,payTypeItem:'现金支付'},
                    {value:2,payTypeItem:'银行支付'}
                ],
                receiptList:[],//消费明细列表
                auditRecordList:[],//审批记录列表
                gridData:[],//费用列表（未选中列表）
                dialogTableVisible: false,//可用的费用单列表状态
                auditFlg:'',//报销单状态： 0 未提交 1 驳回；2/5/6 待审核； 3 待出纳确认；4 通过；7 已红冲；

                originalReceiptIds:'',//费用单id字符串（用逗号拼接）
                originalReceiptIdArr:'',//费用单id字符串（数组形式）
                auditPerson:1,//是否显示撤回按钮  1 不能撤回；0 可以撤回
                isReadonly:false,//判断查看页面状态，是否可以修改信息
                isShow:false,//判断查看页面状态，是否显示 ‘结算日期/银行账号/付款日期’
                showGridDataAdd:false,//判断查看页面状态，是否显示 ‘添加费用单’按钮
                showBtn1: false,//保存按钮是否显示
                showBtn2: false,//提交按钮是否显示
                showBtn3 :false,//撤回按钮是否显示
                loading:true,
            }
        },
        methods:{
            model(n){
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {

                    });
                }else if(n == 1){
                    if(this.debitDate == ''){
                        this.$message.error('请正确输入报销日期');
                        this.loading = false;
                        return
                    }else if(this.type == '' || this.childType1 == ''){
                        this.$message.error('请正确输入费用类别');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确定是否保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(n ==2){
                    if(this.debitDate == ''){
                        this.$message.error('请正确输入报销日期');
                        this.loading = false;
                        return
                    }else if(this.type == '' || this.childType1 == ''){
                        this.$message.error('请正确输入费用类别');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }else if(n == 3){
                    this.$confirm('确定是否撤回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },

            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.debitDate;
                this.debitDate = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
                console.log(this.debitDate);
            },
            submit(){
                this.loading = true;
                var params = new URLSearchParams();
                var url = ''
                console.log(this.debitId);
                console.log(this.discription);
                console.log(this.type);
                console.log(this.money);
                console.log(this.reimbursementDepartment);
                console.log(this.originalReceiptIds);
                console.log(this.originalType);
                console.log(this.simpleReceiptDate);
                if(n == 1){
                    url = 'save'
                    params.append('id',this.debitId);
                    params.append('discription',this.discription);
                    params.append('money',this.money);
                    params.append('department',this.reimbursementDepartment);
                    params.append('applicationDate',this.simpleReceiptDate);
                    params.append('originalReceiptIds',this.originalReceiptIds);
                    params.append('receiptCount',this.receiptCount);
                    params.append('originalType',this.originalType);
                }else if(n == 2){
                    url = 'submit'
                    params.append('id',this.debitId);
                    params.append('discription',this.discription);
                    params.append('money',this.money);
                    params.append('department',this.reimbursementDepartment);
                    params.append('applicationDate',this.simpleReceiptDate);
                    params.append('originalReceiptIds',this.originalReceiptIds);
                    params.append('receiptCount',this.receiptCount);
                    params.append('originalType',this.originalType);
                }else if(n == 3){
                    url = 'back'
                    params.append('applicationId',this.debitId);
                }
                this.originalReceiptIds = this.originalReceiptIdArr.join(',');

                axios.post('http://192.168.2.192:8080/web/vue/application/'+ url + '.html', params)
                    .then(response=> {
                        this.loading = false;
                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '已成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    });
            },
            //删除消费明细列表项
            deleteList(id){
                var list = this.receiptList;
                var arr = this.originalReceiptIdArr;

                //将临时删除的明细项存入临时列表nowList，当添加时将临时列表加入进去
                for(var i=0; i <list.length; i++){
                    if(id == list[i].idString){
                        list.splice(i,1)
                    }
                }
                for(var i = 0; i < arr.length; i++){
                    if(id == arr[i]){
                        arr.splice(i,1)
                    }
                }
                this.receiptList = list;
                this.originalReceiptIdArr = arr;
            },
            //点击添加按钮，弹出费用列表
            addClick(){
                this.loading = true;
                var params = new URLSearchParams();
                params.append('type',this.type);
                axios.post('http://192.168.2.192:8080/web/vue/expense/enableReceiptList.html', params)
                    .then(response=> {
                        this.loading = false;
                        console.log(response);
                        var arr = this.originalReceiptIdArr;
                        var data = response.data.value;

                        for(var i = 0; i < arr.length; i++){
                            for(var ii = 0; ii < data.length; ii++){
                                if(arr[i] == data[ii].idString){
                                    data.splice(ii,1)
                                }
                            }
                        }
                        this.gridData = data;
                        console.log(this.gridData);
                    });
                this.dialogTableVisible = true;
            },
            //全选按钮change事件
            checkAllChange(e){
                var input = $("input[name=checked]")
                var length = $("input[name=checked]:checked").length;
                if(e.target.checked){
                    input.prop('checked', true);
                }else{
                    input.prop('checked', false);
                }
            },
            //费用列表保存按钮
            saveList(){
                var input = $("input[name=checked]:checked");
                var str = this.originalReceiptIdArr;
                var gridData = this.gridData;
                var receiptList = this.receiptList;
                console.log(input);
                console.log(str);
                input.each(function(i){
                    str.push(input[i].value);
                    console.log(str);
                });
                for(var i = 0; i < gridData.length; i++){
                    for(var ii = 0; ii < str.length; ii++){
                        if(gridData[i].idString == str[ii]){
                            receiptList.push(gridData[i])//把删除的元素添加进数组
                            gridData.splice(i,1);//删除元素
                        }
                    }
                }
                this.originalReceiptIdArr = str;
                this.receiptList = receiptList;
                this.gridData = gridData;
                this.dialogTableVisible = false;
            },
        },
        created(){
            console.log(this.debitId);
            var params = new URLSearchParams();
            params.append('id',this.debitId);
            axios.post('http://192.168.2.192:8080/web/vue/application/check.html',params)
                .then(response=> {
                    var data = response.data.value;
                    console.log(data);
                    this.originalTypeName = data.application.originalTypeName
                    this.type = data.application.type
                    this.money = data.application.money
                    this.simpleConfirmDate = data.application.simpleConfirmDate
                    this.simpleReceiptDate = data.application.simpleReceiptDate
                    this.payType = data.application.payType
                    this.receiptCount = data.application.receiptCount
                    this.discription = data.application.discription
                    this.reimbursementDepartment = data.application.departmentIdString
                    this.settlementMethod = data.application.settlementMethod
                    this.auditPerson = data.application.auditPerson
                    this.bankCode = data.application.bankCode
                    this.bankName = data.application.bankName
                    this.auditFlg = data.application.auditFlg

                    this.auditRecordList = data.auditRecordList
                    this.receiptList = data.receiptList
                    this.options = data.departmentList
                    console.log(this.reimbursementDepartment);
                    var receiptList = this.receiptList;
                    var arr = [];
                    for(var i = 0; i < receiptList.length; i++){
                        arr.push(receiptList[i].idString)
                    }
                    this.originalReceiptIdArr = arr;

                    var index= this.auditFlg;

                    //当index 0 未提交 1 驳回； 显示 ‘添加费用单’按钮
                    if(index < 2){
                        this.showGridDataAdd = true;
                        this.showBtn1 = true;
                        this.showBtn2 = true;
                    }else if(index == 4 || index == 7){//当index 4 通过；7 已红冲；显示 ‘结算日期/银行账号/付款日期’
                        this.isShow = true;
                        this.isReadonly = true
                    }else{
                        if(this.auditPerson == 0){
                            this.showBtn3 = true
                        }
                    }

                    this.loading = false;
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
        position: absolute;
        right:30px;
        font-size:12px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
    }
    .list{
        width:100%;
        text-align: left;
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
        height:80px;
    }
    .list .ptx{
        width:100%;
        height:170px;
    }
    .list li .ipt{
        display: inline-block;
        width:300px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .sel{
        width:322px;
        height:36px;
    }
    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list li .tit2{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .list li .tex{
        width:76.8%;
        height:60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .list li .uploadBox{
        display: inline-block;
        width:78.7%;
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
        margin-left: 80px;
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
        text-align: center;
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
    .approval-opinion li .bankCode{
        width:700px;
        height:30px;
        text-align: center;
        border: none;
    }
    .checkbox {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        margin: 10px 0px;
        padding: 0;
        cursor: pointer;
        float: left;
    }

    .checkbox i {
        position: absolute;
        left: -10px;
        top: -2px;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: none;
        font-size:20px;
        color: #1a96d4;
        font-weight: bold;
    }
    .checkbox input {
        position: absolute;
        z-index: 2;
        left: -10px;
        top: -10px;
        width: 200px;
        height: 200px;
        opacity: 0;
        cursor: pointer;
    }

    .checkbox input[type="checkbox"]:checked + i {
        display: block;
    }
    .checkbox.disabled {
        background-color: #ccc;
    }
    .opinionItem #opinionItem{
        display: inline-block;
        width:680px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
    }
    .gridDataAdd{
        display: block;
        margin: 10px;
        float: right;
    }
    .all{
        display: inline-block;
        font-size:16px;
        margin-top: 10px;
        margin-left: -80%;
    }
    .checkboxAll{
        margin: 10px 10px;
    }
    .saveList{
        position: absolute;
        bottom:10px;
        right: 50px;
    }
    .grayList{
        margin: 30px 0;
    }
</style>
