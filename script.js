document.addEventListener('DOMContentLoaded', () => {
  fetch('articles.json')
    .then(response => response.json())
    .then(data => {
      const contentDiv = document.querySelector('.content');

      data.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.style.marginBottom = '40px';

        articleCard.innerHTML = `
          <h2>${article.title}</h2>
          <p><strong>مصنف:</strong> ${article.author}</p>
          <p><strong>اقتباس:</strong> ${article.excerpt}</p>
          <a href="${article.content}" style="color: blue; text-decoration: underline;">مکمل مضمون پڑھیں</a>
        `;

        contentDiv.appendChild(articleCard);
      });
    })
    .catch(error => {
      console.error('Error loading articles:', error);
    });
});
