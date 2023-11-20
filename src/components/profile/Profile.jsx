import React, { useEffect } from "react";
import Axios from "axios";
//redux
import { useDispatch, useSelector } from "react-redux";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import {
  SETPROFILE,
  SETLOADING,
  SETERROR,
  RESETLOADING,
} from "../../redux/slice/profileSlice";
import {
  selectUserProfile,
  selectLoading,
  selectError,
} from "../../redux/slice/profileSlice";
import { selectCartItems, selectIdCart } from "../../redux/slice/cartSlice";
import { selectAllProoducts } from "../../redux/slice/productsSlice";

//component
import ProfileUpdate from "./profileUpdate/ProfileUpdate";
import PriceFactore from "../../pages/cart/priceFactore/PriceFactore";
import ProfileInfo from "./info/ProfileInfo";
//assets
import gif from "../../assets/gif.gif";

//style
import styles from "./Profile.module.scss";

//antDesign
import { Alert, Space } from "antd";
import { Button } from "antd";

//persian tools
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";

function Profile() {
  const dispatch = useDispatch();
  const cartId = useSelector(selectIdCart);
  const userID = useSelector(selectUserID);
  const userUsername = useSelector(selectUserName);
  const userProfile = useSelector(selectUserProfile);
  const Loading = useSelector(selectLoading);
  const Error = useSelector(selectError);
  const cartItems = useSelector(selectCartItems);
  const allProducts = useSelector(selectAllProoducts);

  const totalQuantity = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  const totalPriceCalculate = cartItems.reduce((accumulator, cartItem) => {
    const product = allProducts.find((p) => p.id === cartItem.product);
    if (product) {
      return accumulator + product.unit_price * cartItem.quantity;
    }
    return accumulator;
  }, 0);

  useEffect(() => {
    async function getProfileInfo() {
      try {
        dispatch(SETLOADING());
        const response = await Axios.get(
          `https://api.teetrends.ir/store/customers/${userID}`
        );
        console.log(response);
        dispatch(SETPROFILE(response.data));
        dispatch(RESETLOADING());
      } catch (e) {
        dispatch(SETERROR(e.toString()));
        console.log(e.response);
        console.log(Error);
      }
    }
    getProfileInfo();
  }, [userID, dispatch]);

  if (Loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src={gif} alt="pic" className="animate-spin h-8 w-8" />
      </div>
    );
  }

  function dispalayStructure() {
    if (userUsername === "" || userUsername === null) {
      return (
        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
              style={{
                background: "red",
                fontSize: "1rem",
                textAlign: "center",
                marginBottom: "10px",
              }}
              message="لطفاً ابتدا از حساب کاربری خود وارد شوید!"
              type="error"
            />
          </Space>
        </div>
      );
    } else if (
      userProfile.first_name === "" ||
      userProfile.first_name === null ||
      userProfile.last_name === "" ||
      userProfile.last_name === null ||
      userProfile.phone_number === "" ||
      userProfile.phone_number === null
    ) {
      return (
        <div className={styles.usenameInfo}>
          <h2>
            <span>{userUsername && userUsername}</span>عزیز خوش آمدید!
          </h2>
          <p>لطفا فرم زیر را پر نمایید!</p>
        </div>
      );
    } else {
      return (
        <div className={styles.usenameInfo}>
          <h2>
            پروفایل کاربری<span>{userUsername && userUsername}</span>
          </h2>
        </div>
      );
    }
  }

  function paymentDisplay() {
    if (
      totalQuantity > 0 &&
      userProfile.first_name !== "" &&
      userProfile.last_name !== "" &&
      userProfile.phone_number !== "" &&
      userProfile.birth_date !== null &&
      userProfile.province !== "" &&
      userProfile.city !== "" &&
      userProfile.street !== "" &&
      userProfile.postal_code !== 0
    ) {
      return (
          <Button type="primary" block className={styles.buttonPayment}>
                برای عملیات پرداخت کلیک نمایید!
          </Button>
      ); 
    } else {
      return (
          <Button
            disabled
            block
            className={styles.buttonDisable}
          >
            پرداخت
          </Button>
     
      );
    }
  }


  function profileInfoDisplay() {
    if (
      userProfile.first_name !== "" &&
      userProfile.last_name !== "" &&
      userProfile.phone_number !== "" &&
      userProfile.birth_date !== null &&
      userProfile.province !== "" &&
      userProfile.city !== "" &&
      userProfile.street !== "" &&
      userProfile.postal_code !== 0
    ) {
      return <ProfileInfo />;
    } else {
      return null;
    }
  }

  return (
    <div className={styles.Profile_Page_Container}>
      <div className={styles.Profile_Container}>
        {dispalayStructure()}
        <div className={styles.Profile_main_Container}>
          <div className={styles.right_container}>
            <PriceFactore
              cartItems={digitsEnToFa(cartItems.length)}
              totalQuantity={digitsEnToFa(totalQuantity)}
              totalPriceCalculate={digitsEnToFa(addCommas(totalPriceCalculate))}
            />
            {profileInfoDisplay()}
          </div>

          <div className={styles.left_container}>
            <ProfileUpdate userProfile={userProfile} />
          </div>
        </div>
        {paymentDisplay()}
      </div>
    </div>
  );
}

export default Profile;
