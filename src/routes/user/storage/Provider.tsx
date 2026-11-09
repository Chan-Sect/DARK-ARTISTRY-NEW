import {type ProviderProps, useAlert, useController} from "../../../main/providers/main";
import Context from "./context.ts";
import {useLocation} from "react-router-dom";
import {type ChangeEvent, Fragment, useEffect, useState} from "react";
import {SortKey, ViewKey} from "../../../config/view/Key.ts";
import ViewMode from "./ViewMode.ts";
import {type FilterType, type PropertyType, PropertyTypeValues, type TimeType, type UserType} from "./DataType.ts";
import API from "../../../config/connections/main/API.ts";
import {encodeToSlug, firstDay, lastDay} from "../../../config/text/format.ts";
import Path from "../../../config/directions/Path.ts";
import DeleteButton from "../../../components/controller/DeleteButton.tsx";

interface AccountProps extends ProviderProps
{
    api?: string
    path: Path
}

const Provider = ({ children, path }: AccountProps) =>
{
    const location = useLocation()
    // const { setController, removeController } = useContainer()
    // const { access } = useData()
    const { showError } = useAlert()


    const [view, setView] = useState<ViewMode>(ViewMode.List)

    const [max, setMax] = useState(-1)
    const [count, setCount] = useState(-1)
    const [length, setLength] = useState(0)
    const [selected, setSelected] = useState<string[]>([])
    const [available, setAvailable] = useState<string[]>([])

    const [page, setPage] = useState(0)
    const [order, setOrder] = useState<SortKey>(SortKey.DESC)
    const [by, setBy] = useState<PropertyType>('createTime')
    const [list, setList] = useState<(UserType | null)[]>([])

    const [defaultFilter, setDefaultFilter] = useState<FilterType>({ search: '', createTime: { from: null, to: lastDay(new Date().getTime()) }, updateTime: { from: null, to: lastDay(new Date().getTime()) }  })
    const [filter, setFilter] = useState<FilterType>(defaultFilter)

    const pages = Math.ceil(count / view.max)

    const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => setFilter((old : FilterType) => ({ ...old, [event.target.name]: event.target.value }))
    const onChangeView = (_: ChangeEvent<unknown>, newValue: ViewKey) => setView(old => newValue ? new ViewMode(newValue) : old)
    const onRequestSort = (property: PropertyType) =>
    {
        const isDesc = by === property && order === SortKey.DESC
        setOrder(isDesc ? SortKey.ASC : SortKey.DESC)
        setBy(property)
    }
    const onChangePage = (_: ChangeEvent<unknown>, value: number) => setPage(() => value - 1)
    const onSelected = (value: UserType) => () => setSelected(old =>
    {
        if (old.includes(value.id)) return old.filter(data => data !== value.id)
        else return [...old, value.id]
    })
    const onSelectAll = async (event: ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.checked) setSelected(old =>
        {
            return [...old, ...available.filter(item => !old.includes(item))]
        })
        else setSelected( old => old.filter(item => !available.includes(item)))
    }
    const onResetFilter = (wipe?: boolean) => setFilter(old => wipe ? defaultFilter : ({ ...defaultFilter, search: old.search }))
    const onFinishDelete = async () =>
    {
        await getMax()
        await getLength()
        await getList()
        setSelected([])
    }

    const getLength = async () =>
    {
        const c = await API.GET<number>(`count/users?${ getAPI() }`)
        if (c.error) showError(c.message)
        else setCount(c)

        setList(Array.from({ length: Math.min(c , view.max) }).map(() => null))
        //
        // if (Access.Full.check(access.admin))
        // {
            const result = await API.silent.GET<UserType[]>(`users?${ getAPI() }`)
            if (result.error) showError(result.message)
            else setAvailable(result.map(value => value.id))
        // }
    }

    const getList = async (reset?: boolean) =>
    {
        const result = await API.silent.GET<UserType[]>(`users?${ getAPI(true, Boolean(reset)) }`)
        // setList([])

        if (result.error)
        {
            setList([])
            showError(result.message)
        }
        else setList(result)
    }
    const getMax = async () =>
    {
        // if (Access.Full.check(access.admin))
        // {
            const l = await API.GET<number>('count/users')
            if (l.error) showError(l.message)
            else setLength(l)
        // }

        const c = await API.GET<number>('count/users')
        if (c.error) showError(c.message)
        else setMax(c)
    }
    const getFilter = async () =>
    {
        const result = await API.GET<TimeType>(`filter/users`)
        if (result.error) showError(result.message)
        else setDefaultFilter(old =>
        {
            const output = { ...old, updateTime: { from : firstDay(result.updateTime?.from || 0), to : lastDay(Date.now()) }, createTime: { from: firstDay(result.createTime?.from || 0), to: lastDay(Date.now()) } }
            setFilter(output)
            return output
        })
    }
    const getAPI = (list = false, reset = false) =>
    {
        const params = new URLSearchParams()

        if (list)
        {
            if (page >= 0)
            {
                params.set('from', `${ reset ? 0 : page * view.max }`)
                params.set('to', `${ reset ? view.max : (page + 1) * view.max }`)
            }

            params.set('sort', `${ by }-${ order }`)
        }

        params.set('search', encodeToSlug(filter.search))
        params.set('createTime', `${ filter.createTime.from }-${ filter.createTime.to || filter.createTime.from }`)
        params.set('updateTime', `${ filter.updateTime.from }-${ filter.updateTime.to || filter.updateTime.from }`)

        // params.set('role', `${ filter.role.map(item => item === 'default' ? 'default' : item.split('-')[1]).join(' ') }`)
        // params.set('activate', `${ filter.activate ? 'yes' : 'no' }`)
        // params.set('otp', `${ filter.otp ? 'yes' : 'no' }`)
        // params.set('passkey', `${ filter.passkey ? 'yes' : 'no' }`)
        // params.set('google', `${ filter.google ? 'yes' : 'no' }`)
        // params.set('github', `${ filter.github ? 'yes' : 'no' }`)
        // params.set('discord', `${ filter.discord ? 'yes' : 'no' }`)

        if (filter.search.length === 0) params.delete('search')
        // if (filter.role.length === 0) params.delete('role')
        // if (filter.activate === null) params.delete('activate')
        // if (filter.otp === null) params.delete('otp')
        // if (filter.passkey === null) params.delete('passkey')
        // if (filter.google === null) params.delete('google')
        // if (filter.github === null) params.delete('github')
        // if (filter.discord === null) params.delete('discord')

        return params.toString()
    }
    const getParam = () =>
    {
        const url = path.url
        const params = new URLSearchParams(location.search)

        params.set('search', encodeToSlug(filter.search))
        params.set('sort', `${ by }-${ order }`)
        params.set('page', `${ page + 1 }`)
        params.set('view', `${ view.value }`)

        // params.set('time', isSameDate(filter.time.from, filter.time.to) ? ` ${ encodeTime(filter.time.from) }` : isToday(filter.time.to) ? encodeTime(filter.time.from) :  `${ encodeTime(filter.time.from) }-${ encodeTime(filter.time.to) }`)
        //
        // params.set('role', `${ filter.role.map(item => item === 'default' ? 'default' : item.split('-')[1]).join(' ') }`)
        // params.set('activate', `${ filter.activate ? 'yes' : 'no' }`)
        // params.set('otp', `${ filter.otp ? 'yes' : 'no' }`)
        // params.set('passkey', `${ filter.passkey ? 'yes' : 'no' }`)
        // params.set('google', `${ filter.google ? 'yes' : 'no' }`)
        // params.set('github', `${ filter.github ? 'yes' : 'no' }`)
        // params.set('discord', `${ filter.discord ? 'yes' : 'no' }`)

        if (page < 1) params.delete('page')
        if (by === 'createTime' && order === 'desc') params.delete('sort')
        if (view.value === ViewMode.List.value) params.delete('view')
        if (filter.search.length === 0) params.delete('search')

        // if (filter.time.to === null || (isToday(filter.time.to)) && isSameDate(filter.time.from, defaultFilter.time.from)) params.delete('time')
        // if (filter.role.length === 0) params.delete('role')
        // if (filter.activate === null) params.delete('activate')
        // if (filter.otp === null) params.delete('otp')
        // if (filter.passkey === null) params.delete('passkey')
        // if (filter.google === null) params.delete('google')
        // if (filter.github === null) params.delete('github')
        // if (filter.discord === null) params.delete('discord')

        let newPath = `${ url }?${ params.toString() }`
        if (newPath.endsWith('?')) newPath = url
        window.history.replaceState(null, '', newPath)
    }
    const setParam = () =>
    {
        // const query = new URLSearchParams(location.search)
        setParamPage()
        setParamSort()
        setParamView()
        setParamSearch()
        // setParamTime(query)
        // setParamRole(query)
        // setParamActivate(query)
        // setParamOTP(query)
        // setParamPasskey(query)
        // setParamGoogle(query)
        // setParamGithub(query)
        // setParamDiscord(query)
    }

    const setParamPage = (query = new URLSearchParams(location.search)) =>
    {
        // if (query)
        // {
            const pageString = query.get("page")
            const param = (pageString ? parseInt(pageString) : 1) - 1
            if (param !== -1) setPage(Math.min(param, pages - 1))
        // if (param !== -1) setPage(param)

        // console.log(param, pages, pageString, Math.min(param, pages - 1))

        // }
        // else
        // {
        //     query = new URLSearchParams(location.search)
        //     const pageString = query.get("page")
        //
        //     const param = (pageString ? parseInt(pageString) : 1) - 1
        //     if (param !== -1) setPage(param)
        // }
    }

    const setParamSort = (query = new URLSearchParams(location.search)) =>
    {
        const param = query.get("sort")

        if (param)
        {
            const byParam = param.split('-')[0]
            const orderParam = param.split('-')[1]

            if (Object.values(SortKey).includes(orderParam as SortKey) && PropertyTypeValues.includes(byParam as PropertyType))
            {
                setOrder(orderParam as SortKey)
                setBy(byParam as PropertyType)
            }
        }
        else
        {
            setOrder(SortKey.DESC)
            setBy('createTime')
        }
    }

    const setParamView = (query = new URLSearchParams(location.search)) =>
    {
        const param = query.get("view") || ''
        if (Object.values(ViewKey).includes(param as ViewKey)) setView(new ViewMode(param as ViewKey))
    }

    const setParamSearch = (query = new URLSearchParams(location.search)) =>
    {
        const param = query.get("search") || ''
        setFilter(old => ({ ...old, search: param }))
    }



    useEffect(() =>
    {
        if (max >= 0) requestAnimationFrame(getParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, order, by, view, filter])
    useEffect(() =>
    {
        if (max >= 0) setParam()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, max])
    useEffect(() =>
    {
        if (max >= 0 && page >= 0 && !(filter.createTime.to === null || filter.updateTime.to === null)) getList().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, order, by, view])
    useEffect(() =>
    {
        if (max >= 0 && page >= 0 && filter.createTime.to !== null && filter.updateTime.to !== null) requestAnimationFrame(async () =>
        {
            await getLength()
            await getList(true)
            if (page !== 0) setPage(0)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, max])
    useEffect(() =>
    {
        const initialize = async () =>
        {
            await getFilter()
            setParam()
            await getMax()
        }

        initialize().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() =>
    {
        if (max >= 0)  getLength().then(() => setParamPage())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [max])
    useEffect(() =>
    {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPage(old => pages > 0 ? Math.max(0, Math.min(old, pages - 1)) : old)
    }, [pages])

    // const controller = () =>
    // <Fragment>
    //     { length > 0 && <DeleteButton onFinish={ onFinishDelete } path='role'>{ selected }</DeleteButton> }
    // </Fragment>

    // useEffect(() =>
    // {
    //     setController(controller())
    //     return () => removeController()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selected, length])

    useController(() =>
    <Fragment>
        { length > 0 && <DeleteButton onFinish={ onFinishDelete } path='role'>{ selected }</DeleteButton> }
    </Fragment>, [selected, length])

    const stateGetter = { available, count, page, view, order, by, list, selected, length, filter, defaultFilter, max }
    const stateSetter = { setOrder, setBy }
    const functions = { onChangeView, onRequestSort, onChangePage, onSelected, onSelectAll, onChangeFilter, onResetFilter }
    const constants = { path }

    return <Context.Provider value={{ ...stateGetter, ...stateSetter, ...functions, ...constants }}>
        { children }
    </Context.Provider>
}

export default Provider