import AdditionalFunctions from '../forms/AdditionalFunctions'
import TermsOfUse from '../forms/TermsOfUse'
import BasicInformationTab from '../my-cars/BasicInfomationTab'

function CarInfoTab({ carInfor = {} }) {
  return (
    <>
      <div className="px-3">
        <BasicInformationTab car={carInfor} />
      </div>
      <p className="fw-semibold">Mileage: {carInfor?.mileage}</p>
      <p className="fw-semibold">
        Fuel consumption: {carInfor?.fuelConsumption} liter/100km
      </p>
      <p className="fw-semibold">Address: {carInfor?.address}</p>
      <div className="w-75">
        <p className="fw-semibold">Description</p>
        <p>{carInfor?.description}</p>
      </div>
      <div>
        <p className="fw-semibold">Additional functions:</p>
        <AdditionalFunctions
          additionalFunctions={carInfor?.additionalFunctions.split(',')}
        />
      </div>
      <div>
        <p className="fw-semibold">Terms of use:</p>
        <TermsOfUse terms={carInfor?.termsOfUse.split(',')} />
      </div>
    </>
  )
}

export default CarInfoTab
