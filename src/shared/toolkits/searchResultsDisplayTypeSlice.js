import { createSlice } from "@reduxjs/toolkit";
import { getSearchResultsDisplayType, setSearchResultsDisplayType } from "../services/storageService";

const initialState = {
    displayType: getSearchResultsDisplayType()
}

export const searchResultsDisplayTypeSlice = createSlice({
    name: 'searchResultsDisplayType',
    initialState,
    reducers: {
        setDisplayType: (state, action) => {
            const type = action.payload
            state.displayType = type
            setSearchResultsDisplayType(type)
        }
    }
})

export const { setDisplayType } = searchResultsDisplayTypeSlice.actions

export default searchResultsDisplayTypeSlice.reducer