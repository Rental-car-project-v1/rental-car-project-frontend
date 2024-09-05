import { Link } from "react-router-dom";
import { convertToQueryParams, currencyFormat } from "../../shared/utils";
import ImageSlider from "../carousels/ImageSlider";
import StarRating from "../StarRating";
import { useSelector } from "react-redux";
import { MULTIPLIED_AMOUNT } from '../../shared/constants'

export default function CarGridItem({car = {}}) {

    const searchInfor = useSelector(state => state.search)

    return (
        <div className="col-12">
            <div className="row mb-3 shadow-lg py-3 border rounded" key={car?.id}>
                <div className="col-lg-5 mb-3 mb-lg-0">
                    <ImageSlider images={car?.images}/>
                </div>
                <div className="col-md-8 col-lg-4">
                    <div className="row mb-2">
                        <h4>{car?.name}</h4>
                    </div>
                    <div className="row mb-2 fw-semibold align-items-center">
                        <div className="col-4">Ratings: </div>
                        <div className="col-8"><StarRating value={car?.rating} size={20}/></div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                        <div className="col-4">Brand: </div>
                        <div className="col-8">{car?.brand}</div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                        <div className="col-4">Model: </div>
                        <div className="col-8">{car?.model}</div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                        <div className="col-4">Price: </div>
                        <div className="col-8">{currencyFormat((car?.basePrice ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}k/day</div>
                    </div>
                    <div className="row mb-2 fw-semibold">
                        <div className="col-4">Location: </div>
                        <div className="col-8">{car?.address}</div>
                    </div>
                    <div className="row mb-2 mb-md-0 fw-semibold">
                        <div className="col-4">Status: </div>
                        <div className="col-8">
                            {(car?.isAvailable && !car?.isStopped) && <span className="text-success">Available</span>}
                            {car?.isStopped && <span className="text-danger">Stopped</span> }
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-3">
                    <div className="d-flex flex-column">
                        <Link to={`/rent-car?carId=${car?.id}&${convertToQueryParams(searchInfor)}`} className="btn btn-primary mb-2">Rent now</Link>
                        <Link to={`/cars/${car?.id}`} className="btn btn-primary">View details</Link>
                    </div>
                </div>
            </div>
        </div>
    )

}