import ReactDOM from "react-dom";
import { test } from "../components/TagsField";

fetch('/query/tags', { method: 'GET' })
    .then(x => x.json())
    .then(x => { localStorage.setItem('exhippo_tags', x) })

ReactDOM.render(test, document.body)
