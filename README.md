# 多国家地址生成器

一个基于 Next.js 15 的多国家地址生成器应用，支持生成美国、台湾、加拿大、香港、新加坡、英国等地区的地址信息。

## 功能特性

- 🌍 **多国家支持**: 美国、台湾、加拿大、香港、新加坡、英国
- 🎨 **现代设计**: 玻璃拟态效果和深色模式切换
- 📱 **响应式设计**: 支持桌面和移动设备
- 🚀 **快速构建**: 使用 Turbopack 加速开发
- 🗄️ **数据库支持**: MySQL + Prisma ORM
- 🎯 **智能缓存**: 避免重复API请求

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: TailwindCSS v4
- **数据库**: MySQL, Prisma ORM v6.16.2
- **验证**: Zod v4.1.11
- **运行时**: tsx v4.20.5

## 快速开始

### 环境要求

- Node.js 18+
- MySQL 数据库
- npm/yarn

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd address-generator
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，设置 DATABASE_URL
```

4. 设置数据库
```bash
npm run db:setup
```

5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 开发命令

```bash
# 开发服务器 (使用 Turbopack)
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
npm run db:setup       # 完整数据库设置
```

## 项目结构

```
src/
├── app/
│   ├── api/address/info/route.ts    # 地址信息 API
│   ├── [country]/page.tsx           # 国家页面
│   ├── layout.tsx                   # 根布局
│   └── globals.css                  # 全局样式
├── components/
│   └── AddressGenerator.tsx          # 主要组件
└── lib/services/
    └── addressService.ts            # 数据服务

prisma/
├── schema.prisma                    # 数据库模式
└── migrations/                      # 数据库迁移
```

## API 端点

### 获取地址信息

- **方法**: POST
- **路径**: `/api/address/info`
- **请求体**: `{ country: string }`
- **响应**: 随机地址数据

## 支持的国家/地区

- 🇺🇸 美国 (us)
- 🇹🇼 台湾 (tw)
- 🇨🇦 加拿大 (ca)
- 🇭🇰 香港 (hk)
- 🇸🇬 新加坡 (sg)
- 🇬🇧 英国 (uk)

## 部署

项目支持静态导出和 Docker 部署：

```bash
# 构建静态文件
npm run build

# Docker 构建和运行
docker build -t address-generator .
docker run -p 3000:80 address-generator
```

## 许可证

MIT License