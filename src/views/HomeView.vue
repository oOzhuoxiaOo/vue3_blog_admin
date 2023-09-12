<script setup lang="ts">
import AdminHeader from "@/components/layout/AdminHeader.vue";
import AdminMenu from "@/components/layout/AdminMenu.vue";
</script>

<template>
  <div class="common-layout" id="home">
    <el-container>
      <el-header>
        <AdminHeader />
      </el-header>
      <el-container>
        <el-affix>
          <el-aside width="200px">
            <AdminMenu />
          </el-aside>
        </el-affix>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style  scoped lang="scss">
#home {
  background-color: #fff;
  color: rgb(0, 0, 0);
    min-height: 100vh;
}
.el-header {
background-color: #2b2c43;
}
.el-aside {
    min-height: calc(100vh - 60px);
    background-color: #2b2c43;
}

</style>
