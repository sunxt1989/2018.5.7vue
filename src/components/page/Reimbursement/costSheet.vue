<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>费用单</h2>
                <router-link to="/loan/newLoan" class="addLink">新增</router-link>
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
                    :picker-options="pickerOptions2">
                </el-date-picker>
                <el-button size="small" type="primary" @click="axios" class="query">查询</el-button>

                <div class="costList" v-for="item in list">
                    <h2><img class="h2Img" :src="item.type" alt=""><span class="h2Span">{{item.typeName}}</span></h2>
                    <el-checkbox-group  v-model="checkedCities" @change="handleCheckedCitiesChange" text-color="#333">
                        <el-checkbox class="checkboxList" v-for="city in cities" :label="city" :key="city">
                            <img class="fl checkboxImg" src="../../../../static/images/1.png" alt="">
                            <div class="fl tit">
                                <span class="titName">
                                    <span class="titSpan">{{city}}行还是第</span>
                                    <span class="titSpan">2018-01-01</span>
                                </span>

                            </div>
                            <div class="fl detailed">
                                <span class="detailedSpan">
                                     上海-三亚上海-三亚上海-三亚上海--三亚上海-三亚上海-三亚上海-三亚上海-三亚上海-三亚上海-三亚上海-三亚上海-三亚上海-三亚上海-三亚
                                </span>
                            </div>
                            <div class="fl checkboxName">
                                <span>小明</span>
                            </div>
                            <div class="fl checkboxMoney">
                                <span>￥：30000.00</span>
                            </div>
                            <div class="fl operation">
                                <i class="icon iconfont icon-kanguo blue" @click.stop.prevent="onClick"></i>
                                <i class="icon iconfont icon-shanchu red" @click.stop.prevent="onClick"></i>
                            </div>
                        </el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox
                        class="checkboxAll"
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        @change="handleCheckAllChange"
                        text-color="#333">
                        全选</el-checkbox>
                    <router-link to="/loan/newLoan" class="create">＋创建报销单</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        data() {
            return {
                list:[],//费用列表
                checkAll: false,
                checkedCities: [],
                cities: cityOptions,
                isIndeterminate: true,
                timeInterval:'',
                loading:false,
            }
        },
        methods:{
            onClick(){
                console.log('@@@@');
            },
            changeTime(){

            },
            axios(){

            },
            pickerOptions2(){

            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
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
                        data[i].type = '../../../../static/images/'+ data[i].type + '.png'
                    }
                    this.list = data;
                    console.log(this.list);
                })
                .catch(error=> {
                    console.log(error);
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
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25)
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
    }
    .checkboxImg{
        width:46px;
        height:46px;
        padding: 27px 0;
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
        width:370px;
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
        width:200px;
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
    }


</style>
