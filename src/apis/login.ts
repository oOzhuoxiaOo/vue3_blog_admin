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