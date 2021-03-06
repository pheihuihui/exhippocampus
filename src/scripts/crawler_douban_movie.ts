import { ratings } from './douban_movie_ratings'
import { MongoClient } from 'mongodb'
import { mongodb } from '../appconfig.json'
import { createReadStream } from 'fs'
import { createInterface } from 'readline'

function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const urlPrefix = 'http://127.0.0.1:5000/movies/'

async function _fetch() {
    let client = await MongoClient.connect(mongodb.url)
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

async function __() {
    // let client = await MongoClient.connect(mongodb.url)
    // let coll_douban_movies = client.db('AA').collection('BB')

    let stream = createReadStream('D:\\CCC.json')
    let rl = createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let u = 0
    rl.on('line', line => {
        u += 1
    })
    console.log(u)

    
}

async function query_details(field: string) {
    let client = await MongoClient.connect(mongodb.url)
    let coll_douban_movies = client.db('ExhippocampusDB').collection('douban_movies')

    let cur = await coll_douban_movies.find()
    let _arr = await cur.toArray()
    let arr = _arr.filter(x => !("0" in x && "1" in x))

    let actors: Record<string, number> = {}

    for (const u of arr) {
        let _actors: string = u[field]
        if (_actors) {
            let arractors = _actors.split('/').map(x => x.trim())
            for (const a of arractors) {
                if (actors[a]) {
                    actors[a] += 1
                } else {
                    actors[a] = 1
                }
            }
        }
    }

    let shownTimes: Record<number, string[]> = {}
    for (const key in actors) {
        if (Object.prototype.hasOwnProperty.call(actors, key)) {
            const element = actors[key];
            if (shownTimes[element]) {
                shownTimes[element].push(key)
            } else {
                shownTimes[element] = [key]
            }
        }
    }

    console.log(shownTimes)

    await client.close()
}

async function query404() {
    let client = await MongoClient.connect(mongodb.url)
    let coll_douban_movies = client.db('ExhippocampusDB').collection('douban_movies')

    let cur = await coll_douban_movies.find()
    let _arr = await cur.toArray()
    let arr = _arr.filter(x => "0" in x && "1" in x)
    console.log(arr)
    await client.close()
}

// query_details('year')
// query404()

// fetch('https://nodejs.org/en/blog/announcements/v18-release-announce/')
//     .then(x => x.text())
//     .then(console.log)

__()