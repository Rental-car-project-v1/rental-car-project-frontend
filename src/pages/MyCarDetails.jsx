import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import BreadCrumb from '../components/BreadCrumb'
import ImageSlider from '../components/carousels/ImageSlider'
import EmptyState from '../components/EmptyState'
import LoadingState from '../components/LoadingState'
import ConfirmModal from '../components/modals/ConfirmModal'
import BasicInformationTab from '../components/my-cars/BasicInfomationTab'
import DetailsTab from '../components/my-cars/DetailsTab'
import PricingTab from '../components/my-cars/PricingTab'
import StarRating from '../components/StarRating'
import { getCarsById, stopRentingApi } from '../shared/apis/carApi'
import { MULTIPLIED_AMOUNT } from '../shared/constants'
import { currencyFormat } from '../shared/utils'
import CarBookingsTab from '../components/my-cars/CarBookingTab'

export default function MyCarDetails() {
  const { carId } = useParams()
  console.log('🚀 ~ MyCarDetails ~  carId:', carId)
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showStopRentingModal, setStopRentingModal] = useState(false)
  const [showReRentingModal, setReRentingModal] = useState(false)
  const handleStopRentingCar = async () => {
    const { message } = await stopRentingApi(carId)
    toast.success(message)
    setStopRentingModal(false)
  }

  useEffect(() => {
    setLoading(true)
    getCarsById(carId)
      .then((data) => {
        setCar(data.data)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [carId])

  const handleUpdateCar = (data) => {
    setCar(data)
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
            name: 'My Cars',
            path: '/my-cars'
          },
          {
            name: 'Edit Details'
          }
        ]}
      />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="row border shadow-lg mb-3 py-3 rounded">
              {loading && !car && (
                <div className="py-5">
                  <LoadingState />
                </div>
              )}
              {!loading && !car && (
                <div className="py-5">
                  <EmptyState />
                </div>
              )}
              {car != null && (
                <>
                  <div className="col-lg-5 mb-3 mb-lg-0">
                    <ImageSlider images={car?.images} />
                  </div>
                  <div className="col-md-8 col-lg-4">
                    <div className="row mb-2">
                      <h4>{car?.name}</h4>
                    </div>
                    <div className="row mb-2 fw-semibold align-items-center">
                      <div className="col-4">Ratings: </div>
                      <div className="col-8">
                        <StarRating value={car?.rating} size={20} />
                      </div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                      <div className="col-4">No. of rides: </div>
                      <div className="col-8">{car?.numberOfSeats}</div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                      <div className="col-4">Price: </div>
                      <div className="col-8">
                        {currencyFormat(
                          (car?.basePrice ?? 0) * MULTIPLIED_AMOUNT,
                          'VND',
                          false
                        )}{' '}
                        VND/day
                      </div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                      <div className="col-4">Location: </div>
                      <div className="col-8">{car?.address}</div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                      <div className="col-4">Status: </div>
                      <div className="col-8">
                        <span
                          className={
                            car?.isStopped ? 'text-danger' : 'text-success'
                          }
                        >
                          {car?.isStopped
                            ? 'Stopped'
                            : car?.isAvailable
                            ? 'Available'
                            : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    {!car?.isStopped ? (
                      <button
                        type="button"
                        className="btn btn-primary w-100 mb-3"
                        onClick={() => setStopRentingModal(true)}
                      >
                        Stop renting
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary w-100 mb-3"
                        onClick={() => setReRentingModal(true)}
                      >
                        Re-renting
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="row mb-3">
          <div className="card shadow-lg">
            <div className="card-body pt-3">
              <ul className="nav nav-tabs nav-tabs-bordered">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#basic-information"
                  >
                    Basic Information
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#car-details"
                  >
                    Details
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#car-pricing"
                  >
                    Pricing
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#car-bookings"
                  >
                    Bookings
                  </button>
                </li>
              </ul>
              <div className="tab-content pt-2">
                <div
                  className="tab-pane fade pt-3 show active"
                  id="basic-information"
                >
                  {loading && !car && (
                    <div className="py-5">
                      <LoadingState />
                    </div>
                  )}
                  {!loading && !car && (
                    <div className="py-5">
                      <EmptyState />
                    </div>
                  )}
                  {car != null && <BasicInformationTab car={car} />}
                </div>
                <div className="tab-pane fade pt-3" id="car-details">
                  {loading && !car && (
                    <div className="py-5">
                      <LoadingState />
                    </div>
                  )}
                  {!loading && !car && (
                    <div className="py-5">
                      <EmptyState />
                    </div>
                  )}
                  {car != null && (
                    <DetailsTab car={car} onUpdate={handleUpdateCar} />
                  )}
                </div>
                <div className="tab-pane fade pt-3" id="car-pricing">
                  {loading && !car && (
                    <div className="py-5">
                      <LoadingState />
                    </div>
                  )}
                  {!loading && !car && (
                    <div className="py-5">
                      <EmptyState />
                    </div>
                  )}
                  {car != null && (
                    <PricingTab car={car} onUpdate={handleUpdateCar} />
                  )}
                </div>
                <div className="tab-pane fade pt-3" id="car-bookings">
                  {loading && !car && (
                    <div className="py-5">
                      <LoadingState />
                    </div>
                  )}
                  {!loading && !car && (
                    <div className="py-5">
                      <EmptyState />
                    </div>
                  )}
                  {car != null && (
                    <CarBookingsTab carId={carId} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        show={showStopRentingModal}
        onClose={() => setStopRentingModal(false)}
        onConfirm={handleStopRentingCar}
        message="Stop renting car?"
        title="Stop renting"
        car={car}
        setCar={setCar}
      />
      <ConfirmModal
        show={showReRentingModal}
        onClose={() => setReRentingModal(false)}
        onConfirm={handleStopRentingCar}
        message="Re-renting car?"
        title="Re-renting"
        car={car}
        setCar={setCar}
      />
    </>
  )
}
