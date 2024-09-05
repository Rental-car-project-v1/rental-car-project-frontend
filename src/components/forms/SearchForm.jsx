import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { setSearchInfor } from "../../shared/toolkits/searchSlice"
import { checkReturnDateTime, convertToLocalDateTime } from "../../shared/utils"

export default function SearchForm({ onSubmit }) {

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm()
    const searchInfor = useSelector(state => state.search)
    const dispatch = useDispatch()

    useEffect(() => {
        reset(searchInfor)
    }, [searchInfor, reset])

    const onHandleSubmit = (data) => {
        const { sD, sT, eD, eT } = data
        //
        if(convertToLocalDateTime(sD, sT) < (new Date())) {
            setError('sD', {
                type: 'custom',
                message: 'Pick-up Date and Time must be greater than now!'
            })
            return
        }
        //
        if(!checkReturnDateTime(sD, sT, eD, eT)) {
            setError('eD', {
                type: 'custom',
                message: 'Drop-off Date and Time must be greater than Pick-up Date and Time!'
            })
            return
        }
        //
        dispatch(setSearchInfor(data))
        if(onSubmit) onSubmit(data)
    }

    return (
        <div className="w-100"
            style={{
                backgroundColor: 'var(--primary)'
            }}
        >
            <div className="container py-4">
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className="row mb-4">
                        <div className="col-md-6 position-relative">
                            <label htmlFor="location" className="form-label text-white fw-semibold">PICK-UP LOCATION</label>
                            <input type="text"
                                className="form-control"
                                id="location"
                                placeholder="Enter your location"
                                {...register('location', { required: 'Please provide a pick-up location!' })}
                            />
                            {errors.location && (
                                <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.location.message}</span>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <label htmlFor="pickupDate" className="form-label text-white fw-semibold">PICK-UP DATE AND TIME</label>
                            <div className="row">
                                <div className="col-8 position-relative">
                                    <input type="date"
                                        className="form-control"
                                        id="pickupDate"
                                        {...register('sD', { required: 'Pick-up date is required!' })}
                                    />
                                    {errors.sD && (
                                        <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.sD.message}</span>
                                    )}
                                </div>
                                <div className="col-4 position-relative">
                                    <input type="time"
                                        className="form-control"
                                        id="pickupTime"
                                        {...register('sT', { required: 'Pick-up time is required!' })}
                                    />
                                    {errors.sT && (
                                        <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.sT.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <label htmlFor="returnDate" className="form-label text-white fw-semibold">DROP-OFF DATE AND TIME</label>
                            <div className="row">
                                <div className="col-8 position-relative">
                                    <input type="date"
                                        className="form-control"
                                        id="returnDate"
                                        {...register('eD', { required: 'Drop-off date is required!' })}
                                    />
                                    {errors.eD && (
                                        <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.eD.message}</span>
                                    )}
                                </div>
                                <div className="col-4 position-relative">
                                    <input type="time"
                                        className="form-control"
                                        id="returnTime"
                                        {...register('eT', { required: 'Drop-off time is required!' })}
                                    />
                                    {errors.eT && (
                                        <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.eT.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-dark px-5">SEARCH</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}