<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w">
            <div class="top">
                <h2>创建报销单</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub1">保存</el-button>
                <el-button @click="model(2)" size="small" type="danger" class="sub2">提交</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>新建报销单</span>
                </div>
                <el-button type="danger" plain size="small" class="share" @click="shareClick">
                    <span v-show="!isShare">费用分摊</span>
                    <span v-show="isShare">取消费用分摊</span>
                </el-button>
                <ul class="list cf">
                    <li class="hd" v-show="!isShare">
                        <span class="tit"><span class="red">*</span>部门/项目</span>
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
                        <span class="tit"><span class="red">*</span>部门/项目</span>
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
                        <span class="tit"><span class="red">*</span>部门/项目</span>
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
                        <span class="tit"><span class="red">*</span>部门/项目</span>
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
                        <span class="tit"><span class="red">*</span>部门/项目</span>
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
                        <span class="tit"><span class="red">*</span>部门/项目</span>
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
                        <span class="tit">报销名称</span>
                        <input class="ipt" type="text" v-model="originalTypeName" readonly>
                    </li>
                    <li class="sm">
                        <span class="tit">报销日期</span>
                        <el-date-picker
                            class="data"
                            v-model="simpleReceiptDate"
                            type="date"
                            @change="changeTime"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions1"
                            placeholder="选择日期">
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
                    <li class="pt cf">
                        <span class="tit2">事由</span>
                            <textarea class="tex" v-model="discription" maxlength="50">
                            </textarea>
                    </li>
                </ul>
                <div class="line">
                    <span>消费明细</span>
                </div>
                <el-button type="primary" @click="addClick" class="gridDataAdd" size="small">添加费用单</el-button>

                <el-dialog title="费用列表" :visible.sync="dialogTableVisible" showConfirmButton="true">
                    <el-table :data="gridData" class="blueList">
                        <el-table-column property="idString" label="" align="center" width="30px">
                            <template slot-scope="scope">
                                <span class="checkbox">
                                <input name=checked type="checkbox" :value=scope.row.idString class="inputcheckbox" >
                                <i class="iconfont icon-31xuanze"></i>
                            </span>
                            </template>
                        </el-table-column>

                        <el-table-column property="childTypeName" label="类型" align="center"></el-table-column>
                        <el-table-column property="simpleReceiptDate" label="时间"  align="center"></el-table-column>
                        <el-table-column property="discription" label="描述" align="center"></el-table-column>
                        <el-table-column property="operateUserName" label="姓名" align="center"></el-table-column>
                        <el-table-column property="money" label="金额" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.showMoney }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <span class="checkbox checkboxAll">
                        <input name=checkAll @change="checkAllChange($event)" type="checkbox" class="inputcheckbox" >
                        <i class="iconfont icon-31xuanze"></i>
                    </span>
                    <span class="all">全选</span>
                    <el-button type="primary" class="saveList" @click="saveList" size="small">保存</el-button>
                </el-dialog>

                <el-table class="hkTable grayList" :data="receiptList">
                    <el-table-column prop="childTypeName" label="类型" sortable align="center"></el-table-column>
                    <el-table-column prop="simpleReceiptDate" label="日期" sortable align="center"></el-table-column>
                    <el-table-column prop="discription" label="描述" sortable align="center"></el-table-column>
                    <el-table-column prop="operateUserName" label="姓名" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="金额" sortable align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.showMoney }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receiptCount" label="附件张数" sortable align="center"></el-table-column>
                    <el-table-column prop="money" label="操作"  align="center">
                        <template slot-scope="scope">
                            <i class="icon iconfont icon-shanchu red" @click='deleteList(scope.row.idString)'></i>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    import number from '../../../../static/js/number'
    import unNumber from '../../../../static/js/unNumber'
    import addUrl from '../../../../static/js/addUrl'
    export default {
        data () {
            return {
                type:this.$route.params.type,
                ids:this.$route.params.idStr,

                originalTypeName:'',//报销名称
                money:'',//总金额
                simpleReceiptDate:'',//报销日期
                receiptCount:'',//票据张数
                discription:'',//事由

                originalType:'',//费用类别

                originalReceiptIds:'',//费用单id字符串（用逗号拼接）
                originalReceiptIdArr:'',//费用单id字符串（数组形式）

                receiptList:[],//消费明细列表（选中列表）
                gridData:[],//费用列表（未选中列表）

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

                isShare:false,//是否分摊
                options:[],//报销部门列表
                dialogTableVisible: false,//可用的费用单列表状态

                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                isTrue:true,
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
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
            //费用分摊按钮点击事件
            shareClick(){
                this.isShare = !this.isShare
            },
            model(n){
                if(n == 0){
                    this.$confirm('填写的信息还未提交，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {

                    });
                }else{
                    //是否为分摊状态
                    if(this.isShare){
                        let input1 = Number(this.input1)
                        let input2 = Number(this.input2)
                        let input3 = Number(this.input3)
                        let input4 = Number(this.input4)
                        let input5 = Number(this.input5)
                        let allInput = (input1 * 100) + (input2 * 100) + (input3 * 100) + (input4 * 100) + (input5 * 100);
//                        console.log(allInput);
                        //判断所有填写的百分比是不是等于100
                        if(allInput/100 != 100 ){
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

                    if(n == 1){
                        this.$confirm('确定是否保存？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submit(1)
                        })
                    }else{
                        this.$confirm('确定是否提交？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.submit(2)
                        })
                    }
                }
            },
            submit(n){
                this.loading = true;
                var params = new URLSearchParams();
                var money = unNumber.unNumber(this.money);
                var departmentJson = [] ;
                var options = this.options;
                var url = ''
                var saveUrl = addUrl.addUrl('newReimbursementSave')
                var submitUrl = addUrl.addUrl('newReimbursementSubmit')

                if(n == 1){
                    url = saveUrl
                }else if(n == 2){
                    url = submitUrl
                }

                if(this.isShare){
                    if (this.input1 != 0 && this.select1 != '') {
                        let item1 = options.filter(x =>{
                            return x.id == this.select1
                        })

                        item1[0].rate = this.input1;
                        if(departmentJson.indexOf(item1[0]) == 0){ //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            return
                        }else{
                            departmentJson.push(item1[0])
                        }

                    }else if(this.input1 != 0 && this.select1 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        return
                    }

                    if (this.input2 != 0 && this.select2 != '') {
                        let item2 = options.filter(x =>{
                            return x.id == this.select2
                        })
                        item2[0].rate = this.input2;
                        if(departmentJson.indexOf(item2[0]) == 0){ //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            return
                        }else{
                            departmentJson.push(item2[0])
                        }
                    }else if(this.input2 != 0 && this.select2 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        return
                    }

                    if (this.input3 != 0 && this.select3 != '') {
                        let item3 = options.filter(x =>{
                            return x.id == this.select3
                        })
                        item3[0].rate = this.input3;
                        if(departmentJson.indexOf(item3[0]) == 0){ //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            return
                        }else{
                            departmentJson.push(item3[0])
                        }

                    }else if(this.input3 != 0 && this.select3 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        return
                    }

                    if (this.input4 != 0 && this.select4 != '') {
                        let item4 = options.filter(x =>{
                            return x.id == this.select4
                        })
                        item4[0].rate = this.input4;
                        if(departmentJson.indexOf(item4[0]) == 0){ //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            return
                        }else{
                            departmentJson.push(item4[0])
                        }
                    }else if(this.input4 != 0 && this.select4 == ''){
                        this.$message.error('请正确选择部门/项目');
                        this.loading = false;
                        return
                    }

                    if (this.input5 != 0 && this.select5 != '') {
                        let item5 = options.filter(x =>{
                            return x.id == this.select5
                        })
                        item5[0].rate = this.input5;
                        if(departmentJson.indexOf(item5[0]) == 0){ //判断是否有重复填写部门/项目的情况
                            this.$message.error('分摊部门/项目不能相同，请重新选择');
                            this.loading = false;
                            return
                        }else{
                            departmentJson.push(item5[0])
                        }
                    }else if(this.input5 != 0 && this.select5 == ''){
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

                this.originalReceiptIds = this.originalReceiptIdArr.join(',');

                params.append('id',0);
                params.append('discription',this.discription);
                params.append('money',money);
                params.append('departmentJson',departmentJson);
                params.append('applicationDate',this.simpleReceiptDate);
                params.append('originalReceiptIds',this.originalReceiptIds);
                params.append('receiptCount',this.receiptCount);
                params.append('originalType',this.originalType);

                axios.post(url, params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '已成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    });
            },
            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.simpleReceiptDate;
                if(date){
                    this.startDate = date[0]
                    this.endDate = date[1]
                }else{
                    this.startDate = '';
                    this.endDate = '';
                }
            },
            //删除消费明细列表项
            deleteList(id){
                var list = this.receiptList;
                var arr = this.originalReceiptIdArr;
                var money = unNumber.unNumber(this.money)

                //将临时删除的明细项存入临时列表nowList，当添加时将临时列表加入进去
                for(var i=0; i <list.length; i++){
                    if(id == list[i].idString){
                        money -= list[i].money;
                        this.receiptCount -= list[i].receiptCount;
                        list.splice(i,1)
                    }
                }
                for(var i = 0; i < arr.length; i++){
                    if(id == arr[i]){
                        arr.splice(i,1)
                    }
                }
                this.money = number.number(money);
                this.receiptList = list;
                this.originalReceiptIdArr = arr;
            },
            //点击添加按钮，弹出费用列表
            addClick(){
                this.loading = true;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('newReimbursementList')
                params.append('type',this.type);
                axios.post('http://192.168.2.190:8080/web/vue/expense/enableReceiptList.html', params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        var arr = this.originalReceiptIdArr;
                        var data = response.data.value;
//                        console.log(data);
                        if(data){
                            for(var i = 0; i < arr.length; i++){
                                for(var ii = 0; ii < data.length; ii++){
                                    data[ii].showMoney = number.number(data[ii].money)
                                    if(arr[i] == data[ii].idString){
                                        data.splice(ii,1)
                                    }
                                }
                            }
                        }
                        this.gridData = data;
//                        console.log(this.gridData);
                    });
                this.dialogTableVisible = true;
            },
            //全选按钮change事件
            checkAllChange(e){
                var input = $("input[name=checked]")
                if(e.target.checked){
                    input.prop('checked', true);
                }else{
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
                input.each(function(i){
                     str.push(input[i].value);
//                    console.log(str);
                });
                if(gridData){
                    for(var i = 0; i < gridData.length; i++){
                        for(var ii = 0; ii < str.length; ii++){
                            if(gridData[i].idString == str[ii]){
                                money += gridData[i].money;
                                this.receiptCount += gridData[i].receiptCount;
                                receiptList.push(gridData[i])//把删除的元素添加进数组
                                gridData.splice(i,1);//删除元素
                            }
                        }
                    }
                    this.money = number.number(money);
                    this.originalReceiptIdArr = str;
                    this.receiptList = receiptList;
                    this.gridData = gridData;
                }
                this.dialogTableVisible = false;
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
            var url = addUrl.addUrl('newReimbursement')
//            console.log(this.ids);
            params.append('originalReceiptId',this.ids);
            axios.post(url,params)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;
//                    console.log(data);
                    this.options = data.departmentList;

                    var tableDataarr =[];
                    if(data.receiptList){
                        for(var i =0; i < data.receiptList.length; i++){
//                            console.log(data.receiptList[i]);
                            data.receiptList[i].showMoney = number.number(data.receiptList[i].money);
                            tableDataarr.push(data.receiptList[i])
                        }
                        this.receiptList = tableDataarr;
                    }else{
                        this.receiptList = data.receiptList
                    }

                    this.originalReceiptIds = data.applicationReceiptIds;

                    this.simpleReceiptDate = data.application.simpleReceiptDate;
                    this.originalTypeName = data.application.originalTypeName;
                    this.money = number.number(data.application.money);
                    this.receiptCount = data.application.receiptCount;
                    this.originalType = data.application.originalType;


                    this.originalReceiptIdArr = this.originalReceiptIds.split(',')
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
        float: left;
    }
    .list .sm{
        width:50%;
    }
    .list .pt{
        width:100%;
        height:70px;
    }
    .list .ptx{
        width:100%;
        height:170px;
        padding: 0px;
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
    .list li .data{
        width:340px;
    }
    .list li .sel{
        width:340px;
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



    .sub1{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .sub2{
        position: absolute;
        right:190px;
        font-size:12px;
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
        font-size:20px;
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

    .all{
        display: inline-block;
        font-size:16px;
        margin-top: 10px;
        margin-left: -80%;
    }
    .checkboxAll{
        margin: 10px 10px;
    }
    .saveList{
        position: absolute;
        bottom:10px;
        right: 50px;
    }
    .gridDataAdd{
        display: block;
        margin: 10px;
        float: right;
    }
    .list li .input-with-select{
        font-size:14px;
        width:340px;
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

</style>
