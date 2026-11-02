import {Button, Stack, styled, Typography} from "@mui/material";
import BrokenPC from "../../components/PC/BrokenPC"
import {useLocation, useNavigate} from "react-router-dom";
import Path from "../../config/directions/Path.ts";
import {useEffect} from "react";
import {useDirection} from "../providers/main";
// import Path from "../../../config/direction/Path"

const Container = styled(Stack)(({ theme }) =>
({
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    textAlign: 'center',
    '& *':
    {
        userSelect: 'none !important',
    }
}))

const NotFoundPage = () =>
{
    const { setIsNotFound } = useDirection()
    const location = useLocation()
    const navigate = useNavigate()

    const visible = location.key !== 'default'

    const returnHome = () => navigate(Path.DashBoard.url, { replace: true })
    const returnPrevious = () => navigate(-1)

    useEffect(() =>
    {
        setIsNotFound(true)
        return () => setIsNotFound(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Container>
        <Stack direction={{ sm: 'column', md: 'row' }}>
            <Stack>
                <Typography variant='h1'>404</Typography>
                <Typography variant='h5'>Không tìm thấy trang mà bạn yêu cầu</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm : 2 }} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, alignItems: 'center', marginTop: 1, width: { xs: '100%', sm : 450 } }}>
                    <Button onClick={ returnHome } variant='outlined' fullWidth >Về trang chủ</Button>
                    <Typography sx={{ display: visible ? 'default' : 'none' }}>hoặc</Typography>
                    <Button onClick={ returnPrevious } variant='outlined' color='warning' fullWidth sx={{ display: visible ? 'default' : 'none' }}>Trang trước đó</Button>
                </Stack>
            </Stack>
            <BrokenPC/>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm : 2 }} sx={{ width: { xs: '100%', sm : 450 }, display: { sm: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Button onClick={ returnHome } variant='outlined' fullWidth >Về trang chủ</Button>
            <Typography sx={{ display: visible ? 'default' : 'none' }}>hoặc</Typography>
            <Button onClick={ returnPrevious } variant='outlined' color='warning' fullWidth sx={{ display: visible ? 'default' : 'none' }}>Trang trước đó</Button>
        </Stack>

    </Container>
}

export default NotFoundPage