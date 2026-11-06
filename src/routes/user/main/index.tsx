import LoadingElement from "../../../main/fragment/LoadingElement.tsx";
import {Stack} from "@mui/material";
import {Fragment, lazy, Suspense} from "react";
import Provider from "../storage/Provider";
import Path from "../../../config/directions/Path";
import Paging from "./Paging";
// import Container from "./Container.tsx";
import Filter from "./Filter";

const Container = lazy(() => import('./Container'))

interface UserProps
{
    view: 'student' | 'teacher' | 'parent' | 'employee'
}

const Main = ({ view }: UserProps) =>
{
    const getAPI: () => Path = () =>
    {
        switch (view)
        {
            case 'student': return Path.AccountStudent
            case 'teacher': return Path.AccountTeacher
            case 'parent': return Path.AccountParent
            case 'employee': return Path.AccountEmployee
        }
    }
    return <Fragment>
        <Provider path={ getAPI() }>
            <Stack sx={{ overflow: 'hidden', height: '100%' }}>
                <Filter/>
                <Suspense fallback={ <LoadingElement/> }>
                    <Container/>
                </Suspense>
                <Paging/>
            </Stack>
        </Provider>
    </Fragment>
}

export default Main