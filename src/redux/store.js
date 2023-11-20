import { configureStore, combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slice/authSlice";
import errorReducer from "./slice/errorSlice"
import productReducer from "./slice/productsSlice"
import cartReducer  from "./slice/cartSlice";
import profileReducer from "./slice/profileSlice";
import updateProfileReducer from "./slice/updateProfileSlice"
import commentReducer from "./slice/commentSlice"



const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    products : productReducer,
    cart : cartReducer,
    profile: profileReducer,
    updateProfile :updateProfileReducer,
    comment: commentReducer,
  });



  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }), 
  });

  export default store;