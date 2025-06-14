// 表格字段配置
import type { TableColumn } from '../basetable/baseTable'

export const userTableSchema: TableColumn[] = [
    { prop: 'id', label: 'ID', sortable: true },
    { prop: 'name', label: '用户名' },
    { prop: 'role', label: '用户角色' },
    { prop: 'action', label: '操作', align: 'center' }
]
