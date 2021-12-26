import React, { useEffect, useState } from 'react'
import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import styled from 'styled-components'
import DOMPurify from 'isomorphic-dompurify'
import Select, { MultiValue, StylesConfig } from 'react-select'
import {
  addArticle,
  getArticle,
  getCategories,
  updateArticle,
} from 'app/store/modules/articles/actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  getArticleFromState,
  getCategoriesFromState,
} from 'app/store/modules/articles/selectors'
import { IArticle } from 'app/store/modules/articles/types'
import { getIsLoading } from 'app/store/modules/loading/selectors'
import { Loader } from 'app/components/loader'
import { Layout } from 'app/components/layout'
import { useRouter } from 'next/router'
import { setArticle } from 'app/store/modules/articles/reducer'

type TOption = {
  value: string
  label: string
}

const selectStyles: StylesConfig = {
  control: (base) => ({
    ...base,
    border: '1px solid black',
    marginBottom: 20,
  }),
}

const Article = () => {
  const router = useRouter()
  const { id } = router.query
  const article = useSelector(getArticleFromState)
  const dispatch = useDispatch()
  const categories = useSelector(getCategoriesFromState)
  const isLoading = useSelector(getIsLoading)
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

  const [articleState, setArticleState] = useState<IArticle>({
    title: '',
    description: '',
    previewImage: '',
    categories: [],
    textHTML: '',
    isDraft: false,
    isArchive: false,
  })
  const onInput = (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setArticleState({
      ...articleState,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
  const onCheckbox = (e: React.FormEvent<HTMLInputElement>) => {
    setArticleState({
      ...articleState,
      [e.currentTarget.name]: e.currentTarget.checked,
    })
  }

  const [option, setOption] = useState<TOption[] | null>(null)

  const onSelect = (options: MultiValue<unknown>) => {
    const array = options as TOption[]
    setOption(array)
    const newArray = array.map((o) => {
      return o.value
    })
    setArticleState({ ...articleState, categories: newArray })
  }

  const resetForm = () => {
    setArticleState({
      title: '',
      description: '',
      previewImage: '',
      categories: [],
      textHTML: '',
      isDraft: false,
      isArchive: false,
    })
    setEditorState(EditorState.createEmpty())
    setOption(null)
    setHtml('')
  }

  const save = () => {
    dispatch(addArticle(articleState, resetForm))
  }
  const update = () => {
    if (article) {
      dispatch(updateArticle(article._id, articleState))
    }
  }

  useEffect(() => {
    dispatch(getCategories())
    return function () {
      dispatch(setArticle(null))
    }
  }, [])

  useEffect(() => {
    if (id) {
      dispatch(getArticle(id))
    }
  }, [id])

  useEffect(() => {
    if (article) {
      setArticleState({
        title: article.title,
        description: article.description,
        previewImage: article.previewImage,
        categories: article.categories,
        textHTML: article.textHTML,
        isDraft: article.isDraft,
        isArchive: article.isArchive,
      })
      const blocksFromHtml = htmlToDraft(article.textHTML)
      const { contentBlocks, entityMap } = blocksFromHtml
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      )
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)

      const options = article.categories.map((c) => {
        return { value: c, label: c }
      })
      setOption(options)
    }
  }, [article])

  return (
    <Layout>
      {isLoading && <Loader isLoading={isLoading} />}
      <Wrapper>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          name="title"
          value={articleState.title}
          onInput={onInput}
        />

        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          value={articleState.description}
          onInput={onInput}
        />

        <Label htmlFor="category">Categories</Label>
        <Select
          options={options}
          styles={selectStyles}
          isMulti
          onChange={onSelect}
          value={option}
        />

        <Label htmlFor="previewImage">Preview image URL</Label>
        <Input
          id="previewImage"
          name="previewImage"
          value={articleState.previewImage}
          onInput={onInput}
        />
        {articleState.previewImage && (
          <img
            style={{ width: 200, height: 200, marginBottom: 20 }}
            src={articleState.previewImage}
            alt="preview"
          />
        )}

        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            id="isDraft"
            name="isDraft"
            onChange={onCheckbox}
            checked={articleState.isDraft}
          />
          <Label htmlFor="isDraft">Is draft?</Label>
        </CheckboxWrapper>

        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            id="isArchive"
            name="isArchive"
            onChange={onCheckbox}
            checked={articleState.isArchive}
          />
          <Label htmlFor="isArchive">Is archive?</Label>
        </CheckboxWrapper>
      </Wrapper>

      <Label>Article text</Label>
      <Editor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        onEditorStateChange={onEditorChange}
      />

      <Buttons>
        <Button onClick={preview}>Preview text</Button>
        {article ? (
          <Button onClick={update}>Update article</Button>
        ) : (
          <Button onClick={save}>Save article</Button>
        )}
      </Buttons>
      {html && (
        <Example
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        />
      )}
    </Layout>
  )
}

export default Article

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`
const Label = styled.label`
  margin-bottom: 5px;
`
const Input = styled.input`
  width: 100%;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
`
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  border: 1px solid black;
  border-radius: 4px;
  resize: none;
  padding: 10px;
  margin-bottom: 20px;
`
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const Checkbox = styled.input`
  cursor: pointer;
  height: 24px;
  width: 24px;
  margin-right: 10px;
`
const Buttons = styled.div`
  display: flex;
  margin: 20px 0 20px auto;
  & :not(:last-child) {
    margin-right: 10px;
  }
`
const Button = styled.button`
  cursor: pointer;
  padding: 10px;
`
const Example = styled.div`
  width: 800px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 10px;
  margin: 10px auto;
`

// https://psy-files.tmweb.ru/images/dogs/dog_1.jpeg
// https://psy-files.tmweb.ru/images/cats/cat_1.jpeg
// https://psy-files.tmweb.ru/images/fish/fish_1.jpeg
// https://psy-files.tmweb.ru/images/spiders/spider_1.jpeg
