<template>
    <div class='user'>
        <el-card>
            <el-form class="form" :inline="true" style="min-width: 600px;">
                <el-form-item :label="$t('username')">
                    <el-input :placeholder="$t('placeholder.search')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search">{{ $t('search') }}</el-button>
                    <el-button icon="CloseBold">{{ $t('reset') }}</el-button>
                    <!-- 加括号传入空值，避免被点击事件替代 -->
                    <ExcelButton :data="users" sheetType="成员名单"/>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 20px;">
            <el-button type="primary" icon="Plus" @click="addUser">{{ $t('add') }}</el-button>
            <el-button type="warning" icon="Delete" @click="bulkDelete">{{ $t('delete') }}</el-button>
            <el-table :data="users" border @selection-change="handleSectionChange">
                <el-table-column type="selection" prop="deleteList"></el-table-column>
                <el-table-column prop="index" width="100%" type="index" align="center" label="序号"></el-table-column>
                <el-table-column prop="id" width="100%" align="center" label="ID"></el-table-column>
                <el-table-column prop="name" width="150%" :label="$t('username')"></el-table-column>
                <el-table-column prop="role" :label="$t('role')"></el-table-column>
                <el-table-column prop="createTime" :label="$t('createTime')"></el-table-column>
                <el-table-column prop="updateTime" :label="$t('updateTime')"></el-table-column>
                <el-table-column width="200%" :label="$t('option')">
                    <template #default="{ row }">
                        <el-button title="分配角色" type="primary" icon="User" @click=""></el-button>
                        <el-button :title="$t('edit')" icon="Edit" @click="editUser"></el-button>
                        <el-button :title="$t('delete')" icon="Delete" color="#f8ae0d" @click=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="currentPage" v-model:pageSize="pageSize" style="margin-top: 20px;" layout="prev, pager, next, -> ,jumper" :total="totalData" />
        </el-card>
        <el-drawer v-model="drawer" direction="rtl">
            <template #header>
              <h4>添加用户</h4>
            </template>
            <template #default>
              <el-form>
                <el-form-item :label="$t('username')">
                    <el-input placeholder="请填写用户名" v-model="newUser.username"></el-input>
                </el-form-item>
                <el-form-item :label="$t('role')">
                    <el-checkbox-group v-model="newRole" :max="1">
                        <el-checkbox v-for="role in roles" :key="role" :label="role" :value="role">
                            {{ role }}
                          </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item :label="$t('password')">
                    <el-input :placeholder="$t('placeholder.password')" v-model="newUser.password"></el-input>
                </el-form-item>
              </el-form>
            </template>
            <template #footer>
                <el-button type="success" @click="saveChanges()">{{ $t('save') }}</el-button>
                <el-button @click="cancel">{{ $t('cancle') }}</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    import { register } from '@/api/user'
    import { ElMessage } from 'element-plus';
    import { deleteInfo, allUsers } from '@/api/user/index'
    import type { ShowForm, AllUsers } from '@/api/user/type'
    // import draggable from "vuedraggable";

    let currentPage = ref(1)
    let pageSize = ref(5)
    let totalData = ref(10)
    let drawer = ref(false)
    let newRole = ref([])
    let deleteList = ref([])
    let roles = ref(['用户', '经理', '前台'])//TODO: 改为去后端拿，动态展示数据
    // TODO: 写获取所有用户的接口, 动态展示数据
    // TODO: 完成添加人员界面 并提交到后端
    let users = ref<ShowForm>([
        // {
        //     id: 123,
        //     name: 'pig',
        //     role: '吉祥物',
        //     createTime: '2025-3-30',
        //     updateTime: '2025-3-30'
        // },
        // {
        //     id: 456,
        //     name: 'cat',
        //     role: '吉祥物',
        //     createTime: '2025-3-30',
        //     updateTime: '2025-3-30'
        // }
    ])

    // TODO: 绑定输入
    let newUser = ref({
        username: '',
        role: '',
        password: ''
    })

    onMounted(async() => {
        await getAllUsers()
    })

    async function getAllUsers(){
        const result = await allUsers()
        if (result.status === 200){
            result.data.map(user => {
                users.value.push({
                    id: user.id,
                    name: user.username,
                    role: user.role,
                    createTime: new Date().getTime().toString(),
                    updateTime: new Date().getTime().toString()
                })
            })
        }
    }

    function handleSectionChange(selectRows : any){
        deleteList.value = selectRows.map((row : any) => row?.id)
    }

    function editUser(){// 清空表单数据 OBject.assign
        drawer.value = true
        newRole.value = []
        Object.assign(newUser.value,
        {
            username: '',
            role: '',
            password: ''
        })
    }

    function addUser(){
        drawer.value = true
    }

    // TODO: 限制类型
    async function saveChanges(){// 提交到后端
        newUser.value.role = newRole.value[0]
        // TODO: 写添加用户的接口
        const result = await register(newUser.value)
        if (result.status === 201){
            ElMessage({
                type: 'success',
                message: '添加成功'
            })
            drawer.value = false
        }else {
            ElMessage({
                type: "error",
                message: '添加失败'
            })
        }
        await getAllUsers()
    }

    function cancel(){
        drawer.value = false
    }

    async function bulkDelete(){
        console.log(deleteList.value);
        const result = await deleteInfo(deleteList.value)
        if (result.status === 200){
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
            // 调用最新数据
        }else {
            ElMessage({
                type: 'success',
                message: '删除失败'
            })
        }

        await allUsers()
    }
</script>

<style scoped>
    .form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 500px;
    }
</style>