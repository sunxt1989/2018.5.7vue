<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>固定资产列表</h2>
                <h4 class="choice">当前账期：{{nowDate}}</h4>
                <router-link to="/" class="back">返回</router-link>
                <el-button @click="model"  size="small" type="primary" class="sub">计提当月折旧</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="fixedAssetsNumber" label="编号" sortable align="center"></el-table-column>
                    <el-table-column prop="className" label="类别" sortable align="center"></el-table-column>
                    <el-table-column prop="departmentName" label="部门/项目" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.departmentName">{{ scope.row.departmentName }}</span>
                            <span v-else>{{ scope.row.projectName }}</span>
                            <span v-if="scope.row.divideFlg == 1">(分摊)</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="名称" sortable align="center" width="220px"></el-table-column>
                    <el-table-column prop="originalMoney" label="原值" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showOriginalMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="money" label="净值" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="usefulMonths" label="已折旧月" sortable align="center"></el-table-column>
                    <el-table-column prop="startDateYMD" label="入账日期" sortable align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 0">仅保存</span>
                            <span v-if="scope.row.status == 1">正常使用</span>
                            <span v-if="scope.row.status == 2">未使用</span>
                            <span v-if="scope.row.status == 3">已折旧完毕</span>
                            <span v-if="scope.row.status == 4">处置中</span>
                            <span v-if="scope.row.status == 5">处置完毕</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="60px">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'fixedAssets',params:{debitId:scope.row.idString}}" class="see">
                                        <i class="icon iconfont icon-shuru blue"></i></router-link>
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
    import addUrl from '../../../../static/js/addUrl'
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                tableData:[],
                loading:true,
                nowDate:'',
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(){
                this.loading = true;
                var url = addUrl.addUrl('fixedAssetsListCalculation')
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        if(response.data.status == 200){
                            let msg = response.data.msg;
                            this.$message.success(msg);
                            this.axios()
                        }else if(response.data.status == 400){
                            let msg = response.data.msg;
                            this.$message.error(msg);
                            this.loading = false;
                        }
                    })
            },
            axios(){
                var url = addUrl.addUrl('fixedAssetsList')
                axios.post(url)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        var data = response.data.value;//借款单审批列表数据
//                        console.log(data);
                        let tableData = data.list;
                        for(let i in tableData){
                            tableData[i].showOriginalMoney =  number.number(tableData[i].originalMoney)
                            tableData[i].showMoney =  number.number(tableData[i].money)
                        }
                        this.tableData = tableData
                    })
                    .catch(error=> {
                        this.loading = false;
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            }
        },
        computed:mapState(['current_book_ym']),
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
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight -85}px`;
            };
        },
        created(){
            let str = String(this.current_book_ym)
            this.nowDate = str.substring(0,4) + '年' + str.substring(4,6) + '月'
            var url = addUrl.addUrl('fixedAssetsList')
            axios.post(url)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;
//                    console.log(data);
                    let tableData = data.list;
                    for(let i in tableData){
                        tableData[i].showOriginalMoney =  number.number(tableData[i].originalMoney)
                        tableData[i].showMoney =  number.number(tableData[i].money)
                    }
                    this.tableData = tableData
                })
                .catch(error=> {
                    this.loading = false;
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
        },
    }
</script>
<style scoped>
    .w{
        width:1300px;
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
    .content {
        width: 1220px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
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
        line-height: 30px;
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
    .choice {
        width:200px;
        display: inline-block;
        position: absolute;
        top:20px;
        left:35px;
        text-decoration: none;
        font-size:18px;
    }
    .sub{
        position: absolute;
        right:100px;
        font-size:12px;
    }
</style>
