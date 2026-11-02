import {
    DeveloperBoard,
    EscalatorWarning,
    LocalHospital,
    LocalHospitalTwoTone, LocalLibrary,
    PeopleAlt,
    QuestionMark,
    School,
    Shield,
    SupervisedUserCircle,
    type SvgIconComponent
} from '@mui/icons-material'

interface PathConstructor
{
    name: string
    url: string
    icon:
    {
        default: SvgIconComponent
        add: SvgIconComponent
    }
    color: string
}

class Path
{
    public readonly url: string
    public readonly name: string
    private readonly icon: { default: SvgIconComponent, add: SvgIconComponent }
    private readonly pColor: string

    public color()
    {
        return this.pColor || '#7D8291'
    }
    public get Icon(): SvgIconComponent
    {
        return this.icon?.default || QuestionMark
    }
    public get AddIcon(): SvgIconComponent
    {
        return this.icon?.add || LocalHospitalTwoTone
    }

    
    private constructor({ url, name, icon, color } : PathConstructor)
    {
        this.url = url
        this.name = name
        this.icon = icon
        this.pColor = color
    }

    public static get DashBoard()
    {
        const name = 'Tổng quan'
        const url = '/'
        const icon = { default: DeveloperBoard, add: LocalHospital }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }

    public static get Account()
    {
        const name = 'Tài khoản'
        const url = '/account'
        const icon = { default: PeopleAlt, add: LocalHospitalTwoTone }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }
    public static get AccountStudent()
    {
        const name = 'Học viên'
        const url = `${ Path.Account.url }`
        const icon = { default: School, add: LocalHospital }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }
    public static get AccountTeacher()
    {
        const name = 'Giảng viên'
        const url = `${ Path.Account.url }/teacher`
        const icon = { default: LocalLibrary, add: LocalHospital }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }
    public static get AccountParent()
    {
        const name = 'Phụ huynh'
        const url = `${ Path.Account.url }/parent`
        const icon = { default: EscalatorWarning, add: LocalHospital }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }
    public static get AccountEmployee()
    {
        const name = 'Nhân viên'
        const url = `${ Path.Account.url }/employee`
        const icon = { default: Shield, add: LocalHospital }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }
    public static get AccountRole()
    {
        const name = 'Vai trò'
        const url = `${ Path.Account.url }/role`
        const icon = { default: SupervisedUserCircle, add: LocalHospital }
        const color = '#7D8291'
        return new Path({ name, url, icon, color })
    }


    // static get Test()
    // {
    //     const name = 'Thí nghiệm'
    //     const url = '/test'
    //     const icon = { default: Science, add: LocalHospital }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    //
    // static get Post()
    // {
    //     const name = 'Bài viết'
    //     const url = '/post'
    //     const icon = { default: Newspaper, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get PostNews()
    // {
    //     const name = 'Bảng tin'
    //     const url = `${ Path.Post.getUrl() }`
    //     const icon = { default: Feed, add: PostAdd }
    //     const color = '#70E5FF'
    //     return new Path(name, url, icon, color)
    // }
    // static get PostArt()
    // {
    //     const name = 'Tác phẩm'
    //     const url = `${ Path.Post.getUrl() }/art`
    //     const icon = { default: Image, add: AddPhotoAlternateOutlined }
    //     const color = '#70FFF1'
    //     return new Path(name, url, icon, color)
    // }
    // static get PostMusic()
    // {
    //     const name = 'Âm nhạc'
    //     const url = `${ Path.Post.getUrl() }/music`
    //     const icon = { default: InsertChart, add: Addchart }
    //     const color = '#70FF9C'
    //     return new Path(name, url, icon, color)
    // }
    // static get PostApplication()
    // {
    //     const name = 'Ứng dụng'
    //     const url = `${ Path.Post.getUrl() }/application`
    //     const icon = { default: DashboardRounded, add: DashboardCustomizeRounded }
    //     const color = '#CEFF70'
    //     return new Path(name, url, icon, color)
    // }
    //
    // static get Message()
    // {
    //     const name = 'Hộp thư'
    //     const url = '/message'
    //     const icon = { default: Inbox, add: LocalHospitalTwoTone }
    //     const color = '#9B70FF'
    //     return new Path(name, url, icon, color)
    // }
    // static get Inbox()
    // {
    //     const name = 'Tin nhắn'
    //     const url = '/inbox'
    //     const icon = { default: Forum, add: EditSquare }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get MessageGlobal()
    // {
    //     const name = 'Khách hàng'
    //     const url = `${ Path.Message.getUrl() }`
    //     const icon = { default: AllInbox, add: EditSquare }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get MessageConfig()
    // {
    //     const name = 'Cài đặt'
    //     const url = `${ Path.Message.getUrl() }/config`
    //     const icon = { default: DisplaySettings, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    //
    // static get Account()
    // {
    //     const name = 'Tài khoản'
    //     const url = '/account'
    //     const icon = { default: PeopleAlt, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get AccountClient()
    // {
    //     const name = 'Người dùng'
    //     const url = `${ Path.Account.getUrl() }`
    //     const icon = { default: Public, add: LocalHospitalTwoTone }
    //     const color = '#FF9870'
    //     return new Path(name, url, icon, color)
    // }
    // static get AccountAdmin()
    // {
    //     const name = 'Quản trị'
    //     const url = `${ Path.Account.getUrl() }/admin`
    //     const icon = { default: Shield, add: AddModeratorTwoTone }
    //     const color = '#FF7088'
    //     return new Path(name, url, icon, color)
    // }
    // static get AccountRole()
    // {
    //     const name = 'Vai trò'
    //     const url = `${ Path.Account.getUrl() }/role`
    //     const icon = { default: TheaterComedy, add: ControlPointDuplicateTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get Profile()
    // {
    //     const name = 'Thông tin'
    //     const url = `/profile`
    //     const icon = { default: PermContactCalendar, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get ProfileSecurity()
    // {
    //     const name = 'Đăng nhập'
    //     const url = Path.Profile.getUrl()
    //     const icon = { default: AccountBoxRounded, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get ProfileRole()
    // {
    //     const name = 'Vai trò'
    //     const url = `${ Path.Profile.getUrl() }/role`
    //     const icon = { default: AssignmentInd, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get ProfilePost()
    // {
    //     const name = 'Bài đăng'
    //     const url = `${ Path.Profile.getUrl() }/post`
    //     const icon = { default: PersonPinRounded, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    //
    //
    // static get Setting()
    // {
    //     const name = 'Cài đặt'
    //     const url = `/setting`
    //     const icon = { default: Settings, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }
    // static get Notification()
    // {
    //     const name = 'Thông báo'
    //     const url = `/notification`
    //     const icon = { default: Notifications, add: LocalHospitalTwoTone }
    //     const color = '#7D8291'
    //     return new Path(name, url, icon, color)
    // }

    public isEqual = (to: string) => this.url === to
}

export default Path