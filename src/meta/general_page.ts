export type T_GeneralPage = {
    type: 'mhtml' | 'html'
    content: string
}

export const serializePage = (page: T_GeneralPage) => JSON.stringify(page)
export const deserializePage = (str: string) => JSON.parse(str) as T_GeneralPage