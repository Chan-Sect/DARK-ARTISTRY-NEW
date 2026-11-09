import {Fragment, type ReactNode, useState} from "react"
import {ContainerContext} from "../main/context.ts";
import type {ProviderProps} from "../main";

const ContainerProvider = ({ children }: ProviderProps) =>
{
    const [menuControlOpen, setMenuControlOpen] = useState<boolean>(false)
    const [controller, setController] = useState<ReactNode>(<Fragment/>)
    const [pageTitle, setPageTitle] = useState<string>('')
    const [hidden, setHidden] = useState<boolean>(false)

    // const removeController = () => setController(null)

    const stateGetter = { menuControlOpen, controller, pageTitle, hidden }
    const stateSetter = { setMenuControlOpen, setController, setPageTitle, setHidden }
    // const functions = { removeController }

    return <ContainerContext.Provider value={{ ...stateGetter, ...stateSetter }}>
        { children }
    </ContainerContext.Provider>
}

export default ContainerProvider