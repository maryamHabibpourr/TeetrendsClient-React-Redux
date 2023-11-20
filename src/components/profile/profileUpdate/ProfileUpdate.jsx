import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/card/Card";

//style
import styles from "./ProfileUpdate.module.scss";

//redux
import { useDispatch, useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../../redux/slice/authSlice";
import {
  selectOpenSnack,
  selectDisabledBtn,
  selectSendRequest,
  selectFirstNameValue,
  selectLastNameValue,
  selectBirthDateValue,
  selectPhoneNumberValue,
  selectProvinceValue,
  selectCityValue,
  selectStreetValue,
  selectPostalCodeValue,
} from "../../../redux/slice/updateProfileSlice";
import {
  SETPUPDATEROFILE,
  openTheSnack,
  disableTheButton,
  allowTheButton,
  changeSendRequest,
} from "../../../redux/slice/updateProfileSlice";

//antd
import { message, Button } from "antd";

//components
import { validateProfileUpdate } from "./validateProfileUpdate";
//date
import moment from "moment-jalaali";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";

//date
import { provinces, Alborz, Tehran } from "../../constant/data";

//icons
import { CalendarOutlined } from "@ant-design/icons";

function ProfileUpdate({ userProfile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);
  const userUsername = useSelector(selectUserName);
  const firstName = useSelector(selectFirstNameValue);
  const lastName = useSelector(selectLastNameValue);
  const phoneNumber = useSelector(selectPhoneNumberValue);
  const BrithDate = useSelector(selectBirthDateValue);
  const province = useSelector(selectProvinceValue);
  const city = useSelector(selectCityValue);
  const street = useSelector(selectStreetValue);
  const postCode = useSelector(selectPostalCodeValue);
  const sendRequest = useSelector(selectSendRequest);
  const openSnack = useSelector(selectOpenSnack);
  const disabledBtn = useSelector(selectDisabledBtn);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "با موفقیت اطلاعات وارد شد!",
    });
  };

  useEffect(() => {
    const {
      first_name,
      last_name,
      phone_number,
      birth_date,
      province,
      city,
      street,
      postal_code,
    } = userProfile;
    dispatch(
      SETPUPDATEROFILE({
        first_name_value: first_name || "",
        last_name_value: last_name || "",
        phone_number_value: phone_number || "",
        birth_date_value: birth_date || null,
        province_value: province || "",
        city_value: city || "",
        street_value: street || "",
        postal_code_value: postal_code || "",
      })
    );
  }, [userProfile, dispatch]);

  console.log(userProfile.postal_code);
  console.log(postCode);
  //###################################################
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      birth_date: BrithDate,
      province: province,
      city: city,
      street: street,
      postal_code: postCode,
    };

    const formErrors = validateProfileUpdate(formData);
    setErrors(formErrors);

    if (!Object.keys(formErrors).length) {
      dispatch(changeSendRequest());
      dispatch(disableTheButton());
    } else {
      setTouched({
        first_name: true,
        last_name: true,
        phone_number: true,
        birth_date: true,
        province: true,
        city: true,
        street: true,
        postal_code: true,
      });
    }
  };

  useEffect(() => {
    if (sendRequest) {
      async function UpadteProfile() {
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("phone_number", phoneNumber);
        formData.append("birth_date", BrithDate);
        formData.append("province", province);
        formData.append("city", city);
        formData.append("street", street);
        formData.append("postal_code", postCode);
        formData.append("user", userID);
        try {
          const response = await Axios.patch(
            `https://api.teetrends.ir/store/customers/${userID}/`,
            formData
          );
          console.log(response.data);
          dispatch(openTheSnack());
        } catch (e) {
          console.log(e.message);
          if (e.response) {
            console.log(e.response.data);
            console.log(e.response.status);
            console.log(e.response.headers);
          }
          dispatch(allowTheButton());
        }
      }
      UpadteProfile();
    }
  }, [sendRequest]);

  useEffect(() => {
    if (openSnack) {
      success();
      setTimeout(() => {
        navigate(0);
      }, 2500);
    }
  }, [openSnack]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const currentState = {
      first_name_value: firstName,
      last_name_value: lastName,
      phone_number_value: phoneNumber,
      birth_date_value: BrithDate,
      province_value: province,
      city_value: city,
      street_value: street,
      postal_code_value: postCode,
    };
    const updatedProfile = {
      ...currentState,
      [`${name}_value`]: value,
    };
    dispatch(SETPUPDATEROFILE(updatedProfile));
    setTouched({ ...touched, [name]: true });
  };

  //date
  const handleDateChange = (dateValue) => {
    console.log("Selected date:", dateValue);
    const formattedDate = dateValue.format("YYYY-MM-DD");
    console.log("Formatted date:", formattedDate);
    const currentState = {
      first_name_value: firstName,
      last_name_value: lastName,
      phone_number_value: phoneNumber,
      birth_date_value: BrithDate,
      province_value: province,
      city_value: city,
      street_value: street,
      postal_code_value: postCode,
    };

    const updatedProfile = {
      ...currentState,
      birth_date_value: formattedDate,
    };

    dispatch(SETPUPDATEROFILE(updatedProfile));
    setTouched({ ...touched, birth_date: true });
  };

  function dispalayButton() {
    if (userUsername === "" || userUsername === null) {
      return (
        <Button
          disabled
          block
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign:"center",
            paddingBottom:"10px"
          }}
        >
          به روز رسانی
        </Button>
      );
    } else {
      return (
        <button type="submit" disabled={disabledBtn}>
          به روز رسانی
        </button>
      );
    }
  }

  return (
    <div className={styles.updateProfileContainer}>
      {contextHolder}
      <Card cardClass={styles.cardUpadeProfile}>
        <form onSubmit={formSubmit}>
          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              نام<span className={styles.redStar}>*</span>
            </label>
            <input
              className={
                errors.first_name && touched.first_name
                  ? styles.uncompleted
                  : styles.formInput
              }
              name="first_name"
              value={firstName}
              onChange={handleInputChange}
            />
            {errors.first_name && touched.first_name && (
              <span className={styles.errorSpan}>{errors.first_name}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              نام خانوادگی<span className={styles.redStar}>*</span>
            </label>
            <input
              className={
                errors.last_name && touched.last_name
                  ? styles.uncompleted
                  : styles.formInput
              }
              name="last_name"
              value={lastName}
              onChange={handleInputChange}
            />
            {errors.last_name && touched.last_name && (
              <span className={styles.errorSpan}>{errors.last_name}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              شماره تماس<span className={styles.redStar}>*</span>
            </label>
            <input
              className={
                errors.phone_number && touched.phone_number
                  ? styles.uncompleted
                  : styles.formInput
              }
              name="phone_number"
              value={phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phone_number && touched.phone_number && (
              <span className={styles.errorSpan}>{errors.phone_number}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              تاریخ تولد<span className={styles.redStar}>*</span>
            </label>
            <div
              style={{
                displayL: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DatePicker
                style={{ width: "100px" }}
                value={BrithDate}
                onChange={handleDateChange}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                // className="rmdp-mobile"
              />
              <CalendarOutlined
                style={{
                  color: "#ccc",
                  fontSize: "20px",
                  marginRight: "1px",
                }}
              />
            </div>
            {errors.birth_date && touched.birth_date && (
              <span className={styles.errorSpan}>{errors.birth_date}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              استان<span className={styles.redStar}>*</span>
            </label>
            <select
              name="province"
              value={province}
              onChange={handleInputChange}
            >
              {provinces.map((provinceName, index) => (
                <option
                  className={styles.options}
                  key={index}
                  value={provinceName}
                >
                  {provinceName}
                </option>
              ))}
            </select>
            {errors.province && touched.province && (
              <span className={styles.errorSpan}>{errors.province}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              شهر<span className={styles.redStar}>*</span>
            </label>
            <select name="city" value={city} onChange={handleInputChange}>
              {province === "البرز"
                ? Alborz.map((alborzName, index) => (
                    <option
                      className={styles.options}
                      key={index}
                      value={alborzName}
                    >
                      {alborzName}
                    </option>
                  ))
                : province === "تهران"
                ? Tehran.map((tehranName, index) => (
                    <option
                      className={styles.options}
                      key={index}
                      value={tehranName}
                    >
                      {tehranName}
                    </option>
                  ))
                : null}
            </select>
            {errors.city && touched.city && (
              <span className={styles.errorSpan}>{errors.city}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              خیابان و کوچه <span className={styles.redStar}>*</span>
            </label>
            <textarea
              className={
                errors.street && touched.street
                  ? styles.uncompleted
                  : styles.formInput
              }
              name="street"
              value={street}
              onChange={handleInputChange}
            />
            {errors.street && touched.street && (
              <span className={styles.errorSpan}>{errors.street}</span>
            )}
          </div>

          <div className={styles.inputeContainer}>
            <label className={styles.label}>
              کدپستی<span className={styles.redStar}>*</span>
            </label>
            <input
              className={
                errors.postal_code && touched.postal_code
                  ? styles.uncompleted
                  : styles.formInput
              }
              name="postal_code"
              value={postCode}
              onChange={handleInputChange}
            />
            {errors.postal_code && touched.postal_code && (
              <span className={styles.errorSpan}>{errors.postal_code}</span>
            )}
          </div>
          {dispalayButton()}
        </form>
      </Card>
    </div>
  );
}

export default ProfileUpdate;
