import {Avatar, Stack, styled, useTheme} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs"
import MuiChip from "@mui/material/Chip";
import {useEffect, useMemo} from "react";
import {NoWrap} from "../../config/style/Typography.tsx";
import {useContainer, useDirection} from "../providers/main";
import Direction from "../../config/directions/Direction.tsx";
import Path from "../../config/directions/Path.ts";

const Container = styled(Stack)(({ theme }) =>
({
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:
    {
        flexGrow: 1,
    }
}))
const Logo = styled(Avatar)(({ theme }) =>
({
    margin: `${ theme.spacing(0, 2, 0, -2) } !important`,
    [theme.breakpoints.down('lg')]:
    {
        display: 'none'
    },
}))
const Breadcrumbs = styled(MuiBreadcrumbs)(({ theme }) =>
({
    color: theme.palette.action.active,
}))
const Chip = styled(MuiChip)(({ theme }) =>
({
    color: theme.palette.action.active,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]:
    {
        display: 'none'
    }
}))

const Title = () =>
{
    const theme = useTheme()
    const { find, isNotFound, getRoot, getLast, special } = useDirection()
    const { pageTitle, hidden } = useContainer()
    const location = useLocation()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const directions = useMemo(() => find().toPath(), [location.pathname, isNotFound, pageTitle])


    const sm = useMediaQuery(theme.breakpoints.down('md'))

    const isOnlyOne = directions.length < 3 || isNotFound

    const getLabel = (value?: Path | string) =>
    {
        if (typeof value === 'string') return value === 'new' ? 'Thêm mới' : value
        else return value?.name
    }
    const getURL = () =>
    {
        const first = getRoot()
        const output = first?.children ? first.children[0]?.path?.url : first?.path?.url
        const last = getLast()

        if (last instanceof Direction)
        {
            if (output === last.path.url && special) return null
        }

        return output
    }

    const convertPageTitle = (value: string | Path) =>
    {
        if (typeof value !== 'string' || value === 'new') return value
        else return pageTitle || value
    }

    const renderChips = () =>
    {
        const list = directions.slice(1)

        if (list.length < 2) return null
        else return (hidden ? list.filter(item => typeof item === 'string') : list).map((value, index) =>
        {
            const last = getLast()
            const check = value instanceof Path && !(value.url === (last instanceof Path ? last.url : last) && special)

            // @ts-expect-error MUI 9 polymorphic component typing
            return <Chip key={ index } disabled={ !check } label={ getLabel(convertPageTitle(value)) } component={ Link } to={ check ? value.url : null }/>
        })
    }

    useEffect(() =>
    {
        const primary = special ? getLabel(directions[0]) : getLabel(directions[directions.length - 2]) || 'Dark Artistry'
        const secondary = getLabel(convertPageTitle(directions[directions.length - 1])) || (isNotFound ? '404' : 'Mã lỗi')
        window.document.title = hidden ? secondary : `${ primary } | ${ secondary }`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [directions])

    return <Container direction='row' spacing={ 1 }>
        <Logo src='/favicon.svg' variant='square'/>
        <Breadcrumbs separator={ sm ? null : '>' } maxItems={ 3 }>
            {/* @ts-expect-error MUI 9 polymorphic component typing */}
            <NoWrap component={ Link } to={ isOnlyOne ? null : getURL() } variant='h1' sx={{ maxWidth: '100%', fontSize: 30 }} color={ theme.palette.action.active }>
                { isNotFound ? 'Lỗi 404' : directions[0] instanceof Path ? directions[0].name : 'Lỗi không xác định' }
            </NoWrap>
            { renderChips() }
        </Breadcrumbs>
    </Container>

}

export default Title