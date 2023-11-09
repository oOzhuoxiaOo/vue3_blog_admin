<script setup lang="ts">
import { Edit, Delete } from "@element-plus/icons-vue"
import { getTypes } from "@/apis/note/index"
import { onMounted, ref } from "vue";

interface Type {
    _id: string,
    count: number,
    typename: string
}
type ResTypes = Type[]

const typesList = ref<ResTypes>()

onMounted(async () => {
    const resData = await getTypes();
    typesList.value = resData.data
})

</script>

<template>
    <div class="layout">
        <el-card class="box-card" v-for="item in typesList" :key="item._id">
            <template #header>
                <div class="card-header">
                    <div>
                        <el-text class="title" type="default" size="large">类别名称：</el-text>
                        <el-text type="primary">{{ item.typename }}</el-text>
                    </div>
                    <div>
                        <el-button type="primary" :icon="Edit" circle />
                        <el-button type="danger" :icon="Delete" circle />
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
  