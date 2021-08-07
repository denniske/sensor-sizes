import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#006EF8',
            // main: '#19857b',
            // dark: '#19857b',
            // light: '#19857b',
        },
        // error: {
        //     main: '#19857b',
        //     dark: '#19857b',
        //     light: '#19857b',
        // },
        // warning: {
        //     main: '#19857b',
        //     dark: '#19857b',
        //     light: '#19857b',
        // },
        // info: {
        //     main: '#19857b',
        //     dark: '#19857b',
        //     light: '#19857b',
        // },
        // success: {
        //     main: '#19857b',
        //     dark: '#19857b',
        //     light: '#19857b',
        // },
        // text: {
        //     primary:'#556cd6',
        //     secondary: '#19857b',
        // },

        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;
