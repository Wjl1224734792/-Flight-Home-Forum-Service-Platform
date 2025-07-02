const { databaseQuery, poolQuery } = require('./myqsl.js');
const mysql = require('./sql.js');

/**
 * 统一错误码定义
 * @type {{DB_QUERY_FAILED: {code: number, message: string}, INVALID_PARAMS: {code: number, message: string}}}
 */
const ERROR_CODE = {
    DB_QUERY_FAILED: { code: 500, message: '数据库查询失败' },
    INVALID_PARAMS: { code: 400, message: '无效参数' }
};

/**
 * 日志记录工具
 * @param {'info'|'error'} level - 日志级别
 * @param {string} msg - 日志信息
 * @param {*} detail - 附加详细信息
 */
const logger = (level, msg, detail) => {
    const logEntry = { timestamp: new Date().toISOString(), level, msg, detail };
    if (level === 'error') {
        console.error('❌', JSON.stringify(logEntry));
    } else {
        console.log('✅', JSON.stringify(logEntry));
    }
};

/**
 * 安全获取 count 值
 * @param {*} res - 查询结果
 * @returns {number} count 值或默认 0
 */
const safeCountResult = (res) =>
    (res && Array.isArray(res) && res[0] && typeof res[0].count === 'number') ? res[0].count : 0;

/**
 * 创建数据库
 * @param {string} sql - 创建数据库的 SQL 语句
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const createDatabase = (sql, callback = () => { }) => {
    databaseQuery(sql, [], (error, results) => {
        if (error) {
            logger('error', '创建数据库失败', error);
            return callback(error, null);
        }
        logger('info', '✅ 数据库创建成功');
        callback(null, results);
    });
};

/**
 * 创建数据表
 * @param {string} sql - 创建数据表的 SQL 语句
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const createTable = (sql, callback = () => { }) => {
    poolQuery(sql, [], (error, results) => {
        if (error) {
            logger('error', '创建数据表失败', error);
            return callback(error, null);
        }
        logger('info', '✅ 数据表创建成功');
        callback(null, results);
    });
};

/**
 * 新建帖子
 * @param {string} sql - 插入帖子的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const createTiezi = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '新建帖子失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 新建帖子成功', results);
        callback(null, results);
    });
};

/**
 * 新建反馈
 * @param {string} sql - 插入反馈的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const createFeedback = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '新建反馈失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 新建反馈成功', results);
        callback(null, results);
    });
};

/**
 * 新建评论
 * @param {string} sql - 插入评论的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const createComment = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '新建评论失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 新建评论成功', results);
        callback(null, results);
    });
};

/**
 * 删除帖子
 * @param {string} sql - 删除帖子的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const deleteTiezi = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '删除帖子失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 帖子删除成功', results);
        callback(null, results);
    });
};

/**
 * 删除反馈
 * @param {string} sql - 删除反馈的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const deleteFeedback = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '删除反馈失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 反馈删除成功', results);
        callback(null, results);
    });
};

/**
 * 删除评论
 * @param {string} sql - 删除评论的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const deleteComment = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '删除评论失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 评论删除成功', results);
        callback(null, results);
    });
};

/**
 * 查询贴子
 * @param {string} sql - 查询贴子的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const selectTiezi = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '查询贴子失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 查询贴子成功', results);
        callback(null, results);
    });
};

/**
 * 查询评论
 * @param {string} sql - 查询评论的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const selectComment = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '查询评论失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 查询评论成功', results);
        callback(null, results);
    });
};

/**
 * 查询反馈
 * @param {string} sql - 查询反馈的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {*} results - 查询结果
 */
const selectFeedback = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '查询反馈失败', { sql, array, error });
            return callback(error, null);
        }
        logger('info', '✅ 查询反馈成功', results);
        callback(null, results);
    });
};

/**
 * 查询评论总数
 * @param {string} sql - 查询评论总数的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {number} count - 返回的评论总数
 */
const selectCommentCount = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '查询评论总数失败', { sql, array, error });
            return callback(error, null);
        }
        const count = safeCountResult(results);
        logger('info', '✅ 查询评论总数成功', { count });
        callback(null, count);
    });
};

/**
 * 查询点赞数
 * @param {string} sql - 查询点赞数的 SQL 语句
 * @param {Array<*>} array - 参数数组
 * @param {Function} callback - 回调函数
 * @callback callback
 * @param {?Error} error - 错误对象，无错误时为 null
 * @param {number} like - 返回的点赞数
 */
const selectLike = (sql, array, callback = () => { }) => {
    poolQuery(sql, array, (error, results) => {
        if (error) {
            logger('error', '查询点赞失败', { sql, array, error });
            return callback(error, null);
        }
        const like = safeCountResult(results);
        logger('info', '✅ 查询点赞成功', { like });
        callback(null, like);
    });
};

/**
 * 异步封装示例（支持 async/await）
 * @param {string} sql - SQL 查询语句
 * @param {Array<*>} params - 参数数组
 * @returns {Promise<*>} 查询结果
 */
const queryAsync = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        poolQuery(sql, params, (error, results) => {
            if (error) {
                logger('error', '异步查询失败', { sql, params, error });
                return reject(error);
            }
            resolve(results);
        });
    });
};

/**
 * 初始化数据库（创建数据库和数据表）
 */
const initDatabase = () => {
    createDatabase(mysql.database);
    createTable(mysql.tieziTable);
    createTable(mysql.feedbackTable);
    createTable(mysql.commentTable);
};

/**
 * 安全获取查询结果中的计数字段
 * 防止 undefined 或 null 导致的 TypeError
 *
 * @param {Array} result - 查询结果数组
 * @returns {number} 安全的整数结果
 */
const safeCount = (result) => {
    return (Array.isArray(result) && typeof result[0]?.count === 'number') ? result[0].count : 0
}

module.exports = {
    createDatabase,
    createTable,
    createTiezi,
    createFeedback,
    createComment,
    deleteTiezi,
    deleteFeedback,
    deleteComment,
    selectTiezi,
    selectComment,
    selectFeedback,
    selectCommentCount,
    selectLike,
    queryAsync,
    initDatabase,
    safeCount
};