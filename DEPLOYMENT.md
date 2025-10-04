# 地址生成器部署指南

这是一个基于 Next.js 的多语言地址生成器应用，支持中文和英文界面，配置为独立模式部署。

## 部署前检查清单

### 1. 环境配置
- [ ] 复制 `.env.production` 并配置生产环境变量
- [ ] 设置正确的数据库连接字符串
- [ ] 配置域名和 SSL 证书（如需要）
- [ ] 设置安全密钥和认证配置

### 2. 多语言支持验证
- [ ] 确认 `messages/zh.json` 和 `messages/en.json` 包含所有必要的翻译
- [ ] 验证 SEO 元数据（title、description、keywords）已翻译
- [ ] 测试语言切换功能
- [ ] 确认默认语言设置为中文（zh）

## 本地开发

```bash
# 安装依赖
npm install

# 设置数据库
npm run db:setup

# 启动开发服务器
npm run dev

# 访问应用
# 中文版本：http://localhost:3000/zh
# 英文版本：http://localhost:3000/en
# 根路径自动重定向到中文版本
```

## 生产部署

### 方法1: Docker Compose 部署（推荐）

```bash
# 构建和启动所有服务（包括 Nginx、应用和 MySQL）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看应用日志
docker-compose logs -f app

# 停止服务
docker-compose down
```

### 方法2: 单独 Docker 部署

```bash
# 构建 Docker 镜像
docker build -t address-generator .

# 运行容器（需要外部数据库）
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:password@host:3306/database" \
  -e NODE_ENV=production \
  address-generator

# 访问 http://localhost:3000
```

### 方法3: 手动部署

```bash
# 1. 构建应用
npm run build

# 2. 启动生产服务器
npm start

# 或使用 PM2 进程管理
pm2 start npm --name "address-generator" -- start
```

4. 重启nginx服务：
```bash
sudo systemctl restart nginx
```

## 功能特性

- ✅ 响应式设计，支持移动端和桌面端
- ✅ 深色/浅色主题切换
- ✅ 地址信息生成和保存功能
- ✅ 搜索功能
- ✅ 静态导出，无需服务器端渲染
- ✅ SEO优化
- ✅ 无障碍访问支持

## 技术栈

- Next.js 15.5.3
- React 19.1.0
- TypeScript
- Tailwind CSS 4.0
- Material Icons

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 生产环境配置

### 环境变量配置

项目包含以下环境配置文件：
- `.env` - 基础配置模板
- `.env.local` - 开发环境配置
- `.env.production` - 生产环境配置

#### Ubuntu生产环境部署

1. **使用 .env.production 文件（推荐）**：
```bash
# 复制生产环境配置
cp .env.production .env

# 编辑数据库连接信息
nano .env
```

2. **系统环境变量配置**：
```bash
# 编辑用户环境变量
nano ~/.bashrc

# 添加环境变量
export NODE_ENV="production"
export DATABASE_URL="mysql://prod_user:password@localhost:3306/address_collector_prod"
export LOG_LEVEL="error"

# 重新加载配置
source ~/.bashrc
```

详细的Ubuntu部署指南请参考：[ubuntu-deployment-guide.md](./ubuntu-deployment-guide.md)

### Docker环境变量

使用Docker部署时，可以通过以下方式配置环境变量：

```bash
# 方法1: 使用环境变量文件
docker run --env-file .env.production -p 80:80 address-generator

# 方法2: 直接传递环境变量
docker run -e NODE_ENV=production \
           -e DATABASE_URL="mysql://user:pass@host:3306/db" \
           -p 80:80 address-generator

# 方法3: 使用docker-compose
# 参考项目中的 docker-compose.yml 文件
```

## 注意事项

- 应用已配置为静态导出，所有页面都会预渲染为HTML文件
- 主题切换功能使用localStorage保存用户偏好
- 所有交互功能都在客户端运行，无需后端API
- **不需要配置 .env.prod 文件**，使用 `.env.production` 即可
- 生产环境建议使用系统环境变量或容器环境变量管理敏感信息