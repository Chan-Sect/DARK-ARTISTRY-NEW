import {connect} from "react-redux";
import {styled} from "@mui/material";
import MuiBackdrop from "@mui/material/Backdrop";
import MuiLinearProgress from "@mui/material/LinearProgress";

const Container = styled(MuiBackdrop)(() =>
({
    zIndex: 999999999,
    background: 'transparent',
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'progress !important',
}))

const Progress = styled(MuiLinearProgress)(() =>
({
    width: '100%',
}))

const LoadingAPI = ({ load }: { load: boolean }) =>
{
    return <Container open={ load }>
        <Progress/>
    </Container>
}

const mapStateToProps = (value: { load: boolean }) => ({ load: value.load })
export default connect(mapStateToProps)(LoadingAPI)