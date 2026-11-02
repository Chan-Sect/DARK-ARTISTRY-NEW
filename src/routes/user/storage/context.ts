import { createContext } from "react";

interface StorageType
{
    list: string[]
}

const Context = createContext<StorageType | undefined>(undefined)

export default Context