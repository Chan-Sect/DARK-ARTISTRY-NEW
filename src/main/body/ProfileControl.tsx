// import {Avatar, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Tooltip, useTheme} from "@mui/material";
// import {Logout} from "@mui/icons-material";
// import {Fragment, useState} from "react";
//
// import {useLoader} from "../providers/unsigned/LoaderProvider.tsx";
// import MuiList from "@mui/material/List";
// import API from "../../../config/connection/main/API.js";
// import {useAlert} from "../providers/unsigned/AlertProvider.tsx";
// import {useContainer} from "../providers/signed/ContainerProvider.tsx";
// import {NoWrap} from "../../../config/style/Typography.jsx";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import Path from "../../../config/direction/Path.js";
// import {Link, useLocation} from "react-router-dom";
// import URL from "../../../config/connection/URI";
//
// const openedMixin = theme =>
// ({
//     transition: theme.transitions.create(['margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
//     marginLeft: '-100%',
// })
// const closedMixin = theme =>
// ({
//     transition: theme.transitions.create(['margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
//     marginLeft: 0,
// })
//
// export const Controller = styled(MuiList, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) =>
// ({
//     width: '100%',
//     height: '100%',
//
//     ...(open && { ...openedMixin(theme) }),
//     ...(!open && {...closedMixin(theme) }),
// }))
//
// const ProfileControl = () =>
// {
//     const { currentUser, setCurrentUser } = useLoader()
//     const { menuControlOpen, setMenuControlOpen } = useContainer()
//     const theme = useTheme()
//     const location = useLocation()
//
//
//     // const [open, setOpen] = useState(false)
//     const [isSignOut, setIsSignOut] = useState(false)
//
//     const xs = useMediaQuery(theme.breakpoints.down('sm'))
//     const lg = useMediaQuery(theme.breakpoints.up('lg'))
//
//     const { picture, name } = currentUser
//     const { showError } = useAlert()
//
//     const isSelected = path => location.pathname.startsWith(path.url)
//
//     const onLinkClick = () => setMenuControlOpen(old => lg ? old : false)
//     const onSignOut = () => setIsSignOut(true)
//     const onCancel = () => setIsSignOut(false)
//     const onOpen = () =>
//     {
//         setMenuControlOpen(true)
//     }
//     const onConfirm = async () =>
//     {
//         const result = await API.DELETE('sign')
//         if (result.error) showError(result.message)
//         else setCurrentUser(null)
//     }
//
//     return <Fragment>
//         <Stack direction='row' sx={{ width: '200%', overflow: 'hidden', marginTop: 1 }}>
//             <Controller open={ xs || menuControlOpen }>
//                 <Tooltip title={ name }>
//                     <ListItem dense>
//                         <ListItemButton dense sx={{ padding: theme.spacing(1) }} onClick={ onOpen }>
//                             <ListItemAvatar>
//                                 <Avatar src={ picture ? `${ URL.server }/${ picture }` : null }/>
//                             </ListItemAvatar>
//                         </ListItemButton>
//                     </ListItem>
//                 </Tooltip>
//             </Controller>
//             <Box sx={{ width: '100%', height: '100%', marginTop: xs ? 1 : 0 }}>
//                 <Collapse in={ xs || menuControlOpen } timeout="auto" sx={{ width: '50%' }}>
//                     <Stack alignItems='center'  sx={{ margin: theme.spacing(0, 0), '& *': { userSelect: 'none' } }}>
//                         <Avatar src={ picture ? `${ URL.server }/${ picture }` : null } sx={{ width: 100, height: 100, marginBottom: 1 }}/>
//                         <NoWrap fontWeight={ 700 } color={ theme.palette.action.active }>{ name }</NoWrap>
//                         <Stack direction='row' sx={{ marginBottom: xs ? 0 : 0.5 }}>
//                             <Tooltip title={ Path.Profile.name } arrow disableInteractive placement='top'>
//                                 <IconButton color={ isSelected(Path.Profile) ? 'primary' : 'default' } onClick={ onLinkClick } component={ Link } to={ Path.Profile.url }><Path.Profile.Icon/></IconButton>
//                             </Tooltip>
//                             <Tooltip title={ Path.Inbox.name } arrow disableInteractive placement='top'>
//                                 <IconButton color={ isSelected(Path.Inbox) ? 'primary' : 'default' } onClick={ onLinkClick } component={ Link } to={ Path.Inbox.url }><Path.Inbox.Icon/></IconButton>
//                             </Tooltip>
//                             <Tooltip title={ Path.Notification.name } arrow disableInteractive placement='top'>
//                                 <IconButton color={ isSelected(Path.Notification) ? 'primary' : 'default' } onClick={ onLinkClick } component={ Link } to={ Path.Notification.url }><Path.Notification.Icon/></IconButton>
//                             </Tooltip>
//                             <Tooltip title={ Path.Setting.name } arrow disableInteractive placement='top'>
//                                 <IconButton color={ isSelected(Path.Setting) ? 'primary' : 'default' } onClick={ onLinkClick } component={ Link } to={ Path.Setting.url }><Path.Setting.Icon/></IconButton>
//                             </Tooltip>
//                             {
//                                 xs && <Tooltip title='Đăng xuất'>
//                                     <IconButton onClick={ onSignOut } color='error'><Logout/></IconButton>
//                                 </Tooltip>
//                             }
//                         </Stack>
//                     </Stack>
//                     <List sx={{ display: xs ? 'none' : 'default' }}>
//                         <Divider/>
//                         <ListItem sx={{ '& *': { color: theme.palette.error.main } }}>
//                             <ListItemButton onClick={ onSignOut } >
//                                 <ListItemIcon>
//                                     <Logout/>
//                                 </ListItemIcon>
//                                 <ListItemText primary='Đăng xuất'/>
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                 </Collapse>
//             </Box>
//         </Stack>
//         <Dialog open={ isSignOut } onClose={ onCancel }>
//             <DialogTitle>Đăng xuất</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Bạn có thực sự muốn đăng xuất?
//                 </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                 <Button variant='outlined' onClick={ onConfirm }>
//                     Có
//                 </Button>
//                 <Button variant='contained' onClick={ onCancel } autoFocus>
//                     Không
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     </Fragment>
// }
//
// export default ProfileControl