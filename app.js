// 引入必要的模块
const createError = require('http-errors'); // 用于创建HTTP错误对象
const express = require('express'); // Express框架核心模块
const path = require('path'); // Node.js路径处理模块
const cookieParser = require('cookie-parser'); // 解析客户端Cookie的中间件
const logger = require('morgan'); // HTTP请求日志记录器
const errorController = require('./controller/errorController'); // 全局错误处理控制器
const indexRouter = require('./routes/index'); // 首页路由模块
const ejs = require('ejs'); // EJS模板引擎模块

// 引入fs模块用于操作文件系统（用于日志写入）
const fs = require('fs');

// 创建Express应用实例
var app = express();

// 设置静态资源目录
app.use(express.static(path.join(__dirname, 'public')));

// 配置视图引擎
// 设置视图文件存放目录，__dirname表示当前文件所在目录
app.set('views', path.join(__dirname, 'views'));
// 使用.html作为模板扩展名
app.set('view engine', 'html');
// 支持.html扩展名的EJS模板渲染
app.engine('html', ejs.renderFile);

// 创建一个可写流，将日志追加写入到指定的日志文件中
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

// 使用 morgan 中间件并将日志输出到文件
app.use(logger('dev', { stream: accessLogStream }));

// 跨域配置中间件（CORS）
// 建议尽早加载 CORS 中间件，以确保预检请求（OPTIONS）能够被及时处理
app.use((req, res, next) => {
  // 开发环境允许所有来源访问，生产环境建议指定域名
  res.header('Access-Control-Allow-Origin', '*');
  // 是否允许携带凭证（如 Cookie）
  res.header('Access-Control-Allow-Credentials', true);
  // 允许的请求方法
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // 允许的请求头字段
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin,X-Requested-With');
  // 自定义响应头
  res.header('X-Powered-By', 'Express');

  // 处理预检请求（OPTIONS）
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// 使用其他中间件
// 解析JSON请求体
app.use(express.json());
// 解析URL编码请求体（不支持嵌套对象）
app.use(express.urlencoded({ extended: false }));
// 解析客户端发送的Cookie
app.use(cookieParser());

// JSON解析失败监听器
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ code: 400, message: '无效的 JSON 格式' });
  }
  next();
});

// 路由配置
app.use('/', indexRouter); // 根路径路由

// 捕获404错误并转发给错误处理器
app.use(function (req, res, next) {
  next(createError(404));
});

// 全局错误处理器：统一处理错误信息、设置状态码并渲染错误页面
app.use(errorController);

// 导出app实例以便其他文件引用
module.exports = app;