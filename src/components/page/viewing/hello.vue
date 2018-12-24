<template>
    <h2>{{ msg }}</h2>
</template>
<script>
    export default {
        data () {
            return {
                msg:'Hello Vue.js 单文件组件~'
            }
        }
    }
</script>
<style>
    h2 {
        color: green;
    }
</style>
