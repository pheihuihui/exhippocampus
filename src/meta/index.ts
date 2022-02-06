import { TBili } from "./_bilibili"
import { TDoubanBook } from "./_douban_book"
import { TDoubanMovie } from "./_douban_movie"
import { TTwitter } from "./_twitter"
import { TWiki } from "./_wikipedia"
import { TZhihu } from "./_zhihu"


// const SOURCES = [
//     'douban_movie',
//     'douban_book',
//     'twitter',
//     'wikipedia',
//     'bilibili',
//     'github',
//     'zhihu',
//     'youtube',
//     'just_text',
//     'just_image',
//     'podcast',
//     'gcores_article'
// ] as const


interface ISources {
    douban_movie: TDoubanMovie
    douban_book: TDoubanBook
    wikipedia: TWiki
    zhihu: TZhihu
    twitter: TTwitter
    bilibili: TBili
}

type TSource = keyof ISources

type TItem<T extends TSource> = {
    ID: string
    language: 'none' | Set<'en' | 'cn' | 'jp' | 'other'>
    link?: string
    relatedPersons?: string[]
    details: ISources[T]
    tags: Set<string>
}

type TPerson = {
    ID: string
    name?: string
    otherNames?: Set<string>
    image?: string
    birth?: string
    death?: string
}
