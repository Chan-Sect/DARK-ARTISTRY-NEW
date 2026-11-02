import {AppBar, Toolbar, useTheme} from "@mui/material";
import Search from "./Search";
import MenuButton from "./MenuButton";
import Title from "./Title.tsx";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () =>
{
    const theme = useTheme()
    const xs = useMediaQuery(theme.breakpoints.down('sm'))

    return <AppBar sx={{  zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ flexDirection: xs ? 'row-reverse' : 'row' }}>
            <MenuButton/>
            <Title/>
            { !xs && <Search/>}
        </Toolbar>
    </AppBar>
}

export default Header