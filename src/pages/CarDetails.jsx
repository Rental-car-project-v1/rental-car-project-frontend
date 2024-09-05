import { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import Loading from '../components/Loading'
import StarRating from '../components/StarRating'
import AdditionalFunctions from '../components/forms/AdditionalFunctions'
import ImageSlider from '../components/carousels/ImageSlider'
import TermsOfUse from '../components/forms/TermsOfUse'
import BasicInformationTab from '../components/my-cars/BasicInfomationTab'
import { getCarsById } from '../shared/apis/carApi'
import { convertToQueryParams, currencyFormat } from '../shared/utils'
import { MULTIPLIED_AMOUNT } from '../shared/constants'
import { useSelector } from 'react-redux'

function CarDetails() {
  const { carId } = useParams()
  const [car, setCar] = useState(null)
  const searchInfor = useSelector(state => state.search)

  useEffect(() => {
    getCarsById(carId).then((data) => {
      setCar(data.data)
    })
  }, [carId])

  if (!car) return <Loading />
  return (
    <>
      <BreadCrumb
        links={[
          {
            name: 'Home',
            path: '/'
          },
          {
            name: 'Search Results',
            path: '/'
          },
          {
            name: 'Car Details'
          }
        ]}
      />
      <div className="container">
        <h2>Car Details</h2>
        <div className="row mb-3">
          <div className="col-12">
            <div className="row shadow-lg mb-3 py-3 rounded">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <ImageSlider images={car?.images} />
              </div>
              <div className="col-md-8 col-lg-4">
                <div className="row mb-2">
                  <h4>{car?.name}</h4>
                </div>
                <div className="row mb-2 fw-semibold align-items-center">
                  <div className="col-4">Ratings: </div>
                  <div className="col-8">
                    <StarRating value={car?.rating} size={20} />
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-4">No. of rides: </div>
                  <div className="col-8">{car?.numberOfSeats}</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-4">Price: </div>
                  <div className="col-8">
                    {currencyFormat((car?.basePrice ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}k/day
                  </div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-4">Location: </div>
                  <div className="col-8">{car?.address}</div>
                </div>
                <div className="row mb-2 fw-semibold">
                  <div className="col-4">Status: </div>
                  <div className="col-8">
                    {car?.isAvailable ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <span className="text-danger">Stop</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="d-flex flex-column">
                  <Link to={`/rent-car?carId=${carId}&${convertToQueryParams(searchInfor)}`} className="btn btn-primary">
                    Rent now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4">
          <div className="card border-0 shadow-lg">
            <div className="card-body pt-3">
              <Tabs
                defaultActiveKey="basic-info"
                id="car-details-tabs"
                className="mb-3"
              >
                <Tab eventKey="basic-info" title="Basic Information">
                  <BasicInformationTab car={car} />
                </Tab>
                <Tab eventKey="details" title="Details">
                  <p className="fw-semibold">Mileage: {car?.mileage}</p>
                  <p className="fw-semibold">
                    Fuel consumption: {car?.fuelConsumption} liter/100km
                  </p>
                  <p className="fw-semibold">Address: {car?.address}</p>
                  <div className="w-75">
                    <p className="fw-semibold">Description</p>
                    <p>{car?.description}</p>
                  </div>
                  <div>
                    <p className="fw-semibold">Additional functions:</p>
                    <AdditionalFunctions
                      additionalFunctions={car?.additionalFunctions.split(',')}
                    />
                  </div>
                </Tab>
                <Tab eventKey="terms-of-use" title="Terms of use">
                  <div>
                    <p className="fw-semibold">
                      Base price:
                      <span className="ps-4">
                        {currencyFormat((car?.basePrice ?? 0) * MULTIPLIED_AMOUNT, 'VND', false)}{' '}
                        VND/day
                      </span>
                    </p>
                    <p className="fw-semibold">
                      Required deposit:
                      <span className="ps-4">
                        {currencyFormat((car?.deposit ?? 0) * MULTIPLIED_AMOUNT, 'VND', false)} VND
                      </span>
                    </p>
                    <p className="fw-semibold">Terms of use:</p>
                    <TermsOfUse terms={car?.termsOfUse.split(',')} />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CarDetails
