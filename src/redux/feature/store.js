import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import userSlice from "./user/userSlice";
import serviceSlice from "./service/serviceSlice";
import providerServiceSlice from "./service/providerServiceSlice";
import reviewSlice from "./review/reviewSlice";
import cateSlice from "./category/cateSlice";
import locationSlice from "./location/locationSlice";

// Save the state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.warn(e);
  }
};

// Load the state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    user: userSlice,
    services: serviceSlice,
    proservices: providerServiceSlice,
    reviews: reviewSlice,
    categories: cateSlice,
    location: locationSlice,  
  },
  preloadedState: persistedState,
});
store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export { store };
