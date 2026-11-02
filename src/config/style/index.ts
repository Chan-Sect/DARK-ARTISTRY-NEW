import {
    createTheme,
    darken,
    emphasize,
    lighten,
    type PaletteOptions,
    type SimplePaletteColorOptions,
    type PaletteMode
} from '@mui/material/styles';
import {listItemTextClasses} from "@mui/material/ListItemText";

const h = 28
const w = 44

interface PaletteCustom extends PaletteOptions
{
    primary: SimplePaletteColorOptions
    secondary: SimplePaletteColorOptions
}
type PaletteType = Record<PaletteMode, PaletteCustom>

const light: PaletteCustom =
{
    mode : 'light',
    primary     :
    {
        main         : '#9376E0',
        light        : lighten('#9376E0', 0.1),
        dark         : darken('#9376E0', 0.1),
        contrastText : emphasize('#9376E0', 0.7),
    },
    secondary   :
    {
        main         : '#958FA4',
        light        : lighten('#958FA4', 0.1),
        dark         : darken('#958FA4', 0.1),
        contrastText : emphasize('#958FA4', 0.7),
    },
    success     :
    {
        main         : '#2DEE98',
        light        : lighten('#2DEE98', 0.1),
        dark         : darken('#2DEE98', 0.1),
        contrastText : emphasize('#2DEE98', 0.7),
    },
    warning     :
    {
        main         : '#FFAB76',
        light        : lighten('#FFAB76', 0.1),
        dark         : darken('#FFAB76', 0.1),
        contrastText : emphasize('#FFAB76', 0.7),
    },
    error       :
    {
        main         : '#EC7272',
        light        : lighten('#EC7272', 0.1),
        dark         : darken('#EC7272', 0.1),
        contrastText : emphasize('#EC7272', 0.7),
    },
    info        :
    {
        main         : '#32DEEE',
        light        : lighten('#32DEEE', 0.1),
        dark         : darken('#32DEEE', 0.1),
        contrastText : emphasize('#32DEEE', 0.7),
    },
    background:
    {
        paper: '#FAF5FF',
        default: '#FFFFFF'
    }
}

const dark: PaletteCustom =
{
    mode : 'dark',
    primary     :
    {
        main         : '#548CFF',
        light        : lighten('#548CFF', 0.1),
        dark         : darken('#548CFF', 0.1),
        contrastText : emphasize('#548CFF', 0.7),
    },
    secondary   :
    {
        main         : '#97a1ba',
        light        : lighten('#97a1ba', 0.1),
        dark         : darken('#97a1ba', 0.1),
        contrastText : emphasize('#97a1ba', 0.7),
    },
    success     :
    {
        main         : '#00FFAB',
        light        : lighten('#00FFAB', 0.1),
        dark         : darken('#00FFAB', 0.1),
        contrastText : emphasize('#00FFAB', 0.7),
    },
    warning     :
    {
        main         : '#FFAB76',
        light        : lighten('#FFAB76', 0.1),
        dark         : darken('#FFAB76', 0.1),
        contrastText : emphasize('#FFAB76', 0.7),
    },
    error       :
    {
        main         : '#FF6363',
        light        : lighten('#FF6363', 0.1),
        dark         : darken('#FF6363', 0.1),
        contrastText : emphasize('#FF6363', 0.7),
    },
    info        :
    {
        main         : '#72F3FF',
        light        : lighten('#72F3FF', 0.1),
        dark         : darken('#72F3FF', 0.1),
        contrastText : emphasize('#72F3FF', 0.7),
    },
    background:
    {
        paper: '#202020',
        default: '#121212'
    }
}

const palette:PaletteType =  { light, dark }

const base = (mode: PaletteMode = 'dark') => createTheme({
    palette :
    {
        ...(palette[mode] || { }),
        text        :
        {
            primary   : palette[mode].primary.main,
            secondary : palette[mode].secondary.main,
        },
    },
    typography:
    {
        fontFamily: 'Montserrat',

        h1:
        {
            fontWeight: 800
        },
        h2:
        {
            fontWeight: 800
        },
        h3:
        {
            fontWeight: 800
        },
        h4:
        {
            fontWeight: 700
        },
        h5:
        {
            fontWeight: 700
        },
        h6:
        {
            fontWeight: 700
        },
    }
})

const isDark = (mode: PaletteMode) => mode === 'dark'

const style = (mode: PaletteMode = 'light') =>
createTheme(base(mode),
({
    components:
    {
        MuiSwitch:
        {
            styleOverrides:
            {
                root:
                {
                    width: w,
                    height: h + 2,
                    padding: 0,
                    overflow: 'hidden',
                    clear: 'left',

                    '&:active':
                    {
                        '& .MuiSwitch-thumb':
                        {
                            width: h + (w /10),
                        },
                        '& .MuiSwitch-switchBase.Mui-checked':
                        {
                            marginLeft: -2 - (w /10),
                        },
                    },

                    '& .MuiSwitch-switchBase':
                    {
                        padding: 0,
                        color: 'transparent !important',
                        border: `1px transparent solid`,
                        background: 'transparent !important',

                        '&.Mui-checked':
                        {
                            transformOrigin: 'right center',
                            transform: `translateX(${ w - h - 2 }px)`,

                            '& + .MuiSwitch-track':
                            {
                                opacity: 1,
                                border: 0,
                            },
                        },
                        '&.Mui-focusVisible .MuiSwitch-thumb':
                        {
                            border: `6px solid ${ lighten(base(mode).palette.background.paper, 0.1) }`,
                        },
                        '&.Mui-disabled .MuiSwitch-thumb':
                        {
                            background: mode === 'dark' ? lighten(base(mode).palette.background.default, 0.2) : darken(base(mode).palette.background.paper, 0.03),
                            width: h - 2,
                        },
                        '&.Mui-disabled + .MuiSwitch-track':
                        {
                            background: mode === 'dark' ? lighten(base(mode).palette.background.paper, 0.3) : darken(base(mode).palette.background.default, 0.5),

                        },
                    },
                    '& .MuiSwitch-thumb':
                    {
                        boxSizing: 'border-box',
                        width: h - 2,
                        height: h - 2,


                        marginTop: 1,
                        marginLeft: 1,

                        borderRadius: 25,


                        background: mode === 'dark' ? lighten(base(mode).palette.background.default, 0.1) : base(mode).palette.background.default,
                    },

                    '& .MuiSwitch-track':
                    {
                        borderRadius: (h + 2) / 2,
                        background: mode === 'dark' ? lighten(base(mode).palette.background.paper, 0.2) : darken(base(mode).palette.background.paper, 0.1),
                        opacity: 1,
                        boxShadow: isDark(mode) ?
                        'rgba(50, 50, 93, 0.5) 0px 6px 12px -2.4px inset, rgba(0, 0, 0, 0.9) 0px 3.6px 7.2px -3.6px inset' :
                        'rgba(50, 50, 93, 0.25) 0px 3px 6px -1.2px inset, rgba(0, 0, 0, 0.3) 0px 1.8px 3.6px -1.8px inset',
                    },
                }
            }
        },
        MuiTypography:
        {
            styleOverrides:
            {
                root:
                {
                    color: base(mode).palette.primary.main,
                    textDecoration: 'none'
                }
            }
        },
        MuiMenu:
        {
            styleOverrides:
            {
                list:
                {
                    padding: 0,
                }
            }
        },
        MuiList:
        {
            styleOverrides:
            {
                root:
                {
                    padding: 0,
                }
            }
        },
        MuiListItem:
        {
            styleOverrides:
            {
                root:
                {
                    padding: 0,
                },
            }
        },
        MuiListItemText:
        {
            styleOverrides:
            {
                root:
                {
                    '& *':
                    {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        userSelect: 'none',
                    },

                    [`& .${ listItemTextClasses.secondary }`]:
                    {
                        '& *':
                        {
                            color: `${ base(mode).palette.secondary.main }`,
                        },
                    }
                },
            }
        },
        MuiListItemIcon:
        {
            styleOverrides:
            {
                root:
                {
                    minWidth: 40,
                    color: 'inherit',
                }
            }
        },
        MuiDialogTitle:
        {
            styleOverrides:
            {
                root:
                {
                    background: base(mode).palette.background.paper,
                    padding: base(mode).spacing(1, 2),
                }
            }
        },
        MuiDialogContent:
        {
            styleOverrides:
            {
                root:
                {
                    background: base(mode).palette.background.paper,
                    padding: base(mode).spacing(1, 2),
                }
            }
        },
        MuiDialogContentText:
        {
            styleOverrides:
            {
                root:
                {
                    userSelect: 'none'
                }
            }
        },
        MuiDialogActions:
        {
            styleOverrides:
            {
                root:
                {
                    background: base(mode).palette.background.paper,
                    padding: base(mode).spacing(0, 1, 0.5, 1),
                },

            }
        },
        MuiTableCell:
        {
            styleOverrides:
            {
                root:
                {
                    padding: base(mode).spacing(1),
                },
            }
        }
    }
}))

export default style
