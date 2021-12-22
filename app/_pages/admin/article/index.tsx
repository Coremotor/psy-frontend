import React, { useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import styled from 'styled-components'
import DOMPurify from 'dompurify'

export const Article = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [html, setHtml] = useState('')
  const save = () =>
    setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  return (
    <>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        onEditorStateChange={setEditorState}
      />

      <button onClick={save}>save</button>

      <Example dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
    </>
  )
}

const Example = styled.div``
