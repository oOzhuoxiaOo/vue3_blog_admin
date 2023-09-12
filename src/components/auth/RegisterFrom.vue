<template>
    <div class="auth">
        <div class="cart-box">
            <div class="cart-left"></div>
            <form action="/user/register" method="post" class="cart-right" enctype="application/x-www-form-urlencoded">
                <div class="logo"></div>
                <div class="username input-box">
                    <input type="text" id="username" name="username" placeholder="用户名" v-model="user.username">
                </div>
                <div class="password input-box">
                    <input type="password" id="password" name="password" placeholder="密码(不小于6位)" v-model="user.password">
                </div>
                <div class="confirm-password input-box">
                    <input type="password" id="confirm-password" name="confirmPassword" placeholder="确认密码"
                        v-model="user. confirmPassword">
                </div>

                <button class="submit" type="button" @click="register">register</button>
                <div class="go">
                    <router-link to="/auth/login">登录</router-link>
                    <router-link to="/auth/resetpassword">修改密码</router-link>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { registerApi } from "@/apis/login";
import { ElMessage } from "element-plus";
import {useRouter} from "vue-router"

const router = useRouter();

import { checkAccount, checkPassword, checkPasswordConfirmation } from "@/hooks/utils/FormatCheck";

interface User {
    username: string,
    password: string,
    confirmPassword: string
}
const user = ref<User>({
    username: "",
    password: "",
    confirmPassword:""
})

const register = async () => {
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

    // 确认密码校验
    const resultCheckedPasswordConfirmation = checkPasswordConfirmation(user.value.password,user.value.confirmPassword);
    if (resultCheckedPasswordConfirmation.success === false) {
        // TODO: 校验处理
        ElMessage.error(resultCheckedPasswordConfirmation.message)
        return;
    }

    const resData = await registerApi(user.value);
    ElMessage.success("注册成功，跳转登录");
    router.push("/auth/login")
    // TODO: 保存数据
    // TODO: 跳转首页
}

</script>


<style lang="scss" scoped src="@/assets/css/auth.scss"></style>

