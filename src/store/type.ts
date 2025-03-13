import type { RouteRecordRaw } from "vue-router"
export interface userState {
    token: string | null,
    menuRoutes: RouteRecordRaw[]
}