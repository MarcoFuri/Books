import { configureStore, combineReducers } from "@reduxjs/toolkit"
import querySearchSlice from "../reducers/querySearchSlice"
import modifyCartSlice from "../reducers/modifyCartSlice"
import cartQuantitySlice from "../reducers/cartQuantitySlice"
import loginStatusSlice from "../reducers/loginStatusSlice"
import userLoggedSlice from "../reducers/userLoggedSlice"


const rootReducer = combineReducers({
    querySearch: querySearchSlice.reducer,
    cartItems: modifyCartSlice.reducer,
    cartQuantity: cartQuantitySlice.reducer,
    loginStatus: loginStatusSlice.reducer,
    userLogged: userLoggedSlice.reducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store
