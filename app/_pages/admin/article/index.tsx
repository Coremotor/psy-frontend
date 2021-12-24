import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import styled from 'styled-components'
import DOMPurify from 'dompurify'
import Select, { MultiValue, StylesConfig } from 'react-select'
import { addArticle, getCategories } from 'app/store/modules/articles/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesFromState } from 'app/store/modules/articles/selectors'
import { TArticle } from 'app/store/modules/articles/types'

type TOption = {
  value: string
  label: string
}

const selectStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    marginBottom: 20,
  }),
}

export const Article = () => {
  const dispatch = useDispatch()
  const categories = useSelector(getCategoriesFromState)
  const options =
    categories.length > 0
      ? categories.map((c) => {
          return { value: c, label: c }
        })
      : []

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorChange = (e: EditorState) => {
    setEditorState(e)
    setArticleState({
      ...articleState,
      textHTML: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    })
  }

  const [html, setHtml] = useState('')
  const preview = () =>
    setHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))

  const [articleState, setArticleState] = useState<TArticle>({
    title: '',
    description: '',
    previewImage: '',
    categories: [],
    textHTML: '',
  })
  const onInput = (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setArticleState({
      ...articleState,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
  console.log(articleState)

  const save = () => {
    dispatch(addArticle(articleState))
  }

  const onSelect = (options: MultiValue<unknown>) => {
    const array = options as TOption[]
    const newArray = array.map((o) => {
      return o.value
    })
    setArticleState({ ...articleState, categories: newArray })
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  return (
    <>
      <Wrapper>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          type="text"
          name="title"
          value={articleState.title}
          onInput={onInput}
        />

        <label htmlFor="description">Description</label>
        <TextArea
          id="description"
          name="description"
          value={articleState.description}
          onInput={onInput}
        />

        <label htmlFor="category">category</label>
        <Select
          options={options}
          styles={selectStyles}
          isMulti
          onChange={onSelect}
        />

        <label htmlFor="previewImage">Preview image URL</label>
        <Input
          id="previewImage"
          name="previewImage"
          value={articleState.previewImage}
          onInput={onInput}
        />
        {articleState.previewImage && (
          <img src={articleState.previewImage} alt="preview" />
        )}
      </Wrapper>

      <label>Article text</label>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        onEditorStateChange={onEditorChange}
      />

      <Button onClick={preview}>Preview text</Button>

      {html && (
        <Example
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
      )}

      <Button onClick={save}>Save article</Button>
    </>
  )
}

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  resize: none;
  padding: 10px;
  margin-bottom: 10px;
`

const Button = styled.button`
  padding: 10px;
  margin: 20px auto;
`

const Example = styled.div`
  width: 800px;
  padding: 10px;
  margin: 10px auto;
`

// const ArticleSchema = new Schema({
//   title: { type: String, unique: true, require: true },
//   description: { type: String, unique: true, require: true },
//   textHTML: { type: String, unique: true, require: true },
//   categories: [{ type: String, ref: "Category" }],
//   likes: { type: Number },
//   views: { type: Number },
//   previewImage: { type: String },
// });
