import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        email: null,
        likedMovies: [],
        unlikedMovies: [],
        purchesedMovies: []
    },
    reducers: {
        setUser: (_state, { payload }) => {
            return { ...payload };
        },
        resetUser: () => {
            return { username: null, email: null, likedMovies: [], unlikedMovies: [], purchasedMovies: [] };
        }
    }
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
