import { CancelTwoTone, CheckCircleTwoTone, InfoTwoTone, WarningTwoTone } from '@mui/icons-material'
import type { ReactNode } from "react";

export interface NotificationType
{
    icon: ReactNode | undefined
    code: 'success' | 'error' | 'warning' | 'info' | 'primary'
}

export default class Notifications
{
    static Success: NotificationType = { icon: <CheckCircleTwoTone/>, code: 'success' }
    static Error: NotificationType = { icon: <CancelTwoTone/>, code: 'error' }
    static Warning: NotificationType = { icon: <WarningTwoTone/>, code: 'warning' }
    static Info: NotificationType = { icon: <InfoTwoTone/>, code: 'info' }
    static Normal: NotificationType = { icon: undefined, code: 'primary' }

    static get = (code: 'success' | 'error' | 'warning' | 'info' | 'primary'): NotificationType =>
    {
        switch (code)
        {
            case 'success': return this.Success
            case 'error': return this.Error
            case 'warning': return this.Warning
            case 'info': return this.Info
            case 'primary': return this.Normal
            default: return this.Normal
        }
    }
}