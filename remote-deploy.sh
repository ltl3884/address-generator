#!/bin/bash

# 远程部署脚本
# 用于连接到远程主机并执行快速部署

set -e  # 遇到错误时退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
REMOTE_HOST="liu-tencent"
REMOTE_DIR="/opt/backend/address-generator"
DEPLOY_SCRIPT="quick-deploy.sh"

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查SSH连接
check_ssh_connection() {
    log_info "检查SSH连接到 $REMOTE_HOST..."
    if ssh -o ConnectTimeout=10 -o BatchMode=yes "$REMOTE_HOST" exit 2>/dev/null; then
        log_success "SSH连接正常"
        return 0
    else
        log_error "无法连接到 $REMOTE_HOST"
        log_error "请检查："
        echo "  1. SSH配置是否正确"
        echo "  2. 网络连接是否正常"
        echo "  3. 远程主机是否可访问"
        return 1
    fi
}

# 检查远程目录
check_remote_directory() {
    log_info "检查远程目录 $REMOTE_DIR..."
    if ssh "$REMOTE_HOST" "[ -d '$REMOTE_DIR' ]"; then
        log_success "远程目录存在"
        return 0
    else
        log_error "远程目录 $REMOTE_DIR 不存在"
        return 1
    fi
}

# 检查部署脚本
check_deploy_script() {
    log_info "检查部署脚本 $DEPLOY_SCRIPT..."
    if ssh "$REMOTE_HOST" "[ -f '$REMOTE_DIR/$DEPLOY_SCRIPT' ]"; then
        log_success "部署脚本存在"
        return 0
    else
        log_error "部署脚本 $REMOTE_DIR/$DEPLOY_SCRIPT 不存在"
        return 1
    fi
}

# 执行远程部署
execute_remote_deploy() {
    log_info "开始执行远程部署..."
    echo "=========================================="
    
    # 执行远程命令
    ssh "$REMOTE_HOST" "cd '$REMOTE_DIR' && bash '$DEPLOY_SCRIPT'" || {
        log_error "部署脚本执行失败"
        return 1
    }
    
    echo "=========================================="
    log_success "远程部署完成"
}

# 主函数
main() {
    echo "=========================================="
    log_info "开始远程部署流程"
    echo "远程主机: $REMOTE_HOST"
    echo "目标目录: $REMOTE_DIR"
    echo "部署脚本: $DEPLOY_SCRIPT"
    echo "=========================================="
    
    # 执行检查
    check_ssh_connection || exit 1
    check_remote_directory || exit 1
    check_deploy_script || exit 1
    
    # 确认部署
    echo ""
    read -p "确认要执行远程部署吗？(y/N): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        execute_remote_deploy || exit 1
        log_success "所有操作完成！"
    else
        log_warning "部署已取消"
        exit 0
    fi
}

# 脚本入口
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi