import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  uid: ""
}

export const isAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
        state = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const isAuthActions =  isAuthSlice.actions

export const isAuthReducers =  isAuthSlice.reducer