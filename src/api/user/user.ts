import request from "@/utils/request"
import type { loginForm, loginReturnForm, usersReturnForm } from "./type"

const USER_BASE_URL = import.meta.env.VITE_SERVE + '/user'
enum API {
    LOGIN_BASE_URL = '/login',
    UPDATE_BASE_URL = '/update',
    REGISTER_BASE_URL = '/register',
    GETINFO_BASE_URL = '/userInfo'
}

export async function getUser(token : string){
    const response = await fetch(`${USER_BASE_URL}${API.GETINFO_BASE_URL}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token // 发送 Token
        }
    })
    const user = await response.json()
    return user
}

export async function login(username:loginForm , password:loginForm){
    const response = await fetch(`${USER_BASE_URL}${API.LOGIN_BASE_URL}`,{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password
        })
    })
    const user = await response.json()
    return user
}