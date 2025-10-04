# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Next.js 15 的多国家地址生成器应用，使用 TypeScript、Prisma 和 MySQL 构建。应用支持生成美国、台湾、加拿大、香港、新加坡、英国等地区的地址信息，具有深色模式切换、响应式设计和玻璃拟态视觉效果。

## 开发命令

```bash
# 开发服务器 (使用 Turbopack 加速)
npm run dev

# 构建项目 (使用 Turbopack 加速)
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

- **前端框架**: Next.js 15, React 19, TypeScript
- **样式**: TailwindCSS v4, 玻璃拟态设计
- **数据库**: MySQL, Prisma ORM v6.16.2
- **验证**: Zod v4.1.11 数据验证
- **运行时**: tsx v4.20.5 用于 TypeScript 执行
- **字体**: Google Fonts (Roboto, Material Icons)

## 项目架构

### 文件结构
```
src/
├── app/
│   ├── api/
│   │   └── address/
│   │       └── info/
│   │           └── route.ts        # 地址信息 API 端点
│   ├── ca/page.tsx                 # 加拿大地址页面
│   ├── globals.css                 # 全局样式
│   ├── hk/page.tsx                 # 香港地址页面
│   ├── layout.tsx                  # 根布局
│   ├── page.tsx                    # 主页组件
│   ├── sg/page.tsx                 # 新加坡地址页面
│   ├── tw/page.tsx                 # 台湾地址页面
│   ├── uk/page.tsx                 # 英国地址页面
│   └── us/page.tsx                 # 美国地址页面
├── components/
│   └── AddressGenerator.tsx        # 主要地址生成器组件
└── lib/
    └── services/
        └── addressService.ts       # 地址数据服务层

prisma/
├── schema.prisma                   # 数据库模式定义
├── migrations/                     # 数据库迁移文件
└── seed.ts                        # 种子数据脚本
```

### 数据架构

#### AddressInfo 模型 (Prisma Schema)
```sql
AddressInfo {
  id         Int      @id @default(autoincrement())
  fullName   String   @map("full_name") @db.VarChar(64)
  gender     String   @db.VarChar(16)
  birthday   String   @map("birthday") @db.VarChar(64)
  address    String   @db.Text
  telephone  String?  @map("telephone") @db.VarChar(20)
  city       String?  @db.VarChar(100)
  zipCode    String?  @map("zip_code") @db.VarChar(20)
  state      String?  @db.VarChar(50)
  stateFull  String?  @map("state_full") @db.VarChar(100)
  sourceUrl  String?  @map("source_url") @db.Text
  country    String   @db.VarChar(100)
  latitude   String?  @db.VarChar(20)
  longitude  String?  @db.VarChar(20)
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @default(now()) @updatedAt @map("updated_at")

  @@index([country])
  @@map("address_info")
}
```

#### 城市数据支持
- **城市数据库**: 包含数千个城市名称，支持搜索自动补全
- **数据来源**: 由 city.csv 自动生成的 cityData.ts 文件
- **搜索功能**: 支持模糊匹配、精确匹配和限制搜索结果数量
- **地理覆盖**: 包含美国、加拿大、英国、台湾、香港、新加坡等地区的城市

### API 设计

#### 地址信息 API
- **端点**: `POST /api/address/info`
- **请求格式**: `{ country: string, place?: string }`
- **响应格式**:
  ```typescript
  interface ApiResponse<T> {
    code: number;
    message: string;
    data?: T;
  }

  interface AddressData {
    fullName: string;
    gender: string;
    birthday: string;
    address: string;
    telephone: string;
    city: string;
    zipCode: string;
    state: string;
    stateFull: string;
    country: string;
  }
  ```
- **数据验证**: 使用 Zod Schema 验证请求参数
- **错误处理**: 统一的错误响应格式，包含详细错误日志

#### 服务层架构
- **AddressService**: 处理数据库操作，提供随机地址获取功能
- **文本格式化**: 包含 `to_camel()` 方法用于字符串标题格式化
- **数据库查询**: 使用原生 SQL 查询实现随机选择 (MySQL `RAND()` 函数)
- **Prisma 配置**: 开发环境启用详细日志，生产环境只记录错误

### 组件设计

#### AddressGenerator 组件特性
- **客户端组件**: 使用 `'use client'` 指令
- **路由感知**: 根据当前路径自动识别国家代码 (us, tw, ca, hk, sg, uk)
- **数据缓存**: 使用 localStorage 缓存已请求的地址数据
- **响应式设计**: 支持桌面和移动设备的 Grid 布局
- **深色模式**: 基于类名的主题切换，支持系统偏好和用户选择
- **玻璃拟态效果**: 半透明背景和模糊效果
- **主题色彩**: 主色调为青绿色 (#14b8a6)

#### 页面结构
- **统一组件**: 所有国家页面都使用相同的 `AddressGenerator` 组件
- **导航栏**: 包含所有支持国家的导航链接
- **侧边栏**: 显示热门州/城市地址列表
- **功能按钮**: 生成、保存、搜索、复制地址
- **搜索功能**: 集成城市搜索自动补全，支持 Portal 渲染
- **地址保存**: 本地存储保存的地址，支持删除和管理
- **复制功能**: 支持现代 Clipboard API 和降级方案

#### AutocompletePortal 组件
- **Portal 渲染**: 使用 React Portal 实现自动补全下拉框
- **位置计算**: 动态计算下拉框位置，确保正确的显示效果
- **客户端渲染**: 确保只在客户端环境下渲染，避免 SSR 问题
- **事件处理**: 支持点击外部关闭和键盘导航

## 配置文件

### Next.js 配置 (next.config.ts)
- **输出模式**: 移除了静态导出配置，支持 API 路由和直接部署
- **图片优化**: 未优化模式 (`unoptimized: true`)
- **构建工具**: 使用 Turbopack 加速
- **生产环境**: 移除控制台日志
- **路径配置**: 支持尾随斜杠和无尾随斜杠的URL

### TailwindCSS 配置 (tailwind.config.ts)
- **主题色彩**: 青绿色系 (#14b8a6) 为主色调
- **深色模式**: 基于类名的切换 (class-based)
- **玻璃拟态**: 自定义玻璃效果样式
- **字体**: Roboto 字体族
- **自定义工具类**: 玻璃拟态、背景渐变、动画效果

### TypeScript 配置 (tsconfig.json)
- **严格模式**: 启用所有严格类型检查
- **路径映射**: 支持 `@/*` 别名指向 `src/*`
- **目标版本**: ES2017
- **模块系统**: ESNext

## 开发注意事项

### 环境配置
- **数据库配置**: 需要配置 `DATABASE_URL` 环境变量 (MySQL 连接字符串)
- **种子数据**: 不要运行 seed.ts，数据库中已有数据
- **日志级别**: 开发环境显示所有日志，生产环境只记录错误

### 重要提醒
- **双重请求问题**: 已通过localStorage缓存机制解决，确保只在首次访问或新国家时请求API
- **组件状态管理**: 使用空的useEffect依赖数组避免路由变化时的重复请求
- **开发服务器**: 使用 `npm run dev` 启动，默认端口3000，使用Turbopack加速

### 数据库操作
- **随机查询**: 使用 MySQL `RAND()` 函数实现随机地址选择
- **迁移管理**: 迁移文件在 `prisma/migrations/` 目录中管理
- **索引优化**: 为 country 字段创建索引以提高查询性能

### 前端开发
- **组件复用**: 所有页面共享同一个组件，通过路由识别国家
- **数据缓存**: 使用 localStorage 缓存每个国家的地址数据，避免重复API请求
- **主题持久化**: 用户选择的主题模式保存在 localStorage
- **复制功能**: 支持一键复制完整地址，包含降级方案和成功反馈
- **双重请求优化**: 已解决页面导航时的重复API请求问题

#### 关键功能实现
- **路由国家检测**: `getCurrentCountry()` 函数从 `window.location.pathname` 提取国家代码
- **智能缓存**: `getCachedData()` 和 `setCachedData()` 管理localStorage缓存
- **复制地址**: `handleCopyAddress()` 函数支持现代API和降级方案

### 样式系统
- **玻璃拟态**: 半透明背景、模糊效果、特殊边框和阴影
- **响应式**: 使用 Grid 和 Flexbox 实现响应式布局
- **动画**: 包含浮动的背景动画效果
- **无障碍**: 支持 ARIA 标签和键盘导航

### 性能优化
- **静态导出**: 支持部署到静态托管平台
- **Turbopack**: 使用 Turbopack 加速开发和构建
- **图片优化**: 禁用 Next.js 图片优化以支持静态导出
- **包优化**: 优化包导入以提高构建性能

## 部署配置

### 静态部署
- **构建输出**: 静态 HTML 文件，支持 CDN 部署
- **路径配置**: 支持部署到子目录
- **平台兼容**: 适合 Vercel、Netlify 等平台

### Docker 支持
- **多阶段构建**: 使用 Node.js 18 Alpine 构建阶段 + Node.js 18 Alpine 生产阶段
- **数据库集成**: 通过 docker-compose 集成 MySQL 数据库服务
- **生产优化**: Alpine 镜像确保最小化容器大小，非root用户运行
- **环境变量**: 支持容器化部署的环境配置
- **部署脚本**: 包含 deploy.sh、quick-deploy.sh 和 deploy-domain.sh 脚本

### 支持的国家/地区
- 美国 (us) - 包含州级别路由: `/us/[state]`
- 台湾 (tw)
- 加拿大 (ca)
- 香港 (hk)
- 新加坡 (sg)
- 英国 (uk)

每个国家都有独立的页面路由，共享相同的组件功能。美国页面还支持按州筛选的子路由。

### 其他页面
- **my_address**: `/my_address` - 用户保存的地址管理页面
- **主页**: 默认重定向到美国页面

### 部署和运维
- **部署脚本**:
  - `deploy.sh` - 标准部署脚本
  - `quick-deploy.sh` - 快速部署脚本
  - `deploy-domain.sh` - 域名部署脚本
- **SSL 证书**: 包含 address-generator.xyz 的 SSL 证书文件
- **Nginx 配置**: 生产环境的 Nginx 配置文件
- **进程管理**: ecosystem.config.js 用于 PM2 进程管理