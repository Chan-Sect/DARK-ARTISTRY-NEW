import {alpha, useTheme} from "@mui/material";
import {GlobalStyles} from "@mui/material";

const GlobalTheme = () =>
{
    const theme = useTheme()

    const globalStyle = () =>
    ({
        '::selection':
        {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
        },

        '& *' :
        {
            fontFamily : 'Montserrat',
            userSelect: 'text',
            outline: 'none !important',
        },
        '*:not(p)':
        {
            userSelect: 'none',
        },
        '.cropper-drag-box' :
        {
            backgroundColor: 'transparent !important'
        },
        '* input' :
        {
            spellCheck: false,
            webkitTextSecurity: 'none',
            MozTextSecurity: 'none',
            textSecurity: 'none',
            autoComplete: 'off',
            autoCorrect: 'off',
        },
        'html':
        {
            background: theme.palette.background.default
        },
        '.react-colorful':
        {
            width: 'auto !important',
            height: '100% !important',
        },
        '.react-colorful__hue':
        {
            height: '15px !important',
            borderRadius: '15px !important',
        },
        '.react-colorful__hue-pointer':
        {
            width: '18px !important',
            height: '18px !important',
        },
        '.react-colorful__saturation-pointer':
        {
            width: '16px !important',
            height: '16px !important',
        },
        '.react-colorful__saturation':
        {
            borderRadius: '5px !important',
            marginBottom: '8px !important',
        },
        '.ProseMirror' :
        {
            outline: 'none',
            minHeight: 'calc(100vh - 223px)',
            margin: '10px',

            '& ::selection':
            {
                backgroundColor: alpha(theme.palette.primary.main, 0.25),
            },
            '&:not(.ProseMirror-focused) ::selection':
            {
                backgroundColor: alpha(theme.palette.primary.main, 0.25),
            },
            '& p, h1, h2, h3, h4, h5, h6':
            {
                margin: '0 ',
            },
            '& h1':
            {
                fontSize: 40,
                fontWeight: 800
            },
            '& h2':
            {
                fontSize: 35,
                fontWeight: 800
            },
            '& h3':
            {
                fontSize: 30,
                fontWeight: 800
            },
            '& h4':
            {
                fontSize: 25,
                fontWeight: 700
            },
            '& h5':
            {
                fontSize: 20,
                fontWeight: 700
            },
            '& h6':
            {
                fontSize: 15,
                fontWeight: 700
            },
            '& a':
            {
                textDecoration: 'none',
                color: 'inherit',
            }
        },
        '.tiptap':
        {
            color: theme.palette.grey[50],

            '&:first-of-type': { marginTop: 0 },
            pre:
            {
                background: theme.palette.background.paper,
                padding: theme.spacing(2),
                borderRadius: 5,

                code:
                {
                    padding: 0,
                    borderRadius: 0,
                }
            },
            code:
            {
                fontFamily: 'JetBrains Mono, monospace',
                padding: theme.spacing(0, 0.5),
                borderRadius: 5,
                background: '#202020',
            },
            blockquote:
            {
                color: theme.palette.grey[500],
                padding: theme.spacing(0.5, 1, 0.5,4),
                margin: theme.spacing(1, 0.5),
                borderLeft: `3px solid ${ theme.palette.grey[50] }`,
            },
            table:
            {
                borderCollapse: 'collapse',
                margin: theme.spacing(2, 0),
                overflow: 'hidden',
                tableLayout: 'fixed',
                width: '100%',
                'th, td':
                {
                    border: `1px solid ${ theme.palette.grey[300] }`,
                    boxSizing: 'border-box',
                    padding: theme.spacing(1, 1.5),
                    position: 'relative',
                    verticalAlign: 'top',

                    '& > *':
                    {
                        marginBottom: 0,
                    }
                },
                th:
                {
                    // background: theme.palette.grey[100],
                    background: alpha(theme.palette.primary.main, 0.25),
                    textAlign: 'left',
                    fontWeight: 'normal',
                },
                '.selectedCell:after':
                {
                    background: alpha(theme.palette.primary.main, 0.1),
                    content: '""',
                    left: 0,
                    right : 0,
                    top: 0,
                    bottom : 0,
                    pointerEvents : 'none',
                    position: 'absolute',
                    zIndex: 2,
                },
                '.column-resize-handle':
                {
                    background: theme.palette.primary.main,
                    bottom: -1,
                    pointerEvents: 'none',
                    position : 'absolute',
                    right: -1,
                    top: 0,
                    width : 2
                }
            },
            '.tableWrapper':
            {
                margin: theme.spacing(1, 0),
            },
            '&.resize-cursor':
            {
                cursor: 'col-resize'
            },
            mark:
            {
                backgroundColor: theme.palette.warning.main,
                borderRadius: '2px !important',
                padding: 2
            },
            img:
            {
                maxWidth: '100%',
                minWidth: 150
            },
            iframe:
            {
                maxWidth: '100%',
                minWidth: 150
            },
            'ul[data-type="taskList"]':
            {
                listStyle: 'none',
                padding: 0,

                li:
                {
                    alignItems: 'center',
                    display: 'flex',
                }
            }
        },
        '.rdrCalendarWrapper, .rdrDateRangeWrapper':
        {
            background: `transparent !important`,
        },
        '.rdrMonth':
        {
            width: 'calc(100% - 16px) !important',
        },
        '.message-item-hidden':
        {
            opacity: 0,
            transition: theme.transitions.create('opacity', { easing: theme.transitions.easing.easeIn, duration: theme.transitions.duration.leavingScreen })
        }
    })

    return <GlobalStyles styles={ globalStyle() }/>
}

export default GlobalTheme