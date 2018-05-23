<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>查看借款单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button v-if="auditFlg == 1" @click="model(1)" size="small" type="danger" class="sub">提交审批</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content">
                <div class="line">
                    <span>借款单</span>
                </div>
                <ul class="list">
                    <li class="sm">
                        <span class="tit">金额</span>
                        <input class="ipt" type="text" v-model="money" :readonly="isReject">
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
                        <el-date-picker
                            class="iptData"
                            v-model="nowdata"
                            type="date"
                            @change="changeTime"
                            placeholder="选择日期"
                            :disabled="isReject">
                        </el-date-picker>
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
                        <input class="ipt" type="text" value="已还款" v-if="auditFlg == 8" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">借款部门</span>
                        <el-select class="department" v-model="departmentId" placeholder="请选择" :disabled="isReject">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.departmentName"
                                :value="item.idStr">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" name="" id="" :readonly="isReject">
                            </textarea>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">附件</span>
                        <div class="uploadBox">
                            <el-upload
                                action="http://192.168.2.192:8080/web/upload2.html"
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
                                :file-list="attachUrlJson"
                                :auto-upload="false"
                                :disabled="isReject">
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
                money:'',//借款金额
                creditMoney:'',//已还金额
                unCreditMoney:'',//待还款金额
                nowdata:'',//当前借款日期
                debitDate:'',//上传日期（格式修改后的）
                userName:'',//借款人
                auditFlg:'',//0 仅保存；1 驳回；2等待审核；3 等待出纳确认；4 通过；5 等待财务负责人审核；6 等待企业负责人审核；7 已对冲
                departmentId:'',//部门
                options:[],//部门详情
                discription:'',//事由
                debitId:this.$route.params.debitId,
                userDebitAuditRecordList:[],
                attachUrlJson:[],//上传图片展示
                dialogVisible: false,//dialog是否打开状态
                dialogImageName:'',//展示图片名称
                dialogImageUrl:'',//展示图片URL
                isReject:true,//是否是驳回状态 true为否 false为是
                limit:4,//上传图片最大张数
                punch:0,//打点器,判断是否有图片上传
                punch2:0,//打点器
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
                    if(this.money <= 0){
                        this.$message.error('请正确输入金额');
                        this.loading = false;
                        return
                    }else if(this.debitDate == ''){
                        this.$message.error('请正确输入借款日期');
                        this.loading = false;
                        return
                    }else if(this.departmentId == ''){
                        this.$message.error('请正确输入借款部门');
                        this.loading = false;
                        return
                    }

                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                        if(this.punch != 0 || this.punch2 != 0){

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
//                this.loading = true;
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
            onChange(file,fileList){
                this.punch++;
            },
            onRemove(file){
                var removeUrl = file.url;//在删除图片时进行一个判断，根据url看删除的是否是已经上传的图片
                var urlList = this.attachUrlJson;
                for(var i = 0; i < urlList.length; i++){
                    console.log(urlList[i]);
                    if(urlList[i]){
                        if(removeUrl == urlList[i].url){
                            delete urlList[i];
                            this.punch2++
                        }
                    }
                }
                this.punch--;
            },
            //url转换base方法
            readBlobAsDataURL(blob, callback) {
                var fileReader = new FileReader();
                fileReader.onload = function(e){
                    callback(e.target.result);
                };
                fileReader.readAsDataURL(blob);
            },

            myUpload(content){
                console.log(content);
                var file = content.file;
                var _this = this;
                console.log(file);
                this.readBlobAsDataURL(file,function (dataurl){
                    console.log('1');
                    _this.allBase.push(dataurl);
                    _this.allName.push(file.name);
                    if(_this.allBase.length == (_this.punch + _this.punch2)){
                        console.log('2');
                        _this.submit()
                    }
                });
                this.allName.push(file.name);
            },
            submit(){
                console.log('4');
                this.loading = false;
                var params = new URLSearchParams();

                var newUrl = [];
                var newName = [];
                var finalUrl = [];
                var finalName = [];

                var urlList = this.attachUrlJson
                for(var i = 0; i < urlList.length; i++){
                    if(urlList[i]){
                        newUrl.push(urlList[i].url)
                        newName.push(urlList[i].name)
                    }
                }
                finalUrl = newUrl.concat(this.allBase)
                finalName = newName.concat(this.allName)
                console.log(finalUrl);
                console.log(finalName);
                console.log(this.departmentId);

                this.imgUrl1 = finalUrl[0] ? finalUrl[0] : '';
                this.imgUrl2 = finalUrl[1] ? finalUrl[1] : '';
                this.imgUrl3 = finalUrl[2] ? finalUrl[2] : '';
                this.imgUrl4 = finalUrl[3] ? finalUrl[3] : '';

                this.imgName1 = finalName[0] ? finalName[0] : '';
                this.imgName2 = finalName[1] ? finalName[1] : '';
                this.imgName3 = finalName[2] ? finalName[2] : '';
                this.imgName4 = finalName[3] ? finalName[3] : '';

                params.append('debitId',this.debitId);
                params.append('title',this.discription);
                params.append('money',this.money);
                params.append('debitDate',this.debitDate);
                params.append('discription',this.discription);
                params.append('departmentId',this.departmentId);

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
                    url:'http://192.168.2.192:8080/web/vue/debit/edit/debit/submit.html',
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
            },

            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.nowdata;
                this.debitDate = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
                console.log(this.debitDate);
            },
        },
        created(){
            var params = new URLSearchParams();
            params.append('debitId',this.debitId);
            axios.post('http://192.168.2.192:8080/web/vue/debit/item/debit/show.html',params)
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;
                    console.log(data);
                    this.options = data.departmentList;
                    this.userDebitAuditRecordList = data.userDebitAuditRecordList;
                    this.discription = data.userDebitItem.discription;
                    this.money = data.userDebitItem.money;
                    this.creditMoney = data.userDebitItem.creditMoney;
                    this.unCreditMoney = data.userDebitItem.unCreditMoney;
                    this.nowdata = data.userDebitItem.debitDateYMD;
                    this.debitDate = data.userDebitItem.debitDateYMD;
                    this.userName = data.userDebitItem.userName;
                    this.auditFlg = data.userDebitItem.auditFlg;
                    this.fileList = data.userDebitItem.fileList;
                    this.attachUrlJson = data.userDebitItem.attachUrlJson;
                    this.departmentId = data.userDebitItem.departmentIdStr;
                    this.loading = false;

                    if(this.auditFlg == 1){
                        this.isReject = false;
                    }

                    for(var i = 0; i < this.userDebitAuditRecordList.length; i++){
                        this.userDebitAuditRecordList[i].auditTimeYMDHM = this.userDebitAuditRecordList[i].auditTimeYMDHM.substring(0,10)
                    }
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
        right:20px;
        font-size:12px;
    }
    .content{
        width:100%;
        background-color: #fff;
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
    .list li .iptData{
        width:342px;
        height:36px;
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
        padding: 5px 10px;
    }
    .list li .uploadBox{
        display: inline-block;
        width:76.7%;
        padding: 3px 10px;
    }
    .sub{
        position: absolute;
        right:110px;
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
    .department{
        width:342px;
    }
</style>
