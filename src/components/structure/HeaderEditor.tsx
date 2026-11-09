import type {ProviderProps} from "../../main/providers/main";
import {Box, Stack, styled, TextField, Tooltip, useTheme} from "@mui/material"
import AvatarPicker from "../picker/AvatarPicker.tsx";
import Path from "../../config/directions/Path.ts";
import {NoWrap} from "../../config/style/Typography.tsx";
import type {ChangeEvent} from "react";

interface ColorProps
{
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

interface ColoredProps extends ColorProps
{
    fullHeight?: boolean
}

const Colored = styled(Box, { shouldForwardProp: props => (props !== 'color' && props !== 'fullHeight') })<ColoredProps>(({ theme, color = 'success', fullHeight = false }) =>
({
    position: 'absolute',
    left: 0.5,
    right: 0.5,
    top: 0,
    height: fullHeight ? '100%' : 'calc(50% - 50px)',
    zIndex: -1,
    background: theme.palette[color].main,
}))

const AvatarContainer = styled(Box)(({ theme }) =>
({

    padding: theme.spacing(1.5),
    background: theme.palette.background.paper,
    zIndex: 1,
    borderRadius: '50%',
    width: 200,

    [theme.breakpoints.up('sm')]:
    {
        margin: theme.spacing(2, 0, 0, 2),
    },
    [theme.breakpoints.down('sm')]:
    {
        margin: theme.spacing(2, 0, 0, 0),
    }
}))

const Information = styled(Box)(({ theme }) =>
({
    background: theme.palette.background.paper,
    right: 0,
    left: 0,

    [theme.breakpoints.up('sm')]:
    {
        paddingLeft: 240,
        position: 'absolute',
    },
    [theme.breakpoints.down('sm')]:
    {
        width: '100%',
        marginTop: -110,
        paddingTop: 110,
        textAlign: 'center',
    }
}))

interface EditorProps extends ProviderProps, ColorProps
{
    id?: string
    name?: string
    onChangeName?: (event: ChangeEvent<HTMLInputElement>) => void
    disableName?: boolean
}

const HeaderEditor = ({ children, color, id, name, onChangeName, disableName }: EditorProps) =>
{
    const theme = useTheme()
    return <Box sx={{ position: 'relative' }}>
        <Colored color={ color } />
        <Box sx={{ margin: theme.spacing(1, 0, ) }}>
            <Stack sx={{ width: '100%', position: 'relative', alignItems: 'center' }} direction={{ xs: 'column', sm: 'row' }}>
                <AvatarContainer>
                    <Tooltip title='Chọn ảnh' arrow disableInteractive>
                        <AvatarPicker variant='circular' editor>
                            <Path.AccountStudent.Icon/>
                        </AvatarPicker>
                    </Tooltip>
                </AvatarContainer>
                <Information>
                    <Stack sx={{ flexGrow: 1, padding: theme.spacing(2, 1, 1) }} spacing={ 1 }>
                        <Stack spacing={ 1 } direction='row' sx={{ alignItems: 'center' }} >
                            <TextField label='Tên người dùng' fullWidth disabled={ disableName } value={ name } onChange={ onChangeName }
                                       // slotProps={{ input: { endAdornment: <Activate value={ activate }/> }}}
                            />
                        </Stack>
                        { id && <NoWrap variant='caption' color={ theme.palette.secondary.main }>({ id })</NoWrap> }
                {/*        */}
                    </Stack>
                </Information>
            </Stack>
        </Box>
        { children }
    </Box>
}

export default HeaderEditor