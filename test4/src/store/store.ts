import { configureStore } from '@reduxjs/toolkit'
import { exerciseApi } from './exerciseApiSlice' 
import exerciseSlice from './exerciseSlice'
export const store = configureStore({
  reducer: {
    exercise :exerciseSlice,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exerciseApi.middleware),
})






export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch