import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Tooltip
} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Platform from "../../../config/platform/index.js";
import {Fragment, JSX, useEffect, useState} from "react";
import API from "../../../config/connection/main/API.js";
import { useAlert} from "../../main/providers/unsigned/AlertProviderTS";

interface DeleteButtonTSProps
{
    path: string,
    onFinish?: (prop: any) => void,
    children?: any,
}

const DeleteButton = ({ path, onFinish, children }: DeleteButtonTSProps): JSX.Element =>
{
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const { showError, showSuccess } = useAlert()

    {
        if (Boolean(path))
        {
            setOpen(true)
            setLoading(true)
        }
    }
    const onClick = () =>
    {
        if (Boolean(path))
        {
            setOpen(true)
            setLoading(true)
        }
    }
    const onCancel = (): void =>
    {
        setOpen(false)
        setLoading(false)
    }
    const onConfirm = async (): Promise<void> =>
    {
        setOpen(false)

        if (typeof children === 'string')
        {
            const url = `${ path }/${ children }`

            const result = await API.DELETE(url)

            if (result.error) showError(result.message)
            else showSuccess('Đã xoá 1 mục')
            if (onFinish !== undefined) onFinish(children)

            setLoading(false)
        }
        else
        {
            const success = []

            for (const child of children)
            {
                const url = `${ path }/${ child }`

                const result = await API.DELETE(url)

                if (result.error) showError(result.message)
                else success.push(child)
            }
            setLoading(false)
            if (success.length > 0) showSuccess(`Xoá thành công ${ success.length } mục`)
            if (onFinish !== undefined) onFinish(success)
        }


    }

    useEffect(() =>
    {
        const handleKeyDown = (event: Event) =>
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