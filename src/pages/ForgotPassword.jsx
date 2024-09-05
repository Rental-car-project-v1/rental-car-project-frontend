import { useState } from 'react'
import { forgetPasswordApi } from '../shared/apis/authApi'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const handleSubmit = async () => {
    const { message } = await forgetPasswordApi({ email })
    toast.success(message)
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '560px', background: '#efefef' }}
    >
      <div className="card text-center mx-5" style={{ width: '560px' }}>
        <div className="card-header h5 text-white bg-primary">
          Reset Password
        </div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we will send you an email with
            instructions to reset your password.
          </p>
          <div data-mdb-input-init className="form-outline">
            <input
              type="email"
              className="form-control my-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
