<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>费用单</h2>
                <router-link to="/Reimbursement/newCost" class="addLink">新增</router-link>
                <router-link to="/" class="back">返回</router-link>
                <router-link to="/Reimbursement/costSheetHistory" class="history">历史费用单列表</router-link>
            </div>
        </div>
        <div class="w cf">
            <div class="content" :style="{height:screenHeight}">
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

                <el-table :data="tableList" class="tableList" :show-header=false >
                    <el-table-column property="" label="" align="center" width="40px">
                        <template slot-scope="scope">
                            <span class="checkbox">
                                <input name=checked type="checkbox" :value=scope.row.idString class="inputcheckbox listInput" @click="inputcheckboxClick">
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column property="childTypeName" label="类型"  align="center" width="230px">
                        <template slot-scope="scope">
                            <img class="checkboxImg" :src=scope.row.url alt="">
                            <div class="fl tit">
                                <span class="titName">
                                    <span class="titSpan">{{scope.row.childTypeName}}</span>
                                    <span class="titSpan">{{scope.row.simpleReceiptDate}}</span>
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="discription" label="描述" align="center"></el-table-column>
                    <el-table-column property="operateUserName" label="姓名" align="center"></el-table-column>
                    <el-table-column property="money" label="金额" align="center">
                        <template slot-scope="scope">
                            <span>￥：{{scope.row.showMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="" label="操作" align="center">
                        <template slot-scope="scope">
                            <router-link :to="{name:'seeCost',params:{id:scope.row.idString,isSee:false}}" class="see">
                                <i class="icon iconfont icon-kanguo blue"></i>
                            </router-link>
                                <i class="icon iconfont icon-shanchu red" @click="deleteModel(scope.row.idString)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="checkboxListLast">
                    <span class="checkbox">
                        <input name=checkAll @change="checkAllChange($event)" type="checkbox" class="inputcheckbox allInput">
                        <i class="iconfont icon-31xuanze"></i>
                    </span>
                    <span class="all">全选</span>
                    <div class="create" @click="createClick">＋创建报销单</div>
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
    export default {
        data() {
            return {
                //记录日期中快捷选择
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
                },
                startDate:'',//开始时间
                endDate:'',//结束时间
                list:[],
                tableList:[],//费用列表
                isIndeterminate: true,
                timeInterval:'',
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            //创建报销单click事件
            createClick(){
                var checked = $("input[name=checked]:checked")//找出符合name的input标签中已选中的标签
                var length = checked.length;
                var str = ''//创建报销单时传入id参数
                if(length == 0){
                    this.$message.error('请选择需要添加的费用类别');
                }else{
                    checked.each(function(i){
                        if(i == 0){
                            str += checked[i].value
                        }else{
                            str += ','+ checked[i].value
                        }
                    })
                    this.$router.push({
                        path: '/Reimbursement/newReimbursement',
                        name: 'newReimbursement',
                        params: {
                            idStr: str
                        }
                    })
                }
            },
            //取消全选按钮事件
            inputcheckboxClick(){
                let input = $('.listInput')
                input.each(function(i){
                    if(!$(this).prop('checked')){
                        $(".allInput").prop('checked',false)
                    }
                })
            },
            //全选按钮change事件
            checkAllChange(e){
                var input = $("input[name=checked]")
                if(e.target.checked){
                    input.prop('checked', true);
                }else{
                    input.prop('checked', false);
                }
            },
            //删除提示模态框
            deleteModel(id){
                this.loading = true
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
                    this.loading = false
                });
            },
            //删除列表信息
            deleteList(isId){
                var debitId = isId;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('costSheetDelete')
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
            //执行ajax重新获取费用单列表数据
            axios(){
                this.loading = true;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('costSheet')

                params.append('periodType',this.periodType);
                params.append('auditFlg',this.auditFlg);
                params.append('startDate',this.startDate);
                params.append('endDate',this.endDate);
                params.append('pageNo',this.currentPage);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        var data = response.data.value;//费用列表
                        for(var i = 0; i < data.length; i++){
                            data[i].showMoney = number.number(data[i].money);
                            if(data[i].type <= 3){
                                data[i].url = 'static/images/expense/originalReceipt'+ data[i].type + '-'+ data[i].childType1 +'.png'
                            }else{
                                data[i].url = 'static/images/expense/originalReceipt'+ data[i].type + '.png';
                            }
                        }
//                    console.log(data);
                        this.tableList = data;
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('costSheet')
            params.append('periodType',this.periodType);
            params.append('auditFlg',this.auditFlg);
            params.append('startDate',this.startDate);
            params.append('endDate',this.endDate);
            params.append('pageNo',this.currentPage);

            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false
                    var data = response.data.value;//费用列表
//                    console.log(data);
                    for(var i = 0; i < data.length; i++){
                        data[i].showMoney = number.number(data[i].money);
                        if(data[i].type <= 3){
                            data[i].url = 'static/images/expense/originalReceipt'+ data[i].type + '-'+ data[i].childType1 +'.png'
                        }else{
                            data[i].url = 'static/images/expense/originalReceipt'+ data[i].type + '.png';
                        }
                    }
//                    console.log(data);
                    this.tableList = data;
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
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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
    .history{
        display: inline-block;
        width: 100px;
        height:30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        left:20px;
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
    .query{
        margin-left: 30px;
    }

    .record {
        font-size: 18px;
        color: #333;
        margin-right: 20px;
    }

    .create{
        display: inline-block;
        width:90px;
        height:30px;
        line-height: 30px;
        text-align: center;
        background-color: #00a0e9;
        color: #fff;
        border-radius: 3px;
        text-decoration: none;
        float: right;
        margin-top: 30px;
        cursor: pointer;
    }
    .tableList{
        margin-top: 30px;
    }
    .checkboxImg{
        display: inline-block;
        width:46px;
        height:46px;
        float: left;
        padding: 27px 0;
        white-space:normal;
    }
    .tit .titName{
        display:table-cell;
        vertical-align:middle;
        text-align: center; /*设置文本水平居中*/
        width:100%;
    }
    .tit .titSpan{
        display: inline-block;
        width:100%;
        float: left;
    }
    .tit{
        width:160px;
        height:100px;
        padding: 0 10px;
        text-align: center;
        display: table;
        overflow: hidden;
        table-layout: fixed;
        float: left;
    }
    .checkbox {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        margin: 40px 0px;
        padding: 0;
        cursor: pointer;
        float: left;
    }
    .checkbox i {
        position: absolute;
        left: -10px;
        top: -2px;
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: none;
        font-size:20px;
        color: #1a96d4;
        font-weight: bold;
    }
    .checkbox input {
        position: absolute;
        z-index: 2;
        left: -10px;
        top: -10px;
        width: 200px;
        height: 200px;
        opacity: 0;
        cursor: pointer;
    }

    .checkbox input[type="checkbox"]:checked + i {
        display: block;
    }

    .checkbox.disabled {
        background-color: #ccc;
    }
    .checkboxListLast{
        padding: 0px 10px;
    }
    .all{
        font-size:16px;
        line-height: 100px;
        margin-left: 20px;
    }
    .see{
        text-decoration: none;
    }

</style>
