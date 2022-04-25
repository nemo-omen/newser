import { Article } from './Article.js';

const Home = function (articles) {

   console.log(articles);
   if (articles === undefined) {
      articles = [];
   }

   const template = document.createElement('template');

   template.innerHTML = articles.map(function (article) {
      return Article(article);
   }).join('');

   
   const tpl = template.content.cloneNode(true);
   const bookmarkButtons = tpl.querySelectorAll('[data-id]');
   
   bookmarkButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
         event.stopPropagation();
         console.log(event.target);
      });
   });

   return tpl;

};

export { Home };