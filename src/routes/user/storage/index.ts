import {useContext} from "react";
import Context from "./context";

const useStorage = () =>
{
    const context = useContext(Context)
    if (!context) throw new Error('useStorage() phải sử dụng bên trong hook của StorageProvider')

    return context
}

export default useStorage