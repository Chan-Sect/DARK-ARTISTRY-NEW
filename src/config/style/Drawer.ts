import {styled} from '@mui/material'
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer'

export const TableDrawer = styled(MuiSwipeableDrawer)(({ theme }) =>
({
    zIndex: theme.zIndex.appBar - 1,

    [`& .MuiDrawer-paper`]:
    {
        background: theme.palette.background.paper,

    }
}))