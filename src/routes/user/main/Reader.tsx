import HeaderEditor from "../../../components/structure/HeaderEditor"
import {useParams} from "react-router-dom"
import {Box as MuiBox, Card, Stack, styled, TextField, Typography as MuiTypography, useTheme} from "@mui/material";
import type {ReactNode} from "react";
import {MailLock, Phone} from "@mui/icons-material";

// interface UserData
// {
//     name: string
//     mail: string
//     phone: string
//     image: File | string | null
// }

// const defaultData: UserData =
// {
//     name: '',
//     mail: '',
//     phone: '',
//     image: null
// }
const Typography = styled(MuiTypography)(({ theme }) =>
({
    flexGrow: 1,
    fontWeight: 700,
    fontSize: 20,
    userSelect: 'none',
    [theme.breakpoints.down('sm')]:
    {
        display: 'none',
    }
}))

const Box = styled(MuiBox)(({ theme }) =>
({
    [theme.breakpoints.down('sm')]:
    {
        flexGrow: 1
    },
    [theme.breakpoints.up('sm')]:
    {
        flexGrow: 0,
    }
}))

const Container = styled(Stack)(({ theme }) =>
({
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}))


interface ItemProps
{
    children: ReactNode
    label: string
    // icon: SvgIconComponent
    icon: ReactNode

}

const Item = ({ children, label, icon }: ItemProps) =>
{
    return <Card sx={{ flexGrow: 1 }}>
        <Container direction='row' spacing={ 2 }>
            <Box>
                { icon }
            </Box>
            <Typography >{ label }</Typography>
            { children }
        </Container>
    </Card>
}


interface EditorProps
{
    edit?: boolean,
}


const Reader = ({ edit }: EditorProps) =>
{
    const { id } = useParams()
    const theme = useTheme()

    const color = edit ? "warning" : "success"
    return <HeaderEditor id={ id } color={ color }>
        <Stack sx={{ padding: theme.spacing(0, 2, 1) }} spacing={ 1 }>
            <Stack spacing={ 1 } direction={{ xs: 'column' , sm: 'column', md: 'row' }}>
                <Card sx={{ flexGrow: 1 }}>
                    <Container direction='row' spacing={ 2 }>
                        <TextField fullWidth label='Địa chỉ mail' slotProps={{ htmlInput: { style: { textAlign: 'right' } }, input: { startAdornment: <MailLock sx={{ margin: theme.spacing(0, 1, 0, 0) }} />, endAdornment: <b>@gmail.com</b> }}} />
                    </Container>
                </Card>
                <Card sx={{ flexGrow: 1 }}>
                    <Container direction='row' spacing={ 2 }>
                        <TextField fullWidth label='Số điện thoại' slotProps={{ input: { startAdornment: <Phone sx={{ margin: theme.spacing(0, 1, 0, 0) }} /> }}} />
                    </Container>
                </Card>
            </Stack>
        </Stack>

        {/*{ edit ? <Editor/> : <Creator/> }*/}
    </HeaderEditor>
}

export default Reader