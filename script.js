import { config } from './config.js';
import { router } from './controllers/route.controller.js';
import { scheme, getColorSchemeButton } from './controllers/scheme.controller.js';
import { ArticleModel } from './models/articles.model.js';
import { SearchController } from './controllers/search.controller.js'

const colorScheme = scheme();
const schemeToggleButton = document.querySelector('#scheme-toggle')


document.addEventListener('DOMContentLoaded', async function () {
   schemeToggleButton.innerHTML = getColorSchemeButton(colorScheme.getScheme());
   router.loadPage(window.location.href, await ArticleModel());
});

document.addEventListener('click', async function (event) {
   if (!event.target.matches('[data-route]')) {
      return;
   }

   // prevent links from navigating away from the page
   event.preventDefault();

   // send the target element's href to the router
   router.loadPage(event.target.href, await ArticleModel('San Angelo'));
});

schemeToggleButton.addEventListener('click', function () {
   if (colorScheme.getScheme() === 'light') {
      colorScheme.setScheme('dark');
   } else {
      colorScheme.setScheme('light');
   }
   schemeToggleButton.innerHTML = getColorSchemeButton(colorScheme.getScheme());
});