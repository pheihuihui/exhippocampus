import { deserializeImage, deserializeImage_node, serializeImage } from '../meta/general_image'
import { deserializeGraph, serializeGraph } from '../meta/graph'
import { T_Item, T_Source } from '../meta/item'

export async function serializeItem<T extends T_Source>(itemType: T, item: T_Item<T>) {

    switch (itemType) {
        case 'graph': {
            // @ts-ignore
            let det = serializeGraph(item.details)
            // @ts-ignore
            item.details = det
            return JSON.stringify(item)
        }

        case 'image': {
            // @ts-ignore
            let det = await serializeImage(item.details)
            // @ts-ignore
            item.details = det
            return JSON.stringify(item)
        }

        case 'general':
        case 'douban_movie':
        case 'person':
            return JSON.stringify(item)

        default:
            return
    }

}

export async function deserializeItem<T extends T_Source>(itemType: T, str: string): Promise<T_Item<T> | undefined> {

    switch (itemType) {
        case 'graph': {
            let res = JSON.parse(str)
            let det = deserializeGraph(res.details)
            res.details = det
            // @ts-ignore
            return res as T_Item<'graph'>
        }

        case 'image': {
            let img = JSON.parse(str)
            let det = await deserializeImage(img.details)
            img.details = det
            // @ts-ignore
            return img as T_Item<'image'>
        }

        case 'general':
            // @ts-ignore
            return JSON.parse(str) as T_Item<'general'>

        case 'douban_movie':
            // @ts-ignore
            return JSON.parse(str) as T_Item<'douban_movie'>

        case 'person':
            // @ts-ignore
            return JSON.parse(str) as T_Item<'person'>

        default:
            // @ts-ignore
            return
    }

}

export async function deserializeItem_node<T extends T_Source>(itemType: T, str: string): Promise<T_Item<T> | undefined> {

    switch (itemType) {
        case 'graph': {
            let res = JSON.parse(str)
            let det = deserializeGraph(res.details)
            res.details = det
            // @ts-ignore
            return res as T_Item<'graph'>
        }

        case 'image': {
            let img = JSON.parse(str)
            let det = await deserializeImage_node(img.details)
            img.details = det
            // @ts-ignore
            return img as T_Item<'image'>
        }

        case 'general':
            // @ts-ignore
            return JSON.parse(str) as T_Item<'general'>

        case 'douban_movie':
            // @ts-ignore
            return JSON.parse(str) as T_Item<'douban_movie'>

        case 'person':
            // @ts-ignore
            return JSON.parse(str) as T_Item<'person'>

        default:
            // @ts-ignore
            return
    }

}
