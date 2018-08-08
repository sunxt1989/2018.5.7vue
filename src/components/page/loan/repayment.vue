<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>还款单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click.native="model(1)" v-if="!isRedFlush" size="small" type="danger" class="sub" >提交</el-button>
            </div>
        </div>
        <div class="w cf">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>还款单</span>
                </div>
                <div class="left">
                    <ul>
                        <li>待还款</li>
                        <li>本次还款</li>
                        <li>还款日期</li>
                    </ul>
                </div>
                <div class="right cf">
                    <ul>
                        <li>
                            <input type="text" class="dhk" name="dhk" id="dhk" v-model="unCreditMoney" readonly>
                        </li>
                        <li>
                            <input type="text" class="hk" name="hk" id="hk" v-model="money" @blur="blur" maxlength="14" :readonly="isRedFlush">
                        </li>
                        <li>
                            <el-date-picker
                                class="data"
                                v-model="debitDate"
                                type="date"
                                :picker-options="pickerOptions1"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                :disabled="isRedFlush">
                            </el-date-picker>
                        </li>
                    </ul>
                </div>
                <div class="line">
                    <span>还款明细</span>
                </div>
                <el-table class="hkTable grayList" :data="tableData" style="width: 60%">
                    <el-table-column prop="debitDateYMD" label="日期" sortable width="180"></el-table-column>
                    <el-table-column prop="payType" label="还款方式" sortable width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 0"></span>
                            <span v-if="scope.row.payType == 1">现金支付</span>
                            <span v-if="scope.row.payType == 2">银行支付</span>
                            <span v-if="scope.row.payType == 3">暂不支付</span>
                            <span v-if="scope.row.payType == 4">冲抵个人借款</span>
                            <span v-if="scope.row.payType == 99">其他货币资金</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="还款金额" sortable>

                    </el-table-column>
                    <el-table-column prop="auditFlg" label="还款状态" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0">未提交</span>
                            <span v-if="scope.row.auditFlg == 1">驳回</span>
                            <span v-if="scope.row.auditFlg == 2">待审核</span>
                            <span v-if="scope.row.auditFlg == 3">待出纳确认</span>
                            <span v-if="scope.row.auditFlg == 4">待还款</span>
                            <span v-if="scope.row.auditFlg == 5">待审核</span>
                            <span v-if="scope.row.auditFlg == 6">待审核</span>
                            <span v-if="scope.row.auditFlg == 7">已红冲</span>
                        </template>
                    </el-table-column>
                </el-table>
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
        data(){
            return{
                debitId:this.$route.params.debitId,//单据ID
                isRedFlush:this.$route.params.isRedFlush,//是否为红冲
                unCreditMoney:'',//待还款
                money:'',//本次还款
                debitDate:'',//上传日期
                tableData: [],//还款明细
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            blur:function(){
                this.money = number.number(this.money)
            },
            model(n){
                if (n == 0) {
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {

                    });
                } else {
                    if(this.money <= 0){
                        this.$message.error('请正确输入金额');
                        return
                    }else if(this.debitDate == ''){
                        this.$message.error('请正确输入还款日期');
                        return
                    }

                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.axios();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            axios(){
                this.loading = true;
                var params = new URLSearchParams();
                var money = unNumber.unNumber(this.money);
                var url = addUrl.addUrl('repaymentSubmit')

                params.append('debitId',this.debitId);
                params.append('debitDate',this.debitDate);
                params.append('money',money);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        this.loading = false;
                        this.$router.go(-1);
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
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
            console.log(this.isRedFlush);
            var params = new URLSearchParams();
            var url = addUrl.addUrl('repayment')
            params.append('debitId',this.debitId);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    var data = response.data.value
                    this.tableData = data.userDebitItemList;
                    this.unCreditMoney = number.number(data.userDebitItem.unCreditMoney);

                    this.loading = false;
                })
                .catch(error=> {
                    this.loading = false;
//                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
    }
</script>
<style scoped>
    .w{
        text-align: center;
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
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .left{
        display: inline-block;
        width:30%;
        float: left;
        text-align: right;
        background-color: #fff;
        font-size:16px;
    }
    .right{
        display: inline-block;
        width:70%;
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
    .el-table{
        margin-top: 30px;
        display: inline-block;
    }
</style>
