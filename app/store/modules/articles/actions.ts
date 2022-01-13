import { client_request } from 'api'
import { AppDispatch } from 'app/store/store'
import { setIsLoading } from 'app/store/modules/loading/reducer'
import {
  setArticle,
  setArticles,
  setCategories,
} from 'app/store/modules/articles/reducer'
import { IArticle } from 'app/store/modules/articles/types'

export const getCategories = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.get('/categories')
      dispatch(setCategories(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const addArticle = (
  data: Omit<IArticle, 'createdAt'>,
  resetForm: () => void
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      await client_request.post('/add-article', data)
      resetForm()
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const getArticles = (category?: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.get('/articles', {
        params: {
          category,
        },
      })
      dispatch(setArticles(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const getArticle = (id: string | string[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.get(`/articles/${id}`)
      dispatch(setArticle(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}

export const updateArticle = (
  id: string,
  data: Omit<IArticle, 'createdAt'>
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.put(`/articles/${id}`, data)
      dispatch(setArticle(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
