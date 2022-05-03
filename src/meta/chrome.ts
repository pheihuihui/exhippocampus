type T_General = {} & T_Common
type T_Image = {} & T_Common

type T_Common = {
    title: string
    languages?: string[]
    tags?: string[]
}

export type I_MessageResponseMap = {
    'general': T_General
    'image': T_Image
}