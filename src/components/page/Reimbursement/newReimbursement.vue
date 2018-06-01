<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>创建报销单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1">保存</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content ">
                <div class="line">
                    <span>新建报销单</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">报销名称</span>
                        <input class="ipt" type="text" v-model="originalTypeName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">报销日期</span>
                        <el-date-picker
                            class="data"
                            v-model="simpleReceiptDate"
                            type="date"
                            @change="changeTime"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
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
                        <el-select class="sel" v-model="reimbursementDepartment" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.departmentName"
                                :value="item.idString">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" >
                            </textarea>
                    </li>
                </ul>
                <div class="line">
                    <span>消费明细</span>
                </div>
                <el-button type="primary" @click="addClick" class="gridDataAdd">添加费用单</el-button>

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
                    <el-table-column prop="money" label="操作"  align="center">
                        <template slot-scope="scope">
                            <i class="icon iconfont icon-shanchu red" @click='deleteList(scope.row.idString)'></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        data () {
            return {
                type:this.$route.params.type,
                ids:this.$route.params.idStr,

                originalTypeName:'',//报销名称
                money:'',//总金额
                simpleReceiptDate:'',//报销日期
                receiptCount:'',//票据张数
                discription:'',//事由
                reimbursementDepartment:'',//报销部门
                originalType:'',//费用类别

                originalReceiptIds:'',//费用单id字符串（用逗号拼接）
                originalReceiptIdArr:'',//费用单id字符串（数组形式）

                receiptList:[],//消费明细列表（选中列表）
                gridData:[],//费用列表（未选中列表）

                options:[],//报销部门列表
                options2:[
                    {value:'1',label:'现金支付'},
                    {value:'2',label:'银行支付'}
                ],//结算方式列表
                dialogTableVisible: false,//可用的费用单列表状态


                isTrue:true,
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
                }else{
                    if(this.reimbursementDepartment == ''){
                        this.$message.error('请选择报销部门');
                        this.loading = false;
                        return
                    }
                    if(n == 1){
                        this.$confirm('确定是否保存？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submit(1)
                        })
                    }else{
                        this.$confirm('确定是否提交？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submit(2)
                        })
                    }
                }
            },
            submit(n){
                this.loading = true;
                var params = new URLSearchParams();
                var url = ''
                if(n == 1){
                    url = 'save'
                }else if(n == 2){
                    url = 'submit'
                }
                this.originalReceiptIds = this.originalReceiptIdArr.join(',');
                console.log(this.ids);
                console.log(this.discription);
                console.log(this.type);
                console.log(this.money);
                console.log(this.reimbursementDepartment);
                console.log(this.originalReceiptIds);
                console.log(this.originalType);
                console.log(this.simpleReceiptDate);

                params.append('id',0);
                params.append('discription',this.discription);
                params.append('money',this.money);
                params.append('department',this.reimbursementDepartment);
                params.append('applicationDate',this.simpleReceiptDate);
                params.append('originalReceiptIds',this.originalReceiptIds);
                params.append('receiptCount',this.receiptCount);
                params.append('originalType',this.originalType);

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
            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.simpleReceiptDate;
                if(date){
                    this.startDate = date[0]
                    this.endDate = date[1]
                }else{
                    this.startDate = '';
                    this.endDate = '';
                }
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
            var params = new URLSearchParams();
            console.log(this.ids);
            params.append('originalReceiptId',this.ids);
            axios.post('http://192.168.2.192:8080/web/vue/application/toAddApplication.html',params)
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;
                    console.log(data);
                    this.options = data.departmentList
                    this.receiptList = data.receiptList;
                    this.originalReceiptIds = data.applicationReceiptIds;

                    this.simpleReceiptDate = data.application.simpleReceiptDate;
                    this.originalTypeName = data.application.originalTypeName;
                    this.money = data.application.money;
                    this.receiptCount = data.application.receiptCount;
                    this.originalType = data.application.originalType;
                    this.loading = false;

                    this.originalReceiptIdArr = this.originalReceiptIds.split(',')
                    console.log(this.originalReceiptIds);
                    console.log(this.originalReceiptIdArr);
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
        padding: 20px 40px 50px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
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
        float: left;
    }
    .list .sm{
        width:50%;
    }
    .list .pt{
        width:100%;
        height:70px;
    }
    .list .ptx{
        width:100%;
        height:170px;
        padding: 0px;
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
    .list li .data{
        width:340px;
    }
    .list li .sel{
        width:340px;
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
        width:78.7%;
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
    .gridDataAdd{
        display: block;
        margin: 10px;
        float: right;
    }
</style>
