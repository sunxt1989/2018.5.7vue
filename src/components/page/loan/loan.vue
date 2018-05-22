<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>借款单</h2>
                <router-link to="/loan/newLoan" class="addLink">新增</router-link>
            </div>
        </div>
        <div class="ww cf">
            <div class="w">
                <div class="left">
                    <span class="record">记录日期：</span>
                    <el-date-picker
                        v-model="timeInterval"
                        type="daterange"
                        align="right"
                        unlink-panels
                        @change="changeTime"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>

                    <el-select
                        v-model="auditFlg"
                        multiple
                        allow-create
                        default-first-option
                        placeholder="状态筛选">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <el-button size="small" type="primary" @click="axios">查询</el-button>
                    <el-table :data="tableData" show-summary :summary-method="getTotal">
                        <el-table-column prop="userName" label="借款人" sortable align="center"></el-table-column>
                        <el-table-column prop="departmentName" label="借款部门" sortable align="center" ></el-table-column>
                        <el-table-column prop="debitDateYMD" label="借款日期" sortable align="center" ></el-table-column>
                        <el-table-column prop="money" label="借款金额" sortable align="center" ></el-table-column>
                        <el-table-column prop="creditMoney" label="已还金额" sortable align="center" ></el-table-column>
                        <el-table-column prop="unCreditMoney" label="未还金额" sortable align="center" ></el-table-column>
                        <el-table-column prop="auditFlg" label="状态" sortable align="center" width="100px">
                            <template slot-scope="scope">
                                <span v-if="scope.row.auditFlg == 0" >未提交</span>
                                <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                                <span v-else-if="scope.row.auditFlg == 2">审批中</span>
                                <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                                <span v-else-if="scope.row.auditFlg == 4">通过</span>
                                <span v-else-if="scope.row.auditFlg == 5">待财务负责人审批</span>
                                <span v-else-if="scope.row.auditFlg == 6">待企业责人审批</span>
                                <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="还款" width="80px" align="center">
                            <template slot-scope="scope">
                                <span class="black" v-if="scope.row.unCreditMoney == 0" >还款</span>
                                <router-link v-else class="repayment red"   :to="{name:'repayment',params:{debitId:scope.row.idString}}">还款</router-link>
                            </template>
                        </el-table-column>
                        <el-table-column  label="操作" width="80px" align="center">
                            <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'seeLoan',params:{debitId:scope.row.idString}}" class="see"><i class="icon iconfont icon-kanguo blue"></i></router-link>
                                </span>

                                <span class="operation">
                                    <i v-if='scope.row.auditFlg == 0' @click='deleteModel(scope.row.idString)' class="icon iconfont icon-shanchu red"></i>
                                    <i v-else-if='scope.row.auditFlg == 1' @click='deleteModel(scope.row.idString)' class="icon iconfont icon-shanchu red"></i>
                                    <i v-else class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
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

                </div>
                <div class="right">
                    右边栏
                </div>
            </div>

        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        data() {
            return {
                pickerOptions2: {
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
                timeInterval:'',//用户选中时间
                startDate:'',//开始时间
                endDate:'',//结束时间
                auditFlg:'',//借款单状态： 1 驳回；2 待审核； 4 通过； 0 未提交
                options: [{
                    value: 1,
                    label: '驳回'
                }, {
                    value: 2,
                    label: '待审核'
                }, {
                    value: 4,
                    label: '通过'
                }, {
                    value: 0,
                    label: '未提交'
                }],//借款单状态筛选功能
                tableData: [],//借款单列表数据
                creditMoney:'',//还款合计
                debitMoney:'',//借款合计
                count:0,//总条目数
                currentPage:1,//当前页数
                loading:true,
            }
        },
        methods:{
            //选择记录日期事件
            changeTime(){
//                console.log('changeTime');
                //设置记录日期的起始日期和终止日期
                const date = this.timeInterval;
                if(date){
                    this.startDate = date[0].getFullYear()+'-'+((date[0].getMonth()+1) > 9 ?(date[0].getMonth()+1):'0'+(date[0].getMonth()+1))+'-'+ (date[0].getDate()>9 ? date[0].getDate():'0'+date[0].getDate())
                    this.endDate = date[1].getFullYear()+'-'+((date[1].getMonth()+1) > 9 ?(date[1].getMonth()+1):'0'+(date[1].getMonth()+1))+'-'+ (date[1].getDate()>9 ? date[1].getDate():'0'+date[1].getDate())
                }else{
                    this.startDate = '';
                    this.endDate = '';
                }
            },
            //执行ajax重新获取借款单列表数据
            axios(){
                this.loading = true;
                var Params = new URLSearchParams();
                var $auditFlg = '';
                for(var i = 0; i < this.auditFlg.length; i++){
                    if( i == 0){
                        $auditFlg += this.auditFlg[i]
                    }else{
                        $auditFlg += ','+this.auditFlg[i]
                    }
                }
                Params.append('periodType',this.periodType);
                Params.append('auditFlg',$auditFlg);
                Params.append('startDate',this.startDate);
                Params.append('endDate',this.endDate);
                Params.append('pageNo',this.currentPage);

                axios.post('http://192.168.2.192:8080/web/vue/debit/my/list.html',Params)
                    .then(response=> {
                        var data = response.data.value.list;//借款单列表数据
                        var $creditMoney = response.data.value.creditMoney;//还款
                        var $debitMoney = response.data.value.debitMoney;//借款
                        var $count = response.data.value.count;//总条目数
                        let tableDataarr =[];
                        console.log(data);
                        for(var i =0; i < data.length; i++){
                            tableDataarr.push(data[i])
                        }
                        this.count = $count;
                        this.tableData = tableDataarr;
                        this.creditMoney = $creditMoney;
                        this.debitMoney = $debitMoney;
                        this.loading = false;
                    })
                    .catch(error=> {
                        console.log(error);
                        this.loading = false;
                        alert('网络错误，不能访问');
                    })
            },
            //删除提示模态框
            deleteModel(id){
                console.log(id);
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteList(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除列表信息
            deleteList(isId){
                this.loading = true;
                var debitId = isId;
                var params = new URLSearchParams();
                console.log(debitId);
                params.append('debitId',debitId);

                axios.post('http://192.168.2.192:8080/web/vue/debit/item/debit/delete.html',params)
                    .then(response=> {
                        this.loading = false;
                        console.log(response);
                        this.axios();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },

            //自定义合计列
            getTotal(param){
                const sums = ['合计','','借款：',(this.debitMoney + '元'),'','还款：',(this.creditMoney + '元')]
                return sums
            },
            //分页器
            changePage(val){
                this.currentPage = val;
                this.loading = true;
                this.axios()
            }
        },
        created(){
            var params = new URLSearchParams();
            params.append('periodType',this.periodType);
            params.append('auditFlg',this.auditFlg);
            params.append('startDate',this.startDate);
            params.append('endDate',this.endDate);
            params.append('pageNo',this.currentPage);

            axios.post('http://192.168.2.192:8080/web/vue/debit/my/list.html',params)
                .then(response=> {
                    console.log(response);
                    var data = response.data.value.list;//借款单列表数据
                    var $creditMoney = response.data.value.creditMoney;//还款
                    var $debitMoney = response.data.value.debitMoney;//借款
                    var $count = response.data.value.count;//总条目数
                    let tableDataarr =[];
                    console.log(data);
                    for(var i =0; i < data.length; i++){
                        tableDataarr.push(data[i])
                    }
                    this.count = $count;
                    this.tableData = tableDataarr;
                    this.creditMoney = $creditMoney;
                    this.debitMoney = $debitMoney;
                    this.loading = false;
                })
                .catch(error=> {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
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
    .addLink{
        display: inline-block;
        width: 56px;
        height:32px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        right:20px;
        text-decoration: none;
    }

    .left {
        width: 80%;
        float: left;
        background-color: #fff;
        padding: 20px 20px;
        text-align: center;
    }

    .right {
        width: 15%;
        float: right;
        background-color: #ff2630;
    }

    .record {
        font-size: 18px;
        color: #333;
        margin-right: 20px;
    }
    .repayment {
        text-decoration: none;
    }
    .operation {
        cursor: pointer;
    }
    .el-table {
        margin: 30px 0;
    }
    .el-select {
        margin: 0 20px;
    }
    .see{
        text-decoration: none;
    }

</style>
