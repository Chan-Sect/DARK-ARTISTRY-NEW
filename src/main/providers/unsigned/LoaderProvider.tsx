import {useEffect, useRef, useState} from "react"
import API from "../../../config/connections/main/API"
import {LoaderContext, type SettingType} from "../main/context.ts";
import type {ProviderProps} from "../main";
import ThemeMode from "../../theme/ThemeMode.tsx";

interface AuthenticationType
{
    token: string
}

const LoaderProvider = ({ children }: ProviderProps) =>
{
    const signOutRef = useRef(true)

    const [setting, setSetting] = useState<SettingType>({ display: { theme : 'system' }, sound: { notification: true } })
    const [isSystemOnline, setIsSystemOnline] = useState(true)
    const [isBackEndReady, setIsBackEndReady] = useState(true)
    const [isFrontEndReady, setIsFrontEndReady] = useState(false)

    // const [signOutAlert, setSignOutAlert] = useState(false)
    // const [currentUser, setCurrentUser] = useState(null)
    // const [verify, setVerify] = useState({ value: false, info: undefined, warning: false })

    const authentication = async () =>
    {
        if (signOutRef.current)
        {
            const result = await API.silent.GET<AuthenticationType>('sign/admin')

            if (result.error)
            {
                if (!result.code) setIsBackEndReady(false)
                // else setCurrentUser(null)
            }
            else if (result.token)
            {
                // const { info, warning } = result
                // setVerify({ value: true, info, warning })
            }
            else
            {
                // setVerify({ value: false, info: undefined, warning: false })
                // setCurrentUser(result)
            }
        }
    }

    // const onClose = async () =>
    // {
    //     setSignOutAlert(false)
    //     signOutRef.current = true
    //     await authentication()
    //     Socket.on('sign', authentication)
    // }

    // const signOut = () =>
    // {
    //     Socket.off('sign')
    //     signOutRef.current = false
    //     setSignOutAlert(true)
    // }


    useEffect(() =>
    {
        // void (async () =>
        // {
        //     await authentication()
        //     setIsFrontEndReady(true)
        // })()
        // Socket.on('sign-out', signOut)
        // Socket.on('sign', authentication)

        const handleOnline = () => setIsSystemOnline(true)
        const handleOffline = () => setIsSystemOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () =>
        {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            // Socket.off('sign')
            // Socket.off('sign-out')
        }
    }, [])

    // const stateGetter = { setting, systemIsOnline, isBackEndReady, isFrontEndReady, currentUser, verify }
    // const stateSetter = { setSetting, setCurrentUser, setVerify, setIsFrontEndReady }
    // const functions = { authentication }

    const stateGetter = { isSystemOnline, isBackEndReady, isFrontEndReady, setting }
    const stateSetter = { setIsFrontEndReady, setSetting }
    const functions = { authentication }

    return <LoaderContext.Provider value={{ ...stateGetter, ...stateSetter, ...functions }}>
        <ThemeMode mode={ setting.display.theme }>
            { children }
        {/*    <Dialog open={ signOutAlert } >*/}
        {/*        <DialogTitle sx={{ textAlign: 'center' }}>*/}
        {/*            Cảnh báo*/}
        {/*        </DialogTitle>*/}
        {/*        <DialogContent sx={{ textAlign: 'center', '& *': { pointerEvents: 'none', userSelect: 'none' } }}>*/}
        {/*            <BrokenPC/>*/}
        {/*            <DialogContentText>Tài khoản của bạn đã được đăng nhập ở một nơi khác</DialogContentText>*/}
        {/*            <DialogContentText>Chuyển hướng đến trang đăng nhập</DialogContentText>*/}
        {/*        </DialogContent>*/}
        {/*        <DialogActions>*/}
        {/*            <Button fullWidth variant='contained' onClick={ onClose } autoFocus>*/}
        {/*                Xác nhận*/}
        {/*            </Button>*/}
        {/*        </DialogActions>*/}
        {/*    </Dialog>*/}
        </ThemeMode>
    </LoaderContext.Provider>
}

export default LoaderProvider