<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>缴税单列表</h2>
                <router-link to="/" class="back">返回</router-link>
                <el-button @click="stateClick(1)" size="small" type="primary" class="sub5" >驳回</el-button>
                <el-button @click="stateClick(4)" size="small" type="primary" class="sub4" >通过</el-button>
                <el-button @click="stateClick(3)" size="small" type="primary" class="sub3" >等待审核</el-button>
                <el-button @click="stateClick(0)" size="small" type="primary" class="sub2" >未提交</el-button>
                <el-button @click="stateClick(5)" size="small" type="primary" class="sub1" >全部</el-button>
                <router-link to="/Taxation/newTaxation" class="back2">创建缴税单</router-link>

            </div>
            <div class="w">
                <div class="content cf">
                    <el-date-picker
                        class="yearSelect"
                        v-model="year"
                        type="year"
                        placeholder="选择年"
                        size="small"
                        value-format="yyyy"
                        @change="changeYear">
                    </el-date-picker>

                    <el-tabs class="tabs" v-model="ymName" @tab-click="ymClick">
                        <el-tab-pane name="01">
                            <span slot="label" class="mon">1月</span>
                        </el-tab-pane>
                        <el-tab-pane name="02">
                            <span slot="label" class="mon">2月</span>
                        </el-tab-pane>
                        <el-tab-pane name="03">
                            <span slot="label" class="mon">3月</span>
                        </el-tab-pane>
                        <el-tab-pane name="04">
                            <span slot="label" class="mon">4月</span>
                        </el-tab-pane>
                        <el-tab-pane name="05">
                            <span slot="label" class="mon">5月</span>
                        </el-tab-pane>
                        <el-tab-pane name="06">
                            <span slot="label" class="mon">6月</span>
                        </el-tab-pane>
                        <el-tab-pane name="07">
                            <span slot="label" class="mon">7月</span>
                        </el-tab-pane>
                        <el-tab-pane name="08">
                            <span slot="label" class="mon">8月</span>
                        </el-tab-pane>
                        <el-tab-pane name="09">
                            <span slot="label" class="mon">9月</span>
                        </el-tab-pane>
                        <el-tab-pane name="10">
                            <span slot="label" class="mon">10月</span>
                        </el-tab-pane>
                        <el-tab-pane name="11">
                            <span slot="label" class="mon">11月</span>
                        </el-tab-pane>
                        <el-tab-pane name="12">
                            <span slot="label" class="mon">12月</span>
                        </el-tab-pane>
                    </el-tabs>

                    <el-table class="single" :data="tableData3">
                        <el-table-column align="center" sortable prop="taxName" label="税种名称"></el-table-column>
                        <el-table-column align="center" sortable prop="amount" label="金额"></el-table-column>
                        <el-table-column align="center" sortable prop="submitTimeStr" label="日期"></el-table-column>
                        <el-table-column align="center" sortable prop="showState" label="状态"></el-table-column>
                        <el-table-column align="center" prop="showState" label="操作">
                            <template slot-scope="scope">
                                <span class="operation">
                                    <router-link :to="{name:'seeTaxation',params:{debitId:scope.row.idStr}}" class="see">
                                        <i class="icon iconfont icon-kanguo blue"></i>
                                    </router-link>
                                </span>

                                <span class="operation">
                                    <i v-if='scope.row.auditFlg == 0' @click='deleteModel(scope.row.idStr)'
                                       class="icon iconfont icon-shanchu red"></i>
                                    <i v-else-if='scope.row.auditFlg == 1' @click='deleteModel(scope.row.idStr)'
                                       class="icon iconfont icon-shanchu red"></i>
                                    <i v-else class="icon iconfont icon-shanchu black" style="cursor: auto"></i>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
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
                state:'',//状态
                currentYM:'',//当前账期
                indexYM:'',//显示账期
                url1:'',//导出Excel
                url2:'',//导出PDF
                ymName: '',
                year:'',
                tableData3:[],
                loading:true
            }
        },
        methods: {
            //删除提示模态框
            deleteModel(id){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteList(id)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //删除列表信息
            deleteList(isId){
                this.loading = true;
                var debitId = isId;
                var params = new URLSearchParams();
                var url = addUrl.addUrl('TaxationDelete')
//                console.log(debitId);
                params.append('id',debitId);

                axios.post(url,params)
                    .then(response=> {
                        this.loading = false;
//                        console.log(response);
                        this.axios();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    .catch(error=> {
                        this.loading = false;
//                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            },
            stateClick(n){
                if(n == 5){
                    this.state = ''
                }else{
                    this.state = n
                }
                this.axios()
            },
            //年change事件
            changeYear(){
                this.indexYM = String(this.year) + String(this.ymName)
                if(Number(this.currentYM) < Number(this.indexYM) || Number(this.indexYM) < Number(this.start_ym)){
                    this.$message.error('对不起，当前日期没有数据')
                }else{
                    this.axios()
                }
            },
            //月change事件
            ymClick() {
                this.indexYM = String(this.year) + String(this.ymName)
                if(Number(this.currentYM) < Number(this.indexYM) || Number(this.indexYM) < Number(this.start_ym)){
                    this.$message.error('对不起，当前日期没有数据')
                }else{
                    this.axios()
                }
            },

            axios(){
                this.loading = true
                let params = new URLSearchParams();
                let url = addUrl.addUrl('TaxationList');
                params.append('ym', this.indexYM);
                params.append('state', this.state);
                axios.post(url,params)
                    .then(response=> {
//                        console.log(response);
                        let status = response.data.status
                        let msg = response.data.msg
                        if(status == 200){
                            let data = response.data.value;
                            this.tableData3 = data.dataList;
                        }else if(status == 400){
                            this.$message.error(msg)
                            this.tableData3 = [];
                        }
                        this.loading = false
                    })
                    .catch(()=>{
                        this.loading = false
                    })
            }
        },
        computed:mapState(['start_ym']),
        created(){
            this.url1 = addUrl.addUrl('LRBeportExcel');
            this.url2 = addUrl.addUrl('LRBeportPDF');
            let url = addUrl.addUrl('Taxation');
            axios.post(url)
                .then(response=> {
//                    console.log(response);
                    let data = response.data.value
                    let currentYM = data.currentYM;

                    this.year = currentYM.substring(0,4)
                    this.ymName = currentYM.substring(5,7)
                    this.currentYM = currentYM
                    this.indexYM = currentYM
                    this.axios()
                })
                .catch(()=>{
                    this.loading = false
                })
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
    .tabs{
        display: inline-block;
        width:86%;
        float: left;
        margin-left: 2%;
    }
    .yearSelect{
        display: inline-block;
        width:12%;
        float: left;
        margin-top: 10px;
    }

    .mon{
        font-size:16px;
        font-weight: bold;
    }
    .back{
        display: inline-block;
        width:56px;
        height:31px;
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
    .back2{
        display: inline-block;
        width:100px;
        height:31px;
        background-color: #409EFF;
        border: 1px solid #409EFF;
        border-radius: 3px;
        line-height: 32px;
        text-align: center;
        font-size:14px;
        text-decoration: none;
        color: #fff;
        position: absolute;
        right: 100px;
    }
    .sub1{
        position: absolute;
        left:0px;
        font-size:12px;
    }
    .sub2{
        position: absolute;
        left:70px;
        font-size:12px;
    }
    .sub3{
        position: absolute;
        left:150px;
        font-size:12px;
    }
    .sub4{
        position: absolute;
        left:245px;
        font-size:12px;
    }
    .sub5{
        position: absolute;
        left:325px;
        font-size:12px;
    }
    .see{
        text-decoration: none;
    }


</style>
