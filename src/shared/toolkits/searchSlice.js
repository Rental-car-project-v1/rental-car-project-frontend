import { createSlice } from "@reduxjs/toolkit";
import { getSearchLocation, setSearchLocation } from "../services/storageService";

const addDays = (date, days) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

const today = new Date()
const nextHour = new Date(today)
nextHour.setHours(today.getHours() + 1)

const initialState = {
    location: getSearchLocation(),
    sD: formatDate(nextHour),
    sT: formatTime(nextHour),
    eD: formatDate(addDays(nextHour, 2)),
    eT: formatTime(nextHour),
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchInfor: (state, action) => {
            state.location = action.payload?.location
            state.sD = action.payload?.sD
            state.sT = action.payload?.sT
            state.eD = action.payload?.eD
            state.eeT = action.payload?.eT
            setSearchLocation(action.payload.location)
        }
    }
})

export const { setSearchInfor } = searchSlice.actions

export default searchSlice.reducer