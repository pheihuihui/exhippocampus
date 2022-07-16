import { T_Item, T_Source } from "../meta/item"

export const _distance = <T extends T_Source, U extends T_Source>(item1: T_Item<T>, item2: T_Item<U>) => {
    let _persons = 1
    if (item1.relatedPersons && item2.relatedPersons) {
        _persons = _countDups(item1.relatedPersons, item2.relatedPersons)
    }
    let _tags = 1
    if (item1.tags && item2.tags) {
        _tags = _countDups(item1.tags, item2.tags)
    }
    return _persons * _tags
}

export const _countDups = (arr: string[], brr: string[]) => {
    let res = 1
    for (const a of arr) {
        for (const b of brr) {
            if (a == b) {
                res += 1
            }
        }
    }
    return res
}

export const decode_quoted_printable = (input: string) => {
    return input
        // https://tools.ietf.org/html/rfc2045#section-6.7, rule 3:
        // “Therefore, when decoding a `Quoted-Printable` body, any trailing white
        // space on a line must be deleted, as it will necessarily have been added
        // by intermediate transport agents.”
        .replace(/[\t\x20]$/gm, '')
        // Remove hard line breaks preceded by `=`. Proper `Quoted-Printable`-
        // encoded data only contains CRLF line  endings, but for compatibility
        // reasons we support separate CR and LF too.
        .replace(/=(?:\r\n?|\n|$)/g, '')
        // Decode escape sequences of the form `=XX` where `XX` is any
        // combination of two hexidecimal digits. For optimal compatibility,
        // lowercase hexadecimal digits are supported as well. See
        // https://tools.ietf.org/html/rfc2045#section-6.7, note 1.
        .replace(/=([a-fA-F0-9]{2})/g, (_, _1) => {
            let codePoint = parseInt(_1, 16)
            return String.fromCharCode(codePoint)
        })
}