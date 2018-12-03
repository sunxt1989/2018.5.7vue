<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>无形资产详情</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content cf" :style="{height:screenHeight}">
                <div class="line">
                    <span>无形资产详情</span>
                </div>
                <div class="cf">
                    <el-button type="danger" plain size="small" class="share" @click="shareClick">
                        <span v-show="!isShare">折旧分摊</span>
                        <span v-show="isShare">取消折旧分摊</span>
                    </el-button>
                    <el-button @click="saveShare" size="small" type="primary" class="sub2">{{saveName}}</el-button>
                </div>

                <ul class="list cf">
                    <li class="hd" v-show="!isShare">
                        <span class="tit">部门/项目</span>
                        <el-select class="sel" v-model="department" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </li>

                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input1" class="input-with-select" @change="inputWithSelectChange(1,$event)">
                            <el-select v-model="select1" slot="prepend" placeholder="请选择" class="input-select">
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
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input2" class="input-with-select" @change="inputWithSelectChange(2,$event)">
                            <el-select v-model="select2" slot="prepend" placeholder="请选择" class="input-select">
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
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input3" class="input-with-select" @change="inputWithSelectChange(3,$event)">
                            <el-select v-model="select3" slot="prepend" placeholder="请选择" class="input-select">
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
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input4" class="input-with-select" @change="inputWithSelectChange(4,$event)">
                            <el-select v-model="select4" slot="prepend" placeholder="请选择" class="input-select">
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
                    <li class="sm" v-show="isShare">
                        <span class="tit">部门/项目</span>
                        <el-input placeholder="分摊比例" v-model="input5" class="input-with-select" @change="inputWithSelectChange(5,$event)">
                            <el-select v-model="select5" slot="prepend" placeholder="请选择" class="input-select">
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

                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">名称</span>
                        <input class="ipt" type="text" v-model="name" readonly>
                    </li>
                    <li class="sm" >
                        <span class="tit">类别</span>
                        <input class="ipt" type="text" v-model="className" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">年限</span>
                        <input class="ipt" type="text" v-model="usefulLife" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">原值</span>
                        <input class="ipt" type="text" v-model="originalMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">累计折旧</span>
                        <input class="ipt" type="text" v-model="usefulMoney" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">净残值率</span>
                        <input class="ipt" type="text" v-model="salvageRate" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">净值</span>
                        <input class="ipt" type="text" v-model="money" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">入账日期</span>
                        <input class="ipt" type="text" v-model="startDateYMD" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">已折旧月数</span>
                        <input class="ipt" type="text" v-model="usefulMonths" readonly>
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
    export default{
        data(){
            return{
                saveName:'保存',//保存按钮名称
                department:'',//分摊部门/项目
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
                isShare:false,//是否分摊
                options:[],//报销部门列表

                status:'',//状态 0：仅保存，1：正常使用，2：未使用，3：已折旧完毕，4：处置中，5：处置完毕
                name:'',//名称
                className:'',//类别
                divideFlg:'',//是否分摊   0为不分摊 1为分摊
                usefulLife:'',//年限
                originalMoney:'',//原值
                usefulMoney:'',//累计折旧
                salvageRate:'',//净残值率
                money:'',//净值
                startDateYMD:'',//入账日期
                usefulMonths:'',//已折旧月数

                debitId:this.$route.params.debitId,
                pickerOptions1:{
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods: {
            model(n){
                if(n == 0) {
                    this.$confirm('是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {

                    });
                }
            },
            //保存分摊按钮
            saveShare(){
                let departmentJson =[];
                let options = this.options;

                if(this.isShare){
                    let input1 = Number(this.input1)
                    let input2 = Number(this.input2)
                    let input3 = Number(this.input3)
                    let input4 = Number(this.input4)
                    let input5 = Number(this.input5)
                    let allInput = parseFloat(input1 + input2 + input3 + input4 + input5).toFixed(2)
//                    console.log(allInput);
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
                                return
                            }
                        }
                        departmentJson.push(item1[0])
                    }else if(this.input1 != '0' && this.select1 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
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
                                return
                            }
                        }
                        departmentJson.push(item2[0])
                    }else if(this.input2 != '0' && this.select2 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
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
                                return
                            }
                        }
                        departmentJson.push(item3[0])
                    }else if(this.input3 != '0' && this.select3 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
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
                                return
                            }
                        }
                        departmentJson.push(item4[0])
                    }else if(this.input4 != '0' && this.select4 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
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
                                return
                            }
                        }
                        departmentJson.push(item5[0])
                    }else if(this.input5 != '0' && this.select5 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
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

                let params = new URLSearchParams();
                let url = addUrl.addUrl('fixedAssetsSave')
                params.append('fixedId',this.debitId)
                params.append('departmentJson',departmentJson)

                axios.post(url,params)
                    .then(response=>{
//                        console.log(response);
                        let status = response.data.status;
                        let msg = response.data.msg
                        if(status == 200){
                            this.$message.success(msg);
                            this.loading = false;
                            this.axios();
                        }else if(status == 400){
                            this.$message.error(msg);
                            this.loading = false;
                        }
                    })


            },
            axios(){
                let params = new URLSearchParams();
                params.append('fixedId',this.debitId);
                let url = addUrl.addUrl('fixedAssets')
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let data = response.data.value;
                        this.options = data.departmentList;
                        let fixedAssets = data.fixedAssets

                        this.name = fixedAssets.name;
                        this.className = fixedAssets.className;
                        this.departmentName = fixedAssets.departmentName;
                        this.divideFlg = fixedAssets.divideFlg;
                        this.usefulLife = fixedAssets.usefulLife;
                        this.originalMoney = number.number(fixedAssets.originalMoney);
                        this.salvageRate = fixedAssets.salvageRate;
                        this.money = number.number(fixedAssets.money);
                        this.startDateYMD = fixedAssets.startDateYMD;
                        this.usefulMonths = fixedAssets.usefulMonths;
                        this.usefulMoney = number.number(fixedAssets.usefulMoney);
                        this.status = fixedAssets.status;

                        //判断是否分摊，给部门/项目赋值
                        if(this.divideFlg == 0){
                            this.isShare =false
                            this.department = fixedAssets.departmentIdString1
                        }else if(this.divideFlg == 1){
                            this.isShare =true
                            this.select1 = fixedAssets.departmentIdString1
                            this.select2 = fixedAssets.departmentIdString2
                            this.select3 = fixedAssets.departmentIdString3
                            this.select4 = fixedAssets.departmentIdString4
                            this.select5 = fixedAssets.departmentIdString5

                            this.input1 = fixedAssets.projectDivRate || 0
                            this.input2 = fixedAssets.projectDivRate2 || 0
                            this.input3 = fixedAssets.projectDivRate3 || 0
                            this.input4 = fixedAssets.projectDivRate4 || 0
                            this.input5 = fixedAssets.projectDivRate5 || 0
                        }
                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                        console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            inputWithSelectChange(n,$event){
                var str = /^[0-9]+(\.[0-9]{0,2})?$/;//判断只允许输入有0-2位小数的正实数
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
            //分摊按钮
            shareClick(){
                if(this.isShare){
                    this.saveName = '保存'
                }else{
                    this.saveName = '保存分摊'
                }
                this.isShare = !this.isShare
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
            params.append('fixedId',this.debitId);
            var url = addUrl.addUrl('intangibleAssets')
            axios.post(url,params)
                .then(response=> {
//                    console.log(response);
                    var data = response.data.value;
                    this.options = data.departmentList;
                    let fixedAssets = data.fixedAssets

                    this.name = fixedAssets.name;
                    this.className = fixedAssets.className;
                    this.divideFlg = fixedAssets.divideFlg;
                    this.usefulLife = fixedAssets.usefulLife;
                    this.originalMoney = number.number(fixedAssets.originalMoney);
                    this.salvageRate = fixedAssets.salvageRate;
                    this.money = number.number(fixedAssets.money);
                    this.startDateYMD = fixedAssets.startDateYMD;
                    this.usefulMonths = fixedAssets.usefulMonths;
                    this.usefulMoney = number.number(fixedAssets.usefulMoney);
                    this.status = fixedAssets.status;

                    //判断是否分摊，给部门/项目赋值
                    if(this.divideFlg == 0){
                        this.isShare =false
                        this.saveName = '保存'
                        this.department = fixedAssets.departmentIdString1
                    }else if(this.divideFlg == 1){
                        this.isShare =true
                        this.saveName = '保存分摊'
                        this.select1 = fixedAssets.departmentIdString1
                        this.select2 = fixedAssets.departmentIdString2
                        this.select3 = fixedAssets.departmentIdString3
                        this.select4 = fixedAssets.departmentIdString4
                        this.select5 = fixedAssets.departmentIdString5

                        this.input1 = fixedAssets.projectDivRate || 0
                        this.input2 = fixedAssets.projectDivRate2 || 0
                        this.input3 = fixedAssets.projectDivRate3 || 0
                        this.input4 = fixedAssets.projectDivRate4 || 0
                        this.input5 = fixedAssets.projectDivRate5 || 0
                    }

                    this.loading = false
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
    .list .hd{
        width:100%;
        height:auto;
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

    .list li .input-with-select{
        font-size:14px;
        width:322px;
        text-align: right;
    }
    .share{
        display: block;
        margin-top: 10px;
        margin-left: 80px;
        float: left;
    }
    .sub2{
        display: block;
        margin-top: 10px;
        margin-left: 60px;
        float: left;
    }
    .input-select{
        width:200px;
    }

</style>
