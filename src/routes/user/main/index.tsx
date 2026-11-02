// import {lazy, Suspense} from "react";
// import Provider from "../Admin/Provider.jsx";
// import Filter from "../Admin/Filter.jsx";
// import Paging from "../Admin/Paging.jsx";
// import {Stack} from "@mui/material";
// import LoadingElement from "../../../main/fragment/LoadingElement.jsx";

// const Container = lazy(() => import('../Admin/Container.jsx'))

import LoadingElement from "../../../main/fragment/LoadingElement.tsx";
import {Stack} from "@mui/material";
import {Fragment, Suspense} from "react";
import Provider from "../storage/Provider";

interface UserProps
{
    view: 'student' | 'teacher' | 'parent' | 'employee'
}

const Main = ({ view }: UserProps) =>
{
    return <Provider api={ view }>
        <Stack sx={{ overflow: 'hidden', height: '100%' }}>
            {/*<Filter/>*/}
            <Suspense fallback={ <LoadingElement/> }>
                <Fragment/>
                {/*<Container/>*/}
            </Suspense>
            {/*<Paging/>*/}
        </Stack>
    </Provider>
}

export default Main