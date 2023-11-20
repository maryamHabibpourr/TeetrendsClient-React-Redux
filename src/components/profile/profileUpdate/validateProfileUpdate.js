//date
import moment from 'moment-jalaali';

export const validateProfileUpdate = (data) => {
    const errors = {};

    if (!data.first_name.trim()) {
        errors.first_name = "این فیلد نباید خالی باشد!";
    }

    if (!data.last_name.trim()) {
        errors.last_name = "این فیلد نباید خالی باشد!";
    }



    if (!data.phone_number.trim()) {
        errors.phone_number = "این فیلد نباید خالی باشد!";
    } else if (!/^\d+$/.test(data.phone_number)) {
        errors.phone_number = "شماره تماس فقط باید عدد باشد!";
    } else if (data.phone_number.length > 11) {
        errors.phone_number = "شماره تماس صحیح نمی باشد!";
    }



    if (!data.birth_date.trim()) {
        errors.birth_date = "تاریخ تولد ضروری است!";
    } else {
        const birthDate = moment(data.birth_date, 'YYYY-MM-DD');
        if (!birthDate.isValid()) {
            errors.birth_date = "فرمت تاریخ درست نیست!";
        }
    }


    if (!data.province.trim()) {
        errors.province = "این فیلد نباید خالی باشد!";
    }

    if (!data.city.trim()) {
        errors.city = "این فیلد نباید خالی باشد!";
    }

    if (!data.street.trim()) {
        errors.street = "این فیلد نباید خالی باشد!";
    }





    if (!data.postal_code) {
        errors.postal_code = "این فیلد نباید خالی باشد!";
    } else if (!/^\d+$/.test(data.postal_code)) {
        errors.postal_code = " کد پستی فقط باید عدد باشد!";
    } else if (data.postal_code.toString().length !== 10){
        errors.postal_code = "کد پستی  صحیح نمی باشد!";
    }


    return errors;
}
