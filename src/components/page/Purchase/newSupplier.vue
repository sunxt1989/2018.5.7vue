<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>新建交易方</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub" :loading="isLoading">保存</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>新建交易方</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <el-radio-group class="newSupplier" v-model="tradeType">
                            <el-radio :label=true >公司</el-radio>
                            <el-radio :label=false >个人</el-radio>
                        </el-radio-group>
                    </li>

                    <li class="sm" v-show="tradeType">
                        <span class="tit"><span class="red">*</span>公司名称</span>
                        <input class="ipt" type="text" v-model="tradeName" >
                    </li>
                    <li class="sm" v-show="tradeType">
                        <span class="tit">统一社会信用代码</span>
                        <input class="ipt" type="text" v-model="tradeIdNumber" maxlength="18">
                    </li>

                    <li class="sm" v-show="!tradeType">
                        <span class="tit"><span class="red">*</span>姓名</span>
                        <input class="ipt" type="text" v-model="userName" >
                    </li>
                    <li class="sm" v-show="!tradeType">
                        <span class="tit">身份证号</span>
                        <input class="ipt" type="text" v-model="IDnumber" maxlength="18">
                    </li>

                    <li class="sm">
                        <span class="tit">地址</span>
                        <input class="ipt" type="text" v-model="tradeAddress" >
                    </li>
                    <li class="sm">
                        <span class="tit">固定电话</span>
                        <input class="ipt" type="text" v-model="tradeTelephone"  maxlength="15">
                    </li>
                    <li class="sm">
                        <span class="tit">联系人</span>
                        <input class="ipt" type="text" v-model="tradePerson1">
                    </li>
                    <li class="sm">
                        <span class="tit">联系电话</span>
                        <input class="ipt" type="text" v-model="tradePersonPhone1" maxlength="15">
                    </li>
                    <li class="sm">
                        <span class="tit">紧急联系人</span>
                        <input class="ipt" type="text" v-model="tradePerson2">
                    </li>
                    <li class="sm">
                        <span class="tit">紧急联系电话</span>
                        <input class="ipt" type="text" v-model="tradePersonPhone2" maxlength="15">
                    </li>
                    <li class="sm">
                        <span class="tit">银行卡号</span>
                        <input class="ipt" type="text" v-model="bankCode" maxlength="50">
                    </li>

                    <li class="sm">
                        <span class="tit">身份选择</span>
                        <el-select class="sel" v-model="identity" multiple placeholder="请选择" >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
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
        data(){
            return{
                userName:'',//姓名
                IDnumber:'',//身份证号
                tradeName:'',//公司名称
                tradeIdNumber:'',//统一社会信用代码
                tradeAddress:'',//地址
                tradeTelephone:'',//固定电话
                tradePerson1:'',//联系人
                tradePersonPhone1:'',//联系电话
                tradePerson2:'',//紧急联系人
                tradePersonPhone2:'',//紧急联系电话
                tradeType: true,//true为公司 false为个人
                bankCode:'',//银行卡号
                identity:'',//身份选择
                options:[
                    {value:'0',label:'客户'},
                    {value:'1',label:'供应商'}
                ],
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:false,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            model(n){
                this.loading = true
                var str3 = /^\d+$/;//判断是否为纯数字
                var bankCode = this.bankCode;
//                console.log(this.bankCode);
//                console.log(typeof this.bankCode);
                if(n == 0){
                    this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    if(this.tradeType){
                        if(this.tradeName == ''){
                            this.$message.error('请正确输入公司名称');
                            this.loading = false
                            return
                        }
                    }else{
                        if(this.userName == ''){
                            this.$message.error('请正确输入姓名');
                            this.loading = false
                            return
                        }
                    }
                    if(bankCode != ''){
                        if(bankCode.length < 6 || !(str3.test(bankCode))){
                            this.$message.error('请正确输入银行卡号');
                            this.loading = false
                            return
                        }
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
                            type:'info',
                            message:'已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },
            axios(){
                var tradeName = ''
                var tradeIdNumber = ''
                var tradeType = ''
                var supplierFlg = 0 //供应商
                var customFlg = 0 //客户
                var identity = this.identity
                if(this.tradeType){
                    tradeName = this.tradeName
                    tradeIdNumber = this.tradeIdNumber
                    tradeType = 1;
                }else{
                    tradeName = this.userName
                    tradeIdNumber = this.IDnumber
                    tradeType = 2;
                }

                for(var i = 0; i < identity.length; i++){
                    if(identity[i] == 0){
                        customFlg = 1
                    }else if(identity[i] == 1){
                        supplierFlg = 1
                    }
                }
                var params = new URLSearchParams();
                let url = addUrl.addUrl('saveSupplier')
                params.append('supplierId','');
                params.append('tradeName',tradeName);
                params.append('tradeIdNumber',tradeIdNumber);
                params.append('tradeAddress',this.tradeAddress);
                params.append('tradeTelephone',this.tradeTelephone);
                params.append('tradePerson1',this.tradePerson1);
                params.append('tradePersonPhone1',this.tradePersonPhone1);
                params.append('tradePerson2',this.tradePerson2);
                params.append('tradePersonPhone2',this.tradePersonPhone2);
                params.append('bankCode',this.bankCode);
                params.append('supplierFlg',supplierFlg);
                params.append('customFlg',customFlg);
                params.append('tradeType',tradeType);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
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
        }
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
        text-align: left;
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
    .top .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }

</style>
