<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>费用单</h2>
                <router-link to="/Reimbursement/newCost" class="addLink">新增</router-link>
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
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button size="small" type="primary" @click="axios" class="query">查询</el-button>

                <div class="costList" v-for="item in list">
                    <h2><img class="h2Img" :src="item.url" alt=""><span class="h2Span">{{item.typeName}}</span></h2>
                    <ul>
                        <li class="checkboxList" v-for="lis in item.originalReceiptList">
                            <span class="checkbox">
                                <input :name=item.checkbox type="checkbox" :value=lis.idString class="inputcheckbox" >
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                            <img class="fl checkboxImg" :src='lis.url||item.url' alt="">
                            <div class="fl tit">
                                <span class="titName">
                                    <span class="titSpan">{{lis.childTypeName}}</span>
                                    <span class="titSpan">{{lis.simpleReceiptDate}}</span>
                                </span>
                            </div>
                            <div class="fl detailed">
                                <span class="detailedSpan">
                                    {{lis.discription}}
                                </span>
                            </div>
                            <div class="fl checkboxName">
                                <span>{{lis.operateUserName}}</span>
                            </div>
                            <div class="fl checkboxMoney">
                                <span>￥：{{lis.money}}</span>
                            </div>
                            <div class="fl operation">
                                <router-link :to="{name:'seeCost',params:{id:lis.idString}}" class="see">
                                    <i class="icon iconfont icon-kanguo blue"></i></router-link>
                                <i class="icon iconfont icon-shanchu red" @click="deleteModel(lis.idString)"></i>
                            </div>
                        </li>
                        <li class="checkboxListLast">
                            <span class="checkbox">
                                <input :name=item.checkAll @change="checkAllChange(item.type,$event)" type="checkbox" :value=item.type class="inputcheckbox" >
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                            <span class="all">全选</span>
                            <div class="create" @click="createClick(item.type)">＋创建报销单</div>
                        </li>
                    </ul>
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
                //记录日期中快捷选择
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
                },
                startDate:'',//开始时间
                endDate:'',//结束时间
                list:[],//费用列表
                isIndeterminate: true,
                timeInterval:'',
                loading:false,
            }
        },
        methods:{
            //创建报销单click事件
            createClick(type){
                var name = 'checkbox'+ type;//找出符合name的input标签
                var checked = $("input[name=" + name + "]:checked")//找出符合name的input标签中已选中的标签
                var length = checked.length;
                var str = ''//创建报销单时传入id参数
                if(length == 0){
                    this.$message.error('请选择需要添加的费用类别');
                }else{
                    console.log(checked);
                    checked.each(function(i){
                        console.log(checked[i].value);
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
                            type: type,
                            idStr: str
                        }
                    })
                }
            },
            //全选按钮change事件
            checkAllChange(type,e){
                var name = 'checkbox'+ type;
                var input = $("input[name=" + name + "]")
                var length = $("input[name=" + name + "]:checked").length;
                if(e.target.checked){
                    input.prop('checked', true);
                }else{
                    input.prop('checked', false);
                }
            },
            //删除提示模态框
            deleteModel(id){
                console.log(id);
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteList(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除列表信息
            deleteList(isId){
                this.loading = true;
                var debitId = isId;
                var params = new URLSearchParams();
                console.log(debitId);
                params.append('id',debitId);

                axios.post('http://192.168.2.192:8080/web/vue/expense/delete.html',params)
                    .then(response=> {
                        this.loading = false;
                        console.log(response);
                        this.axios();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            //选择记录日期事件
            changeTime(){
                console.log(this.timeInterval);
                //设置记录日期的起始日期和终止日期
                const date = this.timeInterval;
                if(date){
                    this.startDate = date[0]
                    this.endDate = date[1]
                }else{
                    this.startDate = '';
                    this.endDate = '';
                }
                console.log(this.startDate);
                console.log(this.endDate);
            },
            //执行ajax重新获取借款单列表数据
            axios(){
                var params = new URLSearchParams();
                params.append('periodType',this.periodType);
                params.append('auditFlg',this.auditFlg);
                params.append('startDate',this.startDate);
                params.append('endDate',this.endDate);
                params.append('pageNo',this.currentPage);

                axios.post('http://192.168.2.192:8080/web/vue/expense/list.html',params)
                    .then(response=> {
                        console.log(response);
                        var data = response.data.value;//费用列表
                        for(var i = 0; i < data.length; i++){
                            var originalReceiptList = data[i].originalReceiptList;
                            data[i].checkbox = 'checkbox'+ data[i].type;
                            data[i].checkAll = 'checkAll'+ data[i].type;
                            data[i].url = '../../../../static/images/expense/originalReceipt'+ data[i].type + '.png'
                            console.log(originalReceiptList);
                            if(data[i].type <= 3){
                                for(var ii = 0; ii < originalReceiptList.length; ii++){
                                    originalReceiptList[ii].url = '../../../../static/images/expense/originalReceipt'+ data[i].type + '-'+ originalReceiptList[ii].childType1 +'.png'
                                }
                            }
                        }
                        this.list = data;
                        console.log(this.list);
                    })
            },

        },
        created(){
            var params = new URLSearchParams();
            params.append('periodType',this.periodType);
            params.append('auditFlg',this.auditFlg);
            params.append('startDate',this.startDate);
            params.append('endDate',this.endDate);
            params.append('pageNo',this.currentPage);

            axios.post('http://192.168.2.192:8080/web/vue/expense/list.html',params)
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;//费用列表
                    for(var i = 0; i < data.length; i++){
                        var originalReceiptList = data[i].originalReceiptList;
                        data[i].checkbox = 'checkbox'+ data[i].type;
                        data[i].checkAll = 'checkAll'+ data[i].type;
                        data[i].url = '../../../../static/images/expense/originalReceipt'+ data[i].type + '.png'
                        if(data[i].type <= 3){
                            for(var ii = 0; ii < originalReceiptList.length; ii++){
                                originalReceiptList[ii].url = '../../../../static/images/expense/originalReceipt'+ data[i].type + '-'+ originalReceiptList[ii].childType1 +'.png'
                            }
                        }
                    }
                    this.list = data;
                    console.log(this.list);
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
        height: 100%;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
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
    .costList{
        margin: 20px 0;
    }
    .costList h2{
        display: block;
        height:35px;
        line-height: 35px;
        padding-bottom: 25px;
        border-bottom: 1px solid #4e9fd8;
    }
    .costList .h2Span{
        margin-left: 20px;
        vertical-align: top;
    }
    .costList .h2Img{
        width:35px;
        height:35px;
    }
    .checkboxList{
        display: block;
        height:100px;
        border-bottom: 1px solid #ccc;
        margin: 0;
        overflow: hidden;
    }
    .checkboxListLast{
        display: block;
        height:100px;
        margin: 0;
    }
    .checkboxImg{
        width:46px;
        height:46px;
        padding: 27px 0;
        margin-left: 25px;
    }
    .checkboxList .fl{
        float: left;
        white-space:normal;
    }
    .checkboxList .tit{
        width:160px;
        height:100px;
        padding: 0 10px;
        text-align: center;
        display: table;
        overflow: hidden;
        table-layout: fixed;
    }
    .checkboxList .tit .titName{
        display:table-cell;
        vertical-align:middle;
        text-align: center; /*设置文本水平居中*/
        width:100%;
    }
    .checkboxList .tit .titSpan{
        display: inline-block;
        width:100%;
        float: left;
    }

    .checkboxList .detailed{
        width:360px;
        height:100px;
        padding: 0px 10px;
        text-align: center;
        display: table;
        overflow: hidden;
        table-layout: fixed;
    }
    .checkboxList .detailed .detailedSpan{
        display:table-cell;
        vertical-align:middle;
        text-align: center; /*设置文本水平居中*/
        width:100%;
    }
    .checkboxList .checkboxName{
        width:100px;
        height:100px;
        padding: 0px 10px;
        text-align: center;
    }
    .checkboxList .checkboxName span{
        line-height: 100px;
    }
    .checkboxList .checkboxMoney{
        width:180px;
        height:100px;
        padding: 0px 10px;
        text-align: center;
    }
    .checkboxList .checkboxMoney span{
        line-height: 100px;
    }
    .checkboxList .operation{
        width:100px;
        height:100px;
        padding: 0px 10px;
        text-align: center;
        line-height: 100px;
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
    .all{
        font-size:16px;
        line-height: 100px;
        margin-left: 20px;
    }
    .see{
        text-decoration: none;
    }

</style>
