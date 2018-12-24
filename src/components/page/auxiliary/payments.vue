<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>{{name}}款单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>{{name}}款单</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">类型：</span>
                        <input class="ipt" type="text" v-model="subjectName"  readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">交易方</span>
                        <input class="ipt" type="text" v-model="relationName"  readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">待{{name}}款</span>
                        <input class="ipt" type="text" v-model="amount" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">本次{{name}}款</span>
                        <input class="ipt" type="text" v-model="money" @change="changeMoney">
                    </li>
                    <li class="pt">
                        <span class="tit">日期</span>
                        <el-date-picker
                            class="data"
                            v-model="businessDate"
                            type="date"
                            :picker-options="pickerOption1"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit">结算方式</span>
                        <el-select class="sel" v-model="payType" placeholder="请选择" @change="payTypeChange">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">银行账户</span>
                        <el-select class="sel" v-model="bankCode" placeholder="请选择" :disabled="isTrue">
                            <el-option
                                v-for="item in bankList"
                                :key="item.value"
                                :label="item.bankNameShow"
                                :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="ptx">
                        <span class="tit">备注</span>
                        <textarea class="tex" v-model="discription" maxlength="50"></textarea>
                    </li>
                    <li class="upload">
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
                    </li>
                </ul>
                <div class="line">
                    <span>{{name}}款记录</span>
                </div>
                <el-table class="hkTable grayList" :data="payList" style="width:100%">
                    <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
                    <el-table-column prop="payType" label="收付款方式" sortable width="180"></el-table-column>
                    <el-table-column prop="showMoney" label="金额" sortable>
                        <template slot-scope="scope">
                            <span>{{scope.row.money}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="urlCount" label="附件" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.urlCount == 0">{{ scope.row.urlCount }}</span>
                            <span v-else @click="clickAppendix(scope.row.id)" class="blue">{{ scope.row.urlCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auditFlg" label="状态" sortable></el-table-column>
                    <el-table-column prop="" label="操作" sortable>
                        <template slot-scope="scope">
                            <router-link :to="{name:'approvalPayments',params:{debitId:scope.row.id,isShow:3,id:debitId}}"
                                         class="see">
                                <i class="icon iconfont icon-kanguo blue"></i>
                            </router-link>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog :visible.sync="dialogVisible2" width="800px">
                    <el-carousel indicator-position="outside" :autoplay="false" height="600px">
                        <el-carousel-item v-for="item in attachUrlJson" :key="item.name">
                            <h3>{{ item.name }}</h3>
                            <img width="100%" :src="item.url" alt="" style="width:auto;height:600px">
                        </el-carousel-item>
                    </el-carousel>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import { mapState } from 'vuex'
    export default{
        data(){
            return{
                name:'',//收 、 付
                subjectCode:'',//类型编号
                subjectName:'',//类型名称
                amount:'0.00',//待收付款
                money:'0.00',//本次收付款
                businessDate:'',//收付款日期
                businessDateYMD:'',//辅助业务日期
                payType:'2',//收款方式
                bankCode:'',//银行账户
                bankList:[],//银行列表
                relationName:'',//交易方
                discription:'',//备注

                options2:[//收款方式列表
                    {value:'1',label:'现金'},
                    {value:'2',label:'银行'},
                    {value:'5',label:'企业微信'},
                    {value:'6',label:'企业支付宝'},
                    {value:'7',label:'企业借贷宝'},
                ],
                payList:[],//收付款明细列表

                isTrue:false,//是否禁用银行列表
                debitId:this.$route.params.debitId,

                attachUrlJson:[],//附件展示列表
                dialogImageUrl: '',//展示图片URL
                dialogImageName: '',//展示图片名称
                dialogVisible: false,//dialog是否打开状态
                dialogVisible2: false,//dialog是否打开状态
                limit:4,//上传图片最大张数
                punch:0,//打点器,判断是否有图片上传
                punch2:0,//打点器 临时变量保存punch ，当上传图片时有不符合规定的图片出现时会发生继续上传的bug
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
                pickerOption1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['start_ym']),
        methods: {
            //点击附件事件
            clickAppendix(id){
                let payList = this.payList
                for(let i in payList){
                    if(payList[i].id == id){
//                        console.log(payList[i].urlJson);
                        this.attachUrlJson = payList[i].urlJson
                    }
                }
                this.dialogVisible2 = true;
            },
            //金额的change事件
            changeMoney(){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                let money = this.money
                let amount = unNumber.unNumber(this.amount)
                if(!str.test(money)){
                    this.$message.error('请正确输入金额')
                    this.money = '0.00'
                    return
                }else if( Number(money) > amount){
                    this.$message.error('输入金额不得大于待收付款')
                    this.money = '0.00'
                    return
                }
                this.money = number.number(this.money)
            },
            //判断支付方式，如果选择银行支付，银行账户才能使用
            payTypeChange(){
                if(this.payType == 2){
                    this.isTrue = false
                }else {
                    this.isTrue = true
                }
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/auxiliary/auxiliaryList')
                    }).catch(() => {
                        this.loading = false;
                    });
                }else{
                    if(this.money == '0.00'){
                        this.$message.error('请正确填写金额')
                        this.loading = false;
                        return
                    }else if(this.businessDate == ''){
                        this.$message.error('请正确选择日期')
                        this.loading = false;
                        return
                    }else if(Number(this.businessDateYMD.split('-').join('')) > Number(this.businessDate.split('-').join(''))){
                        this.$message.error('选择日期不得早于辅助业务发生日期');
                        this.loading = false;
                        return
                    }
                    else if(this.payType == '2' && this.bankCode == ''){
                        this.$message.error('请选择银行账户')
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
                        if(this.punch != 0){
                            this.punch2 = this.punch
                            this.submitUpload();
                        }else{
                            this.submit()
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
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
                this.$message.error('超过上传图片最大张数，您一次只能上传4张图片!');
            },
            onError(){
                this.loading = false
                this.isLoading = false;
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
                var file = content.file;
                var _this = this;
                this.readBlobAsDataURL(file,function (dataurl){
                    _this.allBase.push(dataurl);
                    _this.allName.push(file.name);
                    if(_this.allBase.length == _this.punch2){
                        _this.submit()
                    }
                });
                this.allName.push(file.name);
//                console.log(this.allName);
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            submit(){
                let params = new URLSearchParams();
                let  url = addUrl.addUrl('paymentsSubmit')

                this.imgUrl1 = this.allBase[0] ? this.allBase[0] : '';
                this.imgUrl2 = this.allBase[1] ? this.allBase[1] : '';
                this.imgUrl3 = this.allBase[2] ? this.allBase[2] : '';
                this.imgUrl4 = this.allBase[3] ? this.allBase[3] : '';

                this.imgName1 = this.allName[0] ? this.allName[0] : '';
                this.imgName2 = this.allName[1] ? this.allName[1] : '';
                this.imgName3 = this.allName[2] ? this.allName[2] : '';
                this.imgName4 = this.allName[3] ? this.allName[3] : '';

                params.append('businessId',this.debitId);
                params.append('money',unNumber.unNumber(this.money));
                params.append('businessDate',this.businessDate);
                params.append('payType',this.payType);
                params.append('bankCode',this.bankCode);
                params.append('discription',this.discription);


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
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
                        this.$message.error('提交失败，请重试！');
                    })
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
            let params = new URLSearchParams();
            let url = addUrl.addUrl('payments');
            params.append('businessId',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    this.bankList = data.bankList

                    //将payList中的money做去除逗号处理，保证列表中排序功能正常使用
                    for(let i in data.payList){
                        data.payList[i].showMoney = unNumber.unNumber(data.payList[i].money)
                    }
                    this.payList = data.payList
                    let item = data.item;
                    this.subjectName = item.subjectName
                    this.relationName = item.relationName
                    this.businessDateYMD = item.businessDateYMD
                    this.amount = number.number(item.unDealAmount)
                    if(item.subjectCode == '1122' || item.subjectCode == '122101' || item.subjectCode == '122102' ||item.subjectCode == '122103'){
                        this.name = '收'
                    }else if(item.subjectCode == '2202' || item.subjectCode == '224101' || item.subjectCode == '224102' || item.subjectCode == '224199'){
                        this.name = '付'
                    }
                    let date = new Date()
                    if(date.getMonth()+1 < 10){
                        this.businessDate = date.getFullYear() + '-0' + (date.getMonth()+1) ;
                    }else{
                        this.businessDate = date.getFullYear() + '-' + (date.getMonth()+1);
                    };

                    if(date.getDate() < 10){
                        this.businessDate += '-0' + date.getDate()
                    }else{
                        this.businessDate += '-' + date.getDate()
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
        right:30px;
        font-size:12px;
    }
    .top .sub1{
        position: absolute;
        right:110px;
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
        width:80%;
        text-align: center;
        margin: 0 auto;
    }
    .list .pt{
        width:100%;
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list li .ipt{
        display: inline-block;
        width:400px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .data{
        width:422px;
        height:34px;
    }

    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list .pt .sel{
        display: inline-block;
        width:422px;
        height:34px;
    }
    .list .ptx{
        width:100%;
        display: inline-block;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .ptx .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
        float: left;
    }

    .list .ptx .tex{
        display: inline-block;
        width:400px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
        border: 1px solid #ccc;
    }
    .list .upload{
        display: inline-block;
        width:100%;
    }
    .list .upload .tit2{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
        float: left;
    }
    .list .upload .uploadBox{
        display: inline-block;
        width:610px;
        text-align: left;
    }
    .grayList{
        margin-top: 20px;
    }
    .blue{
        cursor: pointer;
    }
    .see{
        text-decoration: none;
    }

</style>
