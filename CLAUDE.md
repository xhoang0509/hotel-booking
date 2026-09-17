# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`datn` is an enterprise-grade hotel booking and reservation platform (DATPHONG.COM) structured as a unified monorepo powered by **Turborepo** and **pnpm workspaces**:

- **`apps/api`**: Express.js REST API with MySQL/Sequelize ORM, JWT authentication, email notifications, and VNPay payment gateway integration. Default port: `6969`.
- **`apps/client`**: Customer-facing web portal built with Next.js (v13 pages router), custom Express server, Redux Toolkit + Redux-Saga, Ant Design, and Tailwind CSS. Default port: `4000`.
- **`apps/cms`**: Admin/CMS management portal built with Next.js (v13 pages router), custom Express server, Redux Toolkit + Redux-Saga, Ant Design, and ApexCharts. Default port: `5000`.

## Monorepo & Root Commands

Root commands are orchestrated via Turborepo (`pnpm`):

- **Run all apps in dev mode**: `pnpm dev`
- **Run specific app in dev mode**:
  - API only: `pnpm dev:api` (or `pnpm --filter api dev`)
  - Client only: `pnpm dev:client` (or `pnpm --filter client dev`)
  - CMS only: `pnpm dev:cms` (or `pnpm --filter cms dev`)
- **Build all apps**: `pnpm build`
- **Lint all apps**: `pnpm lint`
- **Format code**: `pnpm format`
- **Run all via Docker Compose**: `docker compose up -d`
- **Stop Docker Compose**: `docker compose down`

---

## App Details & Subdirectory Commands

### `apps/api`

Backend REST API service.

- **Path**: `apps/api/`
- **Port**: `6969`
- **Dev command**: `pnpm --filter api dev` (or inside directory: `npm start` / `nodemon src/index.js`)
- **Lint**: `pnpm --filter api lint` (`eslint src/.`)
- **Format**: `pnpm --filter api format` (`prettier --write .`)

#### Database Migrations & Seeds (Sequelize CLI)

Run inside `apps/api/src/` (or prefix with `pnpm --filter api exec`):

- **Fresh database setup**:
  ```bash
  npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
  ```
- **Migrate & Seed**: `npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
- **Create migration**: `npx sequelize-cli migration:generate --name <migration-name>`
- **Undo last migration**: `npx sequelize-cli db:migrate:undo`

---

### `apps/client`

Public hotel booking client application.

- **Path**: `apps/client/`
- **Port**: `4000`
- **Dev command**: `pnpm --filter client dev` (starts custom Express server via `node server.js` on port `4000`)
- **Build**: `pnpm --filter client build`
- **Lint**: `pnpm --filter client lint`
- **Format**: `pnpm --filter client format`

---

### `apps/cms`

Hotel management and administration portal.

- **Path**: `apps/cms/`
- **Port**: `5000`
- **Dev command**: `pnpm --filter cms dev` (starts custom Express server via `node server.js` on port `5000`)
- **Build**: `pnpm --filter cms build`
- **Lint**: `pnpm --filter cms lint`
- **Format**: `pnpm --filter cms format`

---

## Architecture & Conventions

### `apps/api`

- **Entry point**: `src/index.js` sets up CORS (allowing ports 3000, 4000, 5000, 6969), cookie parser, express sessions, and router mounting.
- **Routing**: `src/routers/index.js` aggregates resource routers:
  - `user.router.js`: Authentication, profile, user management
  - `booking.router.js`: Booking reservations and status updates
  - `room.router.js`: Room management and availability
  - `location.router.js` & `city.router.js`: Geographic data
  - `category.router.js`: Room categories and classifications
  - `payment.router.js`: VNPay integration and payment verification
  - `analytic.router.js`: Revenue and booking analytics
  - `file.router.js` & `email.router.js`: File uploads and notification services
- **Database & Models**: Sequelize ORM models in `src/models/` configured via `src/config/config.js` and `src/.sequelizerc`.
- **Controllers & Services**: Business logic resides in `src/controllers/` and `src/services/`.

### `apps/client` & `apps/cms`

- **Custom Server**: Both use custom `server.js` wrapping Next.js with Express to bind specific ports (`4000` for client, `5000` for CMS).
- **Routing**: Next.js Pages Router in `pages/` directory (`_app.js`, `_document.js`, and file-based route folders).
- **State Management**: Redux Toolkit configured alongside `redux-saga` for async side effects with `next-redux-wrapper`.
- **UI Components**: Ant Design (v5) and Tailwind CSS with custom styling in `styles/` and modular UI in `components/`.
- **API Integration**: Axios clients in `services/` communicate with `apps/api` on `http://localhost:6969`.

---

## Automated Releases & Conventional Commits

This repo uses Release-Please on GitHub Actions. Follow Conventional Commits:

- `feat: <description>` -> Minor version bump
- `fix: <description>` -> Patch version bump
- `docs: <description>` -> Documentation only
- `chore: <description>` -> Maintenance / dependency updates
- `BREAKING CHANGE: <description>` -> Major version bump
