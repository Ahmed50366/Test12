import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const movieApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.themoviedb.org/3/movie/now_playing",
    }),
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => "?api_key=dd20e49ad3ddf7e2d523def8dd5142d0",
        }),
    }),
})

export const { useGetAllMoviesQuery } = movieApi   
