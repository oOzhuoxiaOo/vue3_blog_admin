<template>
    <div id="overview">
        <div class="userinfo">
            <el-avatar :src="userInfoStore.userInfo.avatar"/>
            <span class="username">{{ userInfoStore.userInfo.username }}</span>
        </div>
        <!-- <div class="listAbout">
            <div class="item" v-for="(item,index) in 4" :key="index">
                <div class="title">访问总量</div>
                <div class="number">2333</div>
            </div>
        </div> -->
        <div class="listAbout">
            <div class="item">
                <div class="title">总笔记数</div>
                <div class="number">{{ chartData?.noteCount }}</div>
            </div>
            <div class="item">
                <div class="title">总类别数</div>
                <div class="number">{{ chartData?.typeCount }}</div>
            </div>
            <div class="item">
                <div class="title">总标签数</div>
                <div class="number">{{ chartData?.tagCount }}</div>
            </div>
            <div class="item">
                <div class="title">友情链接数</div>
                <div class="number">{{ chartData?.friendCount }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useUserInfoStore } from "@/stores/userinfo.store"
const userInfoStore = useUserInfoStore()
const props = defineProps(["chartData"])
</script>

<style lang="scss" scoped >


#overview {
    .userinfo {
        display: flex;
        align-items: center;
        .username {
            margin-left: 15px;
        }
    }

    .listAbout {
        // box-sizing: content-box;
        margin-top: 20px;
        display: flex;
        gap: 20px;
        .item {
            width: 22%;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-radius: 10px;

            .title {
                font-size: 18px;
                font-weight: 600;
            }
        }

        }
}

</style>