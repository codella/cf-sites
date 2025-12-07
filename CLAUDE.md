# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-site monorepo for Cloudflare Workers. Each site lives in `sites/<name>/` and is fully independent with its own `package.json` and `wrangler.toml`. The root uses npm workspaces for orchestration.

## Commands

### Root-level (from project root)
```bash
npm install                    # Install all workspace dependencies
npm run deploy:all             # Deploy all sites
npm run build:all              # Build all sites
npm run lint:all               # Lint all sites
```

### Site-level (from sites/<name>/)
```bash
npm run dev                    # Local development server (wrangler dev)
npm run deploy                 # Deploy to Cloudflare
```

### Running a specific site from root
```bash
npm run dev --workspace=example-site
npm run deploy --workspace=static-deep
```

## Architecture

All sites use the same pattern: Cloudflare Workers with static assets binding.

```
sites/<name>/
├── wrangler.toml      # name, main entry, [assets] config
├── src/index.ts       # Worker entry: exports fetch handler using env.ASSETS
└── public/            # Static files served via ASSETS binding
```

Worker pattern (`src/index.ts`):
```typescript
export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);  // Can add routing/API logic before this
  },
};
```

## Adding a New Site

1. Copy existing site: `cp -r sites/example-site sites/my-site`
2. Update `sites/my-site/package.json`: change `"name"` field
3. Update `sites/my-site/wrangler.toml`: change `name` field
4. Add site name to `.github/workflows/deploy.yml` matrix: `site: [example-site, static-deep, my-site]`
5. Run `npm install` from root

## CI/CD

### Deployment Workflow

GitHub Actions deploys all sites in parallel on push to `main`. See `.github/workflows/deploy.yml`.

Required secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Cleanup Workflow

The `cleanup-workers.yml` workflow automatically removes orphaned Cloudflare Workers (workers that no longer exist in the repo). This is useful when sites are deleted or renamed.

**When it runs:**
- Automatically every Monday at 00:00 UTC
- Manually via GitHub Actions UI (workflow_dispatch)

**How it works:**
1. Scans `sites/*/wrangler.toml` files to find expected worker names
2. Lists all deployed workers in your Cloudflare account
3. Identifies orphaned workers (deployed but not in repo)
4. Automatically deletes orphaned workers

**Manual execution:**
1. Go to Actions tab → "Cleanup Orphaned Workers"
2. Click "Run workflow"
3. Confirm execution

**Safety features:**
- Scheduled runs (weekly) for predictable cleanup timing
- Detailed logging of what is being deleted
- GitHub Actions audit trail of all deletions
- Clear logic: only deletes workers not in the repository
