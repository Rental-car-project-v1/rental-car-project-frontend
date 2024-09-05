const convertToLocalDateTime = (date, time) => {
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = time ? time.split(':').map(Number) : [0, 0]
    return new Date(year, month - 1, day, hours, minutes);
}

export default convertToLocalDateTime