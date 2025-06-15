import type { PermissionList } from "@/views/acl/role/type"

export interface PermissionRecive{
    status: number,
    message: string,
    data: PermissionList
}