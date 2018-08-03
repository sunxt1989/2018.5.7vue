<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>缴税单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-if="!isReject" size="small" type="primary" class="sub1">保存</el-button>
                <el-button @click="model(2)" v-if="!isReject" size="small" type="danger" class="sub2">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">税种</span>
                        <el-select v-model="taxType" slot="prepend" placeholder="请选择" class="sel" :disabled="isReject">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">总金额</span>
                        <input class="ipt" type="text" v-model="countMoney" maxlength="14" @change="changeMoney" :readonly="isReject">
                    </li>
                    <li class="pt">
                        <span class="tit">日期</span>
                        <el-date-picker
                            class="iptData"
                            v-model="submitDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOption1"
                            placeholder="选择日期"
                            :disabled="isReject">
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit">说明</span>
                        <textarea class="iptx" v-model="description" maxlength="50"  :readonly="isReject"></textarea>
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
                taxType:'',//税种
                options:[
                    {value:1,label:'印花税'},
                    {value:2,label:'土地使用税'},
                    {value:3,label:'车船使用税'},
                    {value:4,label:'房产税'},
                    {value:5,label:'消费税'},
                    {value:6,label:'残疾人就业保障金'},
                    {value:7,label:'增值税'},
                ],
                countMoney:'0.00',//总金额
                submitDate:'',//日期
                description:'',//说明
                isReject:false,//是否可以修改
                pickerOption1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                id:this.$route.params.debitId,
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            changeMoney(){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str.test(this.countMoney)){
                    this.$message.error('请正确输入金额');
                    this.countMoney = '0.00';
                    return
                }
                this.countMoney = number.number(this.countMoney)
            },
            model(n){
                this.loading = true;
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
                    if(this.taxType == ''){
                        this.$message.error('请正确输入税种');
                        this.loading = false;
                        return
                    }
                    if(this.countMoney == '0.00'){
                        this.$message.error('请正确输入总金额');
                        this.loading = false;
                        return
                    }
                    if(this.submitDate == ''){
                        this.$message.error('请正确输入日期');
                        this.loading = false;
                        return
                    }
                    if(this.description == ''){
                        this.$message.error('请正确输入说明');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                    });
                }
            },
            submit(n){
                let url = '';
                let params = new URLSearchParams();

                params.append('id',this.id);
                params.append('taxType',this.taxType);
                params.append('countMoney',unNumber.unNumber(this.countMoney));
                params.append('description',this.description);
                params.append('submitDate',this.submitDate);
                if(n == 1){
                    url = addUrl.addUrl('TaxationSave')
                }else if(n == 2){
                    url = addUrl.addUrl('TaxationSubmit')
                }
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
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
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
            var url = addUrl.addUrl('seeTaxation')
            params.append('id',this.id);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    this.taxType = data.taxPay.taxType
                    this.countMoney = number.number(data.taxPay.amount)
                    this.submitDate = data.taxPay.submitTimeStr
                    this.description = data.taxPay.description
                    let auditFlg = data.taxPay.auditFlg

                    if(auditFlg < 2){
                        this.isReject = false;
                    }else{
                        this.isReject = true;
                    }
                    this.loading = false;
                })
                .catch(error=> {
//                    console.log(error);
                    alert('网络错误，不能访问');
                    this.loading = false;
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
    .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .sub2{
        position: absolute;
        right:200px;
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
    .list .sel{
        width:422px;
        height:36px;
    }
    .list .iptData{
        width:422px;
        height:36px;
    }
    .list .ptx img{
        width:122px;
        height: 122px;
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
