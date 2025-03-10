import request from "@/utils/request"
import type { loginForm, loginReturnForm, usersReturnForm } from "./type"
enum API {
    LOGIN_BASE_URL = 'http://localhost:3000/Users',
    USERS_URL = 'http://localhost:3000/Users'
}

export async function getAllUsers(){
    try {
        const response = await fetch(API.USERS_URL)
        const users = await response.json()
        return <usersReturnForm>users
    } catch (error) {
        console.log('获取所有用户失败')
        return 'error'
    }
}

export async function login(username:loginForm , password:loginForm){
    try {
        const response = await fetch(`${API.LOGIN_BASE_URL}?username=${ username }`)
        const user = await response.json()
        if (user === '') {
            return {code: 404, data: {message: 'user not find'}}
        }
        const { pwd } = user
        if (pwd === password){
            const { token } = user
            return <loginReturnForm>{code: 200, data:{token: token}}// data写成data导致类型错误……
        }else {
            return {code: 400, data: {message: 'password is wrong'}}
        }
    } catch (error) {
        console.log('获取登录信息失败');
    }
}