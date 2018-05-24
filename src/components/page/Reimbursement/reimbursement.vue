<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>费用单</h2>
                <router-link to="/loan/newLoan" class="addLink">新增</router-link>
            </div>
        </div>
        <div class="w cf">
            <div class="content">
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
                <el-button size="small" type="primary" @click="axios" class="query">查询</el-button>
                <div class="costList">
                    <h2><img src="" alt="">差旅费</h2>
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
                options2: [{
                    choice: '0',
                    label: '已完成列表'
                }, {
                    choice: '1',
                    label: '未完成列表'
                }],
                choice:'0',
                tableData: [],//借款单列表数据
                creditMoney:'',//还款合计
                debitMoney:'',//借款合计
                count:0,//总条目数
                currentPage:1,//当前页数
                loading:true,
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
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
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

    .query{
        margin-left: 30px;
    }


    .record {
        font-size: 18px;
        color: #333;
        margin-right: 20px;
    }


</style>
