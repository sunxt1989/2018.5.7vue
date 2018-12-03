<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>录入抵扣专票</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub" :loading="isLoading">保存</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>录入抵扣专票</span>
                </div>
                <ul class="list cf">
                    <li class="sm" style=" position: relative;">
                        <span class="tit"><span class="red">*</span>公司</span>
                        <el-select class='sel' v-model="receiptName">
                            <el-option v-for="item in tradeList"
                                       :key="item.value"
                                       :label="item.tradeName"
                                       :value="item.tradeName">
                            </el-option>
                        </el-select>
                        <input class="opt" type="text" v-model="receiptName" maxlength="18" placeholder="请选择或输入">
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>日期</span>
                        <el-date-picker
                            class="iptData"
                            v-model="receiptDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>价税合计</span>
                        <input class="ipt" type="text" v-model.lazy="money"  maxlength="20">
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>税额</span>
                        <input class="ipt" type="text" v-model.lazy="taxMoney" maxlength="20">
                    </li>
                    <li class="sm">
                        <span class="tit">发票类型</span>
                        <input class="ipt" type="text" value="专票" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">进销项</span>
                        <input class="ipt" type="text" value="进项" readonly>
                    </li>
                    <li class="pt cf">
                        <span class="tit2"><span class="red">*</span>明细</span>
                        <textarea class="tex" v-model="discription" maxlength="50"></textarea>
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
        data() {
            return{
                receiptName:'',//公司名称
                receiptDate:'',//日期
                money:'',//价税合计
                taxMoney:'',//税额
                discription:'',//发票明细
                tradeList:[],

                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        watch:{
            money:function(val){
                if(val < 0){
                    this.money = '0.00'
                }else{
                    this.money = number.number(val)
                }

            },
            taxMoney:function(val){
                if(val < 0){
                    this.taxMoney = '0.00'
                }else{
                    this.taxMoney = number.number(val)
                }
            }
        },
        methods: {
            model(n){
                this.loading = true
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
                    if (this.receiptName == '') {
                        this.$message.error('请正确输入公司名称');
                        this.loading = false;
                        return
                    } else if (this.receiptDate == '') {
                        this.$message.error('请正确输入日期');
                        this.loading = false;
                        return
                    }
                    if (this.money == '' || this.money == '0.00') {
                        this.$message.error('请正确输入价税合计');
                        this.loading = false;
                        return
                    }
                    if(this.taxMoney == '' || this.taxMoney == '0.00'){
                        this.$message.error('请正确输入税额');
                        this.loading = false;
                        return
                    }
                    if(unNumber.unNumber(this.money) < unNumber.unNumber(this.taxMoney)){
                        this.$message.error('输入的税额不得大于价税合计');
                        this.loading = false;
                        return
                    }
                    if(this.discription == ''){
                        this.$message.error('请正确输入发票明细');
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
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },
            axios(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('invoiceSave')
//                let url = 'http://192.168.2.190:8080/web/vue/bill/save.html'
                params.append('receipt_id','');
                params.append('receipt_name',this.receiptName);
                params.append('receipt_money',unNumber.unNumber(this.money));
                params.append('receipt_tax_money',unNumber.unNumber(this.taxMoney));
                params.append('receipt_discription',this.discription);
                params.append('receipt_date',this.receiptDate);

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
        },
        created(){
            var url = addUrl.addUrl('newInvoice');
//            var url = 'http://192.168.2.190:8080/web/vue/bill/item.html'
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    this.tradeList = data.tradelist
//                    console.log(this.tradeList);
                    this.loading = false
                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
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
    .list li .iptData{
        width:322px;
        height:36px;
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
        vertical-align: top;
    }
    .list li .tex{
        width:76.7%;
        height:60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 5px 10px;
    }
    .top .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .opt{
        width:260px;
        height:28px;
        border: none;
        font-size:14px;
        position: absolute;
        top:5px;
        left:185px;
        outline:none;
        color: #333;
    }

</style>
