export const basicRoutes = [
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/Home.vue') // 这是 懒加载（lazy loading） 路由的写法，常见于 Vue Router 配置中，用于按需加载组件。具体来说，它利用了 动态 import() 来实现异步加载组件，而不是在页面加载时一次性加载所有的组件，能优化页面加载速度和性能。
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('@/views/About.vue')
    },
    {
        name: 'notfound',
        path: '/notfound',
        component: () => import('@/views/NotFound.vue')
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        name: 'default',
        path: '/',
        redirect: '/home'
    }
]