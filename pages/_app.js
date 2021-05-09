import "normalize.css";
import "@styles/globals/globals.css";
import "@styles/globals/theme.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'normalize.css/normalize.css';
import React, { useEffect } from 'react';

import { MantineProvider } from '@mantine/core';


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.getElementById('mantine-ssr-styles');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return(
    
      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          fontFamily: 'Open Sans, sans-serif',
          lineHeight: 1.2,
          primaryColor: 'indigo', 
        headings: { fontFamily: 'Roboto Slab, system-ui, serif' },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>

     );
}

export default MyApp;
