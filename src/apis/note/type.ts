// 获取博客列表的接口
export interface GetNoteList {
    pageWhich: number,
    pageNum: number
}

export interface DeletedNoteId {
    noteId: string
}