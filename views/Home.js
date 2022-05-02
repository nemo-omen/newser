import { buildTemplate } from './buildTemplate.js';
import { Article } from './Article.js';


const Home = function () {
   const templateHTML = `
   <div class="body-search">
      <h2>Search for something!</h2>
      <div class="search-control">
         <input type="search" name="search" id="body-search-input" class="search-input" placeholder="Search">
         <button class="header-button" id="body-search-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c">
               <path
                  d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z" />
            </svg>
         </button>
      </div>
   </div>
   `;

   return buildTemplate(templateHTML);
};

export { Home };