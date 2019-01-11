<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>关联采购单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" :loading="isLoading">关联</el-button>
            </div>
        </div>
        <div class="w cf">
            <div class="content" :style="{height:screenHeight}">
                <p>
                    <span class="listTitle">{{subjectName}}</span>
                    <span class="listTitle">{{relationName}}</span>
                    <span class="listTitle">金额：{{amount}}</span>
                    <span class="listTitle">可关联业务金额：{{unDealAmount}}</span>
                </p>
                <el-table :data="tableList" class="tableList" :show-header=false >
                    <el-table-column property="" label="" align="center" width="40px">
                        <template slot-scope="scope">
                                <span class="checkbox">
                                    <input name=radio type="radio" :value=scope.row.idString class="inputcheckbox" >
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column property="data" label="类型"  align="center" width="230px">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">设备</span>
                            <span v-else-if="scope.row.type == 2">软件</span>
                            <span v-else-if="scope.row.type == 3">劳务服务</span>
                            <span v-else-if="scope.row.type == 4">技术服务</span>
                            <span v-else-if="scope.row.type == 5">库存商品</span>
                            <span v-else-if="scope.row.type == 6">固定资产</span>
                            <span v-else-if="scope.row.type == 7">电信服务</span>
                            <span v-else-if="scope.row.type == 8">设计服务</span>
                            <span v-else-if="scope.row.type == 9">广告服务</span>
                            <span v-else-if="scope.row.type == 10">鉴证咨询服务</span>
                            <span v-else-if="scope.row.type == 11">购买专利</span>
                            <span v-else-if="scope.row.type == 12">购买非专利技术</span>
                            <span v-else-if="scope.row.type == 13">购买商标</span>
                            <span v-else-if="scope.row.type == 14">购买著作权</span>
                            <span v-else-if="scope.row.type == 15">申请专利</span>
                            <span v-else-if="scope.row.type == 16">申请商标</span>
                            <span v-else-if="scope.row.type == 17">申请著作权</span>
                            <span v-else-if="scope.row.type == 18">初次购买增值税税控系统专用设备</span>
                            <span v-else-if="scope.row.type == 19">增值税税控系统专用设备技术维护费</span>
                            <span v-else-if="scope.row.type == 20">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="supplierName" label="交易方" align="center"></el-table-column>
                    <el-table-column property="unsendMoney" label="金额" align="center">
                        <template slot-scope="scope">
                            <span>￥：{{scope.row.showMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="simplePurchaseDate" label="时间" align="center"></el-table-column>
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
    export default {
        data() {
            return {
                list:[],
                tableList:[],
                isIndeterminate: true,
                timeInterval:'',
                advanceId:this.$route.params.debitId,//辅助ID
                relationIdString:this.$route.params.relationIdString,//往来单位id
                subjectName:this.$route.params.subjectName,//科目名称
                relationName:this.$route.params.relationName,//交易方
                amount:this.$route.params.amount,//金额
                unDealAmount:this.$route.params.unDealAmount,//未付款
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$router.go(-1)
                }else {
                    let purchaseId = $(".inputcheckbox[name='radio']:checked").val()
                    if(!purchaseId){
                        this.$message.error('请选择关联条目')
                        this.loading = false;
                        return
                    }
                    this.isLoading = true;
                    this.$confirm('确定是否关联？', '提示', {
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
                        this.$router.push({ name: 'newPurchasePayment',
                            params:{purchaseId:purchaseId,advanceId:this.advanceId}})
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                        this.isLoading = false;
                    });
                }
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
            let params = new URLSearchParams();
            let url = addUrl.addUrl('linkedPurchase');
            params.append('tradeId',this.relationIdString);
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false
                    let data = response.data.value;
                    for(let i in data.list){
                        data.list[i].showMoney =number.number(data.list[i].unsendMoney)
                    }
                    this.tableList = data.list;
                    this.amount = number.number(this.amount)
                    this.unDealAmount = number.number(this.unDealAmount)
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
    .listTitle{
        font-size:16px;
        color: #409EFF;
        margin-left: 60px;
        margin-right: 60px;
    }
    .back{
        position: absolute;
        right:30px;
        font-size:12px;
    }
    .top .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .tableList{
        margin-top: 20px;
        border-top: 1px solid #ccc;
    }

    .checkbox {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        margin: 0px 0px;
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

    .checkbox input[type="radio"]:checked + i {
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
