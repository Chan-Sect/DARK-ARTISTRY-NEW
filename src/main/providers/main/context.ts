import {createContext, type Dispatch, type ReactNode, type SetStateAction} from "react";
import type {AlertShowType} from "../unsigned/AlertProvider.tsx";
import type {AccessType} from "../../../config/text/Access.ts";
import Direction from "../../../config/directions/Direction.tsx";
import DirectionArray from "../../../config/directions/DirectionArray.ts";

export interface SettingType
{
    display:
    {
        theme: 'system' | 'dark' | 'light'
    }
    sound:
    {
        notification: boolean
    }
}

interface AlertType
{
    clear: () => void
    show: AlertShowType
    showSuccess: AlertShowType
    showError: AlertShowType
    showWarning: AlertShowType
    showInfo: AlertShowType
}

interface LoaderType
{
    isSystemOnline: boolean
    isBackEndReady: boolean
    isFrontEndReady: boolean
    setting: SettingType

    setIsFrontEndReady: Dispatch<SetStateAction<boolean>>
    setSetting: Dispatch<SetStateAction<SettingType>>
    authentication: () => Promise<void>
}

interface ContainerType
{
    menuControlOpen: boolean
    controller: ReactNode
    pageTitle: string
    hidden: boolean

    setMenuControlOpen: Dispatch<SetStateAction<boolean>>
    setController: Dispatch<SetStateAction<ReactNode>>
    setPageTitle: Dispatch<SetStateAction<string>>
    setHidden: Dispatch<SetStateAction<boolean>>

    // removeController: () => void
}

interface DataType
{
    access: AccessType
    isRoutesReady: boolean

    setAccess: Dispatch<SetStateAction<AccessType>>
}

export interface GetLastInterface
{
    keepString?: boolean
    asString?: boolean
}

interface DirectionType
{
    // visible: Direction[]
    special: boolean
    replaceable: boolean
    isNotFound: boolean
    setIsNotFound: Dispatch<SetStateAction<boolean>>
    find: (pathname?: string) => DirectionArray
    getRoot: (pathname?: string) => Direction | undefined
    getLast: (config?: GetLastInterface) => Direction | string | undefined
    includes: (direction: Direction) => boolean
    all: (requireAccess: boolean) =>  Direction[]
}



export const AlertContext = createContext<AlertType | undefined>(undefined)
export const LoaderContext = createContext<LoaderType | undefined>(undefined)
export const ContainerContext = createContext<ContainerType | undefined>(undefined)
export const ControllerContext = createContext<ContainerType | undefined>(undefined)
export const DataContext = createContext<DataType | undefined>(undefined)
export const DirectionContext = createContext<DirectionType | undefined>(undefined)
