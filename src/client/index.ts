import { createRoot } from 'react-dom/client'
import { _app } from '../components/_client'

let div = document.getElementById('rootdiv') as HTMLDivElement

const root = createRoot(div)
root.render(_app)