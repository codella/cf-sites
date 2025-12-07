const CATEGORIES = ['javascript', 'typescript', 'devops', 'web-development', 'tutorials'];

const routes = [
  { pattern: /^\/$/, handler: 'home' },
  { pattern: /^\/about\/?$/, handler: 'about' },
  { pattern: /^\/contact\/?$/, handler: 'contact' },
  { pattern: /^\/blog\/?$/, handler: 'blogList' },
  {
    pattern: new RegExp(`^/blog/(${CATEGORIES.join('|')})/?$`),
    handler: 'categoryList',
    params: ['category']
  },
  {
    pattern: /^\/blog\/([a-z0-9-]+)\/?$/,
    handler: 'post',
    params: ['slug']
  }
];

export function matchRoute(path) {
  for (const route of routes) {
    const match = path.match(route.pattern);
    if (match) {
      const params = {};
      if (route.params) {
        route.params.forEach((name, index) => {
          params[name] = match[index + 1];
        });
      }
      return { handler: route.handler, params };
    }
  }
  return { handler: 'notFound', params: {} };
}

export function initRouter(renderFn) {
  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    renderFn(window.location.pathname);
  });

  // Intercept link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href, renderFn);
    }
  });

  // Initial render
  renderFn(window.location.pathname);
}

export function navigateTo(path, renderFn) {
  if (path !== window.location.pathname) {
    window.history.pushState(null, '', path);
    renderFn(path);
    window.scrollTo(0, 0);
  }
}
