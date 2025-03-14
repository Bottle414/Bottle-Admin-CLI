import { defineStore } from "pinia"
import { getUser, login } from "@/api/user"
import type { loginForm } from "@/api/type"
import type { userState } from "../type"
import { basicRoutes } from "@/router/routes.ts" // 菜单展示与权限有关或者是动态路由，那么就放进userStore

const useUserStore = defineStore('user',{
    state(): userState {
        return {
            token: localStorage.getItem('TOKEN'), // 在这里存储token 老师把获取、设置token的方法封装到一起了
            menuRoutes: basicRoutes, // 菜单路由
            username: '',   // 用户名
            avatar: ''  // 用户头像
        }
    },
    actions: {

        async userLogin(username: loginForm, password: loginForm){// 用户登录的方法 如果报没有这个可能是因为先用在定义，要刷新一下页面
            const res = await login(username, password)
            // 这里情况有两种，一种登录成功，一种失败 成功需要存储token
            if (res.code === 200){
                this.token = (res.data as userState).token // 存储token
                // 由于页面刷新，pinia也会初始化，所以还需要持久化token
                localStorage.setItem('TOKEN',res.data.token)
                return 'ok' // 选择在这里发请求、在ui跳转页面，可以实现多个地方的登录、登录成功跳转不同的页面
            }else {
                return Promise.reject(new Error((res.data as userState).message))
            }
        },
        async getUserInfo(){
            // 获取成功，那么存储
            const userInfo = await getUser()
            if (userInfo != 'error'){
                this.username = userInfo[0].username
                this.avatar = userInfo[0].avatar
            }
            
        }
    },
    getters: {

    }
})

export default useUserStore