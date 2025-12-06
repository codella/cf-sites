/**
 * Example client-side JavaScript that expands page content dynamically.
 * This demonstrates how static HTML can be enhanced with JavaScript
 * that runs in the browser.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('expanded-content');

  // Simulate fetching or generating dynamic content
  const dynamicData = [
    {
      title: 'Feature One',
      description: 'This content was added dynamically by JavaScript running in your browser.'
    },
    {
      title: 'Feature Two',
      description: 'Client-side JavaScript can fetch data, render templates, and create interactive experiences.'
    },
    {
      title: 'Feature Three',
      description: 'The static HTML provides the foundation, while JavaScript expands and enhances it.'
    }
  ];

  // Clear loading state and render dynamic content
  container.innerHTML = '';

  dynamicData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(card);
  });

  // Add timestamp to show when content was generated
  const timestamp = document.createElement('p');
  timestamp.style.marginTop = '1rem';
  timestamp.style.fontSize = '0.875rem';
  timestamp.style.color = '#64748b';
  timestamp.textContent = `Content generated at: ${new Date().toLocaleString()}`;
  container.appendChild(timestamp);
});
