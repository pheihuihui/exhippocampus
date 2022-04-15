import { T_Graph } from "../meta/graph"
import { serializeGraph, deserializeGraph } from "../utilities/data_transfer"

let gr: T_Graph = {
    id: 'afasdadsa',
    nodes: new Set(['ddff', 'ewtwre', 'aaa', 'aaa', 'bbb']),
    relations: [
        { type: 'directed', from: 'ewtwre', to: 'ewtwre', name: '' },
        { type: 'undirected', A: 'ewtwre', B: 'ewtwre', name: 'abab' },
        { type: 'one2many', one: 'ewtwre', many: new Set(['aaa', 'ewtwre']), name: '' },
        { type: 'many', many: new Set(['aaa', 'bbb']), name: '' }
    ],
    name: 'name1'
}

let str = serializeGraph(gr)
console.log(str)
let obj = deserializeGraph(str)
let str2 = serializeGraph(obj)
console.log(str2)