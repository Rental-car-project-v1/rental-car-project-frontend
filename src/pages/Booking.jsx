import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import StarRating from "../components/StarRating";
import { convertToLocalDateTime, currencyFormat, formatDate } from "../shared/utils";
import ImageSlider from "../components/carousels/ImageSlider";
import StepsV2 from "../components/booking/StepsV2";
import { useState, useEffect } from "react";
import BookingStep1 from "../components/booking/BookingStep1";
import BookingStep2 from "../components/booking/BookingStep2";
import BookingStep3 from "../components/booking/BookingStep3";
import { getCarsById } from "../shared/apis/carApi";
import RequestError from "./error/RequestError";
import { addBookingApi } from "../shared/apis/bookingApi";
import { MULTIPLIED_AMOUNT } from '../shared/constants'

export default function Booking() {

    const bookingSteps = ['Booking Information', 'Payment', 'Finish']

    const [searchParams] = useSearchParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [bookingData, setBookingData] = useState({})
    const [bookingResData, setBookingResData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [car, setCar] = useState(null)
    const navigate = useNavigate()

    const requiredParams = ['carId', 'location', 'sD', 'sT', 'eD', 'eT']
    const missingParams = requiredParams.filter(param => !searchParams.get(param))

    useEffect(() => {
        if(missingParams.length === 0) {
            setLoading(true)
            getCarsById(searchParams.get('carId')).then(data => {
                setCar(data.data)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [searchParams])

    if (missingParams.length > 0) return <RequestError />

    const nextStep = (data) => {
        if(currentStep === 1) {
            setBookingData(data)
            setCurrentStep(2)
        }

        if(currentStep === 2) {
            setLoading(true)
            const carId = searchParams.get('carId')

            const sD = searchParams.get('sD')
            const sT = searchParams.get('sT')
            const startDateTime = `${sD} ${sT}`

            const eD = searchParams.get('eD')
            const eT = searchParams.get('eT')
            const endDateTime = `${eD} ${eT}`

            const submitData = {
                carId,
                startDateTime,
                endDateTime,
                ...bookingData,
                ...data
            }

            addBookingApi(submitData).then(data => {
                setBookingResData(data.data)
                setCurrentStep(3)
            }).catch(err => {
                console.log(err)
                setCurrentStep(1)
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    const handleCancel = () => {
        navigate('/')
    }

    const hoursDiff = (convertToLocalDateTime(searchParams.get('eD'), searchParams.get('eT')) - convertToLocalDateTime(searchParams.get('sD'), searchParams.get('sT'))) / (1000 * 3600)

    return (
        <>
            <BreadCrumb links={[
                {
                    path: '/',
                    name: 'Home'
                },
                {
                    name: 'Book Car'
                }
            ]}/>

            {(currentStep == 1 || currentStep == 2) && 
                <div className="rent-car-booking-detail bg-rt-primary text-white">
                    <div className="container py-3">
                        <div className="d-flex align-items-center">
                            <h5>Booking Deatils</h5>
                            <Link to="/search" className="d-flex align-items-center ms-auto text-white">
                                <FiEdit className="fs-4 me-1"/>
                                Change deatils
                            </Link>
                        </div>
                        <ul className="text-white fs-5.5 fw-semibold lh-lg">
                            <li>Pick-up location: { searchParams.get('location') }</li>
                            <li>Pick-up date and time: { formatDate(searchParams.get('sD')) } - { searchParams.get('sT') }</li>
                            <li>Return date and time: { formatDate(searchParams.get('eD')) } - { searchParams.get('eT') }</li>
                        </ul>
                    </div>
                </div>
            }

            <div className="container">
                <StepsV2
                    steps={bookingSteps}
                    currentStep={currentStep}
                />
            </div>

            {(currentStep == 1 || currentStep == 2) && 
                <div className="border-top border-bottom my-3 border-dark">
                    <div className="container">
                        <div className="d-flex flex-column flex-md-row">
                            {/* Car details */}
                            <div className="w-100 w-md-50 py-2 py-md-4 px-3">
                                <div className="row mb-2">
                                    <div className="w-md-75">
                                        <ImageSlider images={car?.images}/>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <h4>{car?.name}</h4>
                                </div>
                                <div className="row mb-2 fw-semibold">
                                    <div className="col-4">Ratings:</div>
                                    <div className="col-8"><StarRating value={car?.rating || 0} size={20}/></div>
                                </div>
                                <div className="row mb-2 fw-semibold">
                                    <div className="col-4">Number of Seats:</div>
                                    <div className="col-8">{car?.numberOfSeats}</div>
                                </div>
                                <div className="row mb-2 fw-semibold">
                                    <div className="col-4">Price:</div>
                                    <div className="col-8">{currencyFormat((car?.basePrice ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}k/day</div>
                                </div>
                                <div className="row mb-2 fw-semibold">
                                    <div className="col-4">Loaction:</div>
                                    <div className="col-8">{car?.address}</div>
                                </div>
                                <div className="row mb-2 fw-semibold">
                                    <div className="col-4">Status:</div>
                                    <div className="col-8 text-success">
                                        {(car?.isAvailable && !car?.isStopped) && <span className="text-success">Available</span>}
                                        {car?.isStopped && <span className="text-danger">Stopped</span> }
                                    </div>
                                </div>
                            </div>
                            {/* Booking summary */}
                            <div className="w-100 w-md-50 py-2 py-md-4 px-3 border-md-start border-dark">
                                <div className="row mb-3">
                                    <h4>Booking Summary</h4>
                                </div>
                                <div className="row mb-3">
                                    <h5 className="text-end">Number of hours: { Math.round(hoursDiff) }h</h5>
                                </div>
                                <div className="row mb-3">
                                    <h5 className="text-end">Price per day: {currencyFormat((car?.basePrice ?? 0) * MULTIPLIED_AMOUNT, 'VND', false)} VND</h5>
                                </div>
                                <div className="w-75 pt-1 mb-3 ms-auto bg-dark"></div>
                                <div className="row mb-3">
                                    <h5 className="text-end">Total: {currencyFormat((car?.basePrice ?? 0) * (hoursDiff / 24) * MULTIPLIED_AMOUNT, 'VND', false)} VND</h5>
                                </div>
                                <div className="row mb-3">
                                    <h5 className="text-end">Deposit: {currencyFormat((car?.deposit ?? 0) * MULTIPLIED_AMOUNT, 'VND', false)} VND</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {currentStep == 1 && <BookingStep1 onCancel={handleCancel} onNextStep={nextStep}/>}

            {currentStep == 2 && <BookingStep2 disabled={loading} loading={loading} deposit={car?.deposit ?? 0} onCancel={handleCancel} onNextStep={nextStep}/>}

            {currentStep == 3 && <BookingStep3 bookingResData={bookingResData}/>}
        </>
    )
}
