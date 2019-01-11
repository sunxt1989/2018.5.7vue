<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>报销单列表</h2>
                <el-select v-model="choice" class="choice" placeholder="未完成列表" @change="changeChoice">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.choice">
                    </el-option>
                </el-select>
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

                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="originalTypeName" label="类别" sortable align="left">
                        <template slot-scope="scope">
                            <img class="logoImg" :src=scope.row.url alt="">
                            <span>费用报销</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="simpleReceiptDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="applicationUserName" label="名称" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receiptCount" label="票据" sortable align="center"></el-table-column>
                    <el-table-column prop="auditFlg" label="状态" sortable align="center" width="100px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.auditFlg == 0">未提交</span>
                            <span v-else-if="scope.row.auditFlg == 1">驳回</span>
                            <span v-else-if="scope.row.auditFlg == 2">待审核</span>
                            <span v-else-if="scope.row.auditFlg == 3">待出纳确认</span>
                            <span v-else-if="scope.row.auditFlg == 4">通过</span>
                            <span v-else-if="scope.row.auditFlg == 5">待审核</span>
                            <span v-else-if="scope.row.auditFlg == 6">待审核</span>
                            <span v-else-if="scope.row.auditFlg == 7">已红冲</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="operation">
                                <router-link :to="{name:'seeReimbursement',params:{debitId:scope.row.idString,choice:choice,currentPage:currentPage}}" class="see">
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
                auditFlg:'',//报销单状态： 0 未提交 1 驳回；2/5/6 待审核； 3 待出纳确认；4 通过；7 已红冲；
                options: [{
                    choice: '4,7',
                    label: '已完成列表'
                }, {
                    choice: '0,1,2,3,5,6',
                    label: '未完成列表'
                }],
                choice:this.$route.params.choice,
                currentPage:this.$route.params.currentPage,//当前页数
                tableData: [],//借款单列表数据
                count:0,//总条目数
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            changeChoice(){
                this.loading = true
                this.axios()
            },
            //选择记录日期事件
            changeTime(){
//                console.log(this.timeInterval);
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
//                console.log(this.choice);
                var params = new URLSearchParams();
                var url = addUrl.addUrl('ReimbursementList')
//                console.log(this.startDate);
//                console.log(this.endDate);
                params.append('periodType','');
                params.append('status',this.choice);
                params.append('startDate',this.startDate);
                params.append('endDate',this.endDate);
                params.append('pageNo',this.currentPage);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        var data = response.data.value.list;//报销单单列表数据
                        var $count = response.data.value.count;//总条目数
                        let tableDataarr =[];
//                        console.log(data);
                        for(var i =0; i < data.length; i++){
                            tableDataarr.push(data[i])
                        }
                        this.count = $count;
                        this.tableData = this.addUrl(tableDataarr);
                        this.loading = false;
                    })
                    .catch(error=> {
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            //删除提示模态框
            deleteModel(id){
                this.loading = true
//                console.log(id);
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
                    this.loading = false;
                });
            },
            //删除列表信息
            deleteList(isId){
                var debitId = isId;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('ReimbursementListDelete')
//                console.log(debitId);
                params.append('id',debitId);

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
            //分页器
            changePage(val){
                this.loading = true
                this.currentPage = val;
                this.axios()
            },
            addUrl(list){
//                console.log(list);
                for(var i = 0; i < list.length; i++){
                    list[i].showMoney = number.number( list[i].money)
                    list[i].url = 'static/images/expense/feiyongbaoxiao.png'
                }
                return list
            },
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
            if(!this.choice)this.choice='0,1,2,3,5,6';
            if(!this.currentPage)this.currentPage = 1;
            let params = new URLSearchParams();
            let url = addUrl.addUrl('ReimbursementList')
            params.append('periodType','');
            params.append('status',this.choice);
            params.append('startDate',this.startDate);
            params.append('endDate',this.endDate);
            params.append('pageNo',this.currentPage);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value.list;//报销单列表数据
                    var $count = response.data.value.count;//总条目数
                    let tableDataarr =[];
//                    console.log(data);

                    for(var i =0; i < data.length; i++){
                        tableDataarr.push(data[i])
                    }

                    this.count = $count;
                    this.tableData = this.addUrl(tableDataarr);
                })
                .catch(error=> {
                    this.loading = false;
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
    .logoImg {
        width:30px;
        height:30px;
    }
</style>
