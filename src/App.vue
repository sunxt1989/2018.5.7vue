<template>
  <div id="app">
      <topH></topH>
      <router-view/>
  </div>
</template>

<script>
    import topH from '@/components/common/topH'
export default {
  name: 'App',
    components:{
        topH
    }
}
</script>

<style>
    body, p, img, dl, dt, dd, ul, ol, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
    body { position: relative; font: 12px/24px "思源黑体", Arial; min-width: 960px; }
    ul, ol { list-style: none; }
    img { border: 0 none; }
    input, select { vertical-align: middle; }
    table { border-collapse: collapse; }
    s, em, i { font-style: normal; text-decoration: none; }
    .cf { *zoom: 1; }
    .cf:after { clear: both; content: "."; display: block; height: 0; overflow: hidden; visibility: hidden; zoom: 1; }
    html,body{
        height:100%;
    }
    #app{
        background-color: #e3f1f4;
        height:100%;
    }
    .w{
        width:1200px;
        margin: 0 auto;
    }
    .el-table th{
        color: #fff;
        background-color: #1c96d3;
    }
</style>
