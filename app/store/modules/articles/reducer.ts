import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IArticleInList,
  IEditArticle,
  TArticlesState,
} from 'app/store/modules/articles/types'

const initialState: TArticlesState = {
  categories: [],
  articles: [],
  article: null,
}

const userSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCategories(state: TArticlesState, action: PayloadAction<string[]>) {
      state.categories = action.payload
    },
    setArticles(
      state: TArticlesState,
      action: PayloadAction<IArticleInList[]>
    ) {
      state.articles = action.payload
    },
    setArticle(
      state: TArticlesState,
      action: PayloadAction<IEditArticle | null>
    ) {
      state.article = action.payload
    },
  },
})

export const { setCategories, setArticles, setArticle } = userSlice.actions

export default userSlice.reducer
