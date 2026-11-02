import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import Header from "../header";
import Body from "../body";

const SignedContainer = () =>
{
    return <Fragment>
        <Header/>
        <Body>
            <Outlet/>
        </Body>
    </Fragment>
}

export default SignedContainer