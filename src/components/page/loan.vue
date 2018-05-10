<template>
    <div class="w">
        <div class="top">
            <h2>借款单</h2>
            <el-button class="add" type="primary" size="small">新增</el-button>
        </div>
        <div class="left">
            <span class="record">记录时段：</span>
            <el-radio-group v-model="periodType" @change="changeTime">
                <el-radio-button label="1">全部</el-radio-button>
                <el-radio-button label="2">最近一个月</el-radio-button>
                <el-radio-button label="3">最近三个月</el-radio-button>
                <el-radio-button label="4">最近半年</el-radio-button>
            </el-radio-group>
            <br>
            <span class="record">记录日期：</span>
            <el-date-picker
                v-model="timeInterval"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @blur="blurTime">
            </el-date-picker>
            <el-select v-model="auditFlg" placeholder="请选择" @change="changeState">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button size="small" type="primary" @click="axios()">查询</el-button>
        </div>
        <div class="right">

        </div>
        <el-table :data="tableData" border :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column prop="userName" label="借款人" ></el-table-column>
            <el-table-column prop="departmentName" label="借款部门" sortable ></el-table-column>
            <el-table-column prop="debitDate" label="借款日期" sortable ></el-table-column>
            <el-table-column prop="money" label="借款金额" sortable ></el-table-column>
            <el-table-column prop="creditMoney" label="已还金额" sortable ></el-table-column>
            <el-table-column prop="unCreditMoney" label="未还金额" sortable ></el-table-column>
            <el-table-column prop="auditFlg" label="状态"></el-table-column>
            <el-table-column prop="hk" label="还款"></el-table-column>
            <el-table-column prop="cz" label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        data() {
            return {
                periodType:'1',//借款单时段：1 全部；2 最近一个月；3 最近三个月；4 最近半年
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
                }],
                tableData: [

                ]
            }
        },
        methods:{
            changeTime(){
                console.log(this.periodType);
            },
            blurTime(){
                //            设置记录日期的起始日期和终止日期
                const date = this.timeInterval;
                this.startDate = date[0].getFullYear()+'-'+((date[0].getMonth()+1) > 9 ?(date[0].getMonth()+1):'0'+(date[0].getMonth()+1))+'-'+ (date[0].getDate()>9 ? date[0].getDate():'0'+date[0].getDate())
                this.endDate = date[1].getFullYear()+'-'+((date[1].getMonth()+1) > 9 ?(date[1].getMonth()+1):'0'+(date[1].getMonth()+1))+'-'+ (date[1].getDate()>9 ? date[1].getDate():'0'+date[1].getDate())
                console.log(this.startDate);
                console.log(this.endDate);
            },
            changeState(){
                console.log(this.auditFlg);
            },
            axios(){
                axios.get('http://192.168.2.192:8080/web/vue/debit/my/list.html', {
                        periodType: this.periodType,
                        auditFlg: this.auditFlg,
                        startDate: this.startDate,
                        endDate: this.endDate
                    })
                    .then(response=> {
                        console.log(response);
                        this.oftenGoods = response.data;
                    })
                    .catch(error=> {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            }
        },
        updated:function(){

        },
        created(){
            axios.get('http://192.168.2.192:8080/web/vue/debit/my/list.html', {
                    periodType: this.periodType,
                    auditFlg: this.auditFlg,
                    startDate: this.startDate,
                    endDate: this.endDate
                })
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;
                    console.log(data);
                    for(var i =0; i < data.length; i++){
                        this.tableData[i] = data[i]
                    }
                    console.log(this.tableData);
                })
                .catch(error=> {
                    console.log(error);
                    alert('网络错误，不能访问');
                })
        },
    }
</script>

<style scoped>
    .top{
        margin: 20px 0;
        text-align: center;
    }
    h2{
        display: inline-block;
    }
    .add{
        float: right;
    }
    .left{
        width: 80%;
        float: left;
        background-color: #fff;
    }
    .right{
        width:20%;
        float: left;
        background-color: #fff;
    }
    .record{
        font-size:18px;
        color:#333;
        margin-right: 30px;
    }
</style>
