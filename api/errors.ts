import { toast } from 'react-toastify'

export const errorNotify = (message?: string) => {
  if (message) {
      toast.error(message)
    }
   else {
    toast.error('Ooops...')
  }
}
