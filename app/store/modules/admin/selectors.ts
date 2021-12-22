import { TState } from 'app/store/store'

export const getUsersFromState = (state: TState) => state.admin.users
