import React, { useEffect } from 'react';

// THIS IS EXAMPLE CODE FOR THE TRANSLATE IMPLEMENTATION. COPYING THESE 2 BLOCKS INTO ANY PAGE WILL ADD THE WORKING TRANSLATE WIDGET.
/**
 * 
 * @returns The translate function that works across the website. 
 */
function MyComponent() {
  useEffect(() => {
    // Load the Google Translate API script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Define the `googleTranslateElementInit` function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };
  }, []);

  return (
    <div>
      <div id="google_translate_element"></div>
      <p>Hello, world!</p>
    </div>
  );
}
export default MyComponent;

