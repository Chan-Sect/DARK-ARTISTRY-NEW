import {type ProviderProps, useContainer, useData} from "../../../main/providers/main";
import Context from "./context.ts";
import {useLocation} from "react-router-dom";
import {useState} from "react";


interface AccountProps extends ProviderProps
{
    api?: string
}

const Provider = ({ children }: AccountProps) =>
{
    const location = useLocation()
    const { setController, removeController } = useContainer()
    const { access } = useData()

    // const [view, setView] = useState(ViewMode.List)

    const [max, setMax] = useState(-1)
    const [count, setCount] = useState(-1)
    const [length, setLength] = useState(0)
    const [selected, setSelected] = useState([])
    const [available, setAvailable] = useState([])

    const [page, setPage] = useState(0)
    const [order, setOrder] = useState('desc')
    const [by, setBy] = useState('time')
    const [list, setList] = useState([])

    const list: string[] = []



    return <Context value={{ list }}>
        { children }
    </Context>
}

export default Provider