<template>
    <div class="auth">
        <div class="cart-box">
            <div class="cart-left"></div>
            <form class="cart-right" enctype="application/x-www-form-urlencoded">
                <div class="logo"></div>
                <div class="username input-box">
                    <input type="text" id="username" name="username" placeholder="用户名" v-model="user.username">
                </div>
                <div class="password input-box">
                    <input type="password" id="password" name="password" placeholder="密码(不小于6位)" v-model="user.password">
                </div>
                <button class="submit" type="button" @click="login">Sign in</button>
                <div class="go">
                    <router-link to="/auth/register">注册</router-link>
                    <router-link to="/auth/resetpassword">修改密码</router-link>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts" setup>
import {  ref } from "vue";
import { loginApi } from "@/apis/login";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

 import { checkAccount,checkPassword } from "@/hooks/utils/FormatCheck";

interface User {
    username: string,
    password: string,
}
const user = ref<User>({
    username:"",
    password:""
})

const login = async ()=> {
    // 账户校验
    const resultCheckedAccount = checkAccount(user.value.username);
    if(resultCheckedAccount.success === false) {
        // TODO: 校验处理
        ElMessage.error(resultCheckedAccount.message)
        return;
    }
    // 密码校验
    const resultCheckedPassword = checkPassword(user.value.password);
    if(resultCheckedPassword.success === false) {
        // TODO: 校验处理
        ElMessage.error(resultCheckedPassword.message)
        return;
    }

    const resData = await loginApi(user.value);
    console.log("resData:",resData)
    // token保存本地
    localStorage.setItem("token",resData.data.token)
    ElMessage.success("登录成功，跳转首页");
    router.push("/")
    // TODO: 保存数据
    // TODO: 跳转首页
}

</script>


<style lang="scss" scoped src="@/assets/css/auth.scss">

</style>

