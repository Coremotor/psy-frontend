import { client_request } from 'api'
import { AppDispatch } from 'app/store/store'
import { setUser } from './reducer'
import { TEditProfile, TSignInForm, TSignUpForm } from './types'
import { setIsLoading } from 'app/store/modules/loading/reducer'
import { LocalStorageTokenKey } from 'api/constants'

export const getProfile = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.get('/me')
      dispatch(setUser(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const signUp = (data: TSignUpForm, showPopUp: () => void) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      await client_request.post('/sign-up', data)
      showPopUp()
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const signIn = (data: TSignInForm, goHome: () => void) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.post('/sign-in', data)
      localStorage.setItem(LocalStorageTokenKey, response.data.token)
      goHome()
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const editProfile = (data: TEditProfile) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.put('/edit-profile', data)
      dispatch(setUser(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const deactivateToken = (clearUser?: () => void) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      // await client_request.post('/users/logout')
      localStorage.removeItem(LocalStorageTokenKey)
      if (clearUser) {
        clearUser()
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
