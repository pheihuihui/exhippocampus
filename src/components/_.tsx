import React, { FC, Fragment, useState } from "react";
import { TagsField } from './TagsField'
import { Button, TextField } from "@mui/material";

export const App: FC = () => {

    const [textInput, setTextInput] = useState('')

    return (
        <Fragment>
            <TextField
                label="Title"
                style={{ width: 500 }}
                value={textInput}
                onChange={(event) => {
                    setTextInput(event.target.value)
                }}
            />
            <TagsField />
            <Button
                variant="contained"
                style={{}}
                onClick={() => { alert(textInput) }}
            >Confirm</Button>
        </Fragment>
    )
}

export const _app = <App />