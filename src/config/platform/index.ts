class Platform
{
    static get Windows()
    {
        return 'Windows'
    }
    static get MacOS()
    {
        return 'MacOS'
    }
    static get Linux()
    {
        return 'Linux'
    }
    static get IOS()
    {
        return 'IOS'
    }
    static get Android()
    {
        return 'Android'
    }
    static get Unknown()
    {
        return 'Unknown'
    }

    private static get getOperatingSystem()
    {
        const userAgent = window.navigator.appVersion.toLowerCase()

        if (userAgent.indexOf('android') !== -1) return this.Android
        else if (userAgent.indexOf('iphone') !== -1 || userAgent.indexOf('ipad') !== -1 || userAgent.indexOf('ipod') !== -1) return this.IOS
        else if (userAgent.indexOf('win') !== -1) return this.Windows
        else if (userAgent.indexOf('mac') !== -1 || userAgent.indexOf('darwin') !== -1) return this.MacOS
        else if (userAgent.indexOf('linux') !== -1) return this.Linux
        return this.Unknown
    }

    private static IS = (platform: string) => Platform.getOperatingSystem === platform
    private static icon = (platform = Platform.getOperatingSystem) =>
    {
        switch (platform)
        {
            case this.Windows: return 'fa-brands fa-microsoft'
            case this.IOS:
            case this.MacOS: return 'fa-brands fa-apple'
            case this.Android: return 'fa-brands fa-android'
            case this.Linux: return 'fa-brands fa-ubuntu'
            default: return 'fa-solid fa-circle-question'
        }
    }

    static get is()
    {
        const Windows = Platform.IS(Platform.Windows)
        const MacOS = Platform.IS(Platform.MacOS)
        const Linux = Platform.IS(Platform.Linux)
        const IOS = Platform.IS(Platform.IOS)
        const Android = Platform.IS(Platform.Android)
        const Unknown = Platform.IS(Platform.Unknown)

        const Apple = MacOS || IOS
        const PC = Windows || MacOS || Linux
        const Mobile = IOS || Android

        return { Windows, MacOS, Linux, IOS, Android, Unknown, PC, Mobile, Apple }
    }
    static get get()
    {
        const current = this.getOperatingSystem
        const icon = (platform: string) => Platform.icon(platform)
        return { current, icon }
    }
}

export default Platform