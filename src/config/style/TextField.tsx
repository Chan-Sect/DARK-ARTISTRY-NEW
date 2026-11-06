import {CircularProgress, IconButton, Stack, styled, Tooltip} from "@mui/material";
import {Close, FilterAltOff, FilterList, Search} from '@mui/icons-material'
import {type ChangeEvent, Fragment, useEffect, useState} from "react";
import {emphasize} from "@mui/material/styles";
import MuiInputBase from "@mui/material/InputBase";

// export const VisuallyHiddenInput = styled('input')(() =>
// ({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     overflow: 'hidden',
//     position: 'absolute',
//     whiteSpace: 'nowrap',
// }))
//
// export const PrimaryBackgroundInput = styled(MuiInputBase)(({ theme }) =>
// ({
//     background: theme.palette.background.paper,
//     boxShadow: 'rgba(50, 50, 93, 0.5) 0px 3px 6px -1.2px, rgba(0, 0, 0, 0.6) 0px 1.8px 3.6px -1.8px',
//
//     padding: theme.spacing(0.5),
//     borderRadius: theme.spacing(5),
//     transition: theme.transitions.create(['background', 'box-shadow'], { easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen }),
//
//     [theme.breakpoints.up('lg')]:
//     {
//         flexGrow: 1,
//     },
//     [theme.breakpoints.between('sm', 'md')]:
//     {
//         flexGrow: 1,
//     },
//
//
//     '&:focus-within':
//     {
//         background: theme.palette.background.default,
//         boxShadow: 'rgba(50, 50, 93, 0.5) 0px 12px 24px -1.2px, rgba(0, 0, 0, 0.6) 0px 7.2px 14.4px -1.8px !important',
//     },
//
//     '&:hover':
//     {
//         boxShadow: 'rgba(50, 50, 93, 0.5) 0px 6px 12px -1.2px, rgba(0, 0, 0, 0.6) 0px 3.6px 7.2px -1.8px',
//     },
//
//     '& .MuiInputBase-input':
//     {
//         margin: theme.spacing(0, 1),
//     }
// }))
//


const InputSearchStyle = styled(MuiInputBase)(({ theme }) =>
({

    background: emphasize(theme.palette.background.paper, 0.03),
    borderRadius: theme.spacing(1),
    color: theme.palette.primary.main,
    flexGrow: 1,
    boxShadow: `${ theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.main } 0px 3px 6px -1.2px inset, ${ theme.palette.background.paper } 0px 1.8px 3.6px -1.8px inset`,
    padding: theme.spacing(0.5, 0.5, 0.5, 1.5),
    transition: theme.transitions.create('all', { easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen }),

    '&:focus-within':
    {
        background: `${ emphasize(theme.palette.background.paper, 0.09) } !important`,
    },
    '&:hover':
    {
        background: emphasize(theme.palette.background.paper, 0.06),
    },
    '& .MuiInputBase-input':
    {
        margin: theme.spacing(0, 1),
        '&::-webkit-search-cancel-button':
        {
            display: 'none',
            WebkitAppearance: 'none'
        }
    }
}))

interface InputSearchProps
{
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
    onClear?: () => void
    color: 'primary' | 'secondary' | 'warning' | 'error'
}

export const InputSearch = ({ value, onChange, onClick, color, onClear }: InputSearchProps) =>
{
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(value)
    const [first, setFirst] = useState(true)

    const onChangeData = (event: ChangeEvent<HTMLInputElement>) => setData(event.target.value)

    useEffect(() =>
    {
        const load = () =>
        {
            const event = { target: { value: data, name: 'search' }} as ChangeEvent<HTMLInputElement>
            onChange(event)
            setLoading(false)
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (first) setFirst(false)
        else if (data.length === 0) load()
        else if (value !== data)
        {
            setLoading(true)
            const timer = setTimeout(load, 1000)
            return () => clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    useEffect(() =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setData(value)
    }, [value])

    const Icon = onClear ? FilterAltOff : FilterList

    const renderClearButton = () => data.length > 0 &&
    <IconButton onClick={ () => onChange(({ target: { value: '', name: 'search' } } as ChangeEvent<HTMLInputElement>)) } color='secondary' size='small'>
        <Close/>
    </IconButton>
    const renderFilterButton = () => onClick ? <Tooltip title={ onClear ? 'Xoá bộ lọc' : 'Bộ lọc' } arrow disableInteractive>
        <IconButton color={ onClear ? 'error' : color } onClick={ onClear || onClick } size='small'>
            <Icon/>
        </IconButton>
    </Tooltip> : null
    const renderButtonFilter = () =>
    <Fragment>
        { renderClearButton() }
        { renderFilterButton() }
    </Fragment>

    const renderLoading = () =>
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', width: 34, height: 34 }}>
        { loading ? <CircularProgress size={ 18 } /> : <Search/> }
    </Stack>

    return <InputSearchStyle startAdornment={ renderLoading() } endAdornment={ renderButtonFilter() } placeholder='Tìm kiếm...' type='search' value={ data } onChange={ onChangeData }/>
}