// Packages
import 'preact/debug';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

// Definitions
import { AppProps } from 'next/app';

// Store
import store from '@/src/redux/';

// App's theme
import CarcomTheme from '@/theme/carcom';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={CarcomTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
