import convertToLocalDateTime from './convertToLocalDateTime'

const checkReturnDateTime = (pickupDate, pickupTime, returnDate, returnTime) => {
    const pickupDateTime = convertToLocalDateTime(pickupDate, pickupTime)
    const returnDateTime = convertToLocalDateTime(returnDate, returnTime)
    return returnDateTime > pickupDateTime
}

export default checkReturnDateTime