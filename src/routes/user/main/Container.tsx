import {Box, Button, Stack, Table as MuiTable, TableBody, TableContainer, Typography} from "@mui/material";
// import {GridHeader, ListHeader} from "./Header.jsx";
// import {lazy, Suspense} from "react";
import {List as LoadingList} from "./Loading";

import LoadingElement from "../../../main/fragment/LoadingElement";
import useStorage from "../storage";
import {ViewKey} from "../../../config/view/Key.ts";
import type {UserType} from "../storage/DataType.ts";
import {ListHeader} from "./Header.tsx";
import {lazy} from "react";

const Row = lazy(() => import('./Item').then(mod => ({ default : mod.Row })))
// const Card = lazy(() => import('./Item.jsx').then(mod => ({ default : mod.Card })))

interface ContainerProps
{
    children?: (UserType | null)[]
}

const Table = ({ children }: ContainerProps) =>
{
    const renderItem = () => children?.map((value, index) => value
    ?
        <Row key={ index }>{ value }</Row>
        // <Suspense fallback={ <LoadingList/> } key={ index }>
        //     <Row>{ value }</Row>
        // </Suspense>
    : <LoadingList key={ index }/>)

    return <TableContainer sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <MuiTable stickyHeader>
            <ListHeader/>
            <TableBody>
                { renderItem() }
            </TableBody>
        </MuiTable>
    </TableContainer>
}

// const Grid = ({ children }: ContainerProps) =>
// {
//     const theme = useTheme()
//
//     // const renderItem = () => children?.map((value, index) => value
//     // ? <Suspense fallback={ <LoadingGrid/> } key={ index }><Card>{ value }</Card></Suspense>
//     // : <LoadingGrid key={ index }/>)
//
//     return <Stack sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}>
//         <GridHeader/>
//         <MuiGrid container columns={ 12 } spacing={ 1 } sx={{ padding: theme.spacing(1) }}>
//             {/*{ renderItem() }*/}
//         </MuiGrid>
//     </Stack>
// }

const Container = () =>
{
    const { view, list, max, count, onResetFilter } = useStorage()

    const render = () => view.value === ViewKey.List ? <Table>{ list }</Table> : <Table>{ list }</Table>
        // <Grid>{ list }</Grid>

    return (max < 0 || count < 0) ?
    <LoadingElement/>
    : (count === 0 && max !== 0) ?
    <Stack sx={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }} spacing={ 1 }>
        <Typography>Không tìm thấy dữ liệu</Typography>
        <Button variant='contained' color='error' onClick={ () => onResetFilter(true) }>
            Xoá tìm kiếm
        </Button>
    </Stack>
    : <Box sx={{ flexGrow: 1,  display: 'flex', overflow: 'hidden', position: 'relative' }}>
        { render() }
    </Box>
}

export default Container