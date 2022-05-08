import { RequestHandler } from 'express'

export type T_HandlerInfo = {
    name: string,
    type: 'POST' | 'GET' | 'DELETE'
    handler: RequestHandler<any, string, string, Record<string, string>, Record<string, string>>
}
