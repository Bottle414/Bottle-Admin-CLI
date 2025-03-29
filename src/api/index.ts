// axios封装

import axios from 'axios'
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/userStore'

const request = axios.create({
    baseURL: import.meta.env.VITE_SERVE, // 基础路径
    timeout: 5000 // 超时时间
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {

        // 给请求头添加token
        const token = useUserStore().token
        if (token) {
            config.headers.Authorization = token
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error);
});

// 响应拦截器 后端消息在response.data里
request.interceptors.response.use(
    (response) => {
        console.log(response.data)
        return response.data;// 只返回数据,避免每次都写data
    },
    (error) => {
        // 失败的回调 一般处理网络错误,根据不同的错误信息进行不同的处理
        let message = ''
        let status = error.response
        switch(status){
            case 401: 
                message = 'TOKEN失效 : ' + error
                break
            case 403:
                message = '无访问权限 : ' + error
                break
            case 404:
                message = '请求地址错误 : ' + error
                break
            case 500:
                message = '服务器出问题了 : ' + error
                break
            case undefined:
                message = 'error status 为空 : ' + error
                break
            default:
                message = '网络出问题了 : ' + error
                break
        }
        ElMessage.error(message)
        return Promise.reject(error)
});

export default request