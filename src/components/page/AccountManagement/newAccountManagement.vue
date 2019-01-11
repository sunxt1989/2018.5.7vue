<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>企业信息</h2>
                <router-link to="/AccountManagement/AccountManagement" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>企业名称：</span>
                        <input class="ipt" type="text" v-model="companyName" maxlength="50">
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>统一社会信用代码</span>
                        <input class="ipt" type="text" v-model="idNumber" maxlength="18">
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>企业所在地区</span>
                        <el-select class="adr" v-model="provinceCode" placeholder="省" @change="changeProvince">
                            <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.name"
                                :value="item.provinceCode">
                            </el-option>
                        </el-select>
                        <el-select class="adr" v-model="cityCode" placeholder="市" @change="changeCity">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.name"
                                :value="item.cityCode">
                            </el-option>
                        </el-select>
                        <el-select class="adr" v-model="areaCode" placeholder="区">
                            <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.name"
                                :value="item.areaCode">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>企业所属行业</span>
                        <el-select class="sel" v-model="companyType" placeholder="请选择">
                            <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>纳税人性质</span>
                        <el-select class="sel" v-model="companyScale" placeholder="请选择">
                            <el-option
                                v-for="item in options5"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>启动日期</span>
                        <el-date-picker
                            class="data"
                            v-model="startDate"
                            type="date"
                            :picker-options="pickerOption1"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>注册资金（元）</span>
                        <input class="ipt" type="text" v-model="registeredCapital" maxlength="50" @change="changeMoney">
                    </li>
                    <li class="ptx">
                        <span class="tit"><span class="red">*</span>营业执照</span>
                        <span class="tit2">上传附件所有信息需清晰可见，内容真实有效，不得做任何修改。照片支持jpg.jpeg.png格式，大小不超过4M</span>
                        <el-upload
                            class="upload"
                            action="http://192.168.2.190:8080/web/upload2.html"
                            list-type="picture-card"
                            ref="upload"
                            :show-file-list=true
                            :limit='1'
                            :http-request="myUpload"
                            :on-preview="handlePictureCardPreview"
                            :before-upload='beforeAvatarUpload'
                            :on-exceed="onExceed"
                            :on-change='onChange'
                            :on-remove='onRemove'
                            :auto-upload="false">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" class="dialog">
                            <h2 class="dialogImageName">{{dialogImageName}}</h2>
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </li>
                    <li class="btn">
                        <p>请认真填写账套信息，经后台审核（24小时内完成审核）通过后即可正常使用</p>
                        <el-button @click="model" type="primary" class="sub1" >保存</el-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    export default{
        data(){
            return{
                companyName:'',//公司名称
                idNumber:'',//统一社会信用代码
                startDate:'',//启动日期
                registeredCapital:'0.00',//注册资金
                companyType:'',//公司类型
                options4:[
                    {value:6,label:'批发和零售业'},
                    {value:9,label:'信息传输、软件和信息技术服务业'},
                    {value:12,label:'租赁和商务服务业'},
                ],
                companyScale:'',//纳税人性质
                options5:[
                    {value:1,label:'小规模纳税人'},
                    {value:2,label:'一般纳税人'},
                ],

                provinceCode:'',//省
                cityCode:'',//市
                areaCode:'',//区
                options1:[],//省list
                options2:[],//市list
                options3:[],//区list

                idNumberFileName:'',//营业执照上传文件的名称
                idNumberUrlData:'',//营业执照上传文件的data
                dialogVisible: false,//dialog是否打开状态
                dialogImageName:'',//展示图片名称
                dialogImageUrl:'',//展示图片URL
                punch:0,//打点器,判断是否有图片上传

                pickerOption1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            //注册资金change事件
            changeMoney(){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(this.registeredCapital)){
                    this.$message.error('请正确输入注册资金');
                    this.registeredCapital = '0.00';
                    return
                }
                this.registeredCapital = number.number(this.registeredCapital)
            },
            submitUpload(){
                this.$refs.upload.submit();
            },
            //限制用户上传图片格式和大小
            beforeAvatarUpload(file){
                this.loading = true;
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
                this.$message.error('超过上传图片最大张数，您一次只能上传1张图片!');
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
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            myUpload(content){
//                console.log(content);
                var file = content.file;
                var _this = this;
                this.readBlobAsDataURL(file,function (dataurl){
                    _this.idNumberUrlData = dataurl;
                    _this.idNumberFileName = file.name;
                    _this.submit()
                });
            },

            //省级change事件
            changeProvince(){
                this.loading = true
                this.cityCode = '';
                this.areaCode = '';
                this.axios(1)
            },
            //市级change事件
            changeCity(){
                this.loading = true
                this.areaCode = ''
                this.axios(2)
            },

            model(n){
                let str1=/[A-Z0-9]{18}/;
                let registeredCapital = unNumber.unNumber(this.registeredCapital)
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
                    if(this.companyName == ''){
                        this.$message.error('请正确输入企业名称');
                        this.loading = false;
                        return
                    }else if(!(str1.test(this.idNumber))){
                        this.$message.error('请正确输入统一社会信用代码');
                        this.loading = false;
                        return
                    }else if(this.provinceCode == ''|| this.cityCode == ''){
                        this.$message.error('请正确输入企业所在地');
                        this.loading = false;
                        return
                    }else if( !(this.cityCode == '441900' ||
                        this.cityCode == '442000'||
                        this.cityCode == '460300' ||
                        this.cityCode == '460400' ||
                        this.cityCode == '620200') && this.areaCode == ''){
                        this.$message.error('请正确输入企业所在地');
                        this.loading = false;
                        return
                    } else if(this.companyType == ''){
                        this.$message.error('请正确输入企业所属行业');
                        this.loading = false;
                        return
                    }else if(this.companyScale == ''){
                        this.$message.error('请正确输入纳税人性质');
                        this.loading = false;
                        return
                    }else if(this.startDate == ''){
                        this.$message.error('请正确输入启动日期');
                        this.loading = false;
                        return
                    }else if(registeredCapital == 0){
                        this.$message.error('请正确输入注册资金');
                        this.loading = false;
                        return
                    }else if(this.punch == 0){
                        this.$message.error('请上传营业执照');
                        this.loading = false;
                        return
                    }

                    this.$confirm('确定是否保存？', '提示', {
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
                        this.submitUpload();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            submit(){
                this.loading = true;
                var url = addUrl.addUrl('AccountManagementAdd');
                var params = new URLSearchParams();

                params.append('companyName',this.companyName);
                params.append('idNumber',this.idNumber);
                params.append('companyProvince',this.provinceCode);
                params.append('companyCity',this.cityCode);
                params.append('companyDistrict',this.areaCode);
                params.append('companyType',this.companyType);
                params.append('companyScale',this.companyScale);
                params.append('registeredCapital',unNumber.unNumber(this.registeredCapital));
                params.append('idNumberFileName',this.idNumberFileName);
                params.append('idNumberUrlData',this.idNumberUrlData);
                params.append('startDate',this.startDate);

                axios({
                    method:'post',
                    url:url,
                    data:params,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    }
                },params)
                    .then(response=> {
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                            window.location.reload()
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                        this.loading = false;
                    })
                    .catch(error=> {
                        this.loading = false;
//                        console.log(error);
                        this.$message.error('提交失败，请重试！');
                    })
            },
            axios(n){
//                console.log(this.provinceCode);
                var params = new URLSearchParams();
                var url = addUrl.addUrl('getArea')

                params.append('provinceCode',this.provinceCode);
                params.append('cityCode',this.cityCode);

                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value
                        if(n == 1){
                            this.options2 = data
                        }else if(n == 2){
                            this.options3 = data
                        }
                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
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
            var url = addUrl.addUrl('getArea')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    this.options1 = data
                    let date = new Date();
                    if(date.getMonth()+1 < 10){
                        this.startDate = date.getFullYear() + '-0' + (date.getMonth()+1) ;
                    }else{
                        this.startDate = date.getFullYear() + '-' + (date.getMonth()+1);
                    };

                    if(date.getDate() < 10){
                        this.startDate += '-0' + date.getDate()
                    }else{
                        this.startDate += '-' + date.getDate()
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
        display: inline-block;
        width:56px;
        height:30px;
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
    .list .btn{
        width:100%;
        display: inline-block;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .btn p{
        display: inline-block;
        font-size:14px;
        color: red;
        margin-left: 200px;
    }
    .list .btn .sub1{
        width:400px;
        margin-left: 256px;
        margin-bottom: 50px;
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
    .list li .adr{
        width:135px;
        height:28px;
        margin-right: 10px;
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
    }
    .list .ptx .tit2{
        font-size:14px;
        display: inline-block;
        width:420px;
        text-align: left;
        margin-right: 20px;
        vertical-align: middle;
        line-height: 20px;
        color: #999;
    }
    .list .ptx .upload{
        display: inline-block;
        width:400px;
        margin-left: 270px;
        margin-top: 20px;
    }
</style>
