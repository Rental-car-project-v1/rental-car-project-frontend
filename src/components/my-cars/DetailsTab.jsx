import clsx from "clsx"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { updateCarApi } from "../../shared/apis/carApi"
import { toast } from "react-toastify"
import { parseAddress, splitAddtionalFunctions } from '../../shared/utils'
import AdditionalFunctions from "../forms/AdditionalFunctions"
import ImagesUpload from "../forms/ImagesUpload"

export default function DetailsTab ({onUpdate, car = {}}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [additionalFunctions, setAdditionalFunctions] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        handleReset()
    }, [car, reset])

    const additionalFunctionsChange = (data) => {
        setAdditionalFunctions(data)
    }

    const handleImagesChange = (data) => {
        setImages(data)
    }

    const handleReset = () => {
        const address = parseAddress(car?.address)
        reset({
            mileage: car?.mileage,
            fuelConsumption: car?.fuelConsumption,
            city: address.city,
            district: address.district,
            ward: address.ward,
            houseNumber: address.houseNumber,
            description: car?.description
        })
        setAdditionalFunctions(splitAddtionalFunctions(car?.additionalFunctions))
        const images = car?.images.map(image => ({
            id: image?.id,
            imageItem: image?.imageUrl
        })) || new Array(4).fill({ id: null, imageItem: null })
        setImages(images)
    }

    const onSubmit = (data) => {
        setLoading(true)

        const changedImages = images.filter(image => image?.changed)

        const submitData = {
            mileage: data.mileage,
            fuelConsumption: data.fuelConsumption,
            address: `${data.houseNumber}, ${data.ward}, ${data.district}, ${data.city}`,
            description: data.description,
            additionalFunctions: additionalFunctions.join(','),
            images: changedImages,
            basePrice: car?.basePrice,
            deposit: car?.deposit,
            termsOfUse: car?.termsOfUse
        }
        
        updateCarApi(car.id, submitData).then(data => {
            if(onUpdate) onUpdate(data.data)
            toast.success(data?.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="mileage" className="form-label fw-semibold">Mileage:<span className="text-danger">*</span></label>
                    <input type="number"
                        id="mileage"
                        className="form-control"
                        {...register('mileage', { required: 'Mileage is required!' })}/>
                    {errors.mileage && (
                        <span className="text-danger fs-7">{errors.mileage.message}</span>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="fuelConsumption" className="form-label fw-semibold">Fuel consumption:</label>
                    <div className="d-flex align-items-center">
                        <input type="number"
                            id="fuelConsumption"
                            className="form-control me-2"
                            step={0.1}
                            {...register('fuelConsumption')}/>
                        <span className="w-content text-nowrap">liter/100 km</span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label fw-semibold">Address:<span className="text-danger">*</span></label>
                    <input type="text"
                        className="form-control"
                        id="city"
                        placeholder="City/Province"
                        {...register('city', { required: 'City/Province is required!' })}/>
                    {errors.city && (
                        <span className="text-danger fs-7">{errors.city.message}</span>
                    )}
                    <input type="text"
                        className="form-control mt-3"
                        id="district"
                        placeholder="District"
                        {...register('district', { required: 'District is required!' })}/>
                    {errors.district && (
                        <span className="text-danger fs-7">{errors.district.message}</span>
                    )}
                    <input type="text"
                        className="form-control mt-3"
                        id="ward"
                        placeholder="Ward"
                        {...register('ward', { required: 'Ward is required!' })}/>
                    {errors.ward && (
                        <span className="text-danger fs-7">{errors.ward.message}</span>
                    )}
                    <input type="text"
                        className="form-control mt-3"
                        id="houseNumber"
                        placeholder="House number/Street"
                        {...register('houseNumber', { required: 'House number/Street is required!' })}/>
                    {errors.houseNumber && (
                        <span className="text-danger fs-7">{errors.houseNumber.message}</span>
                    )}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="description" className="form-label fw-semibold">Description:</label>
                    <textarea 
                        id="description"
                        className="form-control"
                        placeholder="Description"
                        rows={5}
                        {...register('description')}></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-label fw-semibold">Additional functions:</div>
                </div>
                <div className="col-12">
                    <AdditionalFunctions additionalFunctions={additionalFunctions} onChange={additionalFunctionsChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-label fw-semibold">Images:<span className="text-danger">*</span></div>
                </div>
                <div className="col-12">
                    <ImagesUpload images={images} onChange={handleImagesChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3">
                    <p className="fs-7 mb-0">Please include full 4 images of your vehicle</p>
                    <p className="fs-7 mb-0">File type: .png, .jpg, .jpeg, .gif</p>
                </div>
                <div className="col-12 d-flex justify-content-center mb-3">
                    <button type="button" onClick={handleReset} className={clsx("btn btn-link text-secondary me-2", loading ? 'disabled' : '')}>Discard</button>
                    <button type="submit" className={clsx("btn btn-primary", loading ? 'disabled' : '')}>{loading ? 'Saving...' : 'Save'}</button>
                </div>
            </div>
        </form>
    )
}