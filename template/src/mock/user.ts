// mock/user.ts
import type { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/login',
        method: 'post',
        response: ({ body }: { body: any }) => {
            const { username, password } = body
            if (username === 'admin' && password === '123456') {
                return {
                    code: 0,
                    message: '登录成功',
                    data: {
                        token: 'mock-token-abc123',
                        userInfo: {
                            id: 1,
                            username: 'admin',
                            role: 'admin'
                        }
                    }
                }
            }
            return { code: 1, message: '用户名或密码错误' }
        }
    },
    {
        url: '/api/user/list',
        method: 'get',
        response: () => {
            return {
                code: 0,
                data: [
                    { id: 1, name: '张三', age: 24 },
                    { id: 2, name: '李四', age: 28 }
                ]
            }
        }
    }
] as MockMethod[]
