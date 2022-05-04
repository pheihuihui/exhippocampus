import { F_Item_Details_Deserialization, F_Item_Details_Serialization, I_Sources, T_Item, T_Source } from '../meta/item'
import { Blob as _Blob } from 'buffer'
import { I_Relation, T_Graph } from '../meta/graph'

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

const dataURItoBlob_node = (dataURI: string) => {
    var data = dataURI.split(',')[1]
    var byteString = Buffer.from(data, "base64")
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
    var blob = new _Blob([byteString], { type: mimeString })
    return blob
}

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

export const serializeGraph = (gr: T_Graph) => {
    return JSON.stringify({
        id: gr.id,
        nodes: Array.from(gr.nodes),
        relations: gr.relations.map(x => {
            if (x.hasOwnProperty('many')) {
                let y = x as unknown as I_Relation['many'] | I_Relation['namy2one'] | I_Relation['one2many']
                Object.assign(y, { many: Array.from(y.many) })
                return y
            } else {
                return x
            }
        }),
        name: gr.name
    })
}

export const deserializeGraph = (str: string) => {
    let res = JSON.parse(str) as T_Graph
    res.nodes = new Set(res.nodes)
    res.relations.map(x => {
        if (x.hasOwnProperty('many')) {
            let y = x as unknown as I_Relation['many'] | I_Relation['namy2one'] | I_Relation['one2many']
            Object.assign(y, { many: new Set(y.many) })
            return y
        }
    })
    return res
}
