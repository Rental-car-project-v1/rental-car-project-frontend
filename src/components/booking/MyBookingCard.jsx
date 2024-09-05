import { Link } from 'react-router-dom'
import { currencyFormat, formatDateTime } from '../../shared/utils'
import ImageSlider from '../carousels/ImageSlider'
import { MULTIPLIED_AMOUNT } from '../../shared/constants'

export default function MyBookingCard({ data = [] }) {
  return (
    <>
      {data.map((item) => (
        <div key={item?.bookingId} className="row mb-4">
          <div className="col-12">
            <div className="row shadow pt-3 pb-2 rounded">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <ImageSlider images={item?.images} />
              </div>
              <div className="col-md-8 col-lg-4">
                <div className="row">
                  <h3>{item?.carName}</h3>
                </div>
                <div className="row ms-4">
                  <ul>
                    <li>From: {formatDateTime(item?.startDateTime)}</li>
                    <li>To: {formatDateTime(item?.endDateTime)}</li>
                  </ul>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Number of hours:</div>
                  <div className="col-7">{item?.numberOfHour}h</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5"> Base price:</div>
                  <div className="col-7">
                    {currencyFormat((item?.basePrice ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}
                    k/day
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Total:</div>
                  <div className="col-7">{currencyFormat((item?.total ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}k</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Deposit:</div>
                  <div className="col-7">{currencyFormat((item?.deposit ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}k</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Booking No.</div>
                  <div className="col-7">{item?.bookingId}</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Booking status:</div>
                  <div className="col-7">{item?.bookingStatus}</div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <Link
                  to={`${item?.bookingId}`}
                  className="btn btn-primary w-100 mb-3"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
