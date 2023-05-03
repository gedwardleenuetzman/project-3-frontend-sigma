import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from "next-auth/react"
import theme from '../src/theme';

import createEmotionCache from '../src/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, session } = props;

  React.useEffect(() => {
    const script = document.createElement('script');

    script.type = 'text/javascript';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = false;

    document.body.appendChild(script);
   
    window.googleTranslateElementInit = () => {
      const googleTranslateElement = document.getElementById('google_translate_element');
      googleTranslateElement.innerHTML = '';
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
    };
  
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          <Component {...pageProps} />
          
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};