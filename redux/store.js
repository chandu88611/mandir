import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import authReducer from "./slices/authSlice";
import { campaignApi } from "./services/campaignApi";

const setUpStore = () => {
  const store = configureStore({
    reducer: {
      [campaignApi.reducerPath]: campaignApi.reducer,

      //Frontend

      auth: authReducer,
    },
    middleware: (getDM) => [...getDM(), campaignApi.middleware],
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = setUpStore();
