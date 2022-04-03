import { T_Item, T_Source } from "../meta/item"

export const _distance = <T extends T_Source, U extends T_Source>(item1: T_Item<T>, item2: T_Item<U>) => {
    let res = 1
    let _persons = 1
    if (item1.relatedPersons && item2.relatedPersons) {
        _persons = _countDups(item1.relatedPersons, item2.relatedPersons)
    }
    let _tags = 1
    if (item1.tags && item2.tags) {
        _tags = _countDups(item1.tags, item2.tags)
    }

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
