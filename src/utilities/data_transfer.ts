import { F_Item_Details_Deserialization, F_Item_Details_Serialization, I_Sources, T_Item, T_Source } from '../meta/item'

export async function serializeItem<T extends T_Source>(itemType: T, item: T_Item<T>) {

    let sub: F_Item_Details_Serialization<any>

    switch (itemType) {
        case 'general': {
            return JSON.stringify(item)
        }
        case 'bilibili': {
            let _sub: F_Item_Details_Serialization<'bilibili'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        case 'douban_book': {
            let _sub: F_Item_Details_Serialization<'douban_book'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        case 'douban_movie': {
            let _sub: F_Item_Details_Serialization<'douban_movie'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        case 'twitter': {
            let _sub: F_Item_Details_Serialization<'twitter'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        case 'wikipedia': {
            let _sub: F_Item_Details_Serialization<'wikipedia'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        case 'zhihu': {
            let _sub: F_Item_Details_Serialization<'zhihu'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        case 'image': {
            let _sub: F_Item_Details_Serialization<'zhihu'>
            _sub = async _detail => ''
            sub = _sub
            break
        }
        default: {
            const _: never = itemType
            sub = _
            break
        }
    }

    let det = await sub(item.details)
    let tmp: any = item
    tmp.details = det
    return JSON.stringify(tmp)

}

export async function deserializeItem<T extends T_Source>(itemType: T, str: string) {
    let sub: F_Item_Details_Deserialization<any>
    let obj = JSON.parse(str) as T_Item<any>
    let det = JSON.parse(obj.details)

    switch (itemType) {
        case 'general': {
            let res: T_Item<'general'> = JSON.parse(str)
            return res
        }
        case 'bilibili':
        case 'douban_book':
        case 'douban_movie':
        case 'twitter':
        case 'wikipedia':
        case 'image':
        case 'zhihu': {
            sub = (tmp: any) => tmp
            break
        }
        default: {
            let _: never = itemType
            sub = _
            break
        }
    }

    let detobj = await sub(det)
    obj.details = detobj
    return obj as T_Item<T>
}

export async function deserializeItem_node<T extends T_Source>(itemType: T, str: string) {
    let sub: F_Item_Details_Deserialization<any>
    let obj = JSON.parse(str) as T_Item<any>
    let det = JSON.parse(obj.details)

    switch (itemType) {
        case 'general': {
            let _sub: F_Item_Details_Deserialization<any>
            _sub = async _det => {
                let cont = _det.pageContent
                let blb = dataURItoBlob_node(cont)
                return ({ pageContent: blb })
            }
            sub = _sub
            break
        }
        case 'bilibili':
        case 'douban_book':
        case 'douban_movie':
        case 'twitter':
        case 'wikipedia':
        case 'image':
        case 'zhihu': {
            sub = (tmp: any) => tmp
            break
        }
        default: {
            let _: never = itemType
            sub = _
            break
        }
    }

    let detobj = await sub(det)
    obj.details = detobj
    return obj as T_Item<T>
}
