// 常量路由

export const basicRoutes = [
    {
        name: 'register',
        path: '/register',
        component: () => import('@/views/register/index.vue'),
        meta: {
            title: '注册',
            icon: 'Promotion', // 图标
            hidden: true // 是否在侧边栏显示
        }
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            title: '登录',
            icon: 'Promotion',
            hidden: true
        }
    },
    {
        name: 'notfound',
        path: '/notfound',
        component: () => import('@/views/notfound/index.vue'),
        meta: {
            title: '404',
            hidden: false
        }
    }
]
