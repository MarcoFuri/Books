import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    
]

const modifyCartSlice = createSlice({
    name: "MODIFY_CART",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload
            const indexItem = state.findIndex(item => item.id === action.payload.id)

            if (indexItem !== -1) {
                state[indexItem].quantity += 1
            } else {
                newItem.quantity = 1
                state.push(newItem)
            }
        },
        removeItem(state, action) {
            let indexItem = state.findIndex(item => item.id === action.payload.id)
            if (indexItem !== -1){
                if(state[indexItem].quantity > 1){
                    state[indexItem].quantity -= 1
                } else {
                    state.splice(indexItem, 1)
                }
            }
        }
    }
})

export const { removeItem } = modifyCartSlice.actions
export const { addItem } = modifyCartSlice.actions
export default modifyCartSlice