// mock/user.ts
import type { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/loginSlider/gen',
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
  }
] as MockMethod[]