import React, { FC } from "react";
import { AutocompleteGetTagProps } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

export const Tag: FC<TagProps> = props => {
    const { label, onDelete, ...other } = props
    return (
        <div {...other} className="input_tag">
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    )
} 