import {Box, Stack, styled, Toolbar} from "@mui/material";
import MenuControl from "./MenuControl.tsx";
import type {ProviderProps} from "../providers/main";
import Controller from "./Controller.tsx";

const Main = styled('main')(() =>
({
    width: '100%'
}))

const Body = ({ children }: ProviderProps) =>
{
    return <Stack sx={{ height: '100%' }} >
        <Toolbar/>
        <Stack sx={{ overflow: 'hidden', height: '100%' }} direction='row'>
            <MenuControl/>
            <Main>
                <Stack sx={{ height: '100%', overflow: 'hidden' }}>
                    <Controller/>
                    <Box sx={{ flexGrow: 1, height: '100%', overflow: 'auto' }}>
                        { children }
                    </Box>
                </Stack>
            </Main>
        </Stack>
    </Stack>
}

export default Body