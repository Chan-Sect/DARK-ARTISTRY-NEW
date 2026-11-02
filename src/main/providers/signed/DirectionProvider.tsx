import {useState} from "react";
import Direction from "../../../config/directions/Direction";
import {useLocation} from "react-router-dom";
import {flattenNodes} from "../../../config/text/convert.ts";
import type {ProviderProps} from "../main";
import Path from "../../../config/directions/Path";
import {DirectionContext, type GetLastInterface} from "../main/context.ts";
import DirectionArray from "../../../config/directions/DirectionArray.ts";

const DirectionProvider = ({ children }: ProviderProps) =>
{
    const location = useLocation()
    // const { access } = useData()

    const [isNotFound, setIsNotFound] = useState(false)

    // const visible = [Direction.DashBoard, Direction.Test, Direction.getPost(access), Direction.getMessage(access), Direction.getAccount(access)].filter(value => Boolean(value))
    // const fullAccess = [Direction.DashBoard, Direction.Test, Direction.Post, Direction.Message, Direction.Account].filter(value => Boolean(value))
    // const hidden = [Direction.Profile, Direction.Inbox, Direction.Setting, Direction.Notification]
    // const specials: Direction[] = [Path.Inbox]
    // const replaces: Direction[] = [Path.ProfileSecurity, Path.ProfileRole, Path.ProfilePost]

    const visible: Direction[] = [Direction.DashBoard, Direction.Account]
    const fullAccess: Direction[] = [Direction.DashBoard, Direction.Account]
    const hidden: Direction[] = []


    const specials: Path[] = []
    const replaces: Path[] = []

    const all = (requireAccess = false) => requireAccess ? [...visible, ...hidden] : [...fullAccess, ...hidden]


    const find = (pathname = location.pathname): DirectionArray => isNotFound ? new DirectionArray() : Direction.find(pathname)

    const getRoot = (pathname = location.pathname): (Direction | undefined) =>
    {
        const paths = pathname.split('/').slice(1)
        const root = `/${ paths[0] }`

        const directions = flattenNodes(all(true))
        const found = directions.find(node => node.path?.isEqual(root))

        return isNotFound ? undefined : found
    }

    const getLast = ({ keepString = false, asString = false }: GetLastInterface = {  }): Direction | string | undefined =>
    {
        const found = find()
        const removeString = (keepString || asString) ? found : found.filter(value => typeof value !== 'string')
        const last = removeString[removeString.length - 1]

        if (isNotFound) return undefined
        else if (asString)
        {
            if (typeof last === 'string') return last
            else return undefined
        }
        else if (typeof last === 'string') return undefined
        else return last
    }

    const includes = (path: Path) =>
    {
        const found = find().toPath()
        return !isNotFound && found.includes(path)
    }

    const special = Boolean(getRoot()?.path.url && specials.some(value => value.url === getRoot()?.path.url))
    const replaceable = replaces.map(path => path.url).includes(location.pathname)

    const variable = { visible, special, replaceable }
    const stateGetter = { isNotFound }
    const stateSetter = { setIsNotFound }
    const functions = { find, getRoot, getLast, includes, all }

    return <DirectionContext.Provider value={{ ...stateGetter, ...stateSetter, ...variable, ...functions }}>
        { children }
    </DirectionContext.Provider>
}

export default DirectionProvider