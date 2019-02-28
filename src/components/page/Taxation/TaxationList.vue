<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>税费缴纳</h2>
                <router-link to="/Taxation/taxationHistory" class="addLink">历史记录</router-link>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="content cf">
                    <table class="table-top">
                        <col width="20%">
                        <col width="25%">
                        <col width="15%">
                        <col width="25%">
                        <col width="15%">
                        <thead>
                            <tr>
                            <th>科目名称</th>
                            <th>计提-结转（免征）</th>
                            <th>已计提-结转（免征）</th>
                            <th>缴纳</th>
                            <th>已缴纳</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>增值税（{{addedTaxPeroidType}}）</td>
                            <td>
                                <input v-model="t7DJZ" type="text" class="table-top-input" @change="changeInput(t7DJZ,'t7DJZ')">
                                <div class="btn1" @click="clickKnots">
                                    <span v-if="companyScaless == 1">免征</span>
                                    <span v-else>结转</span>
                                </div>
                            </td>
                            <td>{{t7YJZ}}</td>
                            <td>
                                <input v-model="t7DJN" type="text" class="table-top-input" @change="changeInput(t7DJN,'t7DJN')">
                                <div class="btn2" @click="clickPay(t7DJN,'t7JN')">缴纳</div>
                            </td>
                            <td>{{t7YJN}}</td>
                        </tr>
                            <tr>
                            <td>附加税-城市维护建设税（{{addedTaxPeroidType}}）</td>
                            <td>
                                <input v-model="t8DJT" type="text" class="table-top-input" @change="changeInput(t8DJT,'t8DJT')">
                                <div class="btn3" @click="clickCalculation(t8DJT,'t8DJT')"> 计提</div>
                            </td>
                            <td>{{t8YJT}}</td>
                            <td>
                                <input v-model="t8DJN" type="text" class="table-top-input" @change="changeInput(t8DJN,'t8DJN')">
                                <div class="btn2" @click="clickPay(t8DJN,'t8JN')">缴纳</div>
                            </td>
                            <td>{{t8YJN}}</td>
                        </tr>
                            <tr>
                                <td>附加税-教育费附加税（{{addedTaxPeroidType}}）</td>
                                <td>
                                    <input v-model="t9DJT" type="text" class="table-top-input" @change="changeInput(t9DJT,'t9DJT')">
                                    <div class="btn3" @click="clickCalculation(t9DJT,'t9DJT')"> 计提</div>
                                </td>
                                <td>{{t9YJT}}</td>
                                <td>
                                    <input v-model="t9DJN" type="text" class="table-top-input" @change="changeInput(t9DJN,'t9DJN')">
                                    <div class="btn2" @click="clickPay(t9DJN,'t9JN')">缴纳</div>
                                </td>
                                <td>{{t9YJN}}</td>
                            </tr>
                            <tr>
                                <td>附加税-地方教育费附加税（{{addedTaxPeroidType}}）</td>
                                <td>
                                    <input v-model="t10DJT" type="text" class="table-top-input" @change="changeInput(t10DJT,'t10DJT')">
                                    <div class="btn3" @click="clickCalculation(t10DJT,'t10DJT')"> 计提</div>
                                </td>
                                <td>{{t10YJT}}</td>
                                <td>
                                    <input v-model="t10DJN" type="text" class="table-top-input" @change="changeInput(t10DJN,'t10DJN')">
                                    <div class="btn2" @click="clickPay(t10DJN,'t10JN')">缴纳</div>
                                </td>
                                <td>{{t10YJN}}</td>
                            </tr>
                            <tr>
                                <td>企业所得税（{{incomeTaxPeroidType}}）</td>
                                <td>
                                    <input v-model="t11DJT" type="text" class="table-top-input" @change="changeInput(t11DJT,'t11DJT')">
                                    <div class="btn3" v-if="!(isMonthlyKnots && !isAnnualKnots) && !t11HandleFlag">
                                        <router-link :to="{name:'calculation',params:{lirunzonge:lirunzonge,jianmiansuodeshuie:jianmiansuodeshuie,shijiyijiaonasuodeshuie:shijiyijiaonasuodeshuie}}" class="see">
                                            计提
                                        </router-link>
                                    </div>
                                    <div class="btn3" v-else @click="clickCalculation(t11DJT,'t11DJT')">计提</div>

                                </td>
                                <td>{{t11YJT}}</td>
                                <td>
                                    <input v-model="t11DJN" type="text" class="table-top-input" @change="changeInput(t11DJN,'t11DJN')">
                                    <div class="btn2"  @click="clickPay(t11DJN,'t11JN')">缴纳</div>
                                </td>
                                <td>{{t11YJN}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table-button">
                        <col width="20%">
                        <col width="50%">
                        <col width="30%">
                        <thead>
                        <tr>
                            <th>税种</th>
                            <th>操作</th>
                            <th>已缴纳（当前月）</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>印花税</td>
                                <td>
                                    <input v-model="t1DJN" type="text" class="table-button-input" @change="changeInput(t1DJN,'t1DJN')">
                                    <div class="btn" @click="clickPay(t1DJN,'t1JN')">缴纳</div>
                                </td>
                                <td>{{t1YJN}}</td>
                            </tr>
                            <tr>
                                <td>土地使用税</td>
                                <td>
                                    <input v-model="t2DJN" type="text" class="table-button-input" @change="changeInput(t2DJN,'t2DJN')">
                                    <div class="btn" @click="clickPay(t2DJN,'t2JN')">缴纳</div>
                                </td>
                                <td>{{t2YJN}}</td>
                            </tr>
                            <tr>
                                <td>车船使用税</td>
                                <td>
                                    <input v-model="t3DJN" type="text" class="table-button-input" @change="changeInput(t3DJN,'t3DJN')">
                                    <div class="btn" @click="clickPay(t3DJN,'t3JN')">缴纳</div>
                                </td>
                                <td>{{t3YJN}}</td>
                            </tr>
                            <tr>
                                <td>房产税</td>
                                <td>
                                    <input v-model="t4DJN" type="text" class="table-button-input" @change="changeInput(t4DJN,'t4DJN')">
                                    <div class="btn" @click="clickPay(t4DJN,'t4JN')">缴纳</div>
                                </td>
                                <td>{{t4YJN}}</td>
                            </tr>
                            <tr>
                                <td>消费税</td>
                                <td>
                                    <input v-model="t5DJN" type="text" class="table-button-input" @change="changeInput(t5DJN,'t5DJN')">
                                    <div class="btn" @click="clickPay(t5DJN,'t5JN')">缴纳</div>
                                </td>
                                <td>{{t5YJN}}</td>
                            </tr>
                            <tr>
                                <td>残疾人就业保障金</td>
                                <td>
                                    <input v-model="t6DJN" type="text" class="table-button-input" @change="changeInput(t6DJN,'t6DJN')">
                                    <div class="btn" @click="clickPay(t6DJN,'t6JN')">缴纳</div>
                                </td>
                                <td>{{t6YJN}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <el-dialog title="提示" :visible.sync="dialogGrant1" :before-close="handleClose" width="500px">
                    <p class="dialog-p">税种：{{name}}</p>
                    <p class="dialog-p">结转金额：{{amount}}</p>
                    <span v-if="isMonthlyKnots && !isAnnualKnots" class="wagesName">是否补录去年业务</span>
                    <el-radio  v-if="isMonthlyKnots && !isAnnualKnots" v-model="flg" label="1">是</el-radio>
                    <el-radio  v-if="isMonthlyKnots && !isAnnualKnots" v-model="flg" label="0">否</el-radio>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogGrant1 = false" size="small">取 消</el-button>
                        <el-button @click="Calculation" size="small" type="primary" :loading="isLoading">确 定</el-button>
                    </div>
                </el-dialog>
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
                companyScaless:2,//增值税减免状态（true：免征；false:不免征）判断逻辑：true:结转按钮改为免征按钮；false:保持初始状态
                t7HandleFlag:false,//增值税操作状态（true：已操作；false：未操作）
                t8HandleFlag:false,//城市维护建设税操作状态（true：已操作；false：未操作）
                t9HandleFlag:false,//教育费附加税操作状态（true：已操作；false：未操作）
                t10HandleFlag:false,//地方教育费附加税操作状态（true：已操作；false：未操作）
                t11HandleFlag:false,//企业所得税税操作状态（true：已操作；false：未操作）
                flg:'0',//是否补录标记

                handleType:'',//
                amount:'',//
                taxTypeDes:'',//
                name:'',
                dialogGrant1:false,//结转/免征模态框；

                t7DJZ:'0.00',//待结转增值税 判断逻辑：t7HandleFlag为true:t7DJZ为0
                t7YJZ:'0.00',//已结转增值税
                t7YJN:'0.00',//已缴纳增值税
                t7DJN:'0.00',//待缴纳增值税

                t8DJT:'0.00',//待计提城市维护建设税
                t8YJT:'0.00',//已计提城市维护建设税
                t8YJN:'0.00',//已缴纳城市维护建设税
                t8DJN:'0.00',//待缴纳城市维护建设税

                t9DJT:'0.00',//待计提教育费附加
                t9YJT:'0.00',//已计提教育费附加
                t9YJN:'0.00',//已缴纳教育费附加
                t9DJN:'0.00',//待缴纳教育费附加

                t10DJT:'0.00',//待计提地方教育费附加
                t10YJT:'0.00',//已计提地方教育费附加
                t10YJN:'0.00',//已缴纳地方教育费附加
                t10DJN:'0.00',//待缴纳地方教育费附加

                t11DJT:'0.00',//待计提企业所得税
                t11YJT:'0.00',//已计提企业所得税
                t11YJN:'0.00',//已缴纳企业所得税
                t11DJN:'0.00',//待缴纳企业所得税

                t1DJN:'0.00',//印花税
                t1YJN:'0.00',//印花税

                t2DJN:'0.00',//印花税
                t2YJN:'0.00',//印花税

                t3DJN:'0.00',//印花税
                t3YJN:'0.00',//印花税

                t4DJN:'0.00',//印花税
                t4YJN:'0.00',//印花税

                t5DJN:'0.00',//印花税
                t5YJN:'0.00',//印花税

                t6DJN:'0.00',//印花税
                t6YJN:'0.00',//印花税

                lirunzonge:'',//利润总额
                jianmiansuodeshuie:'',//减免所得税额
                shijiyijiaonasuodeshuie:'',//实际缴纳所得税额
                addedTaxPeroidType:'',//增值税及附加税的申报方式（1：按月度；2：按季度）控制税种（月）中的申报方式
                incomeTaxPeroidType:'',//企业所得税的申报方式（1：按月度；3：按季度）
                isLoading:false,
                loading:false
            }
        },
        methods: {
            handleClose(done){
                this.grantLoading = false;
                this.isLoading = false,
                done();
            },
            //当企业所得税不是补录时，跳转到且所得税计提页面
            toCalculation(){
                this.$router.push({name:'calculation',
                    params:{lirunzonge:this.lirunzonge,
                        jianmiansuodeshuie:this.jianmiansuodeshuie,
                        shijiyijiaonasuodeshuie:this.shijiyijiaonasuodeshuie}})
            },
            //input change事件，将每个数字转成带千分号
            changeInput(val,id){
                let value = unNumber.unNumber(val)
                if(value == 0){
                    this.$message.error('请正确输入金额');
                }
                if(id == 't7DJZ'){
                    this.t7DJZ = number.number(value)
                }
                if(id == 't7DJN'){
                    this.t7DJN = number.number(value)
                }
                if(id == 't8DJT'){
                    this.t8DJT = number.number(value)
                }
                if(id == 't8DJN'){
                    this.t8DJN = number.number(value)
                }
                if(id == 't9DJT'){
                    this.t9DJT = number.number(value)
                }
                if(id == 't9DJN'){
                    this.t9DJN = number.number(value)
                }
                if(id == 't10DJT'){
                    this.t10DJT = number.number(value)
                }
                if(id == 't10DJN'){
                    this.t10DJN = number.number(value)
                }
                if(id == 't11DJT'){
                    this.t11DJT = number.number(value)
                }
                if(id == 't11DJN'){
                    this.t11DJN = number.number(value)
                }
                if(id == 't1DJN'){
                    this.t1DJN = number.number(value)
                }
                if(id == 't2DJN'){
                    this.t2DJN = number.number(value)
                }
                if(id == 't3DJN'){
                    this.t3DJN = number.number(value)
                }
                if(id == 't4DJN'){
                    this.t4DJN = number.number(value)
                }
                if(id == 't5DJN'){
                    this.t5DJN = number.number(value)
                }
                if(id == 't6DJN'){
                    this.t6DJN = number.number(value)
                }
            },
            //点击缴纳按钮
            clickPay(val,id){
                this.loading = true
                if(val == '0.00'){
                    this.$message.error('请正确填写金额')
                    this.loading = false;
                    return
                }
                this.$router.push({name:'taxationPay',params:{taxTypeDes:id,amount:val}})
            },
            //点击结转按钮
            clickKnots(){
                if(this.t7DJZ == '0.00'){
                    this.$message.error('请正确输入金额')
                    return
                }
                this.name = '增值税'
                this.handleType = 3
                this.amount = unNumber.unNumber(this.t7DJZ);
                this.taxTypeDes = this.companyScaless == 1 ? 't7MZ' : 't7DJZ';
                this.dialogGrant1 = true;
            },
            //点击计提按钮
            clickCalculation(val,id){
                this.taxTypeDes = id
                this.handleType = 1;
                if(val == '0.00'){
                    this.$message.error('请正确填写金额')
                    this.loading = false
                    return
                }
                if(this.taxTypeDes == 't8DJT'){
                    this.amount = number.number(this.t8DJT);
                    this.name = '附加税-城市维护建设税'
                }
                if(this.taxTypeDes == 't9DJT'){
                    this.amount = number.number(this.t9DJT);
                    this.name = '附加税-教育费附加税'
                }
                if(this.taxTypeDes == 't10DJT'){
                    this.amount = number.number(this.t10DJT);
                    this.name = '附加税-地方教育费附加税'
                }
                if(this.taxTypeDes == 't11DJT'){
                    this.amount = number.number(this.t11DJT);
                    this.name = '企业所得税'
                }
                this.dialogGrant1 = true;
            },
            //计提、结转操作
            Calculation(){
                if(this.taxTypeDes == 't11DJT' && !this.t11HandleFlag && this.flg == '0'){
                    this.toCalculation()
                    return
                }
                this.isLoading = true
                let params = new URLSearchParams();
                let url = addUrl.addUrl('operation')
                params.append('taxTypeDes',this.taxTypeDes);
                params.append('handleType',this.handleType);
                params.append('amount',unNumber.unNumber(this.amount));
                params.append('flg',this.flg);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false
//                        console.log(response);
                        if(response.data.value.result == '1'){
                            this.axios()
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                        }else if(response.data.value.result == '0'){
                            var msg = response.data.value.msg;
                            this.$message.error(msg);
                        }
                        this.dialogGrant1 =false
                    })
                    .catch(error=> {
                        this.loading = false;
                        this.isLoading = false;
                        this.dialogGrant1 =false
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            axios(){
                let url = addUrl.addUrl('Taxation');
                axios.post(url)
                    .then(response=> {
                        console.log(response);
                        let data = response.data.value
                        this.companyScaless = data.companyScaless
                        this.mianzhengAmount = data.mianzhengAmount
                        this.t7HandleFlag = data.t7HandleFlag
                        this.t8HandleFlag = data.t8HandleFlag
                        this.t9HandleFlag = data.t9HandleFlag
                        this.t10HandleFlag = data.t10HandleFlag
                        this.t11HandleFlag = data.t11HandleFlag

                        if(this.companyScaless == 1){
                            this.t7DJZ = number.number(this.mianzhengAmount)
                        }else{
                            this.t7DJZ = number.number(data.t7DJZ)
                        }
                        console.log(this.t7DJZ);
                        this.t7YJZ = number.number(data.t7YJZ)
                        this.t7YJN = number.number(data.t7YJN)

                        this.t8DJT = number.number(data.t8DJT)
                        this.t8YJT = number.number(data.t8YJT)
                        this.t8YJN = number.number(data.t8YJN)

                        this.t9DJT = number.number(data.t9DJT)
                        this.t9YJT = number.number(data.t9YJT)
                        this.t9YJN = number.number(data.t9YJN)

                        this.t10DJT = number.number(data.t10DJT)
                        this.t10YJT = number.number(data.t10YJT)
                        this.t10YJN = number.number(data.t10YJN)

                        this.t11DJT = number.number(data.t11DJT)
                        this.t11YJT = number.number(data.t11YJT)
                        this.t11YJN = number.number(data.t11YJN)

                        this.t1YJN = number.number(data.t1YJN)
                        this.t2YJN = number.number(data.t2YJN)
                        this.t3YJN = number.number(data.t3YJN)
                        this.t4YJN = number.number(data.t4YJN)
                        this.t5YJN = number.number(data.t5YJN)
                        this.t6YJN = number.number(data.t6YJN);

                        this.lirunzonge = data.lirunzonge;
                        this.jianmiansuodeshuie = data.jianmiansuodeshuie;
                        this.shijiyijiaonasuodeshuie = data.shijiyijiaonasuodeshuie;


                        if(data.addedTaxPeroidType == 1){
                            this.addedTaxPeroidType = '月'
                        }else if(data.addedTaxPeroidType == 2){
                            this.addedTaxPeroidType = '季'
                        }

                        if(data.incomeTaxPeroidType == 1){
                            this.incomeTaxPeroidType = '月'
                        }else if(data.incomeTaxPeroidType == 2){
                            this.incomeTaxPeroidType = '季'
                        }


                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        computed:mapState(['isMonthlyKnots','isAnnualKnots']),
        created(){
           this.axios()
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
    .addLink{
        display: inline-block;
        width: 100px;
        height:30px;
        color: #7ecef4;
        background-color: #e2f2f9;
        border: 1px solid #7ecef4;
        border-radius: 3px;
        line-height: 32px;
        position: absolute;
        left:10px;
        text-decoration: none;
        font-size:14px;
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
        height: 100%;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .table-top{
        width:100%;
        border: 1px solid #ccc;
        font-size:12px;
        margin-top: 10px;
    }
    .table-top th,td{
        border: 1px solid #ccc;
    }
    .table-top thead tr{
        background-color: #1c96d3;
        color: #fff;
        height:40px;
        font-size:14px;
    }
    .table-top tbody tr td{
        padding: 3px 10px;
    }
    .table-top .table-top-input{
        display: inline-block;
        width:170px;
        height: 30px;
        border: 1px solid #ccc;
        padding: 0 5px;
    }
    .table-top .btn1{
        display: inline-block;
        width:60px;
        height:28px;
        background-color: #fea728;
        color: #fff;
        text-align: center;
        line-height: 28px;
        border-radius: 3px;
        cursor: pointer;
    }
    .table-top .btn2{
        display: inline-block;
        width:60px;
        height:28px;
        background-color: #eb6877;
        color: #fff;
        text-align: center;
        line-height: 28px;
        border-radius: 3px;
        cursor: pointer;
    }
    .table-top .btn3{
        display: inline-block;
        width:60px;
        height:28px;
        background-color: #1c96d3;
        color: #fff;
        text-align: center;
        line-height: 28px;
        border-radius: 3px;
        cursor: pointer;
    }
    .table-top tbody{
        text-align: center;
    }

    .table-button{
        width:100%;
        border: 1px solid #ccc;
        font-size:12px;
    }
    .table-button th,td{
        border: 1px solid #ccc;
    }
    .table-button thead tr{
        background-color: #1c96d3;
        color: #fff;
        height:40px;
        font-size:14px;
    }
    .table-button tbody tr td{
        padding: 3px 10px;
    }
    .table-button .table-button-input{
        display: inline-block;
        width:340px;
        height: 30px;
        border: 1px solid #ccc;
        padding: 0 5px;
    }
    .table-button .btn{
        display: inline-block;
        width:60px;
        height:28px;
        background-color: #eb6877;
        color: #fff;
        text-align: center;
        line-height: 28px;
        border-radius: 3px;
        cursor: pointer;
    }
    .table-button tbody{
        text-align: center;
    }
    .see{
        color: #fff;
        text-decoration: none;
    }
    .w .dialog-p{
        margin-bottom: 10px;
    }
    .w .wagesName{
        margin-right: 20px;
    }

</style>
