import { configureStore } from "@reduxjs/toolkit";
import roorReducer from "./rootreducer";
export const makeStore = () => {
  return configureStore({
    reducer: roorReducer,
  });
};
