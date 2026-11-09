import {Close} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { useDirection } from "../../main/providers/main";
import Path from "../../config/directions/Path.ts";
import Platform from "../../config/platform";
import Direction from "../../config/directions/Direction.tsx";

interface ButtonProps
{
    path?: Path
}
const Button = ({ path }: ButtonProps) =>
{
    const location = useLocation()
    const navigate = useNavigate()
    const pressedKeys = new Set()
    const { getLast } = useDirection()

    const onClick = () =>
    {
        const last = getLast()
        const url = last instanceof Direction ? last.path.url : undefined

        if (path) return navigate(path.url)
        else if (location.key !== 'default') navigate(-1)
        else if (url && location.pathname !== url) navigate(url, { replace: true })
        else navigate(Path.DashBoard.url, { replace: true })
    }

    useEffect(() =>
    {
        const onKeyDown = (event: KeyboardEvent) => pressedKeys.add(event.key)
        const onKeyUp = (event: KeyboardEvent) =>
        {
            pressedKeys.delete(event.key)

            if (event.key === 'Escape' && pressedKeys.size === 0)
            {
                event.preventDefault()
                onClick()
            }
        }

        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)

        return () =>
        {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Tooltip title='Đóng (Esc)' disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile }>
        <IconButton onClick={ onClick }>
            <Close/>
        </IconButton>
    </Tooltip>
}

interface CloseButtonProps
{
    visible?: boolean
}

const CloseButton = ({ visible }: CloseButtonProps) =>
{
    const { getLast, special } = useDirection()
    const closeable = Boolean(getLast({ asString: true }))

    return visible ? <Button/> : (closeable && !special) && <Button/>
}

export default CloseButton