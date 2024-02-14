import { configureStore, combineReducers } from "@reduxjs/toolkit"
import querySearchSlice from "../reducers/querySearchSlice"
import modifyCartSlice from "../reducers/modifyCartSlice"
import cartQuantitySlice from "../reducers/cartQuantitySlice"
import orderDetailsSlice from "../reducers/orderDetailsSlice"

const rootReducer = combineReducers({
    querySearch: querySearchSlice.reducer,
    cartItems: modifyCartSlice.reducer,
    cartQuantity: cartQuantitySlice.reducer,
    orderDetails: orderDetailsSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store
