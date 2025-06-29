// mock/user.ts
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/user/register',
    method: 'post',
    response: ({ body } : { body: { username: string, password: string} }) => {
      return {
        status: 200,
        message: '注册成功',
        data: {
          id: Date.now(),
          username: body.username,
        }
      }
    }
  },
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }: { body: { username: string; password: string } }) => {
      if (body.username === 'cat' && body.password === '7777') {
        return {
          status: 200,
          message: 'login success',
          data: {
            token: 'mock-token-abc123',
            userInfo: {
              id: 1,
              username: 'cat',
              role: '老板',
            },
          },
        }
      }
      return { status: 500, message: '账号或密码错误' }
    }
  },
  {
    url: '/api/user/userInfo',
    method: 'get',
    response: () => {
      return {
        status: 200,
        data: {
          id: 9,
          avatar: 'https://element-plus.org/images/element-plus-logo.svg',
          routes: ['layout','home','acl','user','role','permission','product','trademark','attr','spu','sku','screen','charts','table']
        }
      }
    }
  }
] as MockMethod[]