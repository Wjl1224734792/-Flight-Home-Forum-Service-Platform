const errorController = function (err, req, res, next) {
    // 设置响应本地变量，仅在开发环境中提供详细错误信息
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // 渲染错误页面，并设置对应的HTTP状态码
    res.status(err.status || 500);
    res.render('error'); // 使用EJS模板渲染错误页面
}

module.exports = errorController;