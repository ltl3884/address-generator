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
    
    # 直接执行远程部署
    execute_remote_deploy || exit 1
    log_success "所有操作完成！"
}

# 脚本入口
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi