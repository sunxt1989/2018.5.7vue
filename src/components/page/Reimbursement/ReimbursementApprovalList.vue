<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>报销单审批列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="originalTypeName" label="类别" sortable align="left">
                        <template slot-scope="scope">
                            <img class="logoImg" :src=scope.row.url alt="">
                            <span>费用报销</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="simpleConfirmDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="applicationUserName" label="姓名" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="金额" sortable align="center">
                        <template slot-scope="scope">
                                <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receiptCount" label="票据张数" sortable align="center"></el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'ReimbursementApproval',params:{debitId:scope.row.idString}}" class="see">
                                        <i class="icon iconfont icon-kanguo blue"></i></router-link>
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
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data() {
            return {
                tableData:[],
                count:0,//总条目数
                currentPage:1,//当前页数
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            //分页器
            changePage(val){
                this.loading = true
                this.currentPage = val;
                this.axios()
            },
            axios(){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('ReimbursementApprovalList')
                params.append('pageNo', this.currentPage);
                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
                        var data = response.data.value;//报销单审批列表数据
//                        console.log(data);
                        this.count = data.count;//总条目数
                        this.tableData = this.addUrl(data.list)
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            addUrl(list){
//                console.log(list);
                for(var i = 0; i < list.length; i++){
                    list[i].showMoney = number.number( list[i].money)
                    list[i].url = 'static/images/expense/feiyongbaoxiao.png'
                }
                return list
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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('ReimbursementApprovalList')
            params.append('pageNo', this.currentPage);
            axios.post(url, params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false;
                    var data = response.data.value;//报销单审批列表数据
//                    console.log(data);
                    if(data){
                        this.count = data.count;//总条目数
                        this.tableData = this.addUrl(data.list)
                    }
                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
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
    .left {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
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
    .logoImg {
        width:30px;
        height:30px;
    }
</style>
