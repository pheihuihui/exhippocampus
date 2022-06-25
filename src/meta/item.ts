import { T_GeneralImage } from "./general_image"
import { T_GeneralPage } from "./general_page"
import { T_Graph } from "./graph"
import { T_DoubanMovie } from "./sites/douban_movie"
import { T_Twitter } from "./sites/twitter"
import { Replace, ValueOf } from "./utilities"

export interface I_Sources {
    douban_movie: T_DoubanMovie
    twitter: T_Twitter
    general: T_GeneralPage
    image: T_GeneralImage
    graph: T_Graph
    person: T_Person
}

export type T_Source = keyof I_Sources

export const REQ_NAMES_INSERT: Record<T_Source, string> = {
    douban_movie: '/insert/douban_movie',
    twitter: '/insert/twitter',
    general: '/insert/general',
    image: '/insert/image',
    graph: '/insert/graph',
    person: '/insert/person',
}

export type T_Item<T extends T_Source> = {
    source: T
    title: string
    timestamp: number
    language: 'none' | Array<string>
    link?: string
    relatedPersons: string[]
    details: I_Sources[T]
    tags: string[]
}

export type T_Popup_Form = {
    requestType: 'capture page' | 'save image'
    data: {
        title: string,
        languages: Array<string>,
        tags: Array<string>,
        relatedPersons: Array<string>
    }
}

export type T_SerializedDetail<T extends T_Source> = Record<keyof T_Item<T>['details'], string>

export type T_Item_Form = Omit<T_Item<any>, 'details' | 'timestamp' | 'source' | 'link'>
export type T_Item_Mongo = Replace<T_Item<any>, 'details', string>

export type F_Item_Details_Serialization<T extends T_Source> = (item: T_Item<T>['details']) => Promise<string>
export type F_Item_Details_Deserialization<T extends T_Source> = (detail: T_SerializedDetail<T>) => Promise<T_Item<T>['details']>

export type T_Person = {
    name: string
    otherNames?: string[]
    image?: string
    birth?: number
    death?: number
}
