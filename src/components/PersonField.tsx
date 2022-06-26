import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React, { FC, useEffect, useState } from 'react';
import { server } from '../appconfig.json'

const url_query_person_names = `${server.url}/query/persons/names`

interface I_PersonFieldProps {
    onChange?: (arr: string[]) => void
}

export const PersonField: FC<I_PersonFieldProps> = props => {

    const [persons, setPersons] = useState<string[]>([])
    const [persons_, setPersons_] = useState<string[]>(persons)

    useEffect(() => {
        fetch(url_query_person_names)
            .then(x => x.json())
            .then(JSON.parse)
            .then(setPersons)
    }, [])

    return (
        <div className='exhi-autocomplete'>
            <Autocomplete
                multiple
                value={persons_}
                onChange={(event, newVal) => {
                    setPersons_(newVal)
                    if (props.onChange) {
                        props.onChange(newVal)
                    }
                }}
                id="multiple-limit-tags"
                options={persons}
                getOptionLabel={x => x}
                defaultValue={[]}
                renderInput={(params) => (
                    <TextField {...params} label="Add Persons" />
                )}
                sx={{ width: '500px', height: 'auto' }}
            />
        </div>
    );
}
