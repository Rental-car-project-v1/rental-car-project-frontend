import { currencyFormat, formatDateTime } from "../../shared/utils"
import { MULTIPLIED_AMOUNT } from '../../shared/constants'
import EmptyState from "../EmptyState"

export default function TransactionsTable({transactions = []}) {

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Type</th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Booking No</th>
                    <th scope="col">Car Name</th>
                </tr>
            </thead>
            <tbody>
                {transactions?.length == 0 && <tr>
                    <td colSpan={6}>
                        <EmptyState />
                    </td>
                </tr>}
                {transactions?.map((item, index) => <tr key={item?.id ?? index}>
                    <td>{item?.id ?? (index + 1)}</td>
                    <td>{currencyFormat(item?.amount * MULTIPLIED_AMOUNT, 'VND', false)} VND</td>
                    <td>{item?.transactionTypeTitle}</td>
                    <td>{formatDateTime(item?.createdAt)}</td>
                    <td>{item?.bookingId || 'N/A'}</td>
                    <td>{item?.carName || 'N/A'}</td>
                </tr>)}
            </tbody>
        </table>
    )

}