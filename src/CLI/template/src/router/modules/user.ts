// 路由模板
export default {
    path: '/user',
    component: '',
    children: [
      {
        path: '',
        name: 'UserList',
        component: () => import('@/pages/user/index.vue'),
        meta: { title: '用户管理', icon: 'User' }
      }
    ]
}  