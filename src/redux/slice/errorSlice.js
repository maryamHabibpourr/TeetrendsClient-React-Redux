import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serverMessageUsername: "",
  serverMessageEmail: "",
  serverMessageSimilarPassword: "",
  serverMessageCommonPassword: "",
  serverMessageNumericPassword: "",
  serverMessageSimilarEmailPassword: "",
  openSnack: false,
  disabledBtn: false,
  sendRequest: 0,
};



const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    usernameExists: (state, action) => {
      console.log(action.payload);
      state.serverMessageUsername = "این نام کاربری قبلاً ایجاد شده است.";
    },
    emailExists: (state) => {
      state.serverMessageEmail = "این ایمیل قبلاً به کار برده شده است.";
    },
    similarPassword: (state) => {
      state.serverMessageSimilarPassword =
        "رمز عبور بسیار شبیه به نام کاربری است.";
    },
    commonPassword: (state) => {
      state.serverMessageCommonPassword = "رمز عبور بسیار رایج است";
    },
    numericPassword: (state) => {
      state.serverMessageNumericPassword = "رمز عبور نباید فقط شامل عدد شود.";
    },
    similarEmailPassword: (state) => {
      state.serverMessageSimilarEmailPassword =
        "رمز عبور بسیار شبیه به ایمیل است.";
    },
    openTheSnack: (state) => {
      state.openSnack = true;
    },
    disableTheButton: (state) => {
      state.disabledBtn = true;
    },
    allowTheButton: (state) => {
      state.disabledBtn = false;
    },
    changeSendRequest: (state) => {
      state.sendRequest =  + 1;
    },
  },
});

export const {
  usernameExists,
  emailExists,
  similarPassword,
  commonPassword,
  numericPassword,
  similarEmailPassword,
  openTheSnack,
  disableTheButton,
  allowTheButton,
  changeSendRequest,
} = errorSlice.actions;

export const selectServerMessageUsername = (state) =>
  state.error.serverMessageUsername;
export const selectServerMessageEmail = (state) =>
  state.error.serverMessageEmail;
export const selectServerMessageSimilarPassword = (state) =>
  state.error.serverMessageSimilarPassword;
export const selectServerMessageCommonPassword = (state) =>
  state.error.serverMessageCommonPassword;
export const selectServerMessageNumericPassword = (state) =>
  state.error.serverMessageNumericPassword;
export const selectServerMessageSimilarEmailPassword = (state) =>
  state.error.serverMessageSimilarEmailPassword;

export const selectOpenSnack = (state) => state.error.openSnack;
export const selectDisabledBtn = (state) => state.error.disabledBtn;
export const selectSendRequest = (state) => state.error.sendRequest;

export default errorSlice.reducer;
