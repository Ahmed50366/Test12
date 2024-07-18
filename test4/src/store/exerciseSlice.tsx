import { createSlice } from "@reduxjs/toolkit";




export interface TransactionState {
    exercises: any[]
}

const initialState: TransactionState = {
    exercises: []
}

export const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: initialState,
    reducers: {
        addExercise: (state, action) => {
            state.exercises.unshift(action.payload)
        },

        updateExercise: (state, action) => {
            state.exercises = state.exercises.map((exercise: any) =>
                exercise.id === action.payload.id ? { ...exercise, ...action.payload } : exercise)
        },

        deleteExercise: (state, action) => {
            state.exercises = state.exercises.filter((exercise: any) => exercise.id !== action.payload)
        },
       
    },

})
export const {
    addExercise,
    updateExercise,
    deleteExercise,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;


  