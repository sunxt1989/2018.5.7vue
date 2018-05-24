<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>新建借款单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button  @click="model(1)" size="small" type="danger" class="sub" >提交审批</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content cf">
                <div class="left">
                    <ul>
                        <li>
                            <span class="red">*</span>
                            金额
                        </li>
                        <li>
                            <span class="red">*</span>
                            借款日期
                        </li>
                        <li>
                            <span class="red">*</span>
                            借款部门
                        </li>
                        <li>
                            借款事由
                        </li>
                        <li>
                            附件
                        </li>
                    </ul>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <input type="text" class="money" name="money" id="money" v-model="money">
                        </li>
                        <li>
                            <el-date-picker
                                class="data"
                                v-model="nowdata"
                                type="date"
                                @change="changeTime"
                                placeholder="选择日期">
                            </el-date-picker>
                        </li>
                        <li>
                            <el-select class="department" v-model="departmentId" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.departmentName"
                                    :value="item.idStr">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            <input type="text" class="cause" name="cause" id="cause" v-model="discription">
                        </li>
                        <li class="upload">
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
                                :file-list="fileList"
                                :auto-upload="false">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" class="dialog">
                                <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
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
        data(){
            return{
                money:0,//金额
                nowdata:'',//当前日期
                debitDate:'',//上传日期（格式修改后的）
                departmentId:'',//部门
                options:[],//部门详情
                discription:'',//借款事由
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

                loading:true,
            }
        },
        methods: {
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
            submit(){
                this.loading = true;
                var params = new URLSearchParams();
                console.log(this.money);
                console.log(this.allName);

                this.imgUrl1 = this.allBase[0] ? this.allBase[0] : '';
                this.imgUrl2 = this.allBase[1] ? this.allBase[1] : '';
                this.imgUrl3 = this.allBase[2] ? this.allBase[2] : '';
                this.imgUrl4 = this.allBase[3] ? this.allBase[3] : '';

                this.imgName1 = this.allName[0] ? this.allName[0] : '';
                this.imgName2 = this.allName[1] ? this.allName[1] : '';
                this.imgName3 = this.allName[2] ? this.allName[2] : '';
                this.imgName4 = this.allName[3] ? this.allName[3] : '';

                params.append('debitId',0);
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
                    .catch(error=> {
                        this.loading = false;
                        console.log(error);
                        this.$message.error('提交失败，请重试！');
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
                this.debitDate = date.getFullYear()+'-'+((date.getMonth()+1) > 9 ?(date.getMonth()+1):'0'+(date.getMonth()+1))+'-'+ (date.getDate()>9 ? date.getDate():'0'+date.getDate())
                console.log(this.debitDate);
            },
        },
        created(){
            axios.post('http://192.168.2.192:8080/web/vue/debit/department.html')
                .then(response=> {
                    var data = response.data.value;
                    this.options = data;
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
    .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
    }
    .left{
        display: inline-block;
        width:30%;
        height:600px;
        float: left;
        text-align: right;
        background-color: #fff;
        font-size:16px;
    }
    .right{
        display: inline-block;
        width:70%;
        height:600px;
        float: left;
        text-align: left;
        background-color: #fff;
        font-size:16px;
    }
    ul{
        margin-left: 10px;
    }
    ul li{
        height:36px;
        line-height: 36px;
        margin: 20px 0;
    }
    input{
        width:478px;
        height:26px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .data{
        width:500px;
    }
    .department{
        width:500px;
    }
    .upload{
        height:auto;
    }
    .dialog{
        text-align: center;
    }
    .dialogImageName{
        font-size:16px;
    }
</style>
