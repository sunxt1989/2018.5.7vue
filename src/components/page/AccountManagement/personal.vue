<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>个人信息</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">

                <ul class="list cf">
                    <li class="ptx">
                        <img v-if="!imageUrl" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="imageUrl" alt="">
                        <input type="file" class="avatar" @change="changeUrl">
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>姓名</span>
                        <input class="ipt" type="text" v-model="userName" maxlength="50">
                    </li>
                    <li class="pt">
                        <span class="tit">性别</span>
                        <el-radio v-model="gender" label=1>男</el-radio>
                        <el-radio v-model="gender" label=2>女</el-radio>
                    </li>
                    <li class="pt">
                        <span class="tit">身份证</span>
                        <input class="ipt" type="text" v-model="idNumber" maxlength="18">
                    </li>
                    <li class="pt">
                        <span class="tit">邮箱</span>
                        <input class="ipt" type="text" v-model="email" maxlength="50">
                    </li>
                    <li class="pt">
                        <span class="tit">个人说明</span>
                        <textarea class="iptx" v-model="remark" maxlength="50"></textarea>
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
                userName:'',//姓名
                gender:'1',//性别
                idNumber:'',//身份证
                email:'',//邮箱
                remark:'',//个人说明
                imageUrl:'',//头像图片地址
                imageName:'',//头像图片名称

                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            changeUrl(e){
                let file = e.srcElement.files[0];
//                console.log(file);
                let imageUrl = ''
                if(file){
                    let isJPG = file.type === 'image/jpeg'||'image/png'||'image/jpg';
                    let isLt4M = file.size / 1024 / 1024 < 4;
                    if (!isJPG) {
                        this.loading = false;
                        this.isLoading = false;
                        this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                        return
                    }
                    if (!isLt4M) {
                        this.loading = false;
                        this.isLoading = false;
                        this.$message.error('上传图片大小不能超过 4MB!');
                        return
                    }
                    imageUrl = window.URL.createObjectURL(file)
                    var _this = this;
                    this.readBlobAsDataURL(file,function (dataurl){
                        imageUrl = dataurl
                        _this.imageUrl = imageUrl
                    });
                    this.imageName = file.name
                }else{
                    this.imageUrl = '../../../../static/images/tit.png'
                    this.imageName = ''
                }
            },
            //url转换base方法
            readBlobAsDataURL(blob, callback) {
                var fileReader = new FileReader();
                fileReader.onload = function(e){
                    callback(e.target.result);
                };
                fileReader.readAsDataURL(blob);
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/')
                    }).catch(() => {
                        this.loading = false;
                    });
                }else{
                    if(this.userName == ''){
                        this.$message.error('请正确输入姓名');
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
                        this.submit()
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
            submit(){
                var url = addUrl.addUrl('personalSubmit');
                var params = new URLSearchParams();
                params.append('userName',this.userName);
                params.append('gender',this.gender);
                params.append('remark',this.remark);
                params.append('faceUrlData',this.imageUrl);
                params.append('faceFileName',this.imageName);
                params.append('email',this.email);
                params.append('idNumber',this.idNumber);

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
                            this.$router.push('/');
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                            let obj = {};
                            obj.name = this.userName
                            this.$store.commit('add',obj)
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                        this.loading = false;
                        this.isLoading = false;
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
            var url = addUrl.addUrl('personal')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value.item
                    this.userName = data.userName
                    this.gender = String(data.gender)
                    this.idNumber = data.idNumber
                    this.email = data.email || ''
                    this.remark = data.remark
                    this.imageUrl = data.faceUri
                    this.imageName = data.faceUri//当没有更新头像时，将url参数传递给name保证后台判断头像继续使用原头像

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
    .list .ptx{
        display: block;
        width:120px;
        height:120px;
        margin-top: 20px;
        margin-left: 391px;
        float: left;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
    }
    .list .ptx img{
        width:122px;
        height: 122px;
    }
    .list .ptx .avatar{
        width: 122px;
        height: 122px;
        position: absolute;
        top:0;
        left:0;
        opacity: 0;
        cursor: pointer;
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
    .list li .iptx{
        display: inline-block;
        width:400px;
        height:50px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
        resize: none;
    }

    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }

</style>
