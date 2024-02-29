import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const orderDetailsSlice = createSlice({
    name: "ORDER_INFO",
    initialState,
    reducers: {
        setUserOrderDetails(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
        setUserCardDetails(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setUserOrderDetails, setUserCardDetails } = orderDetailsSlice.actions
export default orderDetailsSlice