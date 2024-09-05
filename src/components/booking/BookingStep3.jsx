import { Link } from "react-router-dom"
import { formatDateTime } from "../../shared/utils"

export default function BookingStep3({ bookingResData = {} }) {

    return (
        <div className="container">
            <div className="row mb-3">
                <h4>You've successfully booked { bookingResData?.car?.name } from { formatDateTime(bookingResData?.startDateTime) } to { formatDateTime(bookingResData?.endDateTime) }.</h4>
            </div>
            <div className="row mb-3">
                <h4>Your booking number is: { bookingResData?.id }.</h4>
            </div>
            <div className="row mb-3">
                <h4>Our operator will contact you with further guidance about pickup.</h4>
            </div>
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-center">
                    <Link to="/" className="btn btn-link mx-1">Go to homepage</Link>
                    <Link to="/search" className="btn btn-secondary mx-1">Book another car</Link>
                    <Link to={`/my-booking/${bookingResData?.id}`} className="btn btn-primary mx-1">View Booking</Link>
                </div>
            </div>
        </div>
    )
}