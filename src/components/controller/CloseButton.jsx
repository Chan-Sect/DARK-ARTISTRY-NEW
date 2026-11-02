import {Close} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Path from "../../../config/direction/Path.js"
import {useEffect} from "react";
import Platform from "../../../config/platform/index.js";
import {useDirection} from "../../main/providers/signed/DirectionProvider.jsx";

const Button = ({ path }) =>
{
    const location = useLocation()
    const navigate = useNavigate()
    const pressedKeys = new Set()
    const { getLast } = useDirection()

    const onClick = () =>
    {
        const last = getLast()?.url

        if (path) return navigate(path.url)
        else if (location.key !== 'default') navigate(-1)
        else if (last && location.pathname !== last) navigate(last, { replace: true })
        else navigate(Path.DashBoard.url, { replace: true })
    }

    const onKeyDown = event => pressedKeys.add(event.key)
    const onKeyUp = event =>
    {
        pressedKeys.delete(event.key)

        if (event.key === 'Escape' && pressedKeys.size === 0)
        {
            event.preventDefault()
            onClick()
        }
    }

    useEffect(() =>
    {
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)

        return () =>
        {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    return <Tooltip title='Đóng (Esc)' disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile }>
        <IconButton onClick={ onClick }>
            <Close/>
        </IconButton>
    </Tooltip>
}

const CloseButton = ({ visible }) =>
{
    const { getLast, special } = useDirection() || { getLast: () => null }
    const closeable = Boolean(getLast({ to: 'String' }))

    return visible ? <Button/> : (closeable && !special) && <Button/>
}

export default CloseButton