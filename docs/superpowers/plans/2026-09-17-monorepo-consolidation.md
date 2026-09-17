# Monorepo Consolidation & Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate 3 standalone GitHub repositories (`datn-api`, `datn-client`, `datn-cms`) into a single cohesive Turborepo + pnpm monorepo at `/Users/crm-hoang.nguyen3/code/datn` with automated release and dependency bots, multi-container Docker compose, and a production-grade portfolio README.

**Architecture:** Monorepo architecture with `apps/api`, `apps/client`, `apps/cms` unified under pnpm workspaces and Turborepo. Automated pipelines using GitHub Actions: Release-Please for conventional commit versioning, Dependabot for dependency updates, and a CI workflow for build/lint verification.

**Tech Stack:** pnpm workspaces, Turborepo, Docker Compose, GitHub Actions, Release-Please, Dependabot, Mermaid.js.

**Spec:** `docs/superpowers/specs/2026-09-17-monorepo-consolidation-design.md`

## Global Constraints

- Monorepo root is `/Users/crm-hoang.nguyen3/code/datn`.
- Service ports: API on 6969, Client on 4000, CMS on 5000, MySQL on 3306.
- Preserve commit histories of sub-repos using Git Subtree when merging into the root Git repository.
- Root scripts must use pnpm: `pnpm dev`, `pnpm build`, `pnpm lint`, `pnpm format`.

---

### Task 1: Root Git Initialization & History-Preserving Subtree Migration

**Files:**
- Directory: `/Users/crm-hoang.nguyen3/code/datn`
- Target structure: `apps/api/`, `apps/client/`, `apps/cms/`

**Interfaces:**
- Consumes: Independent Git histories from `datn-api`, `datn-client`, `datn-cms`
- Produces: Single unified Git repository at `/Users/crm-hoang.nguyen3/code/datn` with all branches/commit history preserved under `apps/`

- [ ] **Step 1: Backup temporary staging and initialize root git**
```bash
cd /Users/crm-hoang.nguyen3/code/datn
git init
git branch -M main
```

- [ ] **Step 2: Migrate datn-api into apps/api preserving history**
```bash
cd /Users/crm-hoang.nguyen3/code/datn
git remote add -f repo-api datn-api
git merge -s ours --no-commit --allow-unrelated-histories repo-api/master || git merge -s ours --no-commit --allow-unrelated-histories repo-api/main
git read-tree --prefix=apps/api -u repo-api/master || git read-tree --prefix=apps/api -u repo-api/main
git commit -m "chore: import datn-api into apps/api with full history"
git remote remove repo-api
```

- [ ] **Step 3: Migrate datn-client into apps/client preserving history**
```bash
cd /Users/crm-hoang.nguyen3/code/datn
git remote add -f repo-client datn-client
git merge -s ours --no-commit --allow-unrelated-histories repo-client/master || git merge -s ours --no-commit --allow-unrelated-histories repo-client/main
git read-tree --prefix=apps/client -u repo-client/master || git read-tree --prefix=apps/client -u repo-client/main
git commit -m "chore: import datn-client into apps/client with full history"
git remote remove repo-client
```

- [ ] **Step 4: Migrate datn-cms into apps/cms preserving history**
```bash
cd /Users/crm-hoang.nguyen3/code/datn
git remote add -f repo-cms datn-cms
git merge -s ours --no-commit --allow-unrelated-histories repo-cms/master || git merge -s ours --no-commit --allow-unrelated-histories repo-cms/main
git read-tree --prefix=apps/cms -u repo-cms/master || git read-tree --prefix=apps/cms -u repo-cms/main
git commit -m "chore: import datn-cms into apps/cms with full history"
git remote remove repo-cms
```

- [ ] **Step 5: Clean up old separate folders**
```bash
cd /Users/crm-hoang.nguyen3/code/datn
rm -rf datn-api datn-client datn-cms
```

- [ ] **Step 6: Verify folder structure & git status**
Run: `ls -la apps/`
Expected: Contains `api`, `client`, `cms`.
Run: `git status`

---

### Task 2: Configure pnpm Workspaces & Turborepo Pipeline

**Files:**
- Create: `/Users/crm-hoang.nguyen3/code/datn/pnpm-workspace.yaml`
- Create: `/Users/crm-hoang.nguyen3/code/datn/turbo.json`
- Create: `/Users/crm-hoang.nguyen3/code/datn/package.json`
- Create: `/Users/crm-hoang.nguyen3/code/datn/.gitignore`
- Modify: `apps/api/package.json` (set name to `"@datn/api"` or `"api"`)
- Modify: `apps/client/package.json` (set name to `"@datn/client"` or `"client"`)
- Modify: `apps/cms/package.json` (set name to `"@datn/cms"` or `"cms"`)

**Interfaces:**
- Consumes: Package configurations in `apps/*`
- Produces: Root workspace build/dev/lint pipeline running across all 3 apps

- [ ] **Step 1: Create `pnpm-workspace.yaml`**
```yaml
packages:
  - 'apps/*'
```

- [ ] **Step 2: Create root `package.json` with workspace devDependencies**
```json
{
  "name": "datn-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "Full-stack Hotel Booking & Management Platform",
  "scripts": {
    "dev": "turbo run dev",
    "dev:api": "turbo run dev --filter=api",
    "dev:client": "turbo run dev --filter=client",
    "dev:cms": "turbo run dev --filter=cms",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "prettier": "^2.8.7",
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

- [ ] **Step 3: Create root `turbo.json`**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

- [ ] **Step 4: Create root `.gitignore`**
```gitignore
node_modules/
.pnpm-store/
.turbo/
.next/
dist/
build/
.env
.env.local
.DS_Store
*.log
```

- [ ] **Step 5: Normalize package names in apps' `package.json`**
Update `apps/api/package.json` -> `"name": "api"`
Update `apps/client/package.json` -> `"name": "client"`
Update `apps/cms/package.json` -> `"name": "cms"`

- [ ] **Step 6: Run `pnpm install` and verify workspace resolution**
Run: `pnpm install`
Expected: Successfully links workspace packages and creates `pnpm-lock.yaml`.

- [ ] **Step 7: Commit workspace configuration**
```bash
git add pnpm-workspace.yaml turbo.json package.json .gitignore pnpm-lock.yaml apps/*/package.json
git commit -m "chore: configure pnpm workspace and turborepo"
```

---

### Task 3: Root Multi-Service Docker Compose & Dockerfiles

**Files:**
- Create: `/Users/crm-hoang.nguyen3/code/datn/docker-compose.yml`
- Create/Verify: `apps/api/Dockerfile`
- Create: `apps/client/Dockerfile`
- Create: `apps/cms/Dockerfile`

**Interfaces:**
- Consumes: Source code of all 3 applications
- Produces: 1-command container orchestration (`docker compose up`) for MySQL, API, Client, and CMS

- [ ] **Step 1: Write `apps/api/Dockerfile`**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 6969
CMD ["node", "src/index.js"]
```

- [ ] **Step 2: Write `apps/client/Dockerfile`**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "server.js"]
```

- [ ] **Step 3: Write `apps/cms/Dockerfile`**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "server.js"]
```

- [ ] **Step 4: Write root `docker-compose.yml`**
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: datn_mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: datn
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-proot"]
      interval: 5s
      timeout: 5s
      retries: 10

  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: datn_api
    restart: always
    environment:
      PORT: 6969
      DB_HOST: mysql
      DB_USERNAME: root
      DB_PASSWORD: root
      DB_NAME: datn
      JWT_SECRET_KEY: "JWT_SECRET_KEY_123@#"
    ports:
      - '6969:6969'
    depends_on:
      mysql:
        condition: service_healthy

  client:
    build:
      context: ./apps/client
      dockerfile: Dockerfile
    container_name: datn_client
    restart: always
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_SERVER_URL: http://localhost:6969
      NEXT_PUBLIC_APP_URL: http://localhost:4000
    ports:
      - '4000:4000'
    depends_on:
      - api

  cms:
    build:
      context: ./apps/cms
      dockerfile: Dockerfile
    container_name: datn_cms
    restart: always
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_SERVER_URL: http://localhost:6969
      NEXT_PUBLIC_APP_URL: http://localhost:5000
    ports:
      - '5000:5000'
    depends_on:
      - api

volumes:
  mysql_data:
```

- [ ] **Step 5: Commit Docker configuration**
```bash
git add docker-compose.yml apps/*/Dockerfile
git commit -m "feat(docker): setup unified multi-service docker compose"
```

---

### Task 4: Automation Bots (Release-Please, Dependabot, CI Workflows)

**Files:**
- Create: `.github/dependabot.yml`
- Create: `.github/release-please-config.json`
- Create: `.release-please-manifest.json`
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/release.yml`

**Interfaces:**
- Consumes: Git commits on `main` and Pull Requests
- Produces:
  - Weekly dependency update PRs from Dependabot
  - Automated Release PRs with CHANGELOG updates from Release-Please
  - Automated lint/build validation on PRs from CI

- [ ] **Step 1: Create `.github/dependabot.yml`**
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      dependencies:
        patterns:
          - "*"

  - package-ecosystem: "npm"
    directory: "/apps/api"
    schedule:
      interval: "weekly"

  - package-ecosystem: "npm"
    directory: "/apps/client"
    schedule:
      interval: "weekly"

  - package-ecosystem: "npm"
    directory: "/apps/cms"
    schedule:
      interval: "weekly"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

- [ ] **Step 2: Create `.github/release-please-config.json` & `.release-please-manifest.json`**
```json
{
  "release-type": "node",
  "packages": {
    ".": {
      "package-name": "datn-monorepo",
      "changelog-path": "CHANGELOG.md",
      "bump-minor-pre-major": true,
      "bump-patch-for-minor-pre-major": true
    }
  }
}
```
And manifest:
```json
{
  ".": "1.0.0"
}
```

- [ ] **Step 3: Create `.github/workflows/ci.yml`**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Run linting
        run: pnpm lint

      - name: Run builds
        run: pnpm build
```

- [ ] **Step 4: Create `.github/workflows/release.yml`**
```yaml
name: Release Please

on:
  push:
    branches:
      - main

permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    steps:
      - uses: googleapis/release-please-action@v4
        with:
          config-file: .github/release-please-config.json
          manifest-file: .release-please-manifest.json
```

- [ ] **Step 5: Commit automation workflows**
```bash
git add .github/ .release-please-manifest.json
git commit -m "ci: add release-please, dependabot, and CI workflows"
```

---

### Task 5: Portfolio Showcase README & CLAUDE.md Updates

**Files:**
- Create/Overwrite: `/Users/crm-hoang.nguyen3/code/datn/README.md`
- Update: `/Users/crm-hoang.nguyen3/code/datn/CLAUDE.md`

**Interfaces:**
- Consumes: Monorepo architecture, Docker configuration, port mappings
- Produces: High-impact portfolio showcase README with Mermaid diagrams, badges, and developer instructions

- [ ] **Step 1: Write root `README.md`**
Include:
- Project title: **DATPHONG.COM — Hotel Booking & Management Monorepo**
- Badges: GitHub Actions CI status, Release Version, Node 18, pnpm, Express, Next.js, MySQL.
- System Architecture Diagram using Mermaid (`graph TD`).
- Services & Ports Breakdown table.
- 1-command Quickstart with Docker Compose.
- Local development instructions using pnpm & Turborepo.
- Conventional Commits table for automated release bot.
- Screenshot placeholders for Client portal and Admin dashboard.

- [ ] **Step 2: Update `CLAUDE.md` with new `apps/*` paths and pnpm commands**
Update paths from `datn-api/` to `apps/api/`, `datn-client/` to `apps/client/`, etc., and document `pnpm dev`, `pnpm build`, `pnpm lint`.

- [ ] **Step 3: Commit documentation**
```bash
git add README.md CLAUDE.md
git commit -m "docs: create portfolio showcase README and update CLAUDE.md"
```

---

### Task 6: Final Verification & Smoke Test

**Files:**
- Entire workspace

- [ ] **Step 1: Verify pnpm build / lint runs cleanly across workspaces**
Run: `pnpm lint`
Run: `pnpm build` (or verify workspace task pipeline)

- [ ] **Step 2: Verify git log contains previous commits from all 3 repositories**
Run: `git log --oneline | head -n 30`
Expected: Commits from `datn-api`, `datn-client`, and `datn-cms` visible in unified history.
