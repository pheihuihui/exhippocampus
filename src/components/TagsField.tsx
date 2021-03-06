import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { FC, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Add from '@mui/icons-material/Add';
import { server } from '../appconfig.json'

const url_query_tags = `${server.url}/query/tags`
const url_insert_tag = `${server.url}/insert/tag`

interface I_TagsFieldProps {
    onChange?: (arr: string[]) => void
}

export const TagsField: FC<I_TagsFieldProps> = props => {

    const [isTagsUpdated, setIsTagsUpdated] = useState(true)
    const [tags, setTags] = useState<string[]>([])
    const [tagsVal, setTagsVal] = useState<string[]>(tags)
    const [newTag, setNewTag] = useState<string>('')

    useEffect(() => {
        if (isTagsUpdated) {
            fetch(url_query_tags)
                .then(x => x.json())
                .then(JSON.parse)
                .then(setTags)
                .finally(() => setIsTagsUpdated(false))
        }
    }, [isTagsUpdated])

    const _onClick = () => {
        if (isTagsUpdated) {
            return
        }
        let trimed = newTag.trim()
        if (trimed != '' && tags.findIndex(x => x == trimed) == -1) {
            let bd = JSON.stringify({ tag: trimed })
            fetch(url_insert_tag, { method: 'POST', body: bd })
                .then(x => x.json())
                .then(() => {
                    setIsTagsUpdated(true)
                    setNewTag('')
                })
        }
    }

    const addButton =
        <IconButton type="submit" sx={{ p: '10px' }} onClick={_onClick}>
            <Add />
        </IconButton>

    return (
        <div className='exhi-autocomplete'>
            <Autocomplete
                multiple
                value={tagsVal}
                onChange={(_, newVal) => {
                    setTagsVal(newVal)
                    if (props.onChange) {
                        props.onChange(newVal)
                    }
                }}
                id="multiple-limit-tags"
                options={tags}
                getOptionLabel={x => x}
                defaultValue={[]}
                renderInput={(params) => (
                    <TextField {...params} label="Add Tags" />
                )}
                sx={{ width: '500px', height: 'auto' }}
            />
            <TextField
                id="newtagfield"
                label="New Tag"
                value={newTag}
                variant="outlined"
                sx={{ width: '500px', height: 'auto' }}
                onChange={ev => { setNewTag(ev.target.value) }}
                InputProps={{ endAdornment: addButton }}
            />
        </div>
    );
}

