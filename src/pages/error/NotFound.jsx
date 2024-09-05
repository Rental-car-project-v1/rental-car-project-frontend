import { Link } from "react-router-dom"
import img from '../../assets/404-error.svg'

export default function NotFound() {
    return (
        <div className="container">
            <div className="py-5 custom-h-screen">
                <div className="row justify-content-center">
                    <div className="col-6 col-md-3">
                        <img src={img} alt="" className="w-100"/>
                    </div>
                    <div className="col-12">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h1>404 - Page Not Found</h1>
                            <p>Sorry, the page you are looking for does not exist.</p>
                            <Link to="/" className="btn btn-primary">Go to Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}