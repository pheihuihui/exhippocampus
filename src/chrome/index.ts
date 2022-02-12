declare global {
    interface HTMLDialogElement {
        close: () => void       //experimental 
        showModal: () => void   //experimental 
    }
}

export { }