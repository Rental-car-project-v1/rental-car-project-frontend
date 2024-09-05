import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { updateCarApi } from "../../shared/apis/carApi"
import { toast } from "react-toastify"
import clsx from "clsx"
import { splitTerms } from "../../shared/utils"
import TermsOfUse from "../forms/TermsOfUse"


export default function PricingTab ({onUpdate, car = {}}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [terms, setTerms] = useState([])

    useEffect(() => {
        handleReset()
    }, [car, reset])

    const termsOfUseChange = (data) => {
        setTerms(data)
    }

    const handleReset = () => {
        reset({
            basePrice: car?.basePrice * 1000000,
            requiredDeposit: car?.deposit * 1000000,
        })
        setTerms(splitTerms(car?.termsOfUse))
    }

    const onSubmit = (data) => {
        setLoading(true)

        const submitData = {
            ...car,
            images: [],
            basePrice: data.basePrice / 1000000,
            deposit: data.requiredDeposit / 1000000,
            termsOfUse: terms.join(',')
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
            <div className="row mb-3 align-items-center">
                <div className="col-4 col-lg-2">
                    <label htmlFor="basePrice" className="form-label mb-0 fw-semibold">Base price:</label>
                </div>
                <div className="col-8 col-lg-4 d-flex align-items-center">
                    <input type="number"
                        id="basePrice"
                        className="form-control me-2"
                        placeholder="Base price"
                        {...register('basePrice', { required: 'Base price is required!' })}/>
                    <span className="">VND/Day</span>
                </div>
                {errors.basePrice && (
                    <span className="text-danger fs-7">{errors.basePrice.message}</span>
                )}
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-4 col-lg-2">
                    <label htmlFor="requiredDeposit" className="form-label mb-0 fw-semibold">Required deposit:</label>
                </div>
                <div className="col-8 col-lg-4 d-flex align-items-center">
                    <input type="number"
                        id="requiredDeposit"
                        className="form-control me-2"
                        placeholder="Deposit"
                        {...register('requiredDeposit', { required: 'Required deposit is required!' })}/>
                    <span className="">VND</span>
                </div>
                {errors.requiredDeposit && (
                    <span className="text-danger fs-7">{errors.requiredDeposit.message}</span>
                )}
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-12">
                    <div className="form-label fw-semibold">Terms of use:</div>
                </div>
                <div className="col-12 col-lg-6">
                    <TermsOfUse terms={terms} onChange={termsOfUseChange}/>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-center align-items-center">
                    <button type="button" onClick={handleReset} className={clsx("btn btn-link text-secondary ms-3", loading ? 'disabled' : '')}>Discard</button>
                    <button type="submit" className={clsx("btn btn-primary px-3", loading ? 'disabled' : '')}>{loading ? 'Saving...' : 'Save'}</button>
                </div>
            </div>
        </form>
    )
}