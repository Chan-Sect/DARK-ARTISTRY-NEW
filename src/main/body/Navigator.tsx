import {Collapse, Divider, ListItemButton, ListItemIcon, ListItemText, styled, useTheme} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import MuiIconButton from "@mui/material/IconButton";
import MuiListItem from "@mui/material/ListItem";
import {Fragment, useEffect, useState} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useContainer, useDirection} from "../providers/main";
import Direction from "../../config/directions/Direction.tsx";
import {Link} from 'react-router-dom'

const Container = styled(MuiListItem)(({ theme }) =>
({
    [theme.breakpoints.up('md')]:
    {
        minWidth: 300,
    }
}))

interface ExpandButtonProps
{
    expand: boolean
}

const ExpandButton = styled(MuiIconButton, { shouldForwardProp: prop => prop !== 'expand' })<ExpandButtonProps>(({ theme, expand }) =>
({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', { duration: theme.transitions.duration.short }),
}))

interface NavigatorProps
{
    children: Direction
}

const Navigator = ({ children }: NavigatorProps) =>
{
    const { menuControlOpen, setMenuControlOpen } = useContainer()
    const { includes, special, getLast } = useDirection()
    const theme = useTheme()

    const { Icon, name, url } = children.path
    const [expanded, setExpanded] = useState(false)

    const lg = useMediaQuery(theme.breakpoints.up('lg'))
    const onlyChild = children.children?.length === 1 ? children.children[0] : null

    const getURL = () =>
    {
        const output = children.children ? children.children[0]?.path?.url : url
        const last = getLast()
        return last instanceof Direction && output === last.path.url && special ? undefined : output
    }

    const onClick = () => setMenuControlOpen(old => lg ? old : false)

    useEffect(() =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (!menuControlOpen) setExpanded(includes(children))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuControlOpen])

    const renderExpandButton = () =>
    <ExpandButton expand={ expanded } onClick={ () => setExpanded(old => !old) } color='primary' tabIndex={ -1 }>
        <ExpandMore/>
    </ExpandButton>

    const renderChildren = () => children.children?.map(value => <Navigator key={ value.path.name }>{ value }</Navigator>)


    return <Fragment>
        <Container secondaryAction={ (children.children && !onlyChild) && renderExpandButton() }>
            {/* @ts-expect-error MUI 9 polymorphic component typing */}
            <ListItemButton selected={ includes(children) }
                            onClick={ onClick }
                            component={ Link } to={ getURL() }>
                <ListItemIcon>
                    <Icon/>
                </ListItemIcon>
                <ListItemText primary={ name }/>
            </ListItemButton>
        </Container>
        <Collapse in={ expanded && menuControlOpen } timeout="auto" unmountOnExit>
            <Divider/>
            { renderChildren () }
            <Divider/>
        </Collapse>
    </Fragment>
}

export default Navigator