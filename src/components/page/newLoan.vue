<template>
    <div class="w cf">
        <div class="top">
            <h2>新建借款单</h2>
            <el-button @click="model(0)"  class="back">返回</el-button>
            <el-button @click.native="model(1)" type="danger" class="sub" >提交审批</el-button>
        </div>
        <div class="left">
            <ul>
                <li>
                    <span class="red">*</span>
                    金额
                </li>
                <li>
                    <span class="red">*</span>
                    借款日期
                </li>
                <li>
                    <span class="red">*</span>
                    借款部门
                </li>
                <li>
                    借款事由
                </li>
                <li>
                    附件
                </li>
            </ul>
        </div>
        <div class="right">
            <ul>
                <li>
                    <input type="text" class="money" name="money" id="money" v-model="money">
                </li>
                <li>
                    <el-date-picker
                        class="data"
                        v-model="debitDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </li>
                <li>
                    <el-select class="department" v-model="departmentId" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.departmentName"
                            :value="item.departmentType">
                        </el-option>
                    </el-select>
                </li>
                <li>
                    <input type="text" class="cause" name="cause" id="cause" v-model="discription">
                </li>
                <li class="upload">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    export default{
        data(){
            return{
                money:0,//金额
                debitDate:'',//日期
                departmentId:'',//部门
                options:[],//部门详情
                discription:'',//借款事由
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
                    this.$confirm('确定是否提交？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.submit();
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            submit(){

                if(this.money <= 0){
                    this.$message.error('请正确输入金额');
                    return
                }else if(this.debitDate == ''){
                    this.$message.error('请正确输入借款日期');
                    return
                }else if(this.departmentId == ''){
                    this.$message.error('请正确输入借款部门');
                    return
                }
                var params = new URLSearchParams();
                params.append('debitId',0);
                params.append('title',this.discription);
                params.append('money',this.money);
                params.append('debitDate',this.debitDate);
                params.append('discription',this.discription);
                params.append('departmentId',this.departmentId);

                axios.post('http://192.168.2.192:8080/web/vue/debit/edit/debit/submit.html',params)
                    .then(response=> {
                        console.log(response);
                        this.$router.go(-1);
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        });
                    })
                    .catch(error=> {
                        console.log(error);
                        alert('网络错误，不能访问');
                    })
            }
        },
        created(){
            axios.post('http://192.168.2.192:8080/web/vue/debit/department.html')
                .then(response=> {
                    console.log(response);
                    var data = response.data.value;
                    var newOptions = [];
                    this.options = data;
                })
                .catch(error=> {
                    console.log(error);
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
        right:20px;
        font-size:12px;
    }
    .sub{
        position: absolute;
        right:110px;
        font-size:12px;
    }
    .left{
        display: inline-block;
        width:30%;
        height:600px;
        float: left;
        text-align: right;
        background-color: #fff;
        font-size:16px;
    }
    .right{
        display: inline-block;
        width:70%;
        height:600px;
        float: left;
        text-align: left;
        background-color: #fff;
        font-size:16px;
    }
    ul{
        margin-left: 10px;
    }
    ul li{
        height:36px;
        line-height: 36px;
        margin: 20px 0;
    }
    input{
        width:478px;
        height:26px;
        border: 1px solid #ccc;
        border-radius: 3px;
        padding: 3px 10px;
    }
    .data{
        width:500px;
    }
    .department{
        width:500px;
    }
    .upload{
        height:auto;
    }
</style>
