// 采用 express 框架
const express = require('express')
const cors = require('cors')// 解决跨域中间件
const { expressjwt } = require('express-jwt')// JsonWebToken 中间件
const config = require('./config')// 引入全局配置
const errorHandler = require('./middlewave/error').errorMiddle// 引入错误处理中间件

const app = express()

app.use(errorHandler)
app.use(cors())
app.use(express.urlencoded({ extended: false }))// 配置解析文件
app.use(express.json())

// token 认证排除路径
const noTokenRoutes = [/^\/public/, /^\/example\/get/]
app.use(expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: noTokenRoutes }))// 配置token解析

/**
 * 配置路由
 * 此处写了自动挂载
 * 
 * 示例：app.use('/example', require('./routes/example'))
 * 将 ./routes/example 模块挂载到路由前缀 /example 下
 * 比如 ./routes/example.js 中定义了 /get 路由，
 * 那它的完整访问路径就是：${serverHost}:${serverPort}/example/get
 */
const fs = require('fs')
const path = require('path')
// import { fileURLToPath } from 'url'
// import { dirname } from 'path'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

fs.readdirSync(path.join(__dirname, 'routes')).forEach(file => {
  const routePath = `/` + file.replace('.js', '')
  app.use(routePath, require(`./routes/${file}`))
})

module.exports = app