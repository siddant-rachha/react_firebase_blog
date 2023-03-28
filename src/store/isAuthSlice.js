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
      if (action.payload.displayName!=undefined) state.displayName = action.payload.displayName
      if (action.payload.uid!=undefined)  state.uid = action.payload.uid
      if (action.payload.isAuth!=undefined)  state.isAuth = action.payload.isAuth
      if (action.payload.email!=undefined)  state.email = action.payload.email
    }
  },
})

// Action creators are generated for each case reducer function
export const isAuthActions =  isAuthSlice.actions

export const isAuthReducers =  isAuthSlice.reducer