<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>计提企业所得税</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub" :loading="isLoading">计提</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>计提企业所得税</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">利润总额</span>
                        <input class="ipt" type="text" v-model="B1" @change="changeInput(B1,'B1')">
                    </li>
                    <li class="sm">
                        <span class="tit">实际利润额</span>
                        <input class="ipt" type="text" v-model="B7" maxlength="18" disabled>
                    </li>

                    <li class="sm">
                        <span class="tit">加：特定业务计算的应纳所得税额</span>
                        <input class="ipt" type="text" v-model="B2" @change="changeInput(B2,'B2')">
                    </li>
                    <li class="sm">
                        <span class="tit">应纳所得税额</span>
                        <input class="ipt" type="text" v-model="B8" maxlength="18" disabled>
                    </li>

                    <li class="sm">
                        <span class="tit">减：不征税收入</span>
                        <input class="ipt" type="text" v-model="B3" @change="changeInput(B3,'B3')">
                    </li>
                    <li class="sm">
                        <span class="tit">减：减免所得税额</span>
                        <input class="ipt" type="text" v-model="B9"  maxlength="15" @change="changeInput(B9,'B9')">
                    </li>
                    <li class="sm">
                        <span class="tit">减：免税收入、减计收入、所得减免等优惠金额</span>
                        <input class="ipt" type="text" v-model="B4" @change="changeInput(B4,'B4')">
                    </li>
                    <li class="sm">
                        <span class="tit">减：实际已缴纳的所得税额</span>
                        <input class="ipt" type="text" v-model="B10" maxlength="15" @change="changeInput(B10,'B10')">
                    </li>
                    <li class="sm">
                        <span class="tit">减：固定资产加速折旧调减额</span>
                        <input class="ipt" type="text" v-model="B5" @change="changeInput(B5,'B5')">
                    </li>
                    <li class="sm">
                        <span class="tit">减：特定业务预缴（征）所得税额</span>
                        <input class="ipt" type="text" v-model="B11" maxlength="15" @change="changeInput(B11,'B11')">
                    </li>
                    <li class="sm">
                        <span class="tit">减：弥补以前年度亏损</span>
                        <input class="ipt" type="text" v-model="B6" maxlength="18" @change="changeInput(B6,'B6')">
                    </li>
                    <li class="sm">
                        <span class="tit">本期应补（退）所得税额</span>
                        <input class="ipt" type="text" v-model="B12" maxlength="18" disabled>
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
                aa:0,
                B1:0,//
                B2:0,//
                B3:0,//
                B4:0,//
                B5:0,//
                B6:0,//
                B9:0,//
                B10:0,//
                B11:0,//
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                lirunzonge:this.$route.params.lirunzonge,
                jianmiansuodeshuie:this.$route.params.jianmiansuodeshuie,
                shijiyijiaonasuodeshuie:this.$route.params.shijiyijiaonasuodeshuie,
                loading:false,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },

        computed:{
            B7:function(){
                let b1 = unNumber.unNumber(this.B1)
                let b2 = unNumber.unNumber(this.B2)
                let b3 = unNumber.unNumber(this.B3)
                let b4 = unNumber.unNumber(this.B4)
                let b5 = unNumber.unNumber(this.B5)
                let b6 = unNumber.unNumber(this.B6)
                return number.number( parseFloat((b1 + b2 - b3 - b4 - b5 - b6).toFixed(2)) )
            },
            B8:function(){
                if(unNumber.unNumber(this.B7) > 0){
                    let b7 = unNumber.unNumber(this.B7);
//                console.log(Math.round((b7 * 0.25)));
                    return number.number( parseFloat((b7 * 0.25).toFixed(2)))
                }else{
                    return '0.00'
                }

            },
            B12:function(){
                let b8 = unNumber.unNumber(this.B8)
                let b9 = unNumber.unNumber(this.B9)
                let b10 = unNumber.unNumber(this.B10)
                let b11 = unNumber.unNumber(this.B11)
                return number.number( parseFloat((b8 - b9 - b10 - b11).toFixed(2)) )
            }
        },
        methods: {
            changeNum(){
                let aa = number.number(this.aa)
            },
            changeInput(val,id){
                let value = unNumber.unNumber(val)
//                console.log(value);
                if(value == 0){
                    this.$message.error('请正确输入金额');
                }
                if(id == 'B1'){
                    this.B1 = number.number(value)
                }
                if(id == 'B2'){
                    this.B2 = number.number(value)
                }
                if(id == 'B3'){
                    this.B3 = number.number(value)
                }
                if(id == 'B4'){
                    this.B4 = number.number(value)
                }
                if(id == 'B5'){
                    this.B5 = number.number(value)
                }
                if(id == 'B6'){
                    this.B6 = number.number(value)
                }
                if(id == 'B9'){
                    this.B9 = number.number(value)
                }
                if(id == 'B10'){
                    this.B10 = number.number(value)
                }
                if(id == 'B11'){
                    this.B11 = number.number(value)
                }
            },
            model(n){
                this.loading = true

                if(n == 0){
                    this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    if(this.B12 == '0.00') {
                        this.$message.error('请正确输入金额');
                        this.loading = false
                        return
                    }
                    this.isLoading = true;
                    this.$confirm('确定是否计提？', '提示', {
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
                let amount = unNumber.unNumber(this.B12)
                let params = new URLSearchParams();
                let url = addUrl.addUrl('operation')
                params.append('taxTypeDes','t11DJT');
                params.append('handleType','1');
                params.append('amount',amount);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.value.result == '1'){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '计提成功'
                            });
                        }else if(response.data.value.result == '0'){
                            var msg = response.data.value.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
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
            this.B1 = number.number(this.lirunzonge)
            this.B9 = number.number(this.jianmiansuodeshuie)
            this.B10 = number.number(this.shijiyijiaonasuodeshuie)
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
        width:100%;
    }
    .list li{
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .sm{
        width:50%;
    }
    .list .pt{
        width:100%;
        text-align: left;
    }

    .list li .ipt{
        display: inline-block;
        width:260px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
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
    .top .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }

</style>
