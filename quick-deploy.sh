#!/bin/bash

# 快速部署脚本 - 用于日常代码更新
# 使用方法: ./quick-deploy.sh

set -e

echo "🚀 开始快速部署..."

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. 拉取最新代码
echo -e "${YELLOW}📥 拉取最新代码...${NC}"
git pull origin main

# 2. 安装依赖（如果 package.json 有变化）
if git diff HEAD~1 HEAD --name-only | grep -q "package.json"; then
    echo -e "${YELLOW}📦 检测到依赖变化，安装新依赖...${NC}"
    npm install
fi

# 3. 数据库迁移（如果有 prisma 变化）
if git diff HEAD~1 HEAD --name-only | grep -q "prisma/"; then
    echo -e "${YELLOW}🗄️  检测到数据库变化，执行迁移...${NC}"
    npm run db:migrate
fi

# 4. 构建应用
echo -e "${YELLOW}🔨 构建应用...${NC}"
npm run build

# 5. 重启应用
echo -e "${YELLOW}🔄 重启应用...${NC}"
if pm2 list | grep -q "address-generator"; then
    pm2 restart address-generator
else
    pm2 start ecosystem.config.js
fi

# 6. 显示应用状态
echo -e "${GREEN}✅ 部署完成！${NC}"
pm2 status address-generator

echo -e "${GREEN}🌐 应用已重启，访问地址: http://localhost:3000${NC}"