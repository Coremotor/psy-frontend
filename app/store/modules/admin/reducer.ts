import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAdminState } from 'app/store/modules/admin/types'
import { TUser } from 'app/store/modules/profile/types'

const initialState: TAdminState = {
  users: [],
}

const userSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers(state: TAdminState, action: PayloadAction<TUser[]>) {
      state.users = action.payload
    },
  },
})

export const { setUsers } = userSlice.actions

export default userSlice.reducer
