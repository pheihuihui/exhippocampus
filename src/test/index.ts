import { disconnectMongo, getAllTags, insertNewTag } from '../utilities/mongo_client'

// insertNewTag('typescript')
getAllTags()
    .then(x => console.log(x))
    .then(() => disconnectMongo())