<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>销售单审批</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">同意</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2" :loading="isLoading">驳回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>销售单</span>
                </div>
                <ul class="list cf">
                    <li class="hd">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-select class="sel" v-model="department" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.departmentName"
                                :value="item.idString">
                            </el-option>
                        </el-select>
                    </li>
                </ul>

                <ul class="list cf">
                    <li class="sm" style="width:48.2%;">
                        <span class="tit"><span class="red">*</span>客户</span>
                        <el-select class='sel' v-model="customName" filterable="" allow-create=""
                                   default-first-option placeholder="请选择或输入" disabled>
                            <el-option v-for="item in customList"
                                       :key="item.value"
                                       :label="item.customName"
                                       :value="item.tradeIdNumber">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" >
                        <span class="tit" style="width:170px;">统一社会信用代码/身份证</span>
                        <input class="ipt" type="text" v-model="customIdNumber" maxlength="18" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">地址</span>
                        <input class="ipt" type="text" v-model="address" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">固定电话</span>
                        <input class="ipt" type="text" v-model="customTelephone" maxlength="15" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>联系人</span>
                        <input class="ipt" type="text" v-model="customPerson1" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>联系电话</span>
                        <input class="ipt" type="text" v-model="customPersonPhone1" maxlength="15" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">紧急联系人</span>
                        <input class="ipt" type="text" v-model="customPerson2" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit2">紧急联系电话</span>
                        <input class="ipt" type="text" v-model="customPersonPhone2" maxlength="15" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>销售类别</span>
                        <el-select class="sel" type="text" v-model="type" disabled>
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>发票类别</span>
                        <el-select class="sel" type="text" v-model="taxFlg" disabled>
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>日期</span>
                        <el-date-picker
                            class="iptData"
                            v-model="saleDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期" readonly>
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>含税总价</span>
                        <input class="ipt" type="text" v-model="totalMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>不含税总价</span>
                        <input class="ipt" type="text" v-model="unTotalMoney" readonly>
                    </li>
                </ul>

                <div class="line">
                    <span>销售明细</span>
                </div>
                <el-table :data="newList1" class="grayList" v-show="isShowLow">
                    <el-table-column property="inventoryGoodsName" label="库存商品" align="center" ></el-table-column>
                    <el-table-column property="discription" label="明细" align="center"></el-table-column>
                    <el-table-column property="unit" label="单位"  align="center"></el-table-column>
                    <el-table-column property="count" label="数量" align="center"></el-table-column>
                    <el-table-column property="perPrice" label="单价" align="center"></el-table-column>
                    <el-table-column property="money" label="金额" align="center"></el-table-column>
                    <el-table-column property="taxRate" label="税率" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.taxRate}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="taxMoney" label="税额" align="center"></el-table-column>
                </el-table>
                <el-table :data="newList2" class="grayList" v-show="!isShowLow">
                    <el-table-column property="discription" label="明细" align="center"></el-table-column>
                    <el-table-column property="unit" label="单位"  align="center"></el-table-column>
                    <el-table-column property="count" label="数量" align="center"></el-table-column>
                    <el-table-column property="perPrice" label="单价" align="center"></el-table-column>
                    <el-table-column property="money" label="金额" align="center"></el-table-column>
                    <el-table-column property="taxRate" label="税率" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.taxRate}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="taxMoney" label="税额" align="center"></el-table-column>
                </el-table>
                <div class="ptx">
                    <div class="upload cf">
                        <span class="tit2">附件</span>
                        <div class="uploadBox">
                            <el-upload
                                action="/"
                                ref="upload"
                                :on-preview="handlePictureCardPreview"
                                list-type="picture-card"
                                :file-list="attachUrlJson"
                                disabled>
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                </div>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in userDebitAuditRecordList">
                        <img v-if="!item.faceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.faceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            <span class="listDepartment" v-if="item.auditDepartmentName != ''">——{{item.auditDepartmentName}}</span>
                            <span class="listData">{{item.simpleAuditTime}}</span>
                        </div>
                        <div class="listFooter">
                            <span class="listState">意见：</span>
                            <span class="listContent">{{item.discription}}</span>
                        </div>
                    </li>
                </ul>

                <ul class="approval-opinion">
                    <li>
                        <span>可选审批意见</span>
                        <el-select class="bankCode" v-model="opinion" placeholder="请选择" @change="opinionChange">
                            <el-option
                                v-for="item in opinionList"
                                :key="item.value"
                                :label="item.opinionItem"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="opinionItem">
                        <span>审批意见</span>
                            <textarea v-model="discription2" name="opinionItem" id="opinionItem" maxlength="50">
                            </textarea>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'

    export default{
        data(){
            return{
                options4:[],//报销部门列表
                department:'',//报销部门

                debitId:this.$route.params.debitId,
                customName:'',//客户
                customList:[],//客户列表
                customIdNumber:'',//统一社会信用代码
                address:'',//地址
                customTelephone:'',//固定电话
                customPerson1:'',//联系人
                customPersonPhone1:'',//联系电话
                customPerson2:'',//紧急联系人
                customPersonPhone2:'',//紧急联系电话
                type:'1',//销售类别类别
                options:[//销售类别列表
                    {value:'1',label:'库存商品'},
                    {value:'2',label:'技术服务'},
                    {value:'3',label:'技术开发'},
                    {value:'4',label:'技术咨询'},
                    {value:'5',label:'劳务'},
                    {value:'6',label:'软件'},
                    {value:'7',label:'设计服务'},
                    {value:'8',label:'现代商业服务'},
                ],
                taxFlg:'1',//发票类别
                options2:[//发票类别列表
                    {value:'1',label:'增值税专用发票'},
                    {value:'2',label:'增值税普通发票'},
                    {value:'3',label:'增值税电子普通发票'},
                    {value:'4',label:'未开具发票'},
                ],
                saleDate:'',//日期
                totalMoney:'',//含税总价
                unTotalMoney:'',//不含税总价

                newList1:[],//新建明细列表（设备）
                newList2:[],//新建明细列表（其他）

                totalMoney1:'',//含税总价1
                unTotalMoney1:'',//不含税总价1

                totalMoney2:'',//含税总价2
                unTotalMoney2:'',//不含税总价2

                isShowLow:true,//是否显示明细列表 设备相关信息列

                userDebitAuditRecordList:[],//审批意见
                opinion:'同意',//select框
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                discription2:'同意',//审批意见
                attachUrlJson:[],//上传图片展示
                dialogImageUrl: '',//展示图片URL
                dialogImageName: '',//展示图片名称
                dialogVisible: false,//dialog是否打开状态

                fileList:[],//上传成功展示图片参数


                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                isAuditPerson:false,//审批流程 true为已审批 false为无人审批
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            model(n){
                this.loading = true
                if(n == 0){
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    this.isLoading = true;
                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        showClose: false,
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.cancelButtonLoading = true;
                                instance.confirmButtonText = '执行中...';
                                setTimeout(() => {
                                    done();
                                    setTimeout(() => {
                                        instance.confirmButtonLoading = false;
                                        instance.cancelButtonLoading = false;
                                    }, 300);
                                }, 300);
                            } else {
                                done();
                            }
                        }
                    }).then(() => {
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },

            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            submit(n){
                this.loading = true;
                var params = new URLSearchParams();
                var url = '';
                if(n == 1){
                    url = addUrl.addUrl('approvalSaleAgree');
                    this.discription2 = this.discription2 == '驳回' ? '同意':this.discription2
                }else if(n == 2){
                    url = addUrl.addUrl('approvalSaleRefuse');
                    this.discription2 = this.discription2 == '同意' ? '驳回':this.discription2
                }
                params.append('saleId',this.debitId);
                params.append('discription',this.discription2);

                axios({
                    method:'post',
                    url:url,
                    data:params,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    }
                },params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
                        this.$message.error('提交失败，请重试！');
                    })
            },

        },
        watch:{
            newList1:function(val){
//                console.log(val);
                var totalMoney = 0;
                var unTotalMoney = 0;
                for(var i = 0; i < val.length; i++){
                    unTotalMoney += parseFloat(unNumber.unNumber(val[i].money))
                    totalMoney += parseFloat(unNumber.unNumber(val[i].taxMoney))
                }
                totalMoney += unTotalMoney;
                this.totalMoney1 = number.number(totalMoney.toFixed(2));
                this.unTotalMoney1 = number.number(unTotalMoney.toFixed(2));

                this.totalMoney = this.totalMoney1
                this.unTotalMoney = this.unTotalMoney1
            },
            newList2:function(val){
//                console.log(val);
                var totalMoney = 0;
                var unTotalMoney = 0;
                for(var i = 0; i < val.length; i++){
                    unTotalMoney += parseFloat(unNumber.unNumber(val[i].money))
                    totalMoney += parseFloat(unNumber.unNumber(val[i].taxMoney))
                }
                totalMoney += unTotalMoney;
                this.totalMoney2 = number.number(totalMoney.toFixed(2));
                this.unTotalMoney2 = number.number(unTotalMoney.toFixed(2));

                this.totalMoney = this.totalMoney2
                this.unTotalMoney = this.unTotalMoney2
            },
        },
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            var topHeight = $('.top').innerHeight()
            var headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                var topHeight = $('.top').innerHeight()
                var headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            };
        },
        created(){
            var params = new URLSearchParams();
            var url = addUrl.addUrl('seeSale')
            params.append('id',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let status = response.data.status
                    if(status == 200){
                        var data = response.data.value;
                        //设置部门
                        this.options4 = data.departmentList;
                        this.customList = data.customList;
                        let userDebitAuditRecordList = data.auditRecordList;

                        this.userDebitAuditRecordList = userDebitAuditRecordList;

                        this.attachUrlJson = data
//                        console.log(this.customList);

                        var sale = data.sale
                        this.customName = sale.customName;
                        this.customIdNumber = sale.customIdNumber;
                        this.address = sale.address;
                        this.customTelephone = sale.customTelephone;
                        this.customPerson1 = sale.customPerson1;
                        this.customPersonPhone1 = sale.customPersonPhone1;
                        this.customPerson2 = sale.customPerson2;
                        this.customPersonPhone2 = sale.customPersonPhone2;
                        this.taxFlg = String(sale.taxFlg);
                        this.attachUrlJson = sale.attachUrlJson;

                        this.saleDate = sale.simpleSaleDate;
                        var type = sale.type;
                        var saleItemList = sale.saleItemList

                        for(let i = 0; i < saleItemList.length; i++){
                            saleItemList[i].money = number.number(saleItemList[i].noTaxMoney)
                            saleItemList[i].perPrice = number.number(saleItemList[i].perPrice)
                            saleItemList[i].taxMoney = number.number(saleItemList[i].taxMoney)
                        }
                        if(type == 1){
                            this.isShowLow = true
                            this.newList1 = sale.saleItemList
                        }else{
                            this.isShowLow = false
                            this.newList2 = sale.saleItemList
                        }
                        this.type = String(type)
                        var auditPerson = sale.auditPerson
                        //审批流程 true为已审批 false为无人审批
                        if(auditPerson == 1){
                            this.isAuditPerson = true
                            this.isShowShare = false
                        }else if(auditPerson == 0){
                            this.isAuditPerson = false
                            this.isShowShare = true;
                        }

                        this.department = sale.departmentIdString

                    }else if(status == 400){
                        var str = response.data.msg
                        this.$message.error(str);
                    }
                    this.loading = false
                })
                .catch(error=> {
                    this.loading = false

//                    console.log(error);
                    alert('网络错误，不能访问');
                });
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
        right:20px;
        font-size:12px;
    }
    .top .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .top .sub2{
        position: absolute;
        right:190px;
        font-size:12px;
    }

    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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

    .list li .ipt{
        display: inline-block;
        width:300px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .iptData{
        width:322px;
        height:36px;
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
    .list .hd{
        width:100%;
    }
    .list .hd .ipthd{
        padding: 5px 30px;
        font-size:16px;
        border: none;
        border-bottom: 2px solid #1a96d4;
        outline:none;
        cursor: default;
    }

    .dialogImageName{
        font-size:16px;
    }

    .detailed{
        width:100%;
        font-size:16px;
        table-layout: fixed;
        margin: 50px auto;
        text-align: center;
    }
    .detailed tr {
        height:40px;
    }
    .detailed thead tr th{
        background-color: #f7f7f7;
        border: 1px solid #f2f2f2;
    }
    .detailed .detailedToll{
        background: none;
        border: none;
        position: relative;
    }
    .detailed .detailedToll .icon{
        position: absolute;
        top:8px;
        left:0px;
        z-index: 2;
    }
    .detailed .detailedToll .mask{
        width:100%;
        height:100%;
        background-color: #fff;
        position: absolute;
        top:0;
        left:0;
        z-index: 3;
    }
    .black{
        color: #333;
    }
    .detailed td{
        overflow: hidden;
        border: 1px solid #f2f2f2;
    }
    .detailed td .detailed-input{
        padding: 5px 10px;
        width:100%;
        height:100%;
        outline: none;
        border: none;
    }
    .detailed tbody tr:hover{
        /*background-color: #f7f7f7;*/
    }
    .detailed tbody tr:hover .mask{
        z-index: 1;
    }
    .upload{
        width:100%;
    }
    .upload .tit2{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .upload .uploadBox{
        display: inline-block;
        width:76.7%;
        padding: 3px 10px;
        text-align: left;
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
    .opinionItem #opinionItem{
        display: inline-block;
        width:680px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
    }
    .grayList{
        margin: 30px 0;
    }
    .list li .input-with-select{
        font-size:14px;
        width:322px;
        text-align: right;
    }

    .list .hd{
        width:100%;
    }
    .share{
        display: block;
        margin-top: 10px;
        margin-left: 80px;
    }
    .input-select{
        width:200px;
    }
</style>
