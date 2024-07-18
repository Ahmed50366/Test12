import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exerciseApi = createApi({
    reducerPath: "exerciseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://exercisedb.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'fd67cd10cfmshb87f6e8f51d9f7ep1d1896jsnb24e1ed25be1')
            headers.set( 'x-rapidapi-host', 'exercisedb.p.rapidapi.com')
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllExercises: builder.query({
            query: () => "exercises",
        }),

    }),
})

export const { useGetAllExercisesQuery } = exerciseApi   
