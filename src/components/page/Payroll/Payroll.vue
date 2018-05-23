<template>
    <div v-loading.fullscreen.lock="loading">
        <div class="w cf">
            <div class="top">
                <h2>工资单</h2>
                <el-select v-model="choice" class='choice' placeholder="请选择">
                    <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.choice">
                    </el-option>
                </el-select>
                <router-link to="/loan/newLoan" class="addLink">新增</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        }
    }
</script>
<style scoped>

</style>
