# GitHub Actions Workflows

## Deploy Sites (`deploy.yml`)

Automatically deploys all sites to Cloudflare Workers when code is pushed to `main`.

**Trigger:** Push to `main` branch

**What it does:**
- Deploys each site in parallel
- Uses matrix strategy for concurrent deployments
- Sites: `dynamic-spa`, `large-static`

**Secrets required:**
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers:Edit permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

---

## Cleanup Orphaned Workers (`cleanup-workers.yml`)

Automatically removes Cloudflare Workers that no longer exist in the repository. Useful when sites are deleted or renamed.

**Triggers:**
- **Scheduled:** Every Monday at 00:00 UTC
- **Manual:** Via GitHub Actions UI (Actions → Cleanup Orphaned Workers → Run workflow)

**What it does:**
1. Scans all `*/wrangler.toml` files to build list of expected workers
2. Queries Cloudflare API to list all deployed workers in your account
3. Identifies orphaned workers (deployed but not in repo)
4. Automatically deletes orphaned workers

**Manual execution steps:**
1. Go to **Actions** tab in GitHub
2. Select **"Cleanup Orphaned Workers"** workflow
3. Click **"Run workflow"** button
4. Select branch (usually `main`)
5. Click **"Run workflow"**

**Safety features:**
- ✅ Scheduled runs (weekly) for predictable cleanup timing
- ✅ Detailed logging of what is being deleted
- ✅ GitHub Actions audit trail of all deletions
- ✅ Lists expected vs deployed workers
- ✅ Provides summary in GitHub Actions UI

**Example scenarios:**

### Scenario 1: Site Renamed
```
1. Rename old-name to new-name
2. Update wrangler.toml: name = "new-name"
3. Update deploy.yml matrix and root package.json workspaces
4. Push to main (deploys new-name worker)
5. Cleanup workflow runs (deletes old-name worker)
```

### Scenario 2: Site Deleted
```
1. Delete deleted-site directory
2. Remove from deploy.yml matrix and root package.json workspaces
3. Push to main
4. Cleanup workflow runs (deletes deleted-site worker)
```

### Scenario 3: Manual Cleanup
```
1. Accidentally deployed a test worker "my-test"
2. Go to Actions → Cleanup Orphaned Workers
3. Click "Run workflow"
4. The workflow will automatically delete "my-test"
5. Check the Actions log to verify deletion
```

**Secrets required:**
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token with Workers:Edit permissions
- `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account ID

**Monitoring:**
Check the workflow runs in the Actions tab to see:
- Which workers were identified as orphaned
- Whether deletion was successful
- Any errors encountered
