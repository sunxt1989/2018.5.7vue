<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>采购单审批</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1">同意</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2">驳回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>新建采购单</span>
                </div>
                <ul class="list cf">
                    <li class="hd">
                        <span class="tit"><span class="red">*</span><span class="bumen">部门</span></span>
                        <select name="" id="bumen">
                        </select>
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>供应商</span>
                        <el-select class="sel" v-model="type" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item[1]"
                                :value="item[0]">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="typeShow">
                        <span class="tit"><span class="red">*</span>统一社会信用代码</span>
                        <el-select class="sel" v-model="childType1" placeholder="请选择">
                            <el-option
                                v-for="item in optionsSmall"
                                :key="item.value"
                                :label="item[1]"
                                :value="item[0]">
                            </el-option>
                        </el-select>
                    </li>

                    <li class="sm">
                        <span class="tit"><span class="red">*</span>地址</span>
                        <input class="ipt" type="text" v-model="money" >
                    </li>
                    <li class="sm">
                        <span class="tit">固定电话</span>
                        <input class="ipt" type="text" v-model="taxMoney" >
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>联系人</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf" v-show="destination">
                        <span class="tit"><span class="red">*</span>联系电话</span>
                        <el-select class="sel" v-model="aimType" placeholder="请选择" >
                            <el-option
                                v-for="item in objective"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm cf">
                        <span class="tit">紧急联系人</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2">紧急联系电话</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit"><span class="red">*</span>采购类别</span>
                        <el-select class="sel" type="text" v-model="type" @change="typeChange">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm cf">
                        <span class="tit2"><span class="red">*</span>发票类别</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2"><span class="red">*</span>日期</span>
                        <el-date-picker
                            class="iptData"
                            v-model="debitDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li class="sm cf">
                        <span class="tit2">运输费</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2">装卸费</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2">保险费</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2">其他费用</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2"><span class="red">*</span>含税总价</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                    <li class="sm cf">
                        <span class="tit2"><span class="red">*</span>不含税总价</span>
                        <input class="ipt" type="text" v-model="receiptCount">
                    </li>
                </ul>

                <el-table :data="detailedList" class="grayList">
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

                <div class="upload cf">
                    <span class="tit2">附件</span>
                    <div class="uploadBox">
                        <el-upload
                            action="http://192.168.2.190:8080/web/upload2.html"
                            list-type="picture-card"
                            ref="upload"
                            :show-file-list=true
                            :limit='limit'
                            :http-request="myUpload"
                            :on-preview="handlePictureCardPreview"
                            :before-upload='beforeAvatarUpload'
                            :on-exceed="onExceed"
                            :on-error="onError"
                            :on-change='onChange'
                            :on-remove='onRemove'
                            :auto-upload="false">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <h2 class="dialogImageName">{{dialogImageName}}</h2>
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
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
                            <textarea v-model="discription2" name="opinionItem" id="opinionItem" cols="30" rows="10">
                            </textarea>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    export default{
        data(){
            return{
                childType1:'',//费用小类
                typeShow:false,//是否显示费用小类
                destination:false,//是否显示目的地
                money:0,//金额
                taxMoney:0,//税额
                debitDate:'',//上传日期（格式修改后的）
                aimType:'',//出差目的
                receiptCount:'',//票据张数
                discription:'',//借款事由

                rowNumber:1,//明细列表行数（只加不减）
                deviceList:[],//明细列表，设备类别

                type:'1',//设备类别
                options:[//费用大类列表
                    {value:'1',label:'设备'},
                    {value:'2',label:'材料'},
                    {value:'3',label:'软件'},
                    {value:'4',label:'劳务服务'},
                    {value:'5',label:'技术服务'},
                    {value:'6',label:'待销商品'},
                ],
                isShowLow:true,//是否显示明细列表 设备相关信息列

                optionsSmall:[],//费用小类列表
                objective:[//出差目的
                    {value:1,label:'工作出差'},
                    {value:2,label:'参加会议'},
                    {value:3,label:'参加培训'}
                ],


                discription2:'同意',//审批意见
                opinion:'同意',//select框
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见

                dialogImageUrl: '',//展示图片URL
                dialogImageName: '',//展示图片名称
                dialogVisible: false,//dialog是否打开状态
                limit:4,//上传图片最大张数
                punch:0,//打点器,判断是否有图片上传
                fileList:[],//上传成功展示图片参数

                allBase:[],//所有base64格式的地址
                allName:[],//所有namen名称
                imgUrl1:'',//上传图片url
                imgName1:'',//上传图片name
                imgUrl2:'',
                imgName2:'',
                imgUrl3:'',
                imgName3:'',
                imgUrl4:'',
                imgName4:'',
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            //设备类别change事件
            sblbChange(n){
                var deviceList = $("select[name=deviceList"+ n +"]").val()
                var unit = $("input[name=unit"+ n +"]")
                var list = this.deviceList;
                for(var i = 0; i < list.length; i++){
                    if(deviceList == list[i].classCode){
                        unit.val(list[i].unit)
                    }
                }
                console.log(deviceList);

            },
            //改变金额的change事件
            moneyChange(n){
                var count = $("input[name=count"+ n +"]").val()
                var perPrice = $("input[name=perPrice"+ n +"]").val();
                var $money =  $("input[name=money"+ n +"]")
                var money = 0
                if(count != ''&& perPrice !=''){
                    money = count * perPrice;
                }
                $money.val(money)
                this.taxMoneyChange(n)
            },
            taxMoneyChange(n){
                console.log('@');
                var money = $("input[name=money"+ n +"]").val()
                var taxRate1 = $("select[name=taxRate"+ n +"]").val();
                var $taxMoney =  $("input[name=taxMoney"+ n +"]")
                var taxMoney = 0
                console.log(taxRate1);
                if(money != ''&& taxRate1 !=''){
                    taxMoney = money * taxRate1;
                }
                $taxMoney.val(taxMoney)
            },

            //采购类别change事件，当选择设备时明细列表进行修改
            typeChange(){
                var type = this.type
                if(type == '1'){
                    console.log('true');
                    this.isShowLow = true
                }else{
                    console.log('false');
                    this.isShowLow = false
                }
                console.log(this.isShowLow);
            },
            detailedAdd(){

            },
            detailedDelete(){
                console.log('@@');
            },

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
                    if(this.money <= 0){
                        this.$message.error('请正确输入金额');
                        this.loading = false;
                        return
                    }else if(this.debitDate == ''){
                        this.$message.error('请正确输入日期');
                        this.loading = false;
                        return
                    }else if(this.type == '' || this.childType1 == ''){
                        this.$message.error('请正确输入费用类别');
                        this.loading = false;
                        return
                    }else if(this.aimType == ''&& this.type == 1){
                        this.$message.error('请正确输入出差目的');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
//                        console.log(this.punch);
                        if(this.punch != 0){
                            this.submitUpload();
                        }else{
                            this.submit()
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            submitUpload(){
                this.$refs.upload.submit();
                this.allBase = [];//清空base
                this.allName = [];//清空name
            },
            //限制用户上传图片格式和大小
            beforeAvatarUpload(file){
                this.loading = true;
                const isJPG = file.type === 'image/jpeg'||'image/png'||'image/jpg';
                const isLt4M = file.size / 1024 / 1024 < 4;
                if (!isJPG) {
                    this.loading = false;
                    this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                }
                if (!isLt4M) {
                    this.loading = false;
                    this.$message.error('上传图片大小不能超过 4MB!');
                }
                return isJPG && isLt4M;//如果不符合要求的话是不走myUpload函数的
            },
            onExceed(){
                this.$message.error('超过上传图片最大张数，您一次只能上传4张图片!');
            },
            onError(){
                this.loading = false
                this.$message.error('图片上传失败，请重试！');
            },
            onChange(){
                this.punch++;
            },
            onRemove(){
                this.punch--;
            },
            //url转换base方法
            readBlobAsDataURL(blob, callback) {
//                console.log(blob);
                var fileReader = new FileReader();
                fileReader.onload = function(e){
                    callback(e.target.result);
                };
                fileReader.readAsDataURL(blob);
            },
            myUpload(content){
//                console.log(content);
                var file = content.file;
                var _this = this;
                this.readBlobAsDataURL(file,function (dataurl){
                    _this.allBase.push(dataurl);
                    _this.allName.push(file.name);
                    if(_this.allBase.length == _this.punch){
                        _this.submit()
                    }
                });
                this.allName.push(file.name);
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            submit(){
                this.loading = true;
                var params = new URLSearchParams();
//                console.log(this.money);
//                console.log(this.allName);

                this.imgUrl1 = this.allBase[0] ? this.allBase[0] : '';
                this.imgUrl2 = this.allBase[1] ? this.allBase[1] : '';
                this.imgUrl3 = this.allBase[2] ? this.allBase[2] : '';
                this.imgUrl4 = this.allBase[3] ? this.allBase[3] : '';

                this.imgName1 = this.allName[0] ? this.allName[0] : '';
                this.imgName2 = this.allName[1] ? this.allName[1] : '';
                this.imgName3 = this.allName[2] ? this.allName[2] : '';
                this.imgName4 = this.allName[3] ? this.allName[3] : '';
//                console.log(this.type,'type');
//                console.log(this.childType1,'childType1');
//                console.log(this.money,'money');
//                console.log(this.taxMoney,'taxMoney');
//                console.log(this.aimType,'aimType');
//                console.log(this.discription,'discription');
//                console.log(this.receiptCount,'receiptCount');
//                console.log(this.debitDate,'debitDate');
                params.append('debitId',0);
                params.append('type',this.type);
                params.append('childType1',this.childType1);
                params.append('money',this.money);
                params.append('taxMoney',this.taxMoney);
                params.append('aimType',this.aimType);
                params.append('discription',this.discription);
                params.append('receiptCount',this.receiptCount);
                params.append('receiptDate',this.debitDate);

                params.append('imgUrl1',this.imgUrl1);
                params.append('imgName1',this.imgName1);
                params.append('imgUrl2',this.imgUrl2);
                params.append('imgName2',this.imgName2);
                params.append('imgUrl3',this.imgUrl3);
                params.append('imgName3',this.imgName3);
                params.append('imgUrl4',this.imgUrl4);
                params.append('imgName4',this.imgName4);

                axios({
                    method:'post',
                    url:'http://192.168.2.190:8080/web/vue/expense/save.html',
                    data:params,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    }
                },params)
                    .then(response=> {
                        this.loading = false;
                        console.log(response);
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
                        console.log(error);
                        this.$message.error('提交失败，请重试！');
                    })
            },

        },
        watch:{

        },
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            var topHeight = $('.top').innerHeight()
            var headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 80}px`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                var topHeight = $('.top').innerHeight()
                var headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight -80}px`;
            };
        },
        created(){
            axios.post('http://192.168.2.190:8080/web/vue/purchase/add.html')
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;
                    //设置部门
                    var departmentList = data.departmentList;
                    var departmentListHtml =''
                    for(var i = 0; i < departmentList.length; i++){
                        var id = departmentList[i].idStr
                        var name = departmentList[i].departmentName
                        departmentListHtml +='<option value="'+ id +'">'+ name +'</option>'
                    }
                    $('#bumen').html(departmentListHtml);
                    //
                    var deviceList = data.deviceList;
                    var deviceListHtml =''
                    for(var ii = 0; ii < deviceList.length; ii++){
                        var id = deviceList[ii].classCode
                        var name = deviceList[ii].className
                        this.deviceList.push(deviceList[ii])
                        deviceListHtml +='<option value="'+ id +'">'+ name +'</option>'
                    }
                    $("select[name=deviceList1]").html(deviceListHtml);
                    this.loading = false
                })
                .catch(error=> {
                    this.loading = false

                    console.log(error);
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
    .bumen{
        font-size:20px;
        color: #1a96d4;
    }
    #bumen{
        border: none;
        border-bottom: 2px solid #1a96d4;
        padding: 5px 10px;
        outline:none;
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
</style>
