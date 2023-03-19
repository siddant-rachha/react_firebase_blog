import { configureStore } from '@reduxjs/toolkit'
import {modelSliceReducers} from './modelSlice'
import {isAuthReducers} from './isAuthSlice'

export const store = configureStore({
  reducer: {
    model: modelSliceReducers,
    auth: isAuthReducers
  },
})