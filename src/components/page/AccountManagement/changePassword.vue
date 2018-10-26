<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>修改密码</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>

            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>修改密码</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">原密码</span>
                        <input class="ipt" type="password" v-model="oldPassword" maxlength="20" @change="changeOldPassword">
                    </li>
                    <li class="sm">
                        <span class="tit">设置密码</span>
                        <input class="ipt" type="password" v-model="newPassword" maxlength="20" @change="changeNewPassword(0)">
                    </li>
                    <li class="sm">
                        <span class="tit">确认密码</span>
                        <input class="ipt" type="password" v-model="repeatPassword" maxlength="20" @change="changeNewPassword(1)">
                    </li>
                    <li class="sm">
                        <el-button @click="model(1)" type="primary" class="sub" :loading="isLoading">提交</el-button>
                    </li>

                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    export default{
        data() {
            return{
                oldPassword:'',//原密码
                newPassword:'',//设置密码
                repeatPassword:'',//确认密码

                loading:false,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            changeOldPassword(){
                let str = /^[\x21-\x7E]{6,20}$/
                if(!str.test(this.oldPassword)){
                    this.$message.error('请正确输入密码')
                    this.oldPassword = ''
                }
            },
            changeNewPassword(n){
                let str = /^[\x21-\x7E]{6,20}$/
                if(n == 0){
                    if(!str.test(this.newPassword)){
                        this.$message.error('请正确输入密码')
                        this.newPassword = ''
                    }
                }else{
                    if(!str.test(this.repeatPassword)){
                        this.$message.error('请正确输入密码')
                        this.repeatPassword = ''
                    }
                }
            },
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false;
                    });
                }else{
                    if(this.oldPassword == ''){
                        this.$message.error('请填写密码')
                        this.loading = false;
                        return
                    }
                    if(this.newPassword == ''){
                        this.$message.error('请填写密码')
                        this.loading = false;
                        return
                    }
                    if(this.repeatPassword == ''){
                        this.$message.error('请填写密码')
                        this.loading = false;
                        return
                    }
                    if(!(this.repeatPassword === this.newPassword)){
                        this.$message.error('重新设置密码两次填写不一致')
                        this.loading = false;
                        return
                    }
                    this.isLoading = true;
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
                        this.axios();
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
            axios(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('changePassword')
                let url2 = addUrl.addUrl('toLogin')

                params.append('passwordOld',this.oldPassword);
                params.append('password',this.newPassword);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                            window.location.href = url2
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
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
        width:100%;
        text-align: center;
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
    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:100px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list .sub{
        width:300px;
        font-size:12px;
    }

</style>
