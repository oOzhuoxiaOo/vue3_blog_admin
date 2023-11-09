<template>
    <div>
        <h1>
            用户管理
        </h1>
        <el-input v-model="input" placeholder="Please input" />

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="_id" label="UserId" width="240" />
            <el-table-column prop="username" label="UserName" width="180" />
            <el-table-column prop="nickname" label="NickName" width="180" />
            <el-table-column prop="email" label="Email" width="180" />
            <el-table-column prop="controls" label="Controls">
                <!-- 默认插槽+作用域插槽，scope为接收对象(子组件透传的属性数据都在里面) -->
                <template #default="scope">
                    <!-- 循环渲染数组标签 -->
                    <!-- <el-button type="primary" small @click="handleDelete(scope.$index, scope.row)">update</el-button> -->
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
import { getUsers,deleteUser} from "@/apis/user/index";
import type { DeleteUser } from "@/apis/user/type"


import { ElMessage } from "element-plus";

let input = ref("")
// function handleDelete(index, target) {
//     // index 第几行
//     // target 目标所在当前行对象
//     console.log(index, target)
// }
function handleTellCenterDialog(_id:string,index:number){
    // 删除的userid
    deletedId.value = _id
    // 删除位置
    deletedIndex.value = index
    // 确认的显示隐藏
    centerDialogVisible.value = true
}

// 点击确认
function handleConfirm(){
    deleteUserApi({_id:deletedId.value})
    centerDialogVisible.value = false
}

const deleteUserApi = async(deleteUserObj:DeleteUser)=>{
    const resData = await deleteUser(deleteUserObj)
    ElMessage.success("删除成功")
    tableData.value.splice(deletedIndex.value,1)
    
}


interface UserItem {
    _id:string,
    username:string,
    nickname:string,
    email:string,
}

type UserList = UserItem[]

// 🚩初始化
// - ⭐当前页数
const currentPage1 = ref(1)
// - ⭐初始化列表数据
let tableData = ref<UserList>([
    {
        _id:"",
        username:"",
        nickname:"",
        email:"",
    }
])
// - ⭐初始化隐藏提示框
const centerDialogVisible = ref(false)
// - ⭐初始化要删除的内容id
const deletedId = ref('')
const deletedIndex = ref(0)
// - ⭐挂载
// 执行：请求博客列表数据
onMounted(async () => {
    const resData = await getUsers({ pageWhich: 1, pageNum: 6 })
    tableData.value = resData.data
})


// 🚩功能
// title：页数改变回调处理
// details：根据页数改变的索引，触发请求数据得到api获取博客列表数据
async function handleCurrentChange(val: number) {
    // console.log("页数？：", val)
    const resData = await getUsers({ pageWhich: val, pageNum: 6 })
    // console.log("resData_Notelist", resData)
    tableData.value = resData.data
}

</script>

<style lang="scss" scoped></style>