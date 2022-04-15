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

export type T_Graph = {
    id: T_Graph_ID
    nodes: Set<T_Node_ID>
    relations: Array<I_Relation[keyof I_Relation] & { type: keyof I_Relation, name: string }>
    name: string
}

