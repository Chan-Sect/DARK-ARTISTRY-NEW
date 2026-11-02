import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {Check, PeopleAlt, PersonAdd} from "@mui/icons-material";
import API from "../../../config/connection/main/API.js";
import {useAlert} from "../../main/providers/unsigned/AlertProvider.jsx";
import {useLoader} from "../../main/providers/unsigned/LoaderProvider.jsx";

const FriendButton = ({ children }) =>
{
    const { showError, showSignInDialog } = useAlert()
    const { currentUser } = useLoader()

    const [friend, setFriend] = useState(null)
    const [open, setOpen] = useState({ cancel: false, confirm : false, accepted: false })

    const load = async () =>
    {
        if (currentUser)
        {
            const result = await API.GET(`friend/${ children }`)
            if (!result.error) setFriend(result)
        }
        else setFriend(null)
    }

    const onClick = async () =>
    {
        if (currentUser)
        {
            if (friend === null)
            {
                const result = await API.POST(`friend/${ children }`)
                if (result.error) showError(result.message)
                else setFriend(result)
            }
            else if (friend.accepted) onOpen('accepted')
            else if (currentUser.id === friend.from.id) onOpen('cancel')
            else onOpen('confirm')
        }
        else showSignInDialog()
    }

    const onDelete = async () =>
    {
        onClose('cancel')()
        onClose('accepted')()

        const result = await API.DELETE(`friend/${ friend.id }`)
        if (result.error) showError(result.message)
        else setFriend(null)
    }

    const onConfirm = async () =>
    {
        onClose('confirm')()

        const result = await API.PUT(`friend/${ friend.id }`)
        if (result.error) showError(result.message)
        else setFriend(result)
    }

    const onClose = name => () => setOpen(old => ({ ...old, [name]: false }))
    const onOpen = name => setOpen(old => ({ ...old, [name]: true }))

    useEffect(()=>
    {
        load().then()
    }, [currentUser])

    const Icon = friend === null ? PersonAdd : friend?.accepted ? PeopleAlt : Check
    const title = friend === null ? 'Kết bạn' : friend?.accepted ? 'Bạn bè' : (currentUser?.id === friend?.from.id) ? 'Đã gửi yêu cầu' : 'Đã nhận yêu cầu'
    const color = friend === null ? 'success' : friend?.accepted ? 'secondary' : (currentUser?.id === friend?.from.id) ? 'primary' : 'info'


    const render = () => <Button onClick={ onClick } endIcon={ <Icon/> } color={ color } variant='contained'>{ title }</Button>

    return <Fragment>
        { render() }
        <Dialog open={ open.accepted } onClose={ onClose('accepted') }>
            <DialogTitle>Các bạn đã là bạn bè</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Huỷ kết bạn với người dùng này?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={ onDelete } fullWidth>
                    Đồng ý
                </Button>
                <Button variant='outlined' onClick={ onClose('accepted') } fullWidth autoFocus>
                    Huỷ bỏ
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={ open.confirm } onClose={ onClose('confirm') }>
            <DialogTitle>Đã nhận yêu cầu kết bạn</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Đồng ý lời mời kết bạn từ người dùng này?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='success' onClick={ onConfirm } fullWidth autoFocus>
                    Đồng ý
                </Button>
                <Button variant='outlined' onClick={ onClose('confirm') } fullWidth>
                    Huỷ bỏ
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={ open.cancel } onClose={ onClose('cancel') }>
            <DialogTitle>Đã gửi yêu cầu kết bạn</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Huỷ yêu cầu kết bạn?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={ onDelete } fullWidth>
                    Đồng ý
                </Button>
                <Button variant='outlined' onClick={ onClose('cancel') } fullWidth autoFocus>
                    Huỷ bỏ
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default FriendButton