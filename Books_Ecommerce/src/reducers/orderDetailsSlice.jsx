import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const orderDetailsSlice = createSlice({
    name: "ORDER_INFO",
    initialState,
    reducers: {
        setOrderDetails(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setOrderDetails } = orderDetailsSlice.actions
export default orderDetailsSlice