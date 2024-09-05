import { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import InfoCard from '../components/booking/InfoCard'
import BreadCrumb from '../components/BreadCrumb'
import ImageSlider from '../components/carousels/ImageSlider'
import Loading from '../components/Loading'
import ConfirmModal from '../components/modals/ConfirmModal'
import {
  confirmDepositApi,
  confirmPaymentApi,
  getBookingDetailsApi
} from '../shared/apis/bookingApi'
import { MULTIPLIED_AMOUNT } from '../shared/constants'
import { currencyFormat, formatDateTime } from '../shared/utils'

function CarBookingDetails() {
  const [bookingDetails, setBookingDetails] = useState(null)
  const [carInfor, setCarInfor] = useState(null)
  const [renterInfor, setRenterInfor] = useState(null)
  const [driverInfor, setDriverInfor] = useState(null)
  const [showConfirmDepositModal, setShowConfirmDepositModal] = useState(false)
  const [showConfirmPaymentModal, setShowConfirmPaymentModal] = useState(false)
  const params = useParams()
  const { bookingId } = params

  useEffect(() => {
    getBookingDetailsApi(bookingId).then((data) => {
      const { car, renterInfor, driverInfor } = data.data
      setBookingDetails(data.data)
      setCarInfor(car)
      setRenterInfor(renterInfor)
      setDriverInfor(driverInfor)
    })
  }, [bookingId])

  const handleConfirmDeposit = async () => {
    const { message } = await confirmDepositApi(bookingId)
    toast.success(message)
  }

  const handleConfirmPayment = async () => {
    const { message } = await confirmPaymentApi(bookingId)
    toast.success(message)
  }

  if (!bookingDetails) return <Loading />

  return (
    <>
      <BreadCrumb
        links={[
          { path: '/', name: 'Home' },
          { path: '/my-booking', name: 'My Booking' },
          { name: 'Booking Details' }
        ]}
      />
      <div className="container">
        <h2 className="mb-3">Booking Details</h2>
        <div className="row mb-3">
          <div className="col-12">
            <div className="row shadow-lg mb-3 py-3 rounded">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <ImageSlider images={carInfor?.images} />
              </div>
              <div className="col-md-8 col-lg-4">
                <div className="row mb-2">
                  <h4>{carInfor?.name}</h4>
                </div>
                <div className="row ms-4">
                  <ul>
                    <li>
                      From: {formatDateTime(bookingDetails?.startDateTime)}
                    </li>
                    <li>To: {formatDateTime(bookingDetails?.endDateTime)}</li>
                  </ul>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Number of hours:</div>
                  <div className="col-7">{bookingDetails?.numberOfHour}h</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Base price:</div>
                  <div className="col-7">
                    {currencyFormat(
                      ((carInfor?.basePrice ?? 0) * MULTIPLIED_AMOUNT) / 1000,
                      'VND',
                      false
                    )}
                    k/day
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Total:</div>
                  <div className="col-7">
                    {currencyFormat(
                      ((bookingDetails?.total ?? 0) * MULTIPLIED_AMOUNT) / 1000,
                      'VND',
                      false
                    )}
                    k
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Deposit:</div>
                  <div className="col-7">
                    {currencyFormat(
                      ((carInfor?.deposit ?? 0) * MULTIPLIED_AMOUNT) / 1000,
                      'VND',
                      false
                    )}
                    k
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Booking No:</div>
                  <div className="col-7">{bookingId}</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Booking status:</div>
                  <div className="col-7">{bookingDetails?.status}</div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <Link
                  to={`/cars/${carInfor?.id}`}
                  className="btn btn-primary w-100 mb-3"
                >
                  View details
                </Link>
                <div className="d-flex flex-column">
                  {bookingDetails?.status === 'PENDING_DEPOSIT' && (
                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-3"
                      onClick={() => setShowConfirmDepositModal(true)}
                    >
                      Confirm deposit
                    </button>
                  )}
                  {bookingDetails?.status === 'PENDING_PAYMENT' && (
                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-3"
                      onClick={() => setShowConfirmPaymentModal(true)}
                    >
                      Confirm payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-4">
        <div className="row card border-0 shadow-lg">
          <div className="card-body pt-3">
            <Tabs
              defaultActiveKey="booking-info"
              id="booking-tabs"
              className="mb-3"
            >
              <Tab eventKey="booking-info" title="Booking Information">
                <div className="w-75">
                  <div className="my-3">
                    <h5>Renter&apos;s Information</h5>
                    <InfoCard info={renterInfor} />
                    {driverInfor.username && (
                      <>
                        <h5>Driver&apos;s Information</h5>
                        <InfoCard info={driverInfor} />
                      </>
                    )}
                    <h6>Payment method: {bookingDetails?.paymentMethod}</h6>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showConfirmDepositModal}
        onClose={() => setShowConfirmDepositModal(false)}
        onConfirm={handleConfirmDeposit}
        message="Please confirm that you have receive the deposit this booking. This will allow the customer to pick-up the car at the agreed date and time."
        title="Confirm Deposit"
        booking={bookingDetails}
        setBooking={setBookingDetails}
        nextStatus="CONFIRMED"
      />
      <ConfirmModal
        show={showConfirmPaymentModal}
        onClose={() => setShowConfirmPaymentModal(false)}
        onConfirm={handleConfirmPayment}
        message="Please confirm that you have receive the payment for this booking."
        title="Confirm Payment"
        booking={bookingDetails}
        setBooking={setBookingDetails}
        nextStatus="COMPLETED"
      />
    </>
  )
}

export default CarBookingDetails
