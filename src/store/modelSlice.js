import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: "",
  display: false,
  btnFunction: "empty",
  pressed: false
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    setModel: (state, action) => {
        const {text, display, btnFunction, pressed} = action.payload
        if (text!=undefined) state.text = text
        if (display!=undefined) state.display = display
        if (btnFunction!=undefined) state.btnFunction = btnFunction
        if (pressed!=undefined) state.pressed = pressed
    }
  },
})

// Action creators are generated for each case reducer function
export const modelActions =  modelSlice.actions

export default modelSlice.reducer