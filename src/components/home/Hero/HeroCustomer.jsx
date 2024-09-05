import clsx from "clsx";
import styles from './styles.module.css'
import background from '../../../assets/background.svg'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { setSearchInfor } from "../../../shared/toolkits/searchSlice";
import { useNavigate } from "react-router-dom";
import { checkReturnDateTime, convertToLocalDateTime } from "../../../shared/utils";

export default function HeroCustomer() {

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm()
    const searchInfor = useSelector(state => state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        reset(searchInfor)
    }, [searchInfor, reset])

    const onSubmit = (data) => {
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
        navigate('/search')
    }

    return (
        <section  id="hero"
            className={clsx("hero d-flex align-items-center", styles.hero)}
            style={{
                backgroundImage: `url(${background})`
            }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 d-flex flex-column justify-content-center py-3" data-aos="fade-up">
                        <h1 className="mb-3">Looking for a vehicle?<br/>You're at the right place.</h1>
                        <p className="fs-5.5">We have a large selection of locally owned cars
                            available for you to choose from. Rental plans are
                            customized to suit your needs.</p>
                        <p className="fs-5.5">With over 300 cars located nationwide we will have something for you.</p>
                    </div>
                    <div className="col-lg-7 d-flex flex-column justify-content-center">
                        <form action="" onSubmit={handleSubmit(onSubmit)}>
                            <div className={clsx("p-4", styles.search_form)}>
                                <h2 className="mb-3">Find the ideal car rental for your trip</h2>
                                <div className="row mb-3">
                                    <div className="col-12 position-relative">
                                        <label htmlFor="pickUpLoaction" className="form-label fw-bold">PICK-UP LOCATION</label>
                                        <input type="text"
                                            className="form-control"
                                            id="pickUpLoaction"
                                            name="pickUpLocation"
                                            placeholder="Enter your location"
                                            {...register('location', { required: 'Please provide a pick-up location!' })}
                                        />
                                        {errors.location && (
                                            <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.location.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="pickUpDate" className="form-label fw-bold">PICK-UP DATE AND TIME</label>
                                    </div>
                                    <div className="col-8 position-relative">
                                        <input type="date"
                                            className="form-control"
                                            id="pickUpDate"
                                            name="pickUpDate"
                                            {...register('sD', { required: 'Pick-up date is required!' })}
                                        />
                                        {errors.sD && (
                                            <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.sD.message}</span>
                                        )}
                                    </div>
                                    <div className="col-4 position-relative">
                                        <input type="time"
                                            className="form-control"
                                            id="pickUpTime"
                                            name="pickUpTime"
                                            {...register('sT', { required: 'Pick-up time is required!' })}
                                        />
                                        {errors.sT && (
                                            <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.sT.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <label htmlFor="dropOffDate" className="form-label fw-bold">DROP-OFF DATE AND TIME</label>
                                    </div>
                                    <div className="col-8 position-relative">
                                        <input type="date"
                                            className="form-control"
                                            id="dropOffDate"
                                            name="dropOffDate"
                                            {...register('eD', { required: 'Drop-off date is required!' })}
                                        />
                                        {errors.eD && (
                                            <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.eD.message}</span>
                                        )}
                                    </div>
                                    <div className="col-4 position-relative">
                                        <input type="time"
                                            className="form-control"
                                            id="dropOffTime"
                                            name="dropOffTime"
                                            {...register('eT', { required: 'Drop-off time is required!' })}
                                        />
                                        {errors.eT && (
                                            <span className="fs-7 text-white rounded px-2 position-absolute top-100 mt-1 bg-danger">{errors.eT.message}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center">
                                        <button type="submit" className="btn btn-dark">SEARCH</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}