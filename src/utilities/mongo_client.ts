import { MongoClient } from 'mongodb'

const APPDBNAME = 'ExhippocampusDB'
const APPCOLLNAME_PAGES = 'ExhippocampusColl_Pages'
const APPCOLLNAME_TAGS = 'ExhippocampusColl_Tags'
const APPCOLLNAME_PERSONS = 'ExhippocampusColl_Persons'
const APPCOLLNAME_TESTDATA = 'ExhippocampusColl_Testdata'

const CONNSTR_NODE = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'
const CONNSTR_BROWSER = 'http://localhost:28017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

class ExhippocampusDataManager {
    private static client: MongoClient
    static async getMongoClient() {
        if (ExhippocampusDataManager.client && ExhippocampusDataManager.client) return this.client
        let cli = await MongoClient.connect(CONNSTR_BROWSER)
        this.client = cli
        return this.client
    }
}

async function getCollection() {
    let client = await ExhippocampusDataManager.getMongoClient()
    let db = client.db(APPDBNAME)
    let coll = db.collection(APPCOLLNAME_TESTDATA)
    return coll
}

export async function insertNewItem(item: any) {
    let coll = await getCollection()
    await coll.insertOne({ val: item })
        .then(res => {
            console.log(res.insertedId)
        })
}
