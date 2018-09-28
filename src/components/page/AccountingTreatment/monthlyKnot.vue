<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf" v-loading="loading2"
             element-loading-text="月结中，请不要离开页面"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="top">
                <h2>月结</h2>
                <router-link to="/" class="back">返回</router-link>
                <el-button @click="model" size="small" type="primary" class="sub" >月结</el-button>
                <h3 class="currentYM">当前账期：{{currentYM}}</h3>
            </div>
            <div class="w">
                <div class="content cf">
                    <ul class="list">
                        <li>
                            <span class="name">{{month}}月固定资产折旧</span>
                            <span v-if='process_1_1 == 0' class="result">未处理</span>
                            <transition name="text-fade1">
                                <span v-if='process_1_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月无形资产折旧</span>
                            <span v-if='process_1_2 == 0' class="result">未处理</span>
                            <transition name="text-fade2">
                                <span v-if='process_1_2 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_2 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月工资计提</span>
                            <span v-if='process_1_3 == 0' class="result">未处理</span>
                            <transition name="text-fade3">
                                <span v-if='process_1_3 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_3 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月附加税计提</span>
                            <span v-if='process_1_4_0 == 0' class="result">未处理</span>
                            <transition name="text-fade4">
                                <span v-if='process_1_4_0 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_4_0 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月企业所得税计提</span>
                            <span v-if='process_1_4_1 == 0' class="result">未处理</span>
                            <transition name="text-fade5">
                                <span v-if='process_1_4_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_4_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月税结转</span>
                            <span v-if='process_1_5 == 0' class="result">未处理</span>
                            <transition name="text-fade6">
                                <span v-if='process_1_5 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_5 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month - 1}}月工资发放</span>
                            <span v-if='process_1_6 == 0' class="result">未处理</span>
                            <transition name="text-fade7">
                                <span v-if='process_1_6 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_6 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月税费缴纳</span>
                            <span v-if='process_1_7 == 0' class="result">未处理</span>
                            <transition name="text-fade8">
                                <span v-if='process_1_7 == 1' class="result2">成功</span>
                                <span v-else-if='process_1_7 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month}}月期末结转</span>
                            <span v-if='process_2_1 == 0' class="result">未处理</span>
                            <transition name="text-fade9">
                                <span v-if='process_2_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_2_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">账期变更（{{month}}月-->{{month + 1}}月）</span>
                            <span v-if='process_2_2 == 0' class="result">未处理</span>
                            <transition name="text-fade10">
                                <span v-if='process_2_2 == 1' class="result2">成功</span>
                                <span v-else-if='process_2_2 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month + 1}}月固定资产折旧</span>
                            <span v-if='process_3_1 == 0' class="result">未处理</span>
                            <transition name="text-fade11">
                                <span v-if='process_3_1 == 1' class="result2">成功</span>
                                <span v-else-if='process_3_1 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month + 1}}月无形资产折旧</span>
                            <span v-if='process_3_2 == 0' class="result">未处理</span>
                            <transition name="text-fade12">
                                <span v-if='process_3_2 == 1' class="result2">成功</span>
                                <span v-else-if='process_3_2 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                        <li>
                            <span class="name">{{month + 1}}月工资单生成</span>
                            <span v-if='process_3_3 == 0' class="result">未处理</span>
                            <transition name="text-fade13">
                                <span v-if='process_3_3 == 1' class="result2">成功</span>
                                <span v-else-if='process_3_3 == 2' class="result3">失败</span>
                            </transition>
                        </li>
                    </ul>
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
    import { mapState } from 'vuex'

    export default{
        data(){
            return {
                currentYM:0,//当前账期
                month:0,//当前月份
                process_1_1:0,//固定资产折旧
                process_1_2:0,//无形资产折旧
                process_1_3:0,//工资计提
                process_1_4_0:0,//附加税计提
                process_1_4_1:0,//企业所得税计提
                process_1_5:0,//税结转
                process_1_6:0,//工资发放
                process_1_7:0,//税费缴纳
                process_2_1:0,//期末结转
                process_2_2:0,//账期变更
                process_3_1:0,//固定资产折旧
                process_3_2:0,//无形资产折旧
                process_3_3:0,//工资单生成
                loading:false,
                loading2:false
            }
        },
        methods: {
            model(){
                this.$confirm('您确定要对当前账期进行结转？', '提示', {
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
                   this.axios()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            axios(){
                this.loading = true
                let url = addUrl.addUrl('monthlyKnot');
                axios.post(url)
                    .then(response=> {
                    console.log(response);
                        let data = response.data
                        let status = data.status
                        let msg = data.msg
                        let obj = {};
                        let _this = this;
                        this.loading2 = true;
                        if(status == 200){
                            let nextYearMonth = String(data.value.nextYearMonth)
                            this.loading = false
                            this.process_1_1 = data.value.process_1_1
                            this.process_1_2 = data.value.process_1_2
                            this.process_1_3 = data.value.process_1_3
                            this.process_1_4_0 = data.value.process_1_4_0
                            this.process_1_4_1 = data.value.process_1_4_1
                            this.process_1_5 = data.value.process_1_5
                            this.process_1_6 = data.value.process_1_6
                            this.process_1_7 = data.value.process_1_7
                            this.process_2_1 = data.value.process_2_1
                            this.process_2_2 = data.value.process_2_2
                            this.process_3_1 = data.value.process_3_1
                            this.process_3_2 = data.value.process_3_2
                            this.process_3_3 = data.value.process_3_3
                            setTimeout(function(){
                                if(data.value.process_2_2 == 1){
                                    _this.$message.success('月结成功，当前账期已转入下月')
                                    _this.currentYM = nextYearMonth.substring(0,4) + '年' + nextYearMonth.substring(4,6) + '月'
                                    if(nextYearMonth.substring(4,5) == 0){
                                        _this.month = Number(nextYearMonth.substring(5,6))
                                    }else{
                                        _this.month = Number(nextYearMonth.substring(4,6))
                                    }
                                    _this.process_1_1 = 0
                                    _this.process_1_2 = 0
                                    _this.process_1_3 = 0
                                    _this.process_1_4_0 = 0
                                    _this.process_1_4_1 = 0
                                    _this.process_1_5 = 0
                                    _this.process_1_6 = 0
                                    _this.process_1_7 = 0
                                    _this.process_2_1 = 0
                                    _this.process_2_2 = 0
                                    _this.process_3_1 = 0
                                    _this.process_3_2 = 0
                                    _this.process_3_3 = 0
                                    obj.current_book_ym = nextYearMonth
                                    _this.$store.commit('add',obj)
                                    _this.loading2 = false;
                                }else{
                                    _this.$message.error('月结失败，请重试')
                                }
                            },5000)
                        }else if(status == 400){
                            this.loading = false;
                            this.$message.error(msg)
                        }

                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        computed:mapState(['current_book_ym']),
        created(){
            this.currentYM = this.current_book_ym.substring(0,4) + '年' + this.current_book_ym.substring(4,6) + '月'
            if(this.current_book_ym.substring(4,5) == 0){
                this.month = Number(this.current_book_ym.substring(5,6))
            }else{
                this.month = Number(this.current_book_ym.substring(4,6))
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
        right: 20px;
    }
    .sub{
        position: absolute;
        right: 100px;
    }
    .currentYM{
        position: absolute;
        top:10px;
        left: 50px;
        font-size:16px;
    }

    .list{
        width:80%;
        margin: 20px auto;
    }
    .list li{
        border: 1px solid #333;
        border-bottom: none;
        padding: 5px 100px;
        font-size:14px;
        color: #333;
        height:30px;
        overflow: hidden;
    }
    .list li:last-child{
        border: 1px solid #333;
    }
    .list li .name{
        display: inline-block;
        width:80%;
    }
    .list li .result{
        display: inline-block;
        width:18%;
        text-align: right;
        color: #666;
    }
    .list li .result2{
        display: inline-block;
        width:18%;
        text-align: right;
        color: #67c23a;
    }
    .list li .result3{
        display: inline-block;
        width:18%;
        text-align: right;
        color: #f56c6c;
    }
    .text-fade1-enter-active{
        transition:all .5s ease;
    }
    .text-fade1-leave-active{
        opacity: 0;
    }
    .text-fade1-enter,.text-fade1-leave-to{
        opacity: 0;
    }

    .text-fade2-enter-active{
        transition:all 1s ease;
    }
    .text-fade2-leave-active{
        opacity: 0;
    }
    .text-fade2-enter,.text-fade2-leave-to{
        opacity: 0;
    }

    .text-fade3-enter-active{
        transition:all 1.5s ease;
    }
    .text-fade3-leave-active{
        opacity: 0;
    }
    .text-fade3-enter,.text-fade3-leave-to{
        opacity: 0;
    }

    .text-fade4-enter-active{
        transition:all 2s ease;
    }
    .text-fade4-leave-active{
        opacity: 0;
    }
    .text-fade4-enter,.text-fade4-leave-to{
        opacity: 0;
    }
    .text-fade5-enter-active{
        transition:all 2.5s ease;
    }
    .text-fade5-leave-active{
        opacity: 0;
    }
    .text-fade5-enter,.text-fade5-leave-to{
        opacity: 0;
    }
    .text-fade6-enter-active{
        transition:all 3s ease;
    }
    .text-fade6-leave-active{
        opacity: 0;
    }
    .text-fade6-enter,.text-fade6-leave-to{
        opacity: 0;
    }
    .text-fade7-enter-active{
        transition:all 3.5s ease;
    }
    .text-fade7-leave-active{
        opacity: 0;
    }
    .text-fade7-enter,.text-fade7-leave-to{
        opacity: 0;
    }
    .text-fade8-enter-active{
        transition:all 4s ease;
    }
    .text-fade8-leave-active{
        opacity: 0;
    }
    .text-fade8-enter,.text-fade8-leave-to{
        opacity: 0;
    }
    .text-fade9-enter-active{
        transition:all 4.5s ease;
    }
    .text-fade9-leave-active{
        opacity: 0;
    }
    .text-fade9-enter,.text-fade9-leave-to{
        opacity: 0;
    }
    .text-fade10-enter-active{
        transition:all 5s ease;
    }
    .text-fade10-leave-active{
        opacity: 0;
    }
    .text-fade10-enter,.text-fade10-leave-to{
        opacity: 0;
    }
    .text-fade11-enter-active{
        transition:all 5.5s ease;
    }
    .text-fade11-leave-active{
        opacity: 0;
    }
    .text-fade11-enter,.text-fade11-leave-to{
        opacity: 0;
    }
    .text-fade12-enter-active{
        transition:all 6s ease;
    }
    .text-fade12-leave-active{
        opacity: 0;
    }
    .text-fade12-enter,.text-fade12-leave-to{
        opacity: 0;
    }
    .text-fade13-enter-active{
        transition:all 6.5s ease;
    }
    .text-fade13-leave-active{
        opacity: 0;
    }
    .text-fade13-enter,.text-fade13-leave-to{
        opacity: 0;
    }


</style>
