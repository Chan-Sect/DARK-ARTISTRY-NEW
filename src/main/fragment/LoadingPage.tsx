import {CircularProgress, styled} from "@mui/material";
import MuiStack from "@mui/material/Stack";

const Container = styled(MuiStack)(() =>
({
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
}))

const LoadingPage = () =>
{
    return <Container>
        <CircularProgress />
    </Container>
}

export default LoadingPage