import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  INCREMENTCARTITEM,
  DECREMENTCARTITEM,
  DELETECARTITEM,
  CLEARECART,
} from "../../redux/slice/cartSlice";
import {
  selectIdCart,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import { selectAllProoducts } from "../../redux/slice/productsSlice";
import {selectIsLoggedIn} from "../../redux/slice/authSlice";

//style
import styles from "./Cart.module.scss";

//antDesign
import { message } from "antd";

//assets
import trashIcon from "../../assets/trash.svg";

//persian tools
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";

//components
import PriceFactore from "./priceFactore/PriceFactore";

function CartForItems() {
  const dispatch = useDispatch();
  const cartId = useSelector(selectIdCart);
  const cartItems = useSelector(selectCartItems);
  const allProducts = useSelector(selectAllProoducts);
  const userLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate();
  const [openMessage, setOpenMessage] = useState(false);

  console.log("products", allProducts);
  console.log("isCarrrrd", cartId);
  console.log("cartttttt", cartItems);
  console.log("logeed", userLoggedIn);

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "با موفقیت سبد خرید حذف شد!",
    });
  };

  const handleIncrement = async (item) => {
    const newQuantity = item.quantity + 1;
    try {
      const response = await Axios.patch(
        `https://api.teetrends.ir/store/carts/${cartId}/items/${item.id}/`,
        {
          quantity: newQuantity,
        }
      );
      console.log(response);
      dispatch(INCREMENTCARTITEM(item));
      let currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = currentItems.findIndex(
        (cartItem) => cartItem.product === item.product
      );
      if (itemIndex !== -1) {
        currentItems[itemIndex].quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(currentItems));
      }
    } catch (error) {
      console.error("Error incrementing item:", error);
      if (error.response && error.response.data) {
        console.log("Server response:", error.response.data);
      }
    }
  };

  const handleDecrement = async (item) => {
    const newQuantity = item.quantity - 1;
    try {
      const response = await Axios.patch(
        `https://api.teetrends.ir/store/carts/${cartId}/items/${item.id}/`,
        {
          quantity: newQuantity,
        }
      );
      console.log(response);
      dispatch(DECREMENTCARTITEM(item));
      let currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const itemIndex = currentItems.findIndex(
        (cartItem) => cartItem.product === item.product
      );
      if (itemIndex !== -1) {
        currentItems[itemIndex].quantity = newQuantity;
        localStorage.setItem("cartItems", JSON.stringify(currentItems));
      }
    } catch (error) {
      console.error("Error decrementing item:", error);
      if (error.response && error.response.data) {
        console.log("Server response:", error.response.data);
      }
    }
  };

  const handleDeleteItem = async (item) => {
    try {
      const response = await Axios.delete(
        `https://api.teetrends.ir/store/carts/${cartId}/items/${item.id}/`
      );
      console.log(response);
      dispatch(DELETECARTITEM(item));
      let currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const updatedItems = currentItems.filter(
        (cartItem) => cartItem.product !== item.product
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error deleting item:", error);
      if (error.response && error.response.data) {
        console.log("Server response:", error.response.data);
      }
    }
  };

  const handleDeleteAll = async () => {
    try {
      const response = await Axios.delete(
        `https://api.teetrends.ir/store/carts/${cartId}/`
      );
      dispatch(CLEARECART());
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("theCartId");
      console.log(response.data);
      setOpenMessage(true);
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
  };

  useEffect(() => {
    if (openMessage) {
      success();
      setTimeout(() => {
        navigate(0);
      }, 1500);
    }
  }, [openMessage]);

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




  function SubmitButtonDisplay() {
    return userLoggedIn ? (
        <button className={styles.countineBuying} onClick={()=>navigate("/profile")}>
            ادامه فرایند خرید
        </button>
    ) : (
        <button className={styles.countineBuying} onClick={()=>navigate("/register")}>
            برای  ادامه  فرایند  خرید، ابتدا باید ثبت نام نمایید!
        </button>
    );
}



  return (
    <div className={styles.cartContainer}>
      {contextHolder}
      <div className={styles.cartMainContainer}>
        {cartItems.length == 0 ? (
          <div className={styles.cartNews}>
            <h1>سبد خرید خالی است!</h1>
            <button onClick={()=>navigate("/products")}>برگشت به فروشگاه</button>
          </div>
        ) : (
          cartItems.map((cartItem) => {
            const product = allProducts.find((p) => p.id === cartItem.product);
            return (
              <div className={styles.containerItems} key={cartItem.id}>
                <img
                  className={styles.productImage}
                  src={product.image}
                  alt={product.slug}
                />

                <div className={styles.data}>
                  <h3>{product.name}</h3>
                  <p>
                    قیمت واحد:{" "}
                    {`${digitsEnToFa(addCommas(product.unit_price))} تومان`}
                  </p>
                </div>

                <div>
                  <span className={styles.quantity}>
                    {digitsEnToFa(cartItem.quantity)}
                  </span>
                </div>

                <div className={styles.buttonContainer}>
                  {cartItem.quantity > 1 ? (
                    <button onClick={() => handleDecrement(cartItem)}>-</button>
                  ) : (
                    <button onClick={() => handleDeleteItem(cartItem)}>
                      <img src={trashIcon} alt="trash" />
                    </button>
                  )}
                  <button onClick={() => handleIncrement(cartItem)}>+</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {cartItems.length > 0 &&  
      <div className={styles.cartProcess}>
        <div className={styles.cartProcessfactore}>
          <PriceFactore
            cartItems={digitsEnToFa(cartItems.length)}
            totalQuantity={digitsEnToFa(totalQuantity)}
            totalPriceCalculate={digitsEnToFa(addCommas(totalPriceCalculate))}

          />
        </div>
        <div className={styles.buttonProceessContainer}>
          {SubmitButtonDisplay()}
          <button className={styles.deleteCart} onClick={handleDeleteAll}>
            حذف سبد خرید  
          </button>
        </div>
      </div>}
    </div>
  );
}

export default CartForItems;
