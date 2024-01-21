import { createSlice } from "@reduxjs/toolkit";

// Retrieve user posts from localStorage if available
const storedUserPosts = localStorage.getItem('userPosts');
const initialUserPosts = storedUserPosts ? JSON.parse(storedUserPosts) : [];

const postSlice = createSlice({
    name: "posts",
    initialState: {
        userPosts: initialUserPosts,
    },
    reducers: {
        addPost: (state, action) => {
            state.userPosts.push(action.payload);

            // Save updated userPosts to localStorage
            localStorage.setItem('userPosts', JSON.stringify(state.userPosts));
        },
    },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
