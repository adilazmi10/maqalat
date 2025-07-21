// 1. Supabase credentials — replace with your own
const supabaseUrl = 'https://npnjpcwqmfwwviqlwrvw.supabase.co';         // 🔁 Replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmpwY3dxbWZ3d3ZpcWx3cnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTMyMzMsImV4cCI6MjA2ODY4OTIzM30.EEbXf-xsonUjvE0DZBOGcG9EU97aGNSUc6MRTEE40pU';                     // 🔁 Replace this

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. Function to load articles
async function loadArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error loading articles:', error);
    return;
  }

  const container = document.getElementById('articles');
  container.innerHTML = '';

  articles.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';

    card.innerHTML = `
      <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
      <p><strong>حوالہ:</strong> ${article.reference || ''}</p>
      <p>مصنف: <a href="author.html?name=${encodeURIComponent(article.author)}">${article.author}</a></p>
      <p>زمرہ: <a href="category.html?name=${encodeURIComponent(article.category)}">${article.category}</a></p>
    `;

    container.appendChild(card);
  });
}

// 3. Load on page start
document.addEventListener('DOMContentLoaded', loadArticles);
