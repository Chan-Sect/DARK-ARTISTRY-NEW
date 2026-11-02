import {styled} from "@mui/material";
import MuiTypography from "@mui/material/Typography";

export const NoWrap = styled(MuiTypography)(() =>
({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
}))

// export const Note = ({ children, pass }) =>
// {
//     const theme = useTheme()
//
//     return <Stack direction='row' alignItems='center' spacing={ 0.5 }>
//         <FiberManualRecord fontSize='small' color={ pass ? 'primary' : 'secondary' }/>
//         <Typography variant='caption' color={ theme.palette[pass ? 'primary' : 'secondary'].main }>{ children }</Typography>
//     </Stack>
// }
//
// export const FullWidthText = props =>
// {
//     return <Stack sx={{ position: 'relative', flexGrow: 1 }}>
//         <Stack sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}>
//             <NoWrap { ...props }/>
//         </Stack>
//     </Stack>
// }