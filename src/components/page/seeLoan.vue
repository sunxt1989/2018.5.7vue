<template>
    <div class="w">
        <div class="top">
            <h2>查看借款单</h2>
            <router-link to="/loan" class="back">返回</router-link>
        </div>
        <div class="content">
            <ul>
                <li>
                    <span>金额</span>
                    <input type="text" v-model="money" readonly>
                </li>
                <li>
                    <span>已还金额</span>
                    <input type="text" v-model="Amoney" readonly>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                money:'100',
                Amoney:'50'
            }
        }
    }

</script>

<style scoped>
    .w{
        text-align: center;
        font-size:0px;
    }
    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }
    h2{
        font-size:18px;
        display: inline-block;
    }
    .el-button{
        position: absolute;
        right:90px;
    }
    ul{
        width:100%;
    }
    ul li{
        display: inline-block;
        width:50%;
        height:36px;
        text-align: left;
    }
    ul li input{

        border: 1px solid #ccc;
        border-radius: 3px;
    }
    ul li span{
        font-size:14px;
        display: inline-block;
        width:200px;
    }
</style>
