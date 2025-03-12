// 登录传入的数据类型
export interface loginForm{
    username: string,
    password: string
}

export interface dataReturnType {
    token?: string, // 有无token，有就是string
    message?:string,
}

// 登录返回的数据类型
export interface loginReturnForm{
    code: number,
    data: {
        token: string
    }
}

// 用户数据类型
interface userInfo {
    userId: string,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}

// getAllUsers返回的数据类型
export interface usersReturnForm{
    users: userInfo[]
}