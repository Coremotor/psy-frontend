import { client_request } from 'api'
import { AppDispatch } from 'app/store/store'
import { setIsLoading } from 'app/store/modules/loading/reducer'
import { setCategories } from 'app/store/modules/articles/reducer'
import { TArticle } from 'app/store/modules/articles/types'

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

export const addArticle = (data: TArticle) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      await client_request.post('/add-article', data)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
