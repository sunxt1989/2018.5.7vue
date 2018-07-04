<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>工资单</h2>

                <router-link to="/loan/newLoan" class="addLink">新增</router-link>
            </div>
            <div class="w">
                <img src="/static/originalReceipt1.png" alt="">
                <img :src="Url" alt="">
                <div class="content cf">
                    <el-date-picker
                        class="yearSelect"
                        v-model="year"
                        type="year"
                        placeholder="选择年"
                    size="small">
                    </el-date-picker>
                    <!--<ul>-->
                        <!--<li>-->
                            <!--<span class="month">1月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='1' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">2月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='2' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">3月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='3' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">4月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='4' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">5月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='5' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">6月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='6' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">7月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='7' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">8月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='8' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">9月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='9' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">10月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='10' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<span class="month">11月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='11' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<li class="last">-->
                            <!--<span class="month">12月</span>-->
                            <!--<span class="checkbox">-->
                                <!--<input name=checkbox type="radio" value='12' class="inputcheckbox" >-->
                                <!--<div class="yuan"></div>-->
                            <!--</span>-->
                        <!--</li>-->
                        <!--<div class="timeLine"></div>-->
                    <!--</ul>-->
                    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane name="1月">
                            <span slot="label" class="mon">1月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">2月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">3月</span>
                        </el-tab-pane>
                        <el-tab-pane name="4月">
                            <span slot="label" class="mon">4月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">5月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">6月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">7月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">8月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">9月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">10月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">11月</span>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label" class="mon">12月</span>
                        </el-tab-pane>
                    </el-tabs>

                    <el-table class="single" :data="tableData3" style="width: 100%" height="500">
                            <el-table-column fixed prop="date" label="序号"></el-table-column>
                            <el-table-column fixed prop="name" label="姓名"></el-table-column>
                            <el-table-column fixed prop="bumen" label="部门"></el-table-column>
                            <el-table-column fixed prop="cz" label="操作"></el-table-column>
                            <el-table-column prop="yfgz" label="应发工资"></el-table-column>
                            <el-table-column label="个人代缴保险">
                                <el-table-column prop="yfgz" label="养老保险"></el-table-column>
                                <el-table-column prop="yfgz" label="医疗保险"></el-table-column>
                                <el-table-column prop="yfgz" label="失业保险"></el-table-column>
                                <el-table-column prop="yfgz" label="生育保险"></el-table-column>
                                <el-table-column prop="yfgz" label="工伤保险"></el-table-column>
                                <el-table-column prop="yfgz" label="住房公积金"></el-table-column>
                                <el-table-column prop="yfgz" label="五险一金合计"></el-table-column>
                            </el-table-column>
                            <el-table-column label="公司代缴保险">
                                <el-table-column prop="yfgz" label="养老保险"></el-table-column>
                                <el-table-column prop="yfgz" label="医疗保险"></el-table-column>
                                <el-table-column prop="yfgz" label="失业保险"></el-table-column>
                                <el-table-column prop="yfgz" label="生育保险"></el-table-column>
                                <el-table-column prop="yfgz" label="工伤保险"></el-table-column>
                                <el-table-column prop="yfgz" label="住房公积金"></el-table-column>
                                <el-table-column prop="yfgz" label="五险一金合计"></el-table-column>
                            </el-table-column>
                            <el-table-column prop="yfgz" label="应纳税所得额"></el-table-column>
                            <el-table-column prop="yfgz" label="个人所得税"></el-table-column>
                            <el-table-column prop="yfgz" label="实发工资"></el-table-column>
                        </el-table>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                activeName: '4月',
                year:'',
                tableData3:[
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    },
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    },
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                    ,
                    {
                        date:1,
                        name:'姓名',
                        bumen:'部门',
                        cz:'操作',
                        yfgz:'300000000',
                    }
                ],
                Url:'static/originalReceipt1.png',
                loading:false
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
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
    ul{
        display: flex;
        display: -webkit-flex;
        flex-wrap:nowrap;
        justify-content:space-between;
        width:88%;
        margin-left: 2%;
        position: relative;
        float: left;
    }
    ul li {
        display: inline-block;
        z-index:2;
    }
    .last{
        background-color: #fff;
    }
    ul li .month{
        width:100%;
        display: inline-block;
    }
    .checkbox {
        display: inline-block;
        position: relative;
        overflow: hidden;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #bfbfbf;
        margin: 0px 0px;
        padding: 0;
        cursor: pointer;
        background-color: #fff;
        z-index:1;
    }
    .checkbox:hover{
        border: 1px solid #4e9fd8;
    }
    .iconfont{
        font-size:20px;
        color: #ccc;
    }
    .checkbox .yuan{
        display: none;
        width:10px;
        height:10px;
        margin: 2px;
        border-radius: 50%;
        background-color: #4e9fd8;
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
    .checkbox input[type="radio"]:checked + .checkbox{
        border: 1px solid #4e9fd8;
    }
    .checkbox input[type="radio"]:checked + .yuan {
        display: block;
    }
    .timeLine{
        width:100%;
        border-bottom: 1px solid #ccc;
        position: absolute;
        top:30px;
        z-index:1;
    }
    .single {
        margin-top: 80px;
    }
    .mon{
        font-size:16px;
        font-weight: bold;
    }


</style>
