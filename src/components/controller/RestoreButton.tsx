import { Restore } from "@mui/icons-material";
import {IconButton, Tooltip} from "@mui/material";
import Platform from "../../config/platform";

interface RestoreButtonProps
{
    disabled?: boolean;
    onRestore: () => void
}

const RestoreButton = ({ disabled, onRestore }: RestoreButtonProps) =>
{
    return <Tooltip title={ disabled ? '' : 'Hoàn tác' } disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile }>
        <span>
            <IconButton color='primary' disabled={ disabled } onClick={ onRestore }>
                <Restore/>
            </IconButton>
        </span>
    </Tooltip>
}

export default RestoreButton