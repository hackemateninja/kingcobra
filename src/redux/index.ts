// Packages
import { configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware } from 'redux-state-sync';

// Middleware
const stateSync = [createStateSyncMiddleware()];

// Reducers
import rootReducer from "@/redux/reducers";

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateSync),
  devTools: process.env.NODE_ENV !== "production",
});
