import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addCarApi } from '../../shared/apis/carApi'
import { MULTIPLIED_AMOUNT } from '../../shared/constants'
import { currencyFormat } from '../../shared/utils'
import ImageSlider from '../carousels/ImageSlider'
import StarRating from '../StarRating'

const Step4 = ({ newCar = {}, onCancel }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    const newAddedCar = await addCarApi({
      ...newCar,
      basePrice: newCar?.basePrice / MULTIPLIED_AMOUNT,
      deposit: newCar?.deposit / MULTIPLIED_AMOUNT
    })
    setLoading(false)
    navigate('/my-cars')
  }

  return (
    <div>
      <h4>Preview</h4>
      <div className="row shadow-lg py-3 rounded mb-5">
        <div className="col-lg-5 mb-3 mb-lg-0">
          <ImageSlider images={newCar.images} />
        </div>
        <div className="col-md-8 col-lg-4">
          <div className="row mb-2">
            <h4>{newCar?.name}</h4>
          </div>
          <div className="row mb-2 fw-semibold align-items-center">
            <div className="col-4">Ratings:</div>
            <div className="col-8">
              <StarRating value={0} size={20} />
            </div>
          </div>
          <div className="row mb-2 fw-semibold">
            <div className="col-4">No. of rides:</div>
            <div className="col-8">{newCar?.numberOfSeats}</div>
          </div>
          <div className="row mb-2 fw-semibold">
            <div className="col-4">Price:</div>
            <div className="col-8">
              {' '}
              {currencyFormat((newCar?.basePrice ?? 0) / 1000, 'VND', false)}
              k/day
            </div>
          </div>
          <div className="row mb-2 fw-semibold">
            <div className="col-4">Location:</div>
            <div className="col-8">{newCar?.address}</div>
          </div>
          <div className="row mb-2 fw-semibold">
            <div className="col-4">Status:</div>
            <div className="col-8 text-success">Available</div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center gap-4 my-3">
        <button type="button" className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </div>
  )
}

export default Step4
