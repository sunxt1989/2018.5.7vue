<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>部门列表</h2>
                <router-link to="/" class="back">返回</router-link>
                <router-link to="/AccountManagement/addDepartment" class="sub">新增子部门</router-link>
            </div>
        </div>
        <div class="w">
            <div class="left" :style="{height:screenHeight}">
                <el-table :data="tableData" class="blueList">
                    <el-table-column prop="departmentName" label="部门名称" sortable align="center"></el-table-column>
                    <el-table-column prop="departmentType" label="部门类别" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.departmentType == 1">管理</span>
                            <span v-else-if="scope.row.departmentType == 2">生产</span>
                            <span v-else-if="scope.row.departmentType == 3">销售</span>
                            <span v-else-if="scope.row.departmentType == 4">研发</span>
                            <span v-else-if="scope.row.departmentType == 5">财务</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fatherDepartmentName" label="上级部门" sortable align="center"></el-table-column>
                    <el-table-column prop="createTimeYMD" label="创建时间" sortable align="center"></el-table-column>
                    <el-table-column prop="status" label="状态" sortable align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">正常</span>
                            <span v-else>删除</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" align="center">
                        <template slot-scope="scope">
                            <span class="operation">
                                <router-link v-if="scope.row.fatherDepartmentIdStr != '0'" :to="{name:'seeDepartment',params:{debitId:scope.row.idStr}}" class="see">
                                    <i class="icon iconfont icon-shuru blue"></i>
                                </router-link>
                            </span>
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
        data() {
            return {
                tableData: [],//销售收款单审批列表数据
                loading:true,
                screenHeight: '' //页面初始化高度
            }
        },
        methods:{
            //部门删除
            deleteModel(id){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
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
                    this.loading = true;
                    var params = new URLSearchParams();
                    var url = addUrl.addUrl('departmentDelete')
                    params.append('departmentId',id);

                    axios.post(url,params)
                        .then(response=> {
                            this.loading = false;
//                            console.log(response);
                            let status = response.data.status
                            let msg = response.data.msg
                            if(status == 200){
                                this.axios();
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }else if(status == 400){
                                this.$message.error(msg)
                            }
                        })
                        .catch(error=> {
                            this.loading = false;
//                        console.log(error);
                            alert('网络错误，不能访问');
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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
            var url = addUrl.addUrl('departmentList')
            axios.post(url)
                .then(response=> {
                    this.loading = false;
//                    console.log(response);
                    var data = response.data.value;//列表数据
                    this.tableData = data.departmentList
                })
                .catch(error=> {
//                    console.log(error);
                    alert('网络错误，不能访问1');
                })
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
    .sub{
        display: inline-block;
        width:100px;
        height:30px;
        background-color: #409EFF;
        border: 1px solid #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        text-decoration: none;
        color: #fff;
        position: absolute;
        right:110px;
        font-size:12px;
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
    .repayment {
        text-decoration: none;
    }
    .operation {
        cursor: pointer;
    }
    .el-table {
        margin: 30px 0;
    }
    .el-select {
        margin: 0 20px;
    }
    .see{
        text-decoration: none;
    }

</style>
