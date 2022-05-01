import { T_Graph } from "../meta/graph"
import { disconnectMongo, insertNewGraph } from "../utilities/mongo_client"

let gr: T_Graph = {
    id: 'id46',
    nodes: new Set([
        '625bcffee0ce1f211d2a458a',
        '626d5b8ec7997f7be816340b',
        '626d5c36c7997f7be816340c',
        '626d5e09c7997f7be816340d',
        '626d6056c7997f7be816340e',
        '626d60b1c7997f7be816340f',
        '626d60e1c7997f7be8163410',
        '626d6122c7997f7be8163411',
        '626d61bac7997f7be8163412'
    ]),
    relations: [
        {
            type: 'one2many',
            one: '625bcffee0ce1f211d2a458a',
            many: new Set(['626d60e1c7997f7be8163410', '626d6122c7997f7be8163411']),
            name: 'related persons'
        },
        {
            type: 'directed',
            from: '625bcffee0ce1f211d2a458a',
            to: '626d5b8ec7997f7be816340b',
            name: 'wiki'
        },
        {
            type: 'directed',
            from: '626d6122c7997f7be8163411',
            to: '626d60e1c7997f7be8163410',
            name: 'inspires'
        },
        {
            type: 'directed',
            from: '625bcffee0ce1f211d2a458a',
            to: '626d5e09c7997f7be816340d',
            name: 'original text'
        },
        {
            type: 'directed',
            from: '626d5e09c7997f7be816340d',
            to: '626d5c36c7997f7be816340c',
            name: 'Chinese version'
        },
        {
            type: 'one2many',
            one: '626d60e1c7997f7be8163410',
            many: new Set(['626d6056c7997f7be816340e', '626d60b1c7997f7be816340f']),
            name: 'author of'
        },
        {
            type: 'one2many',
            one: '626d6122c7997f7be8163411',
            many: new Set(['626d61bac7997f7be8163412']),
            name: 'author of'
        },
        {
            type: 'undirected',
            A: '626d6122c7997f7be8163411',
            B: '626d60e1c7997f7be8163410',
            name: 'friends'
        }
    ],
    name: 'the secret of Psalm 46'
}


insertNewGraph(gr)
    .then(console.log)
    .then(disconnectMongo)
    .then(() => { console.log('closed') })