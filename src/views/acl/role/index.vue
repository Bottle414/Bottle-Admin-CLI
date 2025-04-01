<template>
    <div class='role'>
        <el-card>
            <el-form class="form" :inline="true">
                <el-form-item label="职位搜索">
                    <el-input placeholder="请输入搜索职位名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="Search">搜索</el-button>
                    <el-button icon="CloseBold">重置</el-button>
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
                        <el-button title="编辑" type="primary" icon="Edit" @click="editUser">编辑</el-button>
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
                :default-checked-keys="[5]"
                :props="defaultProps"
              />
            </template>
            <template #footer>
                <el-button type="success">保存</el-button>
                <el-button>取消</el-button>
            </template>
          </el-drawer>
    </div>
</template>

<script lang='ts' setup>
    import { ref, onMounted } from 'vue'
    let currentPage = ref(1)
    let totalData = ref(10)
    let drawer = ref(false)
    let roles = ref(['用户', '经理', '前台'])
    let checkedList = ref([])
    const pageSize = ref(5)
    // TODO: 实现列表懒加载
    // TODO: 设计数据库，采用基于角色的权限控制

    onMounted(() => {
        // TODO: 一挂载就获取所有权限 每个职位的权限在点击权限编辑时再获取
    })

    const defaultProps = {// 展示字段
        children: 'children',
        label: 'label',
    }
    const data = ref([])// TODO: 错误的，自关联表 + 处理
    
    let users = ref([
        {
            id: 123,
            name: 'pig',
            role: '吉祥物',
            role_id: '12',
            createTime: '2025-3-30',
            updateTime: '2025-3-30'
        },
        {
            id: 456,
            name: 'cat',
            role: '吉祥物',
            role_id: '12',
            createTime: '2025-3-30',
            updateTime: '2025-3-30'
        }
    ])

    function editUser(){

    }

    // TODO: 限制类型
    function editRole(row : any){
        drawer.value = true
        // TODO: 由职位id拿到权限，根据select展示
    }
    // TODO: 前端把后端返回的数据解析成树状结构
</script>

<style scoped>
    .role {
        
    }
</style>