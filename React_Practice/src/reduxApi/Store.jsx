import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice";

// configureStore(): Simplifies store creation by combining reducers and automatically activating Redux DevTools extension.
export const Store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
