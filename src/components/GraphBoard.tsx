import React from "react";
import { FC, useEffect } from "react";
import { DataSet, Node, Edge, Network } from 'vis-network/standalone/umd/vis-network.min'

const containerID = 'containerID'

export const GraphBoard: FC = () => {
    useEffect(() => {
        let nodes = new DataSet<Node>([
            { id: 1, label: "Node 1" },
            { id: 2, label: "Node 2" },
            { id: 3, label: "Node 3" },
            { id: 4, label: "Node 4" },
            { id: 5, label: "Node 5" },
        ]);

        let edges = new DataSet<Edge>([
            { from: 1, to: 3 },
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 3 },
        ]);

        let container = document.getElementById("containerID") as HTMLDivElement
        let data = {
            nodes: nodes,
            edges: edges,
        };
        let options = {};
        let network = new Network(container, data, options);
    }, [])

    return <div id={containerID} style={{ background: 'white' }}></div>
}