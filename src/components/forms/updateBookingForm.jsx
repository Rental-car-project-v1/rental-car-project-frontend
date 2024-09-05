import { Controller } from 'react-hook-form'

function UpdateBookingForm({
  control,
  handleSaveDetails,
  toggleOpenUpdateForm
}) {
  return (
    <form onSubmit={handleSaveDetails}>
      <div className="my-3">
        <h5>Renter&apos; Information</h5>
        <div className="row p-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Full name: </label>
              <Controller
                name="renterInfor.username"
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Phone number: </label>
              <Controller
                name="renterInfor.phoneNumber"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">National ID No: </label>
              <Controller
                name="renterInfor.nationalId"
                control={control}
                rules={{ required: 'National ID is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Date of birth: </label>
              <Controller
                name="renterInfor.birthDay"
                control={control}
                rules={{ required: 'Date of birth is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="date" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email address:</label>
              <Controller
                name="renterInfor.email"
                control={control}
                rules={{ required: 'Email address is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="email" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Driving license:</label>
              <Controller
                name="renterInfor.drivingLicense"
                control={control}
                rules={{ required: 'Driving license is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <div className="mb-3">
              <Controller
                name="renterInfor.address[0]"
                control={control}
                rules={{ required: 'City/Province is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="City/Province"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="renterInfor.address[1]"
                control={control}
                rules={{ required: 'District is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="District"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="renterInfor.address[2]"
                control={control}
                rules={{ required: 'Ward is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="Ward"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="renterInfor.address[3]"
                control={control}
                rules={{ required: 'Street is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="House number/Street"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
        <h5>Driver&apos; Information</h5>
        <div className="row p-4">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Full name: </label>
              <Controller
                name="driverInfor.username"
                control={control}
                rules={{ required: 'Full name is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Phone number: </label>
              <Controller
                name="driverInfor.phoneNumber"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">National ID No: </label>
              <Controller
                name="driverInfor.nationalId"
                control={control}
                rules={{ required: 'National ID is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Date of birth: </label>
              <Controller
                name="driverInfor.birthDay"
                control={control}
                rules={{ required: 'Date of birth is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="date" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email address:</label>
              <Controller
                name="driverInfor.email"
                control={control}
                rules={{ required: 'Email address is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="email" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Driving license:</label>
              <Controller
                name="driverInfor.drivingLicense"
                control={control}
                rules={{ required: 'Driving license is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input {...field} type="text" className="form-control" />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <div className="mb-3">
              <Controller
                name="driverInfor.address[0]"
                control={control}
                rules={{ required: 'City/Province is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="City/Province"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="driverInfor.address[1]"
                control={control}
                rules={{ required: 'District is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="District"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="driverInfor.address[2]"
                control={control}
                rules={{ required: 'Ward is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="Ward"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="mb-3">
              <Controller
                name="driverInfor.address[3]"
                control={control}
                rules={{ required: 'Street is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      className="form-control"
                      placeholder="House number/Street"
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-danger me-2" onClick={toggleOpenUpdateForm}>
          Discard
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  )
}

export default UpdateBookingForm
