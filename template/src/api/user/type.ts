export interface UserInfo {
    id: number
    username: string
    password: string
    avatar: string
    role: string
    routes: string[]
    status: boolean
}

export interface Show {
    id: number
    name: string
    role: string
    createTime: string
    updateTime: string
}

export type ShowForm = Show[]

export interface AllUser {
    id: number
    username: string
    password: string
    avatar: string
    role: string
    status: boolean
}

export type AllUsers = AllUser[]
export interface AllUsersRecive {
    status: number
    message: string
    data: AllUsers
}

export interface LoginInfo {
    username: string
    password: string
    check?: string
}

export type RegisterInfo = LoginInfo

export interface ReciveFrom {
    token: string // 注册无token
    status: number
    message: string
    data: UserInfo
}

export interface RegisterFrom {
    status: number
    message: string
    data: UserInfo
}
// TODO: 接口继承，优化结构
