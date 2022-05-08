type T_Item_ID = string
type T_Graph_ID = string
type T_Node_ID = T_Item_ID | T_Graph_ID

type T_Relation_Directed = {
    from: T_Node_ID
    to: T_Node_ID
}

type T_Relation_Undirected = {
    A: T_Node_ID
    B: T_Node_ID
}

type T_Relation_One2Many = {
    one: T_Node_ID
    many: Set<T_Node_ID>
}

type T_Relation_Many2One = {
    one: T_Node_ID
    many: Set<T_Node_ID>
}

type T_Relation_Many = {
    many: Set<T_Node_ID>
}

export interface I_Relation {
    'directed': T_Relation_Directed
    'undirected': T_Relation_Undirected
    'one2many': T_Relation_One2Many
    'namy2one': T_Relation_Many2One
    'many': T_Relation_Many
}

export type T_Relation<K extends keyof I_Relation> = I_Relation[K] & { type: K, name: string }

export type T_Graph = {
    id: T_Graph_ID
    nodes: Set<T_Node_ID>
    relations: Array<T_Relation<keyof I_Relation>>
    name: string
}

export const serializeGraph = (gr: T_Graph) => {
    return JSON.stringify({
        id: gr.id,
        nodes: Array.from(gr.nodes),
        relations: gr.relations.map(x => {
            if (x.hasOwnProperty('many')) {
                let y = x as unknown as I_Relation['many'] | I_Relation['namy2one'] | I_Relation['one2many']
                Object.assign(y, { many: Array.from(y.many) })
                return y
            } else {
                return x
            }
        }),
        name: gr.name
    })
}

export const deserializeGraph = (str: string) => {
    let res = JSON.parse(str) as T_Graph
    res.nodes = new Set(res.nodes)
    res.relations.map(x => {
        if (x.hasOwnProperty('many')) {
            let y = x as unknown as I_Relation['many'] | I_Relation['namy2one'] | I_Relation['one2many']
            Object.assign(y, { many: new Set(y.many) })
            return y
        }
    })
    return res
}
