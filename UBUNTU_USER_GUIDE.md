# Ubuntu 用户部署指南

本指南专门针对阿里云 ECS 等云服务器的默认 `ubuntu` 用户。

## ✅ 为什么 ubuntu 用户是好选择

### 安全优势
- ✅ **非 root 用户**：避免了 root 用户的安全风险
- ✅ **预配置权限**：云服务商已配置合适的权限
- ✅ **sudo 访问**：可以执行必要的系统操作
- ✅ **标准实践**：符合 Linux 安全最佳实践

### 便利性
- ✅ **无需创建用户**：直接使用现有用户
- ✅ **权限适中**：既不过高也不过低
- ✅ **环境友好**：与云服务器环境完美匹配

## 🚀 快速部署步骤

### 1. 连接到服务器
```bash
# SSH 连接到你的 ECS 服务器
ssh ubuntu@your-server-ip
```

### 2. 准备项目
```bash
# 创建项目目录（推荐）
mkdir -p ~/apps
cd ~/apps

# 克隆项目或上传代码
git clone <your-repo> address-generator
# 或者使用 scp 上传代码

cd address-generator
```

### 3. 配置环境变量
```bash
# 创建环境变量文件
cp .env.example .env  # 如果有示例文件
# 或者直接创建
nano .env
```

添加以下内容：
```env
DATABASE_URL="mysql://username:password@localhost:3306/address_generator"
NODE_ENV=production
```

### 4. 执行部署
```bash
# 给脚本执行权限
chmod +x deploy.sh

# 执行部署脚本
./deploy.sh
```

## 🔧 部署过程说明

### 脚本会自动执行以下操作：

1. **安全检查**
   - ✅ 确认使用非 root 用户
   - ✅ 检查 sudo 权限

2. **环境检查**
   - 检查 Node.js 版本
   - 检查 PM2 是否安装

3. **依赖安装**
   - 安装项目依赖
   - 生成 Prisma 客户端

4. **应用构建**
   - 构建 Next.js 应用
   - 优化生产环境

5. **数据库迁移**
   - 执行数据库迁移
   - 确保数据库结构最新

6. **服务启动**
   - 使用 PM2 启动应用
   - 配置开机自启

7. **Nginx 配置**（可选）
   - 配置反向代理
   - 启用 Gzip 压缩
   - 设置缓存策略

## 📋 部署后验证

### 1. 检查应用状态
```bash
# 查看 PM2 进程
pm2 status

# 查看应用日志
pm2 logs address-generator

# 检查应用响应
curl http://localhost:3000
```

### 2. 测试 API 端点
```bash
# 测试 API
curl -X POST http://localhost:3000/api/address/info \
  -H "Content-Type: application/json" \
  -d '{"country": "us"}'
```

### 3. 检查 Nginx（如果配置了）
```bash
# 检查 Nginx 状态
sudo systemctl status nginx

# 测试 Nginx 配置
sudo nginx -t

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/access.log
```

## 🛠️ 常用管理命令

### PM2 管理
```bash
# 查看所有进程
pm2 list

# 重启应用
pm2 restart address-generator

# 停止应用
pm2 stop address-generator

# 查看日志
pm2 logs address-generator

# 监控资源使用
pm2 monit
```

### 应用更新
```bash
# 拉取最新代码
git pull origin main

# 重新部署
./deploy.sh

# 或者手动更新
npm ci --production=false
npm run build
pm2 restart address-generator
```

### 系统服务管理
```bash
# 重启 Nginx
sudo systemctl restart nginx

# 查看系统资源
htop
df -h
free -h
```

## 🔍 故障排除

### 常见问题

#### 1. 权限问题
```bash
# 检查文件权限
ls -la

# 修复权限（如果需要）
chmod +x deploy.sh
chmod 600 .env
```

#### 2. 端口占用
```bash
# 检查端口占用
sudo netstat -tlnp | grep :3000
sudo lsof -i :3000

# 杀死占用进程
sudo kill -9 <PID>
```

#### 3. 数据库连接问题
```bash
# 检查 MySQL 状态
sudo systemctl status mysql

# 测试数据库连接
mysql -u username -p -h localhost
```

#### 4. Nginx 配置问题
```bash
# 测试配置
sudo nginx -t

# 查看错误日志
sudo tail -f /var/log/nginx/error.log

# 重新加载配置
sudo systemctl reload nginx
```

## 📊 性能优化建议

### 1. 系统级优化
```bash
# 增加文件描述符限制
echo "ubuntu soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "ubuntu hard nofile 65536" | sudo tee -a /etc/security/limits.conf
```

### 2. PM2 优化
```bash
# 使用集群模式（多核 CPU）
pm2 start ecosystem.config.js --env production
```

### 3. Nginx 优化
- 启用 Gzip 压缩
- 配置静态文件缓存
- 使用 HTTP/2
- 配置 SSL/TLS

## 🔒 安全建议

### 1. 防火墙配置
```bash
# 启用 UFW
sudo ufw enable

# 允许必要端口
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443

# 查看状态
sudo ufw status
```

### 2. 定期更新
```bash
# 更新系统包
sudo apt update && sudo apt upgrade

# 更新 Node.js 依赖
npm audit fix
```

### 3. 备份策略
```bash
# 数据库备份
mysqldump -u username -p database_name > backup.sql

# 代码备份
tar -czf backup-$(date +%Y%m%d).tar.gz /home/ubuntu/apps/address-generator
```

## 📞 获取帮助

如果遇到问题：
1. 查看应用日志：`pm2 logs address-generator`
2. 查看系统日志：`sudo journalctl -u nginx`
3. 检查资源使用：`htop`, `df -h`
4. 参考 [安全部署指南](./SECURITY_GUIDE.md)
5. 查看 [详细部署文档](./DEPLOYMENT_DIRECT.md)