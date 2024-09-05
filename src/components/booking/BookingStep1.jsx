import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { parseAddress } from '../../shared/utils'

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function BookingStep1({ onCancel, onNextStep }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()
  const [checked, setChecked] = useState(true)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {

    const { houseNumber, ward, district, city } = parseAddress(user?.address)
    const birthDay = new Date(user?.birthDay)

    reset({
      renterFullname: user?.username,
      renterEmail: user?.email,
      renterPhoneNumber: user?.phoneNumber,
      renterNationalID: user?.nationality,
      renterBirthday: formatDate(birthDay),
      renterDrivingLicense: user?.drivingLicense,
      renterHouseNumber: houseNumber,
      renterWard: ward,
      renterDistrict: district,
      renterCity: city
    })
  }, [])

  const onSubmit = (data) => {
    const outData = {
      userInfors: [
        {
          username: data.renterFullname,
          email: data.renterEmail,
          phoneNumber: data.renterPhoneNumber,
          address: `${data.renterHouseNumber}, ${data.renterWard}, ${data.renterDistrict}, ${data.renterCity}`,
          nationalId: data.renterNationalID,
          drivingLicense: data.renterDrivingLicense,
          userInforType: 'RENTER',
          birthDay: data.renterBirthday
        }
      ]
    }

    if (checked) {
      outData.userInfors.push({
        username: data.driverFullname,
        email: data.driverEmail,
        phoneNumber: data.driverPhoneNumber,
        address: `${data.driverHouseNumber}, ${data.driverWard}, ${data.driverDistrict}, ${data.driverCity}`,
        nationalId: data.driverNationalID,
        drivingLicense: data.driverDrivingLicense,
        userInforType: 'DRIVER',
        birthDay: data.driverBirthday
      })
    } else {
      outData.userInfors.push({
        ...outData.userInfors[0],
        userInforType: 'DRIVER'
      })
    }

    if (onNextStep) onNextStep(outData)
  }

  const handleCancel = () => {
    if (onCancel) onCancel()
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Renter */}
        <div className="row mb-3">
          <h4>Renter's information</h4>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="renterFullname" className="form-label">
              Full Name:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="renterFullname"
              {...register('renterFullname', {
                required: 'Full name is required!'
              })}
            />
            {errors.renterFullname && (
              <span className="text-danger fs-7">
                {errors.renterFullname.message}
              </span>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="renterDateOfBirth" className="form-label">
              Date Of Birth:<span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              id="renterDateOfBirth"
              {...register('renterBirthday', {
                required: 'Birthday is required!'
              })}
            />
            {errors.renterBirthday && (
              <span className="text-danger fs-7">
                {errors.renterBirthday.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="renterPhoneNumber" className="form-label">
              Phone Number:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="renterPhoneNumber"
              {...register('renterPhoneNumber', {
                required: 'Phone number is required!'
              })}
            />
            {errors.renterPhoneNumber && (
              <span className="text-danger fs-7">
                {errors.renterPhoneNumber.message}
              </span>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="renterEmailAddress" className="form-label">
              Email Address:<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="renterEmailAddress"
              {...register('renterEmail', { required: 'Email is required!' })}
            />
            {errors.renterEmail && (
              <span className="text-danger fs-7">
                {errors.renterEmail.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="renterNationalIDNo" className="form-label">
              National ID No:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="renterNationalIDNo"
              {...register('renterNationalID', {
                required: 'National ID is required!'
              })}
            />
            {errors.renterNationalID && (
              <span className="text-danger fs-7">
                {errors.renterNationalID.message}
              </span>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="renterDrivingLicense" className="form-label">
              Driving License:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="renterDrivingLicense"
              list="drivingLicenseType"
              {...register('renterDrivingLicense', {
                required: 'Driving license is required!'
              })}
            />
            {errors.renterDrivingLicense && (
              <span className="text-danger fs-7">
                {errors.renterDrivingLicense.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="renterCity" className="form-label">
              Address:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="renterCity"
              placeholder="City/Province"
              {...register('renterCity', {
                required: 'City/Province is required!'
              })}
            />
            {errors.renterCity && (
              <span className="text-danger fs-7">
                {errors.renterCity.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="renterDistrict"
              placeholder="District"
              {...register('renterDistrict', {
                required: 'District is required!'
              })}
            />
            {errors.renterDistrict && (
              <span className="text-danger fs-7">
                {errors.renterDistrict.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="renterWard"
              placeholder="Ward"
              {...register('renterWard', { required: 'Ward is required!' })}
            />
            {errors.renterWard && (
              <span className="text-danger fs-7">
                {errors.renterWard.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              id="renterHouseNumber"
              placeholder="House number, Street"
              {...register('renterHouseNumber', {
                required: 'House number, Street is required!'
              })}
            />
            {errors.renterHouseNumber && (
              <span className="text-danger fs-7">
                {errors.renterHouseNumber.message}
              </span>
            )}
          </div>
        </div>
        {/* Driver */}
        <div className="row mb-3">
          <h4>Driver's information</h4>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="driverChk"
                checked={checked}
                onChange={() => setChecked((prev) => !prev)}
              />
              <label className="form-check-label" htmlFor="driverChk">
                Diffferent from Renter's Information
              </label>
            </div>
          </div>
        </div>
        {!checked ? (
          ''
        ) : (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="driverFullname" className="form-label">
                  Full Name:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="driverFullname"
                  {...register('driverFullname', {
                    required: 'Full name is required!'
                  })}
                />
                {errors.driverFullname && (
                  <span className="text-danger fs-7">
                    {errors.driverFullname.message}
                  </span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="driverDateOfBirth" className="form-label">
                  Date Of Birth:<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="driverDateOfBirth"
                  {...register('driverBirthday', {
                    required: 'Birthday is required!'
                  })}
                />
                {errors.driverBirthday && (
                  <span className="text-danger fs-7">
                    {errors.driverBirthday.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="driverPhoneNumber" className="form-label">
                  Phone Number:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="driverPhoneNumber"
                  {...register('driverPhoneNumber', {
                    required: 'Phone number is required!'
                  })}
                />
                {errors.driverPhoneNumber && (
                  <span className="text-danger fs-7">
                    {errors.driverPhoneNumber.message}
                  </span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="driverEmailAddress" className="form-label">
                  Email Address:<span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="driverEmailAddress"
                  {...register('driverEmail', {
                    required: 'Email is required!'
                  })}
                />
                {errors.driverEmail && (
                  <span className="text-danger fs-7">
                    {errors.driverEmail.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="driverNationalIDNo" className="form-label">
                  National ID No:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="driverNationalIDNo"
                  {...register('driverNationalID', {
                    required: 'National ID is required!'
                  })}
                />
                {errors.driverNationalID && (
                  <span className="text-danger fs-7">
                    {errors.driverNationalID.message}
                  </span>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="driverDrivingLicense" className="form-label">
                  Driving License:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="driverDrivingLicense"
                  list="drivingLicenseType"
                  {...register('driverDrivingLicense', {
                    required: 'Driving license is required!'
                  })}
                />
                {errors.driverDrivingLicense && (
                  <span className="text-danger fs-7">
                    {errors.driverDrivingLicense.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="driverCity" className="form-label">
                  Address:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="driverCity"
                  placeholder="City/Province"
                  {...register('driverCity', {
                    required: 'City/Province is required!'
                  })}
                />
                {errors.driverCity && (
                  <span className="text-danger fs-7">
                    {errors.driverCity.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="driverDistrict"
                  placeholder="District"
                  {...register('driverDistrict', {
                    required: 'District is required!'
                  })}
                />
                {errors.driverDistrict && (
                  <span className="text-danger fs-7">
                    {errors.driverDistrict.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="driverWard"
                  placeholder="Ward"
                  {...register('driverWard', { required: 'Ward is required!' })}
                />
                {errors.driverWard && (
                  <span className="text-danger fs-7">
                    {errors.driverWard.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="driverHouseNumber"
                  placeholder="House number, Street"
                  {...register('driverHouseNumber', {
                    required: 'House number, Street is required!'
                  })}
                />
                {errors.driverHouseNumber && (
                  <span className="text-danger fs-7">
                    {errors.driverHouseNumber.message}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        {/* Suggestion for input driving license */}
        <datalist id="drivingLicenseType">
          <option value="B1 Automatic Transmission" />
          <option value="B1 Manual Transmission" />
          <option value="B2" />
          <option value="C" />
          <option value="D" />
          <option value="E" />
          <option value="F" />
          <option value="FB2" />
          <option value="FC" />
          <option value="FD" />
          <option value="FE" />
        </datalist>
        {/* Button */}
        <div className="row mb-3">
          <div className="col-12 d-flex">
            <button
              className={clsx('btn btn-secondary ms-auto me-2 px-3')}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className={clsx('btn btn-primary px-4')} type="submit">
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
