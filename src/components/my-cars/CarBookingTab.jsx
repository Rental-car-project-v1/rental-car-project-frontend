import { useCallback, useEffect, useState } from 'react'
import CustomPagination from '../paginations/CustomPagination'
import { getCarBookingApi } from '../../shared/apis/bookingApi'
import LoadingState from '../LoadingState'
import CarBookingList from './car-bookings/CarBookingList'

function CarBookingTab({ carId }) {

  const [loading, setLoading] = useState(true)
  const [carBookings, setCarBookings] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(3)
  const [total, setTotal] = useState(1)

  useEffect(() => {
    setLoading(true)
    getCarBookingApi(carId, currentPage, perPage).then((data) => {
      setCarBookings(data?.data ?? [])
      const meta = data?.meta
      if (meta.totalPages !== total) setTotal(meta.totalPages)
      if (meta.currentPage + 1 !== currentPage)
        setCurrentPage(meta.currentPage + 1)
    }).finally(() => {
      setLoading(false)
    })
  }, [carId, currentPage, perPage, total])

  const handlePerPageChange = useCallback((e) => {
    const value = parseInt(e.target.value, 10)
    if (value < 1) setPerPage(1)
    else setPerPage(value)
  }, [])

  return (
    <div>
      {loading ? <LoadingState /> : <CarBookingList carBookings={carBookings} />}
      <div className="row">
        <div className="col d-flex flex-column flex-md-row justify-content-end align-items-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={total}
            onPageChange={(page) => setCurrentPage(page)}
          />
          <div className="d-flex align-items-center mb-3 ms-md-2">
            <input
              type="number"
              id="carPerPage"
              className="form-control"
              style={{ width: 80 }}
              value={perPage}
              min={1}
              onChange={handlePerPageChange}
            />
            <label htmlFor="carPerPage" className="ms-2 col-form-label">
              per page
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarBookingTab
