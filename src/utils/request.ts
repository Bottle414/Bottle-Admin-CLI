import axios from 'axios'
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/userStore'

const request = axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_API, // 可以使用环境变量，基础路径会带这个VITE_APP_BASE_API
    timeout: 5000 // 超时时间
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
        // 给请求添加token
        const userStore = useUserStore()
        if (userStore.token) {
            config.headers.token = userStore.token  // 有就带上
        }
        return config;// 不返回配置对象甚至发不出 里面自带请求头headers，可以配置一些东西,服务器的公共参数
    }, 
    function (error) {
    // 对请求错误做些什么
        return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 成功的回调 可以在这里简化数据，忽然觉得好像mac和ip
    return response.data;// 我只需要数据，所以只返回数据
  }, 
  function (error) {
    // 失败的回调 一般处理网络错误,根据不同的错误信息进行不同的处理
    let message = ''
    let status = error.response.status
    switch(status){
        case 401: 
            message = 'TOKEN失效'
            break
        case 403:
            message = '无访问权限'
            break
        case 404:
            message = '请求地址错误'
            break
        case 500:
            message = '服务器出问题了'
            break
        default:
            message = '网络出问题了'
            break
    }
    
    ElMessage.error(message)

    return Promise.reject(error)
});

export default request