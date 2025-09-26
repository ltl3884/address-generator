# 地址生成器部署指南

这是一个基于Next.js的地址生成器应用，已配置为静态导出，可以部署在nginx服务器上。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 构建和部署

### 方法1: 直接构建静态文件

```bash
# 构建静态文件
npm run build

# 构建完成后，静态文件将在 'out' 目录中
# 将 'out' 目录的内容复制到nginx的web根目录
```

### 方法2: 使用Docker部署

```bash
# 构建Docker镜像
docker build -t address-generator .

# 运行容器
docker run -p 80:80 address-generator

# 访问 http://localhost
```

### 方法3: 手动nginx配置

1. 构建静态文件：
```bash
npm run build
```

2. 将 `out` 目录的内容复制到nginx的web根目录（通常是 `/var/www/html` 或 `/usr/share/nginx/html`）

3. 使用提供的 `nginx.conf` 配置文件，或将其内容添加到你的nginx配置中

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