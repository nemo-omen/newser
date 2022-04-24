import { Article } from './Article.js';

const Home = function (articles) {
   if (articles === undefined) {
      articles = [];
   }

   return articles.map(function (article) {
      return Article(article);
   }).join('');
};

export { Home };