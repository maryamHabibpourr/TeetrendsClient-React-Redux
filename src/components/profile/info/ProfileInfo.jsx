import React from 'react'

//style
import styles from "./ProfileInfo.module.scss"

//redux
import { useSelector } from "react-redux";

import {
  selectFirstNameValue,
  selectLastNameValue,
  selectBirthDateValue,
  selectPhoneNumberValue,
  selectProvinceValue,
  selectCityValue,
  selectStreetValue,
  selectPostalCodeValue,
} from "../../../redux/slice/updateProfileSlice";

//date
import moment from 'moment-jalaali';

//persian tools
import { digitsEnToFa } from "@persian-tools/persian-tools";


function ProfileInfo() {
    const firstName = useSelector(selectFirstNameValue);
    const lastName = useSelector(selectLastNameValue);
    const phoneNumber = useSelector(selectPhoneNumberValue);
    const BrithDate = useSelector(selectBirthDateValue);
    const province = useSelector(selectProvinceValue);
    const city = useSelector(selectCityValue);
    const street = useSelector(selectStreetValue);
    const postCode = useSelector(selectPostalCodeValue);

    //date
    const convertedDate = digitsEnToFa(moment(BrithDate, 'YYYY-MM-DD').format('YYYY/MM/DD'));
 
    

  return (
    <div className={styles.profileInfoContainer}>
      <h1>اطلاعات خریدار:</h1>
      <h2>نام و نام خانوادگی:<span>{firstName}{"  "}{lastName}</span></h2>
      <h2>شماره تماس:<span>{digitsEnToFa(phoneNumber)}</span></h2>
      <h2>تاریخ تولد:<span>{convertedDate}</span></h2>
      <h2>آدرس محل سکونت:<span>{province},{city},{street}</span></h2>
      <h2>کد پستی:<span>{digitsEnToFa(postCode)}</span></h2>
    </div>
  )
}

export default ProfileInfo