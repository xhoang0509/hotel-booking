# Design Document: Monorepo Consolidation, Automation Bots & Portfolio Showcase

**Date:** 2026-09-17  
**Project:** DATPHONG.COM Monorepo Platform (`datn`)  
**Status:** Approved  

---

## 1. Overview & Objective
Consolidate 3 standalone repositories (`datn-api`, `datn-client`, `datn-cms`) into a single production-grade, open-source portfolio monorepo on GitHub. The new structure will feature:
- Workspace management via **pnpm Workspaces** + **Turborepo**.
- Unified local development & multi-container deployment via **Docker Compose**.
- Automated semantic versioning, changelog generation, and GitHub Releases via **Release-Please**.
- Automated dependency vulnerability scanning & updates via **Dependabot**.
- Automated CI pipeline (lint, type/build checks) via **GitHub Actions**.
- A high-impact portfolio **README.md** complete with architecture diagrams, badges, and quick-start instructions.

---

## 2. Monorepo Directory Architecture

```text
datn/
├── .github/
│   ├── dependabot.yml                      # Weekly dependency update bot
│   ├── release-please-config.json          # Release-Please configuration
│   ├── .release-please-manifest.json       # Version tracking manifest
│   └── workflows/
│       ├── ci.yml                          # CI build & lint check on PR/push
│       └── release.yml                     # Auto-bump version & GitHub release
├── apps/
│   ├── api/                                # Express.js REST API + Sequelize ORM (port 6969)
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── client/                             # Next.js customer booking portal (port 4000)
│   │   ├── Dockerfile
│   │   └── package.json
│   └── cms/                                # Next.js admin & analytics dashboard (port 5000)
│       ├── Dockerfile
│       └── package.json
├── docker-compose.yml                      # Multi-service stack (MySQL 8 + api + client + cms)
├── pnpm-workspace.yaml                     # pnpm packages definition: ['apps/*']
├── turbo.json                              # Turborepo task pipelines (build, dev, lint, format)
├── package.json                            # Root scripts & dev dependencies (turbo, prettier)
├── .gitignore                              # Unified gitignore for Node, Next.js, and DB
├── CLAUDE.md                               # Claude Code developer instructions
└── README.md                               # Main portfolio showcase & architecture doc
```

---

## 3. Workspace & Pipeline Configuration

### 3.1. `pnpm-workspace.yaml`
```yaml
packages:
  - 'apps/*'
```

### 3.2. `turbo.json`
- **`build`**: Depends on `^build`, outputs `[".next/**", "!.next/cache/**", "dist/**"]`.
- **`dev`**: Persistent (`cache: false`), runs all apps simultaneously with distinct prefixes.
- **`lint`**: Runs concurrently across all packages.
- **`format`**: Prettier formatting pipeline.

### 3.3. Root `package.json` Scripts
- `pnpm dev`: Runs `turbo run dev` to start api, client, and cms together.
- `pnpm dev:api`: Runs `turbo run dev --filter=api`
- `pnpm dev:client`: Runs `turbo run dev --filter=client`
- `pnpm dev:cms`: Runs `turbo run dev --filter=cms`
- `pnpm build`: Runs `turbo run build`
- `pnpm lint`: Runs `turbo run lint`
- `pnpm format`: Runs `prettier --write .`

---

## 4. Multi-Service Docker Compose Setup

Root `docker-compose.yml` orchestrates all 4 services:
1. **`mysql`**: MySQL 8.0, exposed on port 3306 with healthcheck.
2. **`api`**: Node.js Alpine container building `apps/api`, depends on `mysql` healthcheck, exposed on port `6969`.
3. **`client`**: Node.js container building `apps/client`, exposed on port `4000`.
4. **`cms`**: Node.js container building `apps/cms`, exposed on port `5000`.

Users can run `docker compose up -d` to spin up the entire platform instantly without installing local dependencies.

---

## 5. Automation Bots & CI/CD Pipelines

### 5.1. Release-Please Bot (`.github/workflows/release.yml`)
- Tracks Conventional Commits (`feat:`, `fix:`, `perf:`, `refactor:`, `chore:`).
- Maintains `.release-please-manifest.json` and updates `CHANGELOG.md`.
- Automatically opens a release PR; upon merging to `main`, tags the commit and generates a GitHub Release.

### 5.2. Dependabot (`.github/dependabot.yml`)
- Monitors package ecosystems in `apps/api`, `apps/client`, `apps/cms`, and root `/`.
- Runs weekly checks with grouped updates (`dependencies` and `dev-dependencies`) to minimize PR noise.

### 5.3. Continuous Integration (`.github/workflows/ci.yml`)
- Triggers on PRs to `main` and pushes to `main`.
- Sets up Node.js and pnpm with cache.
- Runs `pnpm install --frozen-lockfile` (or initial install fallback), `pnpm lint`, and `pnpm build`.

---

## 6. Portfolio README Specification
- **Badges**: CI build status, Release version, Node.js version, pnpm, Next.js, Express, MySQL.
- **System Architecture**: Mermaid sequence/architecture diagram showing Client (4000) & CMS (5000) communicating with API (6969), MySQL, Firebase, and VNPay.
- **Service Breakdown Table**: Port, technology stack, purpose.
- **Quickstart Guide**:
  - Docker Compose path (1-command).
  - Local development path (`pnpm install && pnpm dev`).
- **Conventional Commits Guide**: Clear instructions on how commits trigger the automated release bot.
- **Demo Placeholders**: Clean markdown sections for screenshots.
