<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>查看报销单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" v-show="showBtn1 && !isBossSee" size="small" type="danger" class="sub1" :loading="isLoading">保存</el-button>
                <el-button @click="model(2)" v-show="showBtn2 && !isBossSee" size="small" type="primary" class="sub2" :loading="isLoading">提交</el-button>
                <el-button @click="model(3)" v-show="showBtn3 && !isBossSee" size="small" type="danger" class="sub1" :loading="isLoading">撤回</el-button>
                <a :href=url1 target="_blank" class="sub3">下载报销单</a>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>查看报销单</span>
                </div>
                <el-button type="danger" plain size="small" class="share" v-if="isShowShare " @click="shareClick">
                    <span v-show="!isShare">费用分摊</span>
                    <span v-show="isShare">取消费用分摊</span>
                </el-button>
                <ul class="list cf">
                    <li class="hd" v-show="!isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-select class="sel" v-model="department" placeholder="请选择" :disabled="isReadonly">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>

                    <li class="sm" v-if="isShowShareItem1" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input1" class="input-with-select"
                                  @change="inputWithSelectChange(1,$event)" :readonly="isReadonly">
                            <el-select v-model="select1" slot="prepend" placeholder="请选择" class="input-select"
                                       :disabled="isReadonly">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem2" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input2" class="input-with-select"
                                  @change="inputWithSelectChange(2,$event)" :readonly="isReadonly">
                            <el-select v-model="select2" slot="prepend" placeholder="请选择" class="input-select"
                                       :disabled="isReadonly">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem3" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input3" class="input-with-select"
                                  @change="inputWithSelectChange(3,$event)" :readonly="isReadonly">
                            <el-select v-model="select3" slot="prepend" placeholder="请选择" class="input-select"
                                       :disabled="isReadonly">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem4" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input4" class="input-with-select"
                                  @change="inputWithSelectChange(4,$event)" :readonly="isReadonly">
                            <el-select v-model="select4" slot="prepend" placeholder="请选择" class="input-select"
                                       :disabled="isReadonly">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                    <li class="sm" v-if="isShowShareItem5" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input5" class="input-with-select"
                                  @change="inputWithSelectChange(5,$event)" :readonly="isReadonly">
                            <el-select v-model="select5" slot="prepend" placeholder="请选择" class="input-select"
                                       :disabled="isReadonly">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                </ul>

                <ul class="list">
                    <li class="sm">
                        <span class="tit">报销名称</span>
                        <input class="ipt" type="text" v-model="originalTypeName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">报销日期</span>
                        <el-date-picker
                            class="sel"
                            v-model="applicationDate"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions1"
                            value-format="yyyy-MM-dd"
                            :disabled="isReadonly">
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit">总金额</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">票据张数</span>
                        <input class="ipt" type="text" v-model="receiptCount" readonly>
                    </li>
                    <li class="sm" v-show="isShow">
                        <span class="tit">结算方式</span>
                        <el-select class="sel" v-model="payType" placeholder="请选择">
                            <el-option
                                v-for="item in payTypeList"
                                :key="item.value"
                                :label="item.payTypeItem"
                                :value="item.value"
                                disabled>
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm" v-show="isShow">
                        <span class="tit">银行账号</span>
                        <input class="ipt" type="text" v-model="bankName" readonly>
                    </li>
                    <li class="sm" v-show="isShow">
                        <span class="tit">付款日期</span>
                        <input class="ipt" type="text" v-model="simpleConfirmDate" readonly>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" maxlength="50" :readonly="isReadonly">
                            </textarea>
                    </li>
                </ul>
                <div class="line">
                    <span>消费明细</span>
                </div>
                <el-button type="primary" v-if="showGridDataAdd" @click="addClick" class="gridDataAdd" size="small">
                    添加费用单
                </el-button>

                <el-dialog title="费用列表" :visible.sync="dialogTableVisible" showConfirmButton="true">
                    <el-table :data="gridData" class="blueList">
                        <el-table-column property="idString" label="" align="center" width="30px">
                            <template slot-scope="scope">
                                <span class="checkbox">
                                <input name=checked type="checkbox" :value=scope.row.idString
                                       class="inputcheckbox listInput" @click="inputcheckboxClick">
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                            </template>
                        </el-table-column>

                        <el-table-column property="childTypeName" label="类型" align="center"></el-table-column>
                        <el-table-column property="simpleReceiptDate" label="时间" align="center"></el-table-column>
                        <el-table-column property="discription" label="描述" align="center"></el-table-column>
                        <el-table-column property="operateUserName" label="姓名" align="center"></el-table-column>
                        <el-table-column property="money" label="金额" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.showMoney }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <span class="checkbox checkboxAll">
                        <input name=checkAll @change="checkAllChange($event)" type="checkbox"
                               class="inputcheckbox allInput">
                        <i class="iconfont icon-31xuanze"></i>
                    </span>
                    <span class="all">全选</span>
                    <el-button type="primary" class="saveList" @click="saveList" size="small">保存</el-button>
                </el-dialog>

                <el-table class="hkTable grayList" :data="receiptList">
                    <el-table-column prop="childTypeName" label="类型" sortable align="left">
                        <template slot-scope="scope">
                            <img class="logoImg" :src=scope.row.url alt="">
                            <span>{{scope.row.childTypeName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="simpleReceiptDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="discription" label="描述" sortable align="center"></el-table-column>
                    <el-table-column prop="operateUserName" label="姓名" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receiptCount" label="附件张数" sortable align="center"></el-table-column>
                    <el-table-column v-if="showGridDataAdd" prop="money" label="操作" align="center">
                        <template slot-scope="scope">
                            <i class="icon iconfont icon-shanchu red" @click='deleteList(scope.row.idString)'></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in auditRecordList">
                        <img v-if="!item.faceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.faceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            ——
                            <span class="listDepartment">{{item.auditDepartmentName}}</span>
                            <span class="listData">{{item.simpleAuditTime}}</span>
                        </div>
                        <div class="listFooter">
                            <span class="listState">意见：</span>
                            <span class="listContent">{{item.discription}}</span>
                        </div>
                    </li>
                </ul>
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
    export default {
        data () {
            return {
                debitId: this.$route.params.debitId,//传参 ID
                originalTypeName: '',//报销名称
                money: '',//总金额
                simpleConfirmDate: '',//付款日期
                applicationDate: '',//报销日期
                simpleReceiptDate: '',//费用发生日期
                receiptCount: '',//票据张数
                payType: '',//结算方式
                discription: '',//事由
                bankCode: '',//银行账号
                bankName: '',//银行名称
                type: '',
                originalType: '',
                url1: '',//下载报销单地址

                isShare: false,//是否分摊
                isShowShare: true,//是否显示分摊
                department: '',//报销部门
                input1: 0,
                input2: 0,
                input3: 0,
                input4: 0,
                input5: 0,
                select1: '',
                select2: '',
                select3: '',
                select4: '',
                select5: '',
                isShowShareItem1: true,
                isShowShareItem2: true,
                isShowShareItem3: true,
                isShowShareItem4: true,
                isShowShareItem5: true,

                options: [],//报销部门列表
                payTypeList: [//结算方式列表
                    {value:'1',payTypeItem:'现金支付'},
                    {value:'2',payTypeItem:'银行支付'},
                    {value:'3',payTypeItem:'未收付'},
                    {value:'5',payTypeItem:'企业微信'},
                    {value:'6',payTypeItem:'企业支付宝'},
                    {value:'7',payTypeItem:'企业借贷宝'},
                ],
                receiptList: [],//消费明细列表
                nowReceiptList: [],//消费明细列表(临时)

                auditRecordList: [],//审批记录列表
                gridData: [],//费用列表（未选中列表）

                dialogTableVisible: false,//可用的费用单列表状态
                auditFlg: '',//报销单状态： 0 未提交 1 驳回；2/5/6 待审核； 3 待出纳确认；4 通过；7 已红冲；

                originalReceiptIds: '',//费用单id字符串（用逗号拼接）
                originalReceiptIdArr: '',//费用单id字符串（数组形式）

                auditPerson: 1,//是否显示撤回按钮  1 不能撤回；0 可以撤回
                isReadonly: false,//判断查看页面状态，是否可以修改信息
                isShow: false,//判断查看页面状态，是否显示 ‘结算日期/银行账号/付款日期’
                showGridDataAdd: false,//判断查看页面状态，是否显示 ‘添加费用单’按钮
                showBtn1: false,//保存按钮是否显示
                showBtn2: false,//提交按钮是否显示
                showBtn3: false,//撤回按钮是否显示
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                choice:this.$route.params.choice,
                currentPage:this.$route.params.currentPage,
                isRedFlush:this.$route.params.isRedFlush,
                activeName:this.$route.params.activeName,
                isBossSee:this.$route.params.isBossSee,//是否为boss查看页面模式
                loading: true,
                isLoading: false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['current_book_ym','isMonthlyKnots','isAnnualKnots']),
        methods: {
            inputWithSelectChange(n, $event){
                var str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if (!(str.test($event) && $event >= 0 && $event <= 100)) {
                    this.$message.error('请正确输入百分比');
                    if (n == 1) {
                        this.input1 = 0
                    } else if (n == 2) {
                        this.input2 = 0
                    } else if (n == 3) {
                        this.input3 = 0
                    } else if (n == 4) {
                        this.input4 = 0
                    } else if (n == 5) {
                        this.input5 = 0
                    }
                }
            },
            //费用分摊按钮点击事件
            shareClick(){
                this.isShare = !this.isShare
            },
            model(n){
                let applicationDate = Number(this.applicationDate.split('-').join('').substring(0,6));//选择的日期
                let applicationDateYear = Number(this.applicationDate.substring(0,4));//选择的日期的年份
                let current_book_ym = Number(this.current_book_ym);//当前账期日期
                let lastYear = Number(this.current_book_ym.substring(0,4)-1);//去年年份

                this.loading = true
                //找出费用单列表中时间最早的那一个，之后再和报销时间做对比
                let receiptList = this.receiptList;
                let simpleReceiptDate = []//费用单中时间数组
                for(let i in receiptList){//获取所有费用单中时间数组
                    simpleReceiptDate.push(Number((receiptList[i].simpleReceiptDate).split('-').join('')));
                }
                simpleReceiptDate.sort(function(x,y){//将时间数组按照从小到打的的顺序排序
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                });

                if (n == 0) {
                    if(this.isRedFlush) {
                        this.$router.go(-1);
                        return
                    }
                    if(this.isBossSee) {
//                        console.log(this.activeName);
                        this.$router.push({name:'viewingList',params:{activeName:this.activeName,currentPage:this.currentPage}})
                        return
                    }
                    if (this.isShowShare) {
                        this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.push({name:'ReimbursementList',params:{choice:this.choice,currentPage:this.currentPage}})
                        }).catch(() => {
                            this.loading = false
                        });
                    } else {
                        this.$router.push({name:'ReimbursementList',params:{choice:this.choice,currentPage:this.currentPage}})
                    }
                } else if (n == 1) {
                    if (this.isShare) {
                        let input1 = Number(this.input1)
                        let input2 = Number(this.input2)
                        let input3 = Number(this.input3)
                        let input4 = Number(this.input4)
                        let input5 = Number(this.input5)
                        let allInput = parseFloat(input1 + input2 + input3 + input4 + input5).toFixed(2)
//                        console.log(allInput);
                        //判断所有填写的百分比是不是等于100
                        if (allInput != 100) {
                            this.$message.error('请正确输入分摊比例');
                            this.loading = false;
                            return
                        }
                    } else {
                        //没有分摊时是否填写了部门/项目
                        if (this.department == '') {
                            this.$message.error('请选择部门/项目');
                            this.loading = false;
                            return
                        }
                    }
                    if (this.receiptList == '') {
                        this.$message.error('请添加费用单');
                        this.loading = false;
                        return
                    }
                    if (this.applicationDate == '') {
                        this.$message.error('请正确输入报销日期');
                        this.loading = false
                        return
                    } else if (this.type == '' || this.childType1 == '') {
                        this.$message.error('请正确输入费用类别');
                        this.loading = false
                        return
                    } else if (simpleReceiptDate[0] > Number(this.applicationDate.split('-').join(''))) { //判断选择日期不能早于报销日期
                        this.$message.error('报销日期不得早于费用发生日期');
                        this.loading = false
                        return
                    }
                    this.isLoading = true;
                    this.$confirm('确定是否保存？', '提示', {
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
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                } else if (n == 2) {
                    if (this.isShare) {
                        let input1 = Number(this.input1)
                        let input2 = Number(this.input2)
                        let input3 = Number(this.input3)
                        let input4 = Number(this.input4)
                        let input5 = Number(this.input5)
                        let allInput = parseFloat(input1 + input2 + input3 + input4 + input5).toFixed(2)
//                        console.log(allInput);
                        //判断所有填写的百分比是不是等于100
                        if (allInput != 100) {
                            this.$message.error('请正确输入分摊比例');
                            this.loading = false;
                            return
                        }
                    } else {
                        //没有分摊时是否填写了部门/项目
                        if (this.department == '') {
                            this.$message.error('请选择部门/项目');
                            this.loading = false;
                            return
                        }
                    }
                    if (this.receiptList == '') {
                        this.$message.error('请添加费用单');
                        this.loading = false;
                        return
                    }
                    if (this.simpleReceiptDate == '') {
                        this.$message.error('请正确输入报销日期');
                        this.loading = false
                        return
                    }
                    if (this.type == '' || this.childType1 == '') {
                        this.$message.error('请正确输入费用类别');
                        this.loading = false
                        return
                    }
                    if (simpleReceiptDate[0] > Number(this.applicationDate.split('-').join(''))) { //判断选择日期不能早于报销日期
                        this.$message.error('报销日期不得早于费用发生日期');
                        this.loading = false
                        return
                    }

                    if(this.isMonthlyKnots && !this.isAnnualKnots){
                        if((applicationDateYear != lastYear) && applicationDate < current_book_ym){
                            this.$message.error('请正确输入日期');
                            this.loading = false;
                            return
                        }
                    }else{
                        if(applicationDate < current_book_ym ) {
                            this.$message.error('报销日期不得早于当前账期');
                            this.loading = false
                            return
                        }
                    }

                    this.isLoading = true;
                    this.$confirm('确定是否提交？', '提示', {
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
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                } else if (n == 3) {
                    this.isLoading = true;
                    this.$confirm('确定是否撤回？', '提示', {
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
                        this.submit(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = false;
                    });
                }
            },

            submit(n){
                this.loading = true;
                var params = new URLSearchParams();
                var url = ''
                var saveUrl = addUrl.addUrl('seeReimbursementSave')
                var submitUrl = addUrl.addUrl('seeReimbursementSubmit')
                var backUrl = addUrl.addUrl('seeReimbursementBack')
                this.originalReceiptIds = this.originalReceiptIdArr.join(',');
                var money = unNumber.unNumber(this.money);

                var departmentJson = [];
                var options = this.options;

                if (this.isShare) {
                    if (this.input1 != 0 && this.select1 != '') {
                        let item1 = options.filter(x => {
                            return x.id == this.select1
                        })

                        item1[0].rate = this.input1;
                        if (departmentJson.indexOf(item1[0]) == 0) { //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            this.isLoading = false;
                            return
                        } else {
                            departmentJson.push(item1[0])
                        }

                    } else if (this.input1 != 0 && this.select1 == '') {
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input2 != 0 && this.select2 != '') {
                        let item2 = options.filter(x => {
                            return x.id == this.select2
                        })
                        item2[0].rate = this.input2;
                        if (departmentJson.indexOf(item2[0]) == 0) { //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            this.isLoading = false;
                            return
                        } else {
                            departmentJson.push(item2[0])
                        }
                    } else if (this.input2 != 0 && this.select2 == '') {
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input3 != 0 && this.select3 != '') {
                        let item3 = options.filter(x => {
                            return x.id == this.select3
                        })
                        item3[0].rate = this.input3;
                        if (departmentJson.indexOf(item3[0]) == 0) { //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            this.isLoading = false;
                            return
                        } else {
                            departmentJson.push(item3[0])
                        }

                    } else if (this.input3 != 0 && this.select3 == '') {
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input4 != 0 && this.select4 != '') {
                        let item4 = options.filter(x => {
                            return x.id == this.select4
                        })
                        item4[0].rate = this.input4;
                        if (departmentJson.indexOf(item4[0]) == 0) { //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            this.isLoading = false;
                            return
                        } else {
                            departmentJson.push(item4[0])
                        }
                    } else if (this.input4 != 0 && this.select4 == '') {
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input5 != 0 && this.select5 != '') {
                        let item5 = options.filter(x => {
                            return x.id == this.select5
                        })
                        item5[0].rate = this.input5;
                        if (departmentJson.indexOf(item5[0]) == 0) { //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            this.isLoading = false;
                            return
                        } else {
                            departmentJson.push(item5[0])
                        }
                    } else if (this.input5 != 0 && this.select5 == '') {
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }
                } else {
                    let item6 = options.filter(x => {
                        return x.id == this.department
                    })
                    departmentJson.push(item6[0])
                }
                departmentJson = JSON.stringify(departmentJson);//将json格式转成字符串传参
//                console.log(departmentJson);

                if (n == 1) {
                    url = saveUrl
                    params.append('id', this.debitId);
                    params.append('discription', this.discription);
                    params.append('money', money);
                    params.append('departmentJson', departmentJson);
                    params.append('applicationDate', this.applicationDate);
                    params.append('originalReceiptIds', this.originalReceiptIds);
                    params.append('receiptCount', this.receiptCount);
                    params.append('originalType', this.originalType);
                } else if (n == 2) {
                    url = submitUrl
                    params.append('id', this.debitId);
                    params.append('discription', this.discription);
                    params.append('money', money);
                    params.append('departmentJson', departmentJson);
                    params.append('applicationDate', this.applicationDate);
                    params.append('originalReceiptIds', this.originalReceiptIds);
                    params.append('receiptCount', this.receiptCount);
                    params.append('originalType', this.originalType);
                } else if (n == 3) {
                    url = backUrl
                    params.append('applicationId', this.debitId);
                }

                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if (response.data.status == 200) {
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '已成功'
                            });
                        } else if (response.data.status == 400) {
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false
                        this.isLoading = false;
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            //删除消费明细列表项
            deleteList(id){
//                console.log(this.receiptList);
//                console.log(this.nowReceiptList);
                let list = this.receiptList;
                let arr = this.originalReceiptIdArr;
                let money = unNumber.unNumber(this.money)

                this.$confirm('是否删除该信息?', '提示', {
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
                    //将临时删除的明细项存入临时列表nowList，当添加时将临时列表加入进去
                    for (let i = 0; i < list.length; i++) {
                        if (id == list[i].idString) {
                            money -= list[i].money;
                            this.receiptCount -= list[i].receiptCount;
                            list.splice(i, 1)
                        }
                    }
                    for (let i = 0; i < arr.length; i++) {
                        if (id == arr[i]) {
                            arr.splice(i, 1)
                        }
                    }
                    this.money = number.number(money);
                    this.receiptList = list;
                    this.originalReceiptIdArr = arr;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
            //点击添加按钮，弹出费用列表
            addClick(){
                $("input[name=checked]").prop('checked', false);//将所有选项按钮设置为反位
                $('.inputcheckbox').prop('checked', false);//将全选按钮设置为反位
                this.loading = true;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('seeReimbursementList')
                params.append('type', this.type);
                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        let arr = this.originalReceiptIdArr;
                        let data = response.data.value;
                        let nowList = this.nowReceiptList;
                        let newArr1 = [];
                        let newArr2 = [];
                        let newArr3 = [];
                        if (data) {
                            //把已选中列表加进去
                            newArr3 = [...data, ...nowList]
                            if (arr.length == 0) {
                                for (let ii = 0; ii < newArr3.length; ii++) {
                                    newArr2.push(newArr3[ii])
                                }
                            } else {
                                for (let i in arr) {
                                    newArr1[arr[i]] = true
                                }
                                for (let ii in newArr3) {
                                    if (!newArr1[newArr3[ii].idString]) {
                                        newArr2.push(newArr3[ii])
                                    }
                                }
                            }
                            for (let i in newArr2) {
                                newArr2[i].showMoney = number.number(newArr2[i].money)
                            }
                        }
                        this.gridData = newArr2;
                        this.dialogTableVisible = true;
//                        console.log(this.gridData);
                    });

            },
            //取消全选按钮事件
            inputcheckboxClick(){
                let input = $('.listInput')
                input.each(function (i) {
                    if (!$(this).prop('checked')) {
                        $(".allInput").prop('checked', false)
                    }
                })
            },
            //全选按钮change事件
            checkAllChange(e){
                var input = $("input[name=checked]")
                var length = $("input[name=checked]:checked").length;
                if (e.target.checked) {
                    input.prop('checked', true);
                } else {
                    input.prop('checked', false);
                }
            },
            //费用列表保存按钮
            saveList(){
                var input = $("input[name=checked]:checked");
                var str = this.originalReceiptIdArr;
                var gridData = this.gridData;
                var receiptList = this.receiptList;
                var money = unNumber.unNumber(this.money)
//                console.log(input);
                input.each(function (i) {
                    str.push(input[i].value);
                });
                if (gridData) {
                    for (var i = 0; i < gridData.length; i++) {
                        for (var ii = 0; ii < str.length; ii++) {
                            if (gridData[i].idString == str[ii]) {
                                money += gridData[i].money;
                                this.receiptCount += gridData[i].receiptCount;
                                receiptList.push(gridData[i])//把删除的元素添加进数组
                                gridData.splice(i, 1);//删除元素
                            }
                        }
                    }
                    this.money = number.number(money);
                    this.originalReceiptIdArr = str;
                    this.receiptList = this.modifyList(receiptList);
                    this.gridData = gridData;
                }
                this.dialogTableVisible = false;
            },
            modifyList(list){
//                console.log(list);
                for (var i = 0; i < list.length; i++) {
                    list[i].showMoney = number.number(list[i].money)
                    if (list[i].type <= 3) {
                        list[i].url = 'static/images/expense/originalReceipt' + list[i].type + '-' + list[i].childType1 + '.png'
                    } else {
                        list[i].url = 'static/images/expense/originalReceipt' + list[i].type + '.png'
                    }
                }
                return list
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
//            console.log(this.activeName);
            this.url1 = addUrl.addUrl('saveReimbursement')
            this.url1 = this.url1 + '?id=' + this.debitId

//            console.log(this.debitId);
            var params = new URLSearchParams();
            var url = addUrl.addUrl('seeReimbursement')
//            var url = 'http://192.168.2.192:8080/web/vue/application/check.html'
            params.append('id', this.debitId);
            axios.post(url, params)
                .then(response=> {
//                    console.log(response);
                    this.loading = false;
                    var data = response.data.value;
//                    console.log(data);
                    this.originalTypeName = data.application.originalTypeName
                    this.type = data.application.type
                    this.money = number.number(data.application.money)
                    this.simpleConfirmDate = data.application.simpleConfirmDate
                    this.simpleReceiptDate = data.application.simpleReceiptDate
                    this.applicationDate = this.simpleReceiptDate
                    this.payType = String(data.application.payType)
                    this.receiptCount = data.application.receiptCount
                    this.discription = data.application.discription
                    this.originalType = data.application.originalType
                    this.reimbursementDepartment = data.application.departmentIdString
                    this.auditPerson = data.application.auditPerson
                    this.bankCode = data.application.bankCode
                    this.bankName = data.application.bankName
                    this.auditFlg = data.application.auditFlg

                    let auditRecordList = data.auditRecordList;

                    this.auditRecordList = auditRecordList;

                    var receiptList = data.receiptList
//                    console.log(receiptList);
                    this.options = data.departmentList
//                    console.log(this.reimbursementDepartment);
                    var arr = [];
                    var arr2 = []
                    if (receiptList) {
                        for (var i = 0; i < receiptList.length; i++) {
                            arr.push(receiptList[i].idString)
                            arr2.push(receiptList[i])
                            receiptList[i].showMoney = number.number(receiptList[i].money);
                        }
                    }
                    this.originalReceiptIdArr = arr;

                    this.receiptList = this.modifyList(receiptList);
                    this.nowReceiptList = arr2;

                    var divideFlg = data.application.divideFlg;//判断是否为分摊 0 为未分摊 1为分摊
                    if (divideFlg == 0) {
                        this.isShare = false
                        this.department = data.application.departmentIdString1
                    } else {
                        this.isShare = true;
                        this.select1 = data.application.departmentIdString1
                        this.select2 = data.application.departmentIdString2
                        this.select3 = data.application.departmentIdString3
                        this.select4 = data.application.departmentIdString4
                        this.select5 = data.application.departmentIdString5

                        this.input1 = data.application.projectDivRate || 0
                        this.input2 = data.application.projectDivRate2 || 0
                        this.input3 = data.application.projectDivRate3 || 0
                        this.input4 = data.application.projectDivRate4 || 0
                        this.input5 = data.application.projectDivRate5 || 0
                        if (data.application.departmentIdString1 == '0' || data.application.departmentIdString1 == 'null') {
                            this.isShowShareItem1 = false
                        }
                        if (data.application.departmentIdString2 == '0' || data.application.departmentIdString2 == 'null') {
                            this.isShowShareItem2 = false
                        }
                        if (data.application.departmentIdString3 == '0' || data.application.departmentIdString3 == 'null') {
                            this.isShowShareItem3 = false
                        }
                        if (data.application.departmentIdString4 == '0' || data.application.departmentIdString4 == 'null') {
                            this.isShowShareItem4 = false
                        }
                        if (data.application.departmentIdString5 == '0' || data.application.departmentIdString5 == 'null') {
                            this.isShowShareItem5 = false
                        }
                    }

                    var index = this.auditFlg;
//                    console.log(index);
                    //当index 0 未提交 1 驳回； 显示 ‘添加费用单’按钮
//                    console.log(this.auditPerson);
                    if (index < 2) {
                        this.showGridDataAdd = true;
                        this.showBtn1 = true;
                        this.showBtn2 = true;
                        this.isShowShare = true;
                    } else if (index == 4 || index == 7) {//当index 4 通过；7 已红冲；显示 ‘结算日期/银行账号/付款日期’
                        this.isShow = true;
                        this.isReadonly = true;
                        this.isShowShare = false
                    } else if (index == 2 || index == 3) {
                        if (this.auditPerson == 0) {
                            this.showBtn3 = true
                        }
                        this.isReadonly = true;
                        this.isShowShare = false
                    } else {
                        this.isReadonly = true;
                        this.isShowShare = false
                    }
                    //当为boss查看模式时
                    if(this.isBossSee){
                        this.isShow = true;
                        this.isReadonly = true;
                        this.isShowShare = false
                        this.showGridDataAdd = false
                    }
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
    .w {
        text-align: center;
        font-size: 0px;
    }

    .top {
        margin: 20px 0;
        text-align: center;
        position: relative;
    }

    h2 {
        font-size: 18px;
        display: inline-block;
    }

    .back {
        position: absolute;
        right: 30px;
        font-size: 12px;
    }

    .content {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
        overflow-y: auto;
    }

    .list {
        width: 100%;
        text-align: left;
    }

    .list li {
        display: inline-block;
        height: 36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
    }

    .list .sm {
        width: 50%;
    }

    .list .pt {
        width: 100%;
        height: 80px;
    }

    .list .ptx {
        width: 100%;
        height: 170px;
    }

    .list li .ipt {
        display: inline-block;
        width: 300px;
        height: 28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }

    .list li .sel {
        width: 322px;
        height: 36px;
    }

    .list li .tit {
        font-size: 14px;
        display: inline-block;
        width: 150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }

    .list li .tit2 {
        font-size: 14px;
        display: inline-block;
        width: 150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }

    .list li .tex {
        width: 76.8%;
        height: 60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }

    .list li .uploadBox {
        display: inline-block;
        width: 78.7%;
        padding: 3px 10px;
    }

    .top .sub1 {
        position: absolute;
        right: 110px;
        font-size: 12px;
    }
    .top .sub2 {
        position: absolute;
        right: 190px;
        font-size: 12px;
    }
    .sub3 {
        display: inline-block;
        width: 80px;
        height: 30px;
        color: #fff;
        background-color: #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-decoration: none;
        position: absolute;
        left: 10px;
        font-size: 12px;
    }

    .approval {
        width: 100%;
        margin-top: 20px;
        font-size: 14px;
    }

    .approval li {
        margin-top: 20px;
        text-align: left;
    }

    .approval li img {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-left: 80px;
        margin-right: 20px;
    }

    .approval li .listHeader {
        display: inline-block;
        float: left;
        width: 80%;
    }

    .approval li .listHeader .listName {

        margin-right: 10px;
    }

    .approval li .listHeader .listDepartment {
        margin-left: 10px;
    }

    .approval li .listHeader .listData {
        float: right;
    }

    .approval li .listFooter {
        display: inline-block;
        float: left;
        width: 80%;
        margin-top: 10px;
    }

    .approval li .listFooter .listState {
        display: inline-block;
        float: left;
        margin-right: 10px;
    }

    .approval li .listFooter .listContent {
        width: 90%;
        display: inline-block;
        float: left;
        height: 50px;
        overflow: hidden;
    }

    .dialogImageName {
        font-size: 16px;
    }

    .approval-opinion {
        font-size: 16px;
        margin-top: 30px;
    }

    .approval-opinion li {
        margin-top: 30px;
        text-align: center;
    }

    .approval-opinion li span {
        display: inline-block;
        width: 100px;
        height: 22px;
        vertical-align: top;
    }

    .approval-opinion li select {
        display: inline-block;
        width: 80%;
        height: 30px;
        text-align: center;
        padding: 2px 35%;
        border: none;
        border-bottom: 1px solid #ccc;
    }

    .approval-opinion li .bankCode {
        width: 700px;
        height: 30px;
        text-align: center;
        border: none;
    }

    .checkbox {
        position: relative;
        display: inline-block;
        overflow: hidden;
        width: 18px;
        height: 18px;
        border-radius: 3px;
        border: 1px solid #bfbfbf;
        margin: 10px 0px;
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
        font-size: 20px;
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

    .checkbox input[type="checkbox"]:checked + i {
        display: block;
    }

    .checkbox.disabled {
        background-color: #ccc;
    }

    .opinionItem #opinionItem {
        display: inline-block;
        width: 680px;
        height: 50px;
        padding: 5px 10px;
        resize: none;
        font-size: 14px;
        border-radius: 3px;
    }

    .gridDataAdd {
        display: block;
        margin: 10px;
        float: right;
    }

    .all {
        display: inline-block;
        font-size: 16px;
        margin-top: 10px;
        margin-left: -80%;
    }

    .checkboxAll {
        margin: 10px 10px;
    }

    .saveList {
        position: absolute;
        bottom: 10px;
        right: 50px;
    }

    .grayList {
        margin: 30px 0;
    }

    .logoImg {
        width: 22px;
        height: 22px;
    }

    .list li .input-with-select {
        font-size: 14px;
        width: 322px;
        text-align: right;
    }

    .list .hd {
        width: 100%;
    }

    .share {
        display: block;
        margin-top: 10px;
        margin-left: 80px;
    }

    .input-select {
        width: 200px;
    }

</style>
