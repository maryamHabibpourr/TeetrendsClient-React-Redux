// commentSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentValue: "",
  sendRequest: false, // Change to a boolean flag
  openSnack: false,
  disabledBtn: false,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    postCommentRequested: (state) => {
      state.sendRequest = true; // Set the sendRequest flag to true
    },
    postCommentSucceeded: (state) => {
      state.sendRequest = false; // Reset the sendRequest flag to false on success
      state.commentValue = ""; // Reset the commentValue
      state.openSnack = true;
    },
    postCommentFailed: (state) => {
      state.sendRequest = false; // Reset the sendRequest flag to false on failure
      state.disabledBtn = false; // Reset the disabledBtn
    },
    disableTheButton: (state) => {
      state.disabledBtn = true;
    },
    allowTheButton: (state) => {
      state.disabledBtn = false;
    },
    setCommentValue: (state, action) => {
      state.commentValue = action.payload;
    },
  },
});

export const {
  postCommentRequested,
  postCommentSucceeded,
  postCommentFailed,
  disableTheButton,
  allowTheButton,
  setCommentValue,
} = commentSlice.actions;

export default commentSlice.reducer;

export const selectOpenSnack = (state) => state.comment.openSnack;
export const selectDisabledBtn = (state) => state.comment.disabledBtn;
export const selectSendRequest = (state) => state.comment.sendRequest;
export const selectCommentValue = (state) => state.comment.commentValue;



