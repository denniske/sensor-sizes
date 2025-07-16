import theme from '../src/theme'
import '../styles/globals.css'
import { ThemeProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps }) {
  return  (
      <ThemeProvider theme={theme} >
        <Component {...pageProps} />
      </ThemeProvider>
  );
}

export default MyApp
