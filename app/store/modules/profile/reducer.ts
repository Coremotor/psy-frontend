import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TProfileState, TUser } from 'app/store/modules/profile/types'

const initialState: TProfileState = {
  user: null,
}

const userSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state: TProfileState, action: PayloadAction<TUser | null>) {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
