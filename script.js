fetch('articles.json')
  .then(response => response.json())
  .then(articles => {
    const container = document.querySelector('.content');
    container.innerHTML = '';

    articles.forEach(article => {
      const card = document.createElement('div');
      card.innerHTML = `
        <h2><a href="${article.content}">${article.title}</a></h2>
        <p><strong>مصنف:</strong> ${article.author}</p>
        <p>${article.excerpt}</p>
        <hr>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading articles:", error);
  });
