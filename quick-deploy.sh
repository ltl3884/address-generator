#!/bin/bash

# 快速部署脚本 - 用于日常代码更新
# 使用方法: ./quick-deploy.sh

set -e

echo "🚀 开始快速部署..."

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 加载Node.js环境变量
# 尝试加载常见的Node.js环境配置
load_node_env() {
    # 尝试加载 .bashrc
    if [ -f ~/.bashrc ]; then
        source ~/.bashrc 2>/dev/null || true
    fi
    
    # 尝试加载 .bash_profile
    if [ -f ~/.bash_profile ]; then
        source ~/.bash_profile 2>/dev/null || true
    fi
    
    # 尝试加载 .profile
    if [ -f ~/.profile ]; then
        source ~/.profile 2>/dev/null || true
    fi
    
    # 尝试加载 NVM
    if [ -f ~/.nvm/nvm.sh ]; then
        source ~/.nvm/nvm.sh 2>/dev/null || true
        nvm use node 2>/dev/null || true
    fi
    
    # 添加常见的Node.js路径到PATH
    export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"
    export PATH="$HOME/.nvm/versions/node/*/bin:$PATH"
    export PATH="/opt/node/bin:$PATH"
    export PATH="/usr/local/node/bin:$PATH"
}

# 检查命令是否存在
check_command() {
    local cmd=$1
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo -e "${RED}❌ 错误: 找不到命令 '$cmd'${NC}"
        echo -e "${YELLOW}💡 请确保已正确安装 Node.js 和 npm${NC}"
        echo -e "${YELLOW}   当前 PATH: $PATH${NC}"
        return 1
    else
        echo -e "${GREEN}✅ 找到命令: $cmd ($(command -v "$cmd"))${NC}"
        return 0
    fi
}

# 加载Node.js环境
echo -e "${YELLOW}🔧 加载Node.js环境...${NC}"
load_node_env

# 检查必要的命令
echo -e "${YELLOW}🔍 检查必要的命令...${NC}"
check_command "node" || exit 1
check_command "npm" || exit 1
check_command "git" || exit 1

echo -e "${GREEN}✅ 环境检查完成${NC}"
echo "Node.js 版本: $(node --version)"
echo "npm 版本: $(npm --version)"
echo ""

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