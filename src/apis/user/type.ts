// 获取用户列表的接口
export interface GetUsers {
    pageWhich: number,
    pageNum: number
}

export interface GetFriends extends GetUsers {
    
}

export interface UpdateUser {
    _id:string,
    username:string,
    nickname:string,
    email:string
}

export interface DeleteOne {
    _id:string,
}

export interface DeleteUser {
    _id:string,
}

export interface DeleteFriend extends DeleteOne {}


export interface UpdateFriend {
    _id:string,
    name:string,
    description:string,
    link:string,
    imgUrl:string
}

export interface NewFriend {
    name:string,
    description:string,
    link:string,
    imgUrl:string
}
