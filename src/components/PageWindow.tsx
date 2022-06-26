import React, { FC, useEffect } from "react"
import { T_Item } from "../meta/item"
import { useFetch, useWindowSize } from '../hooks/_hooks'
import { server } from '../appconfig.json'

const iframeID = 'iframeID'

interface I_PageWindowProps {
    itemId: string
}

export const PageWindow: FC<I_PageWindowProps> = props => {

    const size = useWindowSize()

    const { data, error } = useFetch<T_Item<'general'>>(`${server.url}/query/page/byid/${props.itemId}`)

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
                height={size.height}
                id={iframeID}
            />
        </div>
    )
}
