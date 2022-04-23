/**
 * Manage color-scheme settings — localStorage, setting attributes on root HTML
 * element, toggling between color schemes.
 */
const scheme = function () {
   // grab localStorage
   const storage = window.localStorage;

   let currentScheme;

   /**
    * Sets currentScheme, localStorage['newser-color-scheme'], and <html data-color-scheme>
    * according to given scheme argument
    * @param {string} schemeName - 'light' | 'dark'
    */
   const setScheme = function (schemeName) {
      currentScheme = schemeName;
      storage.setItem('newser-color-scheme', currentScheme);
      document.documentElement.setAttribute('data-scheme', currentScheme);
   };

   // check if color scheme value exists in localStorage
   if(typeof storage.getItem('newser-color-scheme') === 'string') {
      // set scheme according to localStorage if so
      setScheme(storage.getItem('newser-color-scheme'));
   } else {

      // otherwise, attempt to check for user, OS-level, color scheme preference (it's just polite)
      // @note: This can all be done with a simple 'prefers-color-scheme' media queries and custom 
      // properties, but the media query doesn't always work, so it's nice to provide a means for the
      // user to set it themselves
      
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setScheme('dark');
      } else {
         setScheme('light');
      }
   }

   return Object.freeze({
      currentScheme,
      setScheme,
      getScheme: () => currentScheme
   });
};


/**
 * Gets the proper SVG graphic depending on the given color scheme
 * value ('light' | 'dark')
 * @param {string} schemeName 'light' | 'dark'
 * @returns  {string}  SVG string of graphic for homepage color scheme button
 */
const getColorSchemeButton = function (schemeName) {
   // just hardcode some templates as properties that will match
   // one of the expected arguments
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

export { scheme, getColorSchemeButton };