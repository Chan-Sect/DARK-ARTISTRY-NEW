import LoadingElement from "../../../main/fragment/LoadingElement.tsx";
import {Stack} from "@mui/material";
import {lazy, Suspense} from "react";
import Provider from "../../user/storage/Provider";
import Path from "../../../config/directions/Path";
import Paging from "../../user/main/Paging";
import Filter from "../../user/main/Filter";

const Container = lazy(() => import('../../user/main/Container'))

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

    return <Provider path={ getAPI() }>
        <Stack sx={{ overflow: 'hidden', height: '100%' }}>
            <Filter/>
            <Suspense fallback={ <LoadingElement/> }>
                <Container/>
            </Suspense>
            <Paging/>
        </Stack>
    </Provider>
}

export default Main
