<template>
<div>
    <input type="checkbox" name="name" readonly value="1">
</div>

</template>
<script type="text/ecmascript-6">
    import axios from 'axios'
    export default {
        data() {
            return {

            }
        },

        created(){
            var params = new URLSearchParams();
            params.append('id','1596254759427246088');
            params.append('auditFlg',this.auditFlg);
            params.append('startDate',this.startDate);
            params.append('endDate',this.endDate);
            params.append('pageNo',this.currentPage);
            var url1 = 'http://192.168.2.192:8080/web/vue/expense/save.html';//新增费用单
            var url2 = 'http://192.168.2.192:8080/web/vue/application/list.html';//报销单列表
            var url3 = 'http://192.168.2.192:8080/web/vue/application/save.html';//报销单保存
            var url4 = 'http://192.168.2.192:8080/web/vue/expense/enableReceiptList.html';//可用的费用单列表
            var url5 = 'http://192.168.2.192:8080/web/vue/expense/edit.html';//费用单查询页面
            var url6 = 'http://192.168.2.192:8080/web/vue/application/check.html';//查看审批报销单

            axios.post(url6,params)
                .then(response=> {
                    console.log(response);

                })
        },
    }
</script>
