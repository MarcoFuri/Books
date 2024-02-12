import { createSlice } from "@reduxjs/toolkit"

const initialState = 0

const cartQuantitySlice = createSlice({
    name: "CART_QUANTITY",
    initialState, 
    reducers: {
        increaseQuantity(state) {
            return state + 1
        },
        decreaseQuantity(state) {
            return state - 1
        }
    }
})

export const { increaseQuantity, decreaseQuantity } = cartQuantitySlice.actions
export default cartQuantitySlice