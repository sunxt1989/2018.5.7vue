<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>新建借款单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button  @click="model(1)" size="small" type="danger" class="sub" >提交审批</el-button>
            </div>
        </div>
        <div class="ww cf">
            <div class="w">
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
                                :limit = 'limit'
                                :http-request="myUpload"
                                :on-preview="handlePictureCardPreview"
                                :before-upload = 'beforeAvatarUpload'
                                :on-exceed ="onExceed"
                                :on-error ="onError"
                                :on-change = 'onChange'
                                :on-remove = 'onRemove'
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
                fileUid:0,//uid顺序数组
                fileUri:[],//上传插件后台返回url地址
                num:0,//判断uid返回数量
                newFilUri:'',//临时uri容器
                newFileList:'',//临时fileList容器
                punch:0,//打点器,判断是否有图片上传
                fileList:[],//上传成功展示图片参数
                nowFileList:[],//当前上传图片返回的参数

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
//                    if(this.money <= 0){
//                        this.$message.error('请正确输入金额');
//                        this.loading = false;
//                        return
//                    }else if(this.debitDate == ''){
//                        this.$message.error('请正确输入借款日期');
//                        this.loading = false;
//                        return
//                    }else if(this.departmentId == ''){
//                        this.$message.error('请正确输入借款部门');
//                        this.loading = false;
//                        return
//                    }

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
            onChange(file,fileList){
                this.punch++;
//                console.log(file);
//                console.log(fileList);
            },
            onRemove(file,fileList){
//                console.log(file);
//                console.log(fileList);
                this.punch--;
//                this.fileList = fileList
            },
            myUpload(content){
//                console.log(content);
                var formData = new FormData();
                this.fileUid++;
                var file = content.file;
                console.log(this.fileUid);

                formData.append('file',file);
                formData.append('uid2',this.fileUid);

                axios({
                    method:'post',
                    url:content.action,
                    data:formData
                }).then(res=>{
                    console.log(res);
                    var value = res.data.value;
                    var n = 0;
                    this.num++;

                    if(res.data.status == 400 && this.num != this.fileUid){
                        this.onError();
                        return
                    }else{
                        //后台在传递参数时有时会发生uid为空，为了fileUri顺序正确添加if判断
                        if(value.uid2 != ''){
                            this.nowFileList[value.uid2] = value
                        }else{
                            this.newFileList = value;
                        }

                        if(this.num == this.fileUid.length){
                            this.loading = false;
                            //判断是否出现了uid为空
                            if(this.newFileList.uid == ''){
                                console.log(this.nowFileList);
                                //uid出现为空时，找出数组newFileList为空的位置，把newFileList添加进去
                                for(var ii = 0; ii < this.nowFileList.length; ii++){
                                    console.log(this.nowFileList[ii]);
                                    if(this.nowFileList[ii] == ''){//if空的位置不在最后一位的时候
                                        this.nowFileList[ii] = this.newFileList
                                    }else{//else空的位置在最后一位的时候
                                        this.nowFileList.push(this.newFileList)
                                    }
                                }
                            }
                            this.fileList = this.nowFileList;
                            console.log(this.fileList);
//                        this.submit()
                        }
                    }
                })
            },
            submit(){
                this.loading = true;
                var params = new URLSearchParams();
                console.log(this.nowFileList);
                var list = this.nowFileList;
                for(var i = 0; i < list.length; i++ ){
                    this.imgUrl1 = list[0].url;
                    this.imgName1 = list[0].name
                    this.imgUrl2 = list[1].url;
                    this.imgName2 = list[1].name
                    this.imgUrl3 = list[2].url;
                    this.imgName3 = list[2].name
                    this.imgUrl4 = list[3].url;
                    this.imgName4 = list[3].name

                }
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

                axios.post('http://192.168.2.192:8080/web/vue/debit/edit/debit/submit.html',params)
                    .then(response=> {
                        this.loading = false
                        console.log(response);
                        this.$router.go(-1);
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                    })
                    .catch(error=> {
                        this.loading = false
                        console.log(error);
                        alert('网络错误，不能访问');
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
                    var newOptions = [];
                    this.options = data;
                    console.log(this.options);
                    this.loading = false
                })
                .catch(error=> {
                    this.loading = false
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
        position: absolute;
        right:20px;
        font-size:12px;
    }
    .sub{
        position: absolute;
        right:110px;
        font-size:12px;
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
