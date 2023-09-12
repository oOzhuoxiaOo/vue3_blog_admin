import { defineStore } from "pinia";
import { httpInstance } from "@/apis/index.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()

interface UserInfo {
    avatar?: string
}

export const useUserInfoStore = defineStore('userinfo-store', () => {

    const state = {
        userInfo: ref<UserInfo>({
            avatar:"https://th.bing.com/th?id=OIP.IT_BxrYEjAkrwMYlLcuvQwHaKD&w=214&h=291&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
        })
    }

    // 设置token为请求头，并存储本地
    const setAuth = (token: string):void => {
        httpInstance.defaults.headers.common.Authorization = token;
        localStorage.setItem('token', token);
    }
    // 检查本地是否有token，有并将token设置到请求头中并返回true，没有则false
    const authFromLocal = ():boolean => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            setAuth(token);
            return true;
        }
        return false;
    }
    // 移除token请求头
    const removeAuth = ():void => {
        delete httpInstance.defaults.headers.common.Authorization;
        localStorage.removeItem('token');
        router.push('/auth/login')
    }

    return {
        ...state,
        setAuth,
        removeAuth,
        authFromLocal
    }
})