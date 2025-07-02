
# 留言板后端服务文档

## 项目概述
这是一个基于 Node.js 的后端服务，为留言板功能提供数据存储与访问接口。主要面向前端开发者、后端开发者以及留言板功能使用者。

## 技术架构
- **框架**: 使用 Express 框架快速搭建 Web 服务
- **数据库**: 支持 MySQL 数据库操作（通过 mysql2 驱动）
- **模板引擎**: 使用 EJS 模板引擎渲染 HTML 页面
- **设计模式**:
  - MVC 模式：[app.js](\app.js) 作为入口控制器，[controller](\routes\index.js#L3-L3) 处理业务逻辑，`views` 负责视图渲染
  - 单例模式：`lib` 中的 `mysql.js` 封装了数据库连接单例

## 技术选型
- **后端**: Express 4.16.1
- **数据库**: MySQL（通过 mysql2 驱动）
- **模板引擎**: EJS 2.6.1
- **日志**: morgan 1.9.1
- **调试工具**: debug 2.6.9

## 目录结构说明
```
.
├── config/               # 存放配置文件
│   └── default.js        # 默认配置文件
├── controller/           # 控制器模块
│   ├── databaseController.js  # 数据库相关逻辑处理
│   └── errorController.js     # 错误处理逻辑
├── lib/                  # 核心工具类
│   ├── method.js         # 通用方法
│   ├── myqsl.js          # 数据库连接
│   └── sql.js            # SQL 语句定义
├── public/               # 静态资源目录
│   └── stylesheets/
│       └── style.css     # 样式文件
├── routes/               # 路由模块
│   └── index.js          # 主页路由定义
├── views/                # 页面模板目录
│   ├── demo.html
│   ├── error.html
│   └── index.html
├── app.js                # 应用主入口文件
├── package-lock.json     # npm 包版本锁定文件
├── package.json          # 项目配置文件
├── 后端开发文档.md       # 后端开发文档
└── 文件目录结构.md       # 文件目录结构说明
```

## 功能模块说明

### 数据库操作
- 提供数据库连接与查询功能
- 支持创建数据库和表
- 支持增删改查操作

### 页面路由
- 实现基本页面渲染
- 定义 API 接口路由

### 错误处理
- 提供统一错误处理机制
- 渲染错误页面

## 开发环境配置

### 必需工具
- Node.js（支持 Express 4.x）
- npm 或 yarn
- MySQL 数据库环境

### 可选工具
- VS Code / IDE
- Postman（用于 API 测试）

### 运行环境
- 构建命令: `npm install`
- 本地开发: `npm start`（使用 nodemon 启动服务）

## API 接口说明

### 帖子管理
- **新建帖子**: POST `/api/createTiezi`
- **删除帖子**: POST `/api/deleteTiezi`
- **查询帖子**: POST `/api/selectTiezi`

### 反馈管理
- **新建反馈**: POST `/api/createFeedback`
- **删除反馈**: POST `/api/deleteFeedback`

### 评论管理
- **新建评论**: POST `/api/createComment`
- **删除评论**: POST `/api/deleteComment`
- **查询评论**: POST `/api/selectComment`

### IP 登记
- **用户进入进行 IP 登记**: GET `/api/ip`

## 配置文件说明

### `config/default.js`
```javascript
const config = {
    PORT: 3000, // 服务监听端口
    database: {
        HOST: 'localhost',      // 数据库主机地址
        USER: 'root',           // 数据库用户名
        PASSWORD: '123456',     // 数据库密码
        WALL: 'wall'            // 数据库名称
    }
}
```

## 日志输出规范
- 所有日志输出包含上下文信息便于调试
- 使用 `console.error` 输出错误日志
- 使用 `console.log` 输出正常日志


## 开发规范
- 使用解构赋值提升代码可读性
- 添加详细的注释说明配置来源
- 统一错误处理逻辑，避免重复代码
- 改进日志输出，包含上下文信息便于调试

## 跨域配置
- 使用手动设置响应头实现跨域支持
- 设置关键头部：
  - `Access-Control-Allow-Origin`: 允许访问的源
  - `Access-Control-Allow-Headers`: 允许的请求头字段
  - `Access-Control-Allow-Methods`: 允许的 HTTP 方法

## 模块引入与配置
- 引入 express, ejs 等核心模块
- 使用 `config/default.js` 统一管理环境配置参数

## 请求体解析
- 启用 `express.json()` 和 `express.urlencoded({ extended: true })` 解析请求数据

## EJS 模板引擎集成
- 将 [.html](\views\demo.html) 后缀文件与 EJS 模板引擎绑定
- 设置默认视图引擎为 html
- 设置 `app.set('views', './views')` 指定视图文件夹路径
- 在项目根目录下创建 `views/` 文件夹用于存放 `.ejs` 或 [.html](\views\demo.html) 模板文件
- 使用 `res.render('templateName', data)` 方法渲染模板并传递数据

## 路由管理
- 根路径 [/](\README.md) 返回欢迎信息
- 使用模块化方式加载外部路由：`require('./routes/index')(app)`

## 服务启动
- 从配置文件读取端口：`const PORT = config.port || 3000`
- 启动服务器监听指定端口：`app.listen(PORT, () => {...})`
```
