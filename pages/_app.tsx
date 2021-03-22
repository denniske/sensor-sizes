import theme from '../src/theme'
import '../styles/globals.css'
import {MuiThemeProvider} from '@material-ui/core';

function MyApp({ Component, pageProps }) {
  return  (
      <MuiThemeProvider theme={theme} >
        <Component {...pageProps} />
      </MuiThemeProvider>
  );
}

export default MyApp
