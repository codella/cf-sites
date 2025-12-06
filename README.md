# cf-sites

A multi-site repository containing independent Cloudflare Workers sites. Each site is self-contained with its own configuration and dependencies, while the root provides orchestration scripts.

## Project Structure

```
cf-sites/
├── package.json          # Root orchestration (npm workspaces)
├── .gitignore
├── sites/
│   ├── example-site/     # Template site with client-side JS
│   └── static-deep/      # Static site with deep page structure
```

## Sites

### example-site
A template demonstrating Cloudflare Workers with static assets and client-side JavaScript for dynamic content expansion.

### static-deep
A pure static site themed as "Horizon Digital Solutions" with:
- Multi-level page hierarchy (Home, About, Services, Blog, Contact)
- 8 blog posts with tech content
- `robots.txt` and `sitemap.xml` for SEO
- Consistent navigation and cross-linking

## Getting Started

### Prerequisites
- Node.js 18+
- npm 7+ (for workspaces support)
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account

### Installation

```bash
# Install all dependencies across workspaces
npm install
```

### Development

```bash
# Run a specific site locally
cd sites/example-site
npm run dev

# Or from root
npm run dev --workspace=example-site
```

### Deployment

```bash
# Deploy a specific site
cd sites/static-deep
npm run deploy

# Deploy all sites
npm run deploy:all
```

## Creating a New Site

1. Copy an existing site as a template:
   ```bash
   cp -r sites/example-site sites/my-new-site
   ```

2. Update `sites/my-new-site/package.json`:
   ```json
   {
     "name": "my-new-site",
     ...
   }
   ```

3. Update `sites/my-new-site/wrangler.toml`:
   ```toml
   name = "my-new-site"
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Customize content in `public/` directory

6. Develop and deploy:
   ```bash
   cd sites/my-new-site
   npm run dev      # Local development
   npm run deploy   # Deploy to Cloudflare
   ```

## Architecture

All sites use Cloudflare Workers with static assets:

```typescript
// src/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};
```

Static files are served from the `public/` directory. The Worker can be extended to add:
- API routes
- Authentication
- Request/response transformation
- Dynamic content generation

## Scripts

| Command | Description |
|---------|-------------|
| `npm run deploy:all` | Deploy all sites |
| `npm run build:all` | Build all sites |
| `npm run lint:all` | Lint all sites |

## License

MIT
