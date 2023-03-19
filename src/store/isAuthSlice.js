import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  uid: "",
  displayName: ""
}

export const isAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
        state.displayName = action.payload.displayName
        state.uid = action.payload.uid
        state.isAuth = action.payload.isAuth
    }
  },
})

// Action creators are generated for each case reducer function
export const isAuthActions =  isAuthSlice.actions

export const isAuthReducers =  isAuthSlice.reducer