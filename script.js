/*jslint browser */

/**
 * Title: Newser
 * Author: Jeff Caldwell
 * Class: CS 3312 - Web Programming
 * Date: May 5, 2022
 */

// Configuration options for API calls
import { config } from './config.js';

// UI view functions
import { ArticleList, Default, SearchError, SearchEmpty } from './views.js'


document.addEventListener('DOMContentLoaded', function () {
   // grab localStorage, we'll be using it a lot, 
   // so we may as well declare it at the top!
   const storage = window.localStorage;

   // just a nice place to keep track of the app's state
   // mostly modeled after examples in previous labs
   const createAppModel = function (oldState) {
      let state = {
         scheme: '',
         articles: [],
         bookmarks: [],
      };

      if (typeof oldState === 'string') {
         state = {...JSON.parse(oldState)}
      }

      return Object.freeze({
         getState: () => JSON.stringify(state),
         setScheme: function (schemeName) {
            state.scheme = schemeName
         },
         getScheme: () => state.scheme,
         setArticles: function (articleArray) {
            state.articles = [...articleArray];
         },
         getArticles: () => state.articles,
         setBookmarks: function (bookmarksArray) {
            state.bookmarks = [...bookmarksArray];
         },
         getBookmarks: () => state.bookmarks,
         addBookmark: function (article) {
            state.bookmarks.push(article);
         }
      });
   };


   /**
    * Renders a view into the DOM, specifically appends
    * a DOM tree fragment into <main>
    * @param {string} route  The page to load
    * @param {object} options  An options object, generally a list of articles
    */
      const loadView = function (route, options) {
         /**
          * Renders a given DOMNode into the DOM
          * @param {DOMNode} node  the DOM tree to load into the outlet
          */
         const render = function (node) {
            const outlet = document.querySelector('main');
            outlet.innerHTML = '';
            outlet.appendChild(node);
         };
   
         const pages = {
            default: function (options) {
               return Default();
            },
            articles: function (options) {
               return ArticleList(options.articles)
            },
            empty: function (options) {
               return SearchEmpty(options.term)
            },
            error: function (options) {
               return SearchError(options.error);
            }
         };
   
         render(pages[route](options));
      };

      const search = async function (term) {
         // guard against empty search term
         if (term.length < 1) {
            return;
         }

         // make fetch call
         const response = await fetch(`${config.apiUrl}${term}&lang=${config.apiLang}`, config.fetchOptions);
   
         // check if response.ok
         if (!response.ok) {
            // if not, display error
            loadView('SearchError', response.statusText);
         }
   
         // parse response
         return await response.json();
      };

      const getColorSchemeButton = function (schemeName) {
         const schemeTemplates = {
            light: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c">
               <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>
               </svg>`,
            dark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c">
            <path
               d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
               </svg>`,
         };
         // easy-match schemeTemplate property according to expected args
         return schemeTemplates[schemeName];
      };

   (function app() {
      let appModel;
      const schemeToggleButton = document.querySelector('#scheme-toggle');

      const updateApp = function () {
         // store app's state
         storage.setItem('newser-state', appModel.getState());
         document.documentElement.setAttribute('data-scheme', appModel.getScheme());
         renderPageState(appModel.getArticles());
      };

      appModel = createAppModel();

      const checkBookmarked = function (id) {
         const currentBookmarks = appModel.getBookmarks();
         // no need to bother if model.state.bookmarks is empty!
         if (currentBookmarks.length < 1) {
            return;
         }

         const exists = currentBookmarks.filter(function (bookmark) {
            return bookmark._id === id;
         })[0];

         return exists;
      };

      const bookmark = function (article) {
         if (checkBookmarked(article.id) === undefined) {
            appModel.addBookmark(article);
            updateApp();
         }
      };

      const renderPageState = function (data) {
         // sort parsed article data by date
         if (data.length < 1) {
            // load empty template
            loadView('empty', {term});
         } else {
            // otherwise load returned articles
            loadView('articles', {articles: data});
            // articlesModel.setArticleNodes(Array.from(document.querySelectorAll('.card')));
   
            // get all the bookmark buttons that were just created
            document.querySelectorAll('.bookmark-button').forEach(function (button) {
               // add click listener to all article bookmark buttons
               button.addEventListener('click', function (event) {
                  const bookmarkArticle = appModel.getArticles().filter(function (article) {
                     return article._id === event.target.dataset.id;
                  })[0];

                  bookmark(bookmarkArticle, data.articles);
                  button.classList.add('bookmarked');
               });
               // use the data-id attrinute to check whether it exists in current bookmarks
               const isBookmarked = checkBookmarked(button.dataset.id);
               if (isBookmarked) {
                  button.classList.add('bookmarked');
               } else {
                  button.classList.remove('bookmarked');
               }
            });
         }
      };

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
         appModel.setScheme('dark');
      } else {
         appModel.setScheme('light');
      }

      schemeToggleButton.innerHTML = getColorSchemeButton(appModel.getScheme());

      schemeToggleButton.addEventListener('click', function () {
         if (appModel.getScheme() === 'light') {
            appModel.setScheme('dark');
         } else {
            appModel.setScheme('light');
         }
         schemeToggleButton.innerHTML = getColorSchemeButton(appModel.getScheme());
         updateApp();
      });

      // grab the search input
      const searchInput = document.querySelector('#header-input');

      // add an enter key listener
      searchInput.addEventListener('keydown', async function (event) {
         // guard against all keys but 'Enter'
         if (event.key !== 'Enter') {
            return;
         }

         const data = await search(searchInput.value);

         const sorted = data.articles.sort(function (a,b) {
            return new Date(b.published_date) - new Date(a.published_date);
         });

         appModel.setArticles(sorted);
         updateApp();
         renderPageState(appModel.getArticles());
      });

      // add a click listener to the input button
      document.querySelector('#search-button').addEventListener('click', async function () {
         const data = await search(searchInput.value);
         const sorted = data.articles.sort(function (a,b) {
            return new Date(b.published_date) - new Date(a.published_date);
         });

         appModel.setArticles(sorted);
         updateApp();
         renderPageState(appModel.getArticles());
      });

      appModel = createAppModel(storage.getItem('newser-state'));
      console.log(appModel.getState());
      updateApp();
   }());

   // I'm pretty much lifting this right from Studio 8
   (function bookmarks() {

      const createBookmarks = function (oldState) {
         let state = {
            bookmarks: []
         };

         if (typeof oldState === 'string') {
            state = {...JSON.stringify(oldState)};
         }

         return Object.freeze({
            getState: () => JSON.stringify(state),
            getBookmarks: () => state.bookmarks,
            setBookmark: function (article) {
               state.bookmarks.push(article);
            },
            removeBookmark: function (id) {
               state.bookmarks = state.bookmarks.filter(function (article) {
                  return article.id !== id;
               });
            }
         });
      };

      (function () {
         let bookmarkModel;

         const updateBookmarks = function () {
            localStorage.setItem('newser-bookmarks', JSON.stringify(bookmarkModel.getBookmarks()));
            console.log(bookmarkModel.getBookmarks());
         };

         bookmarkModel = createBookmarks(storage.getItem('newser-bookmarks'));

         document.querySelector('#bookmarks-button').addEventListener('click', function () {
            updateBookmarks();
         })
      }());

   }());


}());