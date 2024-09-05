import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import searchResultsDisplayTypeReducer from './searchResultsDisplayTypeSlice'
import searchReducer from './searchSlice'
import authModalReducer from './authModalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authModal: authModalReducer,
    searchResultsDisplayType: searchResultsDisplayTypeReducer,
    search: searchReducer
  },
})