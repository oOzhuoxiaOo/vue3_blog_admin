import { $http } from "../index";

// 🚩接口
import type {
    GetUsers,
    UpdateUser,
    DeleteUser,
    GetFriends,
    DeleteFriend,
    UpdateFriend,
    NewFriend
} from "./type";


// 请求当前个人信息，通过请求头的token
export const getSelf = () => {
    return $http({
        method: "get",
        url: `/api/user/self`,
    })
}


// 请求用户信息列表
export const getUsers = (getUsers: GetUsers = { pageWhich: 1, pageNum: 8 }) => {
    return $http({
        method: "get",
        url: `/api/user`,
        params: getUsers
    })
}


// 更新当前个人信息
export const updateUser = (updateUser: UpdateUser) => {
    return $http({
        method: "patch",
        url: `/api/user/${updateUser._id}`,
        data: updateUser
    })
}

// 删除当前个人信息
export const deleteUser = (deletedUser: DeleteUser) => {
    return $http({
        method: "delete",
        url: `/api/user/${deletedUser._id}`,
    })
}

// 头像上传
export const uploadUserAvatar = (formData: any) => {
    return $http({
        method: "post",
        url: `/api/user/avatar/upload`,
        headers: {
            "Content-Type": 'multipart/form-data',
        },
        data: formData
    })
}



// 请求友情链接列表
export const getFriends = (getFriends: GetFriends = { pageWhich: 1, pageNum: 8 }) => {
    return $http({
        method: "get",
        url: `/api/user/friends`,
        params: getFriends
    })
}



// 删除指定友情链接
export const deleteFriend = (deletedEl: DeleteFriend) => {
    return $http({
        method: "delete",
        url: `/api/user/friends/${deletedEl._id}`,
    })
}



// 更新友情链接
export const updateFriend = (friendData: UpdateFriend) => {
    return $http({
        method: "patch",
        url: `/api/user/friends/${friendData._id}`,
        data: friendData
    })
}


// 新建友情链接
export const newFriend = (friendData: NewFriend) => {
    return $http({
        method: "post",
        url: `/api/user/friends/write`,
        data:friendData
    })
    }



    // 请求图表信息
export const getChart = () => {
    return $http({
        method: "get",
        url: `/api/user/chart`
    })
}