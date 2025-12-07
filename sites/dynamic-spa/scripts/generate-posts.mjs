import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');
const dataDir = join(publicDir, 'data');

// Read the index to get all posts
const index = JSON.parse(readFileSync(join(dataDir, 'index.json'), 'utf-8'));

// Content templates for each category
const contentTemplates = {
  javascript: (post) => `
<h2>Introduction</h2>
<p>${post.excerpt}</p>
<p>JavaScript continues to evolve, and understanding its core concepts is essential for every developer. In this article, we'll explore ${post.title.toLowerCase()} in depth, with practical examples you can use in your projects.</p>

<h2>Key Concepts</h2>
<p>Before diving into the details, let's establish the fundamental concepts you need to understand. ${post.title} is a crucial part of modern JavaScript development, and mastering it will significantly improve your code quality.</p>
<p>The JavaScript runtime provides powerful features that enable complex functionality with relatively simple code. Understanding how these features work under the hood helps you write more efficient and maintainable applications.</p>

<h2>Practical Examples</h2>
<p>Let's look at some practical examples that demonstrate these concepts:</p>
<pre><code>// Example demonstrating ${post.title.toLowerCase()}
const example = {
  name: '${post.slug}',
  demonstrate: function() {
    console.log('Learning ${post.title}');
    return this.name;
  }
};

// Usage
console.log(example.demonstrate());</code></pre>
<p>This example shows a basic implementation. In real-world applications, you'll often combine multiple patterns for more sophisticated solutions.</p>

<h2>Best Practices</h2>
<p>When working with ${post.title.toLowerCase()}, keep these best practices in mind:</p>
<ul>
<li>Always consider performance implications</li>
<li>Write clean, readable code that others can understand</li>
<li>Test your implementations thoroughly</li>
<li>Document complex logic for future maintainers</li>
</ul>

<h2>Common Pitfalls</h2>
<p>Developers often encounter these issues when first learning this concept:</p>
<ul>
<li>Misunderstanding scope and context</li>
<li>Not handling edge cases properly</li>
<li>Over-engineering simple solutions</li>
</ul>
<p>By being aware of these pitfalls, you can avoid common mistakes and write better code from the start.</p>

<h2>Conclusion</h2>
<p>${post.title} is a powerful feature that every JavaScript developer should understand. By mastering these concepts and following best practices, you'll write cleaner, more efficient code that's easier to maintain and debug.</p>
<p>Practice these patterns in your own projects, and don't hesitate to experiment with different approaches to find what works best for your specific use cases.</p>
`,

  typescript: (post) => `
<h2>Introduction</h2>
<p>${post.excerpt}</p>
<p>TypeScript's type system provides powerful tools for building robust applications. Understanding ${post.title.toLowerCase()} will help you leverage these capabilities effectively.</p>

<h2>Understanding the Basics</h2>
<p>TypeScript extends JavaScript with static types, enabling better tooling and catching errors before runtime. ${post.title} is a key concept that demonstrates this power.</p>
<p>The TypeScript compiler performs sophisticated type analysis, helping you write safer code while maintaining the flexibility JavaScript is known for.</p>

<h2>Type Examples</h2>
<p>Here's how to work with these type concepts:</p>
<pre><code>// TypeScript ${post.title.toLowerCase()} example
interface Example {
  id: string;
  value: number;
  metadata?: Record&lt;string, unknown&gt;;
}

function process&lt;T extends Example&gt;(item: T): T {
  console.log(\`Processing \${item.id}\`);
  return { ...item, value: item.value * 2 };
}

// Usage with type safety
const result = process({ id: 'demo', value: 42 });</code></pre>
<p>Notice how TypeScript infers types and provides compile-time guarantees about your code's correctness.</p>

<h2>Advanced Patterns</h2>
<p>Once you understand the basics, you can use more advanced type patterns:</p>
<ul>
<li>Conditional types for flexible type transformations</li>
<li>Mapped types for creating derivative types</li>
<li>Template literal types for string manipulation</li>
<li>Recursive types for complex data structures</li>
</ul>

<h2>Integration with JavaScript</h2>
<p>TypeScript works seamlessly with existing JavaScript code. You can gradually adopt it in your projects by:</p>
<ul>
<li>Starting with <code>allowJs</code> to include JavaScript files</li>
<li>Adding type annotations incrementally</li>
<li>Using declaration files for third-party libraries</li>
</ul>

<h2>Conclusion</h2>
<p>Mastering ${post.title.toLowerCase()} will make you a more effective TypeScript developer. The type system is there to help you, not hinder you—embrace it fully for maximum benefit.</p>
`,

  devops: (post) => `
<h2>Introduction</h2>
<p>${post.excerpt}</p>
<p>Modern DevOps practices are essential for delivering software quickly and reliably. ${post.title} is a fundamental concept every team should master.</p>

<h2>Why This Matters</h2>
<p>In today's fast-paced development environment, ${post.title.toLowerCase()} helps teams:</p>
<ul>
<li>Deploy with confidence and reduce risk</li>
<li>Automate repetitive tasks</li>
<li>Scale infrastructure efficiently</li>
<li>Maintain system reliability</li>
</ul>

<h2>Implementation Guide</h2>
<p>Here's a practical configuration example:</p>
<pre><code># Configuration for ${post.slug}
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3</code></pre>
<p>This configuration provides a foundation you can adapt for your specific needs.</p>

<h2>Best Practices</h2>
<p>Follow these practices for successful implementation:</p>
<ul>
<li>Infrastructure as Code: Version control all configurations</li>
<li>Immutable Infrastructure: Replace rather than modify</li>
<li>Monitoring First: Observe before you optimize</li>
<li>Security by Default: Build security into your pipeline</li>
</ul>

<h2>Monitoring and Observability</h2>
<p>Effective ${post.title.toLowerCase()} requires robust monitoring. Key metrics to track include:</p>
<ul>
<li>Request latency and throughput</li>
<li>Error rates and types</li>
<li>Resource utilization</li>
<li>Deployment frequency and success rate</li>
</ul>

<h2>Conclusion</h2>
<p>${post.title} is a cornerstone of modern DevOps practice. By implementing these patterns, you'll build more reliable systems and ship faster with confidence.</p>
`,

  'web-development': (post) => `
<h2>Introduction</h2>
<p>${post.excerpt}</p>
<p>Building great web experiences requires attention to detail and an understanding of modern best practices. ${post.title} is essential for creating fast, accessible, and maintainable websites.</p>

<h2>Core Concepts</h2>
<p>The web platform provides powerful APIs and features. Understanding ${post.title.toLowerCase()} helps you leverage these effectively for better user experiences.</p>
<p>Modern browsers support increasingly sophisticated features, making it easier than ever to build rich web applications without heavy frameworks.</p>

<h2>Implementation</h2>
<p>Here's how to implement these techniques:</p>
<pre><code>/* CSS for ${post.slug} */
.component {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  container-type: inline-size;
}

@container (min-width: 400px) {
  .component__item {
    display: flex;
    align-items: center;
  }
}</code></pre>
<p>This approach provides responsive behavior while keeping the code maintainable.</p>

<h2>Performance Considerations</h2>
<p>When implementing ${post.title.toLowerCase()}, consider these performance aspects:</p>
<ul>
<li>Minimize render-blocking resources</li>
<li>Optimize images and media</li>
<li>Use efficient CSS selectors</li>
<li>Leverage browser caching</li>
</ul>

<h2>Accessibility</h2>
<p>Ensure your implementation is accessible:</p>
<ul>
<li>Use semantic HTML elements</li>
<li>Provide sufficient color contrast</li>
<li>Support keyboard navigation</li>
<li>Include appropriate ARIA attributes when needed</li>
</ul>

<h2>Browser Support</h2>
<p>Check current browser support for features you use. Progressive enhancement ensures your site works for everyone while providing enhanced experiences for modern browsers.</p>

<h2>Conclusion</h2>
<p>${post.title} is a valuable technique for modern web development. By following these guidelines, you'll create better experiences for your users.</p>
`,

  tutorials: (post) => `
<h2>Overview</h2>
<p>${post.excerpt}</p>
<p>This tutorial will walk you through the complete process step by step. By the end, you'll have a working implementation you can extend for your own projects.</p>

<h2>Prerequisites</h2>
<p>Before starting, make sure you have:</p>
<ul>
<li>Node.js 18 or later installed</li>
<li>A code editor (VS Code recommended)</li>
<li>Basic knowledge of JavaScript/TypeScript</li>
<li>Git for version control</li>
</ul>

<h2>Step 1: Project Setup</h2>
<p>First, create a new project directory and initialize it:</p>
<pre><code>mkdir ${post.slug}-project
cd ${post.slug}-project
npm init -y
npm install typescript @types/node --save-dev
npx tsc --init</code></pre>
<p>This creates a basic TypeScript project structure.</p>

<h2>Step 2: Core Implementation</h2>
<p>Now let's implement the main functionality:</p>
<pre><code>// src/index.ts
interface Config {
  name: string;
  version: string;
}

export function initialize(config: Config): void {
  console.log(\`Initializing \${config.name} v\${config.version}\`);
  // Add your implementation here
}

// Usage
initialize({ name: '${post.slug}', version: '1.0.0' });</code></pre>

<h2>Step 3: Adding Features</h2>
<p>Extend the basic implementation with additional features:</p>
<ul>
<li>Error handling and validation</li>
<li>Configuration options</li>
<li>Logging and debugging</li>
<li>Testing setup</li>
</ul>

<h2>Step 4: Testing</h2>
<p>Set up testing to verify your implementation:</p>
<pre><code>// tests/index.test.ts
import { initialize } from '../src';

describe('${post.title}', () => {
  it('should initialize correctly', () => {
    expect(() => initialize({ name: 'test', version: '1.0.0' })).not.toThrow();
  });
});</code></pre>

<h2>Step 5: Deployment</h2>
<p>Finally, prepare your project for deployment:</p>
<ul>
<li>Build the production bundle</li>
<li>Set up environment variables</li>
<li>Configure your hosting platform</li>
<li>Set up CI/CD pipeline</li>
</ul>

<h2>Next Steps</h2>
<p>Now that you have a working implementation, consider these enhancements:</p>
<ul>
<li>Add more comprehensive error handling</li>
<li>Implement caching for better performance</li>
<li>Add documentation with JSDoc comments</li>
<li>Create a CLI wrapper</li>
</ul>

<h2>Conclusion</h2>
<p>You've successfully completed this tutorial on ${post.title.toLowerCase()}! Use this foundation to build more complex applications and explore related topics.</p>
`
};

// Generate content for each post
for (const post of index.posts) {
  const template = contentTemplates[post.category];
  if (!template) {
    console.warn(`No template for category: ${post.category}`);
    continue;
  }

  const postData = {
    ...post,
    tags: generateTags(post.category, post.slug),
    content: template(post).trim(),
    relatedPosts: findRelatedPosts(index.posts, post)
  };

  const postDir = join(dataDir, 'posts', post.category);
  const postPath = join(postDir, `${post.slug}.json`);

  // Ensure directory exists
  mkdirSync(postDir, { recursive: true });

  // Write post file
  writeFileSync(postPath, JSON.stringify(postData, null, 2));
  console.log(`Created: ${postPath}`);
}

function generateTags(category, slug) {
  const tagsByCategory = {
    javascript: ['javascript', 'es6', 'web', 'frontend', 'programming'],
    typescript: ['typescript', 'types', 'static-typing', 'javascript'],
    devops: ['devops', 'infrastructure', 'automation', 'cloud'],
    'web-development': ['html', 'css', 'web', 'frontend', 'performance'],
    tutorials: ['tutorial', 'guide', 'learn', 'hands-on']
  };

  const baseTags = tagsByCategory[category] || [];
  const slugWords = slug.split('-').filter(w => w.length > 3);
  return [...new Set([...baseTags.slice(0, 2), ...slugWords.slice(0, 2)])].slice(0, 4);
}

function findRelatedPosts(posts, currentPost) {
  return posts
    .filter(p => p.category === currentPost.category && p.slug !== currentPost.slug)
    .slice(0, 3)
    .map(p => p.slug);
}

console.log(`\\nGenerated ${index.posts.length} post files!`);
