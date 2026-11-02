import admin from './admin.ts'
import client from './client.ts'
import server from './server.ts'

export interface TypeURI
{
    path: string
    port?: number
}

interface TypeURL
{
    admin: string,
    client: string,
    server: string
}

const toString= (data: TypeURI) => `${ data.path }${ data.port ? `:${ data.port }` : '' }`


const URL: TypeURL = { admin: toString(admin), client: toString(client), server: toString(server) }

export default URL