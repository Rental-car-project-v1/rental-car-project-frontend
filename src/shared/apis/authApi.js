import axiosInstance from '../utils/authorizedAxios'

export const loginApi = async (data) => {
  const res = await axiosInstance.post('auth/login', data)
  return res.data
}

export const registerApi = async (data) => {
  const res = await axiosInstance.post('auth/register', data)
  return res.data
}

export const changePasswordApi = async (data) => {
  const res = await axiosInstance.patch('auth/change-password', data)
  return res.data
}

export const forgetPasswordApi = async (data) => {
  const res = await axiosInstance.post('auth/forget-password', data)
  return res.data
}
