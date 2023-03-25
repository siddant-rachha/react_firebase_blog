import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  uid: "",
  displayName: "",
  email:""
}

export const isAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
        state.displayName = action.payload.displayName
        state.uid = action.payload.uid
        state.isAuth = action.payload.isAuth
        state.email = action.payload.email
    }
  },
})

// Action creators are generated for each case reducer function
export const isAuthActions =  isAuthSlice.actions

export const isAuthReducers =  isAuthSlice.reducer