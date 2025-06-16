export interface PermissionData {
    id: number,// 权限id
    pid: number,// 父级权限id 决定层级
    name: string,
    children?:PermissionList
}// TODO: 改成类似三级联动的形式，实现懒加载

export type PermissionList = PermissionData[]