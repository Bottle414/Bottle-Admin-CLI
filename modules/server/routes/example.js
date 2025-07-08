// 示例路由
const express = require('express')
const exampleRoute = express.Router()
const exampleController = require('../controller/example')// 引入相关处理逻辑

// 配置相关路由
exampleRoute.get('GET /get', exampleController.get)

module.exports = exampleRoute