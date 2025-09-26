# 安全部署指南

## 🚨 为什么不使用 root 用户部署

### 安全风险
1. **权限过大**：root 用户拥有系统最高权限，误操作可能破坏整个系统
2. **攻击面扩大**：如果应用被攻击，攻击者可能获得系统完全控制权
3. **违反最小权限原则**：应用只需要运行所需的最小权限

### 文件权限问题
1. **所有权混乱**：root 创建的文件普通用户无法修改
2. **维护困难**：后续更新需要频繁使用 sudo
3. **团队协作问题**：其他开发者无法正常操作项目文件

## 🛡️ 推荐的安全部署方案

### 1. 创建专用部署用户

```bash
# 创建部署用户
sudo adduser deploy

# 将用户添加到必要的组
sudo usermod -aG sudo deploy  # 允许使用 sudo
sudo usermod -aG www-data deploy  # Web 服务器组
```

### 2. 配置 sudo 权限

创建 sudo 配置文件：
```bash
sudo visudo -f /etc/sudoers.d/deploy
```

添加以下内容：
```
# 允许 deploy 用户无密码执行特定命令
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl reload nginx
deploy ALL=(ALL) NOPASSWD: /usr/bin/systemctl restart nginx
deploy ALL=(ALL) NOPASSWD: /usr/bin/nginx -t
deploy ALL=(ALL) NOPASSWD: /bin/cp * /etc/nginx/sites-available/
deploy ALL=(ALL) NOPASSWD: /bin/ln -sf /etc/nginx/sites-available/* /etc/nginx/sites-enabled/
```

### 3. 设置项目目录权限

```bash
# 创建项目目录
sudo mkdir -p /opt/apps/address-generator
sudo chown deploy:deploy /opt/apps/address-generator

# 切换到部署用户
su - deploy

# 克隆项目
cd /opt/apps
git clone <your-repo> address-generator
cd address-generator
```

### 4. 配置 PM2 用户级服务

```bash
# 以 deploy 用户身份配置 PM2
pm2 startup
# 按照提示执行 sudo 命令

# 设置 PM2 开机自启
pm2 save
```

## 🔧 安全的部署流程

### 1. 使用专用用户执行部署

```bash
# 切换到部署用户
su - deploy

# 进入项目目录
cd /opt/apps/address-generator

# 执行部署脚本
./deploy.sh
```

### 2. 环境变量安全

```bash
# 创建安全的环境变量文件
touch .env
chmod 600 .env  # 只有所有者可读写

# 设置环境变量
cat > .env << EOF
DATABASE_URL="mysql://user:password@localhost:3306/address_generator"
NODE_ENV=production
EOF
```

### 3. 文件权限设置

```bash
# 设置正确的文件权限
find . -type f -name "*.js" -exec chmod 644 {} \;
find . -type f -name "*.sh" -exec chmod 755 {} \;
chmod 600 .env
chmod 755 deploy.sh
```

## 🔍 安全检查清单

### 部署前检查
- [ ] 使用非 root 用户执行部署
- [ ] 配置了适当的 sudo 权限
- [ ] 环境变量文件权限正确 (600)
- [ ] 项目目录所有者正确
- [ ] PM2 以非 root 用户运行

### 部署后检查
- [ ] 应用进程以非 root 用户运行
- [ ] 文件权限设置正确
- [ ] Nginx 配置安全
- [ ] 防火墙规则配置
- [ ] SSL 证书配置（如需要）

## 🚨 如果必须使用 root

如果由于特殊原因必须使用 root 用户，请：

1. **明确风险**：完全理解安全风险
2. **最小化操作**：只在必要时使用 root
3. **立即降权**：部署完成后立即切换到普通用户
4. **修复权限**：修正文件所有权

```bash
# 修复文件所有权（如果使用了 root）
sudo chown -R deploy:deploy /opt/apps/address-generator
sudo chown -R deploy:deploy ~/.pm2
```

## 📋 故障排除

### 权限问题
```bash
# 检查文件所有者
ls -la

# 修复所有权
sudo chown -R deploy:deploy .

# 检查 PM2 进程
pm2 list
```

### Nginx 权限问题
```bash
# 检查 Nginx 配置权限
sudo nginx -t

# 检查站点配置
ls -la /etc/nginx/sites-available/
ls -la /etc/nginx/sites-enabled/
```

## 🔗 相关资源

- [Linux 用户管理最佳实践](https://wiki.archlinux.org/title/Users_and_groups)
- [PM2 安全配置](https://pm2.keymetrics.io/docs/usage/startup/)
- [Nginx 安全配置](https://nginx.org/en/docs/http/securing_nginx.html)