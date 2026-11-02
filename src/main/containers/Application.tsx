import {styled} from "@mui/material";
import {Fragment, lazy, Suspense} from "react";
import LoadingAPI from "../fragment/LoadingAPI.tsx";
import MuiBox from "@mui/material/Box";
// import BackEndCrash from "../fragment/BackEndCrash.jsx";
import LoadingPage from "../fragment/LoadingPage.tsx";
import {useSelector} from "react-redux";
import {useLoader} from "../providers/main";
import type {ActionType} from "../../config/redux/action.ts";

const Container = styled(MuiBox)(() =>
({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
}))

const ErrorPage = lazy(() => import('../fragment/ErrorPage.tsx'))
const UnsignRoutes = lazy(() => import('./UnsignRoutes.tsx'))

const Application = () =>
{
    const error = useSelector((state: ActionType) => state.value)

    const { isBackEndReady
        // , isFrontEndReady
    } = useLoader()
    const renderRoutes = () => isBackEndReady && !error ? <UnsignRoutes/> : <ErrorPage/>

    return <Fragment>
        <LoadingAPI/>
        <Container>
            <Suspense fallback={ <LoadingPage/> }>
                {
                    // isFrontEndReady ?
                        renderRoutes()
                        // : <LoadingPage/>
                }
            </Suspense>
        </Container>
    </Fragment>

}
export default Application
