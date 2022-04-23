import { Article } from './Article.js';
import { dummyData } from '../model.js';

const Home = function (outlet) {
   
   dummyData.articles.forEach(function (post) {
      outlet.innerHTML += Article(post);
   });

   return dummyData.articles.map(function (article) {
      return Article(article);
   }).join('');
};

export { Home };