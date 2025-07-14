document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('article-list');
  const search = document.getElementById('search');
  const category = document.getElementById('category-filter');
  const themeToggle = document.getElementById('toggle-theme');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  fetch('data/articles.json')
    .then(res => res.json())
    .then(articles => {
      function render(filtered) {
        list.innerHTML = '';
        filtered.forEach(article => {
          const el = document.createElement('article');
          el.innerHTML = `
            <h2><a href="${article.content}">${article.title}</a></h2>
            <p><strong>${article.author}</strong> | ${article.category}</p>
            <p>${article.excerpt}</p>
          `;
          list.appendChild(el);
        });
      }

      search.addEventListener('input', () => {
        const q = search.value.toLowerCase();
        const filtered = articles.filter(a => 
          a.title.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q)
        );
        render(filtered);
      });

      category.addEventListener('change', () => {
        const c = category.value;
        const filtered = c ? articles.filter(a => a.category === c) : articles;
        render(filtered);
      });

      render(articles);
    });
});