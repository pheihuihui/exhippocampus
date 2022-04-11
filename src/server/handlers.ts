import { T_HandlerInfo } from '../meta/handler'
import { REQ_NAMES_INSERT, T_Item, T_Item_Mongo } from '../meta/item'
import { getAllTags, getPages, insertNewItem } from '../utilities/mongo_client'
import { deserializeItem_node } from "../utilities/data_transfer"
import { mhtml2html } from '../utilities/mhtml2html'
import { Blob as _Blob } from 'buffer'

const h_InsertGeneralPage: T_HandlerInfo = {
    name: REQ_NAMES_INSERT['general'],
    type: 'POST',
    handler: async (req, res) => {
        let item = JSON.parse(req.body) as T_Item_Mongo
        let ret = await insertNewItem('general', item)
        if (ret) {
            res.json(ret)
        } else {
            res.status(500)
        }
    }
}

const h_QueryTags: T_HandlerInfo = {
    name: '/query/tags',
    type: 'GET',
    handler: async (req, res) => {
        let arr = await getAllTags()
        res.json(JSON.stringify(arr))
    }
}

const h_QueryPages: T_HandlerInfo = {
    name: '/query/pages/:title',
    type: 'GET',
    handler: async (req, res) => {
        let arr = await getPages(req.params.title)
        if (arr.length > 0) {
            let tmp = arr[0] as unknown as T_Item<'general'>
            let det = tmp.details
            if (det.type == 'mhtml') {
                let str1 = mhtml2html.convert(det.content)
                det.content = str1.serialize()
                det.type = 'html'
            }
            let str = JSON.stringify(tmp)
            res.json(str)
        } else {
            res.status(404)
        }
    }
}

export const handlerInfos: T_HandlerInfo[] = [
    h_InsertGeneralPage,
    h_QueryTags,
    h_QueryPages
]