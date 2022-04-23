import { Article } from '../views/Article.js';

const router = (function () {
   const outlet = document.querySelector('main');

   const routes = {
      home: function (posts) {
         console.log(posts);
         return posts.map(function (post) {
            return Article(post);
         }).join(',');
      },
      bookmarks: '',
      saved: '',
   };


   /**
   * Convert href string into a URL object and return URL.pathname
   * so we can avoid getting mired in regex (winning!)
   * @param {string} href href attribute of a link
   * @returns URL object
   * @see: https://developer.mozilla.org/en-US/docs/Web/API/URL
   */
  const getPath = function (href) {
     return new URL(href).pathname;
  };

  /**
    * Splits a given URL pathName property and returns the last element
    * @param {string} path  URL pathName property
    * @returns the last part of the path as a string
    */
   const getLastSegment = function (path) {
      return path.split('/').slice(1)[0];
   };

   /**
    * Use the browser's history API to push the
    * address to the browser history and display
    * it in the address bar.
    * @param {string: href} href 
    * @see: https://gomakethings.com/how-to-update-a-url-without-reloading-the-page-using-vanilla-javascript/
    */
   const setState = function (href) {
      const pathId = getLastSegment(getPath(href))[0];
      const title = pathId.charAt(0).toUpperCase() + pathId.slice(1);
      history.pushState({id: pathId}, `Newser | ${title}`, href);
   };

   const loadPage = function (page) {
      console.log(getLastSegment(getPath(page)));
      console.log(routes[page]);
      outlet.innerHTML = routes[page];
   };

   return Object.freeze({
      loadPage
   });
}());

export { router };