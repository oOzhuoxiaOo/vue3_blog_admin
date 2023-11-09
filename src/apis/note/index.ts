import { $http } from "../index";

// 🚩接口
import type { 
    GetNoteList,
    DeletedNoteId
 } from "./type";



// 🚩api
// 获取博客列表的api
export const getNoteList = (params: GetNoteList = { pageWhich: 1, pageNum: 10 }) => {
    console.log('params:------', params)
    return $http({
        method: "get",
        url: "/api/user/notes",
        params
    })
}

// 提交博客笔记api
// export const submitWriteNote = (data:GetNoteList)=>{
//     console.log('params:------',params)
//     return $http({
//         methods:"get",
//         url:"/api/user/notes",
//         data
//     })
// }

// 删除博客笔记api
export const deleteNote = (type:DeletedNoteId) => {
    // console.log('params:------',params)
    return $http({
        method: "delete",
        url: `/api/user/notes/${type.noteId}`,
    })
}

// 请求所有类别Api(id+name+count)
export const getTypes = () => {
    // console.log('params:------',params)
    return $http({
        method: "get",
        url: `/api/user/notes/types`,
    })
}
// 请求所有标签Api(id+name+count)
export const getTags = () => {
    // console.log('params:------',params)
    return $http({
        method: "get",
        url: `/api/user/notes/tags`,
    })
}


// 请求当前个人信息，通过请求头的token
export const getSelf = () => {
    return $http({
        method: "get",
        url: `/api/user/self`,
    })
}