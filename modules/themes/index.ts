import { createTheme, ThemeOptions, Theme } from '@mui/material/styles';

// assets
import colors from 'assets/_themes-vars.module.css';

// project imports
import componentStyleOverrides from './CompStyleOverride';
import themePalette from './Palette';
import themeTypography from './Typography';

/**
 * Represent theme style and structure as per Material-UI
 */

export const theme = () => {
    const color = colors;

    const themeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    } as ThemeOptions;

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes as Theme;
};

export default theme;
