import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function TransactionFilterForm({initialValue, onSubmit = () => {}}) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    useEffect(() => {
        reset(initialValue)
    }, [initialValue, reset])

    const onHandleSubmit = (data) => {
        if(onSubmit) onSubmit(data)
    }

    return (
        <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
            <div className="row justify-content-between">
                <div className="col-md-4 mb-3 d-flex align-items-center position-relative">
                    <label htmlFor="transactionFrom" className="form-label me-2 fw-semibold mb-0">From</label>
                    <input
                        type="date"
                        className="form-control"
                        id="transactionFrom"
                        {...register("startTime", { required: "Start date is required!" })}
                    />
                    {errors.startTime && (
                        <span className="position-absolute top-100 text-danger fs-7">
                            {errors.startTime.message}
                        </span>
                    )}
                </div>
                <div className="col-md-4 mb-3 d-flex align-items-center position-relative">
                    <label htmlFor="transactionTo" className="form-label me-2 fw-semibold mb-0">To</label>
                    <input
                        type="date"
                        className="form-control"
                        id="transactionTo"
                        {...register("endTime", { required: "End date is required!" })}
                    />
                    {errors.endTime && (
                        <span className="position-absolute top-100 text-danger fs-7">
                            {errors.endTime.message}
                        </span>
                    )}
                </div>
                <div className="col-12 mb-3 d-flex">
                    <button type="submit" className="btn btn-primary ms-auto px-4">Search</button>
                </div>
            </div>
        </form>
    )
}