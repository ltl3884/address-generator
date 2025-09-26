import { PrismaClient } from '@prisma/client';

// 开发环境启用查询日志
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// 使用 prisma 客户端进行数据库操作
void prisma.$connect();