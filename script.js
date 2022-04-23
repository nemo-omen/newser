import { config } from './config.js';
import { router } from './controllers/route.controller.js';
import { ArticleList } from './views/ArticleList.js'
import { dummyData } from './model.js';
import { scheme, getColorSchemeButton } from './controllers/scheme.controller.js';

const main = document.querySelector('main');
const colorScheme = scheme();
const schemeToggleButton = document.querySelector('#scheme-toggle')

// ArticleList('main', dummyData.articles);

document.addEventListener('DOMContentLoaded', function () {
   schemeToggleButton.innerHTML = getColorSchemeButton(colorScheme.getScheme());
   // console.log(window.location);
   router.loadPage(window.location)
});

schemeToggleButton.addEventListener('click', function () {
   if (colorScheme.getScheme() === 'light') {
      colorScheme.setScheme('dark');
   } else {
      colorScheme.setScheme('light');
   }
   schemeToggleButton.innerHTML = getColorSchemeButton(colorScheme.getScheme());
});