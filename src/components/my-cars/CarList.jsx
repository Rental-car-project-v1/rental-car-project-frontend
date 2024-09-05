import { Link } from "react-router-dom";
import { currencyFormat } from "../../shared/utils";
import ImageSlider from "../carousels/ImageSlider";
import StarRating from "../StarRating";
import { MULTIPLIED_AMOUNT } from "../../shared/constants";

export default function CarList({ cars = [] }) {
  return (
    <div className="">
      {cars.map((item) => (
        <div className="row mb-3 shadow-lg py-3 border rounded" key={item?.id}>
          <div className="col-lg-5 mb-3 mb-lg-0">
            <ImageSlider images={item?.images} />
          </div>
          <div className="col-md-8 col-lg-4">
            <div className="row mb-2">
              <h4>{item?.name}</h4>
            </div>
            <div className="row mb-2 fw-semibold align-items-center">
              <div className="col-4">Ratings: </div>
              <div className="col-8">
                <StarRating value={item?.rating} size={20} />
              </div>
            </div>
            {/* <div className="row mb-2 fw-semibold">
                            <div className="col-4">No. of rides: </div>
                            <div className="col-8">{item?.numberOfSeats}</div>
                        </div> */}
            <div className="row mb-2 fw-semibold">
              <div className="col-4">Price: </div>
              <div className="col-8">
                {currencyFormat(
                  ((item?.basePrice ?? 0) * MULTIPLIED_AMOUNT) / 1000,
                  "VND",
                  false
                )}
                k/day
              </div>
            </div>
            <div className="row mb-2 fw-semibold">
              <div className="col-4">Location: </div>
              <div className="col-8">{item?.address}</div>
            </div>
            <div className="row mb-2 mb-md-0 fw-semibold">
              <div className="col-4">Status: </div>
              <div className="col-8">
                {item?.isAvailable && !item?.isStopped && (
                  <span className="text-success">Available</span>
                )}
                {item?.isStopped && (
                  <span className="text-danger">Stopped</span>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-3">
            <div className="d-flex flex-column">
              <Link
                to={`/my-cars/${item?.id}`}
                className="btn btn-primary mb-2"
              >
                View details
              </Link>
              {/* <Link to={`/my-cars/${item?.id}`} className="btn btn-primary">Confirm deposit</Link> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
