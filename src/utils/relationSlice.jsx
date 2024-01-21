import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("relationState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("relationState", serializedState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

const relationSlice = createSlice({
  name: "relation",
  initialState: loadState() || {
    followedUsers: {},
  },
  reducers: {
    followUser: (state, action) => {
      const currentUserId = action.payload.currentUserId;
      const followedUserId = action.payload.followedUserId;

      if (!state.followedUsers[currentUserId]) {
        state.followedUsers[currentUserId] = [];
      }

      if (!state.followedUsers[currentUserId]?.includes(followedUserId)) {
      state.followedUsers[currentUserId].push(followedUserId);
        
      }

      saveState(state);
    },

  },
});

export const { followUser } = relationSlice.actions;
export default relationSlice.reducer;
