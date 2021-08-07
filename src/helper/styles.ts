import * as CSS from 'csstype';
import {Property} from "csstype";
import {makeStyles} from "@material-ui/core/styles";
import {Theme as DefaultTheme} from "@material-ui/core/styles/createTheme";
import {merge} from 'lodash';

interface StandardCSSProperties extends CSS.Properties<number | string> {}

interface CustomCSSProperties extends CSS.Properties<number | string> {
    'marginHorizontal'?: Property.MarginBottom<number | string>;
    'marginVertical'?: Property.MarginBottom<number | string>;
    'paddingVertical'?: Property.PaddingBottom<number | string>;
}

type CustomCssStyles = Record<string, StandardCSSProperties>;

type NamedStyles<T> = { [P in keyof T]: CustomCSSProperties };
type NamedClasses<T> = { [P in keyof T]: string };

type StyleFromProp<T> = (props?: any) => NamedClasses<T>;

function processStyles(styles: any) {
    for (const className in styles) {
        const props = Object.keys(styles[className]);
        if (props.includes('marginVertical')) {
            styles[className].marginTop = styles[className]['marginVertical'];
            styles[className].marginBottom = styles[className]['marginVertical'];
            delete styles[className].marginVertical;
        }
        if (props.includes('marginHorizontal')) {
            styles[className].marginLeft = styles[className]['marginHorizontal'];
            styles[className].marginRight = styles[className]['marginHorizontal'];
            delete styles[className].marginVertical;
        }
        if (props.includes('paddingVertical')) {
            styles[className].paddingTop = styles[className]['paddingVertical'];
            styles[className].paddingBottom = styles[className]['paddingVertical'];
            delete styles[className].paddingVertical;
        }
        if (props.includes('paddingHorizontal')) {
            styles[className].paddingLeft = styles[className]['paddingHorizontal'];
            styles[className].paddingRight = styles[className]['paddingHorizontal'];
            delete styles[className].paddingVertical;
        }
        if (props.includes('flexDirection')) {
            styles[className].display = 'flex';
        }
    }
    return styles;
}

export function createStylesheet<T extends NamedStyles<T>>(styles: (theme: DefaultTheme) => T): StyleFromProp<T> {
    // console.log(styles);
    const mystyles = styles as any;
    return makeStyles(theme => {
        const mytheme = 'light'; //theme.palette.type === 'light' ? light : dark;
        return processStyles(mystyles(merge(theme, mytheme)));
    }) as any as StyleFromProp<T>;
}
