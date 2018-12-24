<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看功能列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="content cf">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="借款列表" name="1">
                            <hello></hello>
                            <span class="record">记录日期：</span>
                            <el-date-picker
                                v-model="timeInterval"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                            <el-table class="single" :data="tableData1">
                                <el-table-column align="center" prop="userName" label="借款人"></el-table-column>
                                <el-table-column align="center" prop="departmentName" label="借款部门"></el-table-column>
                                <el-table-column align="center" prop="debitDateYMD" label="借款日期"></el-table-column>
                                <el-table-column align="center" prop="money" label="借款金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeLoan',params:{debitId:scope.row.idString}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i v-if="scope.row.creditMoney == 0" class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                            <i v-else class="icon iconfont icon-zhuanhuan1 gray"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @current-change="changePage"
                                background
                                layout="prev, pager, next"
                                :total='count'>
                            </el-pagination>
                        </el-tab-pane>
                        <el-tab-pane label="报销列表" name="2">
                            <el-table class="single" :data="tableData2">
                                <el-table-column align="center" prop="originalTypeName" label="类别"></el-table-column>
                                <el-table-column align="center" prop="simpleAccountDate" label="日期"></el-table-column>
                                <el-table-column align="center" prop="applicationUserName" label="姓名"></el-table-column>
                                <el-table-column align="center" prop="money" label="金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeReimbursement',params:{debitId:scope.row.idString,isRedFlush:true}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="采购列表" name="3">
                            <el-table class="single" :data="tableData3">
                                <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
                                <el-table-column align="center" prop="supplierName" label="供应商"></el-table-column>
                                <el-table-column align="center" prop="type" label="类别">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type == 1">设备</span>
                                        <span v-if="scope.row.type == 2">软件</span>
                                        <span v-if="scope.row.type == 3">劳务服务</span>
                                        <span v-if="scope.row.type == 4">技术服务</span>
                                        <span v-if="scope.row.type == 5">库存商品</span>
                                        <span v-if="scope.row.type == 11">专利技术</span>
                                        <span v-if="scope.row.type == 12">非专利技术</span>
                                        <span v-if="scope.row.type == 13">商标</span>
                                        <span v-if="scope.row.type == 14">著作权</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="commodityName" label="明细"></el-table-column>
                                <el-table-column align="center" prop="totalMoney" label="含税总价">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showTotalMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="sendMoney" label="已付款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showSendMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="unsendMoney" label="待付款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showUnsendMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看" width="80px">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seePurchase',params:{debitId:scope.row.idString}}"
                                                         class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲" width="80px">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i v-if="scope.row.sendMoney == 0"
                                               class="icon iconfont icon-zhuanhuan1 green"
                                               @click="openModel(scope.row.idString)"></i>
                                            <i v-else class="icon iconfont icon-zhuanhuan1 gray"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="销售列表" name="4">
                            <el-table class="single" :data="tableData4">
                                <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
                                <el-table-column align="center" prop="customName" label="客户"></el-table-column>
                                <el-table-column align="center" prop="type" label="类别">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type == 1">库存商品</span>
                                        <span v-else-if="scope.row.type == 2">技术服务</span>
                                        <span v-else-if="scope.row.type == 3">技术开发</span>
                                        <span v-else-if="scope.row.type == 4">技术咨询</span>
                                        <span v-else-if="scope.row.type == 5">劳务</span>
                                        <span v-else-if="scope.row.type == 6">软件</span>
                                        <span v-else-if="scope.row.type == 7">设计服务</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="discription" label="明细"></el-table-column>
                                <el-table-column align="center" prop="totalMoney" label="含税总价">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showTotalMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receivedMoney" label="已收款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showReceivedMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="unreceiveMoney" label="待收款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showUnreceiveMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeSale',params:{debitId:scope.row.idString}}"
                                                         class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i v-if="scope.row.receivedMoney == 0"
                                               class="icon iconfont icon-zhuanhuan1 green"
                                               @click="openModel(scope.row.idString)"></i>
                                            <i v-else class="icon iconfont icon-zhuanhuan1 gray"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    import hello from './hello.vue';
    import { mapState } from 'vuex'

    export default{
        template:'<hello/>',
        components:{
          hello
        },
        data(){
            return {
                activeName:'1',//选择红冲业务
                timeInterval:'',//用户选中时间
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text:'最近半年',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 182);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },//记录日期中快捷选择
                currentPage:1,//分页器
                count:0,//总条目数

                tableData1:[],//借款列表
                tableData2:[],//报销列表
                tableData3:[],//采购列表
                tableData4:[],//销售列表
                loading:true
            }
        },
        methods: {
            //分页器
            changePage(val){
                this.currentPage = val;
                this.axios()
            },
            openModel(){
                console.log('@@@');
            },
            handleClick(){
                this.axios()
            },
            axios(){
                this.loading = true
                let url
                let params = new URLSearchParams();
                if(this.activeName == 1){//借款
//                    url = addUrl.addUrl('repaymentRedFlush');
                    url = 'http://192.168.2.192:8080/web/business/data/my/list/borrow.html'
                    params.append('pageNo','')
                    params.append('auditFlg','')
                }else if(this.activeName == 2){//报销
                    url = addUrl.addUrl('loanRedFlush');
                }else if(this.activeName == 3){//采购
                    url = addUrl.addUrl('ReimbursementRedFlush');
                }else if(this.activeName == 4){//销售
                    url = addUrl.addUrl('purchaseRedFlush');
                }
                axios.post(url,params)
                    .then(response=> {
                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        this.count = response.data.value.count
//                        if(status == 200){
//                            let data = response.data.value;
//                            if(this.activeName == 1){
//                                for(let i in data){
//                                    data[i].showMoney = number.number(data[i].money)
//                                }
//                                this.tableData1 = data;
//                            }else if(this.activeName == 2){
//                                for (let i in data) {
//                                    data[i].showMoney = number.number(data[i].money)
//                                }
//                                this.tableData2 = data;
//                            }else if(this.activeName == 3){
//                                for (let i in data) {
//                                    data[i].showMoney = number.number(data[i].money)
//                                }
//                                this.tableData3 = data;
//                            }else if(this.activeName == 4){
//                                for (let i in data) {
//                                    data[i].showTotalMoney = number.number(data[i].totalMoney)
//                                    data[i].showTaxMoney = number.number(data[i].taxMoney)
//                                    data[i].showSendMoney = number.number(data[i].sendMoney)
//                                    data[i].showUnsendMoney = number.number(data[i].unsendMoney)
//                                }
//                                this.tableData4 = data;
//                            }
//                        }else if(status == 400){
//                            this.$message.error(msg)
//                        }

                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        created(){
            console.log('@');
            this.axios()
        }
    }
</script>
<style scoped>
    .w{
        height:100%;
    }
    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }

    h2 {
        display: inline-block;
    }
    .content{
        width: 1120px;
        height: 100%;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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
        right: 20px;
    }
    .see{
        text-decoration: none;
    }
    .green{
        color: #1ffb2e;
    }
    .list{
        width:80%;
        margin: 0 auto;
        font-size:16px;
    }
    .list li{
        margin-top: 30px;
    }
    .list li .sp{
        display: inline-block;
        width:20%;
        text-align: right;
        float: left;
        margin-right: 3%;
    }
    .list li .sp2{
        display: inline-block;
        width:77%;
        text-align: center;
        float: left;
    }
    .list li .tex{
        display: inline-block;
        width:70%;
        height:36px;
        padding: 5px 10px;
        resize: none;
        float: left;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
    }
    .list .btnLi{
        text-align: center;
    }
    .btn{
        width:80px;
        display: inline-block;
    }
    .gray{
        color: #ccc;
        cursor: auto;
    }

</style>
