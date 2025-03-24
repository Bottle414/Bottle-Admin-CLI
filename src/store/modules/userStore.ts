import { defineStore } from "pinia"
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token"
import { getUser, login } from "@/api/user/index"
import type { UserInfo, LoginInfo } from "@/api/user/type"
import { basicRoutes } from "@/router/routes.ts"
import type { userState } from "../type"

const useUserStore = defineStore('user',{
    state(): userState {
        return {
            token: GET_TOKEN(),
            menuRoutes: basicRoutes, // 菜单路由
            username: '',
            avatar: '',
            id: NaN
        }
    },
    actions: {

        async userLogin(userInfo : LoginInfo){
            const response = await login(userInfo)
            if (response.status === 200){
                const token = response.token
                this.token = token
                SET_TOKEN(token)
                return 'ok' // 选择在这里发请求、在ui跳转页面，可以实现多个地方的登录、登录成功跳转不同的页面
            }else {
                return Promise.reject(new Error(response.message))
            }
        },
        async getUserInfo(){
            const response = await getUser()
            if (response.status === 200){
                const userInfo = response.data
                this.id = userInfo.id
                this.username = userInfo.username
                this.avatar = userInfo.avatar
                return 'ok';
            }else {
                return Promise.reject('获取用户信息失败');
            }
        },
        logout(){
            // 回到登录界面，删除本地用户数据,token失效
            this.token = '',
            this.username = '',
            this.avatar = ''
            REMOVE_TOKEN()
        }
    },
    getters: {

    }
})

export default useUserStore