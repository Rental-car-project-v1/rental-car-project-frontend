import { useNavigate } from 'react-router-dom'
import img from '../../assets/error-loading.svg'

export default function RequestError() {

    const navigate = useNavigate()

    const handlePageRefresh = () => {
        navigate(window.location.pathname + window.location.search, { replace: true })
    }

    return (
        <div className="container">
            <div className="py-5 custom-h-screen">
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3">
                        <img src={img} alt="" className="w-100"/>
                    </div>
                    <div className="col-12">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h5 className="my-5 mb-3">We'll be right back!</h5>
                            <p>There was an error processing your request. Please check your internet connection or try apain later.</p>
                            <button className="btn btn-primary fw-semibold" onClick={handlePageRefresh}>Try Again</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}