import {Skeleton, Stack, TableCell, TableRow, useTheme} from "@mui/material";

export const List = () =>
{
    const theme = useTheme()

    return <TableRow>
        <TableCell padding="checkbox">
            <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: 42 }}>
                <Skeleton animation='wave' variant='rounded' width={ 20 } height={ 20 }/>
            </Stack>
        </TableCell>
        <TableCell align="center" sx={{ width: 0 }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Skeleton animation='wave' variant='circular' width={ 40 } height={ 40 }/>
            </Stack>
        </TableCell>
        <TableCell align="left" sx={{ overflow: 'hidden', maxWidth: 0, minWidth: 150 }}>
            <Skeleton animation='wave' variant='text'/>
        </TableCell>
        {/*<TableCell align="right" sx={{ width: 110 }}>*/}
        {/*    <Stack sx={{ alignItems: 'center' }}>*/}
        {/*        <Skeleton animation='wave' variant='circular' width={ 40 } height={ 40 }/>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}
        <TableCell align="right" sx={{ width: 110 }}>
            <Skeleton animation='wave' variant='text'/>
        </TableCell>

        {/*<TableCell align="center" sx={{ width: 100 }}>*/}
        {/*    <Stack sx={{ alignItems: 'center' }}>*/}
        {/*        <Skeleton animation='wave' variant='rounded' width={ 24 } height={ 24 }/>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}
        {/*<TableCell align="center" sx={{ width: 0 }}>*/}
        {/*    <Stack sx={{ alignItems: 'center' }}>*/}
        {/*        <Skeleton animation='wave' variant='rounded' width={ 24 } height={ 24 }/>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}
        {/*<TableCell align="center" sx={{ width: 0 }}>*/}
        {/*    <Stack sx={{ alignItems: 'center' }}>*/}
        {/*        <Skeleton animation='wave' variant='rounded' width={ 24 } height={ 24 }/>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}

        <TableCell align="center" sx={{ width: 0 }}>
            <Skeleton animation='wave' variant='text'/>
        </TableCell>
        <TableCell align="center" sx={{ width: 0 }}>
            <Skeleton animation='wave' variant='text'/>
        </TableCell>
        <TableCell onClick={ event => event.stopPropagation() } align="right" sx={{ cursor: 'default', position: 'sticky', right: 0, zIndex: 2, width: 0, background: theme.palette.background.default, borderLeft: `1px solid ${ theme.palette.divider }` }}>
            <Skeleton animation='wave' variant='rounded' width={ 40 } height={ 40 }/>
        </TableCell>
    </TableRow>
}