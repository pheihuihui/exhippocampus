import { Blob as _Blob } from 'buffer'

export const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export function _readAsDataURL(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
        const fr = new FileReader()
        fr.onerror = reject
        fr.onload = () => {
            let res = fr.result
            if (typeof res == 'string') {
                resolve(res)
            } else {
                reject()
            }
        }
        fr.readAsDataURL(blob)
    })
}

export const b64toBlob = (base64: string, type = 'application/octet-stream') =>
    fetch(`data:${type};base64,${base64}`).then(res => res.blob())

export const dataURItoBlob_node = (dataURI: string) => {
    let data = dataURI.split(',')[1]
    let byteString = Buffer.from(data, "base64")
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
    let blob = new _Blob([byteString], { type: mimeString })
    return blob
}