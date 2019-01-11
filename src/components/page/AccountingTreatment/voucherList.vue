<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>凭证列表</h2>
                <router-link to="/" class="back">返回</router-link>
                <a :href=url4 v-show="isDownload" target="_blank" class="sub1">导出Excel</a>
                <!--<a :href=url3 v-show="isDownload" target="_blank" class="sub2">导出PDF</a>-->
                <el-button v-show="isDownload" @click="exportPDF" size="small" type="primary" class="sub2" :loading="grantLoading">导出PDF</el-button>
                <el-button v-show="!isDownload" @click="stop" size="small" type="primary" class="sub3" >导出PDF</el-button>
                <el-button v-show="!isDownload" @click="stop" size="small" type="primary" class="sub4" >导出Excel</el-button>

                <el-dialog title="选择PDF模板" :visible.sync="dialogGrant" :before-close="handleClose" width="500px">
                    <div class="exportPDF">
                        <el-radio v-model="printType" label="1">A4一联版（横向）</el-radio>
                        <el-radio v-model="printType" label="2">A4两联版</el-radio>
                    </div>
                    <el-button @click="closeGrant" size="small">取 消</el-button>
                    <el-button type="primary" @click="grantAxios" size="small" >确 定</el-button>
                </el-dialog>
            </div>
            <div class="w">
                <div class="content cf" :style="{height:screenHeight}">
                    <el-date-picker
                        class="yearSelect"
                        v-model="year"
                        type="year"
                        placeholder="选择年"
                        size="small"
                        value-format="yyyy"
                        @change="changeYear">
                    </el-date-picker>

                    <el-tabs class="tabs"  v-model="ymName" @tab-click="ymClick">
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
                        <!--<el-tab-pane name="13">-->
                            <!--<span slot="label" class="mon">13月</span>-->
                        <!--</el-tab-pane>-->
                    </el-tabs>

                    <el-table class="single voucherList" :data="tableData"  @selection-change="handleSelectionChange" :default-expand-all="true"  >
                        <el-table-column align="center" type="selection" prop="idStr"></el-table-column>
                        <el-table-column align="center" type="expand" prop="remarkStr" label="摘要" width="80px">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.certificateItemList" border class="littleTable"  :row-class-name="tableRowClassName">
                                    <el-table-column align="center" prop="serviceName" label="摘要" width="200px">
                                        <template slot-scope="scope">
                                            <span>{{scope.row.serviceName}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="left" prop="subjectCode" label="科目">
                                        <template slot-scope="prop">
                                            <span v-if="prop.row.serviceName == '合计：'"></span>
                                            <span v-else-if="prop.row.debitAmount && prop.row.serviceName != '合计：'">借：{{prop.row.subjectCode}}{{prop.row.subjectName}}</span>
                                            <span v-else>贷：{{prop.row.subjectCode}}{{prop.row.subjectName}}</span>
                                            <span v-if="prop.row.relationName">({{prop.row.relationName}})</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column align="right" prop="debitAmount" label="借方金额" width="200px"></el-table-column>
                                    <el-table-column align="right" prop="creditAmount" label="贷方金额" width="200px"></el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" type="index"  width="60px"></el-table-column>
                        <el-table-column align="right" prop="certificateDateYMD" >
                            <template slot-scope="scope">
                                <span>日期：{{scope.row.certificateDateYMD}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="certificateNumber" >
                            <template slot-scope="scope">
                                <span>凭证字号：{{scope.row.certificateNumber}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="left" prop="billCount" >
                            <template slot-scope="scope">
                                <span>附单据{{scope.row.billCount}}张</span>
                            </template>
                        </el-table-column>
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
                currentYM:'',//当前账期
                indexYM:'',//显示账期
                isDownload:false,//是否能下载

                url1:'',//导出Excel
                url2:'',//导出pdf
                url3:'',//完整导出pdf地址
                url4:'',//完整导出Excel地址
                printType:'2',//选择PDF模板
                dialogGrant:false,//选择PDF模板模态框
                grantLoading:false,//导出PDF按钮loading
                ymName: '',
                quarterName: '',
                year:'',
                tableData:[],
                screenHeight: '', //页面初始化高度
                loading:true
            }
        },
        methods: {
            tableRowClassName({row, rowIndex}) {
                if (row.serviceName == '合计：') {
                    return 'total-row';
                }else{
                    return 'success-row';
                }
                return ;
            },
            //导出PDF
            exportPDF(){
                this.dialogGrant = true;
                this.grantLoading = true;
            },
            //关闭模态框
            handleClose(done){
                this.grantLoading = false;
                done();
            },
            //关闭选择PDF模板模态框取消按钮
            closeGrant(){
                this.dialogGrant = false;
                this.grantLoading = false;
            },

            grantAxios(){
                if(this.url3.includes('printType')){
                    let arr = this.url3.split('printType=')
                    arr[1] = this.printType
                    this.url3 = arr.join('=')
//                    console.log(this.url3);
                }else{
                    this.url3 +='&printType=' + this.printType
                }
                window.location.href = this.url3;
                this.dialogGrant = false;
                this.grantLoading = false;
                this.loading = false
            },
            stop(){
                this.$message.error('请先选择需要下载的凭证')
            },
            handleSelectionChange(val){
                let multipleSelection = ''
                for(let i in val){
                    if(i == 0){
                        multipleSelection += val[i].idStr
                    }else{
                        multipleSelection += ','+ val[i].idStr
                    }
                }
//                this.multipleSelection =
                //判断显示那个下载按钮，如果val.length等于0时显示不能下载的按钮
                if(val.length == 0){
                    this.isDownload = false
                }else{
                    this.isDownload = true
                    this.url3 = this.url2 + '?ym=' + this.indexYM + '&ids=' + multipleSelection
                    this.url4 = this.url1 + '?ym=' + this.indexYM + '&ids=' + multipleSelection
                }
            },
            //年change事件
            changeYear(){
                this.indexYM = String(this.year) + String(this.ymName)
                this.axios()
            },
            //月change事件
            ymClick() {
                this.indexYM = String(this.year) + String(this.ymName)
                this.axios()
            },

            axios(){
                this.loading = true
                let params = new URLSearchParams();
                let url = addUrl.addUrl('voucherList');

                params.append('ym',this.indexYM);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value
                        let certificateList = data.certificateList
                        for(let i in certificateList){
                            certificateList[i].showRow = '日期：'+ certificateList[i].certificateDateYMD + '凭证字号：' + certificateList[i].certificateNumber + '附单据' + certificateList[i].billCount + '张'
                            let certificateItemList = certificateList[i].certificateItemList;
                            let debitAll = 0;
                            let creditAll = 0;
                            for(let j = 0 ;j < certificateItemList.length; j++){
                                if(certificateItemList[j].debitAmount){
                                    debitAll += parseFloat(Number(certificateItemList[j].debitAmount))
                                    certificateItemList[j].debitAmount = number.number(certificateItemList[j].debitAmount)
                                }
                                if(certificateItemList[j].creditAmount){
                                    creditAll += parseFloat(Number(certificateItemList[j].creditAmount))
                                    certificateItemList[j].creditAmount = number.number(certificateItemList[j].creditAmount)
                                }
                                //判断如果不是第一行时摘要全部为空，如果第一行serviceName为空时，就用remark
                                if(j != 0){
                                    certificateItemList[j].serviceName = ''
                                }else{
                                    if(certificateItemList[j].serviceName == ''|| certificateItemList[j].serviceName == null){
                                        certificateItemList[j].serviceName = certificateItemList[j].remark
                                    }
                                }
                            }
                            certificateItemList.push({
                                serviceName:'合计：',debitAmount:number.number(debitAll.toFixed(2)),creditAmount: number.number(creditAll.toFixed(2))
                            })

                        }
                        this.tableData = certificateList;
                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        computed:mapState(['current_book_ym','start_ym','isMonthlyKnots','isAnnualKnots']),
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
            this.url1 = addUrl.addUrl('voucherExcel');
            this.url2 = addUrl.addUrl('voucherPDF');
            let currentYM = String(this.current_book_ym);
            this.year = currentYM.substring(0,4)
            this.ymName = currentYM.substring(4,6)
            this.currentYM = currentYM
            this.indexYM = currentYM;
            if(currentYM){
                this.axios()
            }else{
                this.loading = false
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
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }

    .tabs{
        display: inline-block;
        width:86%;
        float: left;
        margin-left: 2%;
    }
    .yearSelect{
        display: inline-block;
        width:12%;
        float: left;
        margin-top: 10px;
    }

    .mon{
        font-size:16px;
        font-weight: bold;
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
    .top .sub1{
        display: inline-block;
        width: 82px;
        height:32px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        right:100px;
        font-size:12px;
    }
    .top .sub2{
        width: 80px;
        height:32px;
        position: absolute;
        right:200px;
    }
    .top .sub3{
        width: 80px;
        height:32px;
        position: absolute;
        right:200px;
    }
    .top .sub4{
        width: 80px;
        height:32px;
        position: absolute;
        right:100px;
    }
    .top .exportPDF{
        margin-bottom: 30px;
    }

</style>
