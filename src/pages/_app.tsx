import { AppProps } from 'next/app';
import 'semantic-ui-css/semantic.min.css';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@/styles/global';
import { wrapper } from '@/store/store';

const theme = {
  colors: {
    primary: `#fafafa`,
  },
};

const MunroUI = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default wrapper.withRedux(MunroUI);
