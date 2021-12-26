import { TState } from 'app/store/store'

export const getCategoriesFromState = (state: TState) =>
  state.articles.categories

export const getArticlesFromState = (state: TState) => state.articles.articles
export const getArticleFromState = (state: TState) => state.articles.article
