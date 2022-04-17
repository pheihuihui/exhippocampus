import React, { FC } from "react";
import { PageWindow } from "./PageWindow";

export const App: FC = () => {
    return (
        <div>
            <PageWindow />
        </div>
    )
}

export const _app = <PageWindow />