#!/bin/bash

# 域名绑定部署脚本
# 使用方法: ./deploy-domain.sh

set -e

echo "🚀 开始域名绑定部署..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否为 root 用户
if [[ $EUID -eq 0 ]]; then
   echo -e "${RED}请不要使用 root 用户运行此脚本${NC}"
   exit 1
fi

# 检查必要的文件
echo "📋 检查配置文件..."
if [ ! -f "nginx-production.conf" ]; then
    echo -e "${RED}错误: nginx-production.conf 文件不存在${NC}"
    exit 1
fi

if [ ! -f "ecosystem.config.js" ]; then
    echo -e "${RED}错误: ecosystem.config.js 文件不存在${NC}"
    exit 1
fi

# 备份现有的 nginx 配置
echo "💾 备份现有配置..."
if [ -f "/etc/nginx/sites-enabled/address-generator" ]; then
    sudo cp /etc/nginx/sites-enabled/address-generator /etc/nginx/sites-enabled/address-generator.backup.$(date +%Y%m%d_%H%M%S)
    echo -e "${GREEN}已备份现有配置${NC}"
fi

# 复制新的 nginx 配置
echo "📝 更新 nginx 配置..."
sudo cp nginx-production.conf /etc/nginx/sites-available/address-generator

# 创建软链接
sudo ln -sf /etc/nginx/sites-available/address-generator /etc/nginx/sites-enabled/

# 删除默认配置 (如果存在)
if [ -f "/etc/nginx/sites-enabled/default" ]; then
    sudo rm -f /etc/nginx/sites-enabled/default
    echo -e "${YELLOW}已删除默认 nginx 配置${NC}"
fi

# 测试 nginx 配置
echo "🔍 测试 nginx 配置..."
if sudo nginx -t; then
    echo -e "${GREEN}nginx 配置测试通过${NC}"
else
    echo -e "${RED}nginx 配置测试失败，请检查配置文件${NC}"
    exit 1
fi

# 重启 nginx
echo "🔄 重启 nginx..."
sudo systemctl restart nginx
if sudo systemctl is-active --quiet nginx; then
    echo -e "${GREEN}nginx 重启成功${NC}"
else
    echo -e "${RED}nginx 重启失败${NC}"
    sudo systemctl status nginx
    exit 1
fi

# 检查 PM2 是否安装
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}PM2 未安装，请先安装 PM2${NC}"
    echo "安装命令: npm install -g pm2"
    exit 1
fi

# 重启 Next.js 应用
echo "🔄 重启 Next.js 应用..."
if pm2 list | grep -q "address-generator"; then
    pm2 restart ecosystem.config.js --env production
    echo -e "${GREEN}应用重启成功${NC}"
else
    echo "🚀 首次启动应用..."
    pm2 start ecosystem.config.js --env production
    pm2 save
    echo -e "${GREEN}应用启动成功${NC}"
fi

# 显示 PM2 状态
echo "📊 应用状态:"
pm2 status

# 检查服务状态
echo "🔍 检查服务状态..."
echo "Nginx 状态:"
sudo systemctl status nginx --no-pager -l

echo ""
echo "应用日志 (最近 10 行):"
pm2 logs --lines 10

# 提供下一步指导
echo ""
echo -e "${GREEN}✅ 域名绑定部署完成！${NC}"
echo ""
echo "📋 下一步操作:"
echo "1. 在 Cloudflare 中配置 DNS 记录:"
echo "   - A 记录: @ -> 43.130.251.15"
echo "   - CNAME 记录: www -> address-generator.xyz"
echo ""
echo "2. 配置 SSL 证书:"
echo "   - 选择 A: 使用 Cloudflare Origin 证书"
echo "   - 选择 B: 使用 Let's Encrypt (运行: sudo certbot --nginx -d address-generator.xyz -d www.address-generator.xyz)"
echo ""
echo "3. 测试访问:"
echo "   - http://address-generator.xyz (应该重定向到 HTTPS)"
echo "   - https://address-generator.xyz"
echo ""
echo "📖 详细配置指南请查看: DOMAIN_SETUP_GUIDE.md"
echo ""
echo "🔧 常用命令:"
echo "   - 查看 nginx 日志: sudo tail -f /var/log/nginx/error.log"
echo "   - 查看应用日志: pm2 logs"
echo "   - 重启应用: pm2 restart all"
echo "   - 重启 nginx: sudo systemctl restart nginx"