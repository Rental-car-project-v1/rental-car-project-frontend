import { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CarInfoTab from '../components/booking-details/CarInfoTab'
import PaymentTab from '../components/booking-details/PaymentTab'
import InfoCard from '../components/booking/InfoCard'
import BreadCrumb from '../components/BreadCrumb'
import ImageSlider from '../components/carousels/ImageSlider'
import UpdateBookingForm from '../components/forms/UpdateBookingForm'
import Loading from '../components/Loading'
import ConfirmModal from '../components/modals/ConfirmModal'
import GiveRatingsModal from '../components/modals/GiveRatingModal'
import {
  cancelBookingApi,
  confirmPickUpApi,
  getBookingDetailsApi,
  returnCarApi,
  updateBookingApi
} from '../shared/apis/bookingApi'
import { MULTIPLIED_AMOUNT } from '../shared/constants'
import {
  currencyFormat,
  formatDateTime,
  formatDateValueForInput
} from '../shared/utils'

function BookingDetails() {
  const { control, setValue, handleSubmit } = useForm()
  const [bookingDetails, setBookingDetails] = useState(null)
  const [carInfor, setCarInfor] = useState(null)
  const [renterInfor, setRenterInfor] = useState(null)
  const [driverInfor, setDriverInfor] = useState(null)
  const [openUpdateForm, setOpenUpdateForm] = useState(false)
  const [showPickupModal, setShowPickupModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showReturnCarModal, setShowReturnCarModal] = useState(false)
  const [showGiveRatingsModal, setShowGiveRatingsModal] = useState(false)
  const params = useParams()
  const { bookingId } = params

  useEffect(() => {
    getBookingDetailsApi(bookingId).then((data) => {
      const { car, renterInfor, driverInfor } = data.data
      setBookingDetails(data.data)
      setCarInfor(car)
      setRenterInfor(renterInfor)
      setDriverInfor(driverInfor)

      setValue('renterInfor', {
        id: renterInfor.id,
        username: renterInfor.username,
        email: renterInfor.email,
        phoneNumber: renterInfor.phoneNumber,
        address: renterInfor.address
          ? renterInfor.address.split(',')
          : ['', '', '', ''],
        nationalId: renterInfor.nationalId,
        drivingLicense: renterInfor.drivingLicense,
        userInforType: 'RENTER',
        birthDay: formatDateValueForInput(renterInfor.birthDay)
      })

      setValue('driverInfor', {
        id: driverInfor.id ?? '',
        username: driverInfor.username ?? '',
        email: driverInfor.email ?? '',
        phoneNumber: driverInfor.phoneNumber ?? '',
        address: driverInfor.address
          ? driverInfor.address.split(',')
          : ['', '', '', ''],
        nationalId: driverInfor.nationalId ?? '',
        drivingLicense: driverInfor.drivingLicense ?? '',
        userInforType: 'DRIVER',
        birthDay: formatDateValueForInput(driverInfor.birthDay) ?? ''
      })
    })
  }, [bookingId, setValue])

  const toggleOpenUpdateForm = () => setOpenUpdateForm(!openUpdateForm)

  const handleSaveDetails = handleSubmit(async (data) => {
    const updatedBooking = await updateBookingApi(bookingId, {
      renterInfor: {
        ...data.renterInfor,
        address: data.renterInfor.address.join(',')
      },
      driverInfor: data.driverInfor
        ? {
            ...data.driverInfor,
            address: data.driverInfor.address.join(',')
          }
        : null
    })
    setRenterInfor(updatedBooking.data.renterInfor)
    setDriverInfor(updatedBooking.data.driverInfor)
    toggleOpenUpdateForm()
    toast.success(updatedBooking.message)
  })

  const handleCancelBooking = async () => {
    const { message } = await cancelBookingApi(bookingId)
    toast.success(message)
  }

  const handleConfirmPickup = async () => {
    const { message } = await confirmPickUpApi(bookingId)
    toast.success(message)
  }

  const handleReturnCar = async () => {
    const { message } = await returnCarApi(bookingId)
    toast.success(message)
    setShowGiveRatingsModal(true)
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
                      (carInfor?.basePrice ?? 0) * MULTIPLIED_AMOUNT,
                      'VND',
                      false
                    )}
                    VND/day
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Total:</div>
                  <div className="col-7">
                    {currencyFormat(
                      (bookingDetails?.total ?? 0) * MULTIPLIED_AMOUNT,
                      'VND',
                      false
                    )}{' '}
                    VND
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-5">Deposit:</div>
                  <div className="col-7">
                    {currencyFormat(
                      (carInfor?.deposit ?? 0) * MULTIPLIED_AMOUNT,
                      'VND',
                      false
                    )}{' '}
                    VND
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
                  {bookingDetails?.status === 'CONFIRMED' && (
                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-3"
                      onClick={() => setShowPickupModal(true)}
                    >
                      Confirm pickup
                    </button>
                  )}
                  {bookingDetails?.status === 'IN_PROGRESS' && (
                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-3"
                      onClick={() => setShowReturnCarModal(true)}
                    >
                      Return car
                    </button>
                  )}
                  {['PENDING_DEPOSIT', 'CONFIRMED', 'PICK_UP'].includes(
                    bookingDetails?.status
                  ) && (
                    <button
                      type="button"
                      className="btn btn-danger w-100 mb-3"
                      onClick={() => setShowCancelModal(true)}
                    >
                      Cancel booking
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
                  {!openUpdateForm ? (
                    <>
                      <div className="my-3">
                        <h5>Renter&apos;s Information</h5>
                        <InfoCard info={renterInfor} />
                        {driverInfor.username && (
                          <>
                            <h5>Driver&apos;s Information</h5>
                            <InfoCard info={driverInfor} />
                          </>
                        )}
                        <div>
                          <button
                            className="btn btn-success ms-4"
                            onClick={toggleOpenUpdateForm}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <UpdateBookingForm
                      control={control}
                      handleSaveDetails={handleSaveDetails}
                      toggleOpenUpdateForm={toggleOpenUpdateForm}
                    />
                  )}
                </div>
              </Tab>
              <Tab eventKey="car-info" title="Car Information">
                <CarInfoTab carInfor={carInfor} />
              </Tab>
              <Tab eventKey="payment-info" title="Payment Information">
                <PaymentTab />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelBooking}
        message="Are you sure you want to cancel this booking?"
        title="Cancel Booking"
        booking={bookingDetails}
        setBooking={setBookingDetails}
        nextStatus="CANCELLED"
      />
      <ConfirmModal
        show={showPickupModal}
        onClose={() => setShowPickupModal(false)}
        onConfirm={handleConfirmPickup}
        message="Are you sure you want to confirm pick-up?"
        title=" Confirm Pick-up"
        booking={bookingDetails}
        setBooking={setBookingDetails}
        nextStatus="IN_PROGRESS"
      />
      <ConfirmModal
        show={showReturnCarModal}
        onClose={() => setShowReturnCarModal(false)}
        onConfirm={handleReturnCar}
        message="Please confirm to return the car!"
        title="Return Car"
        booking={bookingDetails}
        setBooking={setBookingDetails}
        nextStatus="PENDING_PAYMENT"
      />
      <GiveRatingsModal
        bookingId={bookingId}
        show={showGiveRatingsModal}
        onClose={() => setShowGiveRatingsModal(false)}
      />
    </>
  )
}

export default BookingDetails
