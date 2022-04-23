import { config } from './config.js';
import { router } from './controllers/route.controller.js';

import { scheme, getColorSchemeButton } from './controllers/scheme.controller.js';

const main = document.querySelector('main');
const colorScheme = scheme();
const schemeToggleButton = document.querySelector('#scheme-toggle')

// ArticleList('main', dummyData.articles);

document.addEventListener('DOMContentLoaded', function () {
   schemeToggleButton.innerHTML = getColorSchemeButton(colorScheme.getScheme());
   router.loadPage(window.location.href);
});

document.addEventListener('click', function (event) {
   if (!event.target.matches('[data-route]')) {
      return;
   }

   // prevent links from navigating away from the page
   event.preventDefault();

   // send the target element's href to the router
   router.loadPage(event.target.href);
});

schemeToggleButton.addEventListener('click', function () {
   if (colorScheme.getScheme() === 'light') {
      colorScheme.setScheme('dark');
   } else {
      colorScheme.setScheme('light');
   }
   schemeToggleButton.innerHTML = getColorSchemeButton(colorScheme.getScheme());
});