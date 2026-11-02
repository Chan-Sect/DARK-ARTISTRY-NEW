import { LaptopMac, TabletMac, PhoneIphone, PhoneAndroid, LaptopWindows, LaptopChromebook, DeviceUnknown } from '@mui/icons-material'


class Device
{
    public static Icon = (device: string = Device.get) =>
    {
        switch (device)
        {
            case 'iPod':
            case 'iPhone': return PhoneIphone
            case 'iPad': return TabletMac
            case 'Máy tính Mac': return LaptopMac
            case 'Máy tính Windows': return LaptopChromebook
            case 'Máy tính Linux': return LaptopWindows
            case 'Thiết bị không xác định': return DeviceUnknown
            default: return PhoneAndroid
        }
    }
    public static get get()
    {
        const userAgent = window.navigator.userAgent.toLowerCase()

        if (userAgent.includes('android'))
        {
            const match = window.navigator.userAgent.match(/android [\d.]+;\s?([^;)]*)/i)
            if (match)
            {
                let device = match[1].trim()
                if (device.includes('Build')) device = device.split(' ')[0]

                return device.length > 2 ? device : `Thiết bị ${ match[0].trim().split(';')[0] }`
            }
            return 'Thiết bị Android'
        }

        if (userAgent.includes('iphone')) return 'iPhone'
        if (userAgent.includes('ipad')) return 'iPad'
        if (userAgent.includes('ipod')) return 'iPod'
        if (userAgent.includes('mac') || userAgent.includes('darwin')) return 'Máy tính Mac'
        if (userAgent.includes('win')) return 'Máy tính Windows'
        if (userAgent.includes('linux')) return 'Máy tính Linux'

        return 'Thiết bị không xác định'
    }
}

export default Device