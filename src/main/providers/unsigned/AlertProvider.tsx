import {closeSnackbar, enqueueSnackbar, SnackbarProvider} from "notistack";
import Notification from "../../../components/notification/Notification";
import Slide from "@mui/material/Slide";
import {AlertComponent} from "../../../components/notification/AlertComponent";
import type {AlertProps} from "../../../components/notification/AlertComponent.tsx";
import {AlertContext} from "../main/context.ts";
import type {ProviderProps} from "../main";
import type {ReactNode} from "react";

export type AlertShowType = (content: string, path?: string, icon?: ReactNode) => void

const AlertProvider = ({ children }: ProviderProps) =>
{
    const showAlert = (value: AlertProps) =>
    {
        enqueueSnackbar('', { content :  key => <AlertComponent id={ key } { ...value }/> })
    }

    // const showMessage = (messages: string[], type: NotificationType) =>
    // {
    //     for (const message of messages)
    //     {
    //         const value = { message, inboxType: type }
    //         enqueueSnackbar('', { content : (key: number) => <MessageComponent id={ key } { ...value }/> })
    //     }
    // }
    const showSuccess: AlertShowType = (content, path, icon) => showAlert({ content, path, icon, type: Notification.Success })
    const showError: AlertShowType = (content, path, icon) => showAlert({ content, path, icon, type: Notification.Error })
    const showWarning: AlertShowType = (content, path, icon) => showAlert({ content, path, icon, type: Notification.Warning })
    const showInfo: AlertShowType = (content, path, icon) => showAlert({ content, path, icon, type: Notification.Info })
    const show: AlertShowType = (content, path, icon) => showAlert({ content, path, icon, type: Notification.Normal })

    const clear = () => closeSnackbar()

    return <AlertContext.Provider value={{ show, clear, showSuccess, showError, showWarning, showInfo }}>
        <SnackbarProvider  maxSnack={ 3 } anchorOrigin={{ vertical : 'bottom', horizontal : 'right' }} TransitionComponent={ Slide }>
            { children }
        </SnackbarProvider>
    </AlertContext.Provider>
}

export default AlertProvider