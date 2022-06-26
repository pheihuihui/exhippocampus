import React from "react";
import { FC, useEffect } from "react";
import { Data, Options } from "vis-network";
import { DataSet, Node, Edge, Network } from 'vis-network/standalone/umd/vis-network.min'
import { deserializeGraph, T_Graph, T_Relation } from "../meta/graph";
import { useWindowSize } from "../hooks/_hooks";

const containerID = 'containerID'

function drawGraph(gr: T_Graph) {
    let nodes = new DataSet<Node>(Array.from(gr.nodes).map(n => {
        return {
            id: n,
            label: '',
            shape: 'box'
        }
    }))
    let edges = new DataSet<Edge>()
    gr.relations.forEach(r => {
        switch (r.type) {
            case 'directed': {
                let rr = r as T_Relation<'directed'>
                edges.add({
                    from: rr.from,
                    to: rr.to,
                    label: rr.name,
                    arrows: 'to',
                    color: 'purple'
                })
                break
            }
            case 'undirected': {
                let rr = r as T_Relation<'undirected'>
                edges.add({
                    from: rr.A,
                    to: rr.B,
                    label: rr.name,
                    arrows: {
                        to: {
                            enabled: true
                        },
                        from: {
                            enabled: true
                        }
                    },
                    color: 'green'
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
                        arrows: 'to',
                        color: 'pink'
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

    let data: Data = {
        nodes: nodes,
        edges: edges,
    };
    let options: Options = {
        physics: false
    };
    let network = new Network(container, data, options);
}

function customizeContextMenu() {
    let container = document.getElementById(containerID) as HTMLDivElement
    container.oncontextmenu = ev => {
        console.log(ev)
        return false
    }
}

export const GraphBoard: FC<{ graphId: string }> = props => {

    const id = props.graphId

    const sz = useWindowSize()

    const fetchGraph = (id: string) =>
        fetch(`/query/graph/byid/${id}`)
            .then(x => x.json())
            .then(deserializeGraph)

    useEffect(() => {
        fetchGraph(id)
            .then(drawGraph)
            .then(customizeContextMenu)
    }, [])

    return <div id={containerID} className='exhi-graphcontainer' style={{ height: sz.height, width: sz.width }}></div>
}