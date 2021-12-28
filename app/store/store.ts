import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from 'app/store/root-reducer'

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type TState = ReturnType<typeof rootReducer>
export type TError = {
  response: {
    status: number
    data: {
      message: string
    }
  }
}
