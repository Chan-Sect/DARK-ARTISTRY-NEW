import {useEffect, useState} from 'react'
import {IconButton, Tooltip} from "@mui/material";
import {Save} from "@mui/icons-material";
import Platform from "../../../config/platform/index.js";

const SaveButton = ({ disabled, onSave }) =>
{
    const [loading, setLoading] = useState(false)
    const canSave = !disabled && !loading

    const onClick = async () =>
    {
        setLoading(true)
        if (onSave) await onSave()
        setLoading(false)
    }

    const onKeyDown = async event =>
    {
        const activate = (event.key === 's' || event.key === 'S') && ((Platform.is.Apple && event.metaKey) || (!Platform.is.Apple && event.ctrlKey))

        if (activate && Platform.is.PC)
        {
            event.preventDefault()
            if (canSave) await onClick()
        }
    }

    useEffect(() =>
    {
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [canSave, onSave])


    return <Tooltip title={ loading ? 'Đang lưu...' : `Lưu (${ Platform.is.Apple ? '⌘' : 'Ctrl + ' }S)` } disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile || Boolean(disabled) }>
        <span>
            <IconButton onClick={ onClick } disabled={ Boolean(disabled) } color='success' loading={ loading }>
            <Save/>
        </IconButton>
        </span>
    </Tooltip>
}

export default SaveButton