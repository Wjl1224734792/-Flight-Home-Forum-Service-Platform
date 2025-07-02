const express = require('express');
const router = express.Router();

const controller = require('../controller/databaseController');

//新建帖子数据
router.post('/api/createTiezi', controller.createTiezi);

//新建反馈
router.post('/api/createFeedback', controller.createFeedback);

//新建评论
router.post('/api/createComment', controller.createComment);

//删除贴子
router.post('/api/deleteTiezi', controller.deleteTiezi);

//删除评论
router.post('/api/deleteComment', controller.deleteComment);

//删除反馈
router.post('/api/deleteFeedback', controller.deleteFeedback);

//查询贴子
router.post('/api/selectTiezi', controller.selectTiezi);

//查询评论
router.post('/api/selectComment', controller.selectComment);
//查询特定评论
router.post('/api/selectCommentId', controller.selectCommentId);
//用户进入进行ip登记
router.get('/api/ip', (req, res) => {
    let ip = req.ip;
    res.send({
        code: 200,
        ip: ip
    });
})
module.exports = router;
