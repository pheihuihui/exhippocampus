import React, { FC } from "react";
import { TagsField } from './TagsField'
import { GraphBoard } from './GraphBoard'
import { ItemDialog } from './ItemDialog'

export const App: FC = () => {
    return (
        <div>
            <GraphBoard graphId="626e8cc9594a510ed7208c0c" />
        </div>
    )
}

// export const _app = <GraphBoard graphId="626e8cc9594a510ed7208c0c" />
export const _app = <TagsField />