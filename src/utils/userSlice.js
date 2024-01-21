import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error("Error loading state from local storage:", error);
    return undefined;
  }
};

const saveState = (state) => {
    console.log("yes")
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (error) {
    console.error("Error saving state to local storage:", error);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: loadState() || {
    currentUser: null,
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload;
      console.log(newUser)
        state.currentUser = newUser;
        state.users.push(newUser);
      saveState(state);

    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.currentUser = updatedUser;
      // You might want to update the user in the 'users' array as well
      const userIndex = state.users.findIndex((user) => user?.uid === updatedUser.uid);
      if (userIndex !== -1) {
        state.users[userIndex] = updatedUser;
      }
      saveState(state);
    },
    removeUser: (state, action) => {
      // Handle remove user logic
      saveState(state);
    },
    getAllusers: (state) => {
      const allLogged = state.users;
      return allLogged.filter((user) => user.uid !== state.currentUser.uid);
    },
  },
});



export default userSlice.reducer;
export const { addUser, removeUser, getAllusers,updateUser } = userSlice.actions;
