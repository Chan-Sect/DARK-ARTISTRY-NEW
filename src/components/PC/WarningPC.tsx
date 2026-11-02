import {styled} from "@mui/material";
import MuiStack from "@mui/material/Stack";
import {Monitor, MonitorTwoTone, WarningAmberRounded} from '@mui/icons-material'

const Container = styled(MuiStack)(({ theme }) =>
({
   margin: theme.spacing(-2, 0),
   alignItems: 'center',
   justifyContent: 'center',

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

const WarningPC = () =>
{
    return <Container>
        <Monitor color='primary' sx={{ height: 200, width: 'auto' }}/>
        <MonitorTwoTone color='primary' sx={{ animation : 'blind-1 11s ease-in infinite', height: 200, width: 'auto', position: 'absolute' }}/>
        <WarningAmberRounded color='warning' sx={{ animation : 'blind-2 0.75s ease-in-out infinite', height: 100, width: 'auto', position: 'absolute', mt: -3.5 }}/>
    </Container>
}

export default WarningPC