import { configureStore } from '@reduxjs/toolkit'
import {modelSliceReducers} from './modelSlice'
import {isAuthReducers} from './isAuthSlice'
import { postSliceReducers } from './postSlice'

export const store = configureStore({
  reducer: {
    model: modelSliceReducers,
    authState: isAuthReducers,
    post: postSliceReducers
  }
})