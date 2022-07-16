import React, { FC, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { EditorView, lineNumbers } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { markdown } from '@codemirror/lang-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { oneDark } from './utilities/editor_theme'

interface I_MarkdownEditorProps {
    value?: string
}

export const MarkdownEditor: FC<I_MarkdownEditorProps> = props => {

    const [code, setCode] = useState(props.value ?? '')
    const inputRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const state = EditorState.create({
            doc: code,
            extensions: [
                lineNumbers(),
                syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                markdown(),
                oneDark
            ]
        });
        const view = new EditorView({ state, parent: inputRef.current ?? undefined });

        return () => {
            view.destroy();
        };
    }, []);

    return (
        <div className="editor">

            <div className='input' ref={inputRef} />

            <div className="result">
                <ReactMarkdown
                    className="markdown-body"
                    remarkPlugins={[remarkGfm, remarkSlug, remarkToc]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                >
                    {code}
                </ReactMarkdown>
            </div>

        </div >
    );
}

