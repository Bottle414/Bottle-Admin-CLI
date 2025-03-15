// 路由鉴权: 路由什么条件下可以被访问
import router from "."
import NProgress from 'nprogress'   // 因为它是js的，ts认不出所以爆红
import 'nprogress/nprogress.css'
import useUserStore from "@/store/modules/userStore"// 通过token判断登录
import { logoConfig } from "@/setting"

// const userStore = useUserStore(pinia)// 在组件外部，以同步的方式获取仓库数据是拿不到的 而且必须先有大仓库
// 全局前置守卫
router.beforeEach(async(to, from, next) => {
    // to是将要去的路由， from是来时的路由， next是放行函数
    NProgress.start();
    const userStore = useUserStore()    // 推荐写在里面，获取最新数据 这样可以避免在组件外部访问 Pinia 仓库时遇到 undefined 或 pinia 尚未初始化 的问题。
    const token = userStore.token
    const username = userStore.username
    if (token){// 登录了
        document.title = `${ logoConfig.title } - ${ to.meta.title }` 
        if (to.path === '/login'){
            next({path: '/'})// 登录页面不能去
        }else { // 确保有用户信息再去
            if (username){
                next()
            }else {
                try {
                    await userStore.getUserInfo()// 没有就再次发送请求
                    next()// 确保获取成功再跳转
                } catch (error) {
                    // 获取不到用户信息了，可能token过期，可能用户手贱删掉了token
                    userStore.logout()// 先退登，清空本地数据
                    next({path:'/login',query:{redirect: to.path}})// 再登录
                }
            }
        }
    }else {// 未登录
        to.path === '/login' ? next() : next({path:'/login',query:{redirect: to.path}})// 其他的不能去，只能去login
    }
})

// 全局后置守卫, 访问完毕触发
router.afterEach((to, from) => {
    NProgress.done();
})

// 需要被引入才会执行