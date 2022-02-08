import { T_Bili } from "./sites/bilibili"
import { T_DoubanBook } from "./sites/douban_book"
import { T_DoubanMovie } from "./sites/douban_movie"
import { T_Twitter } from "./sites/twitter"
import { T_Wiki } from "./sites/wikipedia"
import { T_Zhihu } from "./sites/zhihu"

const SOURCES = [
    'douban_movie',
    'douban_book',
    'twitter',
    'wikipedia',
    'bilibili',
    'github',
    'zhihu',
    'youtube',
    'just_text',
    'just_image',
    'podcast'
] as const

interface ISources {
    douban_movie: T_DoubanMovie
    douban_book: T_DoubanBook
    wikipedia: T_Wiki
    zhihu: T_Zhihu
    twitter: T_Twitter
    bilibili: T_Bili
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
