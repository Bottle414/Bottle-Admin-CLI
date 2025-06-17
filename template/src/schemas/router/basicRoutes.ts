/**
 *  常量路由配置项：
 * 
 *  name: 路由名称
 *  path: 路由路径
 *  component: 路由组件， () => import() 为路由懒加载
 */

const basicRoutesOption = [
    {
        name: 'register',
        path: '/register',
        component: () => import('@/views/register/index.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },
    {
        name: 'notfound',
        path: '/notfound',
        component: () => import('@/views/notfound/index.vue')
    }
]

export default basicRoutesOption