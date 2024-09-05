import { useState } from 'react'
import { useForm } from 'react-hook-form'
import TermsOfUse from '../forms/TermsOfUse'

const Step3 = ({ newCar = {}, setNewCar, nextStep, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: newCar
  })

  const [terms, setTerms] = useState([])
  const termsOfUseChange = (data) => {
    setTerms(data)
  }

  const onSubmit = (data) => {
    setNewCar({ ...newCar, ...data, termsOfUse: terms.join(',') })
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="mb-3 d-flex align-items-center gap-3">
          <label className="form-label fw-semibold w-25">
            Set base price for your car:
          </label>
          <input
            type="number"
            className="form-control w-25"
            {...register('basePrice', { required: true })}
          />
          {errors.basePrice && (
            <span className="text-danger">This field is required</span>
          )}
          <span className="fw-semibold">VND/day</span>
        </div>
        <div className="mb-3 d-flex align-items-center gap-3">
          <label className="form-label fw-semibold w-25">
            Required deposit:
          </label>
          <input
            type="number"
            className="form-control w-25"
            {...register('deposit', { required: true })}
          />
          {errors.deposit && (
            <span className="text-danger">This field is required</span>
          )}
          <span className="fw-semibold">VND</span>
        </div>
        <div>
          <h5>Term of use</h5>
          <TermsOfUse terms={terms} onChange={termsOfUseChange} />
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

export default Step3
