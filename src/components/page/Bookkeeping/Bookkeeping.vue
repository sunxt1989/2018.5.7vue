<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>记账凭证</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="content">
                <table>
                    <col width="300px">
                    <col width="300px">

                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">

                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <col width="25px">
                    <thead>
                    <tr>
                        <th rowspan="2">摘要</th>
                        <th rowspan="2">会计科目</th>
                        <th colspan="11">借方金额</th>
                        <th colspan="11">贷方金额</th>
                        <th rowspan="2">操作</th>
                    </tr>
                    <tr>
                        <th>亿</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>万</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>元</th>
                        <th>角</th>
                        <th>分</th>
                        <th>亿</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>万</th>
                        <th>千</th>
                        <th>百</th>
                        <th>十</th>
                        <th>元</th>
                        <th>角</th>
                        <th>分</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="num-1 effective">
                        <td class="firTd">
                            <textarea v-model="abstract1" class="abstract-input" maxlength="50"></textarea>
                            <i class="icon iconfont icon-31xuanze green"></i>
                        </td>
                        <td>
                            <el-select v-model="subject1" filterable allow-create default-first-option placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </td>

                        <td class="debit" :class="{red:borrow1.includes('-')}">{{borrowArr[0][0]}}</td>
                        <td class="debit">{{borrowArr[0][1]}}</td>
                        <td class="debit">{{borrowArr[0][2]}}</td>
                        <td class="debit">{{borrowArr[0][3]}}</td>
                        <td class="debit">{{borrowArr[0][4]}}</td>
                        <td class="debit">{{borrowArr[0][5]}}</td>
                        <td class="debit">{{borrowArr[0][6]}}</td>
                        <td class="debit">{{borrowArr[0][7]}}</td>
                        <td class="debit">{{borrowArr[0][8]}}</td>
                        <td class="debit">{{borrowArr[0][9]}}</td>
                        <td class="debit">
                            {{borrowArr[0][10]}}
                            <input class="borrow borrowArr-1" v-model="borrow1" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td class="lender" >{{loan[0][0]}}</td>
                        <td class="lender" >{{loan[0][1]}}</td>
                        <td class="lender" >{{loan[0][2]}}</td>
                        <td class="lender" >{{loan[0][3]}}</td>
                        <td class="lender" >{{loan[0][4]}}</td>
                        <td class="lender" >{{loan[0][5]}}</td>
                        <td class="lender" >{{loan[0][6]}}</td>
                        <td class="lender" >{{loan[0][7]}}</td>
                        <td class="lender" >{{loan[0][8]}}</td>
                        <td class="lender" >{{loan[0][9]}}</td>
                        <td class="lender" >
                            {{loan[0][10]}}
                            <input class="loan loanArr-1" v-model="loan1" type="text" pattern="[0-9]" maxlength="13">
                        </td>

                        <td><i class="icon iconfont icon-shanchu red"></i></td>
                    </tr>
                    </tbody>
                </table>
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
                abstract1:'一二三四五',//摘要
                subject1:'',//会计科目
                borrow1:'',//借方金额
                loan1:'',//贷方金额

                borrowArr:[
                    ['1','0','0','0','0','0','0','0','0','0','0'],
                ],//借方金额数组
                loan:[
                    ['1','0','0','0','0','0','0','0','0','0','0'],
                ],//贷方金额数组

                options: [],
                loading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        watch:{
            borrow1:function(val){
                this.borrow1 = val.replace(/[^0-9-.]+/,'');
                let str = /^-?[0-9]+(\.[0-9]{1,2})?$/;
                let nowVal = ''
                if(str.test(val)){ //判定输入的金额是否正确
                    nowVal = val.includes('-') ? val.split('-').join('') : val
                    console.log(nowVal);
                }
            }
        },
        methods: {
            index(){

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
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    table tr th,td{
        border: 1px solid #ccc;
    }
    table {
        color: #333;
        font-size:18px;
    }
    table tr th,td {
        vertical-align: middle;
        font-weight: 500;
        padding: 5px 0px;
        text-align: center;
    }
    table tbody tr {
        height:60px;
    }
    table tr td .abstract-input{
        display: inline-block;
        width:90%;
        height:45px;
        resize: none;
        border: none;
        outline: none;
    }
    table .iconfont{
       margin: 0;
       cursor: pointer;
    }
    table tbody tr .firTd{
        position: relative;
    }
    table tbody tr td .icon-31xuanze{
        display: inline-block;
        position: absolute;
        top:25px;
        left:-30px;
        font-size:20px;
    }
    table tbody tr td .green{
        color: #48d41f;
    }
    table tbody tr .debit{
        position: relative;
    }
    table tbody tr .lender{
        position: relative;
    }
    table tbody tr td .borrow{
        position: absolute;
        top:0;
        right:0;
        width:246px;
        height:58px;
        opacity: 0;
        outline: none;
        text-align: right;
        padding: 0 10px;
        font-size:20px;
    }
    table tbody tr td .borrow:hover{
        opacity: 1;
    }
    table tbody tr td .loan{
        position: absolute;
        top:0;
        right:0;
        width:266px;
        height:58px;
        opacity: 0;
        outline: none;
    }
    table tbody tr td .loan:hover{
        opacity: 1;
    }

</style>
