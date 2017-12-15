const apiKey = '0ec2115b7e844a1f9c67e638e01f6460';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#source');
const defaultSource = 'the-washington-post';
window.addEventListener('load',async e=>{
	updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;
    sourceSelector.addEventListener('change',e=>{
        updateNews(e.target.value);      
    });   
});

if('serviceWorker' in navigator){
  try{
    navigator.serviceWorker.register('sw.js');
    console.log('serviceWorker registered');
  }catch(error){
    console.log('SW not registered');
  }
}

async function updateSources() {
  const response = await fetch(`https://newsapi.org/v1/sources?apiKey=${apiKey}`);
  const json = await response.json();
    sourceSelector.innerHTML = json.sources
      .map(source => `<option value="${source.id}">${source.name}</option>`)
      .join('\n');
}

async function updateNews(source = defaultSource) {
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`);
	const json = await res.json();
	main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
return `
 <div class="article">
    <a href = "${article.URL}"></a>
        <h2>${article.title}</h2>
        <img src = "${article.urlToImage}">
        <h4>${article.description}</h4>
    </a>
  </div>
`;
}