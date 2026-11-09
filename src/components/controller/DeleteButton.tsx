import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Fragment, useState, useEffect} from "react";
import API from "../../config/connections/main/API.ts";
import {useAlert} from "../../main/providers/main";
import Platform from "../../config/platform";

interface DeleteButtonProps
{
    path: string
    children: string[]
    onFinish: (success: string[]) => Promise<void> | void
}

const DeleteButton = ({ path, onFinish, children }: DeleteButtonProps) =>
{
    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const { showError, showSuccess } = useAlert()

    const onClick = () =>
    {
        setOpen(true)
        setLoading(true)
    }
    const onCancel = () =>
    {
        setOpen(false)
        setLoading(false)
    }
    const onConfirm = async () =>
    {
        setOpen(false)

        const success: string[] = []

        for (const child of children)
        {
            const url = `${ path }/${ child }`

            const result = await API.DELETE(url)

            if (result.error) showError(result.message)
            else success.push(child)
        }
        setLoading(false)
        if (success.length > 0) showSuccess(`Xoá thành công ${ success.length } mục`)
        await onFinish(success)
    }

    useEffect(() =>
    {
        const handleKeyDown = (event: KeyboardEvent) =>
        {
            if (open)
            {
                event.stopPropagation()
                event.preventDefault()
            }
        }

        document.addEventListener('keydown', handleKeyDown, true)
        return () => document.removeEventListener('keydown', handleKeyDown, true)
    }, [open])

    return <Fragment>
        <Tooltip title={ typeof children === 'string' ? 'Xoá' : children.length > 0 ? `Xoá ${ children.length } mục` : '' } disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile }>
            <span>
                 <IconButton loading={ loading } color='error' disabled={ children.length === 0 } onClick={ onClick }>
                    <Delete/>
                </IconButton>
            </span>
        </Tooltip>
        <Dialog open={ open } onClose={ onCancel } closeAfterTransition={ false }>
            <DialogTitle>Xác nhận xoá</DialogTitle>
            <DialogContent>
                <DialogContentText>Bạn có chắc chắn muốn xoá <b>{ typeof children === 'string' ? '' : `${ children.length } mục`}</b>?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={ onConfirm }>
                    Xoá
                </Button>
                <Button variant='contained' onClick={ onCancel } autoFocus>
                    Huỷ
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

export default DeleteButton