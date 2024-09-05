import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginApi, registerApi } from '../../../../shared/apis/authApi'
import { login } from '../../../../shared/toolkits/authSlice.js'

function AuthForm({ onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors }
  } = useForm()

  const handleLogIn = async (data) => {
    loginApi(data).then((data) => {
      const loginData = data.data

      dispatch(
        login({
          access_token: loginData.token,
          user: loginData.infor
        })
      )

      if (loginData.infor?.username) {
        toast.success(`Welcom, ${loginData.infor?.username}`)
      }

      onClose()
      navigate('/')
    })
  }

  const handleSignUp = async (signupData) => {
    registerApi({ ...signupData, acceptTermAndCondition: true }).then(
      (data) => {
        console.log('🚀 ~ handleSignUp ~ data.infor:', data)
        dispatch(
          login({
            access_token: data.data.token,
            user: data.data.infor
          })
        )
        if (data.data.infor?.username) {
          toast.success(`Welcom, ${data.data.infor?.username}`)
        }
        onClose()
      }
    )
  }

  return (
    <div className="container-sm">
      <div className="row p-2">
        <div className="col-md-6 my-3">
          <h5 className="text-center">LOG IN USING YOUR ACCOUNT</h5>
          <form onSubmit={handleSubmit(handleLogIn)}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Your email address"
                className="form-control"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder="Your password"
                className="form-control"
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <div className="d-flex flex-column align-items-center">
              <p>
                <Link to={'/forgot-password'} onClick={onClose}>
                  Forgot your password?
                </Link>
              </p>
              <button
                type="submit"
                className="btn btn-primary px-4 d-flex align-items-center gap-2"
              >
                <FaUser />
                LOG IN
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6 my-3">
          <h5 className="text-center">NOT A MEMBER YET?</h5>
          <form onSubmit={handleSignUpSubmit(handleSignUp)}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Your name"
                className="form-control"
                {...registerSignUp('username', {
                  required: 'Name is required'
                })}
              />
              {signUpErrors.username && (
                <span className="text-danger">
                  {signUpErrors.username.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder="Your email address"
                className="form-control"
                type="email"
                {...registerSignUp('email', { required: 'Email is required' })}
              />
              {signUpErrors.email && (
                <span className="text-danger">
                  {signUpErrors.email.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder="Your phone number"
                className="form-control"
                type="text"
                {...registerSignUp('phoneNumber', {
                  required: 'Phone number is required'
                })}
              />
              {signUpErrors.phoneNumber && (
                <span className="text-danger">
                  {signUpErrors.phoneNumber.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder="Your password"
                className="form-control"
                type="password"
                {...registerSignUp('password', {
                  required: 'Password is required'
                })}
              />
              {signUpErrors.password && (
                <span className="text-danger">
                  {signUpErrors.password.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <input
                placeholder="Confirm password"
                className="form-control"
                type="password"
                {...registerSignUp('confirmPassword', {
                  required: 'Confirmation is required'
                })}
              />
              {signUpErrors.confirmPassword && (
                <span className="text-danger">
                  {signUpErrors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="renter"
                  value="CUSTOMER"
                  {...registerSignUp('userType', {
                    required: 'Role is required'
                  })}
                />
                <label className="form-check-label" htmlFor="renter">
                  I want to rent a car
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id="owner"
                  value="OWNER"
                  {...registerSignUp('userType', {
                    required: 'Role is required'
                  })}
                />
                <label className="form-check-label" htmlFor="owner">
                  I am a car owner
                </label>
              </div>
              {signUpErrors.userType && (
                <span className="text-danger">
                  {signUpErrors.userType.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2"
            >
              <FaUserPlus />
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

AuthForm.propTypes = {
  onClose: PropTypes.func.isRequired
}

export default AuthForm
