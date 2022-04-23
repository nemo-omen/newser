import { Article } from './Article.js';

const ArticleList = function (selector, posts) {
   posts.forEach(function (post) {
      document.querySelector(selector).innerHTML += Article(post);
   });
};

export { ArticleList };