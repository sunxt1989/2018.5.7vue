<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="topHeader">
                <h2>杜邦分析</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="box jzcsyl">
                    <div class="top">
                        <span>净资产收益率</span>
                    </div>
                    <div class="bottom">
                        <span class="jzcsylVal">20%</span>
                    </div>
                </div>
                <div class="box zcfzl">
                    <div class="top">
                        <span>资产负债率</span>
                    </div>
                    <div class="bottom">
                        <span class="zcfzlVal">20%</span>
                    </div>
                </div>
                <div class="box qycs">
                    <div class="top">
                        <span>权益乘数</span>
                    </div>
                    <div class="bottom">
                        <span class="qycsVal">20%</span>
                    </div>
                </div>
                <div class="box zzcsyl">
                    <div class="top">
                        <span>总资产收益率</span>
                    </div>
                    <div class="bottom">
                        <span class="zzcsylVal">20%</span>
                    </div>
                </div>
                <div class="box ffze">
                    <div class="top">
                        <span>负债总额</span>
                    </div>
                    <div class="bottom">
                        <span class="ffzeVal">20%</span>
                    </div>
                </div>
                <div class="box zcze">
                    <div class="top">
                        <span>资产总额</span>
                    </div>
                    <div class="bottom">
                        <span class="zczeVal">20%</span>
                    </div>
                </div>
                <div class="box syzqyze">
                    <div class="top">
                        <span>所有者权益总额</span>
                    </div>
                    <div class="bottom">
                        <span class="syzqyzeVal">20%</span>
                    </div>
                </div>
                <div class="box xsjlr">
                    <div class="top">
                        <span>销售净利润</span>
                    </div>
                    <div class="bottom">
                        <span class="xsjlrVal">20%</span>
                    </div>
                </div>
                <div class="box zzczzl">
                    <div class="top">
                        <span>总资产周转率</span>
                    </div>
                    <div class="bottom">
                        <span class="zzczzlVal">20%</span>
                    </div>
                </div>
                <div class="box ldfz">
                    <div class="top">
                        <span>流动负债</span>
                    </div>
                    <div class="bottom">
                        <span class="ldfzVal">20%</span>
                    </div>
                </div>
                <div class="box fldfz">
                    <div class="top">
                        <span>非流动负债</span>
                    </div>
                    <div class="bottom">
                        <span class="fldfzVal">20%</span>
                    </div>
                </div>
                <div class="box ldzc">
                    <div class="top">
                        <span>流动资产</span>
                    </div>
                    <div class="bottom">
                        <span class="ldzcVal">20%</span>
                    </div>
                </div>
                <div class="box fldzc">
                    <div class="top">
                        <span>非流动资产</span>
                    </div>
                    <div class="bottom">
                        <span class="fldzcVal">20%</span>
                    </div>
                </div>
                <div class="box jlr">
                    <div class="top">
                        <span>净利润</span>
                    </div>
                    <div class="bottom">
                        <span class="jlrVal">20%</span>
                    </div>
                </div>
                <div class="box yyzsr">
                    <div class="top">
                        <span>营业总收入</span>
                    </div>
                    <div class="bottom">
                        <span class="yyzsrVal">20%</span>
                    </div>
                </div>
                <div class="box hbzj">
                    <div class="top">
                        <span>货币资金</span>
                    </div>
                    <div class="bottom">
                        <span class="hbzjVal">20%</span>
                    </div>
                </div>
                <div class="box yyzsr2">
                    <div class="top">
                        <span>营业总收入</span>
                    </div>
                    <div class="bottom">
                        <span class="jzcsylValVal">20%</span>
                    </div>
                </div>
                <div class="box yszk">
                    <div class="top">
                        <span>应收账款</span>
                    </div>
                    <div class="bottom">
                        <span class="yszkVal">20%</span>
                    </div>
                </div>
                <div class="box zcb">
                    <div class="top">
                        <span>总成本</span>
                    </div>
                    <div class="bottom">
                        <span class="zcbVal">20%</span>
                    </div>
                </div>
                <div class="box yycb">
                    <div class="top">
                        <span>营业成本</span>
                    </div>
                    <div class="bottom">
                        <span class="yycbVal">20%</span>
                    </div>
                </div>
                <div class="box ch">
                    <div class="top">
                        <span>存货</span>
                    </div>
                    <div class="bottom">
                        <span class="chVal">20%</span>
                    </div>
                </div>
                <div class="box sds">
                    <div class="top">
                        <span>所得税</span>
                    </div>
                    <div class="bottom">
                        <span class="sdsVal">20%</span>
                    </div>
                </div>
                <div class="box xsfy">
                    <div class="top">
                        <span>销售费用</span>
                    </div>
                    <div class="bottom">
                        <span class="xsfyVal">20%</span>
                    </div>
                </div>
                <div class="box glfy">
                    <div class="top">
                        <span>管理费用</span>
                    </div>
                    <div class="bottom">
                        <span class="glfyVal">20%</span>
                    </div>
                </div>
                <div class="box cwfy">
                    <div class="top">
                        <span>财务费用</span>
                    </div>
                    <div class="bottom">
                        <span class="cwfyVal">20%</span>
                    </div>
                </div>

                <div class="line"></div>
                <div class="line2"></div>
                <div class="line3"></div>
                <div class="line4"></div>
                <div class="line5"></div>
                <div class="line6"></div>
                <div class="line7"></div>
                <div class="line8"></div>
                <div class="line9"></div>
                <div class="line10"></div>
                <div class="line11"></div>
                <div class="line12"></div>
                <div class="line13"></div>
                <div class="line14"></div>
                <div class="line15"></div>
                <div class="line16"></div>
                <div class="line17"></div>
                <div class="line18"></div>
                <div class="line19"></div>
                <div class="line20"></div>
                <div class="line21"></div>
                <div class="line22"></div>


                <span class="num">1 /（ 1-</span>
                <span class="num2">) = </span>
                <span class="num3"> * </span>
                <span class="num4"> / </span>
                <span class="num5"> / </span>
                <span class="num6"> * </span>
                <span class="num7"> + </span>
                <span class="num8"> + </span>
                <span class="num9"> / </span>
                <span class="num10"> + </span>
                <span class="num11"> + </span>
                <span class="num12"> - </span>
                <span class="num13"> - </span>
                <span class="num14"> + </span>
                <span class="num15"> + </span>
                <span class="num16"> + </span>
                <div class="right">
                    <ul>
                        <li class="first">
                            本征期
                        </li>
                        <li>
                            <span>实际利润:</span>
                            <span>{{ sjlre }}</span>
                        </li>
                        <li>
                            <span>应纳所得税:</span>
                            <span>{{ yjsds }}</span>
                        </li>
                        <li>
                            <span>应纳增值税:</span>
                            <span>{{ yjzzs }}</span>
                        </li>
                        <li>
                            <span>应纳城建税:</span>
                            <span>{{ yjcjs }}</span>
                        </li>
                        <li>
                            <span>应纳教育税:</span>
                            <span>{{ yjjys }}</span>
                        </li>
                        <li>
                            <span>教育及附加税:</span>
                            <span>{{ jyjfjs }}</span>
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
                jyjfjs:'',//教育及附加税
                sjlre:'',//实际利润
                yjcjs:'',//应纳城建税
                yjjys:'',//应纳教育税
                yjsds:'',//应纳所得税
                yjzzs:'',//应纳增值税
                loading:false
            }
        },
        methods: {

        },
        created(){
            let url = addUrl.addUrl('DuPont')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data
                    let dataMap = data.dataMap
                    let dbMap = data.dataMap

                    this.jyjfjs = dataMap.jyjfjs
                    this.sjlre = dataMap.sjlre
                    this.yjcjs = dataMap.yjcjs
                    this.yjjys = dataMap.yjjys
                    this.yjsds = dataMap.yjsds
                    this.yjzzs = dataMap.yjzzs

                    this.ch = dbMap.ch
                    this.cwfy = dbMap.cwfy
                    this.fldfz = dbMap.fldfz
                    this.fldzc = dbMap.fldzc
                    this.fzze = dbMap.fzze
                    this.glfy = dbMap.glfy
                    this.hbzj = dbMap.hbzj
                    this.jlr = dbMap.jlr
                    this.jzcsyl = dbMap.jzcsyl
                    this.ldfz = dbMap.ldfz
                    this.ldzc = dbMap.ldzc
                    this.qczcze = dbMap.qczcze
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch
                    this.ch = dbMap.ch


                })
                .catch(error=> {
                    this.loading = false
//                    console.log(error);
                    alert('网络错误，不能访问');
                });
        }
    }
</script>
<style scoped>
    .w{
        height:100%;
        position: relative;
    }
    .topHeader {
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
        right: 20px;
    }
    .sub1{
        display: inline-block;
        width: 80px;
        height:30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right:100px;
        font-size:12px;
    }
    .sub2{
        display: inline-block;
        width: 80px;
        height:30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right:200px;
        font-size:12px;
    }
    .right{
        width:240px;
        background-color: #fff;
        border:2px solid #ccc;
        border-bottom: none;
        border-radius: 5px;
        position: absolute;
        right: 0;
        overflow: hidden;
    }
    .right ul li{
        width:230px;
        height:30px;
        font-size:16px;
        line-height: 30px;
        border-bottom: 2px solid #ccc;
        padding: 5px;
        overflow: hidden;
    }
    .right ul .first{
        background-color: #409EFF;
        color: #fff;
        text-align: center;
        border: none;
    }
     .box{
        width:134px;
        height:60px;
        border: 2px solid #ccc;
        font-size:16px;
        text-align: center;
        line-height: 35px;
        transition-property:transform;
        transition-duration:500ms;
    }
     .box .top{
        width:100%;
        height:31px;
        border-bottom: 2px solid #ccc;
        background-color: #409EFF;
        color: #fff;
    }
     .box .bottom{
        width:100%;
        height:27px;
        border-bottom: 2px solid #ccc;
        background-color: #fff;
        color: #333;
         overflow: hidden;
    }
     .box:hover{
        transform:scale(1.5);
        z-index:100;
    }

    .jzcsyl{
        z-index:10;
        position: absolute;
        top:0px;
        left:580px;
    }
    .zcfzl{
        z-index:10;
        position: absolute;
        top:94px;
        left:220px;
    }
    .qycs{
        z-index:10;
        position: absolute;
        top:94px;
        left:444px;
    }
    .zzcsyl{
        z-index:10;
        position: absolute;
        top:94px;
        left:715px;
    }
    .ffze{
        z-index:10;
        position: absolute;
        top:188px;
        left:92px;
    }
    .zcze{
        z-index:10;
        position: absolute;
        top:188px;
        left:286px;
    }
    .syzqyze{
        z-index:10;
        position: absolute;
        top:188px;
        left:463px;
    }
    .xsjlr{
        z-index:10;
        position: absolute;
        top:188px;
        left:627px;
    }
    .zzczzl{
        z-index:10;
        position: absolute;
        top:188px;
        left:800px;
    }
    .ldfz{
        z-index:10;
        position: absolute;
        top:282px;
        left:-43px;
    }
    .fldfz{
        z-index:10;
        position: absolute;
        top:282px;
        left:130px;
    }
    .ldzc{
        z-index:10;
        position: absolute;
        top:282px;
        left:290px;
    }
    .fldzc{
        z-index:10;
        position: absolute;
        top:282px;
        left:466px;
    }
    .jlr{
        z-index:10;
        position: absolute;
        top:282px;
        left:628px;
    }
    .yyzsr{
        z-index:10;
        position: absolute;
        top:282px;
        left:800px;
    }
    .hbzj{
        z-index:10;
        position: absolute;
        top:376px;
        left:300px;
    }
    .yyzsr2{
        z-index:10;
        position: absolute;
        top:376px;
        left:800px;
    }
    .yszk{
        z-index:10;
        position: absolute;
        top:376px;
        left:130px;
    }
    .zcb{
        z-index:10;
        position: absolute;
        top:376px;
        left:628px;
    }
    .yycb{
        z-index:10;
        position: absolute;
        top:470px;
        left:800px;
    }
    .ch{
        z-index:10;
        position: absolute;
        top:376px;
        left:-43px;
    }
    .sds{
        z-index:10;
        position: absolute;
        top:376px;
        left:466px;
    }
    .xsfy{
        z-index:10;
        position: absolute;
        top:470px;
        left:628px;
    }
    .glfy{
        z-index:10;
        position: absolute;
        top:470px;
        left:466px;
    }
    .cwfy{
        z-index:10;
        position: absolute;
        top:470px;
        left:300px
    }

    .line{
        width:0;
        height:16px;
        border-left: 2px solid #ccc;
        position: absolute;
        top:60px;
        left:649px;
    }
    .line2{
        width:270px;
        height:33px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top:76px;
        left:510px;
    }
    .line3{
        width:0;
        height:16px;
        border-left: 2px solid #ccc;
        position: absolute;
        top:158px;
        left:285px;
    }
    .line4{
        width:0;
        height: 16px;
        border-left: 2px solid #ccc;
        position: absolute;
        top: 158px;
        left: 510px;
    }
    .line5{
        width:0;
        height:16px;
        border-left: 2px solid #ccc;
        position: absolute;
        top:158px;
        left:785px;
    }
    .line6{
        width: 185px;
        height: 18px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 173px;
        left: 159px;
    }
    .line7{
        width: 184px;
        height: 18px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 173px;
        left: 360px;
    }
    .line8{
        width:161px;
        height: 18px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 173px;
        left:693px;
    }
    .line9{
        width:0;
        height:16px;
        border-left: 2px solid #ccc;
        position: absolute;
        top:251px;
        left:158px;
    }
    .line10{
        width:0;
        height:34px;
        border-left: 2px solid #ccc;
        position: absolute;
        top:250px;
        left:352px;
    }
    .line11{
        width:0;
        height:34px;
        border-left: 2px solid #ccc;
        position: absolute;
        top:250px;
        left:694px;
    }
    .line12{
        width:183px;
        height:16px;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top:267px;
        left:352px;
    }
    .line13{
        width:171px;
        height:30px;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top:267px;
        left:695px;
    }
    .line14{
        width: 162px;
        height: 18px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 267px;
        left: 31px;
    }
    .line15{
        width: 0px;
        height: 37px;
        border-left: 2px solid #ccc;
        position: absolute;
        top: 343px;
        left: 354px;
    }
    .line16{
        width: 328px;
        height: 17px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        position: absolute;
        top: 362px;
        left: 26px;
    }
    .line17{
        width: 50px;
        height: 16px;
        border-left: 2px solid #ccc;
        position: absolute;
        top: 364px;
        left: 196px;
    }
    .line18{
        width: 50px;
        height: 37px;
        border-left: 2px solid #ccc;
        position: absolute;
        top: 343px;
        left: 696px;
    }
    .line19{
        width: 342px;
        height: 18px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 362px;
        left: 527px;
    }
    .line20{
        width: 0px;
        height: 19px;
        border-left: 2px solid #ccc;
        position: absolute;
        top: 438px;
        left: 697px;
    }
    .line21{
        width: 512px;
        height: 16px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 456px;
        left: 366px;
    }
    .line22{
        width: 170px;
        height: 16px;
        border-top: 2px solid #ccc;
        border-left: 2px solid #ccc;
        border-right: 2px solid #ccc;
        position: absolute;
        top: 456px;
        left: 525px;
    }

    .num{
        position: absolute;
        top: 118px;
        left: 48px;
        font-size: 40px;
        color: #ccc;
    }
    .num2{
        position: absolute;
        top:118px;
        left:372px;
        font-size:40px;
        color: #ccc;
    }
    .num3{
        position: absolute;
        top:118px;
        left:640px;
        font-size:40px;
        color: #ccc;
    }
    .num4{
        position: absolute;
        top: 210px;
        left: 247px;
        font-size:40px;
        color: #ccc;
    }
    .num5{
        position: absolute;
        top: 210px;
        left: 435px;
        font-size:40px;
        color: #ccc;
    }
    .num6{
        position: absolute;
        top: 210px;
        left: 773px;
        font-size:40px;
        color: #ccc;
    }
    .num7{
        position: absolute;
        top: 304px;
        left: 103px;
        font-size:40px;
        color: #ccc;
    }
    .num8{
        position: absolute;
        top: 304px;
        left: 438px;
        font-size:40px;
        color: #ccc;
    }
    .num9{
        position: absolute;
        top: 304px;
        left: 773px;
        font-size:40px;
        color: #ccc;
    }
    .num10{
        position: absolute;
        top: 398px;
        left: 102px;
        font-size:40px;
        color: #ccc;
    }
    .num11{
        position: absolute;
        top: 398px;
        left: 273px;
        font-size:40px;
        color: #ccc;
    }
    .num12{
        position: absolute;
        top: 398px;
        left: 607px;
        font-size:40px;
        color: #ccc;
    }
    .num13{
        position: absolute;
        top: 398px;
        left: 773px;
        font-size:40px;
        color: #ccc;
    }
    .num14{
        position: absolute;
        top: 491px;
        left: 442px;
        font-size:40px;
        color: #ccc;
    }
    .num15{
        position: absolute;
        top: 491px;
        left: 607px;
        font-size:40px;
        color: #ccc;
    }
    .num16{
        position: absolute;
        top: 491px;
        left: 773px;
        font-size:40px;
        color: #ccc;
    }
</style>
