import {useEffect, useState} from "react";
import Access from "../../../config/text/Access.js";
import type {ProviderProps} from "../main";
import {DataContext} from "../main/context.ts";

const DataProvider = ({ children }: ProviderProps) =>
{
    // const { currentUser } = useLoader()

    // const [onlineUsers, setOnlineUsers] = useState([])
    const [isRoutesReady, setIsRoutesReady] = useState(false)
    const [access, setAccess] = useState(Access.default)

    const grantAccess = async () =>
    {
        // const result = await API.GET<AccessType>('access')
        // if (result.error) setAccess(Access.default)
        // else setAccess(result)
    }

    // const online = async () =>
    // {
    //     const result = await API.silent.GET('account/online')
    //     if (!result.error)
    //     {
    //         setOnlineUsers(result)
    //         if (!result.includes(currentUser.id)) Socket.online(currentUser.id)
    //     }
    // }

    // const isOnline = id => onlineUsers.includes(id)

    useEffect(() =>
    {
        // setIsRoutesReady(true)
        grantAccess().then(() => setIsRoutesReady(true))

        // Socket.online(currentUser.id, online)
        // Socket.on('access', grantAccess)

        // return () =>
        // {
        //     Socket.offline(currentUser.id)
        //     Socket.off('access')
        // }
    }, [])

    const stateGetter = { access, isRoutesReady }
    const stateSetter = { setAccess }
    // const functions = { isOnline }

    return <DataContext.Provider value={{ ...stateGetter, ...stateSetter }}>
        { children }
    </DataContext.Provider>
}

export default DataProvider