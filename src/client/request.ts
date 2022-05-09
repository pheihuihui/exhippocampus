import { T_Source, T_Item } from "../meta/item"
import { CONF_CLIENT } from "../utilities/configurations"
import { serializeItem } from "../utilities/data_transfer"

const serverUrl = CONF_CLIENT.SERVER

const REQ_NAMES_INSERT = {
    douban_movie: '/insert/douban_movie',
    twitter: '/insert/twitter',
    general: '/insert/general',
    image: '/insert/image',
    graph: '/insert/graph',
    person: '/insert/person',
} as const

const REQ_NAMES_QUERY = {
    douban_movie: '/query/douban_movie',
    twitter: '/query/twitter',
    general: '/query/general',
    image: '/query/image',
    graph: '/query/graph',
    person: '/query/person',
} as const

async function insertOneItem<T extends T_Source>(itemType: T, data: T_Item<T>) {
    let str = await serializeItem(itemType, data)
    let url = `http://${serverUrl}${REQ_NAMES_INSERT[itemType]}`
    let resp = await fetch(url, { method: 'POST', body: str })
    let ret = await resp.json()
    return ret
}

type T_BasicItemInfo = {
    itemType: T_Source
    title: string
    id: string
}

async function queryItems(title: string): Promise<Array<T_BasicItemInfo>> {
    return []
}

async function queryOneItem(id: string): Promise<T_Item<any>> {
    // @ts-ignore
    return {}
}