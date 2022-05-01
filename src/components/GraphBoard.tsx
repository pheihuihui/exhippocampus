import React, { useState } from "react";
import { FC, useEffect } from "react";
import { DataSet, Node, Edge, Network } from 'vis-network/standalone/umd/vis-network.min'
import { T_Graph, T_Relation } from "../meta/graph";
import { deserializeGraph } from "../utilities/data_transfer";

const containerID = 'containerID'

export const GraphBoard: FC<T_Graph> = props => {

    const nodes = props.nodes

    const [graphId, setGraphId] = useState('626e8cc9594a510ed7208c0c')

    useEffect(() => {

        fetch(`/query/graph/byid/${graphId}`)
            .then(x => x.json())
            .then(deserializeGraph)
            .then(x => {
                let nodes = new DataSet<Node>(Array.from(x.nodes).map(n => {
                    return {
                        id: n,
                        label: ''
                    }
                }))
                let edges = new DataSet<Edge>()
                x.relations.forEach(r => {
                    switch (r.type) {
                        case 'directed': {
                            let rr = r as T_Relation<'directed'>
                            edges.add({
                                from: rr.from,
                                to: rr.to,
                                label: rr.name,
                                arrows: 'to'
                            })
                            break
                        }
                        case 'undirected': {
                            let rr = r as T_Relation<'undirected'>
                            edges.add({
                                from: rr.A,
                                to: rr.B,
                                label: rr.name,
                                arrows: 'none'
                            })
                            break
                        }
                        case 'one2many': {
                            let rr = r as T_Relation<'one2many'>
                            rr.many.forEach(m => {
                                edges.add({
                                    from: rr.one,
                                    to: m,
                                    label: rr.name,
                                    arrows: 'to'
                                })
                            })
                            break
                        }
                        case 'many':
                        case 'namy2one':
                        default:
                            break
                    }
                })
                let container = document.getElementById(containerID) as HTMLDivElement
                container.oncontextmenu = ev => {
                    console.log(ev)
                    return false
                }

                let data = {
                    nodes: nodes,
                    edges: edges,
                };
                let options = {};
                let network = new Network(container, data, options);
            })

    }, [graphId])

    return <div id={containerID} style={{ background: 'white' }}></div>
}