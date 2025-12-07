import { matchRoute, initRouter } from './router.js';
import { getCategories, getPostsIndex, getPostBySlug, getPostsByCategory } from './api.js';
import * as templates from './templates.js';
import { updateMeta } from './utils.js';

const app = document.getElementById('app');

async function render(path) {
  const { handler, params } = matchRoute(path);

  // Show loading state
  app.innerHTML = templates.renderLoading();

  try {
    switch (handler) {
      case 'home': {
        const [{ posts }, { categories }] = await Promise.all([
          getPostsIndex(),
          getCategories()
        ]);
        updateMeta(null, 'In-depth articles on JavaScript, TypeScript, DevOps, and web development');
        app.innerHTML = templates.renderHome(posts, categories);
        break;
      }

      case 'blogList': {
        const { posts } = await getPostsIndex();
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get('page')) || 1;
        updateMeta('All Articles', `Browse all ${posts.length} tech articles`);
        app.innerHTML = templates.renderBlogList(posts, page);
        break;
      }

      case 'categoryList': {
        const [{ categories }, posts] = await Promise.all([
          getCategories(),
          getPostsByCategory(params.category)
        ]);
        const category = categories.find(c => c.slug === params.category);
        if (!category) {
          updateMeta('Not Found');
          app.innerHTML = templates.renderNotFound();
          return;
        }
        updateMeta(category.name, category.description);
        app.innerHTML = templates.renderCategoryList(category, posts);
        break;
      }

      case 'post': {
        const post = await getPostBySlug(params.slug);
        if (!post) {
          updateMeta('Not Found');
          app.innerHTML = templates.renderNotFound();
          return;
        }

        // Get related posts
        const { posts } = await getPostsIndex();
        const relatedPosts = posts
          .filter(p => post.relatedPosts?.includes(p.slug))
          .slice(0, 3);

        updateMeta(post.title, post.excerpt);
        app.innerHTML = templates.renderPost(post, relatedPosts);
        break;
      }

      case 'about': {
        updateMeta('About', 'Learn about Tech Blog and our mission');
        app.innerHTML = templates.renderAbout();
        break;
      }

      case 'contact': {
        updateMeta('Contact', 'Get in touch with Tech Blog');
        app.innerHTML = templates.renderContact();
        break;
      }

      case 'notFound':
      default: {
        updateMeta('Not Found');
        app.innerHTML = templates.renderNotFound();
      }
    }
  } catch (error) {
    console.error('Render error:', error);
    app.innerHTML = templates.renderError(error.message);
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  initRouter(render);
});
