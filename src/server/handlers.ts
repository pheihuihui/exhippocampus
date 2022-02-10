import { T_HandlerInfo } from '../meta/handler'
import { REQ_NAMES_INSERT, T_Source } from '../meta/item'
import { insertNewItem } from '../utilities/mongo_client'

const insertGeneralPage: T_HandlerInfo<'general'> = {
    name: REQ_NAMES_INSERT['general'],
    type: 'POST',
    handler: async (req, res) => {
        let item = JSON.parse(req.body)
        let ret = await insertNewItem('general', item)
        if (ret) {
            res.json(ret)
        } else {
            res.status(500)
        }
    }
}

export const handlerInfos: T_HandlerInfo<T_Source>[] = [insertGeneralPage]