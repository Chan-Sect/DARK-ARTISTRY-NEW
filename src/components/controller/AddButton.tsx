import {LocalHospital} from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Platform from "../../config/platform";
import {useDirection} from "../../main/providers/main";
import Direction from "../../config/directions/Direction.tsx";

interface Props
{
    name?: string
}
const Button = ({ name }: Props) =>
{
    const navigate = useNavigate()
    const { getLast } = useDirection()
    const location = useLocation()

    const last = getLast()
    const lastName = last instanceof Direction ? last.path.name : ''
    const lastUrl = last instanceof Direction ? last.path.url : undefined

    const defaultName = name || lastName

    const onClick = () =>
    {
        const url = lastUrl || location.pathname
        navigate(`${ url }/new`)
    }

    const onKeyDown = (event: KeyboardEvent) =>
    {
        const activate = (event.key === 'n' || event.key === 'N') && ((Platform.is.Apple && event.ctrlKey) || (!Platform.is.Apple && event.altKey))

        if (activate && Platform.is.PC)
        {
            event.preventDefault()
            onClick()
        }
    }

    useEffect(() =>
    {
        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Icon = (last instanceof Direction ? last.path.AddIcon : undefined) || LocalHospital

    return <Tooltip title={`Thêm${ defaultName ? ` ${ defaultName } `.toLocaleLowerCase() : ' ' }mới (${ Platform.is.Apple ? '⌃' : 'Alt + ' }N)`} disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile }>
        <IconButton onClick={ onClick } color='success'>
            <Icon/>
        </IconButton>
    </Tooltip>
}

const AddButton = ({ name }: Props) =>
{
    const { getLast, special } = useDirection() ||  { getLast: () => null }
    const last = getLast({ keepString : true })
    const insertable = Boolean(last instanceof Direction && last.insertable)

    return name ? <Button name={ name }/> : (insertable && !special) && <Button/>
}

export default AddButton