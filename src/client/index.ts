import ReactDOM from "react-dom";
import { _tags } from "../components/CustomizedHook";

// fetch('/query/tags', { method: 'GET' })
//     .then(x => x.json())
//     .then(x => { localStorage.setItem('exhippo_tags', x) })

ReactDOM.render(_tags, document.body)
