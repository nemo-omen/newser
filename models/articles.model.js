import { dummyData } from '../model.js';
import { config } from '../config.js'


const ArticleModel = (function () {

   /**
    * @typedef {Object} {term:string, cache:Article[]}
    */
   const articleCache = {
      // just holding dummy data here
      'Elon Musk': [...dummyData.articles],
   };

   const getArticles = function (term) {
      // keep using dummy data for now so we don't
      // use up all of the APIs limited calls
      return dummyData.articles;
   };

   // receive a search term
   return function (term) {
      // double-check for term
      if (typeof term === 'string') {
         // check the cache for that term, that way we can
         // load quickly during the current 'session'
         if (!articleCache.hasOwnProperty(term)) {
            articleCache[term] = getArticles(term);
         }
         console.log(articleCache[term]);
         return articleCache[term];
      } else {
         return [];
      }
   };
}());

export { ArticleModel };