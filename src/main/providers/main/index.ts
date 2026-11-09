import {type DependencyList, type ReactNode, useContext, useEffect} from "react";
import {AlertContext, ContainerContext, DataContext, DirectionContext, LoaderContext} from "./context.ts";

export interface ProviderProps
{
    children: ReactNode
}

export const useAlert = () =>
{
    const context = useContext(AlertContext)
    if (!context) throw new Error('useAlert() phải sử dụng bên trong hook của AlertProvider')

    return context
}

export const useLoader = () =>
{
    const context = useContext(LoaderContext)
    if (!context) throw new Error('useLoader() phải sử dụng bên trong hook của LoaderProvider')

    return context
}

export const useContainer = () =>
{
    const context = useContext(ContainerContext)
    if (!context) throw new Error('useContainer() phải sử dụng bên trong hook của ContainerProvider')

    return context
}

export const useData = () =>
{
    const context = useContext(DataContext)
    if (!context) throw new Error('useData() phải sử dụng bên trong hook của DataProvider')

    return context
}


export const useDirection = () =>
{
    const context = useContext(DirectionContext)
    if (!context) throw new Error('useDirection() phải sử dụng bên trong hook của DirectionProvider')

    return context
}

export const useController = (controller: () => ReactNode, deps: DependencyList) =>
{
    const context = useContext(ContainerContext)

    if (!context)
    {
        throw new Error("useController() phải được gọi bên trong ControllerProvider")
    }

    const { setController } = context

    useEffect(() =>
    {
        setController(controller())

        return () =>
        {
            setController(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps])
}

