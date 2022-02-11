import { RequestHandler } from 'express'

export type T_HandlerInfo = {
    name: string,
    type: 'POST' | 'GET',
    // handler: RequestHandler<{}, string, T_Item<S>, Record<string, string>, Record<string, string>>
    handler: RequestHandler<{}, string, string, Record<string, string>, Record<string, string>>
}
