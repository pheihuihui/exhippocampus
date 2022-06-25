import React, { FC, Fragment, useState } from "react";
import { TagsField } from './TagsField'
import { PersonsField } from './PersonsField'
import { LanguageSelect } from './LanguageSelect'
import { Button, TextField } from "@mui/material";
import { T_Popup_Form } from "../meta/item";

export const App: FC = () => {

    const [textInput, setTextInput] = useState('')
    const [langs, setLangs] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [persons, setPersons] = useState<string[]>([])

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
            <TagsField onChange={arr => { setTags(arr) }} />
            <PersonsField onChange={arr => { setPersons(arr) }} />
            <LanguageSelect onChange={arr => { setLangs(arr) }} />
            <Button variant="contained" style={{}} onClick={() => {
                let obj: T_Popup_Form = {
                    requestType: 'capture page',
                    data: {
                        title: textInput,
                        languages: langs,
                        tags: tags,
                        relatedPersons: persons
                    }
                }
                if (chrome && chrome.runtime) {
                    chrome.runtime.sendMessage(obj)
                }
            }}>
                Confirm
            </Button>
        </Fragment>
    )
}

export const _app = <App />