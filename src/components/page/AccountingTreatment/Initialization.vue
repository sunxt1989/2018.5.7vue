<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>账务处理-初始化</h2>
                <h4 class="currentYM">当前账期：{{currentYM}}</h4>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="content cf">
                    <el-tabs type="border-card" v-model="activeName">
                        <el-tab-pane name='1' label="科目">
                            <el-tabs tab-position="right" style="height:500px;" v-if="current_account_standard == 2">
                                <el-tab-pane label=" 资产">
                                    <el-table class="single" :data="tableData11" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="负债">
                                    <el-table class="single" :data="tableData12" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="共同类">
                                    <el-table class="single" :data="tableData13" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="权益">
                                    <el-table class="single" :data="tableData14" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="成本">
                                    <el-table class="single" :data="tableData15" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="损益">
                                    <el-table class="single" :data="tableData16" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </el-tabs>
                            <el-tabs tab-position="right" style="height:500px;" v-if="current_account_standard == 1">
                                <el-tab-pane label=" 资产">
                                    <el-table class="single" :data="tableData11" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="负债">
                                    <el-table class="single" :data="tableData12" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="权益">
                                    <el-table class="single" :data="tableData14" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="成本">
                                    <el-table class="single" :data="tableData15" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                                <el-tab-pane label="损益">
                                    <el-table class="single" :data="tableData16" height="500">
                                        <el-table-column align="center" prop="subjectCode" label="科目编号"></el-table-column>
                                        <el-table-column align="center" prop="subjectName" label="科目名称"></el-table-column>
                                        <el-table-column align="center" prop="debitCredit" label="方向">
                                            <template slot-scope="scope">
                                                <span v-if="scope.row.debitCredit == 1">借</span>
                                                <span v-if="scope.row.debitCredit == 2">贷</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column align="center" prop="debitAmount" :label=moonName1></el-table-column>
                                        <el-table-column align="center" prop="creditAmount" :label=moonName2></el-table-column>
                                        <el-table-column align="center" prop="endAmount" label="期末余额"></el-table-column>
                                    </el-table>
                                </el-tab-pane>
                            </el-tabs>
                        </el-tab-pane>

                        <el-tab-pane name='2' label="辅助科目">
                            <el-table class="single" :data="tableData2" height="500" :span-method="objectSpanMethod">
                                <el-table-column align="center" prop="kmbh" label="科目编号"></el-table-column>
                                <el-table-column align="center" prop="kmmc" label="科目名称"></el-table-column>
                                <el-table-column align="center" prop="wldw" label="往来单位"></el-table-column>
                                <el-table-column align="center" prop="fx" label="方向"></el-table-column>
                                <el-table-column align="center" prop="ljjf" :label=moonName1></el-table-column>
                                <el-table-column align="center" prop="ljdf" :label=moonName2></el-table-column>
                                <el-table-column align="center" prop="qmye" label="期末余额"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane name='3' label="银行账户">
                            <el-table class="single" :data="tableData3" height="500">
                                <el-table-column align="center" prop="bankAccountType" label="账户类别">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.bankAccountType == 1">基本户</span>
                                        <span v-if="scope.row.bankAccountType == 2">一般户</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="bankName" label="银行名称"></el-table-column>
                                <el-table-column align="center" prop="bankChildName" label="开户行"></el-table-column>
                                <el-table-column align="center" prop="bankCode" label="银行账号"></el-table-column>
                                <el-table-column align="center" prop="initialAmount" label="初始余额"></el-table-column>
                                <el-table-column align="center" prop="bookStatus" label="账户状态">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.bookStatus == 0">未启用</span>
                                        <span v-if="scope.row.bookStatus == 1">已启用</span>
                                        <span v-if="scope.row.bookStatus == 2">已停用</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane name='4' label="现金流量初始化">
                            <el-table class="single" :data="tableData6" height="500">
                                <el-table-column align="center" type="index" width="80" label="行次"></el-table-column>
                                <el-table-column align="center" prop="labelText" label="项目"></el-table-column>
                                <el-table-column align="center" prop="value" label="本期金额" width="260"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane name='5' label="固定资产卡片">
                            <el-table class="single" :data="tableData4" height="500">
                                <el-table-column align="center" prop="fixedAssetsNumber" label="编号"></el-table-column>
                                <el-table-column align="center" prop="name" label="名称" width="180px"></el-table-column>
                                <el-table-column align="center" prop="className" label="类别"></el-table-column>
                                <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
                                <el-table-column align="center" prop="usefulLife" label="年限" width="60px"></el-table-column>
                                <el-table-column align="center" prop="originalMoney" label="原值"></el-table-column>
                                <el-table-column align="center" prop="usefulMoney" label="累计折旧"></el-table-column>
                                <el-table-column align="center" prop="salvageRate" label="净残值率" width="80px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.salvageRate}}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="salvageMoney" label="净值"></el-table-column>
                                <el-table-column align="center" prop="startDateYMD" label="入账日期"></el-table-column>
                                <el-table-column align="center" prop="usefulMonths" label="已折旧月" width="80px"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane name='6' label="无形资产卡片">
                            <el-table class="single" :data="tableData5" height="500">
                                <el-table-column align="center" prop="fixedAssetsNumber" label="编号"></el-table-column>
                                <el-table-column align="center" prop="name" label="名称" width="180px"></el-table-column>
                                <el-table-column align="center" prop="className" label="类别"></el-table-column>
                                <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
                                <el-table-column align="center" prop="usefulLife" label="年限" width="60px"></el-table-column>
                                <el-table-column align="center" prop="originalMoney" label="原值"></el-table-column>
                                <el-table-column align="center" prop="usefulMoney" label="累计折旧"></el-table-column>
                                <el-table-column align="center" prop="salvageRate" label="净残值率" width="80px">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.salvageRate}}%</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="salvageMoney" label="净值"></el-table-column>
                                <el-table-column align="center" prop="startDateYMD" label="入账日期"></el-table-column>
                                <el-table-column align="center" prop="usefulMonths" label="已折旧月" width="80px"></el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>


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
                activeName:'1',//导航栏状态
                state:'',//状态
                currentYM:'',//当前账期
                indexYM:'',//显示账期
                url1:'',//导出Excel
                url2:'',//导出PDF
                ymName: '',
                moonName1:'',//科目-月前累计借方
                moonName2:'',//科目-月前累计贷方
                year:'',
                tableData11:[],//科目-资产
                tableData12:[],//科目-负债
                tableData13:[],//科目-共同类
                tableData14:[],//科目-权益
                tableData15:[],//科目-成本
                tableData16:[],//科目-损益

                tableData2:[],//辅助科目
                tableData3:[],//银行账户
                tableData4:[],//固定资产列表
                tableData5:[],//无形资产列表
                tableData6:[],//现金流量列表
                loading:true
            }
        },
        methods: {
            //给辅助科目合并列
            objectSpanMethod({row,column,rowIndex,columnIndex}){
                if(columnIndex < 2){
                    if(row.rowspan){
                        return {
                            rowspan: row.rowspan,
                            colspan: 1
                        };
                    }else{
                        return{
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
        },
        computed:mapState(['current_book_ym','current_account_standard']),
        created(){
//            console.log(this.current_account_standard);
            let url = addUrl.addUrl('Initialization');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    let currentYM = this.current_book_ym;

                    this.currentYM = currentYM.substring(0,4) + '年' + currentYM.substring(4,6) + '月'
//                    console.log(this.currentYM);
                    this.year = currentYM.substring(0,4)
                    this.ymName = currentYM.substring(4,6)
                    this.moonName1 = String(this.ymName) + '月前累计借方'
                    this.moonName2 = this.ymName + '月前累计贷方'

                    let subjectList = data.subjectList//科目列表
                    //判断会计准则1：小企业 2：企业
                    if(this.current_account_standard == 1){
                        this.tableData11 = subjectList[0]
                        this.tableData12 = subjectList[1]
                        this.tableData14 = subjectList[2]
                        this.tableData15 = subjectList[3]
                        this.tableData16 = subjectList[4]
                    }else{
                        this.tableData11 = subjectList[0]
                        this.tableData12 = subjectList[1]
                        this.tableData13 = subjectList[2]
                        this.tableData14 = subjectList[3]
                        this.tableData15 = subjectList[4]
                        this.tableData16 = subjectList[5]
                    }


                    //为辅助科目和并列生成新参数rowspan
                    let numArr = [];
                    for(let i in data.assistantSubjectList){
                        if(data.assistantSubjectList[i].kmbh){
                            numArr.push(i)
                        }
                    }
                    for(let i = 0; i < numArr.length; i++){
                        if(i == numArr.length - 1){
                            data.assistantSubjectList[numArr[i]].rowspan = data.assistantSubjectList.length - numArr[i]
                        }
                        if(numArr[i+1] - numArr[i] > 0){
                            data.assistantSubjectList[numArr[i]].rowspan = numArr[i+1] - numArr[i]
                        }
                    }
                    this.tableData2 = data.assistantSubjectList;//辅助科目

                    for(let i in data.bankAccountList){
                        if(data.bankAccountList[i].initialAmount){
                            data.bankAccountList[i].initialAmount = number.number(data.bankAccountList[i].initialAmount)
                        }else{
                            data.bankAccountList[i].initialAmount = '0.00'
                        }
                    }
                    this.tableData3 = data.bankAccountList;//银行账户
                    for(let i in data.fixedList){
                        if(data.fixedList[i].originalMoney){
                            data.fixedList[i].originalMoney = number.number(data.fixedList[i].originalMoney)
                        }else{
                            data.fixedList[i].originalMoney = '0.00'
                        }
                        if(data.fixedList[i].usefulMoney){
                            data.fixedList[i].usefulMoney = number.number(data.fixedList[i].usefulMoney)
                        }else{
                            data.fixedList[i].usefulMoney = '0.00'
                        }
                        if(data.fixedList[i].salvageMoney){
                            data.fixedList[i].salvageMoney = number.number(data.fixedList[i].salvageMoney)
                        }else{
                            data.fixedList[i].salvageMoney = '0.00'
                        }
                    }
                    this.tableData4 = data.fixedList;//固定资产列表
                    for(let i in data.intangibleList){
                        if(data.intangibleList[i].originalMoney){
                            data.intangibleList[i].originalMoney = number.number(data.intangibleList[i].originalMoney)
                        }else{
                            data.intangibleList[i].originalMoney = '0.00'
                        }
                        if(data.intangibleList[i].usefulMoney){
                            data.intangibleList[i].usefulMoney = number.number(data.intangibleList[i].usefulMoney)
                        }else{
                            data.intangibleList[i].usefulMoney = '0.00'
                        }
                        if(data.intangibleList[i].salvageMoney){
                            data.intangibleList[i].salvageMoney = number.number(data.intangibleList[i].salvageMoney)
                        }else{
                            data.intangibleList[i].salvageMoney = '0.00'
                        }
                    }
                    this.tableData5 = data.intangibleList;//无形资产列表
                    for(let i in data.cashList){
                        if(data.cashList[i].value){
                            data.cashList[i].value = number.number(data.cashList[i].value)
                        }else{
                            data.cashList[i].value = '0.00'
                        }
                    }
                    this.tableData6 = data.cashList;//现金流量列表
                    this.loading = false
                })
                .catch(()=>{
                    this.loading = false
                })
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
        width: 1200px;
        height: 100%;
        background-color: #fff;
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
    .currentYM{
        position: absolute;
        left:0px;
        top:0px;
        font-size:16px;
    }
    .see{
        text-decoration: none;
    }



</style>
