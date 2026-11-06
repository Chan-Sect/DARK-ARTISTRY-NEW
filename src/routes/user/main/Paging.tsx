import {Pagination, Stack, useTheme} from "@mui/material"
import useStorage from "../storage";

const Paging = () =>
{
    const theme = useTheme()

    const { page, count, view, onChangePage } = useStorage()

    const getCount = () => Math.ceil(count / view.max)

    return getCount() > 1 && <Stack sx={{ alignItems: 'center', padding: theme.spacing(1) }}>
        <Pagination count={ getCount() } page={ page + 1 } shape="rounded" onChange={ onChangePage } />
    </Stack>
}

export default Paging