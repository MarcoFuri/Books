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
        },
        clearQuantityCart() {
            return 0
        }, 
        setQuantityCart(state, action) {
            return action.payload
        }
    }
})

export const { increaseQuantity, decreaseQuantity, clearQuantityCart, setQuantityCart } = cartQuantitySlice.actions
export default cartQuantitySlice