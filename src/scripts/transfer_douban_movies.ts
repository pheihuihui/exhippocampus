import { MongoClient } from "mongodb"
import { mongodb } from "../appconfig.json"
import { T_Item } from '../meta/item'
import { T_DoubanMovie } from "../meta/sites/douban_movie"

async function getAllMovies() {
    let client = await MongoClient.connect(mongodb.url)
    let coll_douban_movies = client.db('ExhippocampusDB').collection('douban_movies')
    let coll_douban_movie_items = client.db('ExhippocampusDB').collection('ExhippocampusColl_DoubanMovies')
    let curs = coll_douban_movies.find()
    curs.forEach(x => {
        let item = {} as T_Item<'douban_movie'>
        let det = {} as T_DoubanMovie
        if (x.name) {
            det.name = x.name
            det.rating = Number(x.rating)
            det.sid = x.sid
            det.year = Number(x.year)
            det.intro = x.intro
            det.director = x.director ? x.director.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.writer = x.writer ? x.writer.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.actor = x.actor ? x.actor.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.genre = x.genre ? x.genre.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.country = x.country ? x.country.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.language = x.language ? x.language.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.screen = x.screen ? x.screen.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.duration = x.duration ? x.duration.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.subname = x.subname ? x.subname.split(' / ').map(x => x.trim()).filter(x => x.length != 0) : []
            det.imdb = x.imdb
            item.details = det
            item.relatedPersons = []
            item.source = 'douban_movie'
            item.tags = []
            item.timestamp = Date.now()
            item.title = det.name
            item.language = []
            console.log(item)
            coll_douban_movie_items.insertOne(item)
        }
    })
}

getAllMovies()