// Packages
import { configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware } from "redux-state-sync";

// Reducers
import rootReducer from "@/redux/reducers";

// Utils
import { appInsights } from "@/util/app-insights";

// Middleware
const middlewares = [];
try {
  middlewares.push(createStateSyncMiddleware());
} catch (error) {
  appInsights.trackException({ exception: error });
}

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== "production",
});
