<template>
    <el-header height="40px">
        <div class="w">
            <div class="companyName dropdown ">
                <el-dropdown>
                    <div class="dropdown-toggle">云会计联盟<i class="icon iconfont icon-fanhui4"></i></div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>公司名称</el-dropdown-item>
                        <el-dropdown-item>公司名称</el-dropdown-item>
                        <el-dropdown-item>公司名称</el-dropdown-item>
                        <el-dropdown-item>公司名称</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="userName dropdown">
                <el-dropdown>
                    <div>
                        <img class="headPortrait img-circle" src="../../images/gongjuxiang.png" alt="" >
                        <i class="icon iconfont icon-fanhui4"></i>
                        <span class="dropdown-toggle">用户名称</span>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-header>
</template>

<script>
    export default {
        name:'header',
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

</style>
