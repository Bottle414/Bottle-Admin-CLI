// 路由鉴权: 路由什么条件下可以被访问
import router from "."
import NProgress from 'nprogress'   // 因为它是js的，ts认不出所以爆红
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach((to, from, next) => {
    // to是将要去的路由， from是来时的路由， next是放行函数
    NProgress.start();
    next()
})

// 全局后置守卫, 访问完毕触发
router.afterEach((to, from) => {
    NProgress.done();
})

// 需要被引入才会执行