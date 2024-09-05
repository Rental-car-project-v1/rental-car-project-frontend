import { generateMetaSearchParams } from '../utils'
import axiosInstance from '../utils/authorizedAxios'

export const getBookingDetailsApi = async (bookingId) => {
  const res = await axiosInstance.get(`booking/${bookingId}`)
  return res.data
}

export const updateBookingApi = async (bookingId, updateData) => {
  const res = await axiosInstance.put(`booking/update/${bookingId}`, updateData)
  return res.data
}

export const getMyBookingApi = async ({
  page = 1,
  size = 5,
  sort = 'id:desc'
}) => {
  const searchParams = generateMetaSearchParams(page, size, sort)
  const res = await axiosInstance.get(`booking/my-booking?${searchParams}`)
  return res.data
}

export const addBookingApi = async (data) => {
  const res = await axiosInstance.post('booking/add', data)
  return res.data
}

export const confirmPickUpApi = async (id) => {
  const res = await axiosInstance.patch(`booking/confirm-pickup/${id}`)
  return res.data
}

export const confirmPaymentApi = async (id) => {
  const res = await axiosInstance.patch(`booking/confirm-payment/${id}`)
  return res.data
}

export const confirmDepositApi = async (id) => {
  const res = await axiosInstance.patch(`booking/confirm-deposit/${id}`)
  return res.data
}

export const cancelBookingApi = async (id) => {
  const res = await axiosInstance.patch(`booking/cancel/${id}`)
  return res.data
}

export const returnCarApi = async (id) => {
  const res = await axiosInstance.patch(`booking/return-car/${id}`)
  return res.data
}

export const getListByCarId = async (id) => {
  const res = await axiosInstance.get(`booking/my-booking/${id}`)
  return res.data
}

export const getCarBookingApi = async (
  carId,
  page = 1,
  size = 5,
  sort = 'id:desc'
) => {
  const searchParams = generateMetaSearchParams(page, size, sort)
  const res = await axiosInstance.get(
    `booking/my-booking/${carId}?${searchParams}`
  )
  return res.data
}
