<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>缴纳</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub" :loading="isLoading">缴纳</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">税种</span>
                        <input class="ipt" type="text" v-model="taxType" disabled>
                    </li>
                    <li class="pt">
                        <span class="tit">缴纳金额</span>
                        <input class="ipt" type="text" v-model="amount" maxlength="18" disabled>
                    </li>
                    <li class="pt">
                        <span class="tit">付款方式</span>
                        <el-select class="sel" v-model="fkType" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    export default{
        data(){
            return{
                taxTypeDes:this.$route.params.taxTypeDes,//税种
                taxType:'',//税种
                amount:this.$route.params.amount,//金额
                fkType:'2',//付款方式
                options:[
                    {value:'1',label:'现金'},
                    {value:'2',label:'银行'},
                    {value:'5',label:'企业微信'},
                    {value:'6',label:'企业支付宝'},
                    {value:'7',label:'企业借贷宝'},
                ],
                loading:false,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },

        methods: {
            model(n){
                this.loading = true
                if(n == 0){
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    this.isLoading = true;
                    this.$confirm('确定是否缴纳？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.confirmButtonText = '执行中...';
                                setTimeout(() => {
                                    done();
                                    setTimeout(() => {
                                        instance.confirmButtonLoading = false;
                                    }, 300);
                                }, 300);
                            } else {
                                done();
                            }
                        }
                    }).then(() => {
                        this.axios();
                    }).catch(() => {
                        this.$message({
                            type:'info',
                            message:'已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },
            axios(){
                let amount = unNumber.unNumber(this.amount)
                let params = new URLSearchParams();
                let url = addUrl.addUrl('operation')
                params.append('taxTypeDes',this.taxTypeDes);
                params.append('handleType','2');
                params.append('amount',amount);
                params.append('fkType',this.fkType);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.value.result == '1'){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '缴纳成功'
                            });
                        }else if(response.data.value.result == '0'){
                            var msg = response.data.value.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
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
            if(this.taxTypeDes =='t1JN'){
                this.taxType = '印花税'
            }
            if(this.taxTypeDes =='t2JN'){
                this.taxType = '土地使用税'
            }
            if(this.taxTypeDes =='t3JN'){
                this.taxType = '车船使用税'
            }
            if(this.taxTypeDes =='t4JN'){
                this.taxType = '房产税'
            }
            if(this.taxTypeDes =='t5JN'){
                this.taxType = '消费税'
            }
            if(this.taxTypeDes =='t6JN'){
                this.taxType = '残疾人就业保障金'
            }
            if(this.taxTypeDes =='t7JN'){
                this.taxType = '增值税'
            }
            if(this.taxTypeDes =='t8JN'){
                this.taxType = '城市维护建设税'
            }
            if(this.taxTypeDes =='t9JN'){
                this.taxType = '教育费附加'
            }
            if(this.taxTypeDes =='t10JN'){
                this.taxType = '地方教育费附加'
            }
            if(this.taxTypeDes =='t11JN'){
                this.taxType = '企业所得税'
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
    .back{
        position: absolute;
        right:20px;
        font-size:12px;
    }
    .content{
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .list{
        width:70%;
        margin: 0 auto;
    }
    .list li{
        display: inline-block;
        height:36px;
        text-align: center;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .pt{
        width:100%;
        text-align: left;
    }
    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:180px;
        text-align: left;
        margin-right: 20px;
        line-height: 16px;
        vertical-align: middle;
    }
    .list li .ipt{
        display: inline-block;
        width:460px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .sel{
        display: inline-block;
        width: 480px;
        height: 28px;
    }
    .top .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }

</style>
