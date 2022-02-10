import { RequestHandler } from "express";
import { T_Item, T_Source } from "./item";

export type T_HandlerInfo<S extends T_Source> = {
    name: string,
    type: 'POST' | 'GET',
    // handler: RequestHandler<{}, string, T_Item<S>, Record<string, string>, Record<string, string>>
    handler: RequestHandler<{}, string, string, Record<string, string>, Record<string, string>>
}
