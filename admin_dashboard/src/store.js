import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './App'

export const store = configureStore({
  reducer: reducer
})