import { T_GeneralSite } from "./general_site"
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

interface I_Sources {
    douban_movie: T_DoubanMovie
    douban_book: T_DoubanBook
    wikipedia: T_Wiki
    zhihu: T_Zhihu
    twitter: T_Twitter
    bilibili: T_Bili
    general: T_GeneralSite
}

type T_Source = keyof I_Sources

type T_Item<T extends T_Source> = {
    ID: string
    language: 'none' | Set<'en' | 'cn' | 'jp' | 'other'>
    link?: string
    relatedPersons?: string[]
    details: I_Sources[T]
    tags: Set<string>
}

type T_Person = {
    ID: string
    name?: string
    otherNames?: Set<string>
    image?: string
    birth?: string
    death?: string
}
