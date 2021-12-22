import { TState } from 'app/store/store'

export const getUser = (state: TState) => state.profile.user
