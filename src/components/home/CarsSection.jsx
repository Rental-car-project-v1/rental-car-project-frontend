import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getCarsApi } from "../../shared/apis/carApi"
import CarGrid from "../cars/CarGrid"
import LoadingState from "../LoadingState"
import { Link } from "react-router-dom"

export default function CarsSection() {

    const [cars, setCars] = useState([])
    const searchInfor = useSelector(state => state.search)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
        getCarsApi(0, 5, "id:desc", {...searchInfor, location: ''}).then(data => {
            setCars(data?.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <section id="cars" className="py-4">
            <div className="container">
                <h1 className="text-center text-md-start">Suggestions for you</h1>
                <div className="py-3">
                    {loading && <LoadingState />}
                    {!loading && <CarGrid cars={cars}/>}
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/search" className="px-4 py-2 text-white rounded border-0 bg-rt-primary">SEE MORE</Link>
                </div>
            </div>
        </section>
    )
}