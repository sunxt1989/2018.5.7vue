<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>还款单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click.native="model(1)" size="small" type="danger" class="sub" >提交</el-button>
            </div>
        </div>
        <div class="ww">
            <div class="w cf">
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
                            <input type="text" class="dhk" name="dhk" id="dhk" v-model="unCreditMoney">
                        </li>
                        <li>
                            <input type="text" class="hk" name="hk" id="hk" v-model="money">
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
                    </ul>
                </div>
                <div class="line">
                    <span>还款明细</span>
                </div>
                <el-table class="hkTable" :data="tableData" style="width: 60%">
                    <el-table-column prop="debitDateYMD" label="日期" sortable width="180"></el-table-column>
                    <el-table-column prop="payType"  label="还款方式" sortable width="180">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 0" ></span>
                            <span v-if="scope.row.payType == 1" >现金支付</span>
                            <span v-if="scope.row.payType == 2" >银行支付</span>
                            <span v-if="scope.row.payType == 3" >暂不支付</span>
                            <span v-if="scope.row.payType == 4" >冲抵个人借款</span>
                            <span v-if="scope.row.payType == 99" >其他货币资金</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="还款金额" sortable></el-table-column>
                    <el-table-column prop="auditFlg" label="还款状态" sortable>
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0" >未提交</span>
                            <span v-if="scope.row.auditFlg == 1" >驳回</span>
                            <span v-if="scope.row.auditFlg == 2" >审批中</span>
                            <span v-if="scope.row.auditFlg == 3" >待出纳确认</span>
                            <span v-if="scope.row.auditFlg == 4" >待还款</span>
                            <span v-if="scope.row.auditFlg == 5" >待财务负责人审批</span>
                            <span v-if="scope.row.auditFlg == 6" >待企业负责人审批</span>
                            <span v-if="scope.row.auditFlg == 7" >已红冲</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    export default{
        data(){
            return{
                debitId:this.$route.params.debitId,
                unCreditMoney:'',
                money:'',
                debitDate:'',
                nowdata:'',
                tableData: [],
                loading:false,
            }
        },
        methods:{
            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.nowdata;
                this.debitDate = date.getFullYear()+'-'+((date.getMonth()+1) > 9 ?(date.getMonth()+1):'0'+(date.getMonth()+1))+'-'+ (date.getDate()>9 ? date.getDate():'0'+date.getDate())
                console.log(this.debitDate);
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
                var params = new URLSearchParams();
                params.append('debitId',this.debitId);
                params.append('debitDate',this.debitDate);
                params.append('money',this.money);
                console.log(this.debitDate);
                console.log(this.money);
                axios.post('http://192.168.2.192:8080/web/vue/debit/edit/credit/submit.html',params)
                    .then(response=> {
                        console.log(response);
                        this.loading = false;
                        this.$router.go(-1);
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
        },
        created(){
            var params = new URLSearchParams();
            params.append('debitId',this.debitId);
            axios.post('http://192.168.2.192:8080/web/vue/debit/edit/credit/show.html',params)
                .then(response=> {
                    console.log(response);
                    var data = response.data.value
                    this.tableData = data.userDebitItemList;
                    this.unCreditMoney = data.userDebitItem.unCreditMoney
                    console.log(data);

                    this.loading = false;
                })
                .catch(error=> {
                    this.loading = false;
                    console.log(error);
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
