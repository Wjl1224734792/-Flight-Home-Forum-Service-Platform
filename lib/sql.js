const sql = {
    //创建数据库
    database: 'CREATE DATABASE IF NOT EXISTS wall DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;',
    //贴子
    tieziTable: `CREATE TABLE IF NOT EXISTS tiezi (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                type INT NOT NULL COMMENT '类型0贴子1图片',
                messages VARCHAR(255) NOT NULL COMMENT '内容',
                name VARCHAR(100) NOT NULL COMMENT '用户名',
                userId VARCHAR(100) NOT NULL COMMENT '创建者id',
                moment DATETIME NOT NULL COMMENT '创建时间',
                label INT NOT NULL COMMENT '标签',
                color INT COMMENT '颜色',
                imgUrl VARCHAR(100) COMMENT '图片路径'
            );`,
    //贴子反馈
    feedbackTable: `create table if not exists feedback(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                tieziId INT NOT NULL COMMENT '贴子id',
                userId INT NOT NULL COMMENT '反馈者id',
                type INT NOT NULL COMMENT '反馈类型0喜欢1举报2撤销',
                moment VARCHAR(100) NOT NULL COMMENT '时间'
                );`,
    //贴子评论
    commentTable: `create table if not exists comment(
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                tieziId INT NOT NULL COMMENT '贴子id',
                userId INT NOT NULL COMMENT '评论者id',
                imgUrl VARCHAR(100) NOT NULL COMMENT '头像路径',
                name VARCHAR(100) NOT NULL COMMENT '用户名',
                content VARCHAR(100) NOT NULL COMMENT '评论内容',
                moment VARCHAR(100) NOT NULL COMMENT '时间'
            );`,
    //新建帖子
    createTiezi: `insert into tiezi(type,messages,name,userId,moment,label,color,imgUrl) values(?,?,?,?,?,?,?,?);`,
    //新建反馈
    createFeedback: `insert into feedback(tieziId,userId,type,moment) values(?,?,?,?);`,
    //新建评论
    createComment: `insert into comment(tieziId,userId,imgUrl,name,content,moment) values(?,?,?,?,?,?);`,
    //删除贴子 主表对应多条子表一起删除
    deleteTiezi: `delete a,b,c from tiezi as a left join comment as b on a.id = b.tieziId left join feedback as c on a.id = c.tieziId where a.id = ?;`,
    //删除反馈
    deleteFeedback: `delete from feedback where id = ?;`,
    //删除评论  
    deleteComment: `delete from comment where id = ?;`,
    //搜索特定tieziId的贴子
    selectTiezi: `select * from tiezi where id = ?;`,
    //查询所有标签
    selectTieziAll: "SELECT * FROM tiezi ORDER BY id DESC LIMIT ?, ?",
    //有标签时的分页查询
    selectLabel: `select * from tiezi where label = ? order by id desc limit ?,?;`,
    //特定id评论
    selectCommentId: `select * from comment where id = ?;`,
    //倒序分页查询贴子的评论
    selectComment: `select * from comment where tieziId = ? order by id desc limit ?,?;`,
    //反馈查询分类总数据
    selectFeedback: `select count(*) as count from feedback where tieziId=? and type=?;`,
    //查询评论总数
    selectCommentCount: `select count(*) as count from comment where tieziId=?;`,
    //查询点赞
    selectLike: `select count(*) as count from feedback where tieziId = ? and userId = ? and type = 0;`,
}

module.exports = sql;