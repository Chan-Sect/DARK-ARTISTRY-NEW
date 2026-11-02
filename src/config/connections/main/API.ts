import axios from 'axios'
import URI from '../URI/index.js'
import store from '../../redux/store.ts'
import Action from '../../redux/action.ts'

axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'

interface APIError
{
    error: true
    code: number
    message: string
}

class API
{
    private readonly silent: boolean
    private method!: 'get' | 'post' | 'put' | 'patch' | 'download' | 'delete'
    private url!: string
    private body!: Record<string, unknown>

    private constructor(silent = false)
    {
        this.silent = silent
    }

    private setLoad = async <T> (): Promise<T & APIError> =>
    {
        const { dispatch } = store

        if(!this.silent) dispatch(Action.set(true))

        const output = await this.call()

        if(!this.silent) dispatch(Action.set(false))

        return output
    }

    private call = async () =>
    {
        const formData: FormData = new FormData()
        const keys: string[] = Object.keys(this.body || {})

        for (const key of keys)
        {
            if (Array.isArray(this.body[key]))
            {
                if (this.body[key].every(item => item instanceof File))
                    for (const file of this.body[key]) formData.append(key, file)
                else formData.append(key, JSON.stringify(this.body[key]))
            }
            else if (this.body[key] !== undefined)
            {
                if (this.body[key] instanceof File) formData.append(key, this.body[key])
                else formData.append(key, JSON.stringify(this.body[key]))
            }
        }

        const handleError = (err: unknown): APIError =>
        {
            const error = err as
            {
                response?:
                {
                    data?: APIError
                }
            }

            const output: APIError = error.response?.data ||
            {
                error: true,
                code: 0,
                message: 'Server bị lỗi'
            }

            if (output.code === 0)
            {
                const { dispatch } = store
                dispatch(Action.error)
            }

            return output
        }

        try
        {
            switch(this.method)
            {
                case 'get':
                {
                    const result = await axios.get(`${ URI.server }/${ this.url }`)
                    return result.data
                }
                case 'delete':
                {
                    const result = await axios.delete(`${ URI.server }/${ this.url }`)
                    return result.data
                }
                case 'post':
                {
                    const result = await axios.post(`${ URI.server }/${ this.url }`, formData)
                    return result.data
                }
                case 'put':
                {
                    const result = await axios.put(`${ URI.server }/${ this.url }`, formData)
                    return result.data
                }
                case 'patch':
                {
                    const result = await axios.patch(`${ URI.server }/${ this.url }`, formData)
                    return result.data
                }

                case 'download':
                {
                    const result = await axios.put(`${ URI.server }/${ this.url }`, { data: formData, responseType: 'blob' as const })
                    return result.data
                }
            }
        }
        catch(err)
        {
            return handleError(err)
        }
    }

    public GET = <T> (url: string): Promise<T & APIError> =>
    {
        this.method = 'get'
        this.url = url

        return this.setLoad()
    }
    public POST = <T> (url: string, body: Record<string, unknown> | object | undefined): Promise<T & APIError> =>
    {
        this.method = 'post'
        this.url = url
        this.body = { ...(body || {}) }

        return this.setLoad()
    }
    public PATCH = <T> (url: string, body: Record<string, unknown> | object | undefined): Promise<T & APIError> =>
    {
        this.method = 'patch'
        this.url = url
        this.body = { ...(body || {}) }

        return this.setLoad()
    }
    public PUT = <T> (url: string, body: Record<string, unknown> | object | undefined): Promise<T & APIError> =>
    {
        this.method = 'put'
        this.url = url
        this.body = { ...(body || {}) }

        return this.setLoad()
    }
    public DOWNLOAD = <T> (url: string): Promise<T & APIError> =>
    {
        this.method = 'download'
        this.url = url

        return this.setLoad()
    }
    public DELETE = <T> (url: string): Promise<T & APIError> =>
    {
        this.method = 'delete'
        this.url = url

        return this.setLoad()
    }

    public static GET = <T> (url: string) => new API().GET<T & APIError>(url)
    public static POST = <T> (url: string, body: Record<string, unknown> | object | undefined) => new API().POST<T & APIError>(url, body)
    public static PATCH = <T> (url: string, body: Record<string, unknown> | object | undefined) => new API().PATCH<T & APIError>(url, body)
    public static PUT = <T> (url: string, body: Record<string, unknown> | object | undefined) => new API().PUT<T & APIError>(url, body)
    public static DOWNLOAD = <T> (url: string) => new API().DOWNLOAD<T & APIError>(url)
    public static DELETE = <T> (url: string) => new API().DELETE<T & APIError>(url)
    public static silent = new API(true)
}

export default API