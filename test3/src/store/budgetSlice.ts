import { createSlice } from "@reduxjs/toolkit";

export interface Budget {
    category: string;
    amount: number;
}

export interface BudgetState {
    budgets: Budget[];
}

const initialState: BudgetState = {
    budgets: []
};

export const budgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        updateBudget: (state, action) => {
            const existingBudget = state.budgets.find(budget => budget.category === action.payload.category);
            if (existingBudget) {
                existingBudget.amount = action.payload.amount;
            } else {
                state.budgets.push(action.payload);
            }
        },
        deleteBudget: (state, action) => {
            state.budgets = state.budgets.filter(budget => budget.category !== action.payload);
        }
    }
});

export const { updateBudget, deleteBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
