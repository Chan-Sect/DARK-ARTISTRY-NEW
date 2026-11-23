import LoadingAnimation from '../../assets/animation/web-server.json'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {Stack, Typography} from "@mui/material";

const ServerLoading = () =>
{
    return <Stack sx={{ padding: 2, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <DotLottieReact data={ LoadingAnimation } loop autoplay/>
        <Typography>
            Đang tải, đợi chút nhé...
        </Typography>
    </Stack>
}

export default ServerLoading