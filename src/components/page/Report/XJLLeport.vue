<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>现金流量表</h2>
                <router-link to="/" class="back">返回</router-link>
                <a :href=url1 target="_blank" class="sub1">导出Excel</a>
                <a :href=url2 target="_blank" class="sub2">导出PDF</a>
                <el-select v-model="choice" class='choice' placeholder="请选择" @change="axios">
                    <el-option
                        v-for="item in choiceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="w">
                <div class="content cf">
                    <el-date-picker
                        class="yearSelect"
                        v-model="year"
                        type="year"
                        placeholder="选择年"
                        size="small"
                        value-format="yyyy"
                        @change="changeYear">
                    </el-date-picker>

                    <el-tabs class="tabs" v-show="choice == '1'" v-model="ymName" @tab-click="ymClick">
                        <el-tab-pane name="01">
                            <span slot="label" class="mon">1月</span>
                        </el-tab-pane>
                        <el-tab-pane name="02">
                            <span slot="label" class="mon">2月</span>
                        </el-tab-pane>
                        <el-tab-pane name="03">
                            <span slot="label" class="mon">3月</span>
                        </el-tab-pane>
                        <el-tab-pane name="04">
                            <span slot="label" class="mon">4月</span>
                        </el-tab-pane>
                        <el-tab-pane name="05">
                            <span slot="label" class="mon">5月</span>
                        </el-tab-pane>
                        <el-tab-pane name="06">
                            <span slot="label" class="mon">6月</span>
                        </el-tab-pane>
                        <el-tab-pane name="07">
                            <span slot="label" class="mon">7月</span>
                        </el-tab-pane>
                        <el-tab-pane name="08">
                            <span slot="label" class="mon">8月</span>
                        </el-tab-pane>
                        <el-tab-pane name="09">
                            <span slot="label" class="mon">9月</span>
                        </el-tab-pane>
                        <el-tab-pane name="10">
                            <span slot="label" class="mon">10月</span>
                        </el-tab-pane>
                        <el-tab-pane name="11">
                            <span slot="label" class="mon">11月</span>
                        </el-tab-pane>
                        <el-tab-pane name="12">
                            <span slot="label" class="mon">12月</span>
                        </el-tab-pane>
                    </el-tabs>
                    <el-tabs class="tabs" v-show="choice == '3'" v-model="quarterName" @tab-click="quarterClick">
                        <el-tab-pane name="1">
                            <span slot="label" class="mon">第一季度</span>
                        </el-tab-pane>
                        <el-tab-pane name="2">
                            <span slot="label" class="mon">第二季度</span>
                        </el-tab-pane>
                        <el-tab-pane name="3">
                            <span slot="label" class="mon">第三季度</span>
                        </el-tab-pane>
                        <el-tab-pane name="4">
                            <span slot="label" class="mon">第四季度</span>
                        </el-tab-pane>
                    </el-tabs>
                    <el-tabs class="tabs" v-show="choice == '12'">
                        <el-tab-pane name="01">
                            <span slot="label" class="mon mon-none">1月</span>
                        </el-tab-pane>
                    </el-tabs>

                    <el-table class="single" :data="tableData3">
                        <el-table-column align="center" prop="xiangmu_1" label="项目"></el-table-column>
                        <el-table-column align="center" prop="hangci_2" label="行次"></el-table-column>
                        <el-table-column align="center" prop="benqijine_3" :label=thisPeriod></el-table-column>
                        <el-table-column align="center" prop="shangqijine_4" :label=lastPeriod></el-table-column>
                    </el-table>

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
                choice:'1',//1：按月显示，3：按季显示
                currentYM:'',//当前账期
                indexYM:'',//显示账期
                choiceOptions:[//1：月报表，3：季报表
                    {value:'1',label:'月报表'},
                    {value:'3',label:'季报表'},
                    {value:'12',label:'年报表'},
                ],
                url1:'',//导出Excel
                url2:'',//导出PDF
                ymName: '',
                quarterName: '',
                year:'',
                thisPeriod:'',//本期名称
                lastPeriod:'',//上期名称
                tableData3:[],
                loading:true
            }
        },
        methods: {

            //年change事件
            changeYear(){
                this.indexYM = String(this.year) + String(this.ymName)
                this.thisPeriod = '本期金额';
                this.lastPeriod = '上期金额';
                this.axios()
            },
            //月change事件
            ymClick() {
                this.indexYM = String(this.year) + String(this.ymName)
                this.thisPeriod = (this.current_account_standard == 1) ? '本年累计金额' : '本期金额';
                this.lastPeriod = (this.current_account_standard == 1) ? '本月金额' : '上期金额';
                this.axios()
            },
            //季度change事件
            quarterClick(){
                let quarterName = this.quarterName;
                if(quarterName < 4){
                    var maxYm = String(this.year) + '0'+String(this.quarterName * 3);
                }else{
                    var maxYm = String(this.year) + String(this.quarterName * 3);
                }
                this.thisPeriod = (this.current_account_standard == 1) ? '本年累计金额' : '本期金额';
                this.lastPeriod = (this.current_account_standard == 1) ? '本月金额' : '上期金额';
                this.axios()
            },
            axios(){
                this.loading = true
                let url1 = addUrl.addUrl('XJLLeportExcel');
                let url2 = addUrl.addUrl('XJLLeportPDF');
                let params = new URLSearchParams();
                let url = addUrl.addUrl('XJLLeportList');
                params.append('ym', this.indexYM);
                params.append('showType', this.choice);
                params.append('currentQuarter', this.quarterName);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;
                            this.tableData3 = data.sumList;
                            this.sumList = data.sumList;
                        }else if(status == 400){
                            this.$message.error(msg)
                            this.tableData3 = [];
                        }
                        this.url1 = url1 + '?ym=' + this.indexYM + '&showType=' + this.choice + '&currentQuarter=' + this.quarterName
                        this.url2 = url2 + '?ym=' + this.indexYM + '&showType=' + this.choice + '&currentQuarter=' + this.quarterName
                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        computed:mapState(['start_ym','current_account_standard']),
        created(){
            this.thisPeriod = (this.current_account_standard == 1) ? '本年累计金额' : '本期金额'
            this.lastPeriod = (this.current_account_standard == 1) ? '本月金额' : '上期金额'
            let url = addUrl.addUrl('XJLLeport');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    let currentYM = data.currentYM;
                    this.year = currentYM.substring(0,4)
                    this.ymName = currentYM.substring(4,6)
                    this.currentYM = currentYM
                    this.indexYM = currentYM
                    this.axios()
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
        width: 1120px;
        height: 100%;
        background-color: #fff;
        padding: 20px 40px;
        margin-bottom: 50px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .choice {
        width:120px;
        display: inline-block;
        position: absolute;
        left:20px;
        text-decoration: none;
    }
    .tabs{
        display: inline-block;
        width:86%;
        float: left;
        margin-left: 2%;
    }
    .content .yearSelect{
        display: inline-block;
        width:12%;
        float: left;
        margin-top: 10px;
    }

    .mon{
        font-size:16px;
        font-weight: bold;
    }
    .mon-none{
        display: none;
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

</style>
