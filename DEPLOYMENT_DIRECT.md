# 非 Docker 直接部署指南

## 概述

本指南将帮助你在 Ubuntu 服务器上直接部署 Next.js 地址生成器应用，无需使用 Docker。

> ⚠️ **安全提醒**：请先阅读 [安全部署指南](./SECURITY_GUIDE.md) 了解为什么不应使用 root 用户部署以及如何正确设置权限。

## 系统要求

- Ubuntu 18.04+ 或其他 Linux 发行版
- Node.js 18+
- MySQL 8.0+
- Nginx
- PM2 (进程管理器)

## 部署前准备

### 1. 安装 Node.js

```bash
# 使用 NodeSource 仓库安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version
npm --version
```

### 2. 安装 MySQL

```bash
sudo apt update
sudo apt install mysql-server

# 安全配置
sudo mysql_secure_installation

# 创建数据库和用户
sudo mysql -u root -p
```

在 MySQL 中执行：
```sql
CREATE DATABASE address_collector_prod;
CREATE USER 'prod_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON address_collector_prod.* TO 'prod_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. 安装 Nginx

```bash
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4. 安装 PM2

```bash
sudo npm install -g pm2
```

## 部署步骤

### 方法一：使用自动化脚本（推荐）

1. **上传代码到服务器**
```bash
# 在服务器上克隆或上传你的代码
git clone <your-repo-url> /var/www/address-generator
cd /var/www/address-generator
```

2. **配置环境变量**
```bash
# 创建生产环境配置文件
cp .env.example .env.production

# 编辑环境变量
nano .env.production
```

在 `.env.production` 中设置：
```env
NODE_ENV=production
DATABASE_URL="mysql://prod_user:your_secure_password@localhost:3306/address_collector_prod"
PORT=3000
```

3. **运行部署脚本**
```bash
./deploy.sh
```

脚本会自动完成：
- 依赖安装
- 应用构建
- 数据库迁移
- PM2 进程启动
- Nginx 配置

### 方法二：手动部署

1. **安装依赖**
```bash
npm ci
```

2. **生成 Prisma 客户端**
```bash
npx prisma generate
```

3. **构建应用**
```bash
npm run build
```

4. **数据库迁移**
```bash
npx prisma migrate deploy
```

5. **配置 PM2**
```bash
# 编辑 ecosystem.config.js 中的路径
nano ecosystem.config.js

# 启动应用
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

6. **配置 Nginx**
```bash
# 复制 Nginx 配置
sudo cp nginx-production.conf /etc/nginx/sites-available/address-generator

# 启用站点
sudo ln -s /etc/nginx/sites-available/address-generator /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重新加载 Nginx
sudo systemctl reload nginx
```

## 配置文件说明

### ecosystem.config.js
PM2 进程管理配置文件，包含：
- 应用名称和启动脚本
- 环境变量设置
- 日志配置
- 自动重启设置

### nginx-production.conf
Nginx 反向代理配置，包含：
- 代理到 Next.js 应用 (端口 3000)
- 静态资源缓存优化
- API 路由特殊处理
- 安全头设置
- Gzip 压缩

## 验证部署

### 1. 检查应用状态
```bash
pm2 status
pm2 logs address-generator
```

### 2. 测试 API 端点
```bash
curl -X POST http://localhost:3000/api/address/info \
  -H "Content-Type: application/json" \
  -d '{"country": "us"}'
```

### 3. 测试公网访问
```bash
curl -X POST http://43.130.251.15/api/address/info \
  -H "Content-Type: application/json" \
  -d '{"country": "us"}'
```

### 4. 访问前端页面
浏览器访问: http://43.130.251.15/us

## 常用管理命令

### PM2 管理
```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs address-generator

# 重启应用
pm2 restart address-generator

# 停止应用
pm2 stop address-generator

# 删除应用
pm2 delete address-generator

# 监控
pm2 monit
```

### Nginx 管理
```bash
# 测试配置
sudo nginx -t

# 重新加载配置
sudo systemctl reload nginx

# 重启 Nginx
sudo systemctl restart nginx

# 查看状态
sudo systemctl status nginx
```

### 应用更新
```bash
# 拉取最新代码
git pull origin main

# 安装新依赖（如果有）
npm ci

# 重新构建
npm run build

# 数据库迁移（如果有新迁移）
npx prisma migrate deploy

# 重启应用
pm2 restart address-generator
```

## 故障排查

### 1. 应用无法启动
```bash
# 查看详细日志
pm2 logs address-generator --lines 50

# 检查端口占用
sudo netstat -tlnp | grep :3000

# 检查环境变量
pm2 env 0
```

### 2. 数据库连接问题
```bash
# 测试数据库连接
mysql -u prod_user -p -h localhost address_collector_prod

# 检查 Prisma 配置
npx prisma db pull
```

### 3. Nginx 代理问题
```bash
# 检查 Nginx 错误日志
sudo tail -f /var/log/nginx/error.log

# 检查应用访问日志
sudo tail -f /var/log/nginx/address-generator.access.log
```

### 4. 性能优化
```bash
# 启用集群模式（使用所有 CPU 核心）
# 在 ecosystem.config.js 中设置:
# instances: 'max',
# exec_mode: 'cluster'

pm2 restart address-generator
```

## 安全建议

1. **防火墙配置**
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS (如果使用 SSL)
sudo ufw enable
```

2. **SSL 证书（可选）**
```bash
# 使用 Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d 43.130.251.15
```

3. **定期备份**
```bash
# 数据库备份
mysqldump -u prod_user -p address_collector_prod > backup_$(date +%Y%m%d).sql

# 应用备份
tar -czf app_backup_$(date +%Y%m%d).tar.gz /var/www/address-generator
```

## 监控和日志

### 1. 设置日志轮转
```bash
sudo nano /etc/logrotate.d/address-generator
```

内容：
```
/var/www/address-generator/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 2. 监控脚本
可以设置 cron 任务来监控应用状态：
```bash
# 编辑 crontab
crontab -e

# 添加监控任务（每5分钟检查一次）
*/5 * * * * /usr/bin/pm2 ping address-generator || /usr/bin/pm2 restart address-generator
```

这样配置后，你的应用就可以在非 Docker 环境下稳定运行了！