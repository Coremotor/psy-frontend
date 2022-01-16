import { client_request } from 'api'
import { AppDispatch } from 'app/store/store'
import { setIsLoading } from 'app/store/modules/loading/reducer'
import { TOrderForm } from 'app/store/modules/order/types'

export const createOrder = (data: TOrderForm) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setIsLoading(true))
    try {
      await client_request.post('/order', data)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }
}
