import { MongoClient, ObjectId } from 'mongodb'
import { T_Graph } from '../meta/graph'
import { T_Item_Mongo, T_Source } from '../meta/item'
import { CONF_SERVER } from './configurations'
import { deserializeGraph, serializeGraph } from './data_transfer'

const APPDBNAME = 'ExhippocampusDB'
const APPCOLLNAME_PAGES = 'ExhippocampusColl_Pages'
const APPCOLLNAME_IMAGES = 'ExhippocampusColl_Images'
const APPCOLLNAME_TAGS = 'ExhippocampusColl_Tags'
const APPCOLLNAME_PERSONS = 'ExhippocampusColl_Persons'
const APPCOLLNAME_TESTDATA = 'ExhippocampusColl_Testdata'
const APPCOLLNAME_GRAPH = 'ExhippocampusColl_Graphs'

const COLL_NAMES_ITEM: Record<T_Source, string> = {
    douban_movie: APPCOLLNAME_TESTDATA,
    douban_book: APPCOLLNAME_TESTDATA,
    wikipedia: APPCOLLNAME_TESTDATA,
    zhihu: APPCOLLNAME_TESTDATA,
    twitter: APPCOLLNAME_TESTDATA,
    bilibili: APPCOLLNAME_TESTDATA,
    general: APPCOLLNAME_PAGES,
    image: APPCOLLNAME_IMAGES
}

class ExhippocampusDataManager {
    private static client: MongoClient
    static async getMongoClient() {
        if (ExhippocampusDataManager.client && ExhippocampusDataManager.client) return this.client
        let cli = await MongoClient.connect(CONF_SERVER.CONNSTR_NODE)
        this.client = cli
        return this.client
    }
}

async function getCollection<T extends T_Source>(itemType: T) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let collname = COLL_NAMES_ITEM[itemType] as string
    let coll = db.collection(collname)
    return coll
}

export async function insertNewItem<T extends T_Source>(itemType: T, item: T_Item_Mongo) {
    let coll = await getCollection(itemType)
    let res = await coll.insertOne(item)
        .then(res => res.insertedId.toString())
        .catch(err => {
            console.log(err)
        })
    return res
}

export async function insertNewGraph(gr: T_Graph) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_GRAPH)
    let str = serializeGraph(gr)
    let res = await coll.insertOne({ serialized: str, name: gr.name })
        .then(res => res.insertedId.toString())
        .catch(err => {
            console.log(err)
        })
    return res
}

export async function getGraphsByName(name: string) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_GRAPH)
    let arr = await coll.find({ name: name }).toArray()
    return arr.map(x => x.serialized)
}

export async function getGraphById(id: string) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_GRAPH)
    let arr = await coll.find({ "_id": new ObjectId(id) }).toArray()
    if (arr.length == 1) {
        return arr[0].serialized as string
    }
}

export async function insertNewTag(tag: string) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_TAGS)
    let res = await coll.insertOne({ tag: tag })
        .then(res => res.insertedId.toString())
        .catch(err => {
            console.log(err)
        })
    return res
}

export async function getAllTags() {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_TAGS)
    let res = await coll.find().toArray()
    return res.map(x => x.tag as string)
}

export async function searchItem(keywords: string) {

}

export async function getPagesByTitle(title: string) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_PAGES)
    let arr = await coll.find({ title: title }).toArray()
    return arr
}

export async function getPagesByIds(ids: string[]) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_PAGES)
    let objids = ids.map(x => new ObjectId(x))
    let arr = await coll.find({ "_id": { "$in": objids } }).toArray()
    return arr
}

export async function disconnectMongo() {
    let client = await ExhippocampusDataManager.getMongoClient()
    await client.close()
}