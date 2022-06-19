import { T_HandlerInfo } from '../meta/handler'
import { REQ_NAMES_INSERT, T_Item, T_Item_Mongo } from '../meta/item'
import { getAllTags, getGraphById, getGraphsByName, getPagesByIds, getPagesByTitle, insertNewItem, insertNewTag, _insertNewItem } from '../utilities/mongo_client'
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

const h_InsertGeneralPage_: T_HandlerInfo = {
    name: REQ_NAMES_INSERT['general'],
    type: 'POST',
    handler: async (req, res) => {
        let item = req.body
        let ret = await _insertNewItem('general', item)
        if (ret) {
            res.json(ret)
        } else {
            res.status(500)
        }
    }
}

const h_InsertNewTag: T_HandlerInfo = {
    name: '/insert/tag',
    type: 'POST',
    handler: async (req, res) => {
        let bd = JSON.parse(req.body)
        let ret = await insertNewTag(bd.tag)
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

const h_QueryPages_title: T_HandlerInfo = {
    name: '/query/page/bytitle/:title',
    type: 'GET',
    handler: async (req, res) => {
        let arr = await getPagesByTitle(req.params.title)
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

const h_QueryPages_ids: T_HandlerInfo = {
    name: '/query/page/byids/:ids',
    type: 'GET',
    handler: async (req, res) => {
        let arr = await getPagesByIds(['626d6056c7997f7be816340e', '626d60b1c7997f7be816340f'])
        if (arr.length > 0) {
            let tmp1 = arr[0] as unknown as T_Item<'general'>
            let tmp2 = arr[1] as unknown as T_Item<'general'>
            let str = JSON.stringify(tmp1.title + tmp2.title)
            res.json(str)
        } else {
            res.status(404)
        }
    }
}

const h_QueryGraphs_name: T_HandlerInfo = {
    name: '/query/graph/byname/:name',
    type: 'GET',
    handler: async (req, res) => {
        let arr = await getGraphsByName(req.params.name)
        if (arr.length == 1) {
            res.json(arr[0])
        } else {
            res.status(404)
        }
    }
}

const h_QueryGraphs_id: T_HandlerInfo = {
    name: '/query/graph/byid/:id',
    type: 'GET',
    handler: async (req, res) => {
        let ret = await getGraphById(req.params.id)
        if (ret) {
            res.json(ret)
        } else {
            res.status(404)
        }
    }
}

export const handlerInfos: T_HandlerInfo[] = [
    h_InsertGeneralPage_,
    // h_InsertGeneralPage,
    h_InsertNewTag,
    h_QueryTags
    // h_QueryPages_title,
    // h_QueryPages_ids,
    // h_QueryGraphs_name,
    // h_QueryGraphs_id
]