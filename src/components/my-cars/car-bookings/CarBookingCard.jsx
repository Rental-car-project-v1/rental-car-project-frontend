import { Link } from 'react-router-dom'
import { formatDateTime } from '../../../shared/utils'

function CarBookingCard({ booking = {} }) {
  return (
    <div className="row border mb-3 p-3 rounded shadow">
      <div className="col-9">
        <div className="row">
          <p className="col-6">Renter: {booking?.renterInfor?.username}</p>
          <p className="col-6">
            Phone number: {booking?.renterInfor?.phoneNumber}
          </p>
        </div>
        <div className="row">
          <p className="col-6">Driver: {booking?.driverInfor?.username}</p>
          <p className="col-6">
            Phone number: {booking?.driverInfor?.phoneNumber}
          </p>
        </div>
        <div className="row">
          <p className="col-6">
            Start date: {formatDateTime(booking?.startDateTime)}
          </p>
          <p className="col-6">
            End date: {formatDateTime(booking?.endDateTime)}
          </p>
        </div>
        <div className="row">
          <p className="col-6">Booking status: {booking?.status}</p>
          <p className="col-6">Payment method: {booking?.paymentMethod}</p>
        </div>
      </div>
      <div className="col-3">
        <Link
          to={`/car-booking/${booking?.id}`}
          className="btn btn-primary w-100 mb-3"
        >
          View details
        </Link>
      </div>
    </div>
  )
}

export default CarBookingCard
