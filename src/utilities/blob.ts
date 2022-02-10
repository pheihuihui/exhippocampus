export function _readAsDataURL(blob: Blob) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onerror = reject
        fr.onload = () => {
            resolve(fr.result)
        }
        fr.readAsDataURL(blob)
    })
}