# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`datn` is a hotel booking and reservation system (DATPHONG.COM) composed of three independent sub-projects:
- **`datn-api`**: Express.js REST API with MySQL/Sequelize ORM, JWT authentication, and VNPay integration. Default port: `6969`.
- **`datn-client`**: Customer-facing web portal built with Next.js (v13 pages router), custom Express server, Redux Toolkit + Redux-Saga, Ant Design, and Tailwind CSS. Default port: `4000`.
- **`datn-cms`**: Admin/CMS management portal built with Next.js (v13 pages router), custom Express server, Redux Toolkit + Redux-Saga, Ant Design, and ApexCharts. Default port: `5000`.

## Common Commands

Each sub-application is managed independently from its respective subdirectory.

### datn-api

Navigate to `datn-api/`:
- **Run dev**: `npm start` (runs `nodemon src/index.js`)
- **Lint**: `npm run lint` (`eslint src/.`)
- **Format**: `npm run format` (`prettier --write .`)
- **Run via Docker**: `docker-compose up -d`

#### Database Migrations & Seeds (Sequelize CLI)
Run from `datn-api/src/`:
- **Fresh database setup**:
  ```bash
  npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all
  ```
- **Migrate & Seed**: `npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
- **Create migration**: `npx sequelize-cli migration:generate --name <migration-name>`
- **Undo last migration**: `npx sequelize-cli db:migrate:undo`

### datn-client

Navigate to `datn-client/`:
- **Run dev**: `npm run dev` (starts custom Express server via `node server.js` on port `4000`)
- **Build**: `npm run build`
- **Run production**: `npm start`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

### datn-cms

Navigate to `datn-cms/`:
- **Run dev**: `npm run dev` (starts custom Express server via `node server.js` on port `5000`)
- **Build**: `npm run build`
- **Run production**: `npm start`
- **Lint**: `npm run lint`
- **Format**: `npm run format`

## Architecture & Conventions

### `datn-api`
- **Entry point**: `src/index.js` sets up CORS (allowing ports 3000, 4000, 5000, 6969), cookies, session, and routes.
- **Routing**: `src/routers/index.js` aggregates resource routers:
  - `user.router.js`: Authentication, profile, user management
  - `booking.router.js`: Booking reservations and status updates
  - `room.router.js`: Room management and availability
  - `location.router.js` & `city.router.js`: Geographic data
  - `category.router.js`: Room categories and classifications
  - `payment.router.js`: VNPay integration and payment verification
  - `analytic.router.js`: Revenue and booking analytics
  - `file.router.js` & `email.router.js`: File uploads and notification services
- **Database & Models**: Sequelize ORM in `src/models/` configured via `src/config/config.js` and `src/.sequelizerc`.
- **Controllers & Services**: Business logic resides in `src/controllers/` and `src/services/`.

### `datn-client` & `datn-cms`
- **Custom Server**: Both use custom `server.js` wrapping Next.js with Express to bind specific ports (`4000` for client, `5000` for CMS).
- **Routing**: Next.js Pages Router in `pages/` directory (`_app.js`, `_document.js`, and file-based route folders).
- **State Management**: Redux Toolkit configured alongside `redux-saga` for async side effects with `next-redux-wrapper`.
- **UI Components**: Ant Design (v5) and Tailwind CSS with custom styling in `styles/` and modular UI in `components/`.
- **API Integration**: Axios clients in `services/` communicate with `datn-api` on `http://localhost:6969`.
