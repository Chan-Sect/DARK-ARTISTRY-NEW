import {AutoStories, Dangerous, Handyman, Help, Loupe, Tune} from '@mui/icons-material'

export interface AccessType
{
    system: boolean
    course: number
}

class Access
{
    private readonly access: number

    constructor(access: number)
    {
        this.access = access || 0
    }

    get description()
    {
        if (this.access < 1) return 'Quyền không hợp lệ'
        else if (this.access === 1) return 'Không có quyền truy cập'
        else if (this.access === 2) return 'Chỉ đọc'
        else if (this.access === 3) return 'Quyền sáng tạo'
        else if (this.access === 4) return 'Quyền cấu hình'
        else return 'Toàn quyền'
    }

    get color()
    {
        if (this.access < 2) return 'secondary'
        else if (this.access === 2) return 'info'
        else if (this.access === 3) return 'success'
        else if (this.access === 4) return 'warning'
        else return 'error'
    }

    get Icon()
    {
        if (this.access < 1) return Help
        else if (this.access === 1) return Dangerous
        else if (this.access === 2) return AutoStories
        else if (this.access === 3) return Loupe
        else if (this.access === 4) return Tune
        else return Handyman
    }

    public static get NotAllowed()
    {
        return new Access(1)
    }

    public static get ReadOnly()
    {
        return new Access(2)
    }

    public static get Creator()
    {
        return new Access(3)
    }

    public static get Editor()
    {
        return new Access(4)
    }

    public static get Full()
    {
        return new Access(5)
    }

    public static get default(): AccessType
    {
        return {
            system: false,
            course: 0
        }
    }

    public static get = (role: AccessType[]) => role.map(({ system, course }: AccessType) => ({ system, course })).reduce((acc, value) =>
    {
        const system = acc.system || value.system
        const course = Math.max(acc.course, value.course)
        // const admin = Math.max(acc.admin, value.admin)
        // const news = Math.max(acc.news, value.news)
        // const art = Math.max(acc.art, value.art)
        // const music = Math.max(acc.music, value.music)
        // const application = Math.max(acc.application, value.application)
        // const message = Math.max(acc.message, value.message)

        return { system, course }
    }, Access.default)

    public check = (access: number) => this.access <= access
}

export default Access