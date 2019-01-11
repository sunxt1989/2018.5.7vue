<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看费用单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-if="!isSee" size="small" type="danger" class="sub" :loading="isLoading">保存</el-button>
            </div>
        </div>
        <div class="w">
            <div class="w">
                <div class="content" :style="{height:screenHeight}">
                    <div class="line">
                        <span>查看费用单</span>
                    </div>
                    <ul class="list cf">
                        <li class="sm">
                            <span class="tit"><span class="red">*</span>费用类别</span>
                            <el-select class="sel" v-model="type" placeholder="请选择" @change="typeChange" :disabled="isSee">
                                <el-option
                                    v-for="item in options"
                                    :key="item[1]"
                                    :label="item[1]"
                                    :value="item[0]">
                                </el-option>
                            </el-select>
                        </li>

                        <li class="sm" v-show="typeShow">
                            <span class="tit"><span class="red">*</span>费用类别</span>
                            <el-select class="sel" v-model="childType1" placeholder="请选择" :disabled="isSee">
                                <el-option
                                    v-for="item in optionsSmall"
                                    :key="item.value"
                                    :label="item[1]"
                                    :value="item[0]">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="sm">
                            <span class="tit"><span class="red">*</span>含税总价金额</span>
                            <input class="ipt" type="text" v-model="money" @blur="blurMoney" :readonly="isSee">
                        </li>
                        <li class="sm" v-if="current_company_scale == 2">
                            <span class="tit">增值税专用发票税额</span>
                            <input class="ipt" type="text" v-model="taxMoney" @blur="blurTaxMoney" :readonly="isSee">
                        </li>
                        <li class="sm">
                            <span class="tit"><span class="red">*</span>费用发生日期</span>
                            <el-date-picker
                                class="iptData"
                                v-model="receiptDate"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions1"
                                placeholder="选择日期"
                                :disabled="isSee">
                            </el-date-picker>
                        </li>
                        <li class="sm" v-show="destination">
                            <span class="tit"><span class="red">*</span>出差目的</span>
                            <el-select class="sel" v-model="aimType" placeholder="请选择" :disabled="isSee">
                                <el-option
                                    v-for="item in objective"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="sm">
                            <span class="tit">发票张数</span>
                            <input class="ipt" type="text" v-model="receiptCount" @change="receiptCountChange" :readonly="isSee">
                        </li>
                        <li class="pt cf">
                            <span class="tit2">费用描述</span>
                            <textarea class="tex" v-model="discription" maxlength="50" :readonly="isSee">
                            </textarea>
                        </li>
                        <li class="ptx cf">
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
                                    :file-list="attachUrlJson"
                                    :auto-upload="false"
                                    :disabled="isSee">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-dialog :visible.sync="dialogVisible">
                                    <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
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
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    import { mapState } from 'vuex'
    export default{
        data(){
            return{
                options:[],//费用大类列表
                optionsSmall:[],//费用小类列表
                id:this.$route.params.id,
                isSee:this.$route.params.isSee,
                type:'',//费用大类
                childType1:'',//费用小类
                typeShow:false,//是否显示费用小类
                destination:false,//是否显示目的地
                money:0,//金额
                taxMoney:0,//税额
                receiptDate:'',//费用发生日期
                aimType:'',//出差目的
                receiptCount:'1',//票据张数
                discription:'',//借款事由
                objective:[//出差目的
                    {value:1,label:'工作出差'},
                    {value:2,label:'参加会议'},
                    {value:3,label:'参加培训'}
                ],
                attachUrlJson:[],//上传图片展示
                dialogImageUrl: '',//展示图片URL
                dialogImageName: '',//展示图片名称
                dialogVisible: false,//dialog是否打开状态
                limit:4,//上传图片最大张数
                punch:0,//打点器,判断是否有图片上传
                punch2:0,//打点器
                punch3:0,//打点器 临时变量保存punch ，当上传图片时有不符合规定的图片出现时会发生继续上传的bug
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
                    }
                },
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['current_book_ym','current_company_scale','isMonthlyKnots','isAnnualKnots']),
        methods: {
            //发票张数change事件
            receiptCountChange(){
                var str = /^\d+$/;//判断只允许输入正整数
                if(!(str.test(this.receiptCount))){
                    this.$message.error('请正确输入张数');
                    this.receiptCount = 1
                    return
                }else if(this.receiptCount == '0'){
                    this.$message.error('发票张数不能为 0');
                    this.receiptCount = 1
                }
            },
            blurMoney(){
                this.money = number.number(this.money)
            },
            blurTaxMoney(){
                this.taxMoney = number.number(this.taxMoney)
            },
            //费用大类typeChange事件
            typeChange(){
                this.loading = true
                var index= this.type;
                if(index == 2 || index == 3){
                    this.optionList(index)
                    this.typeShow = true
                    this.destination = false
                }else if(index == 1){
                    this.optionList(index);
                    this.typeShow = true;
                    this.destination = true
                }
                else{
                    this.typeShow = false
                    this.destination = false
                    this.loading = false
                }
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    if(this.isSee){
                        this.$router.go(-1)
                    }else{
                        this.$confirm('修改的信息还未提交，是否返回？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.go(-1)
                        }).catch(() => {
                            this.loading = false;
                        });
                    }

                }else{
                    if(this.money <= 0){
                        this.$message.error('请正确输入金额');
                        this.loading = false;
                        return
                    }
                    if(this.receiptDate == ''){
                        this.$message.error('请正确输入日期');
                        this.loading = false;
                        return
                    }
                    let receiptDateYear = Number(this.receiptDate.substring(0,4));//选择的日期的年份
                    let lastYear = Number(this.current_book_ym.substring(0,4)-1);//去年年份
                    let thisYear = Number(this.current_book_ym.substring(0,4));//今年年份
                    if(this.isAnnualKnots){//判断去年是否年结
//                        console.log('年结');
                        if(receiptDateYear < thisYear){
                            this.$message.error('该账套已年结，不能录入上年度数据。');
                            this.loading = false;
                            return
                        }
                    }else{
//                        console.log('未年结');
                        if(receiptDateYear < lastYear) {
                            this.$message.error('该账套已年结，不能录入上年度数据。');
                            this.loading = false
                            return
                        }
                    }
                    if(this.type == '' || this.childType1 == ''){
                        this.$message.error('请正确输入费用类别');
                        this.loading = false;
                        return
                    }
                    if(this.aimType == ''&& this.type == 1){
                        this.$message.error('请正确输入出差目的');
                        this.loading = false;
                        return
                    }
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
                        var index = this.punch + this.punch2
//                        console.log(index);
                        if(index !=0 ){
                            this.punch3 = this.punch
                            this.submitUpload();
                        }else{
                            this.submit()
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                        this.isLoading = false;
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
                const isJPEG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isJPG = file.type === 'image/jpg';
                const isLt4M = file.size / 1024 / 1024 < 4;
                if (!isJPG && !isPNG && !isJPEG) {
                    this.loading = false;
                    this.isLoading = false;
                    this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                }
                if (!isLt4M) {
                    this.loading = false;
                    this.isLoading = false;
                    this.$message.error('上传图片大小不能超过 4MB!');
                }
                return (isJPG || isPNG || isJPEG) && isLt4M;//如果不符合要求的话是不走myUpload函数的
            },
            onExceed(){
                this.loading = false;
                this.isLoading = false;
                this.$message.error('超过上传图片最大张数，您一次只能上传4张图片!');
            },
            onError(){
                this.loading = false
                this.isLoading = false;
                this.$message.error('图片上传失败，请重试！');
            },
            onChange(){
                this.punch++;
//                console.log(this.punch);
            },
            onRemove(file){
                var removeUrl = file.url;//在删除图片时进行一个判断，根据url看删除的是否是已经上传的图片
                var urlList = this.attachUrlJson;
                for(var i = 0; i < urlList.length; i++){
//                    console.log(urlList[i]);
                    if(urlList[i]){
                        if(removeUrl == urlList[i].url){
                            delete urlList[i];
                            this.punch2++
                        }
                    }
                }
                this.punch--;
//                console.log(this.punch);
//                console.log(this.punch2);
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
                var file = content.file;
                var _this = this;
//                console.log(file);
                this.readBlobAsDataURL(file,function (dataurl){
                    _this.allBase.push(dataurl);
                    _this.allName.push(file.name);
                    if(_this.allBase.length == (_this.punch3 + _this.punch2)){
                        _this.submit()
                    }
                });
                this.allName.push(file.name);
            },
            submit(){
                this.loading = true;
                var params = new URLSearchParams();

                var newUrl = [];
                var newName = [];
                var finalUrl = [];
                var finalName = [];
                var money = unNumber.unNumber(this.money)
                var taxMoney = unNumber.unNumber(this.taxMoney)
                var url = addUrl.addUrl('seeCostSave')

                var urlList = this.attachUrlJson
                for(var i = 0; i < urlList.length; i++){
                    if(urlList[i]){
                        newUrl.push(urlList[i].url)
                        newName.push(urlList[i].name)
                    }
                }
                finalUrl = newUrl.concat(this.allBase)
                finalName = newName.concat(this.allName)
//                console.log(finalUrl);
//                console.log(finalName);
//                console.log(this.departmentId);

                this.imgUrl1 = finalUrl[0] ? finalUrl[0] : '';
                this.imgUrl2 = finalUrl[1] ? finalUrl[1] : '';
                this.imgUrl3 = finalUrl[2] ? finalUrl[2] : '';
                this.imgUrl4 = finalUrl[3] ? finalUrl[3] : '';

                this.imgName1 = finalName[0] ? finalName[0] : '';
                this.imgName2 = finalName[1] ? finalName[1] : '';
                this.imgName3 = finalName[2] ? finalName[2] : '';
                this.imgName4 = finalName[3] ? finalName[3] : '';

                params.append('receiptId',this.id);
                params.append('type',this.type);
                params.append('childType1',this.childType1);
                params.append('money',money);
                params.append('taxMoney',taxMoney);
                params.append('aimType',this.aimType);
                params.append('discription',this.discription);
                params.append('receiptCount',this.receiptCount);
                params.append('receiptDate',this.receiptDate);

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
                        this.loading = false
                        this.isLoading = false;
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },

            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },

            //获得费用小类
            optionList(index){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('seeCostOptionList')
                params.append('type',index);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        var data = response.data.value;
                        this.optionsSmall = data;
                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                        console.log(error);
                        alert('网络错误，不能访问');
                    });
            }
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
            var url = addUrl.addUrl('seeCost')
            params.append('id',this.id);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;
                    this.options = data.list;
                    this.optionsSmall= data.optionList;
                    this.childType1 = String(data.originalReceipt.childType1);
                    this.money = number.number(data.originalReceipt.money);
                    this.taxMoney = number.number(data.originalReceipt.taxMoney);
                    this.aimType = data.originalReceipt.aimType;
                    this.discription = data.originalReceipt.discription;
                    this.receiptCount = data.originalReceipt.receiptCount;
                    this.receiptDate = data.originalReceipt.simpleReceiptDate;
                    this.attachUrlJson = data.originalReceipt.attachUrlJson;
                    this.type = String(data.originalReceipt.type);

                    var index= this.type;
                    if(index == 2 || index == 3){
                        this.optionList(index)
                        this.typeShow = true
                        this.destination = false
                    }else if(index == 1){
                        this.optionList(index);
                        this.typeShow = true;
                        this.destination = true
                    }else{
                        this.typeShow = false
                        this.destination = false
                    }
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
    .top .sub{
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
