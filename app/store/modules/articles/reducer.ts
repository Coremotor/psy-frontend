import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TArticlesState } from 'app/store/modules/articles/types'

const initialState: TArticlesState = {
  categories: [],
}

const userSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCategories(state: TArticlesState, action: PayloadAction<string[]>) {
      state.categories = action.payload
    },
  },
})

export const { setCategories } = userSlice.actions

export default userSlice.reducer
