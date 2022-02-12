import { T_Item } from '../meta/item'
import { insertNewItem } from '../utilities/mongo_client'
import { serializeItem } from '../utilities/data_transfer'

let data: T_Item<'general'> = {
    title: 'title',
    timestamp: Date.now(),
    language: 'none',
    link: 'ssss',
    relatedPersons: [],
    details: {
        pageContent: new Blob()
    },
    tags: []
}

serializeItem('general', data)
    .then(x => {
        insertNewItem('general', x)
    })
    .then(x => {
        console.log(x)
    })