<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>红冲列表</h2>
                <router-link to="/" class="back">返回</router-link>
            </div>
            <div class="w">
                <div class="content cf">
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
                        <el-tab-pane v-if="current_book_level != 3" label="还款红冲" name="1">
                            <el-table class="single" :data="tableData1">
                                <el-table-column align="center" prop="userName" label="还款人"></el-table-column>
                                <el-table-column align="center" prop="debitDateYMD" label="日期"></el-table-column>
                                <el-table-column align="center" prop="money" label="还款金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeRepayment',params:{debitId:scope.row.idString,isRedFlush:true}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level != 3" label="借款红冲" name="2">
                            <el-table class="single" :data="tableData2">
                                <el-table-column align="center" prop="userName" label="借款人"></el-table-column>
                                <el-table-column align="center" prop="departmentName" label="借款部门"></el-table-column>
                                <el-table-column align="center" prop="debitDateYMD" label="借款日期"></el-table-column>
                                <el-table-column align="center" prop="money" label="借款金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeLoan',params:{debitId:scope.row.idString}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i v-if="scope.row.creditMoney == 0" class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                            <i v-else class="icon iconfont icon-zhuanhuan1 gray"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level != 3" label="报销红冲" name="3">
                               <el-table class="single" :data="tableData3">
                                <el-table-column align="center" prop="originalTypeName" label="类别"></el-table-column>
                                <el-table-column align="center" prop="simpleAccountDate" label="日期"></el-table-column>
                                   <el-table-column align="center" prop="applicationUserName" label="姓名"></el-table-column>
                                <el-table-column align="center" prop="money" label="金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeReimbursement',params:{debitId:scope.row.idString,isRedFlush:true}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level != 3" label="采购红冲" name="4">
                            <el-table class="single" :data="tableData4">
                                <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
                                <el-table-column align="center" prop="supplierName" label="供应商"></el-table-column>
                                <el-table-column align="center" prop="type" label="类别">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type == 1">设备</span>
                                        <span v-if="scope.row.type == 2">软件</span>
                                        <span v-if="scope.row.type == 3">劳务服务</span>
                                        <span v-if="scope.row.type == 4">技术服务</span>
                                        <span v-if="scope.row.type == 5">库存商品</span>
                                        <span v-if="scope.row.type == 11">专利技术</span>
                                        <span v-if="scope.row.type == 12">非专利技术</span>
                                        <span v-if="scope.row.type == 13">商标</span>
                                        <span v-if="scope.row.type == 14">著作权</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="commodityName" label="明细"></el-table-column>
                                <el-table-column align="center" prop="totalMoney" label="含税总价">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showTotalMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="sendMoney" label="已付款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showSendMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="unsendMoney" label="待付款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showUnsendMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看" width="80px">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seePurchase',params:{purchaseId:scope.row.idString}}"
                                                         class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲" width="80px">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i v-if="scope.row.sendMoney == 0"
                                               class="icon iconfont icon-zhuanhuan1 green"
                                               @click="openModel(scope.row.idString)"></i>
                                            <i v-else class="icon iconfont icon-zhuanhuan1 gray"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level != 3" label="采购付款红冲" name="5">
                               <el-table class="single" :data="tableData5">
                                <el-table-column align="center" prop="supplierName" label="供应商"></el-table-column>
                                <el-table-column align="center" prop="simpleSendDate" label="付款日期"></el-table-column>
                                <el-table-column align="center" prop="sendMoney" label="付款金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seePurchasePayment',params:{purchaseId:scope.row.idString,isRedFlush:true}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                           <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level != 3" label="销售红冲" name="6">
                            <el-table class="single" :data="tableData6">
                                <el-table-column align="center" prop="departmentName" label="部门"></el-table-column>
                                <el-table-column align="center" prop="customName" label="客户"></el-table-column>
                                <el-table-column align="center" prop="type" label="类别">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type == 1">库存商品</span>
                                        <span v-else-if="scope.row.type == 2">技术服务</span>
                                        <span v-else-if="scope.row.type == 3">技术开发</span>
                                        <span v-else-if="scope.row.type == 4">技术咨询</span>
                                        <span v-else-if="scope.row.type == 5">劳务</span>
                                        <span v-else-if="scope.row.type == 6">软件</span>
                                        <span v-else-if="scope.row.type == 7">设计服务</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="discription" label="明细"></el-table-column>
                                <el-table-column align="center" prop="totalMoney" label="含税总价">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showTotalMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receivedMoney" label="已收款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showReceivedMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="unreceiveMoney" label="待收款">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showUnreceiveMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeSale',params:{saleId:scope.row.idString}}"
                                                         class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i v-if="scope.row.receivedMoney == 0"
                                               class="icon iconfont icon-zhuanhuan1 green"
                                               @click="openModel(scope.row.idString)"></i>
                                            <i v-else class="icon iconfont icon-zhuanhuan1 gray"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level != 3" label="销售收款红冲" name="7">
                               <el-table class="single" :data="tableData7">
                                <el-table-column align="center" prop="customName" label="客户"></el-table-column>
                                <el-table-column align="center" prop="simpleReceiveDate" label="收款日期"></el-table-column>
                                <el-table-column align="center" prop="receiveMoney" label="收款金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeSalePayment',params:{saleId:scope.row.idString,isRedFlush:true}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane  label="收容业务红冲" name="8">
                               <el-table class="single" :data="tableData8">
                                <el-table-column align="center" prop="sceneName" label="业务名称"></el-table-column>
                                <el-table-column align="center" prop="businessDateYMD" label="业务日期"></el-table-column>
                                <el-table-column align="center" prop="money" label="业务金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="查看">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <router-link :to="{name:'seeCollection',params:{debitId:scope.row.idString,isRedFlush:true}}" class="see">
                                                <i class="icon iconfont icon-kanguo blue"></i>
                                            </router-link>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.idString)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level == 3 && user_type >= 1" label="流水红冲" name="9">
                            <el-table class="single" :data="tableData9">
                                <el-table-column align="center" prop="receipt_in_out_flg" label="类型">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.receipt_in_out_flg == 1">支</span>
                                        <span v-else>收</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receipt_type_name" label="项目"></el-table-column>
                                <el-table-column align="center" prop="receipt_date" label="日期"></el-table-column>
                                <el-table-column align="center" prop="receiveMoney" label="金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receipt_trade_name" label="交易方"></el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.receipt_id)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane v-if="current_book_level == 3 && user_type >= 1" label="票据红冲" name="10">
                            <el-table class="single" :data="tableData10">
                                <el-table-column align="center" prop="receipt_in_out_flg" label="类型">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.receipt_in_out_flg == 1">支</span>
                                        <span v-else>收</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receipt_type_name" label="项目">
                                    <template slot-scope="scope">
                                        <p>{{scope.row.receipt_type_name}}</p>
                                        <p>{{scope.row.receipt_type_extra_name}}</p>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receipt_date" label="日期"></el-table-column>
                                <el-table-column align="center" prop="receiveMoney" label="金额">
                                    <template slot-scope="scope">
                                        <span>{{scope.row.showMoney}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" prop="receipt_trade_name" label="交易方"></el-table-column>
                                <el-table-column align="center" prop="" label="红冲">
                                    <template slot-scope="scope">
                                        <span class="operation">
                                            <i class="icon iconfont icon-zhuanhuan1 green" @click="openModel(scope.row.receipt_id)"></i>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>

                    <el-dialog :title="title" :visible.sync="repaymentModel" center>
                        <ul class="list cf">
                            <li class="cf">
                                <span class="sp">业务金额</span>
                                <span class="sp2">{{money}}元</span>
                            </li>
                            <li class="cf">
                                <span class="sp">业务日期</span>
                                <span class="sp2">{{day}}</span>
                            </li>
                            <li class="cf">
                                <span class="sp">审批意见</span>
                                <textarea v-model="discription" class="tex" maxlength="50" placeholder="审批意见"></textarea>
                            </li>
                            <li class="btnLi cf">
                                <el-button type="danger" size="small" class="btn" @click="submit">红冲</el-button>
                            </li>
                        </ul>
                    </el-dialog>
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
                activeName:'1',//选择红冲业务
                isId:'',//业务id
                currentYM:'',//当前账期
                indexYM:'',//显示账期
                repaymentModel:false,//还款红冲模态框
                repaymentMode2:false,//借款红冲模态框
                repaymentMode3:false,//报销红冲模态框
                repaymentMode4:false,//采购红冲模态框
                repaymentMode5:false,//采购付款红冲模态框
                repaymentMode6:false,//销售红冲模态框
                repaymentMode7:false,//销售收款红冲模态框
                title:'',//红冲模态名称
                money:'',//业务金额
                day:'',//业务日期
                discription:'',//备注 审批意见
                ymName: '',
                year:'',
                tableData1:[],//还款红冲列表
                tableData2:[],//借款红冲列表
                tableData3:[],//报销红冲列表
                tableData4:[],//采购红冲列表
                tableData5:[],//采购付款红冲列表
                tableData6:[],//销售红冲列表
                tableData7:[],//销售收款红冲列表
                tableData8:[],//收容业务列表
                tableData9:[],//流水列表
                tableData10:[],//票据列表
                loading:true
            }
        },
        methods: {
            //点击红冲按钮
            submit(){
                this.loading = true
                let url = ''
                let params = new URLSearchParams();
                if(this.activeName == 1){
                    url = addUrl.addUrl('repaymentRedFlushSubmit');
                }else if(this.activeName == 2){
                    url = addUrl.addUrl('loanRedFlushSubmit');
                }else if(this.activeName == 3){
                    url = addUrl.addUrl('reimbursementRedFlushSubmit');
                }else if(this.activeName == 4){
                    url = addUrl.addUrl('purchaseRedFlushSubmit');
                }else if(this.activeName == 5){
                    url = addUrl.addUrl('purchasePaymentRedFlushSubmit');
                }else if(this.activeName == 6){
                    url = addUrl.addUrl('saleRedFlushSubmit');
                }else if(this.activeName == 7){
                    url = addUrl.addUrl('salePaymentRedFlushSubmit');
                }else if(this.activeName == 8){
                    url = addUrl.addUrl('businessRedFlushSubmit');
                }else if(this.activeName == 9){
                    url = addUrl.addUrl('invoiceRedFlushSubmit');
                    params.append('invoiceId',this.isId);
                }else if(this.activeName == 10){
                    url = addUrl.addUrl('invoiceRedFlushSubmit');
                    params.append('invoiceId',this.isId);
                }
                params.append('id',this.isId);
                params.append('discription',this.discription);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            this.$message.success('红冲成功')
                            this.repaymentModel = false
                            this.axios()
                        }else if(status == 400){
                            this.$message.error(msg)
                            this.tableData3 = [];
                        }

                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            },
            //打开红冲模态框
            openModel(id){
                this.isId = id
                this.discription = ''
                //判断是哪个红冲业务 1：还款 2：借款 3：报销 4：采购 5：采购付款 6：销售 7：销售收款
                if(this.activeName == 1){
                    let tableData = this.tableData1
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].debitDateYMD
                        }
                    }
                    this.title = '还款红冲'
                }else if(this.activeName == 2){
                    let tableData = this.tableData2
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].debitDateYMD
                        }
                    }
                    this.title = '借款红冲'
                }else if(this.activeName == 3){
                    let tableData = this.tableData3
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].simpleAccountDate
                        }
                    }
                    this.title = '报销红冲'
                }else if(this.activeName == 4){
                    let tableData = this.tableData4
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showTotalMoney
                            this.day = tableData[i].simplePurchaseDate
                        }
                    }
                    this.title = '采购红冲'
                }else if(this.activeName == 5){
                    let tableData = this.tableData5
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].simpleSendDate
                        }
                    }
                    this.title = '采购付款红冲'
                }else if(this.activeName == 6){
                    let tableData = this.tableData6
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showTotalMoney
                            this.day = tableData[i].simpleSaleDate
                        }
                    }
                    this.title = '销售红冲'
                }else if(this.activeName == 7){
                    let tableData = this.tableData7
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].simpleReceiveDate
                        }
                    }
                    this.title = '销售收款红冲'
                }else if(this.activeName == 8){
                    let tableData = this.tableData8
                    for(let i in tableData){
                        if(id == tableData[i].idString){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].businessDateYMD
                        }
                    }
                    this.title = '收容项业务红冲'
                }else if(this.activeName == 9){
                    let tableData = this.tableData9
                    for(let i in tableData){
                        if(id == tableData[i].receipt_id){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].receipt_date
                        }
                    }
                    this.title = '流水红冲'
                }else if(this.activeName == 10){
                    let tableData = this.tableData10
                    for(let i in tableData){
                        if(id == tableData[i].receipt_id){
                            this.money = tableData[i].showMoney
                            this.day = tableData[i].receipt_date
                        }
                    }
                    this.title = '票据红冲'
                }
                this.repaymentModel = true

            },
            handleClick(){
                this.axios()
            },

            axios(){
                this.loading = true
                let url
                let params = new URLSearchParams();
                if(this.activeName == 1){//还款
                    url = addUrl.addUrl('repaymentRedFlush');
                }else if(this.activeName == 2){//借款
                    url = addUrl.addUrl('loanRedFlush');
                }else if(this.activeName == 3){//报销
                    url = addUrl.addUrl('ReimbursementRedFlush');
                }else if(this.activeName == 4){//采购
                    url = addUrl.addUrl('purchaseRedFlush');
                }else if(this.activeName == 5){//采购付款
                    url = addUrl.addUrl('purchasePaymentRedFlush');
                }else if(this.activeName == 6){//销售
                    url = addUrl.addUrl('saleRedFlush');
                }else if(this.activeName == 7){//销售收款
                    url = addUrl.addUrl('salePaymentRedFlush');
                }else if(this.activeName == 8){//收容项
                    url = addUrl.addUrl('businessRedFlush');
                    params.append('audit_flg','4');
                }else if(this.activeName == 9){//流水
                    url = addUrl.addUrl('invoiceRedFlush');
                    params.append('cashFlg','1');
                }else if(this.activeName == 10){//票据
                    url = addUrl.addUrl('invoiceRedFlush');
                    params.append('cashFlg','99');
                }
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;
                            if(this.activeName == 1){
                                for(let i in data){
                                    data[i].showMoney = number.number(data[i].money)
                                }
                                this.tableData1 = data;
                            }else if(this.activeName == 2){
                                for (let i in data) {
                                    data[i].showMoney = number.number(data[i].money)
                                }
                                this.tableData2 = data;
                            }else if(this.activeName == 3){
                                for (let i in data) {
                                    data[i].showMoney = number.number(data[i].money)
                                }
                                this.tableData3 = data;
                            }else if(this.activeName == 4){
                                for (let i in data) {
                                    data[i].showTotalMoney = number.number(data[i].totalMoney)
                                    data[i].showTaxMoney = number.number(data[i].taxMoney)
                                    data[i].showSendMoney = number.number(data[i].sendMoney)
                                    data[i].showUnsendMoney = number.number(data[i].unsendMoney)
                                }
                                this.tableData4 = data;
                            }else if(this.activeName == 5){
                                for (let i in data) {
                                    data[i].showMoney = number.number(data[i].sendMoney)
                                }
                                this.tableData5 = data;
                            }else if(this.activeName == 6){
                                for (let i in data) {
                                    data[i].showTotalMoney = number.number(data[i].totalMoney)
                                    data[i].showReceivedMoney = number.number(data[i].receivedMoney)
                                    data[i].showUnreceiveMoney = number.number(data[i].unreceiveMoney)
                                }
                                this.tableData6 = data;
                            }else if(this.activeName == 7){
                                for (let i in data) {
                                    data[i].showMoney = number.number(data[i].receiveMoney)
                                }
                                this.tableData7 = data;
                            }else if(this.activeName == 8){
                                let list = data.list
                                for (let i in list) {
                                    list[i].showMoney = number.number(list[i].money)
                                }
                                this.tableData8 = list;
                            }else if(this.activeName == 9){
                                let list = data.list
                                for (let i in list) {
                                    list[i].showMoney = number.number(list[i].receipt_money)
                                }
                                this.tableData9 = list;
                            }else if(this.activeName == 10){
                                let list = data.list
                                for (let i in list) {
                                    list[i].showMoney = number.number(list[i].receipt_money)
                                }
                                this.tableData10 = list;
                            }

                        }else if(status == 400){
                            this.$message.error(msg)
                        }

                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        computed:mapState(['start_ym','current_book_level','user_type']),
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
    .see{
        text-decoration: none;
    }
    .green{
        color: #1ffb2e;
    }
    .list{
        width:80%;
        margin: 0 auto;
        font-size:16px;
    }
    .list li{
        margin-top: 30px;
    }
    .list li .sp{
        display: inline-block;
        width:20%;
        text-align: right;
        float: left;
        margin-right: 3%;
    }
    .list li .sp2{
        display: inline-block;
        width:77%;
        text-align: center;
        float: left;
    }
    .list li .tex{
        display: inline-block;
        width:70%;
        height:36px;
        padding: 5px 10px;
        resize: none;
        float: left;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
    }
    .list .btnLi{
        text-align: center;
    }
    .btn{
        width:80px;
        display: inline-block;
    }
    .gray{
        color: #ccc;
        cursor: auto;
    }

</style>
