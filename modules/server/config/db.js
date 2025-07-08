// mysql 数据库
const mysql = require('mysql2')

// 创建数据库连接池
const db = mysql.createPool({
    host: 'localhost',   // 数据库地址
    port: 8000,          // 端口号（注意 MySQL 默认是 3306）
    user: 'root',        // 用户名
    password: '',        // 密码
    database: 'my_db'    // 数据库名
})

db.query('SELECT 1', (err, _res) => {
    if (err) {
        console.log('数据库链接失败：', err.message)
        return
    }
    console.log('database connected.');
})

module.exports = db