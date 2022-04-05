import { F_Item_Details_Deserialization, F_Item_Details_Serialization, I_Sources, T_Item, T_SerializedDetail, T_Source } from '../meta/item'

function _readAsDataURL(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        const fr = new FileReader()
        fr.onerror = reject
        fr.onload = () => {
            let res = fr.result
            if (typeof res == 'string') {
                resolve(res)
            } else {
                reject()
            }
        }
        fr.readAsDataURL(blob)
    })
}

const b64toBlob = (base64: string, type = 'application/octet-stream') =>
    fetch(`data:${type};base64,${base64}`).then(res => res.blob())

export async function serializeItem<T extends T_Source>(itemType: T, item: T_Item<T>) {

    let sub: F_Item_Details_Serialization<any>

    switch (itemType) {
        case 'general': {
            let _sub: F_Item_Details_Serialization<'general'>
            _sub = async _detail => {
                let str = await _readAsDataURL(_detail.pageContent)
                let obj: Record<keyof I_Sources['general'], string> = {
                    pageContent: str
                }
                return JSON.stringify(obj)
            }
            sub = _sub
            break
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
    let det = obj.details

    switch (itemType) {
        case 'general': {
            let _sub: F_Item_Details_Deserialization<'general'>
            _sub = async _det => {
                let tmp = await b64toBlob(_det.pageContent)
                return ({ pageContent: tmp })
            }
            sub = _sub
            break
        }
        case 'bilibili':
        case 'douban_book':
        case 'douban_movie':
        case 'twitter':
        case 'wikipedia':
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