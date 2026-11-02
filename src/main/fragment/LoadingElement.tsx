import { styled } from "@mui/material";
import MuiStack from "@mui/material/Stack";
import MuiSkeleton from "@mui/material/Skeleton";

const Container = styled(MuiStack)(() =>
({
    width: '100%',
    height: '100%',
}))
const Skeleton = styled(MuiSkeleton)(({ theme}) =>
({
    margin: theme.spacing(2),
    flexGrow: 1,
}))

const LoadingElement = () =>
{
    return <Container>
        <Skeleton variant='rounded' animation='wave'/>
    </Container>
}

export default LoadingElement
