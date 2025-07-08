// 相关处理逻辑
const exampleService = require('../services/example')// 导入相关数据库操作

exports.get = async (req, res) => {
    console.log(`recived from client: ${req}`)
    try {
        const result = await exampleService.getExample()
        return res.send({
            status: 200,
            message: result
        })
    } catch (err) {
        return res.err(500, 'get example error: ' + err)
    }
}