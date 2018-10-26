<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>新建项目</h2>
                <el-button @click="model(0)" size="small" class="back">返回</el-button>
                <el-button @click="model(1)" size="small" type="primary" class="sub" :loading="isLoading">保存</el-button>
            </div>
        </div>
        <div class="w">
            <div class="content" :style="{height:screenHeight}">
                <div class="line">
                    <span>新建项目</span>
                </div>
                <ul class="list cf">
                    <li class="sm">
                        <span class="tit">项目编号</span>
                        <input class="ipt" type="text" v-model="projectNumber" maxlength="20">
                    </li>
                    <li class="sm">
                        <span class="tit">项目名称</span>
                        <input class="ipt" type="text" v-model="projectName" maxlength="20">
                    </li>
                    <li class="sm">
                        <span class="tit">开始日期-结束日期</span>
                        <el-date-picker
                            class="sel"
                            v-model="timeInterval"
                            type="daterange"
                            align="right"
                            unlink-panels
                            @change="changeTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </li>
                    <li class="sm">
                        <span class="tit">类型</span>
                        <el-select class="sel" v-model="projectType" placeholder="请选择" >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm">
                        <span class="tit">状态</span>
                        <el-select class="sel" v-model="projectStatus" placeholder="请选择" >
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </li>
                    <li class="sm">
                        <span class="tit">项目负责人</span>
                        <el-select class="sel" v-model="projectPerson" placeholder="请选择" >
                            <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.name"
                                :value="item.userId">
                            </el-option>
                        </el-select>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../../static/js/addUrl'
    import { mapState } from 'vuex'
    export default{
        data() {
            return{
                projectNumber:'',//项目编号
                projectName:'',//项目名称
                startDate:'',//开始日期
                endDate:'',//结束日期
                projectType:'',//类型
                options:[
                    {value:'1',label:'自主研发'},
                    {value:'3',label:'委托研发'}
                ],
                projectStatus:'',//状态
                options2:[
                    {value:'1',label:'未完成'},
                    {value:'2',label:'已完成'},
                ],
                projectPerson:'',//项目负责人
                options3:[],
                timeInterval:'',//起始时间和结束时间数组

                loading:true,
                isLoading:false,
                screenHeight: '' //页面初始化高度
            }
        },
        computed:mapState(['current_book_ym']),
        methods: {
            //选择记录日期事件
            changeTime(){
                //设置记录日期的起始日期和终止日期
                const date = this.timeInterval;
                if(date){
                    this.startDate = date[0];
                    this.endDate = date[1];
                }else{
                    this.startDate = '';
                    this.endDate = '';
                }
            },
            model(n){
                this.loading = true
                if(n == 0){
                    this.$confirm('填写的信息还未保存，是否返回？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.go(-1)
                    }).catch(() => {
                        this.loading = false
                    });
                }else{
                    if (this.projectNumber == '') {
                        this.$message.error('请正确输入项目编号');
                        this.loading = false;
                        return
                    } else if (this.projectName == '') {
                        this.$message.error('请正确输入项目名称');
                        this.loading = false;
                        return
                    }
                    if (this.timeInterval == '') {
                        this.$message.error('请正确输入时间');
                        this.loading = false;
                        return
                    }
                    if(this.projectType == ''){
                        this.$message.error('请正确输入类型');
                        this.loading = false;
                        return
                    }
                    if(this.projectStatus == ''){
                        this.$message.error('请正确输入状态');
                        this.loading = false;
                        return
                    }
                    if(this.projectPerson == ''){
                        this.$message.error('请正确输入项目负责人');
                        this.loading = false;
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
                        this.axios();
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
            axios(){
                var params = new URLSearchParams();
                var url = addUrl.addUrl('projectSave')

                params.append('id','');
                params.append('projectNumber',this.projectNumber);
                params.append('projectName',this.projectName);
                params.append('projectPerson',this.projectPerson);
                params.append('startDate',this.startDate);
                params.append('endDate',this.endDate);
                params.append('projectType',this.projectType);
                params.append('projectStatus',this.projectStatus);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(response);
                        if(response.data.status == 200){
                            this.$router.go(-1);
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        }else if(response.data.status == 400){
                            var msg = response.data.msg;
                            this.$message.error(msg);
                        }
                    })
                    .catch(error=> {
                        this.loading = false;
                        this.isLoading = false;
//                        console.log(error);
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
            var url = addUrl.addUrl('seeProject')
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value;
                    this.options3 = data.userList;
                    this.endDate = data.project.endDate
                    this.startDate = data.project.startDate
                    this.timeInterval = [data.project.startDate,data.project.endDate]

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
    .list .pt{
        width:100%;

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
        vertical-align: middle;
    }
    .top .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }

</style>
