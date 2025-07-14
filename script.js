document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('article-list');
  const categoryButtons = document.querySelectorAll('#category-list button');

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

      categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const c = btn.dataset.category;
          const filtered = c ? articles.filter(a => a.category === c) : articles;
          render(filtered);
        });
      });

      render(articles);
    });
});