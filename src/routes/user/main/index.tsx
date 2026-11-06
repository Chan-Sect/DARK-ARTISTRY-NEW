import LoadingElement from "../../../main/fragment/LoadingElement.tsx";
import {Stack} from "@mui/material";
import {Fragment, Suspense} from "react";
import Provider from "../storage/Provider";
import Path from "../../../config/directions/Path.ts";
import Paging from "./Paging.tsx";
import Container from "./Container.tsx";
import Filter from "./Filter.tsx";

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
                <Fragment/>
                <Container/>
            </Suspense>
            <Paging/>
        </Stack>
    </Provider>
}

export default Main