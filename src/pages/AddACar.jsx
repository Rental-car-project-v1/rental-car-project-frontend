import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Step1 from '../components/add-car/Step1'
import Step2 from '../components/add-car/Step2'
import Step3 from '../components/add-car/Step3'
import Step4 from '../components/add-car/Step4'
import StepsV2 from '../components/booking/StepsV2'
import BreadCrumb from '../components/BreadCrumb'

const AddACar = () => {
  const steps = ['Basic', 'Details', 'Pricing', 'Finish']
  const [currentStep, setCurrentStep] = useState(1)
  const navigate = useNavigate()
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }
  const [newCar, setNewCar] = useState({
    licensePlate: '',
    name: '',
    brand: '',
    color: '',
    model: '',
    numberOfSeats: '',
    productionYear: '',
    carTransmission: 'AUTOMATIVE',
    fuelType: 'PETRO',
    mileage: '',
    fuelConsumption: '',
    address: [],
    description: '',
    additionalFunctions: '',
    images: [],
    basePrice: '',
    deposit: '',
    termsOfUse: ''
  })

  const handleCancel = () => {
    if (currentStep === 1) navigate('/my-cars')
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            newCar={newCar}
            setNewCar={setNewCar}
            nextStep={nextStep}
            onCancel={handleCancel}
          />
        )
      case 2:
        return (
          <Step2
            newCar={newCar}
            setNewCar={setNewCar}
            nextStep={nextStep}
            onCancel={handleCancel}
          />
        )
      case 3:
        return (
          <Step3
            newCar={newCar}
            setNewCar={setNewCar}
            nextStep={nextStep}
            onCancel={handleCancel}
          />
        )
      case 4:
        return <Step4 newCar={newCar} onCancel={handleCancel} />
      default:
        return null
    }
  }

  return (
    <>
      <BreadCrumb
        links={[
          {
            path: '/',
            name: 'Home'
          },
          {
            name: 'Add a car'
          }
        ]}
      />
      <Container className="mb-5">
        <h2>Add a car</h2>
        <StepsV2
          steps={steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
        <div className="my-4">{renderStepContent(currentStep)}</div>
        <div className="d-flex justify-content-center gap-4"></div>
      </Container>
    </>
  )
}

export default AddACar
