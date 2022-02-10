import { T_GeneralPage } from "./general_site"
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
    general: T_GeneralPage
}

export type T_Source = keyof I_Sources

type T_ReqName = Record<T_Source, string>

export const REQ_NAMES_INSERT: T_ReqName = {
    douban_movie: '/insert/douban_movie',
    douban_book: '/insert/douban_book',
    wikipedia: '/insert/wikipedia',
    zhihu: '/insert/zhihu',
    twitter: '/insert/twitter',
    bilibili: '/insert/bilibili',
    general: '/insert/general'
} as const

export type T_Item<T extends T_Source> = {
    title: string
    timestamp: number
    language: 'none' | Set<'en' | 'cn' | 'jp' | 'other'>
    link?: string
    relatedPersons?: string[]
    details: I_Sources[T]
    tags: string[]
}

export type F_Item_Serialization<T extends T_Source> = (itemType: T, item: T_Item<T>) => string
export type F_Item_Deserialization<T extends T_Source> = (str: string, itemType: T) => T_Item<T>

export type T_Person = {
    ID: string
    name?: string
    otherNames?: string[]
    image?: string
    birth?: string
    death?: string
}
