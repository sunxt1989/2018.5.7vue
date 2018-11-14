<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>企业信息</h2>
                <router-link to="/AccountManagement/AccountManagement" class="back">返回</router-link>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <ul class="list cf">
                    <li class="pt">
                        <span class="tit">企业名称：</span>
                        <input class="ipt" type="text" v-model="companyName" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">统一社会信用代码</span>
                        <input class="ipt" type="text" v-model="idNumber" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">企业所在地区</span>
                        <el-select class="adr" v-model="provinceCode" placeholder="省" disabled>
                            <el-option
                                v-for="item in options1"
                                :key="item.value"
                                :label="item.name"
                                :value="item.provinceCode">
                            </el-option>
                        </el-select>
                        <el-select class="adr" v-model="cityCode" placeholder="市" disabled>
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.name"
                                :value="item.cityCode">
                            </el-option>
                        </el-select>
                        <el-select class="adr" v-model="areaCode" placeholder="区" disabled>
                            <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.name"
                                :value="item.areaCode">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">企业所属行业</span>
                        <el-select class="sel" v-model="companyType" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options4"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">纳税人性质</span>
                        <el-select class="sel" v-model="companyScale" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in options5"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="pt">
                        <span class="tit">启动日期</span>
                        <el-date-picker
                            class="data"
                            v-model="startDate"
                            type="date"
                            :picker-options="pickerOption1"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            disabled>
                        </el-date-picker>
                    </li>
                    <li class="pt">
                        <span class="tit">注册资金</span>
                        <input class="ipt" type="text" v-model="registeredCapital" readonly>
                    </li>
                    <li class="pt" v-if="inviteCode">
                        <span class="tit">邀请码</span>
                        <el-input placeholder="请输入内容" v-model="inviteCode" class="el-ipt" readonly>
                            <el-button slot="append" @click="changeInviteCode">更新邀请码</el-button>
                        </el-input>
                    </li>
                    <li class="pt">
                        <span class="tit">企业会计准则</span>
                        <input class="ipt" type="text" v-model="accountStandard" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">固定资产折旧规则</span>
                        <input class="ipt" type="text" v-model="fixedDeprecitionType" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">无形资产摊销规则</span>
                        <input class="ipt" type="text" v-model="intangibleDeprecitionType" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">成本计算方法</span>
                        <input class="ipt" type="text" v-model="inventoryCostType" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">所得税缴税周期</span>
                        <input class="ipt" type="text" v-model="incomeTaxPeroidType" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">增值税缴税周期</span>
                        <input class="ipt" type="text" v-model="addedTaxPeroidType" readonly>
                    </li>
                    <li class="pt">
                        <span class="tit">是否科技型企业</span>
                        <input class="ipt" type="text" v-model="highTechInfo" readonly>
                    </li>
                    <li class="ptx">
                        <span class="tit">营业执照</span>
                        <span class="tit2">上传附件所有信息需清晰可见，内容真实有效，不得做任何修改。照片支持jpg.jpeg.png格式，大小不超过4M</span>
                        <el-upload
                            class="upload"
                            action="http://192.168.2.190:8080/web/upload2.html"
                            list-type="picture-card"
                            ref="upload"
                            :show-file-list=true
                            :limit='1'
                            :on-preview="handlePictureCardPreview"
                            :file-list="attachUrlJson"
                            :auto-upload="false"
                            disabled>
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" class="dialog">
                            <h2 class="dialogImageName">{{dialogImageName}}</h2>
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
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
                companyName:'',//公司名称
                idNumber:'',//统一社会信用代码
                startDate:'',//启动日期
                registeredCapital:'0.00',//注册资金
                inviteCode:'',//邀请码
                companyType:'',//公司类型
                options4:[
                    {value:1,label:'农、林、木、渔业'},
                    {value:2,label:'采矿业'},
                    {value:3,label:'制造业'},
                    {value:4,label:'电力、热力、燃气及水生产和供应业'},
                    {value:5,label:'建筑业'},
                    {value:6,label:'批发和零售业'},
                    {value:7,label:'交通运输、仓储和邮政业'},
                    {value:8,label:'住宿和餐饮业'},
                    {value:9,label:'信息传输、软件和信息技术服务业'},
                    {value:10,label:'金融业'},
                    {value:11,label:'房地产业'},
                    {value:12,label:'租赁和商务服务业'},
                    {value:13,label:'科学研究和技术服务业'},
                    {value:14,label:'水利、环境和公共设施管理业'},
                    {value:15,label:'居民服务、修理和其他服务业'},
                    {value:16,label:'教育'},
                    {value:17,label:'卫生和社会工作'},
                    {value:18,label:'文化、体育和娱乐业'},
                    {value:19,label:'公共管理、社会保障和社会组织'},
                    {value:20,label:'国际组织'}
                ],
                companyScale:'',//纳税人性质
                options5:[
                    {value:1,label:'小规模纳税人'},
                    {value:2,label:'一般纳税人'},
                ],

                provinceCode:'',//省
                cityCode:'',//市
                areaCode:'',//区
                options1:[],//省list
                options2:[],//市list
                options3:[],//区list

                attachUrlJson:[],//上传图片展示
                idNumberFileName:'',//营业执照上传文件的名称
                idNumberUrlData:'',//营业执照上传文件的data
                dialogVisible: false,//dialog是否打开状态
                dialogImageName:'',//展示图片名称
                dialogImageUrl:'',//展示图片URL

                accountStandard:'',//企业会计准则
                fixedDeprecitionType:'',//固定资产折旧规则
                intangibleDeprecitionType:'',//无形资产摊销规则
                inventoryCostType:'',//成本计算方法
                incomeTaxPeroidType:'',//所得税缴税周期
                addedTaxPeroidType:'',//增值税缴税周期
                highTechInfo:'',//是否科技型企业


                pickerOption1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    }
                },
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            //更换邀请码
            changeInviteCode(){
                this.loading = true
                var url = addUrl.addUrl('changeInviteCode')
                axios.post(url)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value
                        this.inviteCode = data.inviteCode
                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            //上传图片缩略图信息赋值
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogImageName = file.name;
                this.dialogVisible = true;
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
            let url = addUrl.addUrl('seeAccountManagement')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value.item

                    this.companyName = data.companyName
                    this.idNumber = data.idNumber
                    this.startDate = data.startDate
                    this.inviteCode = data.inviteCode
                    this.registeredCapital = data.registeredCapital

                    this.companyType = data.companyType
                    this.companyScale = data.companyScale
                    this.provinceCode = data.province
                    this.cityCode = data.city
                    this.areaCode = data.district
                    this.attachUrlJson = [{name: '', url: data.idNumberUri}]
                    this.accountStandard = data.accountStandard
                    this.fixedDeprecitionType = data.fixedDeprecitionType
                    this.intangibleDeprecitionType = data.intangibleDeprecitionType
                    this.inventoryCostType = data.inventoryCostType
                    this.incomeTaxPeroidType = data.incomeTaxPeroidType
                    this.addedTaxPeroidType = data.addedTaxPeroidType
                    this.highTechInfo = data.highTechInfo


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
        background-color: #fff;
        padding: 20px 40px;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .list{
        width:80%;
        text-align: center;
        margin: 0 auto;
    }
    .list .pt{
        width:100%;
        display: inline-block;
        height:36px;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .btn{
        width:100%;
        display: inline-block;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .btn p{
        display: inline-block;
        font-size:14px;
        color: red;
        margin-left: 200px;
    }
    .list .btn .sub1{
        width:400px;
        margin-left: 256px;
        margin-bottom: 50px;
    }

    .list li .ipt{
        display: inline-block;
        width:400px;
        height:28px;
        border: 1px solid #ccc;
        border-radius: 3px;
        vertical-align: middle;
        padding: 3px 10px;
    }
    .list li .el-ipt{
        width:422px;
        height:34px;
    }
    .list li .adr{
        width:135px;
        height:28px;
        margin-right: 10px;
    }
    .list li .data{
        width:422px;
        height:34px;
    }

    .list li .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list .pt .sel{
        display: inline-block;
        width:422px;
        height:34px;
    }
    .list .ptx{
        width:100%;
        display: inline-block;
        text-align: left;
        line-height: 36px;
        margin-top: 20px;
        float: left;
    }
    .list .ptx .tit{
        font-size:14px;
        display: inline-block;
        width:250px;
        text-align: right;
        margin-right: 20px;
        vertical-align: middle;
    }
    .list .ptx .tit2{
        font-size:14px;
        display: inline-block;
        width:420px;
        text-align: left;
        margin-right: 20px;
        vertical-align: middle;
        line-height: 20px;
        color: #999;
    }
    .list .ptx .upload{
        display: inline-block;
        width:400px;
        margin-left: 270px;
        margin-top: 20px;
    }
</style>
