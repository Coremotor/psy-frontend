import { TState } from 'app/store/store'

export const getCategoriesFromState = (state: TState) =>
  state.articles.categories
