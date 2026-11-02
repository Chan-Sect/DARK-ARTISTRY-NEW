import {Route, Routes} from "react-router-dom";
// import {useLoader} from "../providers/unsigned/LoaderProvider.tsx";
import {lazy, Suspense} from "react";
import LoadingPage from "../fragment/LoadingPage.tsx";
// import OAuth from "../../elements/sign/OAuth.jsx";

const Providers = lazy(() => import("../providers/signed/Providers"))
// const SignIn = lazy(() => import("../../route/SignIn"))


const UnsignRoutes = () =>
{
    // const { currentUser } = useLoader()

    return <Routes>
        {/*<Route path='/signin' element={ currentUser ? <Navigate to='/' replace/> : <Suspense fallback={ <LoadingPage/> }><SignIn/></Suspense> }/>*/}
        {/*<Route path='/oauth' element={ <OAuth/> }/>*/}
        {/*<Route path='/*' element={ currentUser ? <Suspense fallback={ <LoadingPage/> }><Providers/></Suspense> : <Navigate replace to='/signin'/> }/>*/}
        <Route path='/*' element={ <Suspense fallback={ <LoadingPage/> }><Providers/></Suspense> }/>
    </Routes>
}

export default UnsignRoutes