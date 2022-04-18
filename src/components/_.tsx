import React, { FC } from "react";
import { PageWindow } from "./PageWindow";
import { GraphBoard } from './GraphBoard'

export const App: FC = () => {
    return (
        <div>
            <GraphBoard />
        </div>
    )
}

export const _app = <GraphBoard />