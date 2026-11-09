import {useController} from "../../../main/providers/main";
import {Fragment} from "react";
import SaveButton from "../../../components/controller/SaveButton.tsx";
import {Button, Stack} from "@mui/material";

const Creator = () =>
{
    const onSave = () =>
    {

    }

    useController(() =>
    <Fragment>
        <SaveButton
            // disabled={ !isPass() }
            onSave={ onSave }/>
    </Fragment>, [])

    return <Stack>

    </Stack>
}

export default Creator