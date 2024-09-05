import { useEffect } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InfoCard from '../components/booking/InfoCard'
import BreadCrumb from '../components/BreadCrumb'
import ChangePasswordForm from '../components/forms/ChangePasswordForm'
import Loading from '../components/Loading'
import { getMyProfileApi, updateMyProfileApi } from '../shared/apis/userApi'
import { formatDateValueForInput, parseAddress } from '../shared/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdatedUser } from '../shared/toolkits/authSlice'

function MyProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm()
  const watchOpenUpdateForm = watch('openUpdateForm', false)

  const dispatch = useDispatch()

  useEffect(() => {
    getMyProfileApi().then((data) => {
      const info = data.data
      const { city, district, ward, houseNumber } = parseAddress(info.address)
      setValue('username', info.username)
      setValue('phoneNumber', info.phoneNumber)
      setValue('nationalId', info.nationality)
      setValue(
        'birthDay',
        info?.birthDay ? formatDateValueForInput(info.birthDay) : null
      )
      setValue('drivingLicense', info.drivingLicense)
      setValue('city', city)
      setValue('district', district)
      setValue('ward', ward)
      setValue('street', houseNumber)
      setValue('userInfo', info)
    })
  }, [setValue])

  const updateProfile = async (data) => {
    const { city, district, ward, street } = data
    const updatedUser = await updateMyProfileApi({
      ...data,
      address: Object.values([street, ward, district, city]).join(', ')
    })
    setValue('userInfo', updatedUser.data)
    setValue('openUpdateForm', false)
    dispatch(setUpdatedUser(updatedUser.data))
    toast.success(updatedUser.message)
  }

  const userInfo = watch('userInfo')
  const openUpdateForm = watchOpenUpdateForm

  if (!userInfo) return <Loading />

  return (
    <>
      <BreadCrumb
        links={[{ path: '/', name: 'Home' }, { name: 'My Profile' }]}
      />
      <Container>
        <h2 className="mb-3">My Profile</h2>
        <Tabs
          defaultActiveKey="personal-info"
          id="profile-tabs"
          className="mb-3"
        >
          <Tab eventKey="personal-info" title="Personal information">
            <div className="mb-4 w-75">
              {openUpdateForm ? (
                <form onSubmit={handleSubmit(updateProfile)}>
                  <div className="row p-4">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Full name:</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('username', { required: true })}
                        />
                        {errors.username && (
                          <p className="text-danger">Full name is required.</p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Phone number:</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('phoneNumber', { required: true })}
                        />
                        {errors.phoneNumber && (
                          <p className="text-danger">
                            Phone number is required.
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">National ID No.</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('nationalId', { required: true })}
                        />
                        {errors.nationalId && (
                          <p className="text-danger">
                            National ID No. is required.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Date of birth:</label>
                        <input
                          type="date"
                          className="form-control"
                          {...register('birthDay', { required: true })}
                        />
                        {errors.birthDay && (
                          <p className="text-danger">
                            Date of birth is required.
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Driving license:</label>
                        <input
                          type="text"
                          className="form-control"
                          {...register('drivingLicense', { required: true })}
                        />
                        {errors.drivingLicense && (
                          <p className="text-danger">
                            Driving license is required.
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="City/Province"
                        {...register('city', { required: true })}
                      />
                      {errors.city && (
                        <p className="text-danger">City is required.</p>
                      )}
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="District"
                        {...register('district', { required: true })}
                      />
                      {errors.district && (
                        <p className="text-danger">District is required.</p>
                      )}
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Ward"
                        {...register('ward', { required: true })}
                      />
                      {errors.ward && (
                        <p className="text-danger">Ward is required.</p>
                      )}
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="House number, Street"
                        {...register('street', { required: true })}
                      />
                      {errors.street && (
                        <p className="text-danger">
                          Street\House number is required.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-danger m-3"
                      type="button"
                      onClick={() => setValue('openUpdateForm', false)}
                    >
                      Discard
                    </button>
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="mb-5">
                    <InfoCard info={userInfo} />
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => setValue('openUpdateForm', true)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Tab>
          <Tab eventKey="security" title="Security">
            <ChangePasswordForm />
          </Tab>
        </Tabs>
      </Container>
    </>
  )
}

export default MyProfile
