import { escapeHtml, formatDate } from './utils.js';

export function renderLoading() {
  return `
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `;
}

export function renderError(message) {
  return `
    <div class="error-container">
      <h2>Something went wrong</h2>
      <p>${escapeHtml(message)}</p>
      <a href="/" data-link class="btn">Go Home</a>
    </div>
  `;
}

export function renderHome(posts, categories) {
  const featuredPosts = posts.slice(0, 6);
  return `
    <section class="hero">
      <h1>Tech Blog</h1>
      <p>In-depth articles on JavaScript, TypeScript, DevOps, and web development</p>
    </section>

    <section class="categories-section">
      <h2>Categories</h2>
      <div class="category-grid">
        ${categories.map(cat => `
          <a href="/blog/${cat.slug}" data-link class="category-card" style="border-color: ${cat.color}">
            <h3>${escapeHtml(cat.name)}</h3>
            <p>${escapeHtml(cat.description)}</p>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="featured-posts">
      <h2>Latest Articles</h2>
      <div class="post-grid">
        ${featuredPosts.map(post => renderPostCard(post)).join('')}
      </div>
      <p class="text-center">
        <a href="/blog" data-link class="btn">View All Posts</a>
      </p>
    </section>
  `;
}

export function renderPostCard(post) {
  return `
    <article class="post-card">
      <span class="category-tag" data-category="${post.category}">${escapeHtml(post.category)}</span>
      <h3><a href="/blog/${post.slug}" data-link>${escapeHtml(post.title)}</a></h3>
      <p class="excerpt">${escapeHtml(post.excerpt)}</p>
      <p class="meta">${formatDate(post.date)} &middot; ${post.readTime} min read</p>
    </article>
  `;
}

export function renderBlogList(posts, currentPage = 1, postsPerPage = 12) {
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const pagePosts = posts.slice(start, start + postsPerPage);

  return `
    <div class="page-header">
      <h1>All Articles</h1>
      <p>${posts.length} articles</p>
    </div>

    <div class="post-grid">
      ${pagePosts.map(post => renderPostCard(post)).join('')}
    </div>

    ${renderPagination(currentPage, totalPages, '/blog')}
  `;
}

export function renderCategoryList(category, posts) {
  return `
    <div class="page-header">
      <div class="breadcrumb">
        <a href="/" data-link>Home</a> / <a href="/blog" data-link>Blog</a> / ${escapeHtml(category.name)}
      </div>
      <h1>${escapeHtml(category.name)}</h1>
      <p>${escapeHtml(category.description)}</p>
    </div>

    <div class="post-grid">
      ${posts.map(post => renderPostCard(post)).join('')}
    </div>
  `;
}

export function renderPost(post, relatedPosts = []) {
  return `
    <article class="post-full">
      <header class="post-header">
        <div class="breadcrumb">
          <a href="/" data-link>Home</a> /
          <a href="/blog" data-link>Blog</a> /
          <a href="/blog/${post.category}" data-link>${escapeHtml(post.category)}</a> /
          ${escapeHtml(post.title)}
        </div>
        <h1>${escapeHtml(post.title)}</h1>
        <p class="meta">
          ${formatDate(post.date)} &middot;
          ${post.readTime} min read &middot;
          <span class="category-tag" data-category="${post.category}">${escapeHtml(post.category)}</span>
        </p>
        ${post.tags ? `
        <div class="tags">
          ${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
        </div>
        ` : ''}
      </header>

      <div class="post-content">
        ${post.content}
      </div>

      ${relatedPosts.length > 0 ? `
        <section class="related-posts">
          <h2>Related Articles</h2>
          <div class="post-grid">
            ${relatedPosts.map(p => renderPostCard(p)).join('')}
          </div>
        </section>
      ` : ''}
    </article>
  `;
}

export function renderAbout() {
  return `
    <div class="page-header">
      <div class="breadcrumb">
        <a href="/" data-link>Home</a> / About
      </div>
      <h1>About</h1>
    </div>
    <div class="content-page">
      <p>Welcome to Tech Blog, your source for in-depth articles on modern web development.</p>
      <p>We cover JavaScript, TypeScript, DevOps practices, and emerging web technologies. Our goal is to help developers stay current with the rapidly evolving landscape of web development.</p>
      <h2>What We Cover</h2>
      <ul>
        <li><strong>JavaScript</strong> - Core concepts, ES features, frameworks, and best practices</li>
        <li><strong>TypeScript</strong> - Type system deep dives, patterns, and migration strategies</li>
        <li><strong>DevOps</strong> - CI/CD, containers, infrastructure as code, and monitoring</li>
        <li><strong>Web Development</strong> - Performance, accessibility, and modern web standards</li>
        <li><strong>Tutorials</strong> - Step-by-step guides for practical projects</li>
      </ul>
      <h2>Our Mission</h2>
      <p>We believe in practical, hands-on learning. Every article includes real-world examples and code you can use in your own projects.</p>
    </div>
  `;
}

export function renderContact() {
  return `
    <div class="page-header">
      <div class="breadcrumb">
        <a href="/" data-link>Home</a> / Contact
      </div>
      <h1>Contact</h1>
    </div>
    <div class="content-page">
      <p>Have questions, suggestions, or want to contribute? We'd love to hear from you!</p>
      <h2>Get in Touch</h2>
      <ul>
        <li><strong>Email:</strong> hello@techblog.example</li>
        <li><strong>Twitter:</strong> @techblog</li>
        <li><strong>GitHub:</strong> github.com/techblog</li>
      </ul>
      <h2>Contributing</h2>
      <p>Interested in writing for Tech Blog? We're always looking for knowledgeable developers to share their expertise. Reach out with your article ideas!</p>
    </div>
  `;
}

export function renderNotFound() {
  return `
    <div class="error-page">
      <h1>404</h1>
      <p>Page not found</p>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" data-link class="btn">Go Home</a>
    </div>
  `;
}

function renderPagination(current, total, basePath) {
  if (total <= 1) return '';

  const pages = [];
  for (let i = 1; i <= total; i++) {
    const isActive = i === current;
    const href = i === 1 ? basePath : `${basePath}?page=${i}`;
    pages.push(`
      <a href="${href}" data-link class="page-link ${isActive ? 'active' : ''}">${i}</a>
    `);
  }

  return `
    <nav class="pagination">
      ${pages.join('')}
    </nav>
  `;
}
