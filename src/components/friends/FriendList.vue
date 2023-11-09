<template>
    <div>
        <!-- 标题 -->
        <h1>友情链接</h1>
        <!-- 新建 -->
        <div class="newFriendBox">
            <el-button type="primary" small @click="handleTellCenterDialog_2" >New</el-button>
        </div>
        <!-- 数据列表 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="_id" label="_ID" width="240" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="description" label="Description" width="180" />
            <el-table-column prop="link" label="Link" width="180" />
            <el-table-column prop="imgUrl" label="ImgUrl" width="180" />
            <el-table-column prop="controls" label="Controls">
                <!-- 默认插槽+作用域插槽，scope为接收对象(子组件透传的属性数据都在里面) -->
                <template #default="scope">
                    <!-- 循环渲染数组标签 -->
                    <el-button type="primary" small @click="handleTellCenterDialog_1(scope.row._id, scope.$index)">update</el-button>
                    <el-button type="danger" small
                        @click="handleTellCenterDialog(scope.row._id, scope.$index)">delete</el-button>

                </template>
            </el-table-column>>
        </el-table>
        

        <!-- 页码 -->
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

        <!-- 更新提示框 -->
        <el-dialog v-model="centerDialogVisible_1" title="编辑" width="30%" center>
            <span>
                
                <el-row>
                    <el-col :span="6">_ID</el-col>
                    <el-col :span="18">{{ editUpdateData._id }}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">Name</el-col>
                    <el-col :span="18"><input type="text" v-model="editUpdateData.name"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">Link</el-col>
                    <el-col :span="18"><input type="text" v-model="editUpdateData.link"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">ImgUrl</el-col>
                    <el-col :span="18"><input type="text" v-model="editUpdateData.imgUrl"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">Description</el-col>
                    <el-col :span="18"><input type="text" v-model="editUpdateData.description"></el-col>
                </el-row>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible_1 = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm_1">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 新建提示框 -->
        <el-dialog v-model="centerDialogVisible_2" title="新建" width="30%" center>
            <span>
                
                <el-row>
                    <el-col :span="6">Name</el-col>
                    <el-col :span="18"><input type="text" v-model="editNewData.name"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">Link</el-col>
                    <el-col :span="18"><input type="text" v-model="editNewData.link"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">ImgUrl</el-col>
                    <el-col :span="18"><input type="text" v-model="editNewData.imgUrl"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">Description</el-col>
                    <el-col :span="18"><input type="text" v-model="editNewData.description"></el-col>
                </el-row>
            </span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible_2 = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm_2">
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
import { getFriends,deleteFriend,updateFriend,newFriend } from "@/apis/user/index";
import type { DeleteFriend,UpdateFriend,NewFriend} from "@/apis/user/type"
import { ElMessage } from "element-plus";


// ---------------------------------------------------------------------------------------------------
// 🚩删除
// ⭐init-data
// 初始化隐藏提示框
const centerDialogVisible = ref(false)
// 初始化要删除的id
const deletedId = ref('')
const deletedIndex = ref(0)

// ⭐⭐init-fn
// 1. api: 删除功能的api
const deleteFriendApi = async (deletedParms:DeleteFriend) => {
    const resData = await deleteFriend(deletedParms)
    ElMessage.success("删除成功")
    // 从新获取列表数据
    getFriendsApi();
}
// 2. 点击删除按钮，弹出消息提示框
function handleTellCenterDialog(_id: string, index: number) {
    // 删除的userid
    deletedId.value = _id
    // 删除位置
    deletedIndex.value = index
    // 确认的显示隐藏
    centerDialogVisible.value = true
}
// 3. 点击确认删除按键
function handleConfirm() {
    deleteFriendApi({ _id: deletedId.value })
    centerDialogVisible.value = false
}

// -----------------------------------------------------------------------------------------------
// 🚩更改
// ⭐init-data
// 初始化隐藏提示框
const centerDialogVisible_1 = ref(false)
// 初始化要编辑的id
const updateId = ref('')
const updateIndex = ref(0)

const editUpdateData = ref<FriendItem>({
    _id:"",
    name:"",
    link:"",
    imgUrl:"",
    description:""
})

// ⭐⭐init-fn
// 1. api: 删除功能的api
const updateFriendApi = async (updateParms:UpdateFriend) => {
    const resData = await updateFriend(updateParms)
    // 从新获取列表数据
    getFriendsApi();
    ElMessage.success("更新成功")
}
// 2. 点击删除按钮，弹出消息提示框
function handleTellCenterDialog_1(_id: string, index: number) {
    // 删除的userid
    updateId.value = _id
    // 删除位置
    updateIndex.value = index
    // 确认的显示隐藏
    centerDialogVisible_1.value = true
    // 编辑数据
    editUpdateData.value = tableData.value[index]
}
// 3. 点击确认删除按键
function handleConfirm_1() {
    updateFriendApi(editUpdateData.value)
    centerDialogVisible_1.value = false
}


// -----------------------------------------------------------------------------------------------
// 🚩新建
// ⭐init-data
// 初始化隐藏提示框
const centerDialogVisible_2 = ref(false)
// 初始化要编辑的id

const editNewData = ref<NewFriend>({
    name:"",
    link:"",
    imgUrl:"",
    description:""
})

// ⭐⭐init-fn
// 1. api: 删除功能的api
const newFriendApi = async (newParms:NewFriend) => {
    const resData = await newFriend(newParms)
    ElMessage.success("新建成功")
    // 从新获取列表数据
    getFriendsApi();
}
// 2. 点击删除按钮，弹出消息提示框
function handleTellCenterDialog_2() {
    // 确认的显示隐藏
    centerDialogVisible_2.value = true
}
// 3. 点击确认删除按键
function handleConfirm_2() {
    newFriendApi(editNewData.value)
    centerDialogVisible_2.value = false
    // 从新获取列表数据
    getFriendsApi();
}

// -----------------------------------------------------------------------------------------------
// 🚩列表
// ⭐init-data
// 1. 定义列表渲染接口
interface FriendItem {
    _id: string,
    name: string,
    imgUrl: string,
    link: string,
    description: string,
}
type FriendList = FriendItem[]

// 2. 初始化列表数据
let tableData = ref<FriendList>([
    {
        _id: "",
        name: "",
        imgUrl: "",
        link: "",
        description: "",
    }
])
const getFriendsApi = async () => {
    const resData = await getFriends({ pageWhich: 1, pageNum: 6 })
    tableData.value = resData.data
}
// init-fn
// 1. 获取列表数据
onMounted(getFriendsApi)

// -----------------------------------------------------------------------------------------------
// 🚩页码
// ⭐Data
// 当前所在页码
const currentPage1 = ref(1)
// ⭐⭐Fn
// title：页数改变回调处理
// details：根据页数改变的索引，触发请求数据得到api获取博客列表数据
async function handleCurrentChange(val: number) {
    // console.log("页数？：", val)
    const resData = await getFriends({ pageWhich: val, pageNum: 6 })
    // console.log("resData_Notelist", resData)
    tableData.value = resData.data
}


</script>

<style lang="scss" scoped>
.newFriendBox {
    display: flex;
    // justify-content: center;
    margin: 0.5rem;
}

.el-dialog {
    .el-row {
        margin-bottom: 0.5rem;
        input {
            height: 1.5rem;
            font-size: 1rem;
            padding-left: 0.4rem;
        }
    }
}
</style>