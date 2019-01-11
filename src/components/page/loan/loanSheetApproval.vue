<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>借款单审批</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="danger" class="sub1" :loading="isLoading">驳回</el-button>
                <el-button @click="model(2)" size="small" type="primary" class="sub2" :loading="isLoading">同意</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>借款单</span>
                </div>
                <ul class="list">
                    <li class="sm">
                        <span class="tit">金额</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">已还金额</span>
                        <input class="ipt" type="text" v-model="creditMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">未还金额</span>
                        <input class="ipt" type="text" v-model="unCreditMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">时间</span>
                        <input class="ipt" type="text" v-model="debitDate" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">借款人</span>
                        <input class="ipt" type="text" v-model="userName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">状态</span>
                        <input class="ipt" type="text" value="未提交" v-if="auditFlg == 0" readonly>
                        <input class="ipt" type="text" value="驳回" v-if="auditFlg == 1" readonly>
                        <input class="ipt" type="text" value="待审核" v-if="auditFlg == 2" readonly>
                        <input class="ipt" type="text" value="待出纳确认" v-if="auditFlg == 3" readonly>
                        <input class="ipt" type="text" value="待还款" v-if="auditFlg == 4" readonly>
                        <input class="ipt" type="text" value="待审核" v-if="auditFlg == 5" readonly>
                        <input class="ipt" type="text" value="待审核" v-if="auditFlg == 6" readonly>
                        <input class="ipt" type="text" value="已红冲" v-if="auditFlg == 7" readonly>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" maxlength="50" readonly>
                            </textarea>
                    </li>
                    <li class="pt cf">
                        <span class="tit2">附件</span>
                        <div class="uploadBox">
                            <el-upload
                                action="/"
                                ref="upload"
                                :on-preview="handlePictureCardPreview"
                                list-type="picture-card"
                                :file-list="attachUrlJson"
                                disabled>
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <h2 class="dialogImageName">{{dialogImageName}}</h2>
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </li>
                </ul>
                <div class="line">
                    <span>审批记录</span>
                </div>
                <ul class="approval">
                    <li class="cf" v-for="item in userDebitAuditRecordList">
                        <img v-if="!item.auditUserFaceUri" src="../../../../static/images/tit.png" alt="">
                        <img v-else :src="item.auditUserFaceUri" alt="">
                        <div class="listHeader">
                            <span class="listName">{{item.auditUserName}}</span>
                            ——
                            <span class="listDepartment">{{item.auditDepartmentName}}</span>
                            <span class="listData">{{item.auditTimeYMDHM}}</span>
                        </div>
                        <div class="listFooter">
                            <span class="listState">意见：</span>
                            <span class="listContent">{{item.discription}}</span>
                        </div>
                    </li>
                </ul>
                <div class="line">
                    <span>审批意见</span>
                </div>
                <ul class="approval-opinion">
                    <li>
                        <span>可选审批意见</span>
                        <el-select class="opinion" v-model="opinion" placeholder="请选择" @change="opinionChange">
                            <el-option
                                v-for="item in opinionList"
                                :key="item.value"
                                :label="item.opinionItem"
                                :value="item.value"
                                :disabled="item.disabled">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="opinionItem">
                        <span>审批意见</span>
                            <textarea v-model="discription2" name="opinionItem" id="opinionItem" maxlength="50">
                            </textarea>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data () {
            return {
                money:'',//借款金额
                creditMoney:'',//已还金额
                unCreditMoney:'',//待还款金额
                nowdata:'',//当前借款日期
                debitDate:'',//上传日期（格式修改后的）
                userName:'',//借款人
                auditFlg:'',//0 仅保存；1 驳回；2等待审核；3 等待出纳确认；4 通过；5 等待财务负责人审核；6 等待企业负责人审核；7 已对冲
                departmentId:'',//部门
                options:[],//部门详情
                discription:'',//事由
                discription2:'同意',//审批意见
                opinion:'同意',//select框
                debitId:this.$route.params.debitId,
                userDebitAuditRecordList:[],
                attachUrlJson:[],//上传图片展示
                dialogVisible: false,//dialog是否打开状态
                dialogImageName:'',//展示图片名称
                dialogImageUrl:'',//展示图片URL
                opinionList:[
                    {value:'同意',opinionItem:'同意'},{value:'驳回',opinionItem:'驳回'}
                ],//可选审批意见
                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            model(n){
                this.loading = true;
                if(n == 0){
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false;
                    });
                }else if(n == 1){
                    this.isLoading = true;
                    this.$confirm('确定是否驳回？', '提示', {
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
                        this.axios(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                        this.isLoading = false;
                    });
                }else if(n == 2){
                    this.isLoading = true;
                    this.$confirm('确定是否同意？', '提示', {
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
                        this.axios(n)
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                        this.loading = false;
                        this.isLoading = false;
                    });
                }
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
            },
            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.nowdata;
                this.debitDate = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
//                console.log(this.debitDate);
            },
            //selsect框change事件
            opinionChange(){
                this.discription2 = this.opinion
            },
            axios(n){
                this.loading = true
                var url = '';
                var params = new URLSearchParams();
                var agreeUrl = addUrl.addUrl('loanSheetApprovalAgree')
                var refuseUrl = addUrl.addUrl('loanSheetApprovalRefuse')
                //判断n=1时为驳回，n=2时为同意
                if(n == 1){
                    url = refuseUrl
                    this.discription2 = this.discription2 == '同意' ? '驳回':this.discription2
                }else if(n == 2){
                    url = agreeUrl
                    this.discription2 = this.discription2 == '驳回' ? '同意':this.discription2
                }
                params.append('debitId',this.debitId);
                params.append('discription',this.discription2);

                axios.post(url,params)
                    .then(response=>{
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '提交成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
//                        console.log(error);
                        this.loading = false;
                        this.isLoading = false;
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
            var params = new URLSearchParams();
            var url = addUrl.addUrl('loanSheetApproval')
            params.append('debitId',this.debitId);

            axios.post(url,params)
                .then(response=> {
//                console.log(response);
                    var data = response.data.value;
                    this.options = data.departmentList;
                    let userDebitAuditRecordList = data.userDebitAuditRecordList

                    this.userDebitAuditRecordList = userDebitAuditRecordList;
                    this.discription = data.userDebitItem.discription;
                    this.money = number.number(data.userDebitItem.money);
                    this.creditMoney = number.number(data.userDebitItem.creditMoney);
                    this.unCreditMoney = number.number(data.userDebitItem.unCreditMoney);
                    this.nowdata = data.userDebitItem.debitDateYMD;
                    this.debitDate = data.userDebitItem.debitDateYMD;
                    this.userName = data.userDebitItem.userName;
                    this.auditFlg = data.userDebitItem.auditFlg;
                    this.attachUrlJson = data.userDebitItem.attachUrlJson;
                    this.departmentId = data.userDebitItem.departmentIdStr;
                    this.loading = false;

                    for (var i = 0; i < this.userDebitAuditRecordList.length; i++) {
                        this.userDebitAuditRecordList[i].auditTimeYMDHM = this.userDebitAuditRecordList[i].auditTimeYMDHM.substring(0, 10)
                    }
                })
                .catch(error=> {
//                        console.log(error);
                    this.loading = false;
                    alert('网络错误，不能访问');
                })
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
        right:30px;
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
    }
    .list .sm{
        width:50%;
    }
    .list .pt{
        width:100%;
    }
    .list li .ipt{
        display: inline-block;
        width:320px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
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
    .list li .tex{
        width:78.7%;
        height:60px;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .list li .uploadBox{
        display: inline-block;
        width:78.7%;
        padding: 3px 10px;
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
    .dialogImageName{
        font-size:16px;
    }
    .approval-opinion{
        font-size:16px;
        margin-top: 30px;
    }
    .approval-opinion li{
        margin-top: 30px;
        text-align: center;
    }
    .approval-opinion li span{
        display: inline-block;
        width:100px;
        height:22px;
        vertical-align: top;
    }
    .approval-opinion li select{
        display: inline-block;
        width:700px;
        height:30px;
        text-align: center;
        padding: 2px 315px;
        border-bottom: 1px solid #ccc;
        border-radius: 3px;
    }
    .opinion{
        width:880px;
    }
    .opinionItem #opinionItem{
        display: inline-block;
        width:860px;
        height:50px;
        padding: 5px 10px;
        resize: none;
        font-size:14px;
        border-radius: 3px;
    }
</style>
