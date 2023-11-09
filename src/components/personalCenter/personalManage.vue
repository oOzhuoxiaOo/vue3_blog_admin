<template>
    <div>
        <!-- 头部 -->
        <el-card class="box-card">
            <div class="cart-child">
                <div class="child-left">
                    <el-avatar :size="120" @error="errorHandle" :src="userDetail?.avatar">
                        <img src="https://th.bing.com/th/id/R.5dddb3b2d8a892ffd50ad84b1c77a6ef?rik=gcfSmI%2fSUFb7Cg&riu=http%3a%2f%2fbpic.588ku.com%2felement_pic%2f01%2f37%2f92%2f40573c69065b76e.jpg&ehk=DU136qmdiExyY3AO9Bj%2fvqvegNcUDh8tFUCjTQ15o%2fM%3d&risl=&pid=ImgRaw&r=0"
                            alt="">
                    </el-avatar>
                    <div class="mask">
                        <el-icon size="80">
                            <Camera color="rgb(200,200,200)" />
                        </el-icon>
                    </div>
                    <input class="file-input" type="file" accept="image/*"  @change="HandleUploadAvatar">
                </div>
                <div class="child-right">
                    <h2 class="title">{{ userDetail?.nickname }}</h2>
                    <el-text class="email">
                        {{ userDetail?.email }}
                    </el-text>
                </div>
            </div>
        </el-card>

        <!-- 基本信息 -->
        <el-card class="box-card box-card-2">
            <template #header>
                <div class="card-header">
                    <span>基本信息</span>
                    <div>
                        <el-button v-show="!editStatus" @click="handleOpenEdit" type="primary">编辑</el-button>
                        <el-button v-show="editStatus" @click="handleSaveEdit" type="primary">保存</el-button>
                        <el-button v-show="editStatus" @click="handleCancelEdit" type="primary">取消</el-button>
                    </div>
                </div>
            </template>
            <el-row>
                <el-col :span="4"><el-text>用户类型</el-text></el-col>
                <el-col :span="20"><el-text>普通用户</el-text>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><el-text>用户名</el-text></el-col>
                <el-col :span="20"><el-text>{{ userDetail?.username }}</el-text>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><el-text>昵称</el-text></el-col>
                <el-col :span="20">
                    <el-text v-show="!editStatus">{{ userDetail?.nickname }}</el-text>
                    <el-input v-show="editStatus" v-model="editUserDetail.nickname" />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4"><el-text>邮箱</el-text></el-col>
                <el-col :span="20"><el-text v-show="!editStatus">{{ userDetail?.email }}</el-text>
                    <el-input v-show="editStatus" v-model="editUserDetail.email" />
                </el-col>
            </el-row>
        </el-card>

 

    </div>
</template>

<script setup lang="ts">

import { getSelf } from "@/apis/note/index"
import { updateUser,uploadUserAvatar } from "@/apis/user/index";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue"

interface UserDetail {
    _id: string,
    username: string,
    nickname: string,
    email: string,
    avatar: string
}


const userDetail = ref<UserDetail>()
const editStatus = ref(false)
const editUserDetail = ref<UserDetail>({
    _id: "",
    username: "",
    nickname: "",
    email: "",
    avatar: ""
}
)
// 进入编辑模式
function handleOpenEdit() {
    editStatus.value = true
    editUserDetail.value = JSON.parse(JSON.stringify(userDetail.value))
}
// 保存编辑
async function handleSaveEdit() {
    editStatus.value = false
    const resData = await updateUser(editUserDetail.value);
    ElMessage.success("保存成功")
    // 同步更新后的数据
    userDetail.value = JSON.parse(JSON.stringify(editUserDetail.value))
}
// 取消编辑
function handleCancelEdit() {
    editStatus.value = false
}
// 获取当前用户信息Api服务接口
const getSelfApi = async ()=>{
    const resData = await getSelf();
    userDetail.value = resData.data
}
// 初始调用一次
onMounted(getSelfApi)

const errorHandle = () => true


async function HandleUploadAvatar(e: any) {
    console.log("99999999999999999")
    // change事件改变就会触发，当再次点文件时取消会清空文件，也会请求，再次做一次判断解决问题
    if(!e.target.files.length) {
        return
    }
    // 获取File文件
    const fileAvatar = e.target.files[0]
    // 创建FormData对象
    console.log("fileAva",e.target.files)
    const formData = new FormData()
    // 将file文件放到formData中
    formData.append("avatarImg",fileAvatar);
    const resData = await uploadUserAvatar(formData)
    ElMessage.success("上传成功")
    getSelfApi()
}

</script>

<style lang="scss" scoped>
.child-left {
    $width:120px;
    position: relative;
    border: solid;
    width: $width;
    height: $width;
    border-radius: 60px;
    overflow: hidden;

    &:hover {
        .mask {
            visibility: visible;
        }
    }

    .mask {
        visibility: hidden;
        $mask-bg: rgba(0, 0, 0, .5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: $mask-bg;

        // opacity: 0.3;
        .el-icon {
            width: $width;
            height: $width;
        }
    }

    img {
        width: 100%;
        height: 100%;
    }
}



.file-input {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid;
    background-color: #847070;
    opacity: 0;
}

.text {
    font-size: 14px;
}

.item {
    padding: 18px 0;
}

.el-row {
    margin-bottom: 1rem;
}

.box-card {
    width: 100%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-child {
    display: flex;
    gap: 1rem;
}

.child-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.box-card-2 {
    margin-top: 1rem;
}
</style>