import type { RouteRecordRaw } from "vue-router"
import type { RankId, RanksForm } from "@/api/product/attr/type"
export interface userState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string,
    id: number
}

export interface RanksState {
    ranks1: RanksForm,
    ranks2: RanksForm,
    ranks3: RanksForm,
    rank1Id: RankId | string,
    rank2Id: RankId | string,
    rank3Id: RankId | string
}