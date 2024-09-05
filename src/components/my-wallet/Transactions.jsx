import { useEffect, useState } from "react"
import TransactionsTable from './TransactionsTable'
import CustomPagination from './../paginations/CustomPagination'
import { getTransactionsApi } from "../../shared/apis/transactionApi"
import TransactionFilterForm from "./TransactionFilterForm"
import LoadingState from "../LoadingState"

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

export default function Transactions() {

    const today = new Date()
    const [loading, setLoading] = useState(true)
    const [transactions, setTransactions] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [total, setTotal] = useState(0)
    const [dateFilter, setDateFilter] = useState({
        startTime: formatDate(addDays(today, -30)),
        endTime: formatDate(today)
    })

    useEffect(() => {
        setLoading(true)
        getTransactionsApi(currentPage, perPage, 'created_at:desc', dateFilter).then(data => {
            setTransactions(data?.data ?? [])
            const meta = data?.meta
            if (meta?.totalPages !== total) setTotal(meta?.totalPages ?? 0)
            if (meta?.currentPage + 1 !== currentPage) setCurrentPage((meta?.currentPage ?? 0) + 1)
        }).finally(() => {
            setLoading(false)
        })
    }, [perPage, currentPage, dateFilter])

    const onSubmit = (data) => {
        setCurrentPage(1)
        setDateFilter(data)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const handlePerPageChange = e => {
        setCurrentPage(1)
        if(e.target.value < 1) setPerPage(1)
        else setPerPage(e.target.value)
    }

    return (
        <>
            <div className="row transactions">
                <div className="col-12 fw-bold mb-3">Transactions</div>
            </div>
            <TransactionFilterForm initialValue={dateFilter} onSubmit={onSubmit}/>
            <div className="row mb-3">
                {loading ? <LoadingState /> : <TransactionsTable transactions={transactions}/>}
            </div>
            <div className="row">
                <div className="col d-flex flex-column flex-md-row justify-content-end align-items-center">
                    <CustomPagination currentPage={currentPage} totalPages={total} onPageChange={handlePageChange} />
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