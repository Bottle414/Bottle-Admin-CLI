import { defineStore } from "pinia"
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token"
import { getUser, login, register } from "@/api/user/index"
import type { RegisterInfo, LoginInfo } from "@/api/user/type"
// import { basicRoutes } from "@/router/routes.ts"
import { asyncRoutes } from "@/router/asyncRoutes"
import { basicRoutes } from "@/router/basicRoutes"
import type { userState } from "../type"

// 此处进行路由过滤 兼容性较差 TODO: 限制类型 
function filterRoutes(asyncRoutes: any, userRoutes: any){
    return asyncRoutes.filter((item:any) => {
        if (userRoutes.includes(item.name)){
            if (item.children && item.children.length){
                item.children = filterRoutes(item.children, userRoutes)
            }
            return true
        }
    })
}
// structuredClone(asyncRoutes)

const useUserStore = defineStore('user',{
    state(): userState {
        return {
            token: GET_TOKEN(),
            menuRoutes: [], // 常量路由 TODO: 抽离异步路由，完成菜单鉴权
            username: '',
            avatar: '',
            id: NaN
        }
    },
    actions: {
        async userRegister(userInfo : RegisterInfo){
            const response = await register(userInfo)
            if (response.status === 201){
                return 'ok'
            }else {
                return Promise.reject(new Error(response.message))
            }
        },

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
                console.log(this.menuRoutes);
                // 这里调用过滤 structuredClone 不能克隆 component: () => import(...),所以去掉以后就好了 改用 JSON.parse(JSON.stringify(...)) 处理
                this.menuRoutes = [...filterRoutes(JSON.parse(JSON.stringify(asyncRoutes)), userInfo.routes), ...basicRoutes]// 改用深拷贝
                console.log(this.menuRoutes);
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