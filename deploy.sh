#!/bin/bash

# 地址生成器应用部署脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始部署地址生成器应用..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 安全检查：不允许 root 用户直接执行
check_user_safety() {
    current_user=$(whoami)
    
    if [ "$EUID" -eq 0 ]; then
        echo "🚨 安全警告：不建议使用 root 用户执行此脚本！"
        echo ""
        echo "原因："
        echo "  • 安全风险：root 权限过大，误操作可能破坏系统"
        echo "  • 文件权限：root 创建的文件普通用户无法修改"
        echo "  • 最佳实践：应用应以普通用户权限运行"
        echo ""
        echo "建议操作："
        echo "  1. 使用 ubuntu 用户：su - ubuntu"
        echo "  2. 或创建专用用户：sudo adduser deploy"
        echo "  3. 确保用户有 sudo 权限"
        echo ""
        read -p "是否仍要继续？(输入 'I_UNDERSTAND_THE_RISKS' 继续): " -r
        if [ "$REPLY" != "I_UNDERSTAND_THE_RISKS" ]; then
            echo "部署已取消。请使用普通用户执行此脚本。"
            exit 1
        fi
        echo "⚠️  继续使用 root 用户执行..."
    else
        echo "✅ 当前用户: $current_user - 符合安全最佳实践"
        
        # 检查 sudo 权限
        if sudo -n true 2>/dev/null; then
            echo "✅ sudo 权限检查通过"
        else
            echo "⚠️  需要 sudo 权限来配置 Nginx 等系统服务"
            echo "请确保当前用户在 sudo 组中：sudo usermod -aG sudo $current_user"
        fi
    fi
}

# 配置变量
APP_NAME="address-generator"
APP_DIR="/opt/backend/address-generator"  # 请根据实际情况修改
APP_PORT=3000
NGINX_CONF="/etc/nginx/sites-available/address-generator"
NGINX_ENABLED="/etc/nginx/sites-enabled/address-generator"
NODE_VERSION="18"

# 推荐的项目路径（ubuntu 用户）
# 当前目录部署：使用当前目录
# 标准部署：/home/ubuntu/apps/address-generator
# 系统级部署：/opt/apps/address-generator

# 函数：打印状态信息
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# 统一的 y/n 交互函数，解决上一次回车残留导致读入空行的问题
ask_yes_no() {
    local prompt_msg="$1"
    local __resultvar="$2"
    local input=""

    # 清空输入缓冲，丢弃上一次操作残留的回车/字符
    while read -r -t 0.001 -n 10000 _rest; do :; done

    while true; do
        read -r -p "$prompt_msg " -n 1 input || true
        echo
        if [[ "$input" =~ ^[YyNn]$ ]]; then
            eval "$__resultvar='$input'"
            return 0
        fi
        echo "请输入 y 或 n" 1>&2
    done
}

# 检查 Node.js 版本
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js 未安装，请先安装 Node.js $NODE_VERSION"
        exit 1
    fi
    
    NODE_CURRENT=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_CURRENT" -lt "$NODE_VERSION" ]; then
        print_error "Node.js 版本过低，当前版本: $(node -v)，需要版本: $NODE_VERSION+"
        exit 1
    fi
    
    print_status "Node.js 版本检查通过: $(node -v)"
}

# 检查 PM2
check_pm2() {
    if ! command -v pm2 &> /dev/null; then
        print_warning "PM2 未安装，正在安装..."
        npm install -g pm2
    fi
    print_status "PM2 已安装: $(pm2 -v)"
}

# 安装依赖
install_dependencies() {
    print_status "安装项目依赖..."
    
    # 第一步：安装所有依赖（包括开发依赖）用于构建
    if [ -f "package-lock.json" ]; then
        print_status "安装所有依赖（包括构建工具）..."
        npm ci --production=false
    else
        print_warning "未找到 package-lock.json，使用 npm install..."
        npm install
    fi
    
    print_status "生成 Prisma 客户端..."
    npx prisma generate
}

# 构建完成后清理开发依赖（可选）
cleanup_dev_dependencies() {
    print_status "清理开发依赖以减少磁盘占用..."
    npm prune --production
    print_success "开发依赖已清理"
}

# 构建应用
build_app() {
    print_status "构建 Next.js 应用..."
    npm run build
}

# 数据库迁移
migrate_database() {
    # print_status "执行数据库迁移..."
    # npx prisma migrate deploy
    :
}

# 停止现有进程
stop_existing() {
    print_status "停止现有应用进程..."
    pm2 stop $APP_NAME 2>/dev/null || true
    pm2 delete $APP_NAME 2>/dev/null || true
}

# 启动应用
start_app() {
    print_status "启动应用..."
    
    # 更新 PM2 配置中的路径
    sed -i "s|/opt/backend/address-generator|$(pwd)|g" ecosystem.config.js
    
    # 创建日志目录
    mkdir -p logs
    
    # 启动应用
    pm2 start ecosystem.config.js --env production
    
    # 保存 PM2 配置
    pm2 save
    
    # 设置开机自启（可能需要 sudo，失败时不阻断后续流程）
    if pm2 startup; then
        print_status "PM2 开机自启脚本已配置"
    else
        print_warning "PM2 开机自启配置失败或需要 sudo。您可以稍后手动执行："
        print_warning "sudo env PATH=$PATH pm2 startup systemd -u $(whoami) --hp $HOME"
    fi
}

# 配置 Nginx
configure_nginx() {
    print_status "配置 Nginx..."
    
    if [ -f "$NGINX_CONF" ]; then
        print_warning "Nginx 配置已存在，备份旧配置..."
        sudo cp "$NGINX_CONF" "$NGINX_CONF.backup.$(date +%Y%m%d_%H%M%S)"
    fi
    
    # 复制 Nginx 配置
    sudo cp nginx-production.conf "$NGINX_CONF"
    
    # 启用站点
    sudo ln -sf "$NGINX_CONF" "$NGINX_ENABLED"
    
    # 测试 Nginx 配置
    if sudo nginx -t; then
        print_status "Nginx 配置测试通过"
        sudo systemctl reload nginx
        print_status "Nginx 已重新加载"
    else
        print_error "Nginx 配置测试失败"
        exit 1
    fi
}

# 检查应用状态
check_status() {
    print_status "检查应用状态..."
    
    # 等待应用启动
    sleep 5
    
    # 检查 PM2 状态
    pm2 status $APP_NAME
    
    # 检查应用是否响应
    if curl -f http://localhost:3000/api/address/info -X POST -H "Content-Type: application/json" -d '{"country": "us"}' > /dev/null 2>&1; then
        print_status "✅ 应用 API 测试通过"
    else
        print_error "❌ 应用 API 测试失败"
        pm2 logs $APP_NAME --lines 20
        exit 1
    fi
}

# 主部署流程
main() {
    print_status "开始部署流程..."
    
    # 首先进行安全检查
    check_user_safety
    
    check_node
    check_pm2
    install_dependencies
    build_app
    
    # 询问是否清理开发依赖（节省磁盘空间）
    ask_yes_no "是否清理开发依赖以节省磁盘空间? (y/n):" REPLY
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        cleanup_dev_dependencies
    fi
    
    migrate_database
    stop_existing
    start_app
    
    # 询问是否配置 Nginx
    ask_yes_no "是否需要配置 Nginx? (y/n):" REPLY
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        configure_nginx
    fi
    
    check_status
    
    print_status "🎉 部署完成！"
    echo
    echo "应用信息:"
    echo "- 应用名称: $APP_NAME"
    echo "- 本地地址: http://localhost:3000"
    echo "- 公网地址: http://43.130.251.15"
    echo "- PM2 状态: pm2 status"
    echo "- 查看日志: pm2 logs $APP_NAME"
    echo "- 重启应用: pm2 restart $APP_NAME"
}

# 执行主函数
main "$@"