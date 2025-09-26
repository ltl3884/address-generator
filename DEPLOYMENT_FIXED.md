# 修复后的部署指南

## 问题分析

原来的部署配置存在以下问题：
1. `next.config.ts` 中设置了 `output: 'export'`，这会导致静态导出，不支持 API 路由
2. `Dockerfile` 配置为使用 nginx 服务静态文件，而不是运行 Next.js 服务器
3. 端口配置不匹配

## 修复内容

### 1. Next.js 配置修复
- 将 `output: 'export'` 改为 `output: 'standalone'`
- 这样可以支持 API 路由，同时优化 Docker 部署

### 2. Dockerfile 修复
- 改为运行 Next.js 服务器而不是 nginx
- 添加 Prisma 客户端生成
- 使用 standalone 模式的文件结构
- 暴露端口 3000

### 3. Docker Compose 修复
- 端口映射从 `80:80` 改为 `3000:3000`

## 部署步骤

### 1. 重新构建 Docker 镜像
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 2. 更新 Nginx 配置
在你的 Ubuntu 服务器上，更新 nginx 配置文件：

```nginx
server {
    listen 80;
    server_name 43.130.251.15;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 增加超时时间
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### 3. 重启 Nginx
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 验证部署

### 1. 检查容器状态
```bash
docker-compose ps
```

### 2. 检查应用日志
```bash
docker-compose logs app
```

### 3. 测试 API 端点
```bash
curl -X POST http://43.130.251.15/api/address/info \
  -H "Content-Type: application/json" \
  -d '{"country": "us"}'
```

### 4. 测试前端页面
访问: http://43.130.251.15/us

## 注意事项

1. 确保 `.env.production` 文件包含正确的数据库连接信息
2. 确保 MySQL 服务正常运行
3. 如果仍有问题，检查防火墙设置，确保端口 3000 可访问
4. 检查 Docker 容器是否正常启动并监听端口 3000

## 常见问题排查

### API 返回 404
- 检查 Next.js 应用是否正常启动
- 确认 API 路由文件存在于正确位置
- 检查应用日志是否有错误

### 数据库连接问题
- 检查 MySQL 容器是否运行
- 验证数据库连接字符串
- 确认 Prisma 客户端已正确生成

### 前端页面无法访问
- 检查 nginx 配置是否正确
- 确认端口映射是否正确
- 检查防火墙设置