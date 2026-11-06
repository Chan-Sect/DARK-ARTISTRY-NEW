import {
    Checkbox,
    Stack,
    styled,
    TableCell,
    tableCellClasses,
    TableHead,
    TableSortLabel,
    Tooltip,
    useTheme
} from "@mui/material";
import {Link, LockPersonTwoTone, SubtitlesTwoTone, type SvgIconComponent, Tune} from '@mui/icons-material';
import MuiTableRow from "@mui/material/TableRow"
import Path from "../../../config/directions/Path.ts";
import useStorage from "../storage";
import type {PropertyType} from "../storage/DataType.ts";
// import {useProvider} from "./Provider.jsx";
// import Path from "../../../../config/direction/Path.js";

const TableRow = styled(MuiTableRow)(({ theme }) =>
({
    [`& .${ tableCellClasses.root }`]:
    {
        background: theme.palette.background.paper
    }
}))

interface LabelType
{
    key: PropertyType
    title?: string
    align: 'left' | 'center' | 'right'
    Icon: SvgIconComponent
}

const labels: LabelType[] =
[
    //'name', 'mail', 'createTime', 'updateTime'
    { key: 'name', title: 'Tên', align: 'left', Icon: SubtitlesTwoTone },
    { key: 'mail', title: 'Email', align: 'right', Icon: Path.AccountRole.Icon },
    { key: 'updateTime', title: 'Chỉnh sửa lần cuối', align: 'center', Icon: LockPersonTwoTone },
    { key: 'createTime', title: 'Ngày tạo', align: 'center', Icon: Link },
]

export const ListHeader = () =>
{

    const { by, order, onRequestSort, length, selected, onSelectAll, available } = useStorage()
    const theme = useTheme()

    const checked = available.every(item => selected.includes(item)) && selected.length > 0 && available.length !== 0
    const indeterminate = selected.length > 0 && selected.length < length && !checked

    const onSort = (property: PropertyType) => () => onRequestSort(property)

    const renderSortLabel = () => labels.map(({ key, title, align, Icon }) =>
    <TableCell align={ align } key={ key } sx={{ borderTop: `1px solid ${ theme.palette.divider }` }}>
        <TableSortLabel sx={{ whiteSpace: 'nowrap' }} active={ by === key } direction={ by === key ? order : 'asc' } onClick={ onSort(key) }>{ title === undefined ? <Icon/> : title }</TableSortLabel>
    </TableCell>)

    return <TableHead >
        <TableRow >
            <TableCell padding='checkbox' align='center' sx={{ borderTop: `1px solid ${ theme.palette.divider }` }}>
                <Tooltip title={ available.length === 0 ? 'Không thể chọn' : `Đã chọn : ${ selected.length } / ${ length }` } arrow disableInteractive>
                    <span>
                        <Checkbox onChange={ onSelectAll } disabled={ available.length === 0 } checked={ checked } indeterminate={ indeterminate } />
                    </span>
                </Tooltip>
            </TableCell>
            <TableCell height={ 42 } sx={{ borderTop: `1px solid ${ theme.palette.divider }` }}/>
            { renderSortLabel() }
            <TableCell padding='checkbox' sx={{ position: 'sticky', right: 0, top: 0, zIndex: 3, minWidth: 41, width: 0, borderLeft: `1px solid ${ theme.palette.divider }`, borderTop: `1px solid ${ theme.palette.divider }` }}>
                <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Tune color='warning'/>
                </Stack>
            </TableCell>
        </TableRow>
    </TableHead>
}

// export const GridHeader = () =>
// {
//     const theme = useTheme()
//     const { by, order, setOrder, setBy, length, selected, onSelectAll, available } = useProvider()
//
//     const checked = available.every(item => selected.includes(item)) && selected.length > 0 && available.length !== 0
//     const indeterminate = selected.length > 0 && selected.length < length && !checked
//
//     const renderSortButton = () => labels.map(({ key, title, Icon }) =>
//     <Tooltip key={ key } title={ title } arrow disableInteractive>
//         <ToggleButton value={ key } size='small'>
//             <Icon/>
//         </ToggleButton>
//     </Tooltip>)
//
//     const onChangeOrder = () => setOrder(old => old === 'asc' ? 'desc' : 'asc')
//     const onChangeBy = (_, value) => setBy(old => value ? value : old)
//
//     return <Stack direction='row' justifyContent='space-between' height={ 58 } padding={ theme.spacing(0, 1, 0, 2.7) } sx={{
//         borderTop: `1px solid ${ theme.palette.divider }`,
//         borderBottom: `1px solid ${ theme.palette.divider }`,
//         position: 'sticky', top: 0, zIndex: 3, background: theme.palette.background.paper }}>
//         <FormControlLabel label={ available.length === 0 ? 'Không thể chọn' : `Đã chọn : ${ selected.length } / ${ length }` } control={ <Checkbox onChange={ onSelectAll } disabled={ available.length === 0 } checked={ checked } indeterminate={ indeterminate } /> }/>
//
//         <Stack direction='row' alignItems='center' spacing={ 2 }>
//             <Typography>Sắp xếp theo :</Typography>
//             <ToggleButtonGroup value={ by } exclusive onChange={ onChangeBy }>
//                 { renderSortButton() }
//             </ToggleButtonGroup>
//         </Stack>
//         <Stack direction='row' alignItems='center'>
//             <Tooltip title={ order === 'asc' ? 'Tăng dần' : 'Giảm dần' } arrow disableInteractive>
//                 <span>
//                     <Button disabled={ by === 'index' } onClick={ onChangeOrder } variant='outlined' endIcon={ <ArrowUpward sx={{ transform: `rotate(${ order === 'asc' ? 0 : 180 }deg)`, transition: theme.transitions.create('transform', { duration: theme.transitions.duration.short, easing: theme.transitions.easing.easeInOut }) }} /> }>
//                         Thứ tự :
//                     </Button>
//                 </span>
//             </Tooltip>
//         </Stack>
//     </Stack>
// }

