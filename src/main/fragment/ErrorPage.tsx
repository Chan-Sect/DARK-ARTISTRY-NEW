import {useEffect} from "react";
import {Button, Stack, styled, Typography, useTheme} from "@mui/material";
import MuiStack from "@mui/material/Stack";
import {Refresh} from '@mui/icons-material'
import BrokenPC from "../../components/PC/BrokenPC";

const Container = styled(MuiStack)(({ theme }) =>
({
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
}))

const ErrorPage = () =>
{
    const theme = useTheme()

    const reload = () => window.location.reload()

    useEffect(() =>
    {
        document.title = `Back-End đi rồi ông giáo ạ`
    }, [])

    return <Container direction={{ md: 'row-reverse', sm: 'column' }}>
        <BrokenPC/>
        <Stack sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <Typography variant='h4'>Server Back-End của bạn</Typography>
            <Typography>Đã cút</Typography>
            <Stack>
                <Button variant='outlined' onClick={ reload } color='warning' endIcon={ <Refresh/> }>Tải lại trang</Button>
                <Typography variant='caption' color={ theme.palette.secondary.main }><i>Đừng hi vọng gì nhiều, có khi tải lại nó cũng không hoạt động đâu :)</i></Typography>
                <Typography variant='caption' color={ theme.palette.secondary.main }><i>Nhấn chơi chơi cho vui giết thời gian nha fen</i></Typography>
            </Stack>
        </Stack>
    </Container>
}

export default ErrorPage