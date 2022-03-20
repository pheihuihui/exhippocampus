import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { FC } from 'react';

export const TagsField: FC = () => {
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[1]]}
            renderInput={(params) => (
                <TextField {...params} label="limitTags" placeholder="Favorites" />
            )}
            sx={{ width: '500px', height: 'auto' }}
        />
    );
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Godfather: Part III', year: 1974 },
    { title: 'The Godfather: Part VI', year: 1974 },
];

export const _tags = <TagsField />