import axios from 'axios'
import { generateMetaSearchParams } from '../utils'
import axiosInstance from '../utils/authorizedAxios'
import { API_URL } from '../constants/apiUrl'

export const getCarsByOwner = async ({
  page = 1,
  size = 5,
  sort = 'id:desc'
}) => {
  const searchParams = generateMetaSearchParams(page, size, sort)
  const res = await axiosInstance.get(`car/my-car?${searchParams}`)
  return res.data
}

export const getCarsById = async (carId) => {
  const res = await axiosInstance.get(`car/${carId}`)
  return res.data
}

export const updateCarApi = async (carId, data) => {
  const res = await axiosInstance.put(`car/update/${carId}`, data)
  return res.data
}

export const addCarApi = async (data) => {
  const res = await axiosInstance.post('car/add', data)
  return res.data
}

export const getCarsApi = async (
  page = 1,
  size = 5,
  sort = 'id:desc',
  searchInfor
) => {
  const metaParams = generateMetaSearchParams(page, size, sort)

  const search = {}
  const { location, sD, sT, eD, eT } = searchInfor
  search.address = location
  search.startTime = `${sD} ${sT}`
  search.endTime = `${eD} ${eT}`

  const searchInforParams = new URLSearchParams(search).toString()

  const res = await axios.get(
    `${API_URL}car/search?${metaParams}&${searchInforParams}`
  )
  // const res = await axiosInstance.get(`car/search?${metaParams}&${searchInforParams}`)
  return res.data
}

export const stopRentingApi = async (id) => {
  const res = await axiosInstance.patch(`car/stop-renting-car/${id}`)
  return res.data
}
