import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TState = { screen: string; showNav: boolean }

const initialState: TState = {
  screen: '',
  showNav: true,
}

const userSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setScreen(state: TState, action: PayloadAction<string>) {
      state.screen = action.payload
    },
    setShowNav(state: TState, action: PayloadAction<boolean>) {
      state.showNav = action.payload
    },
  },
})

export const { setScreen, setShowNav } = userSlice.actions

export default userSlice.reducer
