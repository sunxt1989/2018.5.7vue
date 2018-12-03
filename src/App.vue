<template>
  <div id="app" v-loading.fullscreen.lock="loading">
      <top-h></top-h>
      <router-view/>
      <bg></bg>
  </div>
</template>

<script>
    import $ from 'jquery'
    import topH from '@/components/common/top-h'
    import bg from '@/components/common/bg'

    import { mapState } from 'vuex'
    export default {
        name: 'App',
        data(){
          return{
              loading:true,
          }
        },
        watch:{
            //判断首页公共参数获取到后改变loading
            start_ym:function(val){
                this.loading = false;
            }
        },
        computed:mapState(['start_ym']),
        components: {
            topH,
            bg
        },
        mounted(){

        }
    }
</script>

<style>
    body, p, img, dl, dt, dd, ul, ol, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
    body { position: relative; font: 12px/24px "新宋体", Arial; min-width: 960px; }
    ul, ol { list-style: none; }
    img { border: 0 none; }
    input, select { vertical-align: middle; }
    table { border-collapse: collapse; }
    s, em, i a{ font-style: normal; text-decoration: none; }
    .cf { *zoom: 1; }
    .cf:after { clear: both; content: "."; display: block; height: 0; overflow: hidden; visibility: hidden; zoom: 1; }

    html，body{
        height:100%;
        background-color: #e3f1f4;
    }
    #app{
        height:100%;
    }
    .w{
        width:1200px;
        margin: 0 auto;
    }
    .el-header{
        padding: 0;
    }
    .el-table thead th{
        height:42px;
        font-family: '思源黑体';
        padding: 0;
        font-weight:500;
        text-align: center;
    }
    .blueList thead th{
        color: #fff;
        background-color: #1c96d3;
    }
    .single .el-table__header-wrapper table thead tr th{
        color: #fff;
        background-color: #1c96d3;
    }
    .single .el-table__fixed-header-wrapper table thead tr th{
        color: #fff;
        background-color: #1c96d3;
    }

    .voucherList .el-table--enable-row-hover .el-table__body .success-row:hover>td {
        background-color: #e3fcfe;
    }
    .voucherList .el-table--enable-row-hover .el-table__body .total-row:hover>td {
        background-color: #fff4e5;
    }
    .voucherList  .el-table .success-row {
        background: #fff;
    }
    .voucherList  .el-table .total-row {
        background: #fff4e5;
    }

    .littleTable .el-table__header-wrapper table thead tr th{
        background-color: #efefef;
        color: #333;
    }
    .grayList thead th{
        color: #333;
        background-color: #f4f4f4;
    }
    .el-table tr td{
        height:42px;
        padding: 0;
    }

    h2{
        font-family: '思源黑体';
    }
    .line{
        text-align: left;
        color: #1c96d3;
        border-bottom: 2px solid #1c96d3;
    }
    .line span{
        font-family: '思源黑体';
        font-size:16px;
    }
    .el-input__inner{
        height:36px;
    }
    .checkboxAll{
        margin-top: 30px;
    }
    .checkboxAll .el-checkbox__input{

    }
    .checkboxAll .el-checkbox__input .el-checkbox__inner{
        -webkit-transform:scale(1.6);
        transform:scale(1.6);
        margin-left: 5px;
    }
    .checkboxList .el-checkbox__input{
        display: inline-block;
        width:4%;
        height:100%;
        margin: 0;
        padding: 0;
        float: left;
        line-height: 100px;
    }
    .checkboxList .el-checkbox__input .el-checkbox__inner{
        -webkit-transform:scale(1.6);
        transform:scale(1.6);
        margin-left: 5px;
    }
    .checkboxList .el-checkbox__label{
        display: inline-block;
        width:96%;
        margin: 0;
        padding: 0;
        float: left;
    }

    .newSupplier .el-radio{
        width:400px;
        font-size:18px;
        margin-left: 150px;
        color: #1c96d3;
    }
    .newSupplier .el-radio .el-radio__label{
        font-size:18px;
        font-weight: bold;
    }
    .el-date-editor.el-input.yearData{
        width:12%;
        display: inline-block;
        float: left;
        margin-top: 10px;
    }
    .homePage-checkbox .el-checkbox__input{
        position: absolute;
        bottom:-4px;
        left:-2px;
    }

</style>
