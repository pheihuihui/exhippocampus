import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import React, { useState } from "react"
import { FC } from "react"

interface I_LanguageSelectProps {
    onChange: (arr: Array<string>) => void
}

export const LanguageSelect: FC<I_LanguageSelectProps> = props => {

    const [langs, setLangs] = useState(new Set<string>())

    return (
        <FormGroup row={true}>
            {['en', 'zh_cn', 'zh_hk', 'zh_tw', 'jp', 'other'].map(_ => {
                return (
                    <FormControlLabel
                        key={`lang_checkbox_${_}`}
                        control={<Checkbox name={_} />}
                        label={_}
                        onChange={(ev, checked) => {
                            if (checked) {
                                setLangs(langs.add(_))
                            } else {
                                if (langs.delete(_)) {
                                    setLangs(langs)
                                }
                            }
                            props.onChange(Array.from(langs).sort())
                        }}
                    />)
            })}
        </FormGroup>
    )
}