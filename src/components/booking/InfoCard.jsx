import { formatDate } from '../../shared/utils'

function InfoCard({ info = {} }) {
  return (
    <div className="row p-4">
      <div className="col-md-6">
        <p className="fw-semibold">Fullname: {info?.username}</p>
        <p className="fw-semibold">Phone number: {info?.phoneNumber}</p>
        <p className="fw-semibold">
          National ID No: {info?.nationality || info?.nationalId}
        </p>
      </div>
      <div className="col-md-6">
        <p className="fw-semibold">
          Date of birth: {info?.birthDay ? formatDate(info?.birthDay) : ''}
        </p>
        <p className="fw-semibold">Email address: {info?.email}</p>
        <p className="fw-semibold">Driving license: {info?.drivingLicense}</p>
      </div>
      <p className="fw-semibold">Address: {info?.address}</p>
    </div>
  )
}

export default InfoCard
