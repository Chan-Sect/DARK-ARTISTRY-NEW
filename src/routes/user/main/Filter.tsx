import {
    Button,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from "@mui/material";
import useStorage from "../storage";
import {useState} from "react";
import {isEqual} from "../../../config/text/sort.ts";
import ViewMode from "../storage/ViewMode.ts";
import {TableDrawer} from "../../../config/style/Drawer.ts";
import {Close} from "@mui/icons-material";
import {InputSearch} from "../../../config/style/TextField.tsx";

const Filter = () =>
{
    const theme = useTheme()
    const { view, onChangeView,
        onChangeFilter,
        filter, onResetFilter, defaultFilter,
        max, count
    } = useStorage()

    const [open, setOpen] = useState(false)

    const equals = () =>
    {
        const a: Record<string, unknown> = { ...filter }
        const b: Record<string, unknown> = { ...defaultFilter }
        delete a.search
        delete b.search

        return isEqual(a, b)
    }
    const onOpen = () => setOpen(true)
    const onClose = () => setOpen(false)
    const onClick = () =>
    {
        onClose()
        onResetFilter()
    }

    const renderView = () => [ViewMode.Grid, ViewMode.List].map((item, index) =>
    {
        const Icon = item.Icon
        return <ToggleButton value={ item.value } key={ index } size='small'>
            <Icon/>
        </ToggleButton>
    })

    // const onChange = name => value => onChangeFilter({ target: { name, value } })
    // const onChangeRole = value =>
    // {
    //     if (value.length > 1)
    //     {
    //         if (value[value.length - 1] === 'default') onChangeFilter({ target: { name: 'role', value: ['default'] } })
    //         else onChangeFilter({ target: { name: 'role', value: value.filter(item => item !== 'default') } })
    //     }
    //     else onChangeFilter({ target: { name: 'role', value } })
    // }

    return <Stack direction='row' spacing={ 1 } sx={{ padding: theme.spacing(1) }}>
        <InputSearch onClick={ onOpen } value={ filter.search } onChange={ onChangeFilter } color={ equals() ? 'primary' : 'warning' } onClear={ !equals() && filter.search.length === 0 && count === 0 && max !== 0 ? onResetFilter : undefined }/>
        <ToggleButtonGroup value={ view.value } onChange={ onChangeView } exclusive>
            { renderView() }
        </ToggleButtonGroup>
        <TableDrawer anchor='right' open={ open } onClose={ onClose } onOpen={ onOpen }>
            <Toolbar/>
            <Stack spacing={ 1 } sx={{ width: { xs: 'calc(100vw - 16px)', sm: 500 }, height: '100%', padding: theme.spacing(1) }}>
                <Stack direction='row' sx={{ alignItems: 'center', padding: theme.spacing(0, 0, 0, 1) }}>
                    <Typography variant='h5' sx={{ flexGrow: 1 }}>Bộ lọc</Typography>
                    <Tooltip title='Đóng' arrow disableInteractive>
                        <IconButton onClick={ onClose }><Close/></IconButton>
                    </Tooltip>
                </Stack>
                <Stack spacing={ 1 } sx={{ flexGrow: 1 }}>
                    {/*<Paper sx={{ padding: 1 }}>*/}
                    {/*    <Suspense fallback={ <LoadingElement/> }><Role value={ filter.role } onChange={ onChangeRole }/></Suspense>*/}
                    {/*</Paper>*/}
                    {/*<Item name='activate'>*/}
                    {/*    Trạng thái*/}
                    {/*</Item>*/}
                    {/*<Item name='otp'>*/}
                    {/*    Xác thực*/}
                    {/*</Item>*/}
                    {/*<Item name='passkey'>*/}
                    {/*    Mã khoá*/}
                    {/*</Item>*/}
                    {/*<Item name='google'>*/}
                    {/*    Google*/}
                    {/*</Item>*/}
                    {/*<Item name='github'>*/}
                    {/*    Github*/}
                    {/*</Item>*/}
                    {/*<Item name='discord'>*/}
                    {/*    Discord*/}
                    {/*</Item>*/}
                    {/*<Stack spacing={ 1 }>*/}
                    {/*    <Typography sx={{ userSelect: 'none', alignItems: 'center', display: 'flex' }} fontWeight={ 700 }><FiberManualRecord fontSize='inherit' sx={{ mr: 1 }}/>Ngày tạo</Typography>*/}
                    {/*    <Paper sx={{ padding: 1 }}>*/}
                    {/*        <Suspense fallback={ <LoadingElement/> }><Range value={ filter.time } range={ defaultFilter.time } onChange={ onChange('time') }/></Suspense>*/}
                    {/*    </Paper>*/}
                    {/*</Stack>*/}
                </Stack>
                <Button variant='outlined' color='error' onClick={ onClick } disabled={ equals() }>
                    Xoá bộ lọc
                </Button>
            </Stack>
        </TableDrawer>
    </Stack>
}

export default Filter