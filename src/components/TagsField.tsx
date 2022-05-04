import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { FC, useEffect, useState } from 'react';

export const TagsField: FC = () => {

    const [tagsUpdated, setTagsUpdated] = useState(true)
    const [tags, setTags] = useState<string[]>([])

    useEffect(() => {
        if (tagsUpdated) {
            fetch('/query/tags')
                .then(x => x.json())
                .then(JSON.parse)
                .then(setTags)
                .then(() => setTagsUpdated(false))
        }
    }, [tagsUpdated])

    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={tags}
            getOptionLabel={x => x}
            defaultValue={[]}
            renderInput={(params) => (
                <TextField {...params} label="add tags" placeholder="Favorites" />
            )}
            sx={{ width: '500px', height: 'auto' }}
        />
    );
}
