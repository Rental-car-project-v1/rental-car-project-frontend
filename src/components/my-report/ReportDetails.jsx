import { useCallback, useEffect, useState } from "react"
import StarRatingSelect from "../modals/StarRatingSelect"
import EmptyState from "../EmptyState"
import LoadingState from "../LoadingState"
import CustomPagination from "../paginations/CustomPagination"
import { getMyFeedbackApi } from "../../shared/apis/feedbackApi"
import FeedbackList from "./FeedbackList"

export default function ReportDetails() {

    const ratings = [
        { stars: 5, count: 120 },
        { stars: 4, count: 75 },
        { stars: 3, count: 40 },
        { stars: 2, count: 15 },
        { stars: 1, count: 5 }
    ]

    const [feedbacks, setFeedbacks] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState('ALL')
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [total, setTotal] = useState(1)

    useEffect(() => {
        setLoading(true)
        getMyFeedbackApi(currentPage, perPage, rating).then(data => {
            setFeedbacks(data?.data || [])
            const meta = data?.meta
            if (meta?.totalPages !== total) setTotal(meta?.totalPages ?? 1)
            if (meta?.currentPage + 1 !== currentPage) setCurrentPage((meta?.currentPage ?? 0) + 1)
        }).finally(() => {
            setLoading(false)
        })
    }, [rating, perPage, currentPage])
    
    const handleRatingChange = (data) => {
        setCurrentPage(1)
        setRating(data)
    }
    
    const handlePerPageChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10)
        if (value < 1) setPerPage(1)
        else setPerPage(value)
    }, [])

    return (
        <>
            <div>
              <h5>Details</h5>
              <StarRatingSelect ratings={ratings} value={rating} onSelected={handleRatingChange}/>
            </div>
            <div>
              {(feedbacks?.length === 0 && !loading) && <EmptyState />}
              {loading && <LoadingState />}
              {(feedbacks?.length > 0 && !loading) && <FeedbackList feedbacks={feedbacks}/>}
            </div>
            <div className="row">
                <div className="col d-flex flex-column flex-md-row justify-content-end align-items-center">
                    <CustomPagination currentPage={currentPage} totalPages={total} onPageChange={page => setCurrentPage(page)} />
                    <div className="d-flex align-items-center mb-3 ms-md-2">
                        <input type="number"
                            id="carPerPage"
                            className="form-control"
                            style={{width:80}}
                            value={perPage}
                            min={1}
                            onChange={handlePerPageChange}/>
                        <label htmlFor="carPerPage" className="ms-2 col-form-label">per page</label>
                    </div>
                </div>
            </div>
        </>
    )
}