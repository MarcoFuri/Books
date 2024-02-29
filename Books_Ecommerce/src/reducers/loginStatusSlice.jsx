import { createSlice } from "@reduxjs/toolkit"

const initialState = false

const loginStatusSlice = createSlice({
    name: "LOGIN_STATUS",
    initialState,
    reducers: {
        setLoggedIn() {
            return true
        },
        setLoggedOut() {
            return false
        }
    }
})

export const { setLoggedIn, setLoggedOut } = loginStatusSlice.actions
export default loginStatusSlice