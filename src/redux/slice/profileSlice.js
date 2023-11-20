import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userProfile: {
        first_name: "",
        last_name: "",
        phone_number: "",
        birth_date: null,
        province: "",
        city: "",
        street: "",
        postal_code: ""
    },
    loading: false,
    error: null
};



const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        SETPROFILE: (state, action) => {
            const { first_name, last_name, phone_number,city, birth_date, province, street, postal_code } = action.payload;
            state.userProfile = { ...state.userProfile, first_name, last_name, phone_number,city, birth_date, province, street, postal_code };
        },
        SETLOADING: (state) => {
            state.loading = true;
            state.error = null;
        },
        SETERROR: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        RESETLOADING: (state) => {
            state.loading = false;
        }
    }
});

export const { SETPROFILE, SETLOADING, SETERROR, RESETLOADING } = profileSlice.actions;
export default profileSlice.reducer;



export const selectUserProfile = (state) => state.profile.userProfile;
export const selectLoading = (state) => state.profile.loading;
export const selectError = (state) => state.profile.error;

