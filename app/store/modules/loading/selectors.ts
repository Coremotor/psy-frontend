import { TState } from 'app/store/store'

export const getIsLoading = (state: TState) => state.loading.isLoading
