import {forwardRef, type ReactNode} from "react";
import {type SnackbarKey, useSnackbar} from "notistack";
import {IconButton, styled, typographyClasses} from "@mui/material";
import {Close} from "@mui/icons-material";
import MuiStack from "@mui/material/Stack";
import MuiTypography from "@mui/material/Typography";
import {darken, emphasize, lighten} from "@mui/material/styles";
import {Link} from "react-router-dom";
import {type NotificationType} from "./Notification.tsx";

interface ContainerProps
{
    code: 'success' | 'error' | 'warning' | 'info' | 'primary'
}

const Container = styled(MuiStack, { shouldForwardProp: props => props !== 'code' })<{ code: ContainerProps['code'] }>(({ theme, code }) =>
({
    background: theme.palette.mode === 'dark' ? theme.palette[code].main : lighten(theme.palette[code].main, 0.9),
    padding: theme.spacing(0.5, 0.5, 0.5, 2),
    border: `1px solid ${ theme.palette[code].main }`,
    borderRadius: theme.spacing(1),
    color: theme.palette[code].main,
    alignItems: 'center',

    [`& .${ typographyClasses.root }`]:
    {
        color : theme.palette.mode === 'dark' ? emphasize(theme.palette[code].main, 0.7) : darken(theme.palette[code].main, 0.2)
    },
    '& *':
    {
        color : theme.palette.mode === 'dark' ? emphasize(theme.palette[code].main, 0.7) : theme.palette[code].main
    }
}))
const Text = styled(MuiTypography)(({ theme }) =>
({
    margin: theme.spacing(0, 1, 0, 2),
    textDecoration: 'none',
    flexGrow: 1,
    width: 'calc(100% - 40px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',

}))

// { content, path, icon, type: Notification.Success }

export interface AlertProps
{
    type: NotificationType
    icon: ReactNode
    path: string
    content: string
}
interface AlertComponentProps extends AlertProps
{
    id: SnackbarKey
}

export const AlertComponent = forwardRef<HTMLDivElement, AlertComponentProps>(({ type, icon, path, content, id }, ref) =>
{
    const { closeSnackbar } = useSnackbar()

    const close = () => closeSnackbar(id)

    return <Container code={ type.code } ref={ ref } spacing={ 1 } direction="row">
        { type.icon || icon }
        <Link to={ path } onClick={ close }>
            <Text>{ content || '' }</Text>
        </Link>

        <IconButton onClick={ close }><Close/></IconButton>
        {/*<audio autoPlay={ setting.sound.notification } src={ `/media/notification-${ type.code || 'info' }.mp3` }/>*/}
    </Container>
})

// export const MessageComponent = forwardRef(({ inboxType, message, id }, ref) =>
// {
//     const theme = useTheme()
//     const { closeSnackbar } = useSnackbar()
//     const { setting } = useLoader()
//
//     const close = () => closeSnackbar(id)
//
//     const { sender, data, type } = message.info
//     const { name, picture } = sender
//
//     const getData = () =>
//     {
//         switch (type)
//         {
//             case Type.Text:
//             case Type.Link: return data
//             case Type.Image: return '[Hình ảnh]'
//             case Type.Audio: return '[Bản ghi âm thanh]'
//             case Type.Video: return '[Video]'
//             case Type.File: return '[Tệp đính kèm]'
//             default: return null
//         }
//     }
//
//     const getPath = () =>
//     {
//         switch (inboxType)
//         {
//             case 'private': return `${ Path.Inbox.url }/${ message.inbox }`
//             case 'global': return `${ Path.MessageGlobal.url }/${ message.inbox }`
//             default: return null
//         }
//     }
//
//     return <Card ref={ ref } sx={{ padding: theme.spacing(0.5, 0.5, 0.5, 2) }}>
//         <MuiStack direction="row" alignItems="center">
//             <Avatar src={ picture ? `${ URI.server }/${ picture }?time=${ Date.now() }` : undefined }/>
//             <MuiStack sx={{ flexGrow: 1 }}>
//                 <Text fontWeight={ 700 } color={ theme.palette.action.active }>
//                     { name }
//                 </Text>
//                 <Text variant='caption' color={ theme.palette.secondary.main }>
//                     { getData() }
//                 </Text>
//             </MuiStack>
//             <IconButton onClick={ close } component={ Link } to={ getPath() }><Path.Message.Icon/></IconButton>
//             <IconButton onClick={ close }><Close/></IconButton>
//         </MuiStack>
//
//         <audio autoPlay={ setting.sound.notification } src='/audio/notification-info.mp3'/>
//     </Card>
//
// })