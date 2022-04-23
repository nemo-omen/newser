const Article = function (article) {
   return `<article class="card">
      <div class="article-media">
         ${article.media ? `<img class="article-image" src="${article.media}" width="400">` : ''}
      </div>
      <div class="article-content">
         <div class="article-header">
            <h2 class="article-title">${article.title.length > 65 ? article.title.substring(0, 65).trim() + '...' : article.title}</h2>
            <div class="article-info">
               <span class="article-source">${article.rights}</span>
               <time class="article-date">${new Date(article.published_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</time>
            </div>
         </div>
         <a href="${article.link}" class="content-link">
            <div class="article-body">
               <p>${article.summary.substring(0, 150)}...</p>
            </div>
         </a>
         <div class="article-footer">
            <a href="${article.link}" class="icon-link">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c">
                  <path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"/>
               </svg>
            </a>
            <button class="icon-button" data-id="${article._id}" aria-label="Bookmark this story.">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c">
                  <path d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z"/>
               </svg>
            </button>
         </div>
      </div>
      <span class="article-message hidden">Link Copied!</span>
   </article>`;
};

export { Article }