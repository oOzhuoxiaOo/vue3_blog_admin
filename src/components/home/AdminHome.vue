<template>
    <div class="wrap">
        <AdminOverview :chartData="chartData" class="item"></AdminOverview>
        <PieChart class="item"></PieChart>
        <BarChart class="item"></BarChart>
        <LineChart class="item"></LineChart>
    </div>
</template>

<script setup lang="ts">
import AdminOverview from "./adminHome/AdminOverview.vue";
import PieChart from "./adminHome/PieChart.vue";
import BarChart from "./adminHome/BarChart.vue";
import LineChart from "./adminHome/LineChart.vue";
import { ref,onMounted } from "vue";
import { getChart,getSelf } from "@/apis/user";
import { useUserInfoStore } from "@/stores/userInfo.store.ts";
const userInfoStore = useUserInfoStore()

interface ChartData {
    noteCount:number,
    typeCount:number,
    tagCount:number,
    friendCount:number,
}
const chartData = ref<ChartData>()
onMounted(async()=>{
    const resData = await getChart()
    chartData.value = resData.data
})
onMounted(async()=>{
    const resData = await getSelf()
    userInfoStore.setUserInfo({
        avatar:resData.data.avatar,
        username:resData.data.username,
    })

})

</script>

<style lang="scss" scoped>

.wrap {
    display: flex;
    flex-wrap: wrap;
    box-shadow: var(--el-box-shadow-light);


    .item {
        width: 50%;
        height: calc((100vh - 100px) / 2);
        //  防止压缩变形
        min-height: 300px;
        padding: 20px;
        border: 1px solid ;
    }
}

</style>