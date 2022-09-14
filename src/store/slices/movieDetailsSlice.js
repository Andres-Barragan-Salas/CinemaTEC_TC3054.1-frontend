import { createSlice } from '@reduxjs/toolkit';

export const movieDetails = createSlice({
    name: 'movieDetails',
    initialState: {
        videoId: null,
        description: null,
        id: null
    },
    reducers: {
        setMovieDetails: (state, {payload}) => {
            const { videoId, description, id } = payload;
            state.videoId = videoId
            state.description = description
            state.id = id
        }
    }
});

export default movieDetails.reducer;
export const { setMovieDetails } = movieDetails.actions;
