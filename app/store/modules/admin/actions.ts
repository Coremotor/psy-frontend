import { client_request } from 'api'
import { AppDispatch } from 'app/store/store'
import { setIsLoading } from 'app/store/modules/loading/reducer'
import { setUsers } from 'app/store/modules/admin/reducer'

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      const response = await client_request.get('/users')
      dispatch(setUsers(response.data))
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
