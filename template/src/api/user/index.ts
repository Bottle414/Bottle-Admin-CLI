import request from '@/api'
import type {
    LoginInfo,
    ReciveFrom,
    RegisterInfo,
    UserInfo,
    RegisterFrom,
    AllUsersRecive
} from './type'

const USER_BASE = '/user'
enum API {
    REGISTER_URL = '/register',
    LOGIN_URL = '/login',
    GET_URL = '/userInfo',
    UPDATE_URL = '/updateInfo',
    DELETE_URL = '/deleteInfo',
    ALL_URL = '/allUsers'
}

// 用户注册
export function register(userInfo: RegisterInfo): Promise<RegisterFrom> {
    return request({
        url: USER_BASE + API.REGISTER_URL,
        method: 'POST',
        data: userInfo
    })
}

// 用户登录
export function login(userInfo: LoginInfo): Promise<ReciveFrom> {
    return request({
        url: USER_BASE + API.LOGIN_URL,
        method: 'POST',
        data: userInfo
    })
}

// 获取用户信息 不带数据，后端去token拿
export function getUser(): Promise<ReciveFrom> {
    return request({
        url: USER_BASE + API.GET_URL,
        method: 'GET'
    })
}

// 获取所有成员信息
export function allUsers(): Promise<AllUsersRecive> {
    return request({
        url: USER_BASE + API.ALL_URL,
        method: 'GET'
    })
}

// 更新用户信息 带新数据，后端去token拿id识别
export function updateInfo(userInfo: UserInfo) {
    return request({
        url: USER_BASE + API.UPDATE_URL,
        method: 'POST',
        data: userInfo
    })
}

// 删除用户信息
export function deleteInfo(userIds: string[]): Promise<ReciveFrom> {
    return request({
        url: USER_BASE + API.DELETE_URL,
        method: 'POST',
        data: userIds
    })
}
