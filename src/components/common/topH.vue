<template>
    <el-header height="40px">
        <div class="w">
            <div class="companyName dropdown ">
                <el-select v-model="bookId" class="companySel" @change="changeBookId">
                    <el-option
                        v-for="item in accounts"
                        :key="item.value"
                        :label="item.book_name"
                        :value="item.book_id">
                    </el-option>
                </el-select>
            </div>
            <div class="userName dropdown">
                <el-dropdown  @command="handleCommand">
                    <div>
                        <img class="headPortrait img-circle" src="../../../static/images/gongjuxiang.png" alt="" >
                        <i class="icon iconfont icon-fanhui4"></i>
                        <span class="dropdown-toggle">用户名称{{count}}</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">个人信息</el-dropdown-item>
                        <el-dropdown-item command="2">账套管理</el-dropdown-item>
                        <el-dropdown-item command="3"><a :href=password class="link">修改密码</a></el-dropdown-item>
                        <el-dropdown-item command="4">安全退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios'
    import addUrl from '../../../static/js/addUrl'
    import { mapState,mapMutations } from 'vuex';
    export default {
        name:'topH',
        data(){
            return{
                bookId:'',//当前账套
                accounts:[],//账套列表
                password:'',//修改密码路径
            }
        },
        methods: {
            mapMutations(){

            },
            //安全退出
            handleCommand(command) {
                console.log(command);
                if(command == '1'){
                    this.$router.push('/AccountManagement/personal')
                }else if(command == '2'){
                    this.$router.push('/AccountManagement/AccountManagement')
                }else if(command == '4'){
                    this.$confirm('确定是否安全退出？','提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let url = addUrl.addUrl('logout')
                        window.location.href = url
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        });
                    });
                }
            },
            //切换账套
            changeBookId(){
                this.loading = true
                let params = new URLSearchParams();
                let url = addUrl.addUrl('change');
                console.log(url);
                params.append('bookId',this.bookId)
                axios.post(url,params)
                    .then(response=> {
                        console.log(response);
                        this.axios(1);
                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },
            axios(n){
                let url = addUrl.addUrl('login')
                axios.post(url)
                    .then(response=> {
                        console.log(response);
                        let data = response.data.value
                        this.accounts = data.accounts

                        this.bookId = data.current_book_id;
                        let obj = {}
                        let start_ym = data.current_start_date.substring(0,7)//账套开账时间
                        let current_book_ym = String(data.current_book_ym).substring(0,6)//当前账期

                        obj.start_ym = start_ym.split('-').join('');
                        obj.current_book_ym = current_book_ym;

                        console.log(obj);
                        this.$store.commit('add',obj)

                        if(n == 1){
                            this.$router.push('/')
                        }else{
                            this.$router.push('/')
                        }
                        this.loading = false
                    })
                    .catch(error=> {
                        this.loading = false
//                    console.log(error);
                        alert('网络错误，不能访问');
                    });
            },

        },
        computed:mapState(["count"]),
        created(){
            this.password = addUrl.addUrl('password')
            this.axios();
        },

    }
</script>

<style>
    .el-header{
        height:40px;
        background-color: #1a96d4;
        line-height: 40px;
    }
    .companyName{
        width:300px;
        height:40px;
        line-height: 40px;
        display: inline-block;
        position: relative;
        font-size:18px;
    }
    .dropdown-toggle{
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .companyName .dropdown-toggle{
        display: inline-block;
        max-width:270px;
        text-decoration: none;
        float: left;
    }
    .companySel{
        background-color: #1a96d4;
        color: #fff;
    }
    .companySel .el-input--suffix{
        height: 32px;
    }
    .companySel .el-input--suffix .el-input__inner{
        background-color: #1a96d4;
        color: #fff;
        border: none;
        height: 32px;
    }
    .iconfont{
        color: #fff;
        margin-left: 10px;
        cursor: pointer;
    }
    .userName{
        width:300px;
        height:40px;
        line-height: 40px;
        display: inline-block;
        float: right;
        font-size:18px;
        text-align: right;
        position: relative;
    }
    .userName .dropdown-toggle{
        display: inline-block;
        max-width:200px;
        text-decoration: none;
        float: right;
    }
    .userName .iconfont{
        float: right;
    }
    .userName .headPortrait{
        width:25px;
        vertical-align: sub;
        margin-right: 10px;
        cursor: pointer;
    }
    .black {
        color: #ccc;
    }
    .red {
        color: #fe614d;
    }
    .blue {
        color: #8ad9d9;
    }
    .link{
        color: #333;
        text-decoration: none;
    }
</style>
