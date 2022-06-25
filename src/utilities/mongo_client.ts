import { MongoClient, ObjectId } from 'mongodb'
import { T_Item_Mongo, T_Source } from '../meta/item'
import { mongodb } from '../appconfig.json'

const APPDBNAME = 'ExhippocampusDB'
const APPCOLLNAME_PAGES = 'ExhippocampusColl_Pages'
const APPCOLLNAME_IMAGES = 'ExhippocampusColl_Images'
const APPCOLLNAME_DoubanMovies = 'ExhippocampusColl_DoubanMovies'
const APPCOLLNAME_Twitter = 'ExhippocampusColl_Twitter'
const APPCOLLNAME_PERSONS = 'ExhippocampusColl_Persons'
const APPCOLLNAME_GRAPHS = 'ExhippocampusColl_Graphs'

const APPCOLLNAME_TAGS = 'ExhippocampusColl_Tags'

const COLL_NAMES_ITEM: Record<T_Source, string> = {
    douban_movie: APPCOLLNAME_DoubanMovies,
    twitter: APPCOLLNAME_Twitter,
    general: APPCOLLNAME_PAGES,
    image: APPCOLLNAME_IMAGES,
    graph: APPCOLLNAME_GRAPHS,
    person: APPCOLLNAME_PERSONS
}

class ExhippocampusDataManager {
    private static client: MongoClient
    static async getMongoClient() {
        if (ExhippocampusDataManager.client && ExhippocampusDataManager.client) return this.client
        let cli = await MongoClient.connect(mongodb.url)
        this.client = cli
        return this.client
    }
}

async function getItemCollection<T extends T_Source>(itemType: T) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let collname = COLL_NAMES_ITEM[itemType] as string
    let coll = db.collection(collname)
    return coll
}

export async function insertNewItem<T extends T_Source>(itemType: T, item: any) {
    let coll = await getItemCollection(itemType)
    let res = await coll.insertOne(item)
        .then(_ => _.insertedId.toString())
        .catch(console.log)
    return res
}

export async function insertNewPerson(person: any) {
    let coll = await getItemCollection('person')
    let res = await coll.insertOne(person)
        .then(_ => _.insertedId.toString())
        .catch(err => {
            console.log(err)
        })
    return res
}

export async function getAllPersonNames() {
    let coll = await getItemCollection('person')
    let _ = await coll.find().toArray()
    let res = _.map(x => x['name'] as string)
    return res
}

export async function getGraphsByName(name: string) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_GRAPHS)
    let arr = await coll.find({ name: name }).toArray()
    return arr.map(x => x.serialized)
}

export async function getGraphById(id: string) {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_GRAPHS)
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