import axios from 'axios'
import { config } from './config'
import { errorNotify } from 'api/errors'
import { LocalStorageTokenKey } from 'api/constants'

// for SSR
// export const requestOnServer = axios.create({
//   baseURL: config.baseUrl,
//   responseType: 'json',
// })

export const client_request = axios.create({
  baseURL: config.baseUrl,
  responseType: 'json',
})

client_request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LocalStorageTokenKey)
    if (token) {
      // @ts-ignore
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

client_request.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    errorNotify(error.response.data.message)
    // if (
    //   error.response.data.error === 'Unauthorized' ||
    //   error.response.data.error === 'Access denied'
    // ) {
    //   localStorage.removeItem(LocalStorageTokenKey)
    // }
    return Promise.reject(error)
  }
)
