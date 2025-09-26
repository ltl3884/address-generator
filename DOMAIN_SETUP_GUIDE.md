# 域名绑定配置指南

## 概述
本指南将帮助你将域名 `address-generator.xyz` 绑定到你的 Next.js 应用服务器。

## 1. Cloudflare DNS 配置

### 步骤 1: 登录 Cloudflare
1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 登录你的账户
3. 选择你的域名 `address-generator.xyz`

### 步骤 2: 配置 DNS 记录
在 DNS 管理页面添加以下记录：

#### A 记录配置
```
类型: A
名称: @
内容: 43.130.251.15
代理状态: 已代理 (橙色云朵)
TTL: 自动
```

#### CNAME 记录配置 (可选，用于 www 子域名)
```
类型: CNAME
名称: www
内容: address-generator.xyz
代理状态: 已代理 (橙色云朵)
TTL: 自动
```

### 步骤 3: SSL/TLS 配置
1. 在 Cloudflare 控制台中，转到 "SSL/TLS" 选项卡
2. 选择 "完全" 或 "完全(严格)" 模式
3. 启用 "始终使用 HTTPS"

## 2. 服务器端配置

### 步骤 1: 获取 SSL 证书
你有两个选择：

#### 选择 A: 使用 Cloudflare Origin 证书 (推荐)
1. 在 Cloudflare 控制台中，转到 "SSL/TLS" > "Origin Server"
2. 点击 "Create Certificate"
3. 选择 "Let Cloudflare generate a private key and a CSR"
4. 主机名设置为: `address-generator.xyz, *.address-generator.xyz`
5. 下载证书和私钥

#### 选择 B: 使用 Let's Encrypt (免费)
```bash
# 安装 certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d address-generator.xyz -d www.address-generator.xyz
```

### 步骤 2: 配置证书路径
如果使用 Cloudflare Origin 证书，将证书文件放置在以下位置：
```bash
# 创建证书目录
sudo mkdir -p /etc/ssl/certs
sudo mkdir -p /etc/ssl/private

# 复制证书文件 (替换为你的实际文件)
sudo cp your-certificate.crt /etc/ssl/certs/address-generator.xyz.crt
sudo cp your-private-key.key /etc/ssl/private/address-generator.xyz.key

# 设置权限
sudo chmod 644 /etc/ssl/certs/address-generator.xyz.crt
sudo chmod 600 /etc/ssl/private/address-generator.xyz.key
```

### 步骤 3: 更新 Nginx 配置
nginx 配置文件已经更新，包含了：
- HTTP 到 HTTPS 的重定向
- SSL 证书配置
- 安全头设置
- 代理到 Next.js 应用的配置

### 步骤 4: 部署和重启服务
```bash
# 复制 nginx 配置
sudo cp nginx-production.conf /etc/nginx/sites-available/address-generator
sudo ln -sf /etc/nginx/sites-available/address-generator /etc/nginx/sites-enabled/

# 测试 nginx 配置
sudo nginx -t

# 重启 nginx
sudo systemctl restart nginx

# 重启 Next.js 应用 (使用 PM2)
pm2 restart ecosystem.config.js --env production
```

## 3. 验证配置

### 检查 DNS 解析
```bash
# 检查 A 记录
dig address-generator.xyz

# 检查 CNAME 记录
dig www.address-generator.xyz
```

### 检查 SSL 证书
```bash
# 检查证书有效性
openssl s_client -connect address-generator.xyz:443 -servername address-generator.xyz
```

### 测试网站访问
1. 访问 `http://address-generator.xyz` (应该重定向到 HTTPS)
2. 访问 `https://address-generator.xyz` (应该正常显示网站)
3. 访问 `https://www.address-generator.xyz` (应该正常显示网站)

## 4. 故障排除

### 常见问题

#### DNS 解析问题
- 等待 DNS 传播 (通常需要几分钟到几小时)
- 检查 Cloudflare DNS 记录是否正确
- 使用在线 DNS 检查工具验证

#### SSL 证书问题
- 确保证书文件路径正确
- 检查证书文件权限
- 验证证书是否包含正确的域名

#### Nginx 配置问题
```bash
# 检查 nginx 配置语法
sudo nginx -t

# 查看 nginx 错误日志
sudo tail -f /var/log/nginx/error.log

# 查看应用访问日志
sudo tail -f /var/log/nginx/address-generator-ssl.access.log
```

#### Next.js 应用问题
```bash
# 检查 PM2 进程状态
pm2 status

# 查看应用日志
pm2 logs

# 重启应用
pm2 restart all
```

## 5. 安全建议

1. **定期更新证书**: 如果使用 Let's Encrypt，设置自动续期
2. **监控日志**: 定期检查访问和错误日志
3. **备份配置**: 定期备份 nginx 配置和证书文件
4. **防火墙配置**: 确保只开放必要的端口 (80, 443, 22)

## 6. 性能优化

1. **启用 Cloudflare 缓存**: 在 Cloudflare 控制台中配置缓存规则
2. **启用 Brotli 压缩**: 在 Cloudflare 中启用 Brotli 压缩
3. **配置 CDN**: 利用 Cloudflare 的全球 CDN 网络

完成以上步骤后，你的域名 `address-generator.xyz` 就应该成功绑定到你的 Next.js 应用了！