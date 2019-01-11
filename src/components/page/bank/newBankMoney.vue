<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>{{name}}</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>{{name}}</span>
                </div>
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">银行名称</span>
                        <input class="ipt" type="text" v-model="bankName" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">开户行</span>
                        <input class="ipt" type="text" v-model="bankChildName" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">银行账户</span>
                        <input class="ipt" type="text" v-model="bankCode" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">银行余额</span>
                        <input class="ipt" type="text" v-model="endAmount" readonly>
                    </li>

                    <li class="pt" v-if="isTurn">
                        <span class="tit">转入银行名称</span>
                        <el-select class="sel" v-model="remarkBankCode" placeholder="请选择" @change="changeBankName">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.bankNameShow"
                                :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt" v-if="isTurn">
                        <span class="tit">转入开户行</span>
                        <input class="ipt" type="text" v-model="bankChildName2" readonly>
                    </li>
                    <li class="pt" v-if="isTurn">
                        <span class="tit">转入银行账户</span>
                        <input class="ipt" type="text" v-model="bankCode2" readonly>
                    </li>
                    <li class="pt" v-if="isTurn">
                        <span class="tit">转入银行余额</span>
                        <input class="ipt" type="text" v-model="endAmount2" readonly>
                    </li>
                    <li v-if="isShowTradeCompanyName" class="pt" style="position: relative;">
                        <span class="tit"><span class="red">*</span>投资方</span>
                        <el-select class='sel' v-model="tradeCompanyName">
                            <el-option v-for="item in tradeCompanyList"
                                       :key="item.value"
                                       :label="item.stockHolderName"
                                       :value="item.stockHolderName">
                            </el-option>
                        </el-select>
                        <input class="opt" type="text" v-model="tradeCompanyName" maxlength="50" placeholder="请选择或输入">
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>{{moneyName}}</span>
                        <input class="ipt" type="text" v-model="money" @change="changeMoney">
                    </li>
                    <li class="pt">
                        <span class="tit"><span class="red">*</span>{{dateName}}</span>
                        <el-date-picker
                            class="data"
                            v-model="transferDate"
                            type="date"
                            :picker-options="pickerOptions1"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit">备注</span>
                        <textarea class="tex" type="text" v-model="discription" maxlength="50"></textarea>
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
    import { mapState } from 'vuex';
    export default{
        data(){
            return{
                bankName:'',//银行名称
                bankChildName:'',//开户行
                bankCode:'',//银行账户
                endAmount:'',//银行余额

                money:'',//操作金额
                transferDate:'',//操作日期
                discription:'',//备注
                type:'',//业务类别
                moneyName:'',//金额名称
                dateName:'',//日期名称
                isShowTradeCompanyName:false,//是否显示投资方
                tradeCompanyName:'',//投资方
                tradeCompanyList:[],//投资方列表

                isTurn:false,//是否为银行互转
                remarkBankCode:'',//副银行账户卡号
                options:'',//副银行账户卡号
                bankChildName2:'',//转入开户行
                bankCode2:'',//转入银行账户
                endAmount2:'',//转入银行余额


                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                debitId:this.$route.params.debitId,
                name:this.$route.params.name,
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['current_book_ym']),
        methods: {
            //转入银行名称change事件
            changeBankName(){
                let remarkBankCode = this.remarkBankCode
                let options = this.options
                for(let i in options){
                    if(remarkBankCode == options[i].bankCode){
                        this.bankChildName2 = options[i].bankChildName
                        this.bankCode2 = options[i].bankCode
                        this.endAmount2 = number.number(options[i].endAmount)
                    }
                }
            },
            //本次付款change事件
            changeMoney(){
                var money = this.money
                var str2 = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!str2.test(money)) {
                    this.$message.error('请正确输入金额');
                    this.money = 0;
                    return
                }
                this.money = number.number(this.money)
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
                        this.loading = false;
                    });
                }else{
                    if(this.money == ''){
                        this.$message.error('请正确输入金额');
                        this.loading = false;
                        return
                    }
                    if(this.transferDate == ''){
                        this.$message.error('请正确输入日期');
                        this.loading = false;
                        return
                    }
                    if(Number(this.transferDate.split('-').join('').substring(0,6)) < Number(this.current_book_ym) ){
                        this.$message.error(this.dateName + '不得早于当前账期');
                        this.loading = false;
                        return
                    }
                    if(this.isShowTradeCompanyName && this.tradeCompanyName == ''){
                        this.$message.error('请输入投资方');
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
                var url = addUrl.addUrl('newBankMoneySave');
                var params = new URLSearchParams();
                var money = unNumber.unNumber(this.money)
//                console.log(this.tradeCompanyName);
                params.append('bankCode',this.bankCode);
                params.append('remarkBankCode',this.remarkBankCode);
                params.append('money',money);
                params.append('transferDate',this.transferDate);
                params.append('discription',this.discription);
                params.append('tradeCompanyName',this.tradeCompanyName);
                params.append('type',this.type);

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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('newBankMoney')
            let name = this.name
            params.append('bankId',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    var data = response.data.value;
                    this.bankName = data.bankAccount.bankName
                    this.bankChildName = data.bankAccount.bankChildName
                    this.bankCode = data.bankAccount.bankCode
                    this.endAmount = number.number(data.bankAccount.endAmount)
                    this.options = data.list;
                    this.tradeCompanyList = data.stockHolderList

                    if(name == '提取现金'){
                        this.isTurn = false
                        this.isShowTradeCompanyName = false
                        this.type = 1
                        this.moneyName = '提现金额'
                        this.dateName = '提现日期'
                    }else if(name == '存入现金'){
                        this.isTurn = false
                        this.isShowTradeCompanyName = false
                        this.type = 2
                        this.moneyName = '存现金额'
                        this.dateName = '存现日期'
                    }else if(name == '银行互转'){
                        this.isTurn = true
                        this.isShowTradeCompanyName = false
                        this.type = 3
                        this.moneyName = '转账金额'
                        this.dateName = '转账日期'
                    }else if(name == '银行手续费'){
                        this.isTurn = false
                        this.isShowTradeCompanyName = false
                        this.type = 4
                        this.moneyName = '手续费金额'
                        this.dateName = '支付日期'
                    }else if(name == '利息收入'){
                        this.isTurn = false
                        this.isShowTradeCompanyName = false
                        this.type = 5
                        this.moneyName = '利息金额'
                        this.dateName = '收取日期'
                    }else if(name == '收到投资'){
                        this.isTurn = false
                        this.isShowTradeCompanyName = true
                        this.type = 6
                        this.moneyName = '投资金额'
                        this.dateName = '收取日期'
                    }
                    let date = new Date()
                    if(date.getMonth()+1 < 10){
                        this.transferDate = date.getFullYear() + '-0' + (date.getMonth()+1) ;
                    }else{
                        this.transferDate = date.getFullYear() + '-' + (date.getMonth()+1);
                    };

                    if(date.getDate() < 10){
                        this.transferDate += '-0' + date.getDate()
                    }else{
                        this.transferDate += '-' + date.getDate()
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
        width:100%;
        display: inline-block;
        height:320px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list li .ipt{
        display: inline-block;
        width:600px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .tex{
        display: inline-block;
        width:600px;
        height:40px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
        resize: none;
    }
    .list li .sel{
        width:622px;
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
    .list li .data{
        width:622px;
        height:36px;
    }
    .opt{
        width:580px;
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
