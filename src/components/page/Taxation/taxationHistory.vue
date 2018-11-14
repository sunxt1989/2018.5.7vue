<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>税费缴纳-历史记录</h2>
                <router-link to="/Taxation/TaxationList" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <span class="record">入账日期：</span>
                <el-date-picker
                    class="iptData"
                    v-model="debitDate"
                    type="month"
                    value-format="yyyy-MM"
                    :picker-options="pickerOptions1"
                    placeholder="选择日期">
                </el-date-picker>
                <span class="record">税种：</span>
                <el-select v-model="taxType" slot="prepend" placeholder="请选择" class="input-select">
                    <el-option
                        v-for="item in taxList"
                        :key="item.value"
                        :label="item.value"
                        :value="item.code">
                    </el-option>
                </el-select>

                <el-button size="small" type="primary" @click="axios" class="query">查询</el-button>

                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="taxType" label="税种" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.taxType == 1">印花税</span>
                            <span v-if="scope.row.taxType == 2">土地使用税</span>
                            <span v-if="scope.row.taxType == 3">车船使用税</span>
                            <span v-if="scope.row.taxType == 4">房产税</span>
                            <span v-if="scope.row.taxType == 5">消费税</span>
                            <span v-if="scope.row.taxType == 6">残疾人保障金</span>
                            <span v-if="scope.row.taxType == 7">增值税</span>
                            <span v-if="scope.row.taxType == 8">城市维护建设税</span>
                            <span v-if="scope.row.taxType == 9">教育费附加</span>
                            <span v-if="scope.row.taxType == 10">地方教育费附加</span>
                            <span v-if="scope.row.taxType == 11">企业所得税</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="yearMonthStr" label="入账日期" sortable align="center"></el-table-column>
                    <el-table-column prop="amount" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="操作类型" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">计提</span>
                            <span v-if="scope.row.type == 2">缴纳</span>
                            <span v-if="scope.row.type == 3">结转</span>
                            <span v-if="scope.row.type == 4">免征</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTimeStr" label="操作日期" sortable align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    export default {
        data() {
            return {
                tableData:[],
                taxList:[],
                debitDate:'',
                taxType:'',
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
            axios(){
                let params = new URLSearchParams();
                let url = addUrl.addUrl('history')
                params.append('ym', this.debitDate);
                params.append('taxType', this.taxType);
                axios.post(url, params)
                    .then(response=> {
//                        console.log(response);
                        this.loading = false;
                        let data = response.data.value;
                        for(let i in data.dataList){
                            data.dataList[i].showMoney = number.number(data.dataList[i].amount)
                        }
                        this.tableData =data.dataList
                        this.taxList =data.taxList

                    })
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false;
                        alert('网络错误，不能访问');
                    })
            }
        },
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            let topHeight = $('.top').innerHeight()
            let headerHeight = $('header').innerHeight()
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
            var url = addUrl.addUrl('history')
            params.append('ym', '');
            params.append('taxType', '');
            axios.post(url, params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false;
                    let data = response.data.value;
                    for(let i in data.dataList){
                        data.dataList[i].showMoney = number.number(data.dataList[i].amount)
                    }
                    this.tableData =data.dataList
                    this.taxList =data.taxList

                })
                .catch(error=> {
//                        console.log(error);
                    this.loading = false;
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
    .record{
        font-size:14px;
    }
    .left {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        overflow-y: auto;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
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
