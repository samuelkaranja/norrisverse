import { configureStore } from "@reduxjs/toolkit";
import jokeReducer from "./Slices/jokeSlice";

export const Store = configureStore({
  reducer: {
    joke: jokeReducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
