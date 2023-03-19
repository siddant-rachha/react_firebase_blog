import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false
}

export const isAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const isAuthActions =  isAuthSlice.actions

export default isAuthSlice.reducer