import { Restore } from "@mui/icons-material";
import Platform from "../../../config/platform/index.js";
import {IconButton, Tooltip} from "@mui/material";

const RestoreButton = ({ disabled, onClick }) =>
{
    return <Tooltip title={ disabled ? '' : 'Hoàn tác' } disableInteractive disableFocusListener disableTouchListener disableHoverListener={ Platform.is.Mobile }>
        <span>
            <IconButton color='primary' disabled={ disabled } onClick={ onClick }>
                <Restore/>
            </IconButton>
        </span>
    </Tooltip>
}

export default RestoreButton