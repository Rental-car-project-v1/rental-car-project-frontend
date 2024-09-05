import { useCallback, useEffect, useState } from "react"
import SearchForm from "../components/forms/SearchForm"
import BreadCrumb from "../components/BreadCrumb"
import CustomPagination from "../components/paginations/CustomPagination"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import CarGrid from '../components/cars/CarGrid'
import CarTable from '../components/cars/CarTable'
import { BsFillGridFill } from "react-icons/bs"
import clsx from "clsx"
import { FaListUl } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"
import { setDisplayType } from '../shared/toolkits/searchResultsDisplayTypeSlice'
import { getCarsApi } from "../shared/apis/carApi"

export default function Search() {

    const [perPage, setPerPage] = useState(3)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [sortType, setSortType] = useState('id:desc')
    const [loading, setLoading] = useState(true)
    const [cars, setCars] = useState([])
    const searchInfor = useSelector(state => state.search)
    const { displayType } = useSelector(state => state.searchResultsDisplayType)
    const dispatch = useDispatch()

    useEffect(() => {
        setLoading(true)
        getCarsApi(currentPage, perPage, sortType, searchInfor).then(data => {
            setCars(data?.data)
            const meta = data?.meta
            setTotalItems(meta?.totalItems)
            if (meta?.totalPages !== totalPages) setTotalPages(meta?.totalPages)
            if (meta?.currentPage + 1 !== currentPage) setCurrentPage(meta?.currentPage + 1)
        }).finally(() => {
            setLoading(false)
        })
    }, [perPage, currentPage, sortType, searchInfor])

    const handlePerPageChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10)
        if (value < 1) setPerPage(1)
        else setPerPage(value)
    }, [])

    return (
        <>
            <BreadCrumb links={[
                {
                    path: '/',
                    name: 'Home'
                },
                {
                    name: 'Search Results'
                }
            ]}/>
            <SearchForm />
            <div className="container">
                <div className="row mb-4">
                    <h1>Search Results</h1>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <span>There is { totalItems } cars that are available for your!</span>
                    </div>
                    <div className="col-md-6">
                        <div className="ms-md-auto d-flex align-items-center w-content gap-2">
                            <button onClick={() => displayType !== 'GRID' ? dispatch(setDisplayType('GRID')) : null}
                                className={clsx('border btn d-flex align-items-center py-1 px-1',
                                    displayType === 'GRID' ? 'text-primary border-primary' : ''
                                )}
                            >
                                <BsFillGridFill size={26}/>
                            </button>
                            <button onClick={() => displayType !== 'TABLE' ? dispatch(setDisplayType('TABLE')) : null}
                                className={clsx('border btn d-flex align-items-center py-1 px-1',
                                    displayType === 'TABLE' ? 'text-primary border-primary' : ''
                                )}
                            >
                                <FaListUl size={26}/>
                            </button>
                            <select className="form-select w-content"
                                aria-label="Sort cars"
                                value={sortType}
                                onChange={e => setSortType(e.target.value)}>
                                <option value="id:desc">Newest to Lastest</option>
                                <option value="id:asc">Lastest to Newest</option>
                                <option value="basePrice:desc">Price High to Low</option>
                                <option value="basePrice:asc">Price Low to High</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    {((!cars || cars?.length === 0) && loading) && <div className="py-5 my-4"><LoadingState /></div>}
                    {((!cars || cars?.length === 0) && !loading) && <div className="py-5 my-4"><EmptyState /></div>}
                    {(cars?.length > 0 && !loading) && (
                        <>
                            {displayType === 'GRID' && <CarGrid cars={cars}/>}
                            {displayType === 'TABLE' && <CarTable cars={cars}/>}
                        </>
                    )}
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex flex-column flex-md-row justify-content-end align-items-center">
                        <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={page => setCurrentPage(page)} />
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
            </div>
        </>
    )
}