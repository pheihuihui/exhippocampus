import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import React from "react"
import { FC } from "react"

export const LanguageSelect: FC = () => {
    return (
        <FormGroup row={true}>
            <FormControlLabel control={<Checkbox name="en" />} label="en" />
            <FormControlLabel control={<Checkbox name="cn" />} label="cn" />
            <FormControlLabel control={<Checkbox name="cn_hk" />} label="cn_hk" />
            <FormControlLabel control={<Checkbox name="cn_tw" />} label="cn_tw" />
            <FormControlLabel control={<Checkbox name="jp" />} label="jp" />
            <FormControlLabel control={<Checkbox name="other" />} label="other" />
        </FormGroup>
    )
}