import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

// App's theme
import CarcomTheme from '@/theme/carcom';
import { AppContextProvider } from '@/ctx/app-context';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <ThemeProvider theme={CarcomTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default MyApp;
