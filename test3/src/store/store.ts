import { configureStore } from '@reduxjs/toolkit'
import transactionSlice from './transactionSlice'
import budgetSlice from './budgetSlice'


export const store = configureStore({
  reducer: {
    transaction: transactionSlice,
    budget : budgetSlice
  },
})






export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch