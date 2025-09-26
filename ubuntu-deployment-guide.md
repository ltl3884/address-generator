# Ubuntu 生产环境部署指南

## 环境变量配置

### 1. 使用 .env.production 文件（推荐）

项目已包含 `.env.production` 文件，包含生产环境的默认配置。在Ubuntu服务器上部署时：

```bash
# 1. 复制生产环境配置文件
cp .env.production .env

# 2. 编辑配置文件，修改数据库连接信息
nano .env

# 3. 修改以下关键配置：
# DATABASE_URL="mysql://your_prod_user:your_secure_password@localhost:3306/address_collector_prod"
```

### 2. 系统环境变量配置（可选）

如果你不想使用 `.env` 文件，可以直接在Ubuntu系统中设置环境变量：

#### 方法1: 临时设置（当前会话有效）
```bash
export NODE_ENV="production"
export DATABASE_URL="mysql://prod_user:your_secure_password@localhost:3306/address_collector_prod"
export LOG_LEVEL="error"
```

#### 方法2: 永久设置（推荐）
```bash
# 编辑用户环境变量文件
nano ~/.bashrc

# 在文件末尾添加：
export NODE_ENV="production"
export DATABASE_URL="mysql://prod_user:your_secure_password@localhost:3306/address_collector_prod"
export LOG_LEVEL="error"

# 重新加载配置
source ~/.bashrc
```

#### 方法3: 系统级环境变量
```bash
# 编辑系统环境变量文件（需要sudo权限）
sudo nano /etc/environment

# 添加以下内容：
NODE_ENV="production"
DATABASE_URL="mysql://prod_user:your_secure_password@localhost:3306/address_collector_prod"
LOG_LEVEL="error"

# 重启系统或重新登录生效
```

### 3. 使用 systemd 服务配置

如果使用 systemd 管理应用服务，可以在服务文件中配置环境变量：

```bash
# 创建服务文件
sudo nano /etc/systemd/system/address-generator.service

# 服务文件内容：
[Unit]
Description=Address Generator App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/address-generator
Environment=NODE_ENV=production
Environment=DATABASE_URL=mysql://prod_user:your_secure_password@localhost:3306/address_collector_prod
Environment=LOG_LEVEL=error
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

## 数据库配置

### MySQL 安装和配置

```bash
# 1. 安装MySQL
sudo apt update
sudo apt install mysql-server

# 2. 安全配置
sudo mysql_secure_installation

# 3. 创建生产数据库和用户
sudo mysql -u root -p

# 在MySQL中执行：
CREATE DATABASE address_collector_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'prod_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON address_collector_prod.* TO 'prod_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 数据库迁移

```bash
# 1. 安装项目依赖
npm ci --only=production

# 2. 生成Prisma客户端
npm run db:generate

# 3. 运行数据库迁移
npm run db:migrate

# 4. （可选）导入种子数据
npm run db:seed
```

## 部署步骤

### 静态文件部署

```bash
# 1. 构建静态文件
npm run build

# 2. 复制到nginx目录
sudo cp -r out/* /var/www/html/

# 3. 设置文件权限
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### Nginx 配置

```bash
# 1. 复制nginx配置
sudo cp nginx.conf /etc/nginx/sites-available/address-generator

# 2. 启用站点
sudo ln -s /etc/nginx/sites-available/address-generator /etc/nginx/sites-enabled/

# 3. 测试配置
sudo nginx -t

# 4. 重启nginx
sudo systemctl restart nginx
```

## 安全建议

1. **数据库安全**：
   - 使用强密码
   - 限制数据库用户权限
   - 定期备份数据库

2. **文件权限**：
   - 确保 `.env` 文件权限为 600
   - 应用文件所有者为 www-data

3. **防火墙配置**：
   ```bash
   sudo ufw allow 22    # SSH
   sudo ufw allow 80    # HTTP
   sudo ufw allow 443   # HTTPS
   sudo ufw enable
   ```

4. **SSL证书**（推荐）：
   ```bash
   # 使用Let's Encrypt
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## 监控和日志

```bash
# 查看nginx日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 查看系统日志
sudo journalctl -u nginx -f

# 监控系统资源
htop
df -h
```

## 故障排除

1. **数据库连接失败**：
   - 检查数据库服务状态：`sudo systemctl status mysql`
   - 验证连接字符串格式
   - 确认用户权限

2. **静态文件404错误**：
   - 检查nginx配置
   - 验证文件路径和权限
   - 查看nginx错误日志

3. **环境变量未生效**：
   - 重新加载环境变量：`source ~/.bashrc`
   - 检查变量是否正确设置：`echo $DATABASE_URL`
   - 重启相关服务