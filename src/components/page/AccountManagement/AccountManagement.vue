<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>企业信息</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">

                <ul class="list cf">
                    <li class="ptx">
                        <router-link :to=linkUrl >
                            <img src="../../../../static/images/zhangtaoguanli.png" alt="">
                        </router-link>
                    </li>
                    <li class="pt">
                        <span class="tit">角色：{{userAuthName}}</span>
                    </li>
                    <li class="pt">
                        <router-link to="/AccountManagement/newAccountManagement" class="add">创建账套</router-link>
                    </li>
                    <li class="pt">
                        <span class="tit2">输入邀请码:</span>
                    </li>
                    <li class="pt">
                        <input type="text" class="ipt" v-model="inviteCode">
                    </li>
                    <li class="pt">
                        <div class="join" @click="join">加入账套</div>
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
                userAuthName:'',//姓名
                authStatus:0,//状态 1：审核中，2：审核通过，3：审核失败，4：未审核
                inviteCode:'',//邀请码
                linkUrl:'/AccountManagement/seeAccountManagement',

                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            //加入账套
            join(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('join')
                this.loading = true;
                if(this.inviteCode == ''){
                    this.$message.error('请输入邀请码');
                    this.loading = false;
                    return
                }else{
                    params.append('inviteCode',this.inviteCode);
                    axios.post(url,params)
                        .then(response=> {
//                            console.log(response);
                            let status = response.data.status
                            let msg = response.data.msg
                           if(status == 200){
                               this.$message.success('加入账套成功')
                           }else if(status == 400){
                               this.$message.error(msg);
                           }
                            this.loading = false
                        })
                        .catch(error=> {
                            this.loading = false
//                    console.log(error);
                            alert('网络错误，不能访问');
                        });
                }
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
            var url = addUrl.addUrl('AccountManagement')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    this.userAuthName = data.userAuthName
                    let authStatus = data.authStatus
                    if(authStatus == 2){
                        this.linkUrl = '/AccountManagement/seeAccountManagement'
                    }else{
                        this.linkUrl = '/AccountManagement/changeAccountManagement'
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
        width:60%;
        text-align: center;
        margin: 0 auto;
    }
    .list .pt{
        width:100%;
        display: inline-block;
        text-align: center;
        margin-top: 20px;
        float: left;
    }
    .list .ptx{
        width:100%;
        display: inline-block;
        text-align: center;
        float: left;
    }
    .list .ptx img{
        width:200px;
    }
    .list .pt .tit{
        font-size:14px;
        display: inline-block;
        width:422px;
        vertical-align: middle;
        line-height: 20px;
    }
    .list .pt .add{
        display: inline-block;
        width:422px;
        height:50px;
        background-color: #fff;
        border: 1px solid #1a96d4;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        text-decoration: none;
        color: #1a96d4;
    }
    .list .pt .tit2{
        width:422px;
        display: inline-block;
        font-size:14px;
        text-align: left;
        color: #6c6c6c;
    }
    .list .pt .ipt{
        width:402px;
        display: inline-block;
        height:34px;
        font-size:14px;
        text-align: left;
        padding: 3px 10px;
        border: 1px solid #ccc;
    }
    .list .pt .join{
        display: inline-block;
        width:422px;
        height:50px;
        background-color: #1a96d4;
        border: 1px solid #1a96d4;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        text-decoration: none;
        color: #fff;
    }


</style>
