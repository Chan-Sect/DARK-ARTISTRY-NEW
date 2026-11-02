import {styled} from "@mui/material";
import MuiStack from "@mui/material/Stack";
import {ReportOutlined, ScreenshotMonitor, ScreenshotMonitorTwoTone, Settings} from '@mui/icons-material'

const Container = styled(MuiStack)(({ theme }) =>
({
    margin: theme.spacing(-2, 0),
    alignItems: 'center',
    justifyContent: 'center',
    '@keyframes rotate-1':
    {
        '0%':
        {
            transform: 'rotate(0)'
        },
        '50%':
        {
            transform: 'rotate(180deg)'
        },
        '100%':
        {
            transform: 'rotate(360deg)'
        },
    },
    '@keyframes rotate-2':
    {
        '0%':
        {
            transform: 'rotate(0)'
        },
        '50%':
        {
            transform: 'rotate(-180deg)'
        },
        '100%':
        {
            transform: 'rotate(-360deg)'
        },
    },
    '@keyframes blind-1':
    {
        '0%, 2%, 4%':
        {
            opacity: 1,
        },
        '1%, 3%':
        {
            opacity: 0,
        },
    },
    '@keyframes blind-2':
    {
        '0%, 100%':
        {
            opacity: 1,
        },
        '50%':
        {
            opacity: 0,
        },
    }
}))

const BrokenPC = () =>
{
    return <Container>
        <ScreenshotMonitor color='primary' sx={{ height: 200, width: 'auto' }}/>
        <ScreenshotMonitorTwoTone color='primary' sx={{ animation : 'blind-1 11s ease-in infinite', height: 200, width: 'auto', position: 'absolute' }}/>
        <ReportOutlined color='secondary' sx={{ animation : 'blind-2 0.75s ease-in-out infinite', height: 25, width: 'auto', position: 'absolute', mt: -10, ml: 12.5 }}/>
        <Settings color='secondary' sx={{ animation : 'rotate-1 7s linear infinite', height: 75, width: 'auto', position: 'absolute', mt: -2 }}/>
        <Settings color='secondary' sx={{ animation : 'rotate-2 5s linear infinite', height: 35, width: 'auto', position: 'absolute', mt: 5, ml: -11 }}/>
    </Container>
}

export default BrokenPC