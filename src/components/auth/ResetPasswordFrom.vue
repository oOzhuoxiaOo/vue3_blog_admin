<template>
    <div class="auth">
        <div class="cart-box">
            <div class="cart-left"></div>
            <form action="/user/resetpassword" method="post" class="cart-right" enctype="application/x-www-form-urlencoded">
                <div class="logo"></div>
                <div class="username input-box">
                    <input type="text" id="username" name="username" placeholder="用户名" v-model="user.username">
                </div>
                <div class="password input-box">
                    <input type="password" id="password" name="password" placeholder="密码(不小于6位)" v-model="user.password">
                </div>
                <div class="new-password input-box">
                    <input type="password" id="new-password" name="newPassword" placeholder="新密码(不小于6位)" v-model="user.newPassword">
                </div>


                <button class="submit" type="button" @click="resetPassword">RE-Password</button>
                <div class="go">
                    <router-link to="/auth/login">登录</router-link>
                    <router-link to="/auth/register">注册</router-link>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { resetPasswordApi } from "@/apis/login";
import { ElMessage } from "element-plus";
import {useRouter} from "vue-router"

const router = useRouter();

import { checkAccount, checkPassword } from "@/hooks/utils/FormatCheck";

interface User {
    username: string,
    password: string,
    newPassword: string
}
const user = ref<User>({
    username: "",
    password: "",
    newPassword:""
})

const resetPassword = async () => {
    // 账户校验
    const resultCheckedAccount = checkAccount(user.value.username);
    if (resultCheckedAccount.success === false) {
        // TODO: 校验处理
        ElMessage.error(resultCheckedAccount.message)
        return;
    }
    // 密码校验
    const resultCheckedPassword = checkPassword(user.value.password);
    if (resultCheckedPassword.success === false) {
        // TODO: 校验处理
        ElMessage.error(resultCheckedPassword.message)
        return;
    }

    // 新密码校验
    const resultNewCheckedPassword = checkPassword(user.value.newPassword);
    if (resultNewCheckedPassword.success === false) {
        // TODO: 校验处理
        ElMessage.error("新" + resultNewCheckedPassword.message)
        return;
    }

    const resData = await resetPasswordApi(user.value);
    ElMessage.success("密码重置成功，跳转登录");
    router.push("/auth/login")
    // TODO: 保存数据
    // TODO: 跳转首页
}

</script>


<style lang="scss" scoped src="@/assets/css/auth.scss"></style>

