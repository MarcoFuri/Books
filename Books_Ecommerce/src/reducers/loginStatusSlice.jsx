import { createSlice } from "@reduxjs/toolkit"

const initialState = false

const loginStatusSlice = createSlice({
    name: "LOGIN_STATUS",
    initialState,
    reducers: {
        setLoggedIn(state) {
            return !state
        },
        setLoggedOut(state) {
            return !state
        }
    }
})

export const { setLoggedIn, setLoggedOut } = loginStatusSlice.actions
export default loginStatusSlice