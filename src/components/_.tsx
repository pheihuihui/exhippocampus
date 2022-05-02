import React, { FC } from "react";
import { PageWindow } from "./PageWindow";
import { GraphBoard } from './GraphBoard'

export const App: FC = () => {
    return (
        <div>
            <GraphBoard graphId="626e8cc9594a510ed7208c0c" />
        </div>
    )
}

export const _app = <App />