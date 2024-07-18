import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Task {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    status:  string
}

export interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.unshift(action.payload)
        },

        updateTask: (state, action) => {
            state.tasks = state.tasks.map((task: any) =>
                task.id === action.payload.id ? { ...task, ...action.payload } : task)
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task: any) => task.id !== action.payload)
        },
       
    },

})
export const {
    addTask,
    updateTask,
    deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;


export const SortTask = (state: { task: TaskState }) =>
    state.task.tasks.sort((a,b) => a.dueDate.localeCompare(b.dueDate));    