import {styled} from "@mui/material"
import MuiList from "@mui/material/List";
import Navigator from "./Navigator.tsx";
import {useDirection} from "../providers/main";

const Container = styled(MuiList)(() =>
({
    flexGrow: 1
}))

const NavigatorsControl = () =>
{
    const { visible } = useDirection()

    const renderPaths = () => visible.map((value, index) => <Navigator key={ index }>{ value }</Navigator>)

    return <Container>
        { renderPaths() }
    </Container>
}

export default NavigatorsControl