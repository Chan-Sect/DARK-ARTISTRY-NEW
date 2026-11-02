import {BrowserRouter} from "react-router-dom"
import LoaderProvider from "./LoaderProvider.tsx"
import AlertProvider from "./AlertProvider.tsx";
import {lazy, Suspense} from "react";
import LoadingPage from "../../fragment/LoadingPage.tsx";
import {styled} from "@mui/material";
import MuiBox from "@mui/material/Box";

const Container = styled(MuiBox)(() =>
({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
}))

const Application = lazy(() => import("../../containers/Application.tsx"))

const Providers = () =>
{
    return <BrowserRouter>
        <LoaderProvider>
            <AlertProvider>
                <Suspense fallback={ <Container><LoadingPage/></Container> }>
                    <Application/>
                </Suspense>
            </AlertProvider>
        </LoaderProvider>
    </BrowserRouter>
}

export default Providers

