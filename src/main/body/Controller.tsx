import {styled, Tooltip, useTheme} from "@mui/material"
import MuiStack from "@mui/material/Stack";
import MuiTab from "@mui/material/Tab";
import MuiTabs from "@mui/material/Tabs";
import MuiTypography from "@mui/material/Typography";
import {useMemo} from "react";
import {Link, useLocation} from "react-router-dom"
import useMediaQuery from "@mui/material/useMediaQuery";
import {useContainer, useData, useDirection} from "../providers/main";
import Direction from "../../config/directions/Direction.tsx";
import AddButton from "../../components/controller/AddButton.tsx";
// import AddButton from "../../elements/controller/AddButton.jsx";
// import CloseButton from "../../elements/controller/CloseButton.jsx";

const Container = styled(MuiStack)(({ theme }) =>
({
    background: theme.palette.background.paper,
    maxWidth: '100%',
    overflow: 'hidden',
}))

interface ControllerProps
{
    hidden: boolean
}

const Holder = styled(MuiStack, { shouldForwardProp: prop => prop !== 'hidden' })<ControllerProps>(({ theme, hidden }) =>
({
    display: hidden ? 'none' : 'flex',
    padding: theme.spacing(0, 1),
    height: 55,
    alignItems: 'center',
}))
const Title = styled(MuiStack, { shouldForwardProp: prop => prop !== 'hidden' })<ControllerProps>(({ theme, hidden }) =>
({
    display: hidden ? 'none' : 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    color: theme.palette.primary.main,
    '& *' : { userSelect: 'none' },
    height: 55,
}))
const Tabs = styled(MuiTabs, { shouldForwardProp: prop => prop !== 'hidden' })<ControllerProps>(({  hidden }) =>
({
    minHeight: 0,
    minWidth: 0,
    height: hidden ? 0 : 55,

    alignItems: 'center',
    flexGrow: 1,
}))
const Tab = styled(MuiTab)(() =>
({
    minHeight: 0,
    height: 48,

    minWidth: 0,
    alignItems: 'center',
}))
const Content = styled(MuiTypography)(() =>
({
    fontWeight: 700,
    fontSize: 20,
}))

const Controller = () =>
{
    const { access } = useData()
    const { getRoot, getLast, isNotFound, special, replaceable } = useDirection()
    const location = useLocation()
    const theme = useTheme()
    const { controller, hidden } = useContainer()

    // const [root, setRoot] = useState<Direction | undefined>()
    // const [last, setLast] = useState<Direction | undefined>()
    // const [tabValue, setTabValue] = useState(0)

    const md = useMediaQuery(theme.breakpoints.between('md', 'lg'))
    const lg = useMediaQuery(theme.breakpoints.up('lg'))

    const last = useMemo(() =>
    {
        const value = getLast({ keepString: true })
        return value instanceof Direction ? value : undefined
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, isNotFound, access])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const root = useMemo(() => getRoot(), [location.pathname, isNotFound, access])
    const tabValue = useMemo(() =>
    {
        if (last !== undefined) return root?.children?.map(direction => direction.path.url).indexOf(last.path.url) || 0
        else return 0
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.pathname, isNotFound, access, root, last])

    const renderTitleIcon = () =>
    {
        const children = root?.children

        if (children)
        {
            const Icon = children[0]?.path?.Icon
            if (Icon) return <Icon/>
            else return null
        }
        else return null
    }

    const renderTitleContent = () =>
    {
        const children = root?.children

        if (children) return children[0]?.path.name
        else return null
    }

    const renderTabs = () =>
    {
        const { children } = getRoot() || { }
        if ((children?.length || 0) < 2 || isNotFound) return null
        else return children?.map((child, index) =>
        {
            const { Icon } = child.path
            const showLabel = md || lg
            // @ts-expect-error MUI 9 polymorphic component typing
            return <Tab label={ showLabel && child.path.name } icon={ !md ? <Tooltip title={ !showLabel && child.path.name } arrow><Icon/></Tooltip> : undefined } component={ Link } to={ (index === tabValue && special) ? null : child.path.url } replace={ replaceable } iconPosition="start" key={ index } />
        })
    }

    const hideController = () =>
    {
        const insertLast = getLast({ keepString : true })

        const insertable = Boolean(insertLast instanceof Direction && insertLast.insertable) && !special
        const closeable = Boolean(getLast({ asString: true })) && !special
        return !(insertable || controller || closeable)
    }

    return <Container direction='row'>
        <Title direction='row' spacing={ 1 } hidden={ root?.children?.length !== 1 }>
            { renderTitleIcon() }
            <Content>{ renderTitleContent() }</Content>
        </Title>
        <Tabs variant='scrollable' value={ tabValue < 0 ? 0 : tabValue } hidden={ !root?.children || root?.children?.length < 2 || hidden }>
            { renderTabs() }
        </Tabs>
        <Holder direction='row-reverse' hidden={ hideController() }>
            {/*<CloseButton/>*/}
            <AddButton/>
            { controller }
        </Holder>
    </Container>
}

export default Controller