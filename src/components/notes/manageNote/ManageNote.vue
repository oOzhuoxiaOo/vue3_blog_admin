<template>
    <div>
        <h1>
            用户管理
        </h1>
        <el-input v-model="input" placeholder="Please input" />

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="Title" width="180" />
            <el-table-column prop="createTime" label="PublishDate" width="180" />
            <el-table-column prop="updateTime" label="UpdateDate" />
            <el-table-column prop="type" label="Type">
                <template #default="scope">
                    <!-- 类别button -->
                    <el-tag class="ml-2" type="success" effect="dark">{{ scope.row.type.typename }}</el-tag>
                </template>
            </el-table-column>>
            <el-table-column prop="tags" label="Tags">
                <!-- 默认插槽+作用域插槽，scope为接收对象(子组件透传的属性数据都在里面) -->
                <template #default="scope">
                    <!-- 循环渲染数组标签 -->
                    <template v-for="(item, idx) in scope.row.tags" :key="idx">
                        <el-tag class="ml-2" type="success" effect="dark">{{ item.tagname }}</el-tag>
                    </template>
                </template>
            </el-table-column>>
            <el-table-column prop="controls" label="Controls">
                <!-- 默认插槽+作用域插槽，scope为接收对象(子组件透传的属性数据都在里面) -->
                <template #default="scope">
                    <!-- 循环渲染数组标签 -->

                    <el-button type="primary" small @click="handleDelete(scope.$index, scope.row)">update</el-button>
                    <el-button type="danger" small @click="handleTellCenterDialog(scope.row._id,scope.$index)" >delete</el-button>

                </template>
            </el-table-column>>
        </el-table>

        <el-pagination small background layout="prev, pager, next" v-model:current-page="currentPage1"
            @current-change="handleCurrentChange" :total="200" class="mt-4" />


        <!-- 对话框 -->
        <el-dialog v-model="centerDialogVisible" title="删除" width="30%" center>
            <span>
                确定删除此博客？
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup lang="ts">
// 🚩导入
import { onMounted, ref } from "vue"
import { getNoteList,deleteNote } from "@/apis/note/index";
import type {DeletedNoteId} from "@/apis/note/type.ts"
import { ElMessage } from "element-plus";

let input = ref("")
// function handleDelete(index, target) {
//     // index 第几行
//     // target 目标所在当前行对象
//     console.log(index, target)
// }
function handleTellCenterDialog(_id:string,index:number){
    deletedNoteId.value = _id
    deletedIndex.value = index
    centerDialogVisible.value = true
}

function handleConfirm(){
    deleteNoteApi({noteId:deletedNoteId.value})
    centerDialogVisible.value = false
}

const deleteNoteApi = async(type:DeletedNoteId)=>{
    const resData = await deleteNote(type)
    ElMessage.success("删除成功")
    tableData.value.splice(deletedIndex.value,1)
    
}

// const tableData = [
//     {
//         title: '关于跨域的解决方案',
//         publishDate: "2023-10-25",
//         updateDate: "2023-10-25",
//         type: "bug",
//         tag: ["js", "learn"],
//     },
//     {
//         title: 'Vue的生命周期',
//         publishDate: "2023-10-25",
//         updateDate: "2023-10-25",
//         type: "vue",
//         tag: ["vue", "learn"],
//     },

// ]


// 🚩初始化
// - ⭐当前页数
const currentPage1 = ref(1)
// - ⭐初始化列表数据
let tableData = ref([])
// - ⭐初始化隐藏提示框
const centerDialogVisible = ref(false)
// - ⭐初始化要删除的内容id
const deletedNoteId = ref('')
const deletedIndex = ref(0)
// - ⭐挂载
// 执行：请求博客列表数据
onMounted(async () => {
    const resData = await getNoteList({ pageWhich: 1, pageNum: 6 })
    console.log("resData_Notelist", resData)
    tableData.value = resData.data
})


// 🚩功能
// title：页数改变回调处理
// details：根据页数改变的索引，触发请求数据得到api获取博客列表数据
async function handleCurrentChange(val: number) {
    // console.log("页数？：", val)
    const resData = await getNoteList({ pageWhich: val, pageNum: 6 })
    // console.log("resData_Notelist", resData)
    tableData.value = resData.data
}

</script>

<style lang="scss" scoped></style>