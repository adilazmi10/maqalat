// 1. Import Supabase client
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 2. Supabase credentials
const supabaseUrl = 'https://npnjpcwqmfwwviqlwrvw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wbmpwY3dxbWZ3d3ZpcWx3cnZ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMTMyMzMsImV4cCI6MjA2ODY4OTIzM30.EEbXf-xsonUjvE0DZBOGcG9EU97aGNSUc6MRTEE40pU';

const supabase = createClient(supabaseUrl, supabaseKey);

// 3. Function to load articles with joined author & category
async function loadArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      reference,
      author:authors ( id, name ),
      category:categories ( id, name )
    `)
    .order('id', { ascending: false });

  if (error) {
    console.error('Error loading articles:', error.message);
    return;
  }

  const container = document.getElementById('articles');
  container.innerHTML = '';

  articles.forEach(article => {
    const authorName = article.author?.name || 'نامعلوم';
    const authorId = article.author?.id;
    const categoryName = article.category?.name || 'غیر معروف';
    const categoryId = article.category?.id;

    const card = document.createElement('div');
    card.className = 'article-card';

    card.innerHTML = `
      <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
      <p><strong>حوالہ:</strong> ${article.reference || ''}</p>
      <p>مصنف: <a href="author.html?id=${authorId}">${authorName}</a></p>
      <p>زمرہ: <a href="category.html?id=${categoryId}">${categoryName}</a></p>
    `;

    container.appendChild(card);
  });
}

// 4. Load on page start
document.addEventListener('DOMContentLoaded', loadArticles);
