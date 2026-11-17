import {Avatar as MuiAvatar, Box, CircularProgress} from "@mui/material";
import type {ReactNode} from "react";
import URI from "../../config/connections/URI";

interface AvatarProps
{
    children?: ReactNode
    src: string | undefined
    size?: number
    variant?: 'circular' | 'square' | 'rounded'
}

const Avatar = ({ size = 40, variant = 'circular', src, children }: AvatarProps) =>
{
    return <Box sx={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={ size / 2 }/>
        <MuiAvatar variant={ variant } sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} src={ src ? `${ URI.server }/file/${ src }` : undefined }>
            { children }
        </MuiAvatar>
    </Box>
}

export default Avatar