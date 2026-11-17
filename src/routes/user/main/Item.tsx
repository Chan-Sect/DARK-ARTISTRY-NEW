import {Checkbox, IconButton, Stack, Tooltip, useTheme} from "@mui/material"
import useStorage from "../storage";
import MuiTableRow from "@mui/material/TableRow";
import type {UserType} from "../storage/DataType.ts";
import TableCell from "@mui/material/TableCell";
import {NoWrap} from "../../../config/style/Typography.tsx";
import {formatDate} from "../../../config/text/format.ts";
import {Link} from "react-router-dom";
import {Edit} from "@mui/icons-material";
import Avatar from "../../../components/structure/Avatar.tsx";

interface ItemProps
{
    children: UserType
}

export const Row = ({ children }: ItemProps) =>
{
    const theme = useTheme()
    const { selected, onSelected, path } = useStorage()
    // const { access } = useData()
    // const { currentUser } = useLoader()

    const { id, name, mail, image, updateTime, createTime } = children

    const isSelected = selected.includes(id)

    const canEdit = true
        // (Access.Editor.check(access.admin) && Access.get(children.role).admin < access.admin) || children.id === currentUser.id
    const canSelect = true
        // Access.Full.check(access.admin) && Access.get(children.role).admin < access.admin


    return <MuiTableRow hover={ canSelect } onClick={ canSelect ? onSelected(children) : undefined } selected={ isSelected }>
        <TableCell padding="checkbox">
            <Stack sx={{ alignItems: 'center' }}>
                <Checkbox checked={ isSelected } disabled={ !canSelect }/>
            </Stack>
        </TableCell>
        <TableCell align="center" sx={{ width: 0 }}>
            <Stack sx={{ alignItems: 'center' }}>
                <Avatar src={ image }/>
                {/*<IconButton sx={{ padding: 0 }} onClick={ event => event.stopPropagation() } >*/}
                {/*    <Avatar src={ image ? `${ URI.server }/file/${ image }` : undefined }/>*/}
                    {/*<Avatar/>*/}
                {/*</IconButton>*/}
            </Stack>
        </TableCell>
        <TableCell align="left" sx={{ overflow: 'hidden', maxWidth: 0, minWidth: 150 }}>
            <NoWrap variant='body2' sx={{ fontWeight: 600 }}>{ name }</NoWrap>
        </TableCell>
        <TableCell align="right" sx={{ overflow: 'hidden', maxWidth: 0, minWidth: 150 }}>
            <NoWrap variant='body2' sx={{ fontWeight: 600 }}>{ mail }</NoWrap>
        </TableCell>
        {/*<TableCell align="center" sx={{ width: 110 }}>*/}
        {/*    <Suspense fallback={ <Skeleton animation='wave' variant='circular' width={ 40 } height={ 40 }/> }><Role list={ role }/></Suspense>*/}
        {/*</TableCell>*/}
        {/*<TableCell align="center" sx={{ width: 100 }}>*/}
        {/*    <Suspense fallback={ <Skeleton animation='wave' variant='rounded' width={ 24 } height={ 24 }/> }><Linked>{ platform }</Linked></Suspense>*/}
        {/*</TableCell>*/}
        {/*<TableCell align="center" sx={{ width: 0 }}>*/}
        {/*    <Stack alignItems='center'>*/}
        {/*        <Tooltip title={ OTP.activate ? 'Đã kích hoạt' : 'Chưa kích hoạt' } arrow disableInteractive>*/}
        {/*            { OTP.activate ? <PhonelinkLock color='success'/> : <PhonelinkErase color='error'/> }*/}
        {/*        </Tooltip>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}
        {/*<TableCell align="center" sx={{ width: 0 }}>*/}
        {/*    <Stack alignItems='center'>*/}
        {/*        <Suspense fallback={ <Skeleton animation='wave' variant='rounded' width={ 24 } height={ 24 }/> }><PassKey length={ passkey }/></Suspense>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}
        {/*<TableCell align="center" sx={{ width: 0 }}>*/}
        {/*    <Stack alignItems='center'>*/}
        {/*        <Suspense fallback={ <Skeleton animation='wave' variant='rounded' width={ 24 } height={ 24 }/> }><Activate value={ activate }/></Suspense>*/}
        {/*    </Stack>*/}
        {/*</TableCell>*/}
        <TableCell align="center" sx={{ width: 0 }}>
            <NoWrap variant='body2'>{ formatDate(updateTime, true) }</NoWrap>
        </TableCell>
        <TableCell align="center" sx={{ width: 0 }}>
            <NoWrap variant='body2'>{ formatDate(createTime, true) }</NoWrap>
        </TableCell>
        <TableCell onClick={ event => event.stopPropagation() } align="right" sx={{ cursor: 'default', position: 'sticky', right: 0, zIndex: 2, width: 0, background: theme.palette.background.default, borderLeft: `1px solid ${ theme.palette.divider }` }}>
            <Tooltip title={ canEdit ? 'Chỉnh sửa' : 'Bị hạn chế' } arrow disableInteractive>
            <span>
                <IconButton color='warning' disabled={ !canEdit } component={ Link } to={ `${ path.url }/${ id }` }>
                    <Edit/>
                </IconButton>
            </span>
            </Tooltip>
        </TableCell>
    </MuiTableRow>
}