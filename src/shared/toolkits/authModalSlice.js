import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    show: false
}

export const authModalSlice = createSlice({
    name: 'authModal',
    initialState,
    reducers: {
        setShowAuthModal: (state, action) => {
            state.show = action.payload
        }
    }
})

export const { setShowAuthModal } = authModalSlice.actions

export default authModalSlice.reducer