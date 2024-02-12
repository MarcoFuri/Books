import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const querySearchSlice = createSlice({
    name: "QUERY_SEARCH",
    initialState,
    reducers: {
        replaceQueryValue(action) {
            return action.payload
        }
    }
})

export const {replaceQueryValue} = querySearchSlice.actions
export default querySearchSlice