import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import toggleReducer from './toggleSlice';
import relationReducer from './relationSlice';
const appStore = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    toggle: toggleReducer,
    relation:relationReducer,
  
  },
});
export default appStore;
