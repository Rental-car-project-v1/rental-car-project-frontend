import { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import { getMyBookingApi } from '../shared/apis/bookingApi'
import LoadingState from '../components/LoadingState'
import MyBookingCard from '../components/booking/MyBookingCard'
import EmptyState from '../components/EmptyState'
import CustomPagination from '../components/paginations/CustomPagination'

function MyBooking() {
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [perPage, setPerPage] = useState(5)
  const [sortType, setSortType] = useState('id:desc')
  const [loading, setLoading] = useState(true)
  const [myBooking, setMyBooking] = useState([])

  useEffect(() => {
    setLoading(true)
    getMyBookingApi({
      page: currentPage,
      size: perPage,
      sort: sortType
    })
      .then((data) => {
        console.log(data)
        setMyBooking(data.data)
        const meta = data.meta
        if (meta.totalPages != total) setTotal(meta.totalPages)
        if (meta.currentPage + 1 != currentPage)
          setCurrentPage(meta.currentPage + 1)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage, perPage, sortType])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handlePerPageChange = (e) => {
    if (e.target.value < 1) setPerPage(1)
    else setPerPage(e.target.value)
  }

  return (
    <>
      <BreadCrumb
        links={[
          {
            path: '/',
            name: 'Home'
          },
          {
            name: 'My Booking'
          }
        ]}
      />
      <div className="container mt-3">
        <div className="row mb-3">
          <h2>My Bookings</h2>
        </div>
        <div className="row mb-3 align-items-center">
          <p>You have 4 on-going bookings</p>
          <div className="col-md-6 mb-3 d-flex">
            <select
              className="form-select w-content"
              aria-label="Sort cars"
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="id:desc" selected>
                Newest to Lastest
              </option>
              <option value="id:asc">Lastest to Newest</option>
              {/* <option value="basePrice:desc">Price High to Low</option> */}
              {/* <option value="basePrice:asc">Price Low to Ligh</option> */}
            </select>
          </div>
        </div>
        <div className="row">
          {loading && (
            <div className="py-5 my-4">
              <LoadingState />
            </div>
          )}
          {myBooking && !loading && <MyBookingCard data={myBooking} />}
          {myBooking.length === 0 && !loading && (
            <div className="py-5 my-4">
              <EmptyState />
            </div>
          )}
        </div>
        <div className="row">
          <div className="col d-flex flex-column flex-md-row justify-content-end align-items-center">
            <CustomPagination
              currentPage={currentPage}
              totalPages={total}
              onPageChange={handlePageChange}
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
    </>
  )
}

export default MyBooking
