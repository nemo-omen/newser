import { dummyData } from '../model.js';
import { config } from '../config.js'


const ArticleModel = (function () {
   // const articleCache = {
   //    'Elon Musk': [...dummyData.articles],
   // };

   /**
    * @typedef {Object} {term:string, cache:Article[]}
    */
   const articleCache = {};

   const getArticles = function (term) {
      // keep using dummy data for now so we don't
      // use up all of the APIs limited calls
      return dummyData.articles;
   };

   // receive a search term
   return function (term) {
      // check the cackhe for that term, that way we can load fast
      // during the current 'session'
      if (!articleCache.hasOwnProperty(term)) {
         articleCache[term] = getArticles(term);
      }

      return articleCache[term];
   };
}());

export { ArticleModel };