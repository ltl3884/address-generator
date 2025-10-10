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

# ESLint配置
# 本地执行ESLint检查，有warning或error都会终止部署

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



# 执行ESLint检查
run_eslint_check() {
    log_info "开始执行本地ESLint代码检查..."
    echo "=========================================="
    
    # 在本地执行ESLint检查，捕获输出
    local eslint_output
    eslint_output=$(npm run lint 2>&1)
    local eslint_exit_code=$?
    
    # 显示ESLint输出
    echo "$eslint_output"
    
    # 检查是否有错误（非零退出码）
    if [ $eslint_exit_code -ne 0 ]; then
        log_error "ESLint检查失败，发现错误，部署已中止"
        log_warning "请修复代码错误后重新部署"
        return 1
    fi
    
    # 检查是否有警告
    if echo "$eslint_output" | grep -q "warning"; then
        log_error "ESLint检查发现警告，部署已中止"
        log_warning "请修复所有警告后重新部署"
        return 1
    fi
    
    log_success "ESLint检查通过，无错误和警告"
    echo "=========================================="
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
    
    # 先执行ESLint检查
    run_eslint_check || exit 1
    
    # ESLint检查通过后执行远程部署
    execute_remote_deploy || exit 1
    log_success "所有操作完成！"
}

# 脚本入口
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi