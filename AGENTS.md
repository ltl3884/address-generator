# AGENTS.md

This file provides context and guidelines for AI agents working on the **Address Generator** project.

## Project Overview
This is a **Next.js 15** application for generating multi-country address information.
- **Stack**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS v4, Prisma ORM, MySQL.
- **Key Features**: Glassmorphism UI, Dark Mode, Internationalization (US, UK, CA, TW, HK, SG), Turbopack.
- **Primary Goal**: Generate realistic address data for testing/development purposes.

## 1. Build, Lint, and Test Commands

### Development
- **Start Dev Server**: `npm run dev` (Runs on http://localhost:3000 using Turbopack)
- **Database Setup**: `npm run db:setup` (Runs migrations and seeds data)
- **Prisma Studio**: `npm run db:studio` (GUI for database management)

### Build & Production
- **Build**: `npm run build`
- **Start Production**: `npm run start`

### Code Quality & Testing
- **Lint**: `npm run lint` (ESLint with Next.js config)
- **Type Check**: `npx tsc --noEmit`
- **Testing**:
  - *Note*: There is currently no formal unit test suite (Jest/Vitest) configured in `package.json`.
  - **Manual API Test**: `node test-api.js` (Simple script to verify API endpoints)
  - Agents should prioritize adding tests if adding complex logic, using standard Jest/Vitest setups if requested.

## 2. Code Style & Guidelines

### General Principles
- **Language**: The codebase is in English, but the user prefers responses in **Chinese (中文)**.
- **Simplicity**: Avoid over-engineering. Keep code simple, readable, and reusable (KISS & DRY).
- **Modularity**: Use design patterns appropriate for Next.js/React. Keep components small and focused.
- **Minimal Changes**: When modifying existing code, minimize side effects and preserve existing patterns.

### TypeScript & Naming
- **Strict Mode**: `strict: true` is enabled in `tsconfig.json`. Ensure all types are explicitly defined.
- **Aliases**: Use `@/*` to import from `src/` (e.g., `import { db } from "@/lib/db"`).
- **Naming**:
  - **Variables/Functions**: `camelCase`
  - **Components/Classes**: `PascalCase`
  - **Files**: `camelCase` for utilities, `PascalCase` for components.
  - **Database Models**: PascalCase (e.g., `AddressInfo`).
- **Interfaces**: clear and descriptive interface names. Avoid `I` prefix.

### Tech Stack Specifics

#### Next.js (App Router)
- **Directory Structure**:
  - `src/app/`: Routes and pages.
  - `src/components/`: Reusable UI components.
  - `src/lib/`: Utility functions, database clients, services.
- **Client vs Server**:
  - Use `'use client'` for interactive components.
  - Default to Server Components for data fetching.

#### Styling (TailwindCSS v4)
- **Theme**: Primary color is Teal (`#14b8a6`).
- **Glassmorphism**: Use semi-transparent backgrounds (`bg-white/10`, `backdrop-blur-md`) and borders.
- **Dark Mode**: Class-based. Ensure styles support both light and dark themes.

#### Database (Prisma & MySQL)
- **Schema**: Defined in `prisma/schema.prisma`.
- **Migrations**: Always run `npm run db:migrate` after changing the schema.
- **Queries**: Use `prisma` client. Random selection uses `prisma.$queryRaw` with `RAND()`.

### Error Handling & Validation
- **Validation**: Use **Zod** (`zod`) for schema validation.
- **API Responses**: Standard format: `{ code: number, message: string, data?: T }`.

## 3. Architecture & Data

### Core Components
- **AddressGenerator**: The main component shared across all country pages. Handles state, caching, and display.
- **Routing**: Country detected via URL path (`/us`, `/tw`, etc.).
- **Caching**: `localStorage` caches address data to prevent redundant API calls (Critical for performance).

### Data Model (AddressInfo)
Maps to `address_info` table. Key fields:
- `fullName`, `gender`, `birthday`, `telephone`, `email`
- `address`, `city`, `state`, `zipCode`, `country`
- `latitude`, `longitude`
- Indexes: `country`

### API Design
- **Endpoint**: `POST /api/address/info`
- **Request**: `{ country: string, place?: string }`
- **Response**: `ApiResponse<AddressData>`
- **Service**: `AddressService` handles logic.

## 4. Critical Development Notes

- **Double Request Issue**: Solved via `localStorage` caching. Ensure `useEffect` dependencies are correct to avoid regression.
- **City Data**: Sourced from `cityData.ts`. Supports fuzzy search.
- **Environment**: Ensure `DATABASE_URL` is set in `.env`.
- **Deployment**: Uses Docker (Node 18 Alpine) and Nginx. Scripts: `deploy.sh`, `quick-deploy.sh`.

## 5. Standard Workflow (User Preferences)

- **Response Language**: Always respond in **Chinese (中文)**.
- **Design Philosophy**:
  - **Simplicity**: Do not over-engineer. Keep code simple, understandable, and practical.
  - **Complexity**: Watch for cyclomatic complexity. Refactor complex functions.
  - **Reuse**: Maximize code reuse. Use design patterns where appropriate.
  - **Modification**: Minimize changes to existing code. Do not modify unrelated modules.

## 6. Detailed Schema & API Reference

### AddressInfo Prisma Model
```prisma
model AddressInfo {
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
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @default(now()) @updatedAt @map("updated_at")

  @@index([country])
  @@map("address_info")
}
```

### API Response Interface
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

---
*Generated by Antigravity Agent based on project analysis.*
