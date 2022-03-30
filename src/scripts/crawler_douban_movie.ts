import fetch from 'node-fetch'
import { ratings } from './douban_movie_ratings'
import { MongoClient } from 'mongodb'
import { CONF_SERVER } from '../utilities/configurations';

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const urlPrefix = 'http://127.0.0.1:5000/movies/'

async function _fetch() {
    let client = await MongoClient.connect(CONF_SERVER.CONNSTR_NODE)

    let coll_douban_missings = client.db('ExhippocampusDB').collection('douban_missings')
    let coll_douban_movies = client.db('ExhippocampusDB').collection('douban_movies')

    for (const key in ratings) {
        if (Object.prototype.hasOwnProperty.call(ratings, key)) {
            console.log(key)
            const rt = ratings[key];
            let url = `${urlPrefix}${key}`
            let resp = await fetch(url)
            let json = await resp.json()
            let res = { ...json, my_rating: rt }
            await coll_douban_movies.insertOne(res)
            await sleep(1000)
        }
    }

}


_fetch()
