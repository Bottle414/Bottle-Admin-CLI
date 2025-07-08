/**
 * 返回错误日志
 * 在 Express 中间件 里，标准函数签名是：(req, res, next)
 * 虽然没用 req，但必须保留这个位置，否则 res 和 next 会错位
 * _ 开头表示“这个变量是预留但当前未用”
 */

exports.errorMiddle = (_req, res, next) => {
    res.err = (status, err) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
}