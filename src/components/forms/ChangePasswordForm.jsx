import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { changePasswordApi } from '../../shared/apis/authApi'

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const handleChangePassword = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error(
        'Password and Confirm password do not match. Please try again!'
      )
      return
    }
    const { message } = await changePasswordApi(data)
    toast.success(message)
  }
  return (
    <div className="col-lg-6 col-md-8 my-4">
      <h5>Change password</h5>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div className="mb-3">
          <label className="form-label">Old password:</label>
          <input
            type="password"
            className="form-control"
            {...register('oldPassword', {
              required: 'This field is required'
            })}
          />
          {errors.oldPassword && (
            <span className="text-danger">{errors.oldPassword.message}</span>
          )}
        </div>
        <div className="my-3">
          <label className="form-label">New password:</label>
          <input
            className="form-control"
            type="password"
            {...register('newPassword', {
              required: 'This field is required'
            })}
          />
          {errors.newPassword && (
            <span className="text-danger">{errors.newPassword.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm password:</label>
          <input
            type="password"
            className="form-control"
            {...register('confirmNewPassword', {
              required: 'This field is required'
            })}
          />
          {errors.confirmNewPassword && (
            <span className="text-danger">
              {errors.confirmNewPassword.message}
            </span>
          )}
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-danger m-3">
            Discard
          </button>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordForm
