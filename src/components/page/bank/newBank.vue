<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>新建银行账户</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" >保存</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2" >启用</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>新建银行账户</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">银行名称</span>
                        <input class="ipt" type="text" v-model="bankName" maxlength="50">
                    </li>
                    <li class="sm">
                        <span class="tit">开户行</span>
                        <input class="ipt" type="text" v-model="bankChildName" maxlength="50">
                    </li>
                    <li class="sm">
                        <span class="tit">银行卡号</span>
                        <input class="ipt" type="text" v-model="bankCode" maxlength="21" @change="changeCode">
                    </li>
                    <li class="sm">
                        <span class="tit">账户余额</span>
                        <input class="ipt" type="text" v-model="initialAmount" @change="changMoney">
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    export default{
        data() {
            return{
                bankName:'',//银行名称
                bankChildName:'',//开户行
                bankCode:'',//银行卡号
                initialAmount:'',//账户余额

                loading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            changeCode(){
                let bankCode = this.bankCode
                let str = /^\d+$/;//判断只允许输入正整数
                if(!str.test(bankCode)){
                    this.$message.error('请正确输入银行卡号');
                    this.bankCode = 0;
                    return
                }
            },
            changMoney(){
                let initialAmount = this.initialAmount;
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(initialAmount)){
                    this.$message.error('请正确输入账户余额');
                    this.initialAmount = '0.00';
                    return
                }
                this.initialAmount = number.number(initialAmount)
            },
            model(n){
                if(n == 0){
                    this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                    });
                }else{
                    if (this.bankName == '') {
                        this.$message.error('请正确输入银行名称');
                        this.loading = false;
                        return
                    } else if (this.bankChildName == '') {
                        this.$message.error('请正确输入开户行');
                        this.loading = false;
                        return
                    }
                    if (this.bankCode == '0' || this.bankCode == '') {
                        this.$message.error('请正确输入银行卡号');
                        this.loading = false;
                        return
                    }
                    if(this.initialAmount == ''){
                        this.$message.error('请正确输入账户余额');
                        this.loading = false;
                        return
                    }

                    this.$confirm('确定是否保存？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios(n);
                        this.loading = true;
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            axios(n){

                var params = new URLSearchParams();
                var url = addUrl.addUrl('bankSave')

                params.append('bankId','');
                params.append('bankAccountType',2);
                params.append('bankName',this.bankName);
                params.append('bankChildName',this.bankChildName);
                params.append('bankCode',this.bankCode);
                params.append('initialAmount',unNumber.unNumber(this.initialAmount));

                params.append('bookStatus',(n - 1));

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false;
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
        width:50%;
    }
    .list .pt{
        width:100%;

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
    .list li .check{
        height:28px;
        padding: 5px 10px;
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
        vertical-align: middle;
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

</style>
