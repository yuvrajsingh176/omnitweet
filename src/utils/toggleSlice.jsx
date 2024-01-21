import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    feed: false,
    users: false,
    profile: false,
    post: true,
    follower:false
  },
  reducers: {
    togglefeed: (state) => {
      state.feed = true;
      state.users = false;
      state.profile = false;
    },
    toggleusers: (state) => {
      state.feed = false;
      state.users = true;
      state.profile = false;
    },
    toggleprofile: (state) => {
      state.feed = false;
      state.users = false;
      state.profile = true;
    },
    togglepost: (state) => {
      state.post = true;
      state.follower = false;
    },
    togglefollower: (state) => {
      state.post = false;
      state.follower = true;
    },
  },
});

export const { togglefeed, toggleprofile, toggleusers,togglefollower,togglepost } = toggleSlice.actions;
export default toggleSlice.reducer;
