<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>科目余额</h2>
                <router-link to="/" class="back">返回</router-link>
                <a :href=url1 target="_blank" class="sub1">导出Excel</a>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <div class="choose">
                    <span class="record">会计区间：</span>
                    <el-date-picker
                        class="chooseTime"
                        v-model="startTime"
                        type="month"
                        size="small"
                        align="right"
                        value-format="yyyy-MM">
                    </el-date-picker>
                    -
                    <el-date-picker
                        class="chooseTime"
                        v-model="endTime"
                        type="month"
                        size="small"
                        align="right"
                        value-format="yyyy-MM">
                    </el-date-picker>
                    <span class="record">科目区间：</span>
                    <el-input placeholder="请输入内容" size="small" v-model="startSubject" class="chooseSubject" @change="changeSubject(0)">
                        <el-button slot="append" icon="el-icon-search" @click="addClick(0)"></el-button>
                    </el-input>
                    -
                    <el-input placeholder="请输入内容" size="small" v-model="endSubject" class="chooseSubject" @change="changeSubject(1)">
                        <el-button slot="append" icon="el-icon-search" @click="addClick(1)"></el-button>
                    </el-input>
                    <el-button @click="query" class="query" size="small" type="primary">查询</el-button>

                    <el-dialog title="科目区间" :visible.sync="dialogTableVisible" showConfirmButton="true" top="20px">
                        <el-tabs v-if="current_account_standard == 1" v-model="classSubject" type="card" @tab-click="clickSubject">
                            <el-tab-pane label="资产" name="1">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree1" :props="defaultProps"
                                             ref="Tree1"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck1">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="负债" name="2">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree2" :props="defaultProps"
                                             ref="Tree2"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck2">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="权益" name="3">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree3" :props="defaultProps"
                                             ref="Tree3"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck3">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="成本" name="4">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree4" :props="defaultProps"
                                             ref="Tree4"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck4">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="损益" name="5">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree5" :props="defaultProps"
                                             ref="Tree5"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck5">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <el-tabs v-if="current_account_standard == 2" v-model="classSubject" type="card" @tab-click="clickSubject">
                            <el-tab-pane label="资产" name="1">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree1" :props="defaultProps"
                                             ref="Tree1"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck1">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="负债" name="2">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree2" :props="defaultProps"
                                             ref="Tree2"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck2">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="共同类" name="3">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree3" :props="defaultProps"
                                             ref="Tree3"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck3">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="权益" name="4">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree4" :props="defaultProps"
                                             ref="Tree4"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck4">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="成本" name="5">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree5" :props="defaultProps"
                                             ref="Tree5"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck5">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="损益" name="6">
                                <div class="Tree" :style="{height:treeHeight}">
                                    <el-tree :data="tree6" :props="defaultProps"
                                             ref="Tree6"
                                             default-expand-all
                                             check-on-click-node
                                             show-checkbox
                                             check-strictly
                                             node-key="name"
                                             @check="clickCheck6">
                                    </el-tree>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                        <el-button @click="treeSave" class="treeSave" size="small" type="primary">保存</el-button>
                    </el-dialog>
                </div>
                <el-table :data="tableData" class="single" :height="tableDataHeight">
                    <el-table-column prop="subjectCode" label="科目编号" align="center" width="100px"></el-table-column>
                    <el-table-column prop="subjectName" label="科目名称" align="center"></el-table-column>
                    <el-table-column label="年初余额">
                        <el-table-column prop="debitQC" header-align="center" align="right" label="借方"></el-table-column>
                        <el-table-column prop="creditQC" header-align="center" align="right" label="贷方"></el-table-column>
                    </el-table-column>
                    <el-table-column label="本期发生额">
                        <el-table-column prop="debitBQ" header-align="center" align="right" label="借方"></el-table-column>
                        <el-table-column prop="creditBQ" header-align="center" align="right" label="贷方"></el-table-column>
                    </el-table-column>
                    <el-table-column label="本年累计发生额">
                        <el-table-column prop="debitBN" header-align="center" align="right" label="借方"></el-table-column>
                        <el-table-column prop="creditBN" header-align="center" align="right" label="贷方"></el-table-column>
                    </el-table-column>
                    <el-table-column label="期末余额">
                        <el-table-column prop="debitQM" header-align="center" align="right" label="借方"></el-table-column>
                        <el-table-column prop="creditQM" header-align="center" align="right" label="贷方"></el-table-column>
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
    import { mapState } from 'vuex'
    export default {
        data() {
            return {
                n:'',//判断选择科目区间 0：科目起始区间 ，1：科目终止区间
                tableData: [],//采购付款单审批列表数据
                startTime:'',//会计区间起始月份
                endTime:'',//会计区间终止月份
                startSubject:'',//科目区间起始
                endSubject:'',//科目区间终止
                classSubject:'1',//科目选择分类
                tree1: [],//资产
                tree2: [],//负债
                tree3: [],//共同类
                tree4: [],//权益
                tree5: [],//成本
                tree6: [],//损益
                currentAccountStandard:2,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                loading:true,
                url1:'',//导出地址
                screenHeight: '', //页面初始化高度
                treeHeight: '', //tree高度
                tableDataHeight: 460, //表格显示高度
                dialogTableVisible:false,//新建明细模态框是否显示
            }
        },
        methods:{
            //查询按钮click事件
            query(){
                this.loading = true;
                let startTime = this.startTime
                let endTime = this.endTime
                if(startTime == null || endTime == null){
                    this.loading = false;
                    this.$message.error('请填写会计区间');
                    return
                }
                if(startTime.substring(0,4) != endTime.substring(0,4)){
                    this.loading = false;
                    this.$message.error('会计区间不能跨年查询');
                    return
                }else if(Number(startTime.substring(5,7)) > Number(endTime.substring(5,7))){
                    this.loading = false;
                    this.$message.error('请正确填写会计区间');
                    return
                }
                this.axios()
            },
            //change科目区间 判断只能输入数字
            changeSubject(n){
                let str = /^\d+$/;//判断只允许输入正整数
                if(n == 0){
                    if(!str.test(this.startSubject)){
                        this.$message.error('科目区间只允许输入正整数');
                        this.startSubject = '';
                        return
                    }
                }else if(n == 1){
                    if(!str.test(this.endSubject)){
                        this.$message.error('科目区间只允许输入正整数');
                        this.endSubject = '';
                        return
                    }
                }
            },
            //切换科目区间选项时触发事件，请求axios获取新的tree
            clickSubject(){
                this.loading = true;
                this.treeAxios(this.classSubject)
                if(this.classSubject == 1){
                    this.$refs.Tree1.setCheckedKeys([]);
                }else if(this.classSubject == 2){
                    this.$refs.Tree2.setCheckedKeys([]);
                }else if(this.classSubject == 3){
                    this.$refs.Tree3.setCheckedKeys([]);
                }else if(this.classSubject == 4){
                    this.$refs.Tree4.setCheckedKeys([]);
                }else if(this.classSubject == 5){
                    this.$refs.Tree5.setCheckedKeys([]);
                }else if(this.classSubject == 6){
                    this.$refs.Tree6.setCheckedKeys([]);
                }
            },
            //科目选择保存按钮
            treeSave(){
                let subject = ''
                if(this.classSubject == '1'){
                    subject = (this.$refs.Tree1.getCheckedKeys()[0] == undefined)?'':parseInt(this.$refs.Tree1.getCheckedKeys()[0])
                }else if(this.classSubject == '2'){
                    subject = (this.$refs.Tree2.getCheckedKeys()[0] == undefined)?'':parseInt(this.$refs.Tree2.getCheckedKeys()[0])
                }else if(this.classSubject == '3'){
                    subject = (this.$refs.Tree3.getCheckedKeys()[0] == undefined)?'':parseInt(this.$refs.Tree3.getCheckedKeys()[0])
                }else if(this.classSubject == '4'){
                    subject = (this.$refs.Tree4.getCheckedKeys()[0] == undefined)?'':parseInt(this.$refs.Tree4.getCheckedKeys()[0])
                }else if(this.classSubject == '5'){
                    subject = (this.$refs.Tree5.getCheckedKeys()[0] == undefined)?'':parseInt(this.$refs.Tree5.getCheckedKeys()[0])
                }else if(this.classSubject == '6'){
                    subject = (this.$refs.Tree6.getCheckedKeys()[0] == undefined)?'':parseInt(this.$refs.Tree6.getCheckedKeys()[0])
                }
                if(subject != ''){
                    if(this.n == 0){
                        this.startSubject = subject
                    }else if(this.n == 1){
                        this.endSubject = subject
                    }
                }else{
                    if(this.n == 0){
                        this.startSubject = ''
                    }else if(this.n == 1){
                        this.endSubject = ''
                    }
                }
                this.dialogTableVisible = false;
            },
            //将tree结构的复选框调整为radio状态
            clickCheck1(data,checkedKeys){
                //判断，如果checkedKeys.checkedKeys.length == 0 时说明点击的为已选框，则将勾选取消。否则，仅将点击的框赋值勾选，而其他已勾选的框取消。
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree1.setCheckedKeys([]);
                }else{
                    this.$refs.Tree1.setCheckedKeys([data.name]);
                }

            },
            clickCheck2(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree2.setCheckedKeys([]);
                }else {
                    this.$refs.Tree2.setCheckedKeys([data.name]);
                }
            },
            clickCheck3(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree3.setCheckedKeys([]);
                }else {
                    this.$refs.Tree3.setCheckedKeys([data.name]);
                }
            },
            clickCheck4(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree4.setCheckedKeys([]);
                }else {
                    this.$refs.Tree4.setCheckedKeys([data.name]);
                }
            },
            clickCheck5(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree5.setCheckedKeys([]);
                }else {
                    this.$refs.Tree5.setCheckedKeys([data.name]);
                }
            },
            clickCheck6(data,checkedKeys){
                if(checkedKeys.checkedKeys.length == 0){
                    this.$refs.Tree6.setCheckedKeys([]);
                }else {
                    this.$refs.Tree6.setCheckedKeys([data.name]);
                }
            },
            //获取tree结构的axios请求
            treeAxios(n){
                let url = addUrl.addUrl('tree')
                let params = new URLSearchParams();
                params.append('type',n);
                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        let data = response.data.value;//列表数据
//                        console.log(data);
                        if(n == 1){
                            this.tree1 = data.zNodes
                        }else if(n == 2){
                            this.tree2 = data.zNodes
                        }else if(n == 3){
                            this.tree3 = data.zNodes
                        }else if(n == 4){
                            this.tree4 = data.zNodes
                        }else if(n == 5){
                            this.tree5 = data.zNodes
                        }else if(n == 6){
                            this.tree6 = data.zNodes
                        }
                    })
                    .catch(error=> {
//                        console.log(error);
                        alert('网络错误，不能访问');
                        this.loading = false;
                    })
            },
            //打开科目区间选择模态框
            addClick(n){
                this.n = n
                this.dialogTableVisible = true;
                this.treeAxios(1)
            },
            axios(){
                let url1 = addUrl.addUrl('subjectBalanceExcel');
                this.url1 = url1 + '?startDate=' + this.startTime + '&endDate='+ this.endTime +  '&startSub=' + this.startSubject + '&endSub=' + this.endSubject
//                console.log(this.url1);
                let url = addUrl.addUrl('subjectBalance')
                let params = new URLSearchParams();
                params.append('startDate',this.startTime);
                params.append('endDate',this.endTime);
                params.append('startSub',this.startSubject);
                params.append('endSub',this.endSubject);
                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;//列表数据
                            this.tableData = data.dataList
                            this.loading = false;
                        }else if(status == 400){
                            this.$message.error(msg);
                            this.loading = false;
                        }

                    })
                    .catch(error=> {
//                    console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
        },
        computed:mapState(['current_book_ym','start_ym','current_account_standard']),
        mounted(){
            // 动态设置背景图的高度为浏览器可视区域高度
            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            let topHeight = $('.top').innerHeight()
            let headerHeight = $('header').innerHeight()
//            console.log(topHeight);
//            console.log(headerHeight);
            this.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
            this.treeHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 220}px`;
            this.tableDataHeight = Number(document.documentElement.clientHeight - topHeight - headerHeight - 180);
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                let topHeight = $('.top').innerHeight()
                let headerHeight = $('header').innerHeight()
//                console.log(topHeight);
//                console.log(headerHeight);
                that.screenHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 85}px`;
                that.treeHeight = `${document.documentElement.clientHeight - topHeight - headerHeight - 220}px`;
                that.tableDataHeight =  Number(document.documentElement.clientHeight - topHeight - headerHeight - 180);
            };
        },
        created(){
            this.startTime = this.current_book_ym.substring(0,4) + '-01'
            this.endTime = this.current_book_ym.substring(0,4) + '-' +this.current_book_ym.substring(4,6);
            this.axios()
        },
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
    .query{
        margin-left: 30px;
    }
    .left {
        width: 1120px;
        background-color: #fff;
        padding: 20px 40px;
        text-align: left;
        box-shadow: 0px 2px 7px rgba(0,0,0,0.25);
        overflow-y: auto;
    }
    .record {
        font-size: 18px;
        color: #333;
        margin-right: 20px;
    }
    .el-table {
        margin: 10px 0;
    }
    .el-select {
        margin: 0 20px;
    }
    .see{
        text-decoration: none;
    }
    .choose .record{
        font-size:16px;
        color: #333;
    }
    .choose .chooseTime{
        width:120px;
    }
    .choose .chooseSubject{
        width:160px;
    }
    .Tree{
        height:450px;
        overflow: auto;
    }
    .treeSave{
        width:80px;
        margin-top: 10px;
        margin-left: 30px;
    }

</style>
