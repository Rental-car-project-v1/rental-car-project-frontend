export default function parseAddress(address = '') {
    const defaultAddress = ['', '', '', '']
    const parts = address?.split(',') || []

    let k = 3
    for(let i = parts.length - 1; i >= 0; i--) {
        if(k < 0) {
            let tmp = defaultAddress[0]
            defaultAddress[0] = parts[i] + ', ' + tmp
        } else {
            defaultAddress[k] = parts[i].trim()
            k--
        }
    }

    return {
        houseNumber: defaultAddress[0],
        ward: defaultAddress[1],
        district: defaultAddress[2],
        city: defaultAddress[3]
    }
}