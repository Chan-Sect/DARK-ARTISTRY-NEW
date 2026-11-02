import {alpha, styled} from "@mui/material";
import MuiInputBase from "@mui/material/InputBase";
import {Search as SearchIcon} from '@mui/icons-material'
import MuiStack from "@mui/material/Stack";

const TextField = styled(MuiInputBase)(({ theme }) =>
({
    boxShadow: `${ alpha('#000', 1) } 0px 1.5px 3px -1.2px inset, ${ alpha('#FFF', 0.6) } 0px 0.9px 1.8px -1.8px inset`,
    background: theme.palette.background.default,
    padding: theme.spacing(0.5, 0.5, 0.5, 1.5),
    borderRadius: theme.spacing(5),
    transition: theme.transitions.create(['background, box-shadow', 'width'], { easing: theme.transitions.easing.easeOut, duration: theme.transitions.duration.enteringScreen }),

    [theme.breakpoints.up('sm')]:
    {
        width: 48,
    },
    [theme.breakpoints.down('sm')]:
    {
        width: '100%',
    },

    [theme.breakpoints.up('lg')]:
    {
        flexGrow: 1,
    },
    [theme.breakpoints.between('sm', 'md')]:
    {
        flexGrow: 1,
    },

    color: theme.palette.action.active,


    '&:focus-within':
    {
        width: '100% !important',
    },

    '&:hover, &:focus-within':
    {
        boxShadow: `${ alpha('#000', theme.palette.mode === 'dark' ? 1 : 0.5) } 0px 3px 6px -1.2px inset, ${ alpha('#FFF', 0.6) } 0px 1.8px 3.6px -1.8px inset`,
        [theme.breakpoints.up('sm')]:
        {
            width: 150,
        },
    },

    '& .MuiInputBase-input':
    {
        margin: theme.spacing(0.2, 1, 0, 1),
    }
}))

const Container = styled(MuiStack)(({ theme }) =>
({

    [theme.breakpoints.up('sm')]:
    {
        margin: theme.spacing(0, -1, 0, 3),
        flexGrow: 1,
        alignItems: 'flex-end',
    },
    [theme.breakpoints.down('sm')]:
    {
        margin: theme.spacing(-0.5, 1.5, 1),
    },
}))

const Search = () =>
{
    return <Container>
        <TextField placeholder='Tìm kiếm' startAdornment={ <SearchIcon sx={{ pointerEvents: 'none' }}/> }/>
    </Container>
}

export default Search