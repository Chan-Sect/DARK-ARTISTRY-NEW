import {Box, ClickAwayListener, Stack, styled, type Theme, Toolbar, useTheme} from '@mui/material'
import MuiDrawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import Search from "../header/Search.tsx";
import NavigatorsControl from "./NavigatorsControl.tsx";

import {useContainer} from "../providers/main";

const width = 300
const minWidth = 55

const openedMixin = (theme: Theme) =>
({
    transition: theme.transitions.create(['width'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
    width,
    overflow: 'hidden',
})
const closedMixin = (theme: Theme) =>
({
    transition: theme.transitions.create(['width'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
    width: minWidth,
    overflow: 'hidden',
})

const PermanentDrawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) =>
({
    flexShrink: 0,
    whiteSpace  : 'nowrap',
    boxSizing   : 'border-box',

    ...(open && { ...openedMixin(theme), '& .MuiDrawer-paper' : openedMixin(theme) }),
    ...(!open && {...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) }),
}))
const TemporaryDrawer = styled(MuiDrawer)(({ theme }) =>
({
    flexShrink: 0,
    whiteSpace  : 'nowrap',
    boxSizing   : 'border-box',

    '& .MuiDrawer-paper':
    {
        background: theme.palette.background.paper,

        [theme.breakpoints.up('sm')]:
        {
            width,
        },
    },
    '& .MuiBackdrop-root':
    {
        pointerEvents: 'none'
    },
}))
const Container = styled(Stack)(() =>
({
    flexGrow: 1,
    '& *': { userSelect: 'none' },
    position: 'relative',
}))
const Scroller = styled(Stack)(({ theme }) =>
({
    overflowX: 'hidden',

    [theme.breakpoints.up('sm')]:
    {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        overflowY: 'auto',
    }
}))


const MenuControl = () =>
{
    const { menuControlOpen, setMenuControlOpen } = useContainer()

    const theme = useTheme()
    const xs = useMediaQuery(theme.breakpoints.down('sm'))
    const md = useMediaQuery(theme.breakpoints.between('md', 'lg'))
    const lg = useMediaQuery(theme.breakpoints.up('lg'))

    const Drawer = md || lg ?  PermanentDrawer : TemporaryDrawer

    const onClickAway = (event: MouseEvent | TouchEvent) =>
    {
        if ((event.target as HTMLElement).id !== 'menu-button-header') setMenuControlOpen(false)
    }

    return <Drawer open={ menuControlOpen } variant={ md || lg ? 'permanent' : 'temporary' } anchor={ xs ? 'top' : 'left' } onMouseEnter={  () => setMenuControlOpen(old => lg ? true : old)  } onMouseLeave={ () => setMenuControlOpen(old => lg ? false : old) }>
        <ClickAwayListener onClickAway={ onClickAway } mouseEvent="onClick">
            <Stack sx={{ height: '100%', padding: { xs: theme.spacing(0, 0, 1, 0), sm: 0 } }} spacing={{ xs: 2, sm: 0 }}>
                <Toolbar/>
                <Container direction={{ xs: 'column-reverse', sm: 'column' }}>
                    <Scroller>
                        <Stack sx={{ minHeight: '100%' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                { xs && <Search/> }
                                <NavigatorsControl/>
                            </Box>
                            {/*<ProfileControl/>*/}
                        </Stack>
                    </Scroller>
                </Container>
            </Stack>
        </ClickAwayListener>
    </Drawer>

}

export default MenuControl