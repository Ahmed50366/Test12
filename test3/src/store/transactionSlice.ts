import { createSlice } from "@reduxjs/toolkit";




export interface TransactionState {
    transactions: any[]
}

const initialState: TransactionState = {
    transactions: []
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.transactions.unshift(action.payload)
        },

        updateTransaction: (state, action) => {
            state.transactions = state.transactions.map((transaction: any) =>
                transaction.id === action.payload.id ? { ...transaction, ...action.payload } : transaction)
        },

        deleteTransaction: (state, action) => {
            state.transactions = state.transactions.filter((transaction: any) => transaction.id !== action.payload)
        },
       
    },

})
export const {
    addTransaction,
    updateTransaction,
    deleteTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;


  