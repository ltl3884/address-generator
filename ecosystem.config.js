module.exports = {
  apps: [
    {
      name: 'address-generator',
      script: 'npm',
      args: 'start',
      cwd: '/opt/backend/address-generator', // 请替换为你的应用实际路径
      instances: 1, // 可以设置为 'max' 使用所有CPU核心
      exec_mode: 'fork', // 或者 'cluster' 用于集群模式
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      merge_logs: true,
      // 自动重启配置
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      // 优雅关闭
      kill_timeout: 5000,
      listen_timeout: 8000,
      // 健康检查
      health_check_grace_period: 3000
    }
  ]
};