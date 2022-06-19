import React, { FC, useEffect } from "react"
import { T_Item } from "../meta/item"
import { useFetch, useWindowSize } from './_hooks'

const iframeID = 'iframeID'

export const PageWindow: FC = () => {

    const size = useWindowSize()

    const { data, error } = useFetch<T_Item<'general'>>('/query/pages/title')

    useEffect(() => {
        const setIframeContent = (body: HTMLElement) => {
            const ifr = document.getElementById(iframeID) as HTMLIFrameElement
            if (ifr) {
                const doc = ifr.contentWindow?.document
                if (doc && data?.details.content) {
                    doc.open()
                    doc.write(data.details.content)
                    doc.close()
                }
            }
        }
        setIframeContent(document.body)
    }, [data?.details.content])

    return (
        <div style={{
            background: 'cornflowerblue',
            height: size.height,
            width: size.width,
            borderRadius: 25
        }}>
            <iframe
                width={size.width}
                height={size.height * 0.9}
                id={iframeID}
            />
        </div>
    )
}

export const _window = <PageWindow />