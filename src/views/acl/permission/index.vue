<template>
    <BaseTable
        :data="userList"
        :columns="userTableSchema"
        :loading="loading"
        :row-selection="true"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @update:currentPage="(val: any) => (console.log('当前页：', val))"
        @update:pageSize="(val: any) => (console.log('页码更新', val))"
        @selection-change="handleSelect"
    >
        <template #filters>
            <el-form :inline="true" @submit.prevent>
                <el-form-item label="用户名">
                    <el-input
                        v-model="username"
                        placeholder="请输入用户名"
                        clearable
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="">搜索</el-button>
                    <el-button @click="">重置</el-button>
                </el-form-item>
            </el-form>
        </template>

        <template #toolbar>
            <el-button type="primary" icon="Plus" @click="">添加用户</el-button>
            <el-button icon="Download" @click="">导出 Excel</el-button>
            <el-upload :show-file-list="false">
                <el-button icon="Upload">导入文件</el-button>
            </el-upload>
        </template>

        <template #role="{ row }">
            <el-tag>{{ row.role }}</el-tag>
        </template>
        <template #action="{ row }">
            <el-button size="small" @click="edit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="del(row)">
                删除
            </el-button>
        </template>
    </BaseTable>

    <ExcelButton
        :data="userTableSchema"
        :columns="[
            { prop: 'username', label: 'username' },
            { prop: 'role', label: 'role' },
            { prop: 'createTime', label: 'createTime' }
        ]"
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import BaseTable from '@/template/basetable/BaseTable.vue'
    import ExcelButton from '@/components/ExcelButton.vue'
    import { userTableSchema } from '@/template/schemas/tables'

    const userList = [
        { id: 1, name: '张三', role: '管理员' },
        { id: 2, name: '李四', role: '用户' }
    ]

    const username = ref('12')

    const loading = false
    let currentPage = 1
    let pageSize = 10
    const total = 25

    function edit(row: any) {
        console.log('编辑', row)
    }
    function del(row: any) {
        console.log('删除', row)
    }
    function handleSelect(rows: any[]) {
        console.log('勾选了', rows)
    }
</script>
