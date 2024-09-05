import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AdditionalFunctions from '../forms/AdditionalFunctions'
import ImagesUploadV2 from '../forms/ImagesUploadV2'
import { toast } from 'react-toastify'

const Step2 = ({ newCar = {}, setNewCar, nextStep, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: newCar
  })

  const [functions, setFunctions] = useState([])
  const functionsChange = (data) => {
    setFunctions(data)
  }
  const [images, setImages] = useState([])
  const handleImageChange = (data) => {
    setImages(data)
  }

  useEffect(() => {
    if (newCar.additionalFunctions !== functions.join(',')) {
      setNewCar((prevCar) => ({
        ...prevCar,
        additionalFunctions: functions.join(',')
      }))
    }
  }, [functions, newCar.additionalFunctions, setNewCar])

  const onSubmit = (data) => {
    if (images.length !== 4) {
      toast.error('Please upload full 4 images of the car!')
      return
    }
    const fullAddress = `${data.city}, ${data.district}, ${data.ward}, ${data.street}`
    const { mileage, fuelConsumption, description } = data
    setNewCar({
      ...newCar,
      mileage,
      fuelConsumption,
      description,
      address: fullAddress,
      additionalFunctions: functions.join(','),
      images: images.map((image) => image.imageItem)
    })
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-6">
          <div className="w-75">
            <div className="mb-3 w-50">
              <label className="form-label fw-semibold">Mileage:</label>
              <input
                type="number"
                step={0.1}
                className="form-control"
                {...register('mileage', { required: true })}
              />
              {errors.mileage && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div>
              <label className="form-label fw-semibold">Address:</label>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="City/Province"
                {...register('city', { required: true })}
              />
              {errors.city && (
                <span className="text-danger">This field is required</span>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="District"
                {...register('district', { required: true })}
              />
              {errors.district && (
                <span className="text-danger">This field is required</span>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Ward"
                {...register('ward', { required: true })}
              />
              {errors.ward && (
                <span className="text-danger">This field is required</span>
              )}
              <input
                type="text"
                className="form-control mb-3"
                placeholder="House Number/Street"
                {...register('street', { required: true })}
              />
              {errors.street && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Fuel consumption:
              </label>
              <div>
                <input
                  type="number"
                  step={0.1}
                  className="form-control w-25 d-inline-block"
                  {...register('fuelConsumption', { required: true })}
                />
                {errors.fuelConsumption && (
                  <span className="text-danger">This field is required</span>
                )}
                <span className="fw-semibold mx-2">liter/100km</span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Description:</label>
              <textarea
                rows={8}
                className="form-control"
                {...register('description', { required: true })}
              />
              {errors.description && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h5>Additional functions</h5>
        <AdditionalFunctions
          className=""
          additionalFunctions={functions}
          onChange={functionsChange}
          disabled={false}
        />
      </div>
      <div>
        <h5>Images</h5>
        <ImagesUploadV2
          className=""
          images={images}
          onChange={handleImageChange}
        />
      </div>
      <div className="d-flex justify-content-center gap-4 my-3">
        <button type="button" className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Next
        </button>
      </div>
    </form>
  )
}

export default Step2
