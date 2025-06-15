<template>
    <div class='role'>
        <el-card>
            <el-form class="form" :inline="true" style="min-width: 650px;">
                <el-form-item label="职位搜索">
                    <el-input placeholder="请输入搜索职位名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search">搜索</el-button>
                    <el-button icon="CloseBold">重置</el-button>
                    <ExcelButton :data="users" sheetType="职位表"/>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 20px;">
            <el-button type="primary" icon="Plus">添加</el-button>
            <el-button type="warning" icon="Delete">批量删除</el-button>
            <el-table :data="users" border>
                <el-table-column prop="index" width="100%" type="index" align="center" label="序号"></el-table-column>
                <el-table-column prop="role_id" width="100%" align="center" label="职位ID"></el-table-column>
                <el-table-column prop="role" width="150%" label="职位名称"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="250%"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="250%"></el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button title="分配权限" type="primary" icon="User" @click="editRole(row)">权限分配</el-button>
                        <el-button title="编辑" type="primary" icon="Edit" @click="">编辑</el-button>
                        <el-button title="删除" type="primary" icon="Delete" @click="">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="currentPage" v-model:pageSize="pageSize" style="margin-top: 20px;" layout="prev, pager, next, -> ,jumper" :total="totalData" />
        </el-card>
        <el-drawer v-model="drawer" direction="rtl">
            <template #header>
              <h4>权限分配</h4>
            </template>
            <template #default>
                <el-tree
                style="max-width: 600px"
                :data="data"
                show-checkbox
                node-key="id"
                :default-expand-all="true"
                :default-checked-keys="permissionIds"
                :props="defaultProps"
              />
            </template>
            <template #footer>
                <el-button type="success">保存</el-button>
                <el-button @click="notSave">取消</el-button>
            </template>
          </el-drawer>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted, nextTick } from 'vue'
    import { getAllPermissions, getPermission } from '@/api/permission/index'

    let currentPage = ref(1)
    let totalData = ref(10)
    let drawer = ref(false)
    
    const pageSize = ref(5)
    // TODO: 实现列表懒加载

    const defaultProps = {// 展示字段
        children: 'children',
        label: 'label',
    }
    const data = ref<any>([])
    const permissionIds = ref<number[]>([])

    onMounted(async() => {
        const allPermissions = await getAllPermissions()
        if (allPermissions.status === 200){
            console.log(allPermissions);
            // 存储
            allPermissions.data.map(permission => {
                data.value.push({
                    id: permission.id,
                    label: permission.name,
                    children: permission.children
                })
            })
        }
    })


    
    let users = ref([
        {
            id: 123,
            name: 'pig',
            role: '吉祥物',
            role_id: 1,
            createTime: '2025-3-30',
            updateTime: '2025-3-30'
        },
        {
            id: 456,
            name: 'cat',
            role: '吉祥物',
            role_id: 2,
            createTime: '2025-3-30',
            updateTime: '2025-3-30'
        }
    ])

    async function editRole(row : any){
        drawer.value = true
        const result = await getPermission(row.role_id)
        if (result.status === 200){
            result.data.forEach(item => {
                permissionIds.value.push(item.id)
            })
        }
        nextTick()
    }

    function notSave(){
        drawer.value = false
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