declare global {
    interface Window {
        hello: number
    }
}

window.hello = 1

export { }