// 路由鉴权

import router from '.'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/userStore'
import { logoConfig } from '@/setting'

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    const token = userStore.token
    const username = userStore.username

    // TOKEN 存在
    if (token) {
        document.title = `${logoConfig.title} - ${to.meta.title}`

        // 禁止访问登录注册界面
        if (to.path === '/login' || to.path === '/register') {
            next({ path: '/' })
        } else {
            if (username) {
                next()
            } else {
                // 用户信息丢失
                try {
                    await userStore.getUserInfo()
                    next()
                } catch (error) {
                    userStore.logout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    }
    // TOKEN 不存在
    else {
        to.path === '/login' || '/register'
            ? next()
            : next({ path: '/login', query: { redirect: to.path } })
    }
})

// 全局后置守卫
router.afterEach((to, from) => {
    NProgress.done()
})
