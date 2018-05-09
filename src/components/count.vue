<template>
    <div>
        <h2>{{msg}}</h2>
        <hr>
        <h3><i class="icon iconfont icon-fanhui4"></i></h3>

    </div>
</template>
<script>
    import store from '@/vuex/store';
    export default{
        data(){
            return{
                msg:'hi'
            }
        },
        store
    }
</script>
