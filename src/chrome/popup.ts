import { createRoot } from 'react-dom/client'
import { _popup } from '../components/_popup'

let div = document.getElementById('rootdiv') as HTMLDivElement
const root = createRoot(div)
root.render(_popup)
