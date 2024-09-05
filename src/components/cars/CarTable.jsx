import { Link } from "react-router-dom";
import { convertToQueryParams, currencyFormat } from "../../shared/utils";
import { useSelector } from "react-redux";
import { MULTIPLIED_AMOUNT } from '../../shared/constants'

export default function CarTable({cars = []}) {

    const searchInfor = useSelector(state => state.search)
    console.log(cars[0])

    return (
        <div className="overflow-x-auto mb-3 custom-croll">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Ratings</th>
                        {/* <th scope="col" className="text-nowrap">No. of Rides</th> */}
                        <th scope="col">Price</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((item, index) => 
                        <tr key={item?.id || index}>
                            <th scope="row" className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center">{item?.id}</div>
                            </th>
                            <td className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center text-nowrap">{item?.name}</div>
                            </td>
                            <td className="vertical-align-middle">
                                <div className="d-flex align-items-center">
                                    <div className="d-block position-relative"
                                        style={{
                                            width: 150,
                                            paddingTop: '66%'
                                        }}
                                    >
                                        <img src={item?.images?.[0]?.imageUrl}
                                            alt=""
                                            className="position-absolute top-0 start-0 w-100 h-100"
                                            style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                </div>
                            </td>
                            <td className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center">{item?.rating ?? <span className="fs-7"><i>(No ratings yet)</i></span>}</div>
                            </td>
                            {/* <td className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center">{item?.numberOfSeats}</div>
                            </td> */}
                            <td className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center">{currencyFormat((item?.basePrice ?? 0) * MULTIPLIED_AMOUNT / 1000, 'VND', false)}k/day</div>
                            </td>
                            <td className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center text-nowrap">{item?.address}</div>
                            </td>
                            <td className="vertical-align-middle">
                                <div className="d-flex h-100 align-items-center">
                                    {(item?.isAvailable && !item?.isStopped) && <span className="text-success">Available</span>}
                                    {item?.isStopped && <span className="text-danger">Stopped</span> }
                                </div>
                            </td>
                            <td className="vertical-align-middle">
                                <div className="d-flex flex-column">
                                    <Link to={`/rent-car?carId=${item?.id}&${convertToQueryParams(searchInfor)}`} className="btn btn-primary mb-2 text-nowrap">Rent now</Link>
                                    <Link to={`/cars/${item?.id}`} className="btn btn-primary text-nowrap">View details</Link>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}