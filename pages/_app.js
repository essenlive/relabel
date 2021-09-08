import "@styles/globals/globals.css";
import "@styles/globals/theme.css";
import "@styles/globals/map.css";
import 'mapbox-gl/dist/mapbox-gl.css';
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
          fontFamily: "'Barlow', 'system-ui', '-apple-system', 'BlinkMacSystemFont'",
          lineHeight: 1.2,
          primaryColor: 'teal', 
          headings: { fontFamily: "'Barlow', 'system-ui', '-apple-system', 'BlinkMacSystemFont'" },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>

     );
}

export default MyApp;
