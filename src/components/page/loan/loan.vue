<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>借款单列表</h2>
                <el-select v-model="choice" class='choice' placeholder="未完成列表" @change="changeChoice">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.choice">
                    </el-option>
                </el-select>
                <router-link to="/loan/newLoan" class="addLink">新增</router-link>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
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
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions2">
                </el-date-picker>

                <el-button size="small" type="primary" @click="axios" class="query">查询</el-button>
                <el-table :data="tableData" class="blueList" show-summary :summary-method="getTotal" >
                    <el-table-column prop="userName" label="借款人" sortable align="center"></el-table-column>
                    <el-table-column prop="departmentName" label="借款部门" sortable align="center"></el-table-column>
                    <el-table-column prop="debitDateYMD" label="借款日期" sortable align="center"></el-table-column>

                    <el-table-column prop="money" label="借款金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="creditMoney" label="已还金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showCreditMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="unCreditMoney" label="未还金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showUnCreditMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auditFlg" label="状态" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0">未提交</span>
                            <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                            <span v-else-if="scope.row.auditFlg == 2">待审核</span>
                            <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                            <span v-else-if="scope.row.auditFlg == 4 && scope.row.unCreditMoney != 0">待还款</span>
                            <span v-else-if="scope.row.auditFlg == 4 && scope.row.unCreditMoney == 0">已还款</span>
                            <span v-else-if="scope.row.auditFlg == 5">待审核</span>
                            <span v-else-if="scope.row.auditFlg == 6">待审核</span>
                            <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="还款" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="black" v-if="scope.row.auditFlg < 4">还款</span>
                            <router-link v-else class="repayment red"
                                         :to="{name:'repaymentList',params:{debitId:scope.row.idString,choice:choice,currentPage:currentPage}}">还款
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'seeLoan',params:{debitId:scope.row.idString,choice:choice,currentPage:currentPage}}" class="see">
                                        <i class="icon iconfont icon-kanguo blue"></i>
                                    </router-link>
                                </span>
                                <span class="operation">
                                    <i v-if='scope.row.auditFlg == 0' @click='deleteModel(scope.row.idString)'
                                       class="icon iconfont icon-shanchu red"></i>
                                    <i v-else-if='scope.row.auditFlg == 1' @click='deleteModel(scope.row.idString)'
                                       class="icon iconfont icon-shanchu red"></i>
                                    <i v-else class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
                                </span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="changePage"
                    background
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :total='count'>
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data() {
            return {
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
                options2: [{
                    choice: '7,8',
                    label: '已完成列表'
                }, {
                    choice: '0,1,2,3,4,5,6',
                    label: '未完成列表'
                }],
                choice:this.$route.params.choice,
                currentPage:this.$route.params.currentPage,
                tableData: [],//借款单列表数据
                count:0,//总条目数
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            changeChoice(){
                this.axios()
            },
            //选择记录日期事件
            changeTime(){
//                console.log('changeTime');
                //设置记录日期的起始日期和终止日期
                const date = this.timeInterval;
                if(date){
                    this.startDate = date[0]
                    this.endDate = date[1]
                }else{
                    this.startDate = '';
                    this.endDate = '';
                }
            },
            //执行ajax重新获取借款单列表数据
            axios(){
                this.loading = true;
                var Params = new URLSearchParams();
                var url = addUrl.addUrl('loan')
                Params.append('periodType','');
                Params.append('auditFlg',this.choice);
                Params.append('startDate',this.startDate);
                Params.append('endDate',this.endDate);
                Params.append('pageNo',this.currentPage);

                axios.post(url,Params)
                    .then(response=> {
//                        console.log(response);
                        var data = response.data.value.list;//借款单列表数据
                        this.count = response.data.value.count;//总条目数
                        let tableDataarr =[];
                        if(data){
                            for(var i =0; i < data.length; i++){
                                data[i].showMoney = number.number(data[i].money);
                                data[i].showCreditMoney = number.number(data[i].creditMoney);
                                data[i].showUnCreditMoney = number.number(data[i].unCreditMoney);
                                tableDataarr.push(data[i])
                            }
                            this.tableData = tableDataarr;
                        }else{
                            this.tableData = data
                        }

                        this.loading = false;
                    })
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false;
                        alert('网络错误，不能访问');
                    })
            },
            //删除提示模态框
            deleteModel(id){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
                var url = addUrl.addUrl('loanDelete')
//                console.log(debitId);
                params.append('debitId',debitId);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        this.axios();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },

//            自定义合计列
            getTotal(param){
                var jk = 0;
                var hk = 0;
                var tol = this.tableData;
                for(var i = 0; i < tol.length; i++){
                    jk += parseFloat(tol[i].money);
                    hk += parseFloat(tol[i].creditMoney)
                }
                jk = number.number(jk.toFixed(2));
                hk = number.number(hk.toFixed(2));
                const sums = ['合计','','借款：',(jk + '元'),'','还款：',(hk + '元')];
                return sums
            },
            //分页器
            changePage(val){
                this.currentPage = val;
                this.axios()
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
            if(!this.choice)this.choice='0,1,2,3,4,5,6';
            if(!this.currentPage)this.currentPage = 1;
            var params = new URLSearchParams();
            var url = addUrl.addUrl('loan')
            params.append('periodType','');
            params.append('auditFlg',this.choice);
            params.append('startDate',this.startDate);
            params.append('endDate',this.endDate);
            params.append('pageNo',this.currentPage);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    var data = response.data.value.list;//借款单列表数据
                    this.creditMoney = response.data.value.creditMoney;//还款
                    this.debitMoney = response.data.value.debitMoney;//借款
                    this.count = response.data.value.count;//总条目数
                    var tableDataarr =[];
                    if(data){
                        for(var i =0; i < data.length; i++){
//                            console.log(data[i]);
                            data[i].showMoney = number.number(data[i].money);
                            data[i].showCreditMoney = number.number(data[i].creditMoney);
                            data[i].showUnCreditMoney = number.number(data[i].unCreditMoney);
                            tableDataarr.push(data[i])
                        }
                        this.tableData = tableDataarr;
                    }else{
                        this.tableData = data
                    }
//                    console.log(this.tableData);
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
        height:30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        right:120px;
        text-decoration: none;
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
    .choice {
        width:120px;
        display: inline-block;
        position: absolute;
        left:20px;
        text-decoration: none;
    }
    .query{
        margin-left: 30px;
    }
    .left {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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
