import {styled} from "@mui/material"
import MuiList from "@mui/material/List";
import Navigator from "./Navigator.tsx";
import Direction from "../../config/directions/Direction.tsx";

const Container = styled(MuiList)(() =>
({
    flexGrow: 1
}))

const NavigatorsControl = () =>
{
    const renderPaths = () => Direction.VISIBLE.map((value, index) => <Navigator key={ index }>{ value }</Navigator>)

    return <Container>
        { renderPaths() }
    </Container>
}

export default NavigatorsControl