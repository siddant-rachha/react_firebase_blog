import { configureStore } from '@reduxjs/toolkit'
import modelSliceReducer from './modelSlice'

export const store = configureStore({
  reducer: {
    model: modelSliceReducer
  },
})