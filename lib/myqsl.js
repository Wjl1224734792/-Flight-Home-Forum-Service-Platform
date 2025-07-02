// 引入 mysql2 模块，用于连接和操作 MySQL 数据库
const mysql = require('mysql2');

// 引入配置文件，包含数据库连接信息（如 host、user、password、database 等）
const config = require('../config/default');

// 创建一个未指定数据库名的连接池（用于创建或切换数据库等操作）
const database = mysql.createPool({
    host: config.database.HOST,     // 数据库主机地址
    user: config.database.USER,     // 数据库用户名
    password: config.database.PASSWORD  // 数据库密码
});

// 创建一个已指定数据库名的连接池（用于日常数据库操作）
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.WALL, // 指定要连接的数据库名称（留言板数据库）
});

/**
 * 使用回调函数方式执行 SQL 查询（推荐方法）
 * @param {string} sql - 要执行的 SQL 查询语句
 * @param {Array} params - SQL 中的参数数组（防止 SQL 注入）
 * @param {function} callback - 回调函数，接收两个参数：
 *                             - error: 错误对象（如果发生错误）
 *                             - results: 查询结果（如果成功）
 */
const poolQuery = (sql, params, callback) => {
    // 从连接池中获取一个可用连接
    pool.getConnection((err, connection) => {
        if (err) {
            // 连接失败：输出错误日志并返回错误给回调
            console.error('❌ 获取数据库连接失败:', err.message);
            return callback(err, null);
        }

        // 使用获取到的连接执行查询
        connection.query(sql, params, (error, results) => {
            // 查询完成后释放连接回连接池
            connection.release();

            if (error) {
                // 查询失败：输出错误日志并传递错误给回调
                console.error('❌ 数据库查询失败:', error.message);
                return callback(error, null);
            }

            // 查询成功：将结果通过回调返回
            callback(null, results);
        });
    });
};

/**
 * 另一个查询函数，使用未指定数据库的连接池进行查询
 * 适用于需要手动选择数据库的场景（如动态切换数据库）
 * @param {string} sql - 要执行的 SQL 查询语句
 * @param {Array} params - SQL 中的参数数组
 * @param {function} callback - 回调函数，接收两个参数：
 *                             - error: 错误对象
 *                             - results: 查询结果
 */
const databaseQuery = (sql, params, callback) => {
    // 从未指定数据库的连接池中获取连接
    database.getConnection((err, connection) => {
        if (err) {
            // 连接失败：输出错误日志并返回错误给回调
            console.error('❌ 获取数据库连接失败:', err.message);
            return callback(err, null);
        }

        // 使用获取到的连接执行查询
        connection.query(sql, params, (error, results) => {
            // 查询完成后释放连接
            connection.release();

            if (error) {
                // 查询失败：输出错误日志并传递错误给回调
                console.error('❌ 数据库查询失败:', error.message);
                return callback(error, null);
            }

            // 查询成功：将结果通过回调返回
            callback(null, results);
        });
    });
};

// 导出连接池和查询方法，供其他模块引用使用
module.exports = {
    poolQuery,   // 推荐使用的数据库查询方法
    databaseQuery // 可用于手动切换数据库的查询方法
};