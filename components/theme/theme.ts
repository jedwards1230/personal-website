import { CssVarsThemeOptions, extendTheme } from '@mui/joy/styles';
import colors from '@mui/joy/colors';
import { deepmerge } from '@mui/utils';
import { Theme as JoyTheme } from '@mui/joy/styles';
import type { } from '@mui/material/themeCssVarsAugmentation';
import {
    experimental_extendTheme as extendMuiTheme,
    PaletteColor,
    TypeText,
    TypeAction,
    Overlays,
    PaletteColorChannel,
    PaletteAlert,
    PaletteAppBar,
    PaletteAvatar,
    PaletteChip,
    PaletteFilledInput,
    PaletteLinearProgress,
    PaletteSlider,
    PaletteSkeleton,
    PaletteSnackbarContent,
    PaletteSpeedDialAction,
    PaletteStepConnector,
    PaletteStepContent,
    PaletteSwitch,
    PaletteTableCell,
    PaletteTextChannel,
    PaletteTooltip,
    Shadows,
    ZIndex,
    CommonColors,
    TypeBackground,
} from '@mui/material/styles';

type JoyComponents = CssVarsThemeOptions['components'];

// extends Joy theme to include tokens from Material UI
declare module '@mui/joy/styles' {
    interface Palette {
        secondary: PaletteColorChannel;
        error: PaletteColorChannel;
        dividerChannel: string;
        action: TypeAction;
        Alert: PaletteAlert;
        AppBar: PaletteAppBar;
        Avatar: PaletteAvatar;
        Chip: PaletteChip;
        FilledInput: PaletteFilledInput;
        LinearProgress: PaletteLinearProgress;
        Skeleton: PaletteSkeleton;
        Slider: PaletteSlider;
        SnackbarContent: PaletteSnackbarContent;
        SpeedDialAction: PaletteSpeedDialAction;
        StepConnector: PaletteStepConnector;
        StepContent: PaletteStepContent;
        Switch: PaletteSwitch;
        TableCell: PaletteTableCell;
        Tooltip: PaletteTooltip;
    }
    interface PalettePrimary extends PaletteColor { }
    interface PaletteInfo extends PaletteColor { }
    interface PaletteSuccess extends PaletteColor { }
    interface PaletteWarning extends PaletteColor { }
    interface PaletteCommon extends CommonColors { }
    interface PaletteText extends TypeText { }
    interface PaletteBackground extends TypeBackground { }

    interface ThemeVars {
        // attach to Joy UI `theme.vars`
        shadows: Shadows;
        overlays: Overlays;
        zIndex: ZIndex;
    }
}

declare module '@mui/material/styles' {
    interface Theme {
        // put everything back to Material UI `theme.vars`
        vars: JoyTheme['vars'];
    }
}

const muiTheme = extendMuiTheme({
    // This is required to point to `var(--joy-*)` because we are using `CssVarsProvider` from Joy UI.
    cssVarPrefix: 'joy',
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: colors.blue[500],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[500],
                },
                info: {
                    main: colors.purple[500],
                },
                success: {
                    main: colors.green[500],
                },
                warning: {
                    main: colors.yellow[200],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: `rgba(${colors.blue[300]}, 0.9)`,
                text: {
                    primary: colors.grey[100],
                    secondary: colors.grey[200],
                },
                background: {
                    default: '#121212',
                    paper: '#121212'
                }
            },
        },
        dark: {
            palette: {
                primary: {
                    main: colors.blue[600],
                },
                grey: colors.grey,
                error: {
                    main: colors.red[600],
                },
                info: {
                    main: colors.purple[600],
                },
                success: {
                    main: colors.green[600],
                },
                warning: {
                    main: colors.yellow[300],
                },
                common: {
                    white: '#FFF',
                    black: '#09090D',
                },
                divider: `rgba(${colors.grey[800]}, 0.12)`,
                text: {
                    primary: colors.grey[900],
                    secondary: colors.grey[800],
                },
                background: {
                    default: '#121212',
                    paper: '#121212'
                }
            },
        },
    },
});

const joyTheme = extendTheme();

const theme = deepmerge(muiTheme, joyTheme);

export default theme;