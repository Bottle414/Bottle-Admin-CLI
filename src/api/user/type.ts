export interface UserInfo{
    id: number,
    username: string,
    password: string,
    avatar: string,
    role: string,
    routes: string[],
    status: boolean
}

export interface LoginInfo{
    username: string,
    password: string,
    check?: string
}

export type RegisterInfo = LoginInfo

export interface ReciveFrom{
    token: string,// 注册无token
    status: number,
    message: string,
    data: UserInfo
}

export interface RegisterFrom{
    status: number,
    message: string,
    data: UserInfo
}
// TODO: 接口继承，优化结构