export interface UserInfo{
    id: number,
    username: string,
    password: string,
    avatar: string,
    role: string,
    status: boolean
}

export interface LoginInfo{
    username: string,
    password: string,
    check: string
}

export interface ReciveFrom{
    token: string,
    status: number,
    message: string,
    data: UserInfo
}