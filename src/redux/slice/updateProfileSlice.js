import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    first_name_value: "",
    birth_date_value: null,
    city_value: "",
    last_name_value: "",
    phone_number_value: "",
    province_value: "",
    street_value: "",
    postal_code_value: "",
    sendRequest: 0,
    openSnack: false,
    disabledBtn: false,

};



const updateProfileSlice = createSlice({
    name: 'updateProfile',
    initialState,
    reducers: {
        SETPUPDATEROFILE: (state, action) => {
            state.first_name_value = action.payload.first_name_value;
            state.last_name_value = action.payload.last_name_value;
            state.birth_date_value = action.payload.birth_date_value;
            state.phone_number_value = action.payload.phone_number_value;
            state.province_value = action.payload.province_value;
            state.city_value = action.payload.city_value;
            state.street_value = action.payload.street_value;
            state.postal_code_value = action.payload.postal_code_value;
            console.log(action.payload)

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
            state.sendRequest = + 1;
        },

    }
});



export const {
    SETPUPDATEROFILE,
    openTheSnack,
    disableTheButton,
    allowTheButton,
    changeSendRequest,
   } = updateProfileSlice.actions;


export default updateProfileSlice.reducer;



export const selectOpenSnack = (state) => state.updateProfile.openSnack;
export const selectDisabledBtn = (state) => state.updateProfile.disabledBtn;
export const selectSendRequest = (state) => state.updateProfile.sendRequest;
export const selectFirstNameValue = (state) => state.updateProfile.first_name_value
export const selectLastNameValue = (state) => state.updateProfile.last_name_value

export const selectBirthDateValue = (state) => state.updateProfile.birth_date_value
export const selectPhoneNumberValue = (state) => state.updateProfile.phone_number_value
export const selectProvinceValue = (state) => state.updateProfile.province_value
export const selectCityValue = (state) => state.updateProfile.city_value
export const selectStreetValue = (state) => state.updateProfile.street_value
export const selectPostalCodeValue = (state) => state.updateProfile.postal_code_value






