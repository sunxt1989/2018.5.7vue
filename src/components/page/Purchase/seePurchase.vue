<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>查看采购单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1" v-show="!isAuditPerson && !isBossSee" :loading="isLoading">保存</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2" v-show="!isAuditPerson && !isBossSee" :loading="isLoading">提交</el-button>
                <el-button @click="model(3)"  size="small" type="danger" class="sub1" v-show="showBtn && !isBossSee" :loading="isLoading">撤回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>查看采购单</span>
                </div>
                <el-button type="danger" plain size="small" class="share" v-if="isShowShare" @click="shareClick">
                    <span v-show="!isShare">费用分摊</span>
                    <span v-show="isShare">取消费用分摊</span>
                </el-button>
                <ul class="list cf">
                    <li class="hd" v-show="!isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-select class="sel" v-model="department" placeholder="请选择" :disabled="isReadonly">
                            <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>

                    <li class="sm" v-if="isShowShareItem1" v-show="isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input1" class="input-with-select" @change="inputWithSelectChange(1,$event)" :readonly="isReadonly">
                            <el-select v-model="select1" slot="prepend" placeholder="请选择" class="input-select" :disabled="isReadonly">
                                <el-option
                                    v-for="item in options4"
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
                        <el-input placeholder="分摊比例" v-model="input2" class="input-with-select" @change="inputWithSelectChange(2,$event)" :readonly="isReadonly">
                            <el-select v-model="select2" slot="prepend" placeholder="请选择" class="input-select" :disabled="isReadonly">
                                <el-option
                                    v-for="item in options4"
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
                        <el-input placeholder="分摊比例" v-model="input3" class="input-with-select" @change="inputWithSelectChange(3,$event)" :readonly="isReadonly">
                            <el-select v-model="select3" slot="prepend" placeholder="请选择" class="input-select" :disabled="isReadonly">
                                <el-option
                                    v-for="item in options4"
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
                        <el-input placeholder="分摊比例" v-model="input4" class="input-with-select" @change="inputWithSelectChange(4,$event)" :readonly="isReadonly">
                            <el-select v-model="select4" slot="prepend" placeholder="请选择" class="input-select" :disabled="isReadonly">
                                <el-option
                                    v-for="item in options4"
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
                        <el-input placeholder="分摊比例" v-model="input5" class="input-with-select" @change="inputWithSelectChange(5,$event)" :readonly="isReadonly">
                            <el-select v-model="select5" slot="prepend" placeholder="请选择" class="input-select" :disabled="isReadonly">
                                <el-option
                                    v-for="item in options4"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <template slot="append">%</template>
                        </el-input>
                    </li>
                </ul>

                <ul class="list cf">
                    <li class="sm" style="width:48.2%; position: relative;">
                        <span class="tit"><span class="red">*</span>供应商</span>
                        <el-select class='sel' v-model="tradeName" :disabled="isAuditPerson">
                            <el-option v-for="item in supplierList"
                                       :key="item.value"
                                       :label="item.tradeName"
                                       :value="item.tradeName">
                            </el-option>
                        </el-select>
                        <input v-if="!isAuditPerson" class="opt" type="text" v-model="tradeName" maxlength="18" placeholder="请选择或输入">
                    </li>
                    <li class="sm" >
                        <span class="tit" style="width:170px;">统一社会信用代码/身份证</span>
                        <input class="ipt" type="text" v-model="supplierIdNumber" maxlength="18" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit">地址</span>
                        <input class="ipt" type="text" v-model="supplierAddress" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit">固定电话</span>
                        <input class="ipt" type="text" v-model="supplierTelephone" maxlength="15" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit">联系人</span>
                        <input class="ipt" type="text" v-model="supplierPerson1" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit">联系电话</span>
                        <input class="ipt" type="text" v-model="supplierPersonPhone1" maxlength="15" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit">紧急联系人</span>
                        <input class="ipt" type="text" v-model="supplierPerson2" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit2">紧急联系电话</span>
                        <input class="ipt" type="text" v-model="supplierPersonPhone2" maxlength="15" :readonly="isAuditPerson">
                    </li>
                    <li class="sm">
                        <span class="tit"><span class="red">*</span>采购类别</span>
                        <el-select class="sel" type="text" v-model="type" @change="typeChange" :disabled="isAuditPerson">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>发票类别</span>
                        <el-select class="sel" type="text" v-model="taxFlg" :disabled="isAuditPerson">
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>日期</span>
                        <el-date-picker
                            class="iptData"
                            v-model="purchaseDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期" :readonly="isAuditPerson">
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>含税总价</span>
                        <input class="ipt" type="text" v-model="totalMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit2"><span class="red">*</span>不含税总价</span>
                        <input class="ipt" type="text" v-model="unTotalMoney" readonly>
                    </li>
                </ul>
                <div class="line">
                    <span>采购明细</span>
                </div>
                <el-button type="primary" @click="addClick" class="gridDataAdd" size="small" v-if="!isAuditPerson">添加明细</el-button>

                <el-dialog title="新建明细" :visible.sync="dialogTableVisible" :before-close="beforeCloseDialog" showConfirmButton="true" width="1100px">
                    <ul class="newList cf">
                        <li class="sm cf" v-show="isShowLow">
                            <span class="tit3"><span class="red">*</span>设备类别</span>
                            <el-select class="sel" v-model="classCode" placeholder="请选择" @change="deviceChange">
                                <el-option
                                    v-for="item in deviceList"
                                    :key="item.value"
                                    :label="item.className"
                                    :value="item.classCode">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="sm cf">
                            <span class="tit3">单位</span>
                            <input class="ipt" type="text" v-model="newUnit">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>含税总价</span>
                            <input class="ipt" type="text" v-model.lazy="newTotalMoney" @change="newTotalMoneyChange" maxlength="14">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>税率</span>
                            <el-select class="sel" v-model="newTaxRate" placeholder="请选择" @change="newTaxRateChange">
                                <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>税额</span>
                            <input class="ipt" type="text" v-model="newTaxAmount" @blur="newTaxAmountBlur">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>金额</span>
                            <input class="ipt" type="text" v-model="newMoney" @blur="newMoneyBlur">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>数量</span>
                            <input class="ipt" type="text" v-model.lazy="newNum" :disabled="isShowCount" maxlength="4">
                        </li>
                        <li class="sm cf">
                            <span class="tit3">单价</span>
                            <input class="ipt" type="text" v-model="newUnitPrice" disabled>
                        </li>
                        <li class="pt cf">
                            <span class="tit3"><span class="red">*</span>明细</span>
                            <textarea class="tex" v-model="newDetailed" maxlength="50">
                            </textarea>
                        </li>
                    </ul>
                    <el-button @click="newBack" class="newBack" size="small">返回</el-button>
                    <el-button @click="newSave(0)" class="newSave" size="small" type="primary">保存</el-button>
                    <el-button @click="newSave(1)" class="newAgain" size="small">再录一笔</el-button>
                </el-dialog>

                <el-dialog title="修改明细" :visible.sync="dialogSseTableVisible" :before-close="beforeCloseDialog" showConfirmButton="true" width="1100px">
                    <ul class="newList cf">
                        <li class="sm cf" v-show="isShowLow">
                            <span class="tit3"><span class="red">*</span>设备类别</span>
                            <el-select class="sel" v-model="classCode" placeholder="请选择" @change="deviceChange">
                                <el-option
                                    v-for="item in deviceList"
                                    :key="item.value"
                                    :label="item.className"
                                    :value="item.classCode">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="sm cf">
                            <span class="tit3">单位</span>
                            <input class="ipt" type="text" v-model="newUnit">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>含税总价</span>
                            <input class="ipt" type="text" v-model.lazy="newTotalMoney" @change="newTotalMoneyChange" maxlength="14">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>税率</span>
                            <el-select class="sel" v-model="newTaxRate" placeholder="请选择" @change="newTaxRateChange">
                                <el-option
                                    v-for="item in options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>税额</span>
                            <input class="ipt" type="text" v-model="newTaxAmount" @blur="newTaxAmountBlur">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>金额</span>
                            <input class="ipt" type="text" v-model="newMoney" @blur="newMoneyBlur">
                        </li>
                        <li class="sm cf">
                            <span class="tit3"><span class="red">*</span>数量</span>
                            <input class="ipt" type="text" v-model.lazy="newNum" :disabled="isShowCount" maxlength="4">
                        </li>
                        <li class="sm cf">
                            <span class="tit3">单价</span>
                            <input class="ipt" type="text" v-model="newUnitPrice" disabled>
                        </li>
                        <li class="pt cf">
                            <span class="tit3"><span class="red">*</span>明细</span>
                            <textarea class="tex" v-model="newDetailed" maxlength="50">
                            </textarea>
                        </li>
                    </ul>
                    <el-button @click="seeBack" class="newBack" size="small">返回</el-button>
                    <el-button @click="seeSave" class="newSave" size="small" type="primary">保存</el-button>
                </el-dialog>

                <el-table :data="newList1" class="grayList" v-show="isShowLow">
                    <el-table-column property="className" label="设备类别" align="center" ></el-table-column>
                    <el-table-column property="commodityName" label="明细" align="center" width="80px"></el-table-column>
                    <el-table-column property="unit" label="单位"  align="center"></el-table-column>
                    <el-table-column property="newTotalMoney" label="含税总价"  align="center"></el-table-column>
                    <el-table-column property="count" label="数量" align="center"></el-table-column>
                    <el-table-column property="perPrice" label="单价" align="center"></el-table-column>
                    <el-table-column property="money" label="金额" align="center"></el-table-column>
                    <el-table-column property="taxRate" label="税率" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.taxRate}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="taxMoney" label="税额" align="center"></el-table-column>
                    <el-table-column property="" label="操作" align="center" v-if="!isAuditPerson">
                        <template slot-scope="scope">
                                <span class="operation" >
                                    <i class="icon iconfont icon-bianji blue" @click="seeList1(scope.row.id)"></i>
                                </span>
                                <span class="operation">
                                    <i class="icon iconfont icon-shanchu red"  @click="newListDelete1(scope.row.id)"></i>
                                </span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="newList2" class="grayList" v-show="!isShowLow">
                    <el-table-column property="commodityName" label="明细" align="center"></el-table-column>
                    <el-table-column property="unit" label="单位"  align="center" width="80px"></el-table-column>
                    <el-table-column property="newTotalMoney" label="含税总价"  align="center"></el-table-column>
                    <el-table-column property="count" label="数量" align="center"></el-table-column>
                    <el-table-column property="perPrice" label="单价" align="center"></el-table-column>
                    <el-table-column property="money" label="金额" align="center"></el-table-column>
                    <el-table-column property="taxRate" label="税率" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.row.taxRate}}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="taxMoney" label="税额" align="center"></el-table-column>
                    <el-table-column property="" label="操作" align="center" v-if="!isAuditPerson">
                        <template slot-scope="scope">
                                <span class="operation">
                                    <i class="icon iconfont icon-bianji blue" @click="seeList2(scope.row.id)"></i>
                                </span>
                                <span class="operation">
                                    <i class="icon iconfont icon-shanchu red" @click="newListDelete2(scope.row.id)"></i>
                                </span>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="upload cf">
                    <span class="tit2">附件</span>
                    <div class="uploadBox">
                        <el-upload
                            action="http://192.168.2.190:8080/web/upload2.html"
                            list-type="picture-card"
                            ref="upload"
                            :show-file-list=true
                            :limit='limit'
                            :http-request="myUpload"
                            :on-preview="handlePictureCardPreview"
                            :before-upload='beforeAvatarUpload'
                            :on-exceed="onExceed"
                            :on-error="onError"
                            :on-change='onChange'
                            :on-remove='onRemove'
                            :file-list="attachUrlJson"
                            :auto-upload="false"
                            :disabled="isAuditPerson">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <h2 class="dialogImageName">{{dialogImageName}}</h2>
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in auditRecordList">
                        <img v-if="!item.faceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.faceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            <span class="listDepartment" v-if="item.auditDepartmentName != ''">——{{item.auditDepartmentName}}</span>
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
    export default{
        data(){
            return{
                n:'',//按钮点击变量
                purchase:[],//报销数据列表
                options4:[],//报销部门列表
                isShare:false,//是否分摊
                isShowShare:true,//是否显示分摊
                isReadonly:false,//判断查看页面状态，是否可以修改信息
                department:'',//报销部门
                input1:0,
                input2:0,
                input3:0,
                input4:0,
                input5:0,
                select1:'',
                select2:'',
                select3:'',
                select4:'',
                select5:'',
                isShowShareItem1:true,
                isShowShareItem2:true,
                isShowShareItem3:true,
                isShowShareItem4:true,
                isShowShareItem5:true,

                purchaseId:this.$route.params.purchaseId,
                tradeName:'',//供应商
                supplierList:[],//供应商列表
                supplierIdNumber:'',//统一社会信用代码
                supplierAddress:'',//地址
                supplierTelephone:'',//固定电话
                supplierPerson1:'',//联系人
                supplierPersonPhone1:'',//联系电话
                supplierPerson2:'',//紧急联系人
                supplierPersonPhone2:'',//紧急联系电话
                type:'1',//采购类别类别
                options:[//采购类别列表
                    {value:'1',label:'设备'},
                    {value:'2',label:'软件'},
                    {value:'3',label:'劳务服务'},
                    {value:'4',label:'技术服务'},
                    {value:'5',label:'库存商品'},
                    {value:'11',label:'专利技术'},
                    {value:'12',label:'非专利技术'},
                    {value:'13',label:'商标'},
                    {value:'14',label:'著作权'},
                    {value:'20',label:'委托研发'},
                ],
                taxFlg:'1',//发票类别
                options2:[//发票类别列表
                    {value:'1',label:'增值税专用发票'},
                    {value:'2',label:'增值税普通发票'},
                    {value:'3',label:'增值税电子普通发票'},
                    {value:'4',label:'未开具发票'},
                ],
                purchaseDate:'',//日期
                totalMoney:'',//含税总价
                unTotalMoney:'',//不含税总价
                auditRecordList:[],//审批记录

                newList1:[],//新建明细列表（设备）
                newList2:[],//新建明细列表（其他）

                totalMoney1:'',//含税总价1
                unTotalMoney1:'',//不含税总价1

                totalMoney2:'',//含税总价2
                unTotalMoney2:'',//不含税总价2


                //模态框内明细列表
                deviceList:[],//明细列表，设备类别
                classCode:'',//设备类别编号(明细列表)
                className:'',//设备类别名称(明细列表)
                newUnit:'',//单位(明细列表)
                newNum:1,//数量(明细列表)
                newTotalMoney:'0.00',//含税总价(明细列表)
                newTaxRate:0,//税率(明细列表)
                newUnitPrice:0,//单价(明细列表)
                newMoney:'0.00',//金额(明细列表)
                newTaxAmount:'0.00',//税额(明细列表)

                options3:[//发票类别列表
                    {value:0,label:'免税'},
                    {value:3,label:'3%'},
                    {value:5,label:'5%'},
                    {value:6,label:'6%'},
                    {value:10,label:'10%'},
                    {value:11,label:'11%'},
                    {value:16,label:'16%'},
                    {value:17,label:'17%'}
                ],
                newDetailed:'',//明细(明细列表)
                newId:1,//明细列表id
                SeeId:0,//查看明细列表id
                isI:0,//newList下标

                isShowLow:true,//是否显示明细列表 设备相关信息列
                isShowCount:false,//明细列表数量列是否可填


                dialogTableVisible:false,//新建明细模态框是否显示
                dialogSseTableVisible:false,//查看明细模态框是否显示

                attachUrlJson:[],//上传图片展示
                dialogImageUrl: '',//展示图片URL
                dialogImageName: '',//展示图片名称
                dialogVisible: false,//dialog是否打开状态
                limit:4,//上传图片最大张数
                punch:0,//打点器,判断是否有图片上传
                punch2:0,//打点器
                punch3:0,//打点器 临时变量保存punch ，当上传图片时有不符合规定的图片出现时会发生继续上传的bug
                fileList:[],//上传成功展示图片参数

                allBase:[],//所有base64格式的地址
                allName:[],//所有namen名称
                imgUrl1:'',//上传图片url
                imgName1:'',//上传图片name
                imgUrl2:'',
                imgName2:'',
                imgUrl3:'',
                imgName3:'',
                imgUrl4:'',
                imgName4:'',
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                isAuditPerson:false,//审批流程 true为已审批 false为无人审批
                showBtn:false,//是否显示撤回按钮
                choice:this.$route.params.choice,
                currentPage:this.$route.params.currentPage,
                activeName:this.$route.params.activeName,
                isBossSee:this.$route.params.isBossSee,//是否为boss查看页面模式
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        watch:{
            newList1:function(val){
//                console.log(val);
                var totalMoney = 0;
                var unTotalMoney = 0;
                for(var i = 0; i < val.length; i++){
                    unTotalMoney += parseFloat(unNumber.unNumber(val[i].money))
                    totalMoney += parseFloat(unNumber.unNumber(val[i].taxMoney))
                }
                totalMoney += unTotalMoney;
                this.totalMoney1 = number.number(totalMoney.toFixed(2));
                this.unTotalMoney1 = number.number(unTotalMoney.toFixed(2));

                this.totalMoney = this.totalMoney1
                this.unTotalMoney = this.unTotalMoney1
            },
            newList2:function(val){
//                console.log(val);
                var totalMoney = 0;
                var unTotalMoney = 0;
                for(var i = 0; i < val.length; i++){
                    unTotalMoney += parseFloat(unNumber.unNumber(val[i].money));
                    totalMoney += parseFloat(unNumber.unNumber(val[i].taxMoney));
                }
                totalMoney += unTotalMoney;
                this.totalMoney2 = number.number(totalMoney.toFixed(2));
                this.unTotalMoney2 = number.number(unTotalMoney.toFixed(2));

                this.totalMoney = this.totalMoney2
                this.unTotalMoney = this.unTotalMoney2
            },
            type:function(newVal,oldVal){
//                console.log(this.unTotalMoney1);
                if(oldVal != '1' && newVal != '1' && this.newList2.length != 0){
                    this.$confirm('修改采购类别后，采购明细中项目所有采购类别将一同变化，是否清空采购明细列表?(设备明细列表不清空)', '提示', {
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        this.newList2 = [];
                    }).catch(() => {
                    });
                }
                if(newVal == '1'){
                    this.totalMoney = this.totalMoney1
                    this.unTotalMoney = this.unTotalMoney1
                }else{
                    this.totalMoney = this.totalMoney2
                    this.unTotalMoney = this.unTotalMoney2
                }
//                console.log(this.totalMoney);
//                console.log(this.unTotalMoney);
            },
            tradeName:function(val){
                let tradeName = val;
                let supplierList = this.supplierList
                let purchase = this.purchase
                if(purchase.supplierName == tradeName){
                    this.supplierIdNumber = purchase.supplierIdNumber || '';
                    this.supplierTelephone = purchase.supplierTelephone || '';
                    this.supplierPerson1 = purchase.supplierPerson1 || '';
                    this.supplierPerson2 = purchase.supplierPerson2 || '';
                    this.supplierPersonPhone1 = purchase.supplierPersonPhone1 || '';
                    this.supplierPersonPhone2 = purchase.supplierPersonPhone2 || '';
                    this.supplierAddress = purchase.supplierAddress || '';
                }else {
                    for (var i = 0; i < supplierList.length; i++) {
                        if (tradeName == supplierList[i].tradeName || tradeName == supplierList[i].tradeIdNumber) {
                            this.supplierIdNumber = purchase.supplierIdNumber || '';
                            this.supplierTelephone = purchase.supplierTelephone || '';
                            this.supplierPerson1 = purchase.supplierPerson1 || '';
                            this.supplierPerson2 = purchase.supplierPerson2 || '';
                            this.supplierPersonPhone1 = purchase.supplierPersonPhone1 || '';
                            this.supplierPersonPhone2 = purchase.supplierPersonPhone2 || '';
                            this.supplierAddress = purchase.supplierAddress || '';
                        }
                    }
                }
            },
            //数量
            newNum:function(val){
                let str = /^\d+$/;//判断只允许输入正整数
                if(!str.test(val)){
                    this.$message.error('请正确输入数量');
                    this.newNum = 1;
                }
                let newTotalMoney = unNumber.unNumber(this.newTotalMoney)
                let newTaxRate = this.newTaxRate / 100;
                this.newUnitPrice = (newTotalMoney / (1 + newTaxRate) / this.newNum).toFixed(9);//单价
            }
        },
        computed:{
            ...mapState({
                current_book_ym:state => state.current_book_ym,
                isMonthlyKnots:state => state.isMonthlyKnots,
                isAnnualKnots:state => state.isAnnualKnots,
            }),
            //计算出的金额(明细列表)
            computerMoney:function(){
                let newTotalMoney = unNumber.unNumber(this.newTotalMoney)
                let newTaxRate = this.newTaxRate / 100;
                return newTotalMoney / (1 + newTaxRate)
            },
            //计算出的税额(明细列表)
            computerTaxAmount:function(){
                let newTotalMoney = unNumber.unNumber(this.newTotalMoney)
                let newTaxRate = this.newTaxRate / 100;
                return newTotalMoney / (1 + newTaxRate) * newTaxRate
            }
        },
        methods: {
            inputWithSelectChange(n,$event){
                let str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
                if(!(str.test($event) && $event >= 0 && $event <= 100)){
                    this.$message.error('请正确输入百分比');
                    if(n == 1){
                        this.input1 = 0
                    }else if(n == 2){
                        this.input2 = 0
                    }else if(n == 3){
                        this.input3 = 0
                    }else if(n == 4){
                        this.input4 = 0
                    }else if(n == 5){
                        this.input5 = 0
                    }
                }
            },
            //费用分摊按钮点击事件
            shareClick(){
                this.isShare = !this.isShare
            },
            //采购类别change事件，当选择设备时明细列表进行修改
            typeChange(){
                let type = this.type;
                //type=1时 选择了设备，isShowLow = true；
//                console.log(type);
                if(this.newList1.length != 0 || this.newList2.length != 0){
                    this.$confirm('修改采购类别后，采购明细中项目所有采购类别将一同变化，是否清空采购明细列表?','提示',{
                        confirmButtonText: '是',
                        cancelButtonText: '否',
                        type: 'warning'
                    }).then(() => {
                        this.newList1 = [];
                        this.newList2 = [];
                    }).catch(() => {

                    });
                }
                if(type == '1'){
                    this.isShowLow = true
                    this.isShowCount = false
                }else if(type == '5'){
                    this.isShowLow = false
                    this.isShowCount = false
                }else{
                    this.isShowLow = false
                    this.isShowCount = true
                    if(this.newList2){
                        let totalMoney = 0;
                        let unTotalMoney = 0;
                        for(let i in this.newList2){
                            this.newList2[i].count = 1;
                            this.newList2[i].money = this.newList2[i].perPrice
                            this.newList2[i].taxMoney = unNumber.unNumber(this.newList2[i].money) * this.newList2[i].taxRate / 100;
                            unTotalMoney += parseFloat(unNumber.unNumber(this.newList2[i].money))
                            totalMoney += parseFloat(unNumber.unNumber(this.newList2[i].taxMoney))
                        }

                        totalMoney += unTotalMoney;
                        this.totalMoney2 = number.number(totalMoney.toFixed(2));
                        this.unTotalMoney2 = number.number(unTotalMoney.toFixed(2));

                        this.totalMoney = this.totalMoney2
                        this.unTotalMoney = this.unTotalMoney2
                    }
                }
//                console.log(this.isShowCount);
            },

            //before模态框事件：
            //打开新建明细模态框
            addClick(){
                this.dialogTableVisible = true;
            },
            //关闭之前的回调
            beforeCloseDialog(done){
                this.$confirm('填写的信息还未保存,确认关闭？')
                    .then(() => {
                        this.classCode ='';
                        this.className ='';
                        this.newDetailed ='';
                        this.newNum = 1;
                        this.newTaxRate = 0;
                        this.newTotalMoney = '0.00';
                        this.newUnit ='';
                        this.newTaxAmount ='0.00';
                        this.newMoney ='0.00';
                        this.newUnitPrice = '0.00';
                        done();
                    })
                    .catch(() => { });
            },
            //保存和再录一笔 n=0时为保存
            newSave(n){
                let deviceList = this.deviceList
                let classCode = this.classCode;
                let id = this.newId;
                let obj = {
                    classCode:'',
                    className:'',
                    commodityName:'',
                    newTotalMoney:'0.00',
                    perPrice:'',
                    count:'',
                    taxRate:'',
                    money:'',
                    taxMoney:'',
                    unit:'',
                    id:''
                };

                if(this.isShowLow) {
                    if (this.classCode == '') {
                        this.$message.error('请正确输入设备类别');
                        this.loading = false;
                        return
                    }else if (this.newTotalMoney == '0.00') {
                        this.$message.error('请正确输入价税合计');
                        this.loading = false;
                        return
                    }else if (this.newNum == 0) {
                        this.$message.error('请正确输入数量');
                        this.loading = false;
                        return
                    }else if (this.newDetailed == '') {
                        this.$message.error('请正确输入明细');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确认保存此条目？')
                        .then(() => {
                            //根据设备类别的编号，给设备名称赋值
                            for(var i = 0; i < deviceList.length; i++){
                                if(classCode == deviceList[i].classCode){
                                    this.className = deviceList[i].className
                                }
                            };
                            obj.classCode = this.classCode;//设备类别的编号
                            obj.className = this.className;//设备名称
                            obj.commodityName = this.newDetailed;//设备明细
                            obj.newTotalMoney = this.newTotalMoney;//含税总价
                            obj.perPrice = this.newUnitPrice;//不含税单价
                            obj.count = this.newNum;//数量
                            obj.taxRate = this.newTaxRate;//税率
                            obj.money = this.newMoney;//不含税金额
                            obj.taxMoney = this.newTaxAmount;//税额
                            obj.unit = this.newUnit;//单位
                            obj.id = id;//该条目id
//                            console.log(obj);

                            this.newList1.push(obj);
                            id++;
                            this.newId = id;
                            this.classCode ='';
                            this.className ='';
                            this.newDetailed ='';
                            this.newNum = 1;
                            this.newTotalMoney = '0.00';
                            this.newTaxRate = 0;
                            this.newUnit ='';
                            this.newTaxAmount ='0.00';
                            this.newMoney ='0.00';
                            this.newUnitPrice = '0.00';
                            if(n == 0){
                                this.dialogTableVisible = false;
                            }
                        })
                        .catch(() => { });
                }else{
                    if (this.newTotalMoney == '0.00') {
                        this.$message.error('请正确输入含税总价');
                        this.loading = false;
                        return
                    }else if (this.newDetailed == '') {
                        this.$message.error('请正确输入明细');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确认保存此条目？')
                        .then(() => {
                            //根据设备类别的编号，给设备名称赋值
                            for(var i = 0; i < deviceList.length; i++){
                                if(classCode == deviceList[i].classCode){
                                    this.className = deviceList[i].className
                                }
                            };

                            obj.commodityName = this.newDetailed;//明细
                            obj.newTotalMoney = this.newTotalMoney;//含税总价
                            obj.perPrice = this.newUnitPrice;//不含税单价
                            obj.taxRate = this.newTaxRate;//税率
                            obj.count = this.newNum;//数量
                            obj.money = this.newMoney;//不含税金额
                            obj.taxMoney = this.newTaxAmount;//税额
                            obj.unit = this.newUnit;//单位
                            obj.id = id;//该条目id
//                            console.log(obj);
                            this.newList2.push(obj);
                            id++;
                            this.newId = id;
                            this.classCode ='';
                            this.className ='';
                            this.newDetailed ='';
                            this.newTotalMoney = '0.00';
                            this.newNum = 1;
                            this.newTaxRate = 0;
                            this.newUnit ='';
                            this.newTaxAmount ='0.00';
                            this.newMoney ='0.00';
                            this.newUnitPrice = '0.00';
                            if(n == 0){
                                this.dialogTableVisible = false;
                            }
                        })
                        .catch(() => {
                        });
                }
            },
            //返回按钮
            newBack(){
                this.$confirm('填写的信息还未保存,确认关闭？')
                    .then(() => {
                        this.classCode ='';
                        this.className ='';
                        this.newDetailed ='';
                        this.newNum = 1;
                        this.newTaxRate = 0;
                        this.newTotalMoney = '0.00';
                        this.newUnit ='';
                        this.newTaxAmount ='0.00';
                        this.newMoney ='0.00';
                        this.newUnitPrice = '0.00';
                        this.dialogTableVisible = false;
                    })
                    .catch(() => { });
            },
            //查看明细列表1事件
            seeList1(id){
                var newList1 = this.newList1
                for(var i =0; i < newList1.length; i++){
                    if(id == newList1[i].id){
                        this.classCode = newList1[i].classCode
                        this.className = newList1[i].className
                        this.newDetailed = newList1[i].commodityName
                        this.newNum = newList1[i].count
                        this.newTaxRate = newList1[i].taxRate
                        this.newTotalMoney = newList1[i].newTotalMoney
                        this.newUnit = newList1[i].unit
                        this.newTaxAmount = newList1[i].taxMoney;
                        this.newMoney = newList1[i].money;
                        this.newUnitPrice = newList1[i].perPrice
                        this.isI = i;
                    }
                }
                this.SeeId = id;
                this.dialogSseTableVisible = true;
            },
            //查看明细列表2事件
            seeList2(id){
                var newList2 = this.newList2;
                for(var i =0; i < newList2.length; i++){
                    if(id == newList2[i].id){
                        this.newDetailed = newList2[i].commodityName;
                        this.newTaxRate = newList2[i].taxRate;
                        this.newNum = newList2[i].count
                        this.newTotalMoney = newList2[i].newTotalMoney;
                        this.newUnit = newList2[i].unit;
                        this.newTaxAmount = newList2[i].taxMoney;
                        this.newMoney = newList2[i].money;
                        this.newUnitPrice = newList2[i].perPrice
                        this.isI = i;
                    }
                }
                this.SeeId = id;
                this.dialogSseTableVisible = true;
            },
            //查看返回按钮
            seeBack(){
                this.$confirm('修改的信息还未保存,确认关闭？')
                    .then(() => {
                        this.classCode ='';
                        this.className ='';
                        this.newDetailed ='';
                        this.newNum = 1;
                        this.newTaxRate = 0;
                        this.newTotalMoney = '0.00';
                        this.newUnit ='';
                        this.newTaxAmount ='0.00';
                        this.newMoney ='0.00';
                        this.newUnitPrice = '0.00';
                        this.dialogSseTableVisible = false;
                    })
                    .catch(() => { });
            },
            //查看保存按钮
            seeSave(){
                var deviceList = this.deviceList
                var classCode = this.classCode;
                var id = this.SeeId;
                var isI = this.isI;

                var obj = {
                    classCode:'',
                    className:'',
                    commodityName:'',
                    newTotalMoney:'0.00',
                    perPrice:'',
                    count:'',
                    taxRate:'',
                    money:'',
                    taxMoney:'',
                    unit:'',
                    id:''
                };

                if(this.isShowLow) {
                    if (this.classCode == '') {
                        this.$message.error('请正确输入设备类别');
                        this.loading = false;
                        return
                    } else if (this.newNum == 0) {
                        this.$message.error('请正确输入数量');
                        this.loading = false;
                        return
                    } else if (this.newTotalMoney == '0.00') {
                        this.$message.error('请正确输入价税合计');
                        this.loading = false;
                        return
                    }else if (this.newDetailed == '') {
                        this.$message.error('请正确输入明细');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确认保存此条目？')
                        .then(() => {
                            //根据设备类别的编号，给设备名称赋值
                            for(var i = 0; i < deviceList.length; i++){
                                if(classCode == deviceList[i].classCode){
                                    this.className = deviceList[i].className
                                }
                            };
                            obj.classCode = this.classCode;//设备类别的编号
                            obj.className = this.className;//设备名称
                            obj.commodityName = this.newDetailed;//设备明细
                            obj.newTotalMoney = this.newTotalMoney;//含税总价
                            obj.perPrice = this.newUnitPrice;//不含税单价
                            obj.count = this.newNum;//数量
                            obj.taxRate = this.newTaxRate;//税率
                            obj.money = this.newMoney;//不含税金额
                            obj.taxMoney = this.newTaxAmount;//税额
                            obj.unit = this.newUnit;//单位
                            obj.id = id;//该条目id
//                            console.log(obj);

                            this.newList1.splice(isI,1,obj);
                            this.classCode ='';
                            this.className ='';
                            this.newDetailed ='';
                            this.newNum = 1;
                            this.newTaxRate = 0;
                            this.newTotalMoney = '0.00';
                            this.newUnit ='';
                            this.newTaxAmount ='0.00';
                            this.newMoney ='0.00';
                            this.newUnitPrice = '0.00';
                            this.dialogSseTableVisible = false;
                        })
                        .catch(() => { });
                }else{
                    if (this.newTotalMoney == '0.00') {
                        this.$message.error('请正确输入含税总价');
                        this.loading = false;
                        return
                    }else if (this.newDetailed == '') {
                        this.$message.error('请正确输入明细');
                        this.loading = false;
                        return
                    }
                    this.$confirm('确认保存此条目？')
                        .then(() => {
                            //根据设备类别的编号，给设备名称赋值
                            for(var i = 0; i < deviceList.length; i++){
                                if(classCode == deviceList[i].classCode){
                                    this.className = deviceList[i].className
                                }
                            };

                            obj.commodityName = this.newDetailed;//明细
                            obj.newTotalMoney = this.newTotalMoney;//含税总价
                            obj.count = this.newNum;//数量
                            obj.perPrice = this.newUnitPrice;//不含税单价
                            obj.taxRate = this.newTaxRate;//税率
                            obj.money = this.newMoney;//不含税金额
                            obj.taxMoney = this.newTaxAmount;//税额
                            obj.unit = this.newUnit;//单位
                            obj.id = id;//该条目id
//                            console.log(obj);
                            this.newList2.splice(isI,1,obj);
                            this.classCode ='';
                            this.className ='';
                            this.newDetailed ='';
                            this.newNum = 1;
                            this.newTaxRate = 0;
                            this.newTotalMoney = '0.00';
                            this.newUnit ='';
                            this.newTaxAmount ='0.00';
                            this.newMoney ='0.00';
                            this.newUnitPrice = '0.00';
                            this.dialogSseTableVisible = false;
                        })
                        .catch(() => {
                        });
                }
            },
            //删除列表1事件
            newListDelete1(id){
//                console.log(id);
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
                    var newList1 = this.newList1;
                    for(var i =0; i < newList1.length; i++){
                        if(id == newList1[i].id){
                            newList1.splice(i,1)
                        }
                    }
                    this.newList1 = newList1
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
            //删除列表2事件
            newListDelete2(id){
//                console.log(id);
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
                    var newList2 = this.newList2
                    for(var i =0; i < newList2.length; i++){
                        if(id == newList2[i].id){
                            this.newList2.splice(i,1)
                        }
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //设备类别change事件
            deviceChange(){
                var deviceList = this.deviceList
                var classCode = this.classCode
                for(var i = 0; i < deviceList.length; i++){
                    if(classCode == deviceList[i].classCode){
                        this.newUnit = deviceList[i].unit
                    }
                }
            },
            //含税总价chenge事件
            newTotalMoneyChange(){
                let val = unNumber.unNumber(this.newTotalMoney)
                let newTaxRate = this.newTaxRate / 100;
                if(val <= 0){
                    this.$message.error('请正确输入含税总价')
                    this.newTotalMoney = '0.00'
                }else{
                    this.newTotalMoney = number.number(val)
                }
                this.newTaxAmount = number.number((val / (1 + newTaxRate) *  newTaxRate).toFixed(2));//税额
                this.newMoney = number.number((val / (1 + newTaxRate)).toFixed(2));//金额
                this.newUnitPrice = (val / (1 + newTaxRate) / this.newNum).toFixed(9);//单价
            },
            //税率chenge事件
            newTaxRateChange(){
                let val = unNumber.unNumber(this.newTotalMoney)
                let newTaxRate = this.newTaxRate / 100;
                this.newTaxAmount = number.number((val / (1 + newTaxRate) *  newTaxRate).toFixed(2))//税额
                this.newMoney = number.number((val / (1 + newTaxRate)).toFixed(2));//金额
                this.newUnitPrice = (val / (1 + newTaxRate) / this.newNum).toFixed(9);//单价
            },
            //税额失去焦点事件
            newTaxAmountBlur(){
                let computerTaxAmount = Number(this.computerTaxAmount.toFixed(2))
                let newTaxAmount = unNumber.unNumber(this.newTaxAmount)
                let computerMoney = Number(this.computerMoney.toFixed(2))
                if(newTaxAmount <= 0){
                    this.$message.error('请正确输入税额')
                    this.newTaxAmount = number.number(computerTaxAmount)
                    return
                }
                if( (Math.abs(computerTaxAmount - newTaxAmount)).toFixed(2) > 0.02 && computerMoney){
                    this.$message.error('您输入的税额与计算出的税额差距过大')
                    this.newTaxAmount = number.number(computerTaxAmount)
                }
            },
            //金额失去焦点事件
            newMoneyBlur(){
                let computerMoney = Number(this.computerMoney.toFixed(2))
                let newMoney = unNumber.unNumber(this.newMoney)
                if(newMoney <= 0){
                    this.$message.error('请正确输入金额')
                    this.newMoney = number.number(computerMoney)
                    return
                }
                if( (Math.abs(computerMoney - newMoney)).toFixed(2) > 0.02 && computerMoney){
                    this.$message.error('您输入的税额与计算出的税额差距过大')
                    this.newMoney = number.number(computerMoney)
                }
            },
            //after模态框事件

            model(n){
                this.loading = true
                this.n = n;
                if(n == 0){
                    if(this.isBossSee) {
//                        console.log(this.isBossSee);
                        this.$router.push({name:'viewingList',params:{activeName:this.activeName,currentPage:this.currentPage}})
                        return
                    }
                    if(this.isAuditPerson){
                        this.$router.push({name:'PurchaseList',params:{choice:this.choice,currentPage:this.currentPage}})
                    }else{
                        this.$confirm('填写的信息还未提交，是否返回？', '提示', {
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
                            this.$router.push({name:'PurchaseList',params:{choice:this.choice,currentPage:this.currentPage}})
                        }).catch(() => {
                            this.loading = false
                        });
                    }
                }else if(n == 3){
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
                        this.back()
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false
                        this.isLoading = true;
                    });
                }else{
                    if(this.isShare){
                        let input1 = Number(this.input1)
                        let input2 = Number(this.input2)
                        let input3 = Number(this.input3)
                        let input4 = Number(this.input4)
                        let input5 = Number(this.input5)
                        let allInput = parseFloat(input1 + input2 + input3 + input4 + input5).toFixed(2)
                        //判断所有填写的百分比是不是等于100
                        if(allInput != 100 ){
                            this.$message.error('请正确输入分摊比例');
                            this.loading = false;
                            return
                        }
                    }else{
                        //没有分摊时是否填写了部门/项目
                        if(this.department == ''){
                            this.$message.error('请选择部门/项目');
                            this.loading = false;
                            return
                        }
                    }

                    if(this.tradeName == ''){
                        this.$message.error('请正确输入供应商');
                        this.loading = false;
                        return
                    }
                    if(this.type == ''){
                        this.$message.error('请正确输入采购类别');
                        this.loading = false;
                        return
                    }
                    if(this.taxFlg == ''){
                        this.$message.error('请正确输入发票类别');
                        this.loading = false;
                        return
                    }
                    if(this.purchaseDate == ''){
                        this.$message.error('请正确输入日期' );
                        this.loading = false;
                        return
                    }
                    let purchaseDate = Number(this.purchaseDate.split('-').join('').substring(0,6));//当前选择日期
                    let purchaseDateYear = Number(this.purchaseDate.substring(0,4));//当前选择日期的年份
                    let current_book_ym = Number(this.current_book_ym);//当前账期日期
                    let annualKnots = Number((this.current_book_ym.substring(0,4)-1) + '12');//去年12月
                    let lastYear = Number(this.current_book_ym.substring(0,4)-1);//去年年份

                    if(this.isMonthlyKnots && !this.isAnnualKnots){//判断已经12月月结但是还没年结时
                        if(purchaseDate < current_book_ym){//先判断采购日期不得早于当前账期
                            if(purchaseDateYear == lastYear && purchaseDate != annualKnots ){// 再判断选择的是否是去年12月份
                                this.$message.error('补录去年业务数据，日期必须选择在去年12月份');
                                this.loading = false;
                                return
                            }else if(purchaseDateYear != lastYear){
                                this.$message.error('采购日期不得早于当前账期');
                                this.loading = false
                                return
                            }
                        }
                    } else{
                        if(purchaseDate < current_book_ym ) {
                            this.$message.error('采购日期不得早于当前账期');
                            this.loading = false
                            return
                        }
                    }

                    if(this.totalMoney == '' || this.totalMoney == '0.00'){
                        this.$message.error('请添加明细项');
                        this.loading = false;
                        return
                    }
                    if(this.unTotalMoney == '' || this.unTotalMoney == '0.00'){
                        this.$message.error('请添加明细项');
                        this.loading = false;
                        return
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
//                        console.log(this.punch);
                        let index = this.punch + this.punch2;
                        if(index != 0){
                            this.punch3 = this.punch
                            this.submitUpload(n);
                        }else{
                            this.submit(n)
                        }
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
            submitUpload(n){
                this.$refs.upload.submit(n);
                this.allBase = [];//清空base
                this.allName = [];//清空name
            },
            //限制用户上传图片格式和大小
            beforeAvatarUpload(file){
                const isJPEG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isJPG = file.type === 'image/jpg';
                const isLt4M = file.size / 1024 / 1024 < 4;
                if (!isJPG && !isPNG && !isJPEG) {
                    this.loading = false;
                    this.isLoading = false;
                    this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
                }
                if (!isLt4M) {
                    this.loading = false;
                    this.isLoading = false;
                    this.$message.error('上传图片大小不能超过 4MB!');
                }
                return (isJPG || isPNG || isJPEG) && isLt4M;//如果不符合要求的话是不走myUpload函数的
            },
            onExceed(){
                this.$message.error('超过上传图片最大张数，您一次只能上传4张图片!');
            },
            onError(){
                this.loading = false
                this.isLoading = false;
                this.$message.error('图片上传失败，请重试！');
            },
            onChange(){
                this.punch++;
            },
            onRemove(file){
                var removeUrl = file.url;//在删除图片时进行一个判断，根据url看删除的是否是已经上传的图片
                var urlList = this.attachUrlJson;
                for(var i = 0; i < urlList.length; i++){
                    if(urlList[i]){
                        if(removeUrl == urlList[i].url){
                            delete urlList[i];
                            this.punch2++
                        }
                    }
                }
                this.punch--;
            },
            //url转换base方法
            readBlobAsDataURL(blob, callback) {
//                console.log(blob);
                var fileReader = new FileReader();
                fileReader.onload = function(e){
                    callback(e.target.result);
                };
                fileReader.readAsDataURL(blob);
            },
            myUpload(content){
                var file = content.file;
                var _this = this;
                this.readBlobAsDataURL(file,function (dataurl){
                    _this.allBase.push(dataurl);
                    _this.allName.push(file.name);
                    if(_this.allBase.length == (_this.punch3 + _this.punch2)){
                        _this.submit(_this.n)
                    }
                });
                this.allName.push(file.name);
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            back(){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('seePurchaseBack')
                params.append('id',this.purchaseId);
                axios.post(url,params)
                    .then(response=>{
                        if(response.data.status == 200){
                            this.$message({
                                type:'success',
                                message:'撤回成功'
                            })
                            this.loading = false;
                            this.isLoading = false;
                            this.$router.go(-1);
                        }else if(response.data.status == 400){
                            this.loading = false;
                            this.$message.error(response.data.msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false
                        this.isLoading = false;
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            submit(n){
//                console.log(n);
                this.loading = true;
                var params = new URLSearchParams();
                var type = this.type;
                var purchaseItems = '';
                var commodityName = '';
                var newUrl = [];
                var newName = [];
                var finalUrl = [];
                var finalName = [];

                var departmentJson = [] ;
                var options = this.options4;

                //判断是否为分摊状态，分别取值
                if(this.isShare){
                    if (this.input1 != '0' && this.select1 != '') {
                        let item1 = options.filter(x =>{
                            return x.id == this.select1
                        });
                        item1[0].rate = this.input1;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select1){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item1[0])
                    }else if(this.input1 != '0' && this.select1 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input2 != '0' && this.select2 != '') {
                        let item2 = options.filter(x =>{
                            return x.id == this.select2
                        })
                        item2[0].rate = this.input2;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select2){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item2[0])
                    }else if(this.input2 != '0' && this.select2 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input3 != '0' && this.select3 != '') {
                        let item3 = options.filter(x =>{
                            return x.id == this.select3
                        })
                        item3[0].rate = this.input3;
                        //判断是否有重复填写部门/项目的情况
                        for (let i in departmentJson) {
                            if (departmentJson[i].id == this.select3) {
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item3[0])
                    }else if(this.input3 != '0' && this.select3 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }

                    if (this.input4 != '0' && this.select4 != '') {
                        let item4 = options.filter(x =>{
                            return x.id == this.select4
                        })
                        item4[0].rate = this.input4;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select4){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item4[0])
                    }else if(this.input4 != '0' && this.select4 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }
                    if (this.input5 != '0' && this.select5 != '') {
                        let item5 = options.filter(x =>{
                            return x.id == this.select5
                        })
                        item5[0].rate = this.input5;
                        for(let i in departmentJson){
                            if(departmentJson[i].id == this.select5){
                                this.$message.error('分摊部门/项目不能相同，请重新选择');
                                this.loading = false;
                                this.isLoading = false;
                                return
                            }
                        }
                        departmentJson.push(item5[0])
                    }else if(this.input5 != '0' && this.select5 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        this.isLoading = false;
                        return
                    }
                } else {
                    let item6 = options.filter(x =>{
                        return x.id == this.department
                    })
                    departmentJson.push(item6[0])
                }
                departmentJson = JSON.stringify(departmentJson);//将json格式转成字符串传参
//                console.log(departmentJson);

                var newList1 = this.newList1;
                for(var i = 0; i < newList1.length; i++){
                    newList1[i].perPrice = unNumber.unNumber(newList1[i].perPrice)
                    newList1[i].money = unNumber.unNumber(newList1[i].money)
                    newList1[i].taxMoney = unNumber.unNumber(newList1[i].taxMoney)
                }
                var newList2 = this.newList2;
                for(var ii = 0; ii < newList2.length; ii++){
                    newList2[ii].perPrice = unNumber.unNumber(newList2[ii].perPrice)
                    newList2[ii].money = unNumber.unNumber(newList2[ii].money)
                    newList2[ii].taxMoney = unNumber.unNumber(newList2[ii].taxMoney)
                }
                //区分上传插件
                var urlList = this.attachUrlJson
                for(var j = 0; j < urlList.length; j++){
                    if(urlList[j]){
                        newUrl.push(urlList[j].url)
                        newName.push(urlList[j].name)
                    }
                }
                finalUrl = newUrl.concat(this.allBase)
                finalName = newName.concat(this.allName)
//                console.log(finalUrl);
//                console.log(finalName);

                if(type == '1'){
                    commodityName = newList1[0].className
                    purchaseItems = JSON.stringify(newList1)
                }else{
                    commodityName = newList2[0].className
                    purchaseItems = JSON.stringify(newList2)
                }

                this.imgUrl1 = finalUrl[0] ? finalUrl[0] : '';
                this.imgUrl2 = finalUrl[1] ? finalUrl[1] : '';
                this.imgUrl3 = finalUrl[2] ? finalUrl[2] : '';
                this.imgUrl4 = finalUrl[3] ? finalUrl[3] : '';

                this.imgName1 = finalName[0] ? finalName[0] : '';
                this.imgName2 = finalName[1] ? finalName[1] : '';
                this.imgName3 = finalName[2] ? finalName[2] : '';
                this.imgName4 = finalName[3] ? finalName[3] : '';

                params.append('supplierName',this.tradeName);
                params.append('supplierIdNumber',this.supplierIdNumber);
                params.append('supplierAddress',this.supplierAddress);
                params.append('supplierTelephone',this.supplierTelephone);
                params.append('supplierPerson1',this.supplierPerson1);
                params.append('supplierPersonPhone1',this.supplierPersonPhone1);
                params.append('supplierPerson2',this.supplierPerson2);
                params.append('supplierPersonPhone2',this.supplierPersonPhone2);
                params.append('departmentJson',departmentJson);
                params.append('commodityName',commodityName);
                params.append('type',type);
                params.append('taxFlg',this.taxFlg);
                params.append('totalMoney',this.totalMoney);
                params.append('purchaseId',this.purchaseId);
                params.append('purchaseItems',purchaseItems);
                params.append('purchaseDate',this.purchaseDate);
//                console.log(this.imgUrl1);
//                console.log(this.imgName1);
                params.append('imgUrl1',this.imgUrl1);
                params.append('imgName1',this.imgName1);
                params.append('imgUrl2',this.imgUrl2);
                params.append('imgName2',this.imgName2);
                params.append('imgUrl3',this.imgUrl3);
                params.append('imgName3',this.imgName3);
                params.append('imgUrl4',this.imgUrl4);
                params.append('imgName4',this.imgName4);

                var url = '';
                var saveUrl = addUrl.addUrl('seePurchaseSave')
                var submitUrl = addUrl.addUrl('seePurchaseSubmit')
                if(n == 1){
                    url = saveUrl
                }else if(n == 2){
                    url = submitUrl
                }

                axios({
                    method:'post',
                    url:url,
                    data:params,
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                    }
                },params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        let msg = response.data.msg;
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: msg
                            });
                        }else if(response.data.status == 400){
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
                        this.$message.error('提交失败，请重试！');
                    })
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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('seePurchase');
//            console.log(url);
            params.append('id',this.purchaseId);
            axios.post(url,params)
                .then(response=> {
                    var data = response.data.value;
//                    console.log(data);
                    //设置部门
                    this.options4 = data.departmentList;
                    this.supplierList = data.supplierList;
//                    console.log(this.supplierList);
                    this.deviceList = data.deviceList;
                    this.auditRecordList = data.auditRecordList;
                    let purchase = data.purchase;
                    this.purchase = purchase;
                    this.tradeName = purchase.supplierName;

                    this.supplierIdNumber = purchase.supplierIdNumber;
                    this.supplierAddress = purchase.supplierAddress;
                    this.supplierTelephone = purchase.supplierTelephone;
                    this.supplierPerson1 = purchase.supplierPerson1;
                    this.supplierPersonPhone1 = purchase.supplierPersonPhone1;
                    this.supplierPerson2 = purchase.supplierPerson2;
                    this.supplierPersonPhone2 = purchase.supplierPersonPhone2;
                    this.taxFlg = String(purchase.taxFlg);
                    this.attachUrlJson = purchase.attachUrlJson;

//                    console.log(this.attachUrlJson);
                    this.purchaseDate = purchase.simplePurchaseDate;

                    var type = purchase.type;
                    var purchaseItemList = purchase.purchaseItemList
//                    console.log(purchaseItemList);
                    for(let i = 0; i < purchaseItemList.length; i++){
                        purchaseItemList[i].newTotalMoney = number.number(purchaseItemList[i].noTaxMoney + purchaseItemList[i].taxMoney)
                        purchaseItemList[i].money = number.number(purchaseItemList[i].noTaxMoney)
//                        purchaseItemList[i].perPrice =
                        purchaseItemList[i].taxMoney = number.number(purchaseItemList[i].taxMoney)
                        purchaseItemList[i].id = purchaseItemList[i].idString
                    }
                    if(type == 1){
                        this.isShowLow = true
                        this.isShowCount = false
                        this.newList1 = purchase.purchaseItemList
                    }else if(type == '5') {
                        this.isShowLow = false
                        this.isShowCount = false
                        this.newList2 = purchase.purchaseItemList
                    }else{
                        this.isShowLow = false
                        this.isShowCount = true
                        this.newList2 = purchase.purchaseItemList
                    }
                    this.type = String(type)
                    let index = purchase.auditFlg
                    //当index 0 未提交 1 驳回；
                    if(index < 2){
                        this.isAuditPerson = false;
                        this.isShowShare = true;
                        this.isReadonly = false;
                    }else{
                        if(data.purchase.departmentIdString1 == '0' || data.purchase.departmentIdString1 == 'null'){
                            this.isShowShareItem1 = false
                        }
                        if(data.purchase.departmentIdString2 == '0' || data.purchase.departmentIdString2 == 'null'){
                            this.isShowShareItem2 = false
                        }
                        if(data.purchase.departmentIdString3 == '0' || data.purchase.departmentIdString3 == 'null'){
                            this.isShowShareItem3 = false
                        }
                        if(data.purchase.departmentIdString4 == '0' || data.purchase.departmentIdString4 == 'null'){
                            this.isShowShareItem4 = false
                        }
                        if(data.purchase.departmentIdString5 == '0' || data.purchase.departmentIdString5 == 'null'){
                            this.isShowShareItem5 = false
                        }
                        this.isAuditPerson = true
                        this.isShowShare = false;
                        this.isReadonly = true;
                    }
                    if((index == 2 || index == 3) && purchase.auditPerson == 0){
                        this.showBtn = true
                    }

                    let divideFlg = data.purchase.divideFlg;//判断是否为分摊 0 为未分摊 1为分摊
                    if(divideFlg ==0){
                        this.isShare = false
                        this.department = data.purchase.departmentIdString1
                    }else{
                        this.isShare = true;
                        this.select1 = data.purchase.departmentIdString1
                        this.select2 = data.purchase.departmentIdString2
                        this.select3 = data.purchase.departmentIdString3
                        this.select4 = data.purchase.departmentIdString4
                        this.select5 = data.purchase.departmentIdString5

                        this.input1 = data.purchase.projectDivRate || 0
                        this.input2 = data.purchase.projectDivRate2 || 0
                        this.input3 = data.purchase.projectDivRate3 || 0
                        this.input4 = data.purchase.projectDivRate4 || 0
                        this.input5 = data.purchase.projectDivRate5 || 0
                    }

                    if(this.isBossSee){
                        this.isAuditPerson = true
                        this.isShowShare = false;
                        this.isReadonly = true;
                    }
//                    console.log(this.deviceList);
                    this.loading = false
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
    .top .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .top .sub2{
        position: absolute;
        right:190px;
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
        height:80px;
    }
    .list .ptx{
        width:100%;
        height:170px;
    }
    .list li .ipt{
        display: inline-block;
        width:300px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .iptData{
        width:322px;
        height:36px;
    }
    .list li .sel{
        width:322px;
        height:36px;
    }
    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list li .tit2{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }

    .list .hd{
        width:100%;
    }


    .newList{
        width:100%;
        height:400px;
    }
    .newList li{
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .newList .sm{
        width:50%;
    }
    .newList li .tit3{
        font-size:14px;
        display: inline-block;
        width:100px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .newList .pt{
        width:100%;
        height:60px;
    }
    .newList .pt .tex{
        width:814px;
        height: 50px;
        padding: 3px 10px;
        font-size:16px;
        border-radius: 3px;
        resize: none;
        border: 1px solid #ccc;
    }
    .newList li .ipt{
        display: inline-block;
        width:300px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .newList li .sel{
        width:322px;
        height:36px;
    }
    .newAgain{
        float: right;
        margin-right: 20px;
        margin-top: -20px;
    }
    .newSave{
        float: right;
        margin-right: 20px;
        margin-top: -20px;
        margin-left: 0px;
    }
    .newBack{
        float: right;
        margin-right: 20px;
        margin-top: -20px;
    }


    .dialogImageName{
        font-size:16px;
    }

    .detailed{
        width:100%;
        font-size:16px;
        table-layout: fixed;
        margin: 50px auto;
        text-align: center;
    }
    .detailed tr {
        height:40px;
    }
    .detailed thead tr th{
        background-color: #f7f7f7;
        border: 1px solid #f2f2f2;
    }
    .detailed .detailedToll{
        background: none;
        border: none;
        position: relative;
    }
    .detailed .detailedToll .icon{
        position: absolute;
        top:8px;
        left:0px;
        z-index: 2;
    }
    .detailed .detailedToll .mask{
        width:100%;
        height:100%;
        background-color: #fff;
        position: absolute;
        top:0;
        left:0;
        z-index: 3;
    }
    .black{
        color: #333;
    }
    .detailed td{
        overflow: hidden;
        border: 1px solid #f2f2f2;
    }
    .detailed td .detailed-input{
        padding: 5px 10px;
        width:100%;
        height:100%;
        outline: none;
        border: none;
    }
    .detailed tbody tr:hover{
        /*background-color: #f7f7f7;*/
    }
    .detailed tbody tr:hover .mask{
        z-index: 1;
    }
    .upload{
        width:100%;
        margin-top: 30px;
    }
    .upload .tit2{
        font-size:14px;
        display: inline-block;
        width:150px;
        text-align: right;
        margin-right: 20px;
        vertical-align: top;
    }
    .upload .uploadBox{
        display: inline-block;
        width:76.7%;
        padding: 3px 10px;
        text-align: left;
    }
    .gridDataAdd{
        display: block;
        margin: 10px;
        float: right;
    }
    .grayList{
        margin-top: 30px;
    }
    .list li .input-with-select{
        font-size:14px;
        width:322px;
        text-align: right;
    }

    .list .hd{
        width:100%;
    }
    .share{
        display: block;
        margin-top: 10px;
        margin-left: 80px;
    }
    .input-select{
        width:200px;
    }
    .opt{
        width:260px;
        height:28px;
        border: none;
        font-size:14px;
        position: absolute;
        top:5px;
        left:185px;
        outline:none;
        color: #333;
    }
    .approval{
        width:100%;
        margin-top: 20px;
        font-size:14px;
    }
    .approval li{
        margin-top: 20px;
        text-align: left;
    }
    .approval li img{
        display: inline-block;
        width:50px;
        height:50px;
        border-radius: 50%;
        overflow: hidden;
        float: left;
        margin-left: 130px;
        margin-right: 20px;
    }
    .approval li .listHeader{
        display: inline-block;
        float: left;
        width:80%;
    }
    .approval li .listHeader .listName{

        margin-right: 10px;
    }
    .approval li .listHeader .listDepartment{
        margin-left: 10px;
    }
    .approval li .listHeader .listData{
        float: right;
    }
    .approval li .listFooter{
        display: inline-block;
        float: left;
        width:80%;
        margin-top: 10px;
    }
    .approval li .listFooter .listState{
        display: inline-block;
        float: left;
        margin-right: 10px;
    }
    .approval li .listFooter .listContent{
        width:90%;
        display: inline-block;
        float: left;
        height:50px;
        overflow: hidden;
    }
</style>
