import { createSlice } from "@reduxjs/toolkit"
import { getUser, isLogin, removeLoginInfo, setToken, setUser } from "../services/storageService"

const initialState = {
    isAuthenticated: isLogin(),
    user: getUser()
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUpdatedUser: (state, action) => {
            const updatedUser = action.payload
            if(updatedUser) {
                state.user = updatedUser
                setUser(updatedUser)
            } else console.warn('Can not update user in state because updatedUser is:', updatedUser)
        },
        login: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload.user
            setToken(action.payload.access_token)
            setUser(action.payload.user)
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            removeLoginInfo()
        }
    }
})

export const { setUpdatedUser, login, logout } = authSlice.actions

export default authSlice.reducer