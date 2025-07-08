// 数据库相关逻辑
const db = require('../config/db');

exports.getExample = () => {
    const condition = '1'
    return new Promise((resolve, reject) => {
        const sqlstr = 'SELECT * FROM table_name WHERE condition = ?';
        db.query(sqlstr, condition, (err, result) => {
            if (err) {
                reject(err.message)
            }
            resolve(result)
        })
    })
}