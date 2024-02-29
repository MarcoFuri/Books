import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   
}

const userLoggedSlice = createSlice({
    name: "USER_LOGGED",
    initialState,
    reducers: {
        setUserLogged(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setUserLogged } = userLoggedSlice.actions
export default userLoggedSlice