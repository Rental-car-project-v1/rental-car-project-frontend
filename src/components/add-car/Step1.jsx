import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'

const Step1 = ({ newCar = {}, setNewCar, nextStep, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: newCar
  })

  const onSubmit = (data) => {
    setNewCar({ ...newCar, ...data })
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-danger">
        Note: Please check your information carefully, you will not be able to
        change the basic details of your car, which is based on the registration
        information.
      </p>
      <div className="row">
        <div className="col-md-6">
          <div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name:</label>
              <input
                type="text"
                className="form-control"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">License plate:</label>
              <input
                type="text"
                className="form-control"
                {...register('licensePlate', { required: true })}
              />
              {errors.licensePlate && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Brand name:</label>
              <input
                type="text"
                className="form-control"
                {...register('brand', { required: true })}
              />
              {errors.brand && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Color:</label>
              <input
                type="text"
                className="form-control"
                {...register('color', { required: true })}
              />
              {errors.color && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Model:</label>
              <input
                type="text"
                className="form-control"
                {...register('model', { required: true })}
              />
              {errors.model && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">No. of seats:</label>
              <input
                type="number"
                className="form-control"
                {...register('numberOfSeats', { required: true })}
              />
              {errors.numberOfSeats && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-semibold">Production year:</label>
            <input
              type="number"
              className="form-control"
              {...register('productionYear', { required: true })}
            />
            {errors.productionYear && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-between mb-3">
            <div>
              <label className="form-label fw-semibold">Transmission:</label>
              <Controller
                name="carTransmission"
                control={control}
                defaultValue={newCar.carTransmission}
                rules={{ required: true }}
                render={({ field }) => (
                  <ToggleButtonGroup
                    className="d-block"
                    type="radio"
                    name="carTransmissions"
                    {...field}
                  >
                    <ToggleButton id="Automatic" value="AUTOMATIVE">
                      Automatic
                    </ToggleButton>
                    <ToggleButton id="Manual" value="MANUAL">
                      Manual
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </div>
            <div>
              <label className="form-label fw-semibold">Fuel Type:</label>
              <Controller
                name="fuelType"
                control={control}
                defaultValue={newCar.fuelType}
                rules={{ required: true }}
                render={({ field }) => (
                  <ToggleButtonGroup
                    className="d-block"
                    type="radio"
                    name="fuelTypes"
                    {...field}
                  >
                    <ToggleButton id="Petro" value="PETRO">
                      Petro
                    </ToggleButton>
                    <ToggleButton id="Diesel" value="DIESEL">
                      Diesel
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </div>
          </div>
        </div>
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

export default Step1
