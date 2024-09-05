const ACCESS_TOKEN = 'access_token'
const USER = 'rental_car_user'
const DISPLAY_TYPE = 'rental_car_search_results_display_type'
const SEARCH_LOCATION = 'rental_car_search_location'

export const setSearchResultsDisplayType = (type) => {
    localStorage.setItem(DISPLAY_TYPE, type)
}

export const getSearchResultsDisplayType = () => {
    const type = localStorage.getItem(DISPLAY_TYPE)
    if(type !== 'GRID' && type !== 'TABLE') return 'GRID'
    return  type
}

export const setSearchLocation = (addr) => {
    localStorage.setItem(SEARCH_LOCATION, addr)
}

export const getSearchLocation = () => {
    return localStorage.getItem(SEARCH_LOCATION)
}

export const setToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token)
}

export const setUser = (user) => {
    localStorage.setItem(USER, JSON.stringify(user))
}

export const getUser = () => {
    const user = localStorage.getItem(USER)
    return user ? JSON.parse(user) : null
}

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
}

export const isLogin = () => {
    const token = getToken()
    const user = getUser()
    return token && user && user?.userType
}

export const removeLoginInfo = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(USER)
}