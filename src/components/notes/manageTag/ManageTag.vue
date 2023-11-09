<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue"
import { getTags } from "@/apis/note/index"
import { onMounted, ref } from "vue";

const handleTellCenterDialog = ()=>{
    
}

interface Tag {
    _id: string,
    count: number,
    tagname: string
}
type ResTags = Tag[]

const tagsList = ref<ResTags>()

onMounted(async () => {
    const resData = await getTags();
    tagsList.value = resData.data
})

</script>

<template>
    <div class="layout">
        <el-card class="box-card" v-for="item in tagsList" :key="item._id">
            <template #header>
                <div class="card-header">
                    <div>
                        <el-text class="title" type="default" size="large">标签名称：</el-text>
                        <el-text type="primary">{{ item.tagname }}</el-text>
                    </div>
                    <div>
                        <el-button type="primary" :icon="Edit" circle />
                        <el-button type="danger" :icon="Delete" circle  @click="handleTellCenterDialog" />
                    </div>
                </div>
            </template>
            <div>
                <el-text type="default">博客数量：</el-text>
                <el-text type="primary">{{ item.count }}</el-text>
            </div>
        </el-card>
    </div>
</template>
  
<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    // font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.title {
    font-weight: 600;
}

.box-card {
    width: 280px;
}

.layout {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>
  