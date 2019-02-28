<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>银行存款日记账</h2>
                <router-link to="/" class="back">返回</router-link>
                <a :href=url1 target="_blank" class="sub1">导出Excel</a>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <div class="choose">
                    <span class="record">会计区间：</span>
                    <el-date-picker
                        class="chooseTime"
                        v-model="startTime"
                        type="month"
                        size="small"
                        align="right"
                        value-format="yyyy-MM">
                    </el-date-picker>
                    -
                    <el-date-picker
                        class="chooseTime"
                        v-model="endTime"
                        type="month"
                        size="small"
                        align="right"
                        value-format="yyyy-MM">
                    </el-date-picker>
                    <el-button @click="query" class="query" size="small" type="primary">查询</el-button>
                </div>
                <el-table :data="tableData" class="single" :height="tableDataHeight">
                    <el-table-column :label="year">
                        <el-table-column prop="month" align="center" label="月" width="60px"></el-table-column>
                        <el-table-column prop="day" align="center" label="日" width="60px"></el-table-column>
                    </el-table-column>
                    <el-table-column prop="pingzhengzihao" label="凭证字号" align="center"></el-table-column>
                    <el-table-column prop="zhaiyao" label="摘要" align="center"></el-table-column>
                    <el-table-column prop="jiefang" label="借方" header-align="center" align="right"></el-table-column>
                    <el-table-column prop="daifang" label="贷方" header-align="center" align="right"></el-table-column>
                    <el-table-column prop="yue" label="余额" header-align="center" align="right"></el-table-column>
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
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                n:'',//判断选择科目区间 0：科目起始区间 ，1：科目终止区间
                tableData: [],//采购付款单审批列表数据
                startTime:'',//会计区间起始月份
                endTime:'',//会计区间终止月份
                year: '',//表头展示年份
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                loading:true,
                url1:'',//导出地址
                screenHeight: '', //页面初始化高度
                treeHeight: '', //tree高度
                tableDataHeight: 460, //表格显示高度
                dialogTableVisible:false,//新建明细模态框是否显示
            }
        },
        methods:{
            //查询按钮click事件
            query(){
                this.loading = true;
                let startTime = this.startTime
                let endTime = this.endTime
                if(startTime == null || endTime == null){
                    this.loading = false;
                    this.$message.error('请填写会计区间');
                    return
                }
                if(startTime.substring(0,4) != endTime.substring(0,4)){
                    this.loading = false;
                    this.$message.error('会计区间不能跨年查询');
                    return
                }else if(Number(startTime.substring(5,7)) > Number(endTime.substring(5,7))){
                    this.loading = false;
                    this.$message.error('请正确填写会计区间');
                    return
                }
                this.axios()
            },

            axios(){
                let url1 = addUrl.addUrl('bankJournalExcel');
                this.url1 = url1 + '?startDate=' + this.startTime + '&endDate='+ this.endTime
//                console.log(this.url1);
                let url = addUrl.addUrl('bankJournal')
                let params = new URLSearchParams();
                params.append('startDate',this.startTime);
                params.append('endDate',this.endTime);
                params.append('startSub',this.startSubject);
                params.append('endSub',this.endSubject);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;//列表数据
                            this.tableData = data.dataList
                            this.year = this.startTime.substring(0,4) + '年'
                            this.loading = false;
                        }else if(status == 400){
                            this.$message.error(msg);
                            this.loading = false;
                        }

                    })
                    .catch(error=> {
//                    console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
        },
        computed:mapState(['current_book_ym','start_ym']),
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            let topHeight = $('.top').innerHeight()
            let headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            this.treeHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 220}px`;
            this.tableDataHeight = Number(document.documentElement.clientHeight - topHeight - headerHeight - 180);
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                let topHeight = $('.top').innerHeight()
                let headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
                that.treeHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 220}px`;
                that.tableDataHeight =  Number(document.documentElement.clientHeight - topHeight - headerHeight - 180);
            };
        },
        created(){
            this.startTime = this.start_ym.substring(0,4) + '-' +this.start_ym.substring(4,6)
            this.endTime = this.current_book_ym.substring(0,4) + '-' +this.current_book_ym.substring(4,6);
            this.year = this.start_ym.substring(0,4) + '年'
            this.axios()
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
    .sub1{
        display: inline-block;
        width: 80px;
        height:30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right:100px;
        font-size:12px;
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
    .el-table {
        margin: 10px 0;
    }
    .el-select {
        margin: 0 20px;
    }
    .see{
        text-decoration: none;
    }
    .choose .record{
        font-size:16px;
        color: #333;
    }
    .choose .chooseTime{
        width:120px;
    }
    .choose .chooseSubject{
        width:160px;
    }
    .Tree{
        height:450px;
        overflow: auto;
    }
    .treeSave{
        width:80px;
        margin-top: 10px;
        margin-left: 30px;
    }

</style>
