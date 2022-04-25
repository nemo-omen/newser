import { ArticleModel } from '../models/articles.model.js';

const SearchController = (function () {

   const headerSearchInput = document.querySelector('#header-search-input');
   const mainSearchInput = document.querySelector('#main-search-input');
   const inputs = [headerSearchInput, mainSearchInput];

   inputs.forEach(function (input) {
      console.log(typeof input);
   });

});

export { SearchController };