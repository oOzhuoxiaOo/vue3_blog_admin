<template>
    <div>
        <h1>评论管理</h1>
    </div>
</template>

<script setup lang="ts">


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