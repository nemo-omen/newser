import { Home } from '../views/Home.js';
import { Bookmarks } from '../views/Bookmarks.js';
import { Saved } from '../views/Saved.js';
import { dummyData } from '../model.js';

const router = (function () {
   // this is where everything renders!
   const outlet = document.querySelector('main');

   // our pages
   const routes = {
         home: Home(dummyData.articles),
         bookmarks: Bookmarks(),
         saved: Saved()
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
      const pathId = getLastSegment(getPath(href));
      const title = pathId.charAt(0).toUpperCase() + pathId.slice(1);
      history.pushState({id: pathId}, `Newser | ${title}`, href);
   };

   const loadPage = function (href) {
      // get the last bit of text after the final '/'
      let pathSegment = getLastSegment(getPath(href));

      // if pathSegment is empty, it means we're at the root
      // so just assign 'home'
      if (pathSegment === '') {
         pathSegment = 'home';
      }

      // reflect location in location bar
      setState(href);

      // clear outlet html
      outlet.innerHTML = '';
      // load HTML for the page
      // outlet.innerHTML = routes[pathSegment];
      outlet.appendChild(routes[pathSegment]);
   };

   // we're only making the loadPage fn public
   return Object.freeze({
      loadPage
   });
}());

export { router };