import axios from 'axios'
import { toast } from 'react-toastify'
import { API_URL } from '../constants/apiUrl'
import { getToken } from '../services/storageService'

// Tạo một instance mới của axios
const axiosInstance = axios.create({
  baseURL: API_URL
})

axiosInstance.defaults.timeout = 1000 * 60 * 10

axiosInstance.defaults.withCredentials = true

// Thêm Interceptor để xử lý trước khi gửi mỗi yêu cầu
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy accessToken từ localStorage
    const accessToken = getToken()

    // Nếu có accessToken, thêm vào header Authorization của yêu cầu
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let refreshTokenPromise = null

// Thêm Interceptor để xử lý lỗi phản hồi từ server
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // const originalRequest = error.config
    // if (error.response?.status === 410 && originalRequest) {
    //   if (!refreshTokenPromise) {
    //     const auth = getAuth()
    //     const user = auth.currentUser
    //     if (user) {
    //       refreshTokenPromise = user
    //         .getIdToken(true)
    //         .then((newToken) => {
    //           localStorage.setItem('access_token', newToken)
    //           axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`
    //         })
    //         .catch((err) => {
    //           return Promise.reject(err)
    //         })
    //         .finally(() => {
    //           refreshTokenPromise = null
    //         })
    //     } else {
    //       return Promise.reject(new Error('User not logged in'))
    //     }
    //   }

    //   return refreshTokenPromise.then(() => {
    //     return axiosInstance(originalRequest)
    //   })
    // }

    if (error.response?.status !== 410) {
      toast.error(error.response?.data?.message || error?.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
