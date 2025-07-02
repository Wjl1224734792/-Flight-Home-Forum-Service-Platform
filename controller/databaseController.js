// 引入必要的模块和方法
const method = require('../lib/method');
const sql = require('../lib/sql');

/**
 * 请求体参数定义
 * @typedef {Object} TieziRequest
 * @property {number} type - 帖子类型（数字）
 * @property {string} messages - 帖子内容（字符串）
 * @property {string} name - 发帖人姓名（字符串）
 * @property {number} userId - 用户 ID（整数）
 * @property {string} moment - 发帖时间（日期时间格式）
 * @property {string} [label] - 标签（可选）
 * @property {string} [color] - 颜色标识（可选）
 * @property {string} [imgUrl] - 图片路径（可选）
 */

/**
 * 创建帖子接口
 * 接收客户端提交的帖子数据并插入到数据库中
 *
 * @param {Object} req - HTTP 请求对象
 * @param {TieziRequest} req.body - 帖子数据
 * @param {Function} res - HTTP 响应对象
 *
 * @example 示例请求体:
 * {
 *   "type": 1,
 *   "messages": "这是一个测试帖子",
 *   "name": "张三",
 *   "userId": 123,
 *   "moment": "2025-06-26 16:41:06",
 *   "label": "测试",
 *   "color": "#ff0000",
 *   "imgUrl": "http://example.com/image.png"
 * }
 */
exports.createTiezi = (req, res) => {
    const data = req.body;

    // 验证必填字段
    if (typeof data.type === 'undefined' || !data.messages || !data.name || !data.userId || !data.moment) {
        console.log('验证阶段：', data);
        return res.send({
            code: 400,
            messages: '缺少必要字段',
            received: data
        });
    }

    // 调用封装好的数据库插入方法
    method.createTiezi(sql.createTiezi, [
        data.type,
        data.messages,
        data.name,
        data.userId,
        data.moment,
        data.label,
        data.color,
        data.imgUrl
    ], (error, result) => {
        if (error) {
            return res.send({
                code: 400,
                messages: error.message || '数据库操作失败',
                detail: {
                    sql: sql.createTiezi, params: [
                        data.type,
                        data.messages,
                        data.name,
                        data.userId,
                        data.moment,
                        data.label,
                        data.color,
                        data.imgUrl
                    ]
                }
            });
        }
        res.send({
            code: 200,
            messages: result
        });
    });
};

/**
 * 新建反馈接口
 * 接收客户端提交的反馈信息并插入到数据库中
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 反馈数据
 * @property {number} tieziId - 关联的帖子 ID
 * @property {number} userId - 用户 ID
 * @property {number} type - 反馈类型（0-点赞，1-举报，2-撤销）
 * @property {string} moment - 反馈时间
 * @param {Function} res - HTTP 响应对象
 */
exports.createFeedback = (req, res) => {
    const data = req.body;

    // 验证必填字段
    if (!data.tieziId || !data.userId || !data.moment) {
        console.log('验证阶段：', data);
        return res.send({
            code: 400,
            messages: '缺少必要字段',
            received: data
        });
    }

    method.createFeedback(sql.createFeedback, [
        data.tieziId,
        data.userId,
        data.type,
        data.moment
    ], (error, result) => {
        if (error) {
            return res.send({
                code: 400,
                messages: error.message || '数据库操作失败',
                detail: {
                    sql: sql.createFeedback, params: [
                        data.tieziId,
                        data.userId,
                        data.type,
                        data.moment
                    ]
                }
            });
        }
        res.send({
            code: 200,
            messages: result
        });
    });
};

/**
 * 新建评论接口
 * 接收客户端提交的评论信息并插入到数据库中
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 评论数据
 * @property {number} tieziId - 关联的帖子 ID
 * @property {number} userId - 用户 ID
 * @property {string} imgUrl - 用户头像路径
 * @property {string} name - 用户名
 * @property {string} content - 评论内容
 * @property {string} moment - 评论时间
 * @param {Function} res - HTTP 响应对象
 */
exports.createComment = (req, res) => {
    const data = req.body;

    // 验证必填字段
    if (!data.tieziId || !data.userId || !data.moment || !data.content || !data.name) {
        console.log('验证阶段：', data);
        return res.send({
            code: 400,
            messages: '缺少必要字段',
            received: data
        });
    }

    method.createComment(sql.createComment, [
        data.tieziId,
        data.userId,
        data.imgUrl,
        data.name,
        data.content,
        data.moment
    ], (error, result) => {
        if (error) {
            return res.send({
                code: 400,
                messages: error.message || '数据库操作失败',
                detail: {
                    sql: sql.createComment, params: [
                        data.tieziId,
                        data.userId,
                        data.imgUrl,
                        data.name,
                        data.content,
                        data.moment
                    ]
                }
            });
        }
        res.send({
            code: 200,
            messages: result
        });
    });
};

/**
 * 删除贴子接口
 * 接收客户端提交的帖子 ID 并从数据库中删除
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 请求体
 * @property {number} id - 帖子 ID
 * @param {Function} res - HTTP 响应对象
 */
exports.deleteTiezi = (req, res) => {
    const data = req.body;
    method.deleteTiezi(sql.deleteTiezi, [data.id], (error, result) => {
        if (error) {
            return res.send({
                code: 400,
                messages: error.message || '数据库操作失败'
            });
        }
        res.send({
            code: 200,
            messages: result
        });
    });
};

/**
 * 删除评论接口
 * 接收客户端提交的评论 ID 并从数据库中删除
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 请求体
 * @property {number} id - 评论 ID
 * @param {Function} res - HTTP 响应对象
 */
exports.deleteComment = (req, res) => {
    const data = req.body;
    method.deleteComment(sql.deleteComment, [data.id], (error, result) => {
        if (error) {
            return res.send({
                code: 400,
                messages: error.message || '数据库操作失败'
            });
        }
        res.send({
            code: 200,
            messages: result
        });
    });
};

/**
 * 删除反馈接口
 * 接收客户端提交的反馈 ID 并从数据库中删除
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 请求体
 * @property {number} id - 反馈 ID
 * @param {Function} res - HTTP 响应对象
 */
exports.deleteFeedback = (req, res) => {
    const data = req.body;
    method.deleteFeedback(sql.deleteFeedback, [data.id], (error, result) => {
        if (error) {
            return res.send({
                code: 400,
                messages: error.message || '数据库操作失败'
            });
        }
        res.send({
            code: 200,
            messages: result
        });
    });
};

/**
 * 分页查询贴子接口
 * 支持按标签筛选并分页获取帖子列表，并附带每条帖子的统计信息
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 请求体
 * @property {number} label - 标签（-1 表示所有）
 * @property {number} page - 当前页码
 * @property {number} pageSize - 每页数量
 * @param {Function} res - HTTP 响应对象
 *
 * @example 示例请求体:
 * {
 *   "label": 1,
 *   "page": 1,
 *   "pageSize": 10
 * }
 */
exports.selectTiezi = async (req, res) => {
    const { label, page = 1, pageSize = 10 } = req.body;

    // 校验分页参数
    if (typeof page !== 'number' || typeof pageSize !== 'number' || page < 1 || pageSize < 1) {
        return res.send({
            code: 400,
            messages: '分页参数无效',
            detail: { page, pageSize }
        });
    }

    try {
        let results;
        if (label === -1) {
            // 使用无 label 的查询语句
            results = await method.queryAsync(sql.selectTieziAll, [
                ((page - 1) * pageSize),
                pageSize
            ]);
        } else {
            // 使用带 label 的查询语句
            results = await method.queryAsync(sql.selectLabel, [
                label,
                ((page - 1) * pageSize),
                pageSize
            ]);
        }

        if (!Array.isArray(results) || results.length === 0) {
            return res.send({
                code: 200,
                messages: {
                    data: [],
                    like: 0,
                    report: 0,
                    revoke: 0,
                    isLike: 0,
                    commentCount: 0
                }
            });
        }
        console.log(results);
        // 对每条帖子并行获取统计信息
        const enhancedResults = await Promise.all(
            results.map(async (post) => {
                try {
                    const [like, report, revoke, isLike, commentCount] = await Promise.all([
                        method.queryAsync(sql.selectFeedback, [post.id, 0]),
                        method.queryAsync(sql.selectFeedback, [post.id, 1]),
                        method.queryAsync(sql.selectFeedback, [post.id, 2]),
                        method.queryAsync(sql.selectLike, [post.id, req.body.userId]), // 可能失败
                        method.queryAsync(sql.selectCommentCount, [post.id])
                    ]);

                    return {
                        ...post,
                        like: method.safeCount(like),
                        report: method.safeCount(report),
                        revoke: method.safeCount(revoke),
                        isLike: method.safeCount(isLike),
                        commentCount: method.safeCount(commentCount)
                    };
                } catch (error) {
                    console.error(`帖子 ${post.id} 统计信息查询失败`, error);
                    return {
                        ...post,
                        like: 0,
                        report: 0,
                        revoke: 0,
                        isLike: 0,
                        commentCount: 0
                    };
                }
            })
        );
        res.send({
            code: 200,
            messages: {
                data: enhancedResults
            }
        });

    } catch (error) {
        res.send({
            code: 400,
            messages: error.message || '数据库操作失败',
            detail: { sql: label === -1 ? sql.selectTieziAll : sql.selectLabel }
        });
    }
};

/**
 * 查询评论接口
 * 分页获取指定帖子的评论内容
 *
 * @param {Object} req - HTTP 请求对象
 * @param {Object} req.body - 请求体
 * @property {number} tieziId - 帖子 ID
 * @property {number} page - 当前页码
 * @property {number} pageSize - 每页数量
 * @param {Function} res - HTTP 响应对象
 */
exports.selectComment = async (req, res) => {
    const { tieziId, page, pageSize } = req.body;
    console.log("开始：", req.body);

    try {
        const result = await method.queryAsync(sql.selectComment, [
            tieziId,
            ((page - 1) * pageSize),
            pageSize
        ]);

        res.send({
            code: 200,
            messages: result
        });
        console.log("结束：", result);
    } catch (error) {
        res.send({
            code: 400,
            messages: error.message || '数据库操作失败',
            detail: { sql: sql.selectComment, params: [tieziId] }
        });
    }
};

exports.selectCommentId = async (req, res) => {
    const { id } = req.body;
    try {
        const result = await method.queryAsync(sql.selectCommentId, [id]);

        res.send({
            code: 200,
            messages: result
        });
        console.log("结束：", result);
    } catch (error) {
        res.send({
            code: 400,
            messages: error.message || '数据库操作失败',
            detail: { sql: sql.selectComment, params: [tieziId] }
        });
    }
};