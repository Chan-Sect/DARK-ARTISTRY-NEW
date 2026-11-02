import {Icon, IconButton} from "@mui/material";
import {Fade as Hamburger} from 'hamburger-react'
import {useContainer} from "../providers/main";

const MenuButton = () =>
{
    const { menuControlOpen, setMenuControlOpen } = useContainer()

    const onClick = () => setMenuControlOpen(old => !old)

    return <IconButton id='menu-button-header' onClick={ onClick } sx={{ '& *': { pointerEvents: 'none' }, marginRight: { xs: -1, sm: 2 }, marginLeft: { xs: 0, sm: -2 }, display: { md : 'default', lg: 'none' } }}>
        <Icon sx={{ '& > * ': { transform: `translate(-25%, -25%)` } }}  aria-hidden={ false }>
            <Hamburger toggled={ menuControlOpen } size={ 20 }/>
        </Icon>
    </IconButton>
}

export default MenuButton