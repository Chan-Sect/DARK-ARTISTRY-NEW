import Path from './Path'
import {Fragment, lazy, type ReactNode, Suspense} from 'react'
import LoadingElement from "../../main/fragment/LoadingElement.jsx";
import {convertToNestedPaths, flattenNodes} from "../text/convert.ts";
import DirectionArray from "./DirectionArray.ts";

// const DashBoardComponent = lazy(() => import('../../routes/user'))
//
// const TestComponent = lazy(() => import('../../components/route/Test/Test.jsx'))
//
// const PostNewsComponent = lazy(() => import('../../components/route/Post/News/Main'))
// const PostNewsCreator = lazy(() => import('../../components/route/Post/News/Main/Creator.jsx'))
// const PostNewsEditor = lazy(() => import('../../components/route/Post/News/Main/Editor.jsx'))
//
// const PostArtComponent = lazy(() => import('../../components/route/Post/Art/Art.jsx'))
//
// const PostMusicComponent = lazy(() => import('../../components/route/Post/Music/Main'))
// const PostMusicCreator = lazy(() => import('../../components/route/Post/Music/Main/Creator.jsx'))
// const PostMusicEditor = lazy(() => import('../../components/route/Post/Music/Main/Editor.jsx'))
//
// const PostApplicationComponent = lazy(() => import('../../components/route/Post/Application/Main'))
// const PostApplicationCreator = lazy(() => import('../../components/route/Post/Application/Main/Creator.jsx'))
// const PostApplicationEditor = lazy(() => import('../../components/route/Post/Application/Main/Editor.jsx'))
//
// const MessageGlobalComponent = lazy(() => import('../../components/route/Message/Global/Global.jsx'))
// const MessageConfigComponent = lazy(() => import('../../components/route/Message/Config/Config.jsx'))
//
// const InboxComponent = lazy(() => import('../../components/route/Inbox/Main/Inbox.jsx'))
// const InboxCreator = lazy(() => import('../../components/route/Inbox/Main/Creator.jsx'))
//
const AccountStudentComponent = lazy(() => import('../../routes/user/main'))
// const AccountAdminComponent = lazy(() => import('../../components/route/Account/Structure/Admin.jsx'))
// const AccountEditor = lazy(() => import('../../components/route/Account/Structure/Editor.jsx'))
//
// const AccountRoleComponent = lazy(() => import('../../components/route/Account/Role/Main'))
// const AccountRoleCreator = lazy(() => import('../../components/route/Account/Role/Main/Creator.jsx'))
// const AccountRoleEditor = lazy(() => import('../../components/route/Account/Role/Main/Editor.jsx'))
//
// const ProfileComponent = lazy(() => import('../../components/route/Profile/Main'))
// const ProfileSecurityComponent = lazy(() => import('../../components/route/Profile/Security/./Index'))
// const ProfileRoleComponent = lazy(() => import('../../components/route/Profile/Role/./Index'))
// const ProfilePostComponent = lazy(() => import('../../components/route/Profile/Post/./Index'))
// const ProfileViewerComponent = lazy(() => import('../../components/route/Profile/Viewer'))
//
// const SettingComponent = lazy(() => import('../../components/route/Setting/Setting.jsx'))
// const NotificationComponent = lazy(() => import('../../components/route/Notification/Notification.jsx'))

interface DirectionConstructor
{
    path: Path
    children?: Direction[]
    element?: ReactNode
    insertable?: ReactNode
    editable?: ReactNode
}

class Direction
{
    // toPath(): Path
    // {
    //     return this.#_path
    // }
    public readonly path: Path
    public readonly children?: Direction[]
    private readonly pElement: ReactNode
    private readonly pInsertable?: ReactNode
    private readonly pEditable?: ReactNode

    get element()
    {
        return this.pElement ? <Suspense fallback={ <LoadingElement/> }>{ this.pElement }</Suspense> : null
    }
    get insertable()
    {
        return this.pInsertable ? <Suspense fallback={ <LoadingElement/> }>{ this.pInsertable }</Suspense> : null
    }
    get editable()
    {
        return this.pEditable ? <Suspense fallback={ <LoadingElement/> }>{ this.pEditable }</Suspense> : null
    }

    private constructor({ path, children, element, insertable, editable }: DirectionConstructor)
    {
        this.path = path
        this.children = children
        this.pElement = element
        this.pInsertable = insertable
        this.pEditable = editable
    }


    // private static specials: Path[] = []
    // private static replaces: Path[] = []



    public static get DashBoard()
    {
        const path = Path.DashBoard
        // const children = undefined
        const element = <Fragment/>
        // const insertable = undefined
        // const editable = undefined
        
        return new Direction({ path, element })
    }
    public static get Account()
    {
        const path = Path.Account
        const children = [Direction.AccountStudent, Direction.AccountTeacher, Direction.AccountParent, Direction.AccountEmployee, Direction.AccountRole]
        // const element = <Fragment/>
        // const insertable = undefined
        // const editable = undefined

        return new Direction({ path, children })
    }
    public static get AccountStudent()
    {
        const path = Path.AccountStudent
        const element = <AccountStudentComponent view='student'/>

        return new Direction({ path, element })
    }
    public static get AccountTeacher()
    {
        const path = Path.AccountTeacher
        const element = <Fragment/>

        return new Direction({ path, element })
    }
    public static get AccountParent()
    {
        const path = Path.AccountParent
        const element = <Fragment/>

        return new Direction({ path, element })
    }
    public static get AccountEmployee()
    {
        const path = Path.AccountEmployee
        const element = <Fragment/>

        return new Direction({ path, element })
    }
    public static get AccountRole()
    {
        const path = Path.AccountRole
        const element = <Fragment/>

        return new Direction({ path, element })
    }

    private static VISIBLE: Direction[] = [Direction.DashBoard, Direction.Account]
    private static FULL_ACCESS: Direction[] = [Direction.DashBoard, Direction.Account]
    private static HIDDEN: Direction[] = []

    private static ALL = (requireAccess = false) => [...(requireAccess ? Direction.VISIBLE : Direction.FULL_ACCESS), ...Direction.HIDDEN]


    public static find(pathname: string): DirectionArray
    {
        const paths = pathname.split('/').slice(1)
        const nested = convertToNestedPaths(paths.map(value => `/${ value }`))
        const list = Array.from({ length : paths.length }).map((_, index) => ({ path: paths[index], url: nested[index] }))

        const output = new DirectionArray()

        list.reverse().forEach(value =>
        {
            const directions = flattenNodes(Direction.ALL(true))

            if (output[output.length - 1] && typeof output[output.length - 1] !== 'string')
            {
                const found = directions.find(node => node.path.isEqual(value.url))
                output.push(found || value.path)
            }
            else
            {
                const found = directions.filter(node => node.path.isEqual(value.url))
                if (found.length) output.push(...found.reverse())
                else output.push(value.path)
            }
        })

        return new DirectionArray(...output.reverse())
    }

    // static get Test()
    // {
    //     const path = Path.Test
    //     const children = null
    //     const element = <TestComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    //
    // static getPost = access =>
    // {
    //     if (access)
    //     {
    //         const path = Path.Post
    //         const children = [Direction.getPostNews(access), Direction.getPostArt(access), Direction.getPostMusic(access), Direction.getPostApplication(access)]
    //
    //         const element = null
    //         const insertable = null
    //         const editable = null
    //
    //         return new Direction(path, children, element, insertable, editable)
    //     }
    //     else return null
    // }
    // static get Post()
    // {
    //     const path = Path.Post
    //     const children = [Direction.PostNews, Direction.PostArt, Direction.PostMusic, Direction.PostApplication]
    //     const element = null
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static getPostNews = (access) =>
    // {
    //     const { news } = access
    //
    //     const path = Path.PostNews
    //     const children = null
    //     const element = <PostNewsComponent/>
    //     const insertable = Access.Creator.check(news) && <PostNewsCreator/>
    //     const editable = <PostNewsEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get PostNews()
    // {
    //     const path = Path.PostNews
    //     const children = null
    //     const element = <PostNewsComponent/>
    //     const insertable = <PostNewsCreator/>
    //     const editable = <PostNewsEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static getPostArt = access =>
    // {
    //     const { art } = access
    //
    //     const path = Path.PostArt
    //     const children = null
    //     const element = <PostArtComponent/>
    //     const insertable = Access.Creator.check(art) && <PostMusicCreator/>
    //     const editable = <PostMusicEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get PostArt()
    // {
    //     const path = Path.PostArt
    //     const children = null
    //     const element = <PostArtComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static getPostMusic = access =>
    // {
    //     const { music } = access
    //
    //     const path = Path.PostMusic
    //     const children = null
    //     const element = <PostMusicComponent/>
    //     const insertable = Access.Creator.check(music) && <PostMusicCreator/>
    //     const editable = <PostMusicEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get PostMusic()
    // {
    //     const path = Path.PostMusic
    //     const children = null
    //     const element = <PostMusicComponent/>
    //     const insertable = <PostMusicCreator/>
    //     const editable = <PostMusicEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static getPostApplication = access =>
    // {
    //     const { application } = access
    //
    //     const path = Path.PostApplication
    //     const children = null
    //     const element = <PostApplicationComponent/>
    //     const insertable = Access.Creator.check(application) && <PostApplicationCreator/>
    //     const editable = <PostApplicationEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get PostApplication()
    // {
    //     const path = Path.PostApplication
    //     const children = null
    //     const element = <PostApplicationComponent/>
    //     const insertable = <PostApplicationCreator/>
    //     const editable = <PostApplicationEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    //
    // static getMessage = access =>
    // {
    //     if (access)
    //     {
    //         const path = Path.Message
    //         const children = []
    //         const element = null
    //         const insertable = null
    //         const editable = null
    //
    //         const { system, message } = access
    //
    //         if (Access.ReadOnly.check(message)) children.push(Direction.MessageGlobal)
    //         if (system) children.push(Direction.MessageConfig)
    //
    //         return Boolean(children.length) && new Direction(path, children, element, insertable, editable)
    //     }
    //     else return null
    // }
    // static get Message()
    // {
    //     const path = Path.Message
    //     const children = [Direction.MessageGlobal, Direction.MessageConfig]
    //     const element = null
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get MessageGlobal()
    // {
    //     const path = Path.MessageGlobal
    //     const children = null
    //     const element = <MessageGlobalComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get MessageConfig()
    // {
    //     const path = Path.MessageConfig
    //     const children = null
    //     const element = <MessageConfigComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    //
    // static getAccount = access =>
    // {
    //     if (access)
    //     {
    //         const path = Path.Account
    //         const children = []
    //         const element = null
    //         const insertable = false
    //         const editable = false
    //
    //         const { system, client, admin } = access
    //
    //         if (Access.ReadOnly.check(client)) children.push(Direction.getAccountClient(access))
    //         if (Access.ReadOnly.check(admin)) children.push(Direction.getAccountAdmin(access))
    //         if (system) children.push(Direction.AccountRole)
    //
    //         return Boolean(children.length) && new Direction(path, children, element, insertable, editable)
    //     }
    //     else return null
    // }
    //
    // static get Account()
    // {
    //     const path = Path.Account
    //     const children = [Direction.AccountClient, Direction.AccountAdmin, Direction.AccountRole]
    //     const element = null
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static getAccountClient = access =>
    // {
    //     const { client } = access
    //
    //     const path = Path.AccountClient
    //     const children = null
    //     const element = <AccountClientComponent/>
    //     const insertable = null
    //     const editable = Access.Editor.check(client) && <AccountEditor/>
    //
    //     return client > 1 && new Direction(path, children, element, insertable, editable)
    //
    // }
    // static get AccountClient()
    // {
    //     const path = Path.AccountClient
    //     const children = null
    //     const element = <AccountClientComponent/>
    //     const insertable = null
    //     const editable = <AccountEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static getAccountAdmin = access =>
    // {
    //     const { admin } = access
    //
    //     const path = Path.AccountAdmin
    //     const children = null
    //     const element = <AccountAdminComponent/>
    //     const insertable = null
    //     const editable = Access.Editor.check(admin) && <AccountEditor admin/>
    //
    //     return Access.ReadOnly.check(admin) && new Direction(path, children, element, insertable, editable)
    //
    // }
    // static get AccountAdmin()
    // {
    //     const path = Path.AccountAdmin
    //     const children = null
    //     const element = <AccountAdminComponent/>
    //     const insertable = null
    //     const editable = <AccountEditor admin/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get AccountRole()
    // {
    //     const path = Path.AccountRole
    //     const children = null
    //     const element = <AccountRoleComponent/>
    //     const insertable = <AccountRoleCreator/>
    //     const editable = <AccountRoleEditor/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    //
    // static get Profile()
    // {
    //     const path = Path.Profile
    //     const children = [Direction.ProfileSecurity, Direction.ProfileRole, Direction.ProfilePost]
    //     const element = <ProfileComponent/>
    //     const insertable = null
    //     const editable = <ProfileViewerComponent/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get ProfileSecurity()
    // {
    //     const path = Path.ProfileSecurity
    //     const children = null
    //     const element = <ProfileSecurityComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get ProfileRole()
    // {
    //     const path = Path.ProfileRole
    //     const children = null
    //     const element = <ProfileRoleComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get ProfilePost()
    // {
    //     const path = Path.ProfilePost
    //     const children = null
    //     const element = <ProfilePostComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get Setting()
    // {
    //     const path = Path.Setting
    //     const children = null
    //     const element = <SettingComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get Notification()
    // {
    //     const path = Path.Notification
    //     const children = null
    //     const element = <NotificationComponent/>
    //     const insertable = null
    //     const editable = null
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
    // static get Inbox()
    // {
    //     const path = Path.Inbox
    //     const children = null
    //     const element = <InboxComponent/>
    //     const insertable = <InboxCreator/>
    //     const editable = <InboxComponent/>
    //
    //     return new Direction(path, children, element, insertable, editable)
    // }
}

export default Direction