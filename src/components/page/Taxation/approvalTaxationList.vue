<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>缴税单审批列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="content cf">
                    <el-table class="single" :data="tableData3">
                        <el-table-column align="center" sortable prop="taxName" label="税种名称"></el-table-column>
                        <el-table-column align="center" sortable prop="amount" label="金额">
                            <template slot-scope="scope">
                                <span>{{scope.row.showMoney}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" sortable prop="submitTimeStr" label="日期"></el-table-column>
                        <el-table-column align="center" sortable prop="showState" label="状态"></el-table-column>
                        <el-table-column align="center" prop="showState" label="操作">
                            <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'approvalTaxation',params:{debitId:scope.row.idStr}}" class="see">
                                        <i class="icon iconfont icon-kanguo blue"></i>
                                    </router-link>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
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

    export default{
        data(){
            return {
                tableData3:[],
                loading:true
            }
        },
        methods: {

        },
        created(){
            let url = addUrl.addUrl('approvalTaxationList');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    let tableData3 = data.dataList
                    for(let i in tableData3){
                        tableData3[i].showMoney = number.number(tableData3[i].amount)
                    }
                    this.tableData3 = tableData3
                    this.loading = false
                })
                .catch(()=>{
                    this.loading = false
                })
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
    .choice {
        width:120px;
        display: inline-block;
        position: absolute;
        left:20px;
        text-decoration: none;
    }
    .tabs{
        display: inline-block;
        width:86%;
        float: left;
        margin-left: 2%;
    }
    .yearSelect{
        display: inline-block;
        width:12%;
        float: left;
        margin-top: 10px;
    }

    .mon{
        font-size:16px;
        font-weight: bold;
    }
    .back{
        display: inline-block;
        width:56px;
        height:31px;
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
    .back2{
        display: inline-block;
        width:100px;
        height:31px;
        background-color: #409EFF;
        border: 1px solid #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        text-decoration: none;
        color: #fff;
        position: absolute;
        right: 100px;
    }
    .sub1{
        position: absolute;
        left:0px;
        font-size:12px;
    }
    .sub2{
        position: absolute;
        left:70px;
        font-size:12px;
    }
    .sub3{
        position: absolute;
        left:150px;
        font-size:12px;
    }
    .sub4{
        position: absolute;
        left:245px;
        font-size:12px;
    }
    .sub5{
        position: absolute;
        left:325px;
        font-size:12px;
    }
    .see{
        text-decoration: none;
    }


</style>
