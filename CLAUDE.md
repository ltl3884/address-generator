# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 15 的地址生成器应用，使用 TypeScript 和 Prisma 构建。应用用于生成和展示地址信息，支持深色模式和响应式设计，使用 MySQL 数据库存储地址数据。

## 开发命令

```bash
# 开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

# 数据库相关命令
npm run db:generate    # 生成 Prisma 客户端
npm run db:migrate     # 运行数据库迁移
npm run db:seed        # 填充种子数据
npm run db:studio      # 打开 Prisma Studio
npm run db:setup       # 完整数据库设置（迁移+种子）
```

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript, TailwindCSS
- **数据库**: MySQL, Prisma ORM
- **验证**: Zod 数据验证
- **运行时**: tsx 用于 TypeScript 执行

## 项目架构

### 文件结构
```
src/
├── app/
│   ├── page.tsx              # 主页组件（客户端组件）
│   ├── layout.tsx            # 根布局
│   ├── globals.css           # 全局样式
│   └── api/
│       └── address/
│           └── info/
│               └── route.ts  # 地址信息 API 端点
├── lib/
│   └── services/
│       └── addressService.ts # 地址数据服务层
└── prisma/
    ├── schema.prisma         # 数据库模式定义
    ├── migrations/           # 数据库迁移文件
    └── seed.ts              # 种子数据脚本
```

### 数据架构

#### AddressInfo 模型
```sql
AddressInfo {
  id: Int (主键)
  fullName: String(64)      # 姓名
  gender: String(16)        # 性别
  birthday: String(64)      # 生日
  address: Text             # 地址
  telephone: String?(20)    # 电话号码
  city: String?(100)       # 城市
  zipCode: String?(20)     # 邮编
  state: String?(50)       # 州缩写
  stateFull: String?(100)  # 州全称
  country: String(100)     # 国家
  latitude: String?(20)    # 纬度
  longitude: String?(20)   # 经度
  sourceUrl: String?       # 数据来源 URL
  createdAt: DateTime      # 创建时间
  updatedAt: DateTime      # 更新时间
}
```

### API 设计

#### 地址信息 API
- **端点**: `POST /api/address/info`
- **请求格式**: `{ country: string }`
- **响应格式**:
  ```typescript
  {
    code: number;
    message: string;
    data?: AddressData;
  }
  ```

#### 服务层架构
- **AddressService**: 处理数据库操作，提供随机地址获取功能
- **数据验证**: 使用 Zod 进行请求参数验证
- **错误处理**: 统一的错误响应格式

### 组件设计

#### 主页特性
- **客户端组件**: 使用 `'use client'` 指令
- **响应式设计**: 支持桌面和移动设备
- **深色模式**: 基于类名的主题切换，支持本地存储
- **玻璃拟态效果**: 半透明背景和模糊效果
- **主题色彩**: 主色调为青绿色 (#14b8a6)

## 开发注意事项

### 环境配置
- 不要运行seed.ts, 我的数据库中已经有数据了
- 需要配置 `DATABASE_URL` 环境变量（MySQL 连接字符串）
- 开发环境会显示 Prisma 查询日志
- 生产环境只记录错误日志

### 数据库操作
- 使用原生 SQL 查询实现随机选择（MySQL `RAND()` 函数）
- 迁移文件在 `prisma/migrations/` 目录中管理
- 种子数据包含 5 个示例美国地址

### 代码规范
- 使用 TypeScript 严格类型检查
- API 响应使用统一格式
- 错误处理包含详细的错误日志
- 组件使用函数式编程风格

### 样式系统
- 所有样式使用 TailwindCSS 类
- 深色模式支持系统偏好和用户选择
- 响应式网格布局
- 平滑过渡动画效果

## 部署配置

项目支持静态导出和 Docker 部署，适合部署到 Vercel 等平台。