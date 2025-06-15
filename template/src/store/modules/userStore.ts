import { defineStore } from 'pinia'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { getUser, login, register } from '@/api/user/index'

import { asyncRoutes } from '@/router/asyncRoutes'
import { basicRoutes } from '@/router/basicRoutes'

import type { userState } from '../type'
import type { RegisterInfo, LoginInfo } from '@/api/user/type'

function filterRoutes(asyncRoutes: any, userRoutes: any) {
    return asyncRoutes.filter((item: any) => {
        if (userRoutes.includes(item.name)) {
            if (item.children && item.children.length) {
                item.children = filterRoutes(item.children, userRoutes)
            }
            return true
        }
    })
}

const useUserStore = defineStore('user', {
    state(): userState {
        return {
            token: GET_TOKEN(),
            menuRoutes: [],
            username: '',
            avatar: '',
            id: NaN
        }
    },
    actions: {
        // 用户注册
        async userRegister(userInfo: RegisterInfo) {
            const response = await register(userInfo)
            if (response.status === 201) {
                return 'ok'
            } else {
                return Promise.reject(new Error(response.message))
            }
        },
        // 用户登录
        async userLogin(userInfo: LoginInfo) {
            const response = await login(userInfo)
            if (response.status === 200) {
                const token = response.token
                this.token = token
                SET_TOKEN(token)
                return 'ok'
            } else {
                return Promise.reject(new Error(response.message))
            }
        },
        // 获取用户信息
        async getUserInfo() {
            const response = await getUser()
            if (response.status === 200) {
                const userInfo = response.data
                this.id = userInfo.id
                this.username = userInfo.username
                this.avatar = userInfo.avatar
                console.log(this.menuRoutes)
                this.menuRoutes = [
                    ...filterRoutes(
                        JSON.parse(JSON.stringify(asyncRoutes)),
                        userInfo.routes
                    ),
                    ...basicRoutes
                ]
                console.log(this.menuRoutes)
                return 'ok'
            } else {
                return Promise.reject('获取用户信息失败')
            }
        }, 
        // 退出登录
        logout() {
            this.token = '',
            this.username = '',
            this.avatar = ''
            REMOVE_TOKEN()
        }
    },
    getters: {}
})

export default useUserStore
