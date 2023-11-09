<template>
    <div id="menu">

        <el-menu active-text-color="#fff" background-color="rgb(43, 44, 67)" class="el-menu-vertical-demo"
            :default-active="defaultActive" router text-color="rgb(180,180,180)">


            <component :is="item?.children ? ElSubMenu : ElMenuItem" v-for="item in menuList" :key="item.id"
                :index="item.index">
                <template v-if="item?.children" #title>
                    <el-icon v-if="item?.icon">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
                <template v-if="item.children">
                    <component v-for="subItem in item.children" :is="ElMenuItem" :index="subItem.index" :key="subItem.id">
                        <el-icon v-if="subItem?.icon">
                            <component :is="subItem.icon"></component>
                        </el-icon>
                        <span>{{ subItem.name }}</span>
                    </component>
                </template>

                <template v-if="!item?.children">
                    <el-icon v-if="item?.icon">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ item.name }}</span>
                </template>
            </component>
        </el-menu>
    </div>
</template>

<script setup lang="ts">


import { ElMenuItem, ElSubMenu } from "element-plus";
import { User, Notebook, Setting, House } from "@element-plus/icons-vue";
import { ref } from "vue";
import type { Component } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
// 动态显示路由激活
const defaultActive = ref(router.currentRoute.value.path)

// 菜单项接口
interface MenuItem {
    id: number,
    name: string,
    index: string,
    icon?: Component,
    children?: MenuItem[]
}

// 菜单数据
const menuList: MenuItem[] = [
    {
        id: 1,
        name: "首页",
        index: '/admin/admin-home',
        icon: House,
    },
    {
        id: 2,
        name: "用户管理",
        index: '/admin/users',
        icon: User
    },
    {
        id: 3,
        name: "笔记管理",
        index: '/admin/note-management',
        icon: Notebook,
        children: [
            {
                id: 31,
                name: '写笔记',
                index: '/admin/note-management/write'
            },
            {
                id: 32,
                name: '笔记列表',
                index: '/admin/note-management/note'
            },
            {
                id: 33,
                name: '标签列表',
                index: '/admin/note-management/tag'
            },
            {
                id: 34,
                name: '类型列表',
                index: '/admin/note-management/type'
            },
        ]
    },
    {
        id: 4,
        name: "评论管理",
        index: '/admin/comment',
        icon: Setting,
    },
    {
        id: 5,
        name: "个人中心",
        index: '/admin/personalCenter',
        icon: Setting
    },
    {
        id: 6,
        name: "友情链接",
        index: '/admin/friends/list',
        icon: Setting,
    },
    {
        id: 7,
        name: "设置",
        index: '/admin/setting',
        icon: Setting
    },
]

</script>

<style lang="scss" scoped></style>