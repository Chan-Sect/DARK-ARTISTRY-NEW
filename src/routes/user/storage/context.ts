import {type ChangeEvent, createContext, type Dispatch, type SetStateAction} from "react";
import {type SortKey, ViewKey} from "../../../config/view/Key.ts";
import type {FilterType, PropertyType, UserType} from "./DataType.ts";
import ViewMode from "./ViewMode.ts";

interface StorageType
{
    available: string[]
    count: number
    page: number
    view: ViewMode
    order: SortKey
    by: PropertyType
    list: (UserType | null)[]
    selected: string[]
    length: number
    filter: FilterType
    defaultFilter: FilterType
    max: number

    setOrder: Dispatch<SetStateAction<SortKey>>
    setBy: Dispatch<SetStateAction<PropertyType>>

    onChangeView: (event: ChangeEvent<unknown>, newValue: ViewKey) => void
    onChangePage: (event: ChangeEvent<unknown>, value: number) => void
    onSelected: (value: UserType) => () => void
    onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void
    onChangeFilter: (event: ChangeEvent<HTMLInputElement>) => void
    onResetFilter: (wipe?: boolean) => void
    onRequestSort: (property: PropertyType) => void
}

const Context = createContext<StorageType | undefined>(undefined)

export default Context