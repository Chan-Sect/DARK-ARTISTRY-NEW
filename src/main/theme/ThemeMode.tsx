import {type PaletteMode, ThemeProvider} from '@mui/material/styles';
import style from '../../config/style'
import useMediaQuery from "@mui/material/useMediaQuery";
import GlobalTheme from "./GlobalTheme.tsx";
import type {ProviderProps} from "../providers/main";

interface PropType extends ProviderProps
{
    mode: PaletteMode | 'system'
}

const ThemeMode = ({ mode, children }: PropType) =>
{
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const getThemeMode = () => mode ? mode === 'system' ? (prefersDarkMode ? 'dark' : 'light') : mode : (prefersDarkMode ? 'dark' : 'light')

    return <ThemeProvider theme={ style(getThemeMode()) }>
        <GlobalTheme/>
        { children }
    </ThemeProvider>
}

export default ThemeMode