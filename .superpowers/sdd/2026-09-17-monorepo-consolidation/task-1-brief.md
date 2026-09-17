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

