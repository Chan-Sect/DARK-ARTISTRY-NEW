import {Route, Routes} from 'react-router-dom'
import SignedContainer from "./SignedContainer";
// import {useDirection} from "../providers/signed/DirectionProvider.tsx";
// import {flattenNodes} from "../../../config/text/convert.js";
import NotFoundPage from "../fragment/NotFoundPage.tsx";
import {useData, useDirection} from "../providers/main";
import LoadingPage from "../fragment/LoadingPage.tsx";
import {flattenNodes} from "../../config/text/convert.ts";

const SignedRoutes = () =>
{
    const { isRoutesReady } = useData()
    const { all } = useDirection()

    const list = flattenNodes(all(true))


    const renderInsertableRoutes = () => list.filter(value => Boolean(value.insertable)).map((value, index) =>
    <Route key={ index } path={ `${ value.path.url }/new` } element={ value.insertable }/>)
    const renderEditorRoutes = () => list.filter(value => Boolean(value.editable)).map((value, index) =>
    <Route key={ index } path={ `${ value.path.url }/:id` } element={ value.editable }/>)
    const renderMainRoutes = (directions = all(true)) => directions.map((value, index) =>
    <Route key={ index } path={ value.path.url } element={ value.element }>
        { value.children && renderMainRoutes(value.children) }
    </Route>)

    return !isRoutesReady ? <LoadingPage/> :
    <Routes>
        <Route path='/'
               element={ <SignedContainer/> }
        >
            { renderMainRoutes() }
            { renderInsertableRoutes() }
            { renderEditorRoutes() }
            <Route path='/*' element={<NotFoundPage/>}/>
        </Route>
    </Routes>
}

export default SignedRoutes