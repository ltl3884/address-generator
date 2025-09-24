import { PrismaClient } from '@prisma/client';

// 开发环境启用查询日志
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});