<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>销售单审批列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="departmentName" label="部门" sortable align="center"></el-table-column>
                    <el-table-column prop="customName" label="客户" sortable align="center"></el-table-column>
                    <el-table-column prop="type" label="类别" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">库存商品</span>
                            <span v-if="scope.row.type == 2">技术服务</span>
                            <span v-if="scope.row.type == 3">技术开发</span>
                            <span v-if="scope.row.type == 4">技术咨询</span>
                            <span v-if="scope.row.type == 5">劳务</span>
                            <span v-if="scope.row.type == 6">软件</span>
                            <span v-if="scope.row.type == 7">设计服务</span>
                            <span v-if="scope.row.type == 8">现代商业服务</span>
                            <span v-if="scope.row.type == 99">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="discription" label="明细" sortable align="center"></el-table-column>
                    <el-table-column prop="totalMoney" label="含税总价" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showTotalMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="taxRate" label="税率(%)" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.taxRate }}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="taxMoney" label="税额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showTaxMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="operation">
                                <router-link :to="{name:'approvalSale',params:{debitId:scope.row.idString}}" class="see">
                                    <i class="icon iconfont icon-kanguo blue"></i>
                                </router-link>
                            </span>
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

    export default {
        data() {
            return {
                tableData: [],//销售单审批列表数据
                loading:true,
                screenHeight: '' //页面初始化高度
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
            var url = addUrl.addUrl('approvalSaleList')
            axios.post(url)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value.list;//销售单审批列表数据

                    var tableDataarr =[];
                    if(data){
                        for(var i =0; i < data.length; i++){
                            data[i].showTaxMoney = number.number(data[i].taxMoney)
                            data[i].showTotalMoney = number.number(data[i].totalMoney)
                            tableDataarr.push(data[i])
                        }
//                        console.log(tableDataarr);
                        this.tableData = tableDataarr;
                    }
                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
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
