import {useCallback, useEffect, useState} from 'react'
import {IconButton, Tooltip} from "@mui/material";
import {Save} from "@mui/icons-material";
import Platform from "../../config/platform";

interface SaveButtonProps
{
    onSave: () => Promise<void> | void
    disabled?: boolean
}

const SaveButton = ({ disabled, onSave }: SaveButtonProps) =>
{
    const [loading, setLoading] = useState(false)
    const canSave = !disabled && !loading

    const onClick =  useCallback(async () =>
    {
        setLoading(true)
        await onSave()
        setLoading(false)
    }, [onSave])

    useEffect(() =>
    {
        const onKeyDown = async (event: KeyboardEvent) =>
        {
            const activate = (event.key === 's' || event.key === 'S') && ((Platform.is.Apple && event.metaKey) || (!Platform.is.Apple && event.ctrlKey))

            if (activate && Platform.is.PC)
            {
                event.preventDefault()
                if (canSave) await onClick()
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [canSave, onClick, onSave])


    return <Tooltip title={ loading ? 'Đang lưu...' : `Lưu (${ Platform.is.Apple ? '⌘' : 'Ctrl + ' }S)` } disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile || Boolean(disabled) }>
        <span>
            <IconButton onClick={ onClick } disabled={ Boolean(disabled) } color='success' loading={ loading }>
            <Save/>
        </IconButton>
        </span>
    </Tooltip>
}

export default SaveButton