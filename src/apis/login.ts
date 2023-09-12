import { $http } from "./index.js";

interface Data {
    username: string,
    password: string
}


// 登录
export const loginApi = (data: Data)=>{
    return $http({
        method: "post",
        url: "/api/user/login",
        data,
    })
}

// 注册
export const registerApi = (data: Data)=>{
    return $http({
        method: "post",
        url: "/api/user/register",
        data,
    })
}

interface resetPasswordData extends Data {
    newPassword: string
}

// 重置密码
export const resetPasswordApi = (data: resetPasswordData)=>{
    return $http({
        method: "post",
        url: "/api/user/resetPassword",
        data,
    })
}