import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  userUsername: localStorage.getItem('theUserusename'),
  userEmail: localStorage.getItem('theUserEmail'),
  userId: localStorage.getItem('theUserId'),
  userToken: localStorage.getItem('theUserToken'),
  userIsLogged: localStorage.getItem('theUserusename') ? true : false,
  serverError: false,
  openSnackLogin: false,
  disabledBtnLogin: false,
  sendRequestLogin: 0,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { userUsername, userEmail, userId, userToken } = action.payload;
      state.userUsername = userUsername;
      state.userEmail = userEmail;
      state.userId = userId;
      state.userToken = userToken;
      state.userIsLogged = true
      state.serverError = false
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.userUsername = "";
      state.userEmail = "";
      state.userId = "";
      state.userToken = "";
      state.userIsLogged = false

    },
    CHACH_SERVER_ERROR(state) {
      state.serverError = true
    },
    OPEN_SNAKBAR: (state) => {
      state.openSnackLogin = true;
    },
    DISABLE_BUTTON: (state) => {
      state.disabledBtnLogin = true;
    },
    ALLOW_BUTTON: (state) => {
      state.disabledBtnLogin = false;
    },
    CHANGE_SEND_REQUEST: (state) => {
      state.sendRequestLogin = + 1;
    },
  },
});




export const {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
  CHACH_SERVER_ERROR,
  OPEN_SNAKBAR,
  DISABLE_BUTTON,
  ALLOW_BUTTON,
  CHANGE_SEND_REQUEST
} = authSlice.actions;


export const selectIsLoggedIn = (state) => state.auth.userIsLogged;
export const selectEmail = (state) => state.auth.userEmail;
export const selectUserName = (state) => state.auth.userUsername;
export const selectUserID = (state) => state.auth.userId;
export const selectToken = (state) => state.auth.userToken;
export const selectServerError = (state) => state.auth.serverError


export const selectOpenSnackLogin = (state) => state.auth.openSnackLogin
export const selectDisabledBtnLogin = (state) => state.auth.disabledBtnLogin
export const selectSendRequestLogin= (state) => state.auth.sendRequestLogin


export default authSlice.reducer;